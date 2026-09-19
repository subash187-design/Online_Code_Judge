const db = require('../config/database');
const Logger = require('../utils/logger');

class ProblemService {
  static async getAllProblems() {
    const query = `
      SELECT id, title, slug, difficulty, time_limit_ms, memory_limit_kb, created_at,
             topic, subtopics, tags, expected_time_complexity, expected_space_complexity
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

  static async createProblem(data) {
    const {
      title,
      slug,
      description,
      difficulty = 'MEDIUM',
      time_limit_ms = 1000,
      memory_limit_kb = 262144,
      topic,
      subtopics = [],
      tags = [],
      expected_time_complexity = 'O(N)',
      expected_space_complexity = 'O(1)'
    } = data;

    const query = `
      INSERT INTO problems 
        (title, slug, description, difficulty, time_limit_ms, memory_limit_kb, topic, subtopics, tags, expected_time_complexity, expected_space_complexity)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;
    const res = await db.query(query, [
      title,
      slug,
      description,
      difficulty,
      time_limit_ms,
      memory_limit_kb,
      topic,
      Array.isArray(subtopics) ? subtopics : [],
      Array.isArray(tags) ? tags : [],
      expected_time_complexity,
      expected_space_complexity
    ]);
    Logger.info('ProblemService', `Created problem with ID ${res.rows[0].id}`);
    return res.rows[0];
  }

  static async updateProblem(id, data) {
    const fields = [];
    const values = [];
    let idx = 1;

    for (const [key, val] of Object.entries(data)) {
      if (['title', 'slug', 'description', 'difficulty', 'time_limit_ms', 'memory_limit_kb', 'topic', 'expected_time_complexity', 'expected_space_complexity'].includes(key)) {
        fields.push(`${key} = $${idx++}`);
        values.push(val);
      } else if (['subtopics', 'tags'].includes(key)) {
        fields.push(`${key} = $${idx++}`);
        values.push(Array.isArray(val) ? val : []);
      }
    }

    if (fields.length === 0) return this.getProblemById(id);

    values.push(id);
    const query = `UPDATE problems SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *;`;
    const res = await db.query(query, values);
    return res.rows[0] || null;
  }

  static async deleteProblem(id) {
    const res = await db.query('DELETE FROM problems WHERE id = $1 RETURNING id;', [id]);
    return res.rows.length > 0;
  }
}

module.exports = ProblemService;
