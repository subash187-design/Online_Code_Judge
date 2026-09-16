const express = require('express');
const router = express.Router();
const SubmissionController = require('../controllers/submission.controller');

router.post('/run', SubmissionController.runCustom);

module.exports = router;
