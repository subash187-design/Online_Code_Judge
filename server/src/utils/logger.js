/**
 * Backend Logger Utility
 * Provides structured logging with levels: INFO, DEBUG, WARN, ERROR.
 * Automatically timestamps entries and prevents logging sensitive credentials.
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

const CURRENT_LEVEL = process.env.LOG_LEVEL 
  ? (LOG_LEVELS[process.env.LOG_LEVEL.toUpperCase()] ?? LOG_LEVELS.INFO)
  : (process.env.NODE_ENV === 'test' ? LOG_LEVELS.WARN : LOG_LEVELS.INFO);

function formatTimestamp() {
  return new Date().toISOString();
}

function sanitize(data) {
  if (!data) return data;
  if (typeof data === 'string') {
    return data
      .replace(/password\s*[:=]\s*[^,\s]+/gi, 'password=[REDACTED]')
      .replace(/Bearer\s+[A-Za-z0-9._-]+/gi, 'Bearer [REDACTED]')
      .replace(/token\s*[:=]\s*[^,\s]+/gi, 'token=[REDACTED]');
  }
  if (typeof data === 'object') {
    try {
      const clone = JSON.parse(JSON.stringify(data));
      if (clone.password) clone.password = '[REDACTED]';
      if (clone.password_hash) clone.password_hash = '[REDACTED]';
      if (clone.token) clone.token = '[REDACTED]';
      if (clone.authorization) clone.authorization = '[REDACTED]';
      return clone;
    } catch {
      return data;
    }
  }
  return data;
}

class Logger {
  static debug(context, message, data = null) {
    if (CURRENT_LEVEL <= LOG_LEVELS.DEBUG) {
      console.log(`[${formatTimestamp()}] [DEBUG] [${context}] ${message}`, data ? sanitize(data) : '');
    }
  }

  static info(context, message, data = null) {
    if (CURRENT_LEVEL <= LOG_LEVELS.INFO) {
      console.log(`[${formatTimestamp()}] [INFO] [${context}] ${message}`, data ? sanitize(data) : '');
    }
  }

  static warn(context, message, data = null) {
    if (CURRENT_LEVEL <= LOG_LEVELS.WARN) {
      console.warn(`[${formatTimestamp()}] [WARN] [${context}] ${message}`, data ? sanitize(data) : '');
    }
  }

  static error(context, message, error = null) {
    if (CURRENT_LEVEL <= LOG_LEVELS.ERROR) {
      console.error(`[${formatTimestamp()}] [ERROR] [${context}] ${message}`, error ? sanitize(error) : '');
    }
  }
}

module.exports = Logger;
