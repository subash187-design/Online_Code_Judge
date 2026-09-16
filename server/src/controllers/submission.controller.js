const db = require('../config/database');
const JudgeService = require('../services/judge.service');
const ProblemService = require('../services/problem.service');

exports.submitCode = async (req, res) => {
  try {
    const effectiveUserId = (req.user && req.user.id) ? req.user.id : (req.body.user_id || 1);
    const { problem_id, language = 'cpp', code } = req.body;

    if (!problem_id || !code) {
      return res.status(400).json({ error: 'problem_id and code are required' });
    }

    if (language !== 'cpp') {
      return res.status(400).json({ error: 'Only C++ (cpp) is supported in Phase 1' });
    }

    // Verify problem exists
    const problem = await ProblemService.getProblemById(problem_id);
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    // Fetch all test cases (samples + hidden)
    const testCases = await ProblemService.getProblemTestCases(problem_id);
    if (testCases.length === 0) {
      return res.status(400).json({ error: 'No test cases configured for this problem' });
    }

    // Execute through sandbox
    const result = JudgeService.executeCppSubmission(
      code,
      testCases,
      problem.time_limit_ms,
      problem.memory_limit_kb
    );

    // Persist submission record
    const insertQuery = `
      INSERT INTO submissions 
        (user_id, problem_id, language, code, verdict, execution_time_ms, memory_used_kb, compile_output)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const saved = await db.query(insertQuery, [
      effectiveUserId,
      problem_id,
      language,
      code,
      result.verdict,
      result.execution_time_ms,
      result.memory_used_kb,
      result.compile_output || null
    ]);

    return res.status(201).json(saved.rows[0]);
  } catch (err) {
    console.error('Submission error:', err);
    return res.status(500).json({ error: 'Failed to process submission' });
  }
};

exports.runCustom = async (req, res) => {
  try {
    const { language = 'cpp', code, custom_input = '', time_limit_ms = 1000, memory_limit_kb = 262144 } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'code is required' });
    }

    if (language !== 'cpp') {
      return res.status(400).json({ error: 'Only C++ (cpp) is supported in Phase 1' });
    }

    const result = JudgeService.runCustomInput(code, custom_input, time_limit_ms, memory_limit_kb);
    return res.json(result);
  } catch (err) {
    console.error('Custom run error:', err);
    return res.status(500).json({ error: 'Failed to run code' });
  }
};

exports.getSubmissionHistory = async (req, res) => {
  try {
    const effectiveUserId = (req.user && req.user.id) ? req.user.id : req.query.user_id;
    const { problem_id } = req.query;
    let query = `SELECT * FROM submissions WHERE 1=1`;
    const params = [];

    if (problem_id) {
      params.push(problem_id);
      query += ` AND problem_id = $${params.length}`;
    }
    if (effectiveUserId) {
      params.push(effectiveUserId);
      query += ` AND user_id = $${params.length}`;
    }

    query += ` ORDER BY created_at DESC LIMIT 50;`;
    const result = await db.query(query, params);
    return res.json(result.rows);
  } catch (err) {
    console.error('Error fetching submissions:', err);
    return res.status(500).json({ error: 'Failed to fetch submissions' });
  }
};