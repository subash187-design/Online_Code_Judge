const db = require('../config/database');

exports.getSubmissionAnalysis = async (req, res) => {
  try {
    const { submission_id } = req.params;
    const query = `
      SELECT a.*, s.verdict, s.execution_time_ms, s.memory_used_kb, ps.name as stage_name
      FROM submission_analyses a
      JOIN stage_submissions s ON a.submission_id = s.id
      JOIN problem_stages ps ON a.stage_id = ps.id
      WHERE a.submission_id = $1;
    `;
    const result = await db.query(query, [submission_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Analysis record not found' });
    }
    return res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching analysis:', err);
    return res.status(500).json({ error: 'Failed to fetch analysis' });
  }
};
