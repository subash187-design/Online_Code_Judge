import React, { useState, useEffect } from 'react';
import { Shield, Users, Server, Database, Activity, AlertTriangle, CheckCircle, Terminal } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboardPage({ onNavigate }) {
  const { user, authFetch } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProblems: 0,
    totalSubmissions: 0,
    serverHealth: 'checking'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const [healthRes, problemsRes, submissionsRes] = await Promise.all([
        fetch('/health'),
        fetch('/api/v1/problems'),
        authFetch('/api/v1/submissions')
      ]);

      const health = await healthRes.json();
      const problems = await problemsRes.json();
      const submissions = await submissionsRes.json();

      setStats({
        totalProblems: Array.isArray(problems) ? problems.length : 0,
        totalSubmissions: Array.isArray(submissions) ? submissions.length : 0,
        serverHealth: health.status === 'ok' ? 'Operational' : 'Degraded'
      });
    } catch (err) {
      console.error('Failed to fetch admin metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'ADMIN') {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-2xl bg-rose-950/30 border border-rose-800 text-center">
        <AlertTriangle size={36} className="text-rose-400 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-white mb-2">Access Forbidden</h2>
        <p className="text-slate-400 text-sm mb-6">
          This area requires the <strong>ADMIN</strong> role. Your account does not have sufficient permissions.
        </p>
        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-lg transition-colors"
        >
          Return to User Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Admin Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-amber-50/80 border border-amber-200 dark:bg-gradient-to-r dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900 dark:border-amber-500/20 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Shield size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">System Administration</h1>
              <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded uppercase">
                ADMIN CONSOLE
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Control panel & platform telemetry</p>
          </div>
        </div>

        <button
          onClick={fetchMetrics}
          className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-[#d5d9de] dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700 text-sm rounded-xl flex items-center gap-2 transition-colors shadow-sm"
        >
          <Activity size={15} />
          Refresh Telemetry
        </button>
      </div>

      {/* Admin Stat Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="p-5 rounded-2xl bg-white border border-[#e2e4e8] shadow-sm dark:bg-slate-900/60 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Catalog Problems
            <Database size={16} className="text-blue-500 dark:text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white font-mono">{stats.totalProblems}</div>
          <div className="text-xs text-slate-500 mt-1">Configured multi-stage challenges</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#e2e4e8] shadow-sm dark:bg-slate-900/60 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Total Submissions
            <Activity size={16} className="text-purple-500 dark:text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white font-mono">{stats.totalSubmissions}</div>
          <div className="text-xs text-slate-500 mt-1">Platform-wide evaluations</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#e2e4e8] shadow-sm dark:bg-slate-900/60 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Execution Sandbox
            <Server size={16} className="text-emerald-500 dark:text-emerald-400" />
          </div>
          <div className="text-base font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mt-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            {stats.serverHealth}
          </div>
          <div className="text-xs text-slate-500 mt-1">Docker Linux Sandbox & Judge Daemon</div>
        </div>
      </div>

      {/* Admin Configuration Note */}
      <div className="p-6 rounded-2xl bg-white border border-[#e2e4e8] shadow-sm dark:bg-slate-900/60 dark:border-slate-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <Terminal size={18} className="text-amber-500 dark:text-amber-400" />
          Management Capabilities
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
          As an authenticated administrator, you have access to privileged backend operations including testcase management, reference solution verification, and telemetry audit logs.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('problems')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
          >
            Manage Problems & Test Cases
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-4 py-2 rounded-xl bg-[#edeef1] hover:bg-[#e2e4e8] text-slate-700 border border-[#d5d9de] dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:border-transparent text-sm font-medium transition-colors"
          >
            Switch to User View
          </button>
        </div>
      </div>
    </div>
  );
}