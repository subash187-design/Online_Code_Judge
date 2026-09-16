const express = require('express');
const router = express.Router();
const AnalysisController = require('../controllers/analysis.controller');

router.get('/:submission_id', AnalysisController.getSubmissionAnalysis);

module.exports = router;
