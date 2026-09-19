import React, { useState } from 'react';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage({ onNavigate }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email.trim(), password);
      onNavigate('dashboard');
    } catch (err) {
      if (err.requiresVerification) {
        onNavigate('verify-email', { email: err.email || email.trim() });
      } else {
        setError(err.message || 'Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-[#F8F9FA] dark:bg-[#0E1117] transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-[#181B22] border border-slate-200/90 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
        
        {/* Brand Header from PDF */}
        <div className="text-left mb-6 space-y-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-auto flex items-center">
              <img src="/logo.png" alt="Algomind Logo" className="h-full w-auto object-contain dark:brightness-110" />
            </div>
            <span className="font-bold text-sm tracking-tight text-black dark:text-white">Algomind</span>
          </div>
          <h2 className="text-2xl font-extrabold text-black dark:text-white tracking-tight">
            Welcome back
          </h2>
          <p className="text-slate-500 dark:text-zinc-400 text-xs font-normal">
            Sign in to your Algomind account
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-black dark:text-white text-xs flex items-start gap-2.5">
            <AlertCircle size={16} className="shrink-0 mt-0.5 text-black dark:text-white" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-black dark:text-white mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50/70 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-sm text-black dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-black dark:focus:border-white transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-black dark:text-white">
                Password
              </label>
              <button
                type="button"
                className="text-xs text-slate-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50/70 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-sm text-black dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-black dark:focus:border-white transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-black hover:bg-zinc-800 active:bg-zinc-900 text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-1.5 dark:bg-white dark:text-black dark:hover:bg-zinc-200 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in >'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800 text-center text-xs text-slate-500 dark:text-zinc-400">
          Don't have an account?{' '}
          <button
            onClick={() => onNavigate('signup')}
            className="text-black dark:text-white hover:underline font-bold"
          >
            Create one
          </button>
        </div>
      </div>
    </div>
  );
}
