const ProblemService = require('../services/problem.service');

exports.listProblems = async (req, res) => {
  try {
    const problems = await ProblemService.getAllProblems();
    return res.json(problems);
  } catch (err) {
    console.error('Error listing problems:', err);
    return res.status(500).json({ error: 'Failed to fetch problems' });
  }
};

exports.getProblemDetail = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid problem ID' });

    const problem = await ProblemService.getProblemById(id);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    return res.json(problem);
  } catch (err) {
    console.error('Error fetching problem details:', err);
    return res.status(500).json({ error: 'Failed to fetch problem details' });
  }
};
