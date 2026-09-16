const express = require('express');
const router = express.Router();
const SubmissionController = require('../controllers/submission.controller');
const { optionalAuth } = require('../middleware/auth.middleware');

router.post('/', optionalAuth, SubmissionController.submitCode);
router.get('/', optionalAuth, SubmissionController.getSubmissionHistory);

module.exports = router;