const ProblemService = require('../services/problem.service');
const Logger = require('../utils/logger');

exports.listProblems = async (req, res) => {
  try {
    const problems = await ProblemService.getAllProblems();
    return res.json(problems);
  } catch (err) {
    Logger.error('ProblemController', 'Error listing problems', err);
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
    Logger.error('ProblemController', 'Error fetching problem details', err);
    return res.status(500).json({ error: 'Failed to fetch problem details' });
  }
};

exports.createProblem = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'title and description are required' });
    }

    const slug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const problem = await ProblemService.createProblem({ ...req.body, slug });
    return res.status(201).json(problem);
  } catch (err) {
    Logger.error('ProblemController', 'Error creating problem', err);
    return res.status(500).json({ error: 'Failed to create problem' });
  }
};

exports.updateProblem = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid problem ID' });

    const updated = await ProblemService.updateProblem(id, req.body);
    if (!updated) return res.status(404).json({ error: 'Problem not found' });

    return res.json(updated);
  } catch (err) {
    Logger.error('ProblemController', 'Error updating problem', err);
    return res.status(500).json({ error: 'Failed to update problem' });
  }
};

exports.deleteProblem = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid problem ID' });

    const deleted = await ProblemService.deleteProblem(id);
    if (!deleted) return res.status(404).json({ error: 'Problem not found' });

    return res.json({ message: 'Problem deleted successfully' });
  } catch (err) {
    Logger.error('ProblemController', 'Error deleting problem', err);
    return res.status(500).json({ error: 'Failed to delete problem' });
  }
};
