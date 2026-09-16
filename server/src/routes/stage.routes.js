const express = require('express');
const router = express.Router();
const StageController = require('../controllers/stage.controller');
const { optionalAuth } = require('../middleware/auth.middleware');

// Mount under /api/v1/stages
router.post('/:stage_id/submissions', optionalAuth, StageController.submitStage);
router.get('/:stage_id/submissions', optionalAuth, StageController.getStageHistory);

module.exports = router;