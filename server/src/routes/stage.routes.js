const express = require('express');
const router = express.Router();
const StageController = require('../controllers/stage.controller');
const { optionalAuth, authenticateToken, requireRole } = require('../middleware/auth.middleware');

// User Submission & History routes
router.post('/:stage_id/submissions', optionalAuth, StageController.submitStage);
router.get('/:stage_id/submissions', optionalAuth, StageController.getStageHistory);

// Stage details
router.get('/:id', optionalAuth, StageController.getStageDetail);

// Admin-only stage management
router.post('/', authenticateToken, requireRole('ADMIN'), StageController.createStage);
router.put('/:id', authenticateToken, requireRole('ADMIN'), StageController.updateStage);
router.delete('/:id', authenticateToken, requireRole('ADMIN'), StageController.deleteStage);

module.exports = router;