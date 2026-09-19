const express = require('express');
const router = express.Router();
const ProblemController = require('../controllers/problem.controller');
const { authenticateToken, requireRole } = require('../middleware/auth.middleware');

// Public routes
router.get('/', ProblemController.listProblems);
router.get('/:id', ProblemController.getProblemDetail);

// Admin-only management routes
router.post('/', authenticateToken, requireRole('ADMIN'), ProblemController.createProblem);
router.put('/:id', authenticateToken, requireRole('ADMIN'), ProblemController.updateProblem);
router.delete('/:id', authenticateToken, requireRole('ADMIN'), ProblemController.deleteProblem);

module.exports = router;
