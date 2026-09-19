const express = require('express');
const router = express.Router();
const AnalyticsController = require('../controllers/analytics.controller');
const { optionalAuth } = require('../middleware/auth.middleware');

router.get('/problems/:problem_id/journey', optionalAuth, AnalyticsController.getProblemJourney);
router.get('/compare', optionalAuth, AnalyticsController.compareSubmissions);
router.get('/dashboard', optionalAuth, AnalyticsController.getDashboard);

module.exports = router;
