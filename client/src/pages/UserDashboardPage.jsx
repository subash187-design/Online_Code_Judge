import React, { useState, useEffect } from 'react';
import { User, Activity, Code2, CheckCircle2, Clock, Terminal, ChevronRight, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UserDashboardPage({ onNavigate, onSelectProblem }) {
  const { user, authFetch } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      authFetch(`/api/v1/submissions?user_id=${user.id}`)
        .then(res => res.json())
        .then(data => {
          setSubmissions(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to load user submissions:', err);
          setLoading(false);
        });
    }
  }, [user]);

  const acceptedCount = submissions.filter(s => s.verdict === 'ACCEPTED').length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-2xl font-bold font-mono">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User size={28} />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white tracking-tight">{user?.name || user?.username}</h1>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold uppercase">
                {user?.role || 'USER'}
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-1">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('problems')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20"
        >
          <Code2 size={16} />
          Browse Problems
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Total Submissions
            <Activity size={16} className="text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white font-mono">{submissions.length}</div>
          <div className="text-xs text-slate-500 mt-1">Recorded sandbox evaluations</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Accepted Solutions
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-emerald-400 font-mono">{acceptedCount}</div>
          <div className="text-xs text-slate-500 mt-1">
            {submissions.length > 0 ? `${Math.round((acceptedCount / submissions.length) * 100)}% acceptance rate` : 'No submissions yet'}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Verification Status
            <Award size={16} className="text-purple-400" />
          </div>
          <div className="text-base font-semibold text-white flex items-center gap-2 mt-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
            Email Verified
          </div>
          <div className="text-xs text-slate-500 mt-1">Authenticated via SHA-256 OTP</div>
        </div>
      </div>

      {/* Recent Submissions Feed */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Clock size={18} className="text-slate-400" />
          Recent Activity & Submissions
        </h2>

        {loading && (
          <div className="py-8 text-center text-slate-500 text-sm">Loading activity feed...</div>
        )}

        {!loading && submissions.length === 0 && (
          <div className="py-10 text-center text-slate-400 text-sm">
            You haven't made any submissions yet.{' '}
            <button
              onClick={() => onNavigate('problems')}
              className="text-blue-400 hover:text-blue-300 font-semibold ml-1"
            >
              Start solving problems
            </button>
          </div>
        )}

        {!loading && submissions.length > 0 && (
          <div className="divide-y divide-slate-800/60 overflow-hidden">
            {submissions.slice(0, 10).map((sub) => (
              <div key={sub.id} className="py-3 flex items-center justify-between gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded text-xs font-semibold font-mono ${
                    sub.verdict === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    sub.verdict === 'WRONG_ANSWER' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {sub.verdict}
                  </span>
                  <span className="text-slate-300 font-medium">Problem #{sub.problem_id}</span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400">
                  {sub.execution_time_ms !== null && <span>{sub.execution_time_ms} ms</span>}
                  {sub.memory_used_kb !== null && <span>{Math.round(sub.memory_used_kb / 1024)} MB</span>}
                  <span>{new Date(sub.created_at).toLocaleDateString()}</span>
                  <button
                    onClick={() => {
                      if (onSelectProblem) onSelectProblem(sub.problem_id);
                    }}
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    View Problem <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}