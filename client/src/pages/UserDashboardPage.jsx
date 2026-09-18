import React, { useState, useEffect } from 'react';
import { 
  User, 
  Activity, 
  Code2, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  ChevronRight, 
  TrendingUp, 
  Zap, 
  Layers, 
  ArrowUpRight,
  Flame,
  Search,
  Sparkles,
  LayoutDashboard,
  Filter,
  BarChart2,
  Cpu,
  ShieldCheck,
  Compass,
  FileCode,
  LogOut,
  ChevronDown,
  ArrowDownRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import VerdictBadge from '../components/VerdictBadge';

export default function UserDashboardPage({ onNavigate, onSelectProblem }) {
  const { user, authFetch, logout } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [dashboardMetrics, setDashboardMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState('ALL');
  const [dateRange, setDateRange] = useState('All Time');

  useEffect(() => {
    if (user?.id) {
      Promise.all([
        authFetch(`/api/v1/submissions?user_id=${user.id}`).then(res => res.json()),
        authFetch(`/api/v1/analytics/dashboard?user_id=${user.id}`).then(res => res.json()).catch(() => null)
      ])
        .then(([subsData, dashData]) => {
          setSubmissions(Array.isArray(subsData) ? subsData : []);
          if (dashData && dashData.overview) {
            setDashboardMetrics(dashData);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to load user dashboard analytics:', err);
          setLoading(false);
        });
    }
  }, [user]);

  const acceptedCount = submissions.filter(s => s.verdict === 'ACCEPTED').length;
  const totalSubmissions = submissions.length;
  const solveRate = totalSubmissions > 0 ? Math.round((acceptedCount / totalSubmissions) * 100) : 0;

  // Mock performance sparkline data points
  const sparklineBars = [35, 60, 45, 80, 65, 95, 75, 100, 85, 90, 70, 85];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-[#F8FAFC] dark:bg-[#060913] text-slate-900 dark:text-zinc-100 transition-colors">
      
      {/* 1. Left Vertical Rail (Skymetrics / Zajno Style) */}
      <aside className="w-64 border-r border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#0B0F19] p-5 hidden lg:flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          
          {/* Workspace Pill */}
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-slate-100/70 dark:bg-zinc-900/80 border border-slate-200/70 dark:border-zinc-800/60">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-soft-sm">
              <Sparkles size={16} />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate">Skymetrics Judge</span>
              <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">Developer Intelligence</span>
            </div>
          </div>

          {/* Navigation Category */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 px-3 py-1">
              Platform Intelligence
            </div>

            <button
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-900/50 shadow-soft-sm transition-all"
            >
              <LayoutDashboard size={16} />
              Performance Studio
            </button>

            <button
              onClick={() => onNavigate('problems')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/60 hover:text-slate-900 dark:hover:text-white transition-all"
            >
              <Code2 size={16} />
              Problem Catalog
            </button>

            <button
              onClick={() => onNavigate('problems')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/60 hover:text-slate-900 dark:hover:text-white transition-all"
            >
              <TrendingUp size={16} />
              Optimization Journey
            </button>

            <button
              onClick={() => onNavigate('problems')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/60 hover:text-slate-900 dark:hover:text-white transition-all"
            >
              <Cpu size={16} />
              AST Code Telemetry
            </button>
          </div>
        </div>

        {/* User Card at Bottom */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-zinc-800/80 space-y-3">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-soft-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{user?.name || user?.username}</span>
              <span className="text-[10px] text-slate-500 dark:text-zinc-400 truncate">{user?.email}</span>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              onNavigate('landing');
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all border border-rose-200/60 dark:border-rose-900/30"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* 2. Main Intelligence Canvas */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto space-y-6">
        
        {/* Top Control Bar with Time Filter (Reference UX Pattern) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-200/70 dark:border-indigo-800/50">
                Skymetrics Intelligence Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Algorithmic Performance Dashboard
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Live algorithmic execution telemetry, complexity transitions, and sandbox evaluation metrics.
            </p>
          </div>

          {/* Date Filter & Problem Action */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-900 rounded-xl border border-slate-200/80 dark:border-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-300 shadow-soft-sm">
              <Clock size={13} className="text-slate-400" />
              <span>{dateRange}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>

            <button
              onClick={() => onNavigate('problems')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-xs transition-all shadow-soft-sm hover:shadow-glow-brand flex items-center gap-2"
            >
              <Code2 size={15} />
              Open Workspace
            </button>
          </div>
        </div>

        {/* 3. Primary KPI Metric Ribbon (Zajno Card Architecture) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Metric 1: Total Submissions with Micro Sparkline */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">Total Evaluations</span>
              <span className="p-2 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                <Activity size={16} />
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">{totalSubmissions}</div>
              <div className="flex items-center gap-1.5 mt-2 text-[11px]">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                  <ArrowUpRight size={13} /> 100%
                </span>
                <span className="text-slate-500 dark:text-zinc-400">Isolated Linux Cgroup</span>
              </div>
            </div>
          </div>

          {/* Metric 2: Stage Solve Rate */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">Stage Acceptance</span>
              <span className="p-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={16} />
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{solveRate}%</div>
              <div className="flex items-center gap-1.5 mt-2 text-[11px]">
                <span className="font-bold text-slate-700 dark:text-zinc-300 font-mono">{acceptedCount} Passed</span>
                <span className="text-slate-500 dark:text-zinc-400">Multi-Stage Solutions</span>
              </div>
            </div>
          </div>

          {/* Metric 3: Complexity Transition Index */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">Asymptotic Milestone</span>
              <span className="p-2 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                <Zap size={16} />
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">O(N)</div>
              <div className="flex items-center gap-1.5 mt-2 text-[11px]">
                <span className="text-purple-600 dark:text-purple-400 font-bold font-mono">Linear</span>
                <span className="text-slate-500 dark:text-zinc-400">Target Stage Achieved</span>
              </div>
            </div>
          </div>

          {/* Metric 4: Daily Learning Streak */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">Optimization Streak</span>
              <span className="p-2 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-500">
                <Flame size={16} />
              </span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">3 Days</div>
              <div className="flex items-center gap-1.5 mt-2 text-[11px]">
                <span className="text-amber-600 dark:text-amber-400 font-bold font-mono">+1 Today</span>
                <span className="text-slate-500 dark:text-zinc-400">Continuous Engineering</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Split Intelligence Panel: Active Problem + Complexity Evolution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* In-Progress Problem Stage Progression Studio */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Active Challenge Progression
                </span>
                <h2 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  Sum of Two Numbers — Multi-Stage Optimization
                </h2>
              </div>

              <button
                onClick={() => onSelectProblem(1)}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 border border-indigo-200/70 dark:border-indigo-800/60 text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                Resume Stage 2
                <ArrowUpRight size={14} />
              </button>
            </div>

            {/* 3-Stage Visual Pipeline Bar */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/70 dark:border-zinc-800/60 space-y-3">
              <div className="w-full bg-slate-200/80 dark:bg-zinc-800 h-3 rounded-full overflow-hidden flex">
                <div className="bg-emerald-500 h-full w-1/3" title="Stage 1 Passed"></div>
                <div className="bg-indigo-600 h-full w-1/3 animate-pulse" title="Stage 2 Active"></div>
                <div className="bg-transparent h-full w-1/3" title="Stage 3 Locked"></div>
              </div>

              <div className="grid grid-cols-3 text-center text-xs font-mono">
                <div className="text-left">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">Stage 1: Passed</div>
                  <div className="text-[10px] text-slate-500 dark:text-zinc-400">Brute Force O(N²)</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-indigo-600 dark:text-indigo-400">Stage 2: Active</div>
                  <div className="text-[10px] text-slate-500 dark:text-zinc-400">Sorting O(N log N)</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-400 dark:text-zinc-500">Stage 3: Locked</div>
                  <div className="text-[10px] text-slate-500 dark:text-zinc-400">Linear O(N)</div>
                </div>
              </div>
            </div>

            {/* Micro Latency Benchmark Sparkline */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-slate-700 dark:text-zinc-300">Execution Time Reduction Across Attempts</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">-84% Latency Drop</span>
              </div>
              <div className="h-16 flex items-end gap-2 pt-2">
                {sparklineBars.map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                    <div 
                      className={`w-full rounded-t-lg transition-all ${
                        i === sparklineBars.length - 1 ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-zinc-800 group-hover:bg-indigo-400'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Socratic AI Mentor Insight Box (Right Diagnostic Column) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider text-[11px] mb-2">
                <Sparkles size={14} /> AI Optimization Insight
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Socratic Diagnostic Engine
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 mt-2 leading-relaxed">
                "Your nested loop on Stage 1 re-scans identical array elements. Moving to Stage 2 requires introducing a sorting invariant or hash lookup to achieve O(N log N)."
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40 text-xs font-mono space-y-1">
              <div className="text-purple-900 dark:text-purple-300 font-bold">Detected Pattern: NESTED_LOOPS</div>
              <div className="text-slate-600 dark:text-zinc-400">Current Asymptotic: O(N²)</div>
              <div className="text-indigo-600 dark:text-indigo-400 font-bold">Target Asymptotic: O(N log N)</div>
            </div>

            <button
              onClick={() => onSelectProblem(1)}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-all shadow-soft-sm"
            >
              Request Socratic Hint
            </button>
          </div>
        </div>

        {/* 5. Submissions Telemetry Table (Shopify Intelligence Dense Format) */}
        <div className="rounded-3xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-zinc-800/80 shadow-soft-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200/80 dark:border-zinc-800/80 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock size={16} className="text-slate-400" />
                Live Submission Telemetry Feed
              </h2>
              <span className="text-[11px] text-slate-500 dark:text-zinc-400">Docker container isolation with cgroup limits</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-xl">
              {submissions.length} Recorded Runs
            </span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-500 dark:text-zinc-400 text-xs">
              Loading submission telemetry...
            </div>
          ) : submissions.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-zinc-400 text-xs">
              No submissions recorded yet. Open a problem to begin evaluation.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 dark:bg-zinc-900/50 text-slate-500 dark:text-zinc-400 font-bold border-b border-slate-200/80 dark:border-zinc-800/80 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-5">Verdict</th>
                    <th className="py-3 px-5">Language</th>
                    <th className="py-3 px-5">Runtime</th>
                    <th className="py-3 px-5">Virtual Memory</th>
                    <th className="py-3 px-5">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80 dark:divide-zinc-800/80 font-mono">
                  {submissions.slice(0, 6).map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                      <td className="py-3.5 px-5">
                        <VerdictBadge verdict={sub.verdict} />
                      </td>
                      <td className="py-3.5 px-5 uppercase text-slate-700 dark:text-zinc-300 font-semibold">
                        {sub.language || 'cpp'}
                      </td>
                      <td className="py-3.5 px-5 text-slate-700 dark:text-zinc-300">
                        {sub.execution_time_ms !== null ? `${sub.execution_time_ms} ms` : '—'}
                      </td>
                      <td className="py-3.5 px-5 text-slate-700 dark:text-zinc-300">
                        {sub.memory_used_kb !== null ? `${sub.memory_used_kb} KB` : '—'}
                      </td>
                      <td className="py-3.5 px-5 text-slate-500 dark:text-zinc-400 font-sans text-xs">
                        {new Date(sub.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
