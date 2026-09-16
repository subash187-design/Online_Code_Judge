const AnalyticsService = require('../services/analytics.service');

exports.getProblemJourney = async (req, res) => {
  try {
    const problemId = parseInt(req.params.problem_id, 10);
    const userId = parseInt(req.query.user_id, 10) || 1;

    if (isNaN(problemId)) return res.status(400).json({ error: 'Invalid problem ID' });

    const journey = await AnalyticsService.getProblemJourney(userId, problemId);
    return res.json(journey);
  } catch (err) {
    console.error('Error fetching problem journey:', err);
    return res.status(500).json({ error: 'Failed to fetch problem optimization journey' });
  }
};

exports.compareSubmissions = async (req, res) => {
  try {
    const { sub_a, sub_b } = req.query;
    const userId = parseInt(req.query.user_id, 10) || 1;

    if (!sub_a || !sub_b) {
      return res.status(400).json({ error: 'sub_a and sub_b UUID parameters are required' });
    }

    const comparison = await AnalyticsService.compareSubmissions(userId, sub_a, sub_b);
    return res.json(comparison);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    console.error('Error comparing submissions:', err);
    return res.status(500).json({ error: 'Failed to compare submissions' });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const userId = parseInt(req.query.user_id, 10) || 1;
    const dashboard = await AnalyticsService.getUserDashboard(userId);
    return res.json(dashboard);
  } catch (err) {
    console.error('Error fetching user dashboard:', err);
    return res.status(500).json({ error: 'Failed to fetch dashboard' });
  }
};
