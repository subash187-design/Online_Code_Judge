import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage({ onNavigate }) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await register(name.trim(), email.trim(), password, confirmPassword);
      onNavigate('verify-email', { email: res.email || email.trim() });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
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
            Create your account
          </h2>
          <p className="text-slate-500 dark:text-zinc-400 text-xs font-normal">
            Start your algorithmic preparedness journey
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-black dark:text-white text-xs flex items-start gap-2.5">
            <AlertCircle size={16} className="shrink-0 mt-0.5 text-black dark:text-white" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-black dark:text-white mb-1.5">
              Full name:
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50/70 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-sm text-black dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-black dark:focus:border-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-black dark:text-white mb-1.5">
              Enter your email:
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
            <label className="block text-xs font-semibold text-black dark:text-white mb-1.5">
              Enter your pass:
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50/70 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-sm text-black dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-black dark:focus:border-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-black dark:text-white mb-1.5">
              Confirm password:
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="•••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50/70 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-sm text-black dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-black dark:focus:border-white transition-all"
            />
          </div>



          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-black hover:bg-zinc-800 active:bg-zinc-900 text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-1.5 dark:bg-white dark:text-black dark:hover:bg-zinc-200 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create your account'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800 text-center text-xs text-slate-500 dark:text-zinc-400">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('signin')}
            className="text-black dark:text-white hover:underline font-bold"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
