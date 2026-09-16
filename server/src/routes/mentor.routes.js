const express = require('express');
const router = express.Router();
const MentorController = require('../controllers/mentor.controller');

// Mount under /api/v1/mentor
router.get('/feedback/:submission_id', MentorController.getFeedback);
router.post('/hints/:stage_id', MentorController.requestHint);

module.exports = router;
