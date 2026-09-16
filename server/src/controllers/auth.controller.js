const authService = require('../services/auth.service');

// Password complexity regex: at least 8 chars, 1 uppercase, 1 lowercase, 1 number
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Full name is required.' });
      }

      if (!email || !EMAIL_REGEX.test(email.trim())) {
        return res.status(400).json({ error: 'A valid email address is required.' });
      }

      if (!password) {
        return res.status(400).json({ error: 'Password is required.' });
      }

      if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({
          error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'
        });
      }

      if (confirmPassword !== undefined && password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match.' });
      }

      const ipAddress = req.ip || req.connection.remoteAddress;
      const userAgent = req.headers['user-agent'];

      const result = await authService.register({
        name,
        email,
        password,
        ipAddress,
        userAgent
      });

      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async verifyEmail(req, res) {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(400).json({ error: 'Email and verification code are required.' });
      }

      if (!/^\d{6}$/.test(otp.trim())) {
        return res.status(400).json({ error: 'Verification code must be a 6-digit number.' });
      }

      const ipAddress = req.ip || req.connection.remoteAddress;
      const userAgent = req.headers['user-agent'];

      const result = await authService.verifyEmail({
        email,
        otp,
        ipAddress,
        userAgent
      });

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async resendVerification(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
      }

      const ipAddress = req.ip || req.connection.remoteAddress;
      const userAgent = req.headers['user-agent'];

      const result = await authService.resendVerification({
        email,
        ipAddress,
        userAgent
      });

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }

      const ipAddress = req.ip || req.connection.remoteAddress;
      const userAgent = req.headers['user-agent'];

      const result = await authService.login({
        email,
        password,
        ipAddress,
        userAgent
      });

      return res.status(200).json(result);
    } catch (err) {
      if (err.requiresVerification) {
        return res.status(403).json({
          error: err.message,
          requiresVerification: true,
          email: err.email
        });
      }
      return res.status(401).json({ error: err.message });
    }
  }

  async getMe(req, res) {
    try {
      const user = await authService.getProfile(req.user.id);
      return res.status(200).json({ user });
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }
}

module.exports = new AuthController();