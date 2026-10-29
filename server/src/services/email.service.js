require('dotenv').config();
const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.useMock = false;

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        connectionTimeout: 4000,
        greetingTimeout: 4000,
        socketTimeout: 5000
      });
      console.log('[EmailService] Configured with external SMTP host:', process.env.SMTP_HOST);
    } else {
      this.useMock = true;
      console.log('[EmailService] No SMTP credentials provided. Running in CONSOLE / MOCK mode.');
    }
  }

  async sendVerificationEmail(email, otp, name = 'User') {
    const subject = 'Verify your Online Code Judge account';
    const text = `Hello ${name},\n\nYour email verification code is: ${otp}\nThis code will expire in 15 minutes.\n\nIf you did not request this, please ignore this email.`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #2563eb; text-align: center;">Online Code Judge</h2>
        <p>Hello <strong>${name}</strong>,</p>
        <p>Thank you for signing up. Please use the following 6-digit verification code to complete your registration:</p>
        <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; text-align: center; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1e293b;">${otp}</span>
        </div>
        <p style="color: #64748b; font-size: 14px;">This code will expire in <strong>15 minutes</strong>.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="color: #94a3b8; font-size: 12px; text-align: center;">If you did not register for an account, please disregard this email.</p>
      </div>
    `;

    if (this.useMock || !this.transporter) {
      console.log('\n================== [EMAIL DISPATCHED (DEV/MOCK)] ==================');
      console.log(`To: ${email}`);
      console.log(`Subject: ${subject}`);
      console.log(`Verification Code (OTP): ${otp}`);
      console.log('===================================================================\n');
      return { success: true, mock: true, otp };
    }

    try {
      const sendPromise = this.transporter.sendMail({
        from: process.env.SMTP_FROM || `"Algomind Online Code Judge" <${process.env.SMTP_USER}>`,
        to: email,
        subject,
        text,
        html,
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('SMTP dispatch timed out')), 4000)
      );

      const info = await Promise.race([sendPromise, timeoutPromise]);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.warn('[EmailService] SMTP delivery failed or timed out:', err.message);
      console.log(`\n================== [FALLBACK OTP FOR ${email}] ==================`);
      console.log(`CODE: ${otp}`);
      console.log('===================================================================\n');
      return { success: false, fallback: true, otp };
    }
  }
}

module.exports = new EmailService();