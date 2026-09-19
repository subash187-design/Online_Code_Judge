const StageService = require('../services/stage.service');
const Logger = require('../utils/logger');

exports.getProblemStages = async (req, res) => {
  try {
    const problemId = parseInt(req.params.problem_id, 10);
    const userId = (req.user && req.user.id) ? req.user.id : (parseInt(req.query.user_id, 10) || 1);

    if (isNaN(problemId)) return res.status(400).json({ error: 'Invalid problem ID' });

    const data = await StageService.getProblemStagesForUser(userId, problemId);
    if (!data) return res.status(404).json({ error: 'No stages found for this problem' });

    return res.json(data);
  } catch (err) {
    Logger.error('StageController', 'Error fetching stages', err);
    return res.status(500).json({ error: 'Failed to fetch stages' });
  }
};

exports.getStageDetail = async (req, res) => {
  try {
    const stageId = parseInt(req.params.id || req.params.stage_id, 10);
    if (isNaN(stageId)) return res.status(400).json({ error: 'Invalid stage ID' });

    const stage = await StageService.getStageById(stageId);
    if (!stage) return res.status(404).json({ error: 'Stage not found' });

    return res.json(stage);
  } catch (err) {
    Logger.error('StageController', 'Error fetching stage detail', err);
    return res.status(500).json({ error: 'Failed to fetch stage detail' });
  }
};

exports.createStage = async (req, res) => {
  try {
    const { problem_id, name, order_index } = req.body;
    if (!problem_id || !name || !order_index) {
      return res.status(400).json({ error: 'problem_id, name, and order_index are required' });
    }

    const stage = await StageService.createStage(req.body);
    return res.status(201).json(stage);
  } catch (err) {
    Logger.error('StageController', 'Error creating stage', err);
    return res.status(500).json({ error: 'Failed to create stage' });
  }
};

exports.updateStage = async (req, res) => {
  try {
    const stageId = parseInt(req.params.id || req.params.stage_id, 10);
    if (isNaN(stageId)) return res.status(400).json({ error: 'Invalid stage ID' });

    const updated = await StageService.updateStage(stageId, req.body);
    if (!updated) return res.status(404).json({ error: 'Stage not found' });

    return res.json(updated);
  } catch (err) {
    Logger.error('StageController', 'Error updating stage', err);
    return res.status(500).json({ error: 'Failed to update stage' });
  }
};

exports.deleteStage = async (req, res) => {
  try {
    const stageId = parseInt(req.params.id || req.params.stage_id, 10);
    if (isNaN(stageId)) return res.status(400).json({ error: 'Invalid stage ID' });

    const deleted = await StageService.deleteStage(stageId);
    if (!deleted) return res.status(404).json({ error: 'Stage not found' });

    return res.json({ message: 'Stage deleted successfully' });
  } catch (err) {
    Logger.error('StageController', 'Error deleting stage', err);
    return res.status(500).json({ error: 'Failed to delete stage' });
  }
};

exports.submitStage = async (req, res) => {
  try {
    const stageId = parseInt(req.params.stage_id, 10);
    const userId = (req.user && req.user.id) ? req.user.id : (parseInt(req.body.user_id, 10) || 1);
    const { language = 'cpp', code } = req.body;

    if (isNaN(stageId)) return res.status(400).json({ error: 'Invalid stage ID' });
    if (!code) return res.status(400).json({ error: 'code is required' });

    Logger.info('StageController', `Evaluating stage submission for Stage ${stageId}`);
    const result = await StageService.submitStageCode(userId, stageId, language, code);
    return res.status(201).json(result);
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({
        error: err.status === 403 ? 'STAGE_LOCKED' : 'ERROR',
        message: err.message
      });
    }
    Logger.error('StageController', 'Stage submission error', err);
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
    Logger.error('StageController', 'Error fetching stage history', err);
    return res.status(500).json({ error: 'Failed to fetch stage history' });
  }
};