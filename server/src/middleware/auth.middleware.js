const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_judge_jwt_key_987654321_secure';

/**
 * Authentication Middleware
 * Validates the JWT Bearer token and attaches user payload to req.user.
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Authentication token required.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired. Please log in again.' });
    }
    return res.status(403).json({ error: 'Invalid or malformed token.' });
  }
}

/**
 * Optional Authentication Middleware
 * If token is present and valid, attaches req.user.
 * If token is missing, allows req.user to fallback gracefully.
 */
function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    req.user = null;
  }
  next();
}

/**
 * Role-Based Access Control (RBAC) Middleware
 * Ensures req.user has one of the required roles.
 */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Forbidden. Insufficient permissions. Required role: ${allowedRoles.join(' or ')}`
      });
    }

    next();
  };
}

module.exports = {
  authenticateToken,
  optionalAuth,
  requireRole
};