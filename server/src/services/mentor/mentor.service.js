const db = require('../../config/database');
const { SYSTEM_PROMPT, buildFeedbackPrompt, buildHintPrompt } = require('./prompts');

let GoogleGenerativeAI;
try {
  GoogleGenerativeAI = require('@google/generative-ai').GoogleGenerativeAI;
} catch (e) {
  // Graceful fallback if dependency is loading
}

class MentorService {
  /**
   * Retrieves cached submission feedback or generates it with Google Gemini
   */
  static async getSubmissionFeedback(submissionId, userId = 1) {
    // 1. Check for cached feedback
    const existing = await db.query(
      `SELECT * FROM mentor_feedbacks WHERE submission_id = $1 AND user_id = $2`,
      [submissionId, userId]
    );
    if (existing.rows.length > 0) return existing.rows[0];

    // 2. Fetch context from submission, problem, stage, and Phase 3 analysis
    const query = `
      SELECT s.*, p.title as prob_title, p.description as prob_desc,
             st.name as stage_name, st.order_index as stage_order,
             st.expected_time_complexity, st.expected_space_complexity,
             a.detected_approach, a.time_complexity, a.space_complexity,
             a.detected_patterns
      FROM stage_submissions s
      JOIN problems p ON s.problem_id = p.id
      JOIN problem_stages st ON s.stage_id = st.id
      LEFT JOIN submission_analyses a ON s.id = a.submission_id
      WHERE s.id = $1 AND s.user_id = $2
    `;
    const res = await db.query(query, [submissionId, userId]);
    if (res.rows.length === 0) throw { status: 404, message: 'Submission context not found.' };
    const row = res.rows[0];

    const context = {
      problem: { title: row.prob_title },
      stage: {
        order_index: row.stage_order,
        name: row.stage_name,
        expected_time_complexity: row.expected_time_complexity,
        expected_space_complexity: row.expected_space_complexity
      },
      submission: {
        code: row.code,
        verdict: row.verdict,
        compile_output: row.compile_output
      },
      analysis: {
        detected_approach: row.detected_approach || 'Direct Loop Scan',
        time_complexity: row.time_complexity || 'N/A',
        space_complexity: row.space_complexity || 'O(1)',
        detected_patterns: row.detected_patterns || []
      }
    };

    // 3. Generate feedback via Gemini (or educational fallback)
    let parsed;
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && GoogleGenerativeAI) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          systemInstruction: SYSTEM_PROMPT,
          generationConfig: { responseMimeType: 'application/json', maxOutputTokens: 350 }
        });

        const prompt = buildFeedbackPrompt(context);
        const result = await model.generateContent(prompt);
        parsed = JSON.parse(result.response.text());
        parsed = this._sanitizeOutput(parsed);
      } catch (err) {
        console.error('[MentorService] Gemini generation error, using fallback:', err.message);
        parsed = this._buildFallbackFeedback(context);
      }
    } else {
      parsed = this._buildFallbackFeedback(context);
    }

    // 4. Persist in database
    const insertRes = await db.query(
      `INSERT INTO mentor_feedbacks 
        (submission_id, user_id, stage_id, approach, complexity, what_you_are_doing_well, what_could_be_improved, next_goal)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        submissionId,
        userId,
        row.stage_id,
        parsed.approach,
        parsed.complexity,
        parsed.what_you_are_doing_well,
        parsed.what_could_be_improved,
        parsed.next_goal
      ]
    );

    return insertRes.rows[0];
  }

  /**
   * Unlocks the next sequential progressive hint (Level 1 -> 2 -> 3)
   */
  static async requestNextHint(userId = 1, stageId, submissionId, requestedLevel) {
    // Check if hint was already unlocked
    const existing = await db.query(
      `SELECT * FROM mentor_hints WHERE user_id = $1 AND stage_id = $2 AND hint_level = $3`,
      [userId, stageId, requestedLevel]
    );
    if (existing.rows.length > 0) return existing.rows[0];

    // Enforce sequential unlock rule (Level N requires Level N-1)
    const countRes = await db.query(
      `SELECT COALESCE(MAX(hint_level), 0) AS current_max 
       FROM mentor_hints 
       WHERE user_id = $1 AND stage_id = $2`,
      [userId, stageId]
    );
    const currentMax = parseInt(countRes.rows[0].current_max, 10);

    if (requestedLevel !== currentMax + 1) {
      throw {
        status: 400,
        message: `Sequential access violation: You must unlock Hint ${currentMax + 1} before requesting Hint ${requestedLevel}.`
      };
    }

    // Fetch context
    const subRes = await db.query(
      `SELECT s.*, p.title as prob_title, st.order_index, a.detected_approach 
       FROM stage_submissions s
       JOIN problems p ON s.problem_id = p.id
       JOIN problem_stages st ON s.stage_id = st.id
       LEFT JOIN submission_analyses a ON s.id = a.submission_id
       WHERE s.id = $1 AND s.user_id = $2`,
      [submissionId, userId]
    );
    if (subRes.rows.length === 0) throw { status: 404, message: 'Submission not found.' };
    const row = subRes.rows[0];

    const context = {
      problem: { title: row.prob_title },
      stage: { order_index: row.order_index },
      submission: { code: row.code, verdict: row.verdict },
      analysis: { detected_approach: row.detected_approach || 'Direct Loop Scan' }
    };

    let parsed;
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && GoogleGenerativeAI) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          systemInstruction: SYSTEM_PROMPT,
          generationConfig: { responseMimeType: 'application/json', maxOutputTokens: 250 }
        });

        const prompt = buildHintPrompt(context, requestedLevel);
        const result = await model.generateContent(prompt);
        parsed = JSON.parse(result.response.text());
        parsed = this._sanitizeOutput(parsed);
      } catch (err) {
        parsed = this._buildFallbackHint(requestedLevel);
      }
    } else {
      parsed = this._buildFallbackHint(requestedLevel);
    }

    const saved = await db.query(
      `INSERT INTO mentor_hints (user_id, stage_id, submission_id, hint_level, title, content)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [userId, stageId, submissionId, requestedLevel, parsed.title, parsed.content]
    );

    return saved.rows[0];
  }

  static _sanitizeOutput(obj) {
    const codeBlockRegex = /```[\s\S]*?```/g;
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].replace(codeBlockRegex, '[Code snippet hidden to support active learning]');
      }
    }
    return obj;
  }

  static _buildFallbackFeedback(ctx) {
    return {
      approach: ctx.analysis.detected_approach,
      complexity: `Detected: ${ctx.analysis.time_complexity} time | Target: ${ctx.stage.expected_time_complexity || 'O(1)'}`,
      what_you_are_doing_well: 'Your code structured the inputs cleanly according to the problem statement.',
      what_could_be_improved: ctx.submission.verdict === 'ACCEPTED'
        ? 'Reflect on how to optimize auxiliary memory and operation bounds for the upcoming stages.'
        : 'Double-check edge cases, negative integers, and loop boundary conditions.',
      next_goal: 'Test your solution with boundary constraints or unlock the progressive hints for guidance.'
    };
  }

  static _buildFallbackHint(level) {
    if (level === 1) {
      return {
        hint_level: 1,
        title: 'Conceptual Angle',
        content: 'Consider how the data flows from input to output: can the required result be computed on-the-fly without saving all historical states?'
      };
    } else if (level === 2) {
      return {
        hint_level: 2,
        title: 'Technique Direction',
        content: 'Look into using pointers or single-pass accumulators to avoid unnecessary nested iterations.'
      };
    } else {
      return {
        hint_level: 3,
        title: 'Algorithmic Walkthrough',
        content: '1. Read the input stream directly into variables. 2. Apply your operation in a single step. 3. Output the result immediately.'
      };
    }
  }
}

module.exports = MentorService;
