const express = require('express');
const router = express.Router();
const ProblemController = require('../controllers/problem.controller');

router.get('/', ProblemController.listProblems);
router.get('/:id', ProblemController.getProblemDetail);

module.exports = router;
