const express = require('express');
const router = express.Router();
const AnalyticsController = require('../controllers/analytics.controller');

router.get('/problems/:problem_id/journey', AnalyticsController.getProblemJourney);
router.get('/compare', AnalyticsController.compareSubmissions);
router.get('/dashboard', AnalyticsController.getDashboard);

module.exports = router;
