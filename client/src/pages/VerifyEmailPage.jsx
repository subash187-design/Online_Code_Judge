import React, { useState } from 'react';
import { ShieldCheck, Mail, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

export default function VerifyEmailPage({ initialEmail = '', onNavigate }) {
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setError('Please provide your email address to resend the code.');
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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-slate-950">
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 mb-3 border border-blue-500/20">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Verify Your Email</h2>
          <p className="text-slate-400 text-sm mt-1">
            Please enter the 6-digit verification code sent to your email inbox.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-start gap-3">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-start gap-3">
            <CheckCircle size={18} className="shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              6-Digit Verification Code
            </label>
            <input
              type="text"
              required
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="••••••"
              className="w-full text-center tracking-[0.75em] text-2xl font-mono py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            <p className="text-xs text-slate-500 mt-1.5 text-center">Codes expire after 15 minutes.</p>
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full mt-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
          >
            {loading ? 'Verifying Code...' : 'Verify Code & Activate'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw size={14} className={resending ? 'animate-spin' : ''} />
            Resend verification code
          </button>

          <button
            onClick={() => onNavigate('signin')}
            className="hover:text-slate-200 transition-colors"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}