const express = require('express');
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/auth.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();

// Rate limiter for authentication attempts (strict)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 requests per window
  message: { error: 'Too many authentication attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter for resending verification emails (very strict)
const resendLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // 5 requests per 5 minutes
  message: { error: 'Too many resend attempts. Please wait a few minutes before trying again.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Public endpoints
router.post('/register', authLimiter, (req, res) => authController.register(req, res));
router.post('/verify-email', authLimiter, (req, res) => authController.verifyEmail(req, res));
router.post('/resend-verification', resendLimiter, (req, res) => authController.resendVerification(req, res));
router.post('/login', authLimiter, (req, res) => authController.login(req, res));

// Authenticated endpoints
router.get('/me', authenticateToken, (req, res) => authController.getMe(req, res));

module.exports = router;