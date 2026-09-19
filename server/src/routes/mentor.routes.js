const express = require('express');
const router = express.Router();
const MentorController = require('../controllers/mentor.controller');
const { optionalAuth } = require('../middleware/auth.middleware');

// Mount under /api/v1/mentor
router.get('/feedback/:submission_id', optionalAuth, MentorController.getFeedback);
router.get('/history/:stage_id', optionalAuth, MentorController.getHistory);
router.post('/hints/:stage_id?', optionalAuth, MentorController.requestHint);
router.post('/hints', optionalAuth, MentorController.requestHint);

module.exports = router;
