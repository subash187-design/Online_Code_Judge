const StageService = require('../services/stage.service');

exports.getProblemStages = async (req, res) => {
  try {
    const problemId = parseInt(req.params.problem_id, 10);
    const userId = (req.user && req.user.id) ? req.user.id : (parseInt(req.query.user_id, 10) || 1);

    if (isNaN(problemId)) return res.status(400).json({ error: 'Invalid problem ID' });

    const data = await StageService.getProblemStagesForUser(userId, problemId);
    if (!data) return res.status(404).json({ error: 'No stages found for this problem' });

    return res.json(data);
  } catch (err) {
    console.error('Error fetching stages:', err);
    return res.status(500).json({ error: 'Failed to fetch stages' });
  }
};

exports.submitStage = async (req, res) => {
  try {
    const stageId = parseInt(req.params.stage_id, 10);
    const userId = (req.user && req.user.id) ? req.user.id : (parseInt(req.body.user_id, 10) || 1);
    const { language = 'cpp', code } = req.body;

    if (isNaN(stageId)) return res.status(400).json({ error: 'Invalid stage ID' });
    if (!code) return res.status(400).json({ error: 'code is required' });

    const result = await StageService.submitStageCode(userId, stageId, language, code);
    return res.status(201).json(result);
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.status === 403 ? 'STAGE_LOCKED' : 'ERROR',
        message: err.message
      });
    }
    console.error('Stage submission error:', err);
    return res.status(500).json({ error: 'Failed to evaluate stage submission' });
  }
};

exports.getStageHistory = async (req, res) => {
  try {
    const stageId = parseInt(req.params.stage_id, 10);
    const userId = (req.user && req.user.id) ? req.user.id : (parseInt(req.query.user_id, 10) || 1);

    if (isNaN(stageId)) return res.status(400).json({ error: 'Invalid stage ID' });

    const history = await StageService.getStageSubmissions(userId, stageId);
    return res.json(history);
  } catch (err) {
    console.error('Error fetching stage history:', err);
    return res.status(500).json({ error: 'Failed to fetch stage history' });
  }
};