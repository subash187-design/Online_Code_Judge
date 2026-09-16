const crypto = require('crypto');

function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

function generateHexToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString('hex');
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

module.exports = {
  generateOTP,
  generateHexToken,
  hashToken
};