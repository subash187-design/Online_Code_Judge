const db = require('../config/database');

const COMPLEXITY_RANKS = {
  'O(1)': 1,
  'O(log N)': 2,
  'O(N)': 3,
  'O(N log N)': 4,
  'O(N^2)': 5,
  'O(N^3)': 6,
  'O(2^N)': 7
};

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

class AnalyticsService {
  /**
   * Retrieves chronological optimization journey metrics for a user and problem
   */
  static async getProblemJourney(userId = 1, problemId) {
    const query = `
      SELECT s.id, s.stage_id, s.verdict, s.execution_time_ms, s.memory_used_kb, s.created_at,
             ps.name as stage_name, ps.order_index as stage_order,
             a.detected_approach, a.time_complexity, a.space_complexity, a.stage_match_status
      FROM stage_submissions s
      JOIN problem_stages ps ON s.stage_id = ps.id
      LEFT JOIN submission_analyses a ON s.id = a.submission_id
      WHERE s.user_id = $1 AND s.problem_id = $2
      ORDER BY s.created_at ASC;
    `;
    const subRes = await db.query(query, [userId, problemId]);
    const submissions = subRes.rows;

    const hintRes = await db.query(
      `SELECT COUNT(*) FROM mentor_hints h
       JOIN problem_stages ps ON h.stage_id = ps.id
       WHERE h.user_id = $1 AND ps.problem_id = $2`,
      [userId, problemId]
    );
    const hintsCount = parseInt(hintRes.rows[0]?.count || 0, 10);

    const summaryRes = await db.query(
      `SELECT * FROM user_problem_summaries WHERE user_id = $1 AND problem_id = $2`,
      [userId, problemId]
    );
    const summary = summaryRes.rows[0] || null;

    let attemptCounter = 1;
    const timeline = submissions.map(sub => ({
      attempt: attemptCounter++,
      submission_id: sub.id,
      stage_name: sub.stage_name,
      stage_order: sub.stage_order,
      verdict: sub.verdict,
      approach: sub.detected_approach || 'Direct Implementation',
      time_complexity: sub.time_complexity || 'N/A',
      complexity_rank: COMPLEXITY_RANKS[sub.time_complexity] || 0,
      runtime_ms: sub.execution_time_ms ?? 0,
      memory_kb: sub.memory_used_kb ?? 0,
      timestamp: sub.created_at
    }));

    // Safe Runtime Drop & Memory Delta Calculations with Division-by-Zero Protection
    const acceptedSubs = timeline.filter(t => t.verdict === 'ACCEPTED');
    let runtimeDropPct = '0.0%';
    let memoryDeltaKb = '0 KB';

    if (acceptedSubs.length >= 2) {
      const first = acceptedSubs[0];
      const last = acceptedSubs[acceptedSubs.length - 1];

      const firstTime = Math.max(first.runtime_ms, 1);
      const lastTime = Math.max(last.runtime_ms, 1);

      if (firstTime > lastTime) {
        const drop = ((firstTime - lastTime) / firstTime) * 100;
        runtimeDropPct = `${drop.toFixed(1)}%`;
      } else if (first.runtime_ms === 0 && last.runtime_ms === 0) {
        runtimeDropPct = '0.0% (Maintained < 1ms)';
      }

      const memDiff = (last.memory_kb || 0) - (first.memory_kb || 0);
      memoryDeltaKb = `${memDiff >= 0 ? '+' : ''}${memDiff} KB`;
    }

    return {
      problem_id: problemId,
      total_attempts: timeline.length,
      hints_used: hintsCount,
      journey_summary: {
        initial_complexity: acceptedSubs[0]?.time_complexity || 'N/A',
        optimal_complexity: acceptedSubs[acceptedSubs.length - 1]?.time_complexity || 'N/A',
        runtime_drop_pct: runtimeDropPct,
        memory_delta_kb: memoryDeltaKb
      },
      ai_insight: summary?.ai_optimization_insight || 'Great progress! You refined your solution through sequential algorithmic stages.',
      complexity_timeline: timeline
    };
  }

  /**
   * Generates a structural and metric diff between two submissions
   */
  static async compareSubmissions(userId = 1, subAId, subBId) {
    if (!UUID_REGEX.test(subAId) || !UUID_REGEX.test(subBId)) {
      throw { status: 400, message: 'Invalid submission UUID format.' };
    }

    const query = `
      SELECT s.id, s.code, s.verdict, s.execution_time_ms, s.memory_used_kb, s.created_at,
             ps.name as stage_name, a.detected_approach, a.time_complexity, a.space_complexity
      FROM stage_submissions s
      JOIN problem_stages ps ON s.stage_id = ps.id
      LEFT JOIN submission_analyses a ON s.id = a.submission_id
      WHERE s.id = $1 AND s.user_id = $2;
    `;
    const [resA, resB] = await Promise.all([
      db.query(query, [subAId, userId]),
      db.query(query, [subBId, userId])
    ]);

    if (resA.rows.length === 0 || resB.rows.length === 0) {
      throw { status: 404, message: 'One or both submissions not found or access denied.' };
    }

    const a = resA.rows[0];
    const b = resB.rows[0];

    const rankA = COMPLEXITY_RANKS[a.time_complexity] || 0;
    const rankB = COMPLEXITY_RANKS[b.time_complexity] || 0;
    const stepDelta = rankA - rankB;

    let compMsg = `${a.time_complexity || 'N/A'} -> ${b.time_complexity || 'N/A'}`;
    if (stepDelta > 0) compMsg += ` (${stepDelta} tier(s) improved)`;
    else if (stepDelta < 0) compMsg += ` (${Math.abs(stepDelta)} tier(s) slower)`;
    else compMsg += ` (Asymptotically equivalent)`;

    const runtimeDiff = (b.execution_time_ms || 0) - (a.execution_time_ms || 0);
    const baseRuntime = Math.max(a.execution_time_ms || 0, 1);
    const reduction = a.execution_time_ms > b.execution_time_ms
      ? `${(((a.execution_time_ms - b.execution_time_ms) / baseRuntime) * 100).toFixed(1)}%`
      : '0.0%';

    return {
      submission_a: a,
      submission_b: b,
      delta: {
        time_complexity_step: compMsg,
        runtime_difference_ms: runtimeDiff,
        runtime_reduction_pct: reduction,
        memory_difference_kb: (b.memory_used_kb || 0) - (a.memory_used_kb || 0),
        approach_evolution: `Evolved from ${a.detected_approach || 'Initial'} to ${b.detected_approach || 'Refined'}`
      }
    };
  }

  /**
   * Retrieves overall user progress dashboard
   */
  static async getUserDashboard(userId = 1) {
    const totalSubsRes = await db.query(
      `SELECT COUNT(*) FROM stage_submissions WHERE user_id = $1`,
      [userId]
    );
    const totalSubmissions = parseInt(totalSubsRes.rows[0]?.count || 0, 10);

    const problemsRes = await db.query(
      `SELECT COUNT(DISTINCT problem_id) as started,
              COUNT(DISTINCT CASE WHEN is_solved = true THEN problem_id END) as solved
       FROM user_problem_summaries
       WHERE user_id = $1`,
      [userId]
    );
    const problemsStarted = parseInt(problemsRes.rows[0]?.started || 0, 10);
    const problemsSolved = parseInt(problemsRes.rows[0]?.solved || 0, 10);

    const hintsRes = await db.query(
      `SELECT COUNT(*) FROM mentor_hints WHERE user_id = $1`,
      [userId]
    );
    const totalHints = parseInt(hintsRes.rows[0]?.count || 0, 10);

    // Topic breakdown
    const topicRes = await db.query(
      `SELECT p.topic, 
              COUNT(DISTINCT p.id) as started,
              COUNT(DISTINCT CASE WHEN ups.is_solved = true THEN p.id END) as solved
       FROM problems p
       LEFT JOIN user_problem_summaries ups ON p.id = ups.problem_id AND ups.user_id = $1
       GROUP BY p.topic`,
      [userId]
    );

    return {
      overview: {
        problems_started: problemsStarted,
        problems_solved: problemsSolved,
        solve_rate_pct: problemsStarted > 0 ? `${((problemsSolved / problemsStarted) * 100).toFixed(1)}%` : '0.0%',
        total_submissions: totalSubmissions,
        total_hints_unlocked: totalHints
      },
      topic_breakdown: topicRes.rows.map(r => ({
        topic: r.topic || 'General',
        started: parseInt(r.started, 10),
        solved: parseInt(r.solved, 10)
      }))
    };
  }
}

module.exports = AnalyticsService;
