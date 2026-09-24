import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

export default function VerifyEmailPage({ initialEmail = '', onNavigate }) {
  const [email, setEmail] = useState(() => {
    return initialEmail || localStorage.getItem('pending_verification_email') || '';
  });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
      try {
        localStorage.setItem('pending_verification_email', initialEmail);
      } catch {}
    }
  }, [initialEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('No verification email found. Please sign up or log in again.');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('/api/v1/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), otp: otp.trim() })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      try {
        localStorage.removeItem('pending_verification_email');
      } catch {}

      setSuccess('Email verified successfully! Redirecting to sign in...');
      setTimeout(() => {
        onNavigate('signin');
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError('No verification email found. Please sign up or log in again.');
      return;
    }

    setError('');
    setSuccess('');
    setResending(true);

    try {
      const res = await fetch('/api/v1/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to resend code');
      }

      setSuccess('A new 6-digit verification code has been dispatched to your email inbox.');
    } catch (err) {
      setError(err.message);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-[#f2f4f7] dark:bg-[#121212] transition-colors">
      <div className="w-full max-w-md bg-white border border-[#e2e4e8] shadow-xl dark:bg-[#1e1e1e] dark:border-[#2d2d2d] rounded-3xl p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-3 border border-blue-500/20">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Verify Your Email</h2>
          <p className="text-slate-500 dark:text-zinc-400 text-sm mt-1">
            Please enter the 6-digit verification code sent to your inbox.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300 text-sm flex items-start gap-3">
            <AlertCircle size={18} className="shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-300 text-sm flex items-start gap-3">
            <CheckCircle size={18} className="shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5 uppercase tracking-wider">
              6-Digit Verification Code
            </label>
            <input
              type="text"
              required
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              className="w-full text-center tracking-[0.4em] font-mono text-xl py-3 rounded-xl bg-[#f8f9fa] border border-[#d5d9de] text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 dark:bg-[#141414] dark:border-[#2e2e2e] dark:text-white dark:placeholder-zinc-600 dark:focus:border-blue-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
          <span>Didn't receive the code?</span>
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw size={12} className={resending ? 'animate-spin' : ''} />
            {resending ? 'Resending...' : 'Resend Code'}
          </button>
        </div>
      </div>
    </div>
  );
}
