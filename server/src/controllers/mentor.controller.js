const MentorService = require('../services/mentor/mentor.service');

exports.getFeedback = async (req, res) => {
  try {
    const { submission_id } = req.params;
    const userId = req.user?.id || parseInt(req.query.user_id, 10) || 1;

    const feedback = await MentorService.getSubmissionFeedback(submission_id, userId);
    return res.json(feedback);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    console.error('Error fetching mentor feedback:', err);
    return res.status(500).json({ error: 'Failed to retrieve mentor guidance' });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const stageId = parseInt(req.params.stage_id, 10);
    const userId = req.user?.id || parseInt(req.query.user_id, 10) || 1;

    const hints = await MentorService.getStageHints(userId, stageId);
    return res.json({ hints });
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    console.error('Error fetching mentor history:', err);
    return res.status(500).json({ error: 'Failed to retrieve mentor history' });
  }
};

exports.requestHint = async (req, res) => {
  try {
    const stageId = parseInt(req.params.stage_id || req.body.stage_id, 10);
    const userId = req.user?.id || parseInt(req.body.user_id, 10) || 1;
    const { submission_id, requested_level } = req.body;

    if (!stageId || !submission_id || requested_level === undefined) {
      return res.status(400).json({ error: 'stage_id, submission_id and requested_level (1-3) are required' });
    }

    const hint = await MentorService.requestNextHint(userId, stageId, submission_id, parseInt(requested_level, 10));
    return res.status(200).json(hint);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    console.error('Error unlocking hint:', err);
    return res.status(500).json({ error: 'Failed to unlock hint' });
  }
};
