const db = require('../config/database');

class ProblemService {
  static async getAllProblems() {
    const query = `
      SELECT id, title, slug, difficulty, time_limit_ms, memory_limit_kb, created_at
      FROM problems
      ORDER BY id ASC;
    `;
    const res = await db.query(query);
    return res.rows;
  }

  static async getProblemById(id) {
    const problemRes = await db.query('SELECT * FROM problems WHERE id = $1', [id]);
    if (problemRes.rows.length === 0) return null;
    const problem = problemRes.rows[0];

    // Expose only sample test cases to user
    const tcRes = await db.query(
      `SELECT input, expected_output, order_index 
       FROM test_cases 
       WHERE problem_id = $1 AND is_sample = TRUE 
       ORDER BY order_index ASC;`,
      [id]
    );

    return {
      ...problem,
      sample_test_cases: tcRes.rows
    };
  }

  static async getProblemTestCases(id) {
    const tcRes = await db.query(
      `SELECT input, expected_output, is_sample 
       FROM test_cases 
       WHERE problem_id = $1 
       ORDER BY order_index ASC;`,
      [id]
    );
    return tcRes.rows;
  }
}

module.exports = ProblemService;
