const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { generateOTP, hashToken } = require('../utils/crypto');
const emailService = require('./email.service');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_judge_jwt_key_987654321_secure';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const OTP_TTL_MINUTES = parseInt(process.env.EMAIL_VERIFICATION_TTL_MINUTES || '15', 10);

class AuthService {
  /**
   * Log authentication events
   */
  async logAuthEvent({ userId = null, email, action, ipAddress = null, userAgent = null, status, metadata = {} }) {
    try {
      await db.query(
        `INSERT INTO auth_logs (user_id, email, action, ip_address, user_agent, status, metadata)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [userId, email, action, ipAddress, userAgent, status, JSON.stringify(metadata)]
      );
    } catch (err) {
      console.error('[AuthService] Failed to record auth log:', err.message);
    }
  }

  /**
   * Register a new user
   */
  async register({ name, email, password, ipAddress, userAgent }) {
    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await db.query('SELECT id, email_verified FROM users WHERE email = $1', [normalizedEmail]);
    if (existingUser.rows.length > 0) {
      throw new Error('An account with this email address already exists');
    }

    // New user registration
    const username = normalizedEmail.split('@')[0] + '_' + Math.floor(1000 + Math.random() * 9000);
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const otp = generateOTP();
    const hashedOtp = hashToken(otp);
    const expiry = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

    const result = await db.query(
      `INSERT INTO users (username, name, email, password_hash, role, email_verified, verification_token_hash, verification_token_expiry)
       VALUES ($1, $2, $3, $4, 'USER', FALSE, $5, $6)
       RETURNING id, username, name, email, role, email_verified`,
      [username, name.trim(), normalizedEmail, passwordHash, hashedOtp, expiry]
    );

    const newUser = result.rows[0];
    await emailService.sendVerificationEmail(normalizedEmail, otp, name.trim());
    await this.logAuthEvent({
      userId: newUser.id,
      email: normalizedEmail,
      action: 'REGISTER',
      ipAddress,
      userAgent,
      status: 'SUCCESS'
    });

    return {
      message: 'Account registered successfully. A 6-digit verification code has been dispatched to your email.',
      email: normalizedEmail,
      requiresVerification: true
    };
  }

  /**
   * Verify email using 6-digit OTP
   */
  async verifyEmail({ email, otp, ipAddress, userAgent }) {
    const normalizedEmail = email.trim().toLowerCase();
    const result = await db.query(
      `SELECT id, name, email, email_verified, verification_token_hash, verification_token_expiry 
       FROM users WHERE email = $1`,
      [normalizedEmail]
    );

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    const user = result.rows[0];

    if (user.email_verified) {
      return { message: 'Email is already verified. You can log in.' };
    }

    if (!user.verification_token_hash || !user.verification_token_expiry) {
      throw new Error('No active verification code found. Please request a new one.');
    }

    if (new Date() > new Date(user.verification_token_expiry)) {
      await this.logAuthEvent({
        userId: user.id,
        email: normalizedEmail,
        action: 'VERIFY_EMAIL',
        ipAddress,
        userAgent,
        status: 'FAILED',
        metadata: { reason: 'Code expired' }
      });
      throw new Error('Verification code has expired. Please request a new one.');
    }

    const providedHash = hashToken(otp.trim());
    if (providedHash !== user.verification_token_hash) {
      await this.logAuthEvent({
        userId: user.id,
        email: normalizedEmail,
        action: 'VERIFY_EMAIL',
        ipAddress,
        userAgent,
        status: 'FAILED',
        metadata: { reason: 'Invalid code' }
      });
      throw new Error('Invalid verification code. Please check and try again.');
    }

    // Token is valid! Mark verified and invalidate token
    await db.query(
      `UPDATE users 
       SET email_verified = TRUE, verification_token_hash = NULL, verification_token_expiry = NULL
       WHERE id = $1`,
      [user.id]
    );

    await this.logAuthEvent({
      userId: user.id,
      email: normalizedEmail,
      action: 'VERIFY_EMAIL',
      ipAddress,
      userAgent,
      status: 'SUCCESS'
    });

    return { message: 'Email verified successfully! You can now log in.' };
  }

  /**
   * Resend verification OTP with rate limiting protection
   */
  async resendVerification({ email, ipAddress, userAgent }) {
    const normalizedEmail = email.trim().toLowerCase();
    const result = await db.query(
      `SELECT id, name, email, email_verified, verification_token_expiry 
       FROM users WHERE email = $1`,
      [normalizedEmail]
    );

    if (result.rows.length === 0) {
      throw new Error('User not found with this email');
    }

    const user = result.rows[0];

    if (user.email_verified) {
      return { message: 'Email is already verified.' };
    }

    // Prevent spamming resend within 60 seconds
    if (user.verification_token_expiry) {
      const remainingMs = new Date(user.verification_token_expiry).getTime() - Date.now();
      const initialMs = OTP_TTL_MINUTES * 60 * 1000;
      const elapsedMs = initialMs - remainingMs;
      if (elapsedMs < 60 * 1000 && elapsedMs > 0) {
        throw new Error('Please wait 60 seconds before requesting another code.');
      }
    }

    const otp = generateOTP();
    const hashedOtp = hashToken(otp);
    const expiry = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

    await db.query(
      `UPDATE users 
       SET verification_token_hash = $1, verification_token_expiry = $2
       WHERE id = $3`,
      [hashedOtp, expiry, user.id]
    );

    await emailService.sendVerificationEmail(normalizedEmail, otp, user.name || 'User');
    await this.logAuthEvent({
      userId: user.id,
      email: normalizedEmail,
      action: 'RESEND_OTP',
      ipAddress,
      userAgent,
      status: 'SUCCESS'
    });

    return {
      message: 'A new verification code has been dispatched to your email.'
    };
  }

  /**
   * Login user and issue JWT
   */
  async login({ email, password, ipAddress, userAgent }) {
    const normalizedEmail = email.trim().toLowerCase();

    const result = await db.query(
      `SELECT id, username, name, email, password_hash, role, email_verified
       FROM users WHERE email = $1`,
      [normalizedEmail]
    );

    if (result.rows.length === 0) {
      await this.logAuthEvent({
        email: normalizedEmail,
        action: 'LOGIN',
        ipAddress,
        userAgent,
        status: 'FAILED',
        metadata: { reason: 'User not found' }
      });
      throw new Error('Invalid email or password');
    }

    const user = result.rows[0];

    if (!user.password_hash) {
      throw new Error('Password not set for this account. Please use registration to set a password.');
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      await this.logAuthEvent({
        userId: user.id,
        email: normalizedEmail,
        action: 'LOGIN',
        ipAddress,
        userAgent,
        status: 'FAILED',
        metadata: { reason: 'Invalid password' }
      });
      throw new Error('Invalid email or password');
    }

    if (!user.email_verified) {
      await this.logAuthEvent({
        userId: user.id,
        email: normalizedEmail,
        action: 'LOGIN',
        ipAddress,
        userAgent,
        status: 'FAILED',
        metadata: { reason: 'Email unverified' }
      });
      const error = new Error('Email not verified. Please verify your email before logging in.');
      error.requiresVerification = true;
      error.email = normalizedEmail;
      throw error;
    }

    // Generate JWT
    const tokenPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Update last_login_at
    await db.query('UPDATE users SET last_login_at = NOW() WHERE id = $1', [user.id]);

    await this.logAuthEvent({
      userId: user.id,
      email: normalizedEmail,
      action: 'LOGIN',
      ipAddress,
      userAgent,
      status: 'SUCCESS'
    });

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  /**
   * Get user details by ID
   */
  async getProfile(userId) {
    const result = await db.query(
      `SELECT id, username, name, email, role, email_verified, created_at, last_login_at
       FROM users WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    return result.rows[0];
  }
}

module.exports = new AuthService();