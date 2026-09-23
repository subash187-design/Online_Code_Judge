import React from 'react';
import { TrendingUp, Clock, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

export default function OptimizationJourney({ journey, onCompareClick }) {
  if (!journey || !journey.complexity_timeline || journey.complexity_timeline.length === 0) {
    return (
      <div className="py-8 px-4 text-center space-y-2.5">
        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
          <TrendingUp size={18} />
        </div>
        <div className="text-slate-800 dark:text-zinc-200 font-semibold text-xs">
          No Optimization Journey Yet
        </div>
        <p className="text-slate-500 dark:text-zinc-400 text-[11px] max-w-sm mx-auto leading-relaxed">
          Submit your algorithmic solution across stages to unlock your latency timeline, runtime drop percentage, and AI optimization retrospective.
        </p>
      </div>
    );
  }

  const points = journey.complexity_timeline;
  const maxRuntime = Math.max(...points.map((p) => p.runtime_ms), 1);

  return (
    <div className="p-3 sm:p-4 space-y-4 text-slate-800 dark:text-slate-200 text-xs">
      {/* Header Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-[#e2e4e8] dark:border-zinc-800 shadow-xs">
          <span className="text-slate-500 dark:text-zinc-400 font-mono text-[10px] block uppercase font-medium">Runtime Drop</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-base font-mono">
            {journey.journey_summary.runtime_drop_pct}
          </span>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-[#e2e4e8] dark:border-zinc-800 shadow-xs">
          <span className="text-slate-500 dark:text-zinc-400 font-mono text-[10px] block uppercase font-medium">Complexity Evolution</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold text-xs font-mono truncate block mt-0.5">
            {journey.journey_summary.initial_complexity} → {journey.journey_summary.optimal_complexity}
          </span>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-[#e2e4e8] dark:border-zinc-800 shadow-xs">
          <span className="text-slate-500 dark:text-zinc-400 font-mono text-[10px] block uppercase font-medium">Memory Delta</span>
          <span className="text-slate-900 dark:text-white font-bold text-sm font-mono">
            {journey.journey_summary.memory_delta_kb}
          </span>
        </div>
      </div>

      {/* Execution Time Trend Chart (Pure SVG) */}
      <div className="bg-white dark:bg-zinc-900/90 p-4 rounded-xl border border-[#e2e4e8] dark:border-zinc-800 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold text-slate-900 dark:text-zinc-200 flex items-center gap-1.5">
            <TrendingUp size={14} className="text-blue-600 dark:text-blue-400" />
            Execution Latency Trend (ms)
          </span>
          <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono">Across {points.length} Attempts</span>
        </div>

        <div className="h-28 flex items-end gap-2 pt-3 px-1 border-b border-[#e2e4e8] dark:border-zinc-800">
          {points.map((pt, idx) => {
            const heightPct = Math.max(15, (pt.runtime_ms / maxRuntime) * 100);
            const isAc = pt.verdict === 'ACCEPTED';

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div className="hidden group-hover:block absolute -top-10 bg-slate-900 text-white dark:bg-black px-2 py-1 rounded text-[10px] whitespace-nowrap shadow-lg border border-slate-700 z-10 font-mono">
                  Attempt {pt.attempt}: {pt.runtime_ms}ms ({pt.time_complexity})
                </div>
                <div
                  style={{ height: `${heightPct}%` }}
                  className={`w-full rounded-t transition-all ${
                    isAc ? 'bg-blue-600 group-hover:bg-blue-500' : 'bg-rose-600 group-hover:bg-rose-500'
                  }`}
                />
                <span className="text-[9px] text-slate-500 dark:text-zinc-400 font-mono">{pt.attempt}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Optimization Insight */}
      {journey.ai_insight && (
        <div className="bg-blue-50/80 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 p-3.5 rounded-xl text-slate-700 dark:text-zinc-300 text-xs leading-relaxed shadow-xs">
          <span className="text-blue-700 dark:text-blue-400 font-semibold block text-[11px] mb-1 flex items-center gap-1">
            ✦ Optimization Retrospective
          </span>
          {journey.ai_insight}
        </div>
      )}

      {/* Chronological Attempts Table */}
      <div className="overflow-x-auto bg-white dark:bg-zinc-900 rounded-xl border border-[#e2e4e8] dark:border-zinc-800 p-2 shadow-xs">
        <table className="w-full text-left text-xs font-mono">
          <thead className="text-slate-500 dark:text-zinc-400 border-b border-[#e2e4e8] dark:border-zinc-800">
            <tr>
              <th className="pb-2 px-2">Attempt</th>
              <th className="pb-2">Stage</th>
              <th className="pb-2">Verdict</th>
              <th className="pb-2">Time Complexity</th>
              <th className="pb-2">Runtime</th>
              <th className="pb-2">Memory</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f2f5] dark:divide-zinc-800/60">
            {points.map((pt) => (
              <tr key={pt.attempt} className="hover:bg-slate-50 dark:hover:bg-zinc-800/30">
                <td className="py-2 px-2 text-slate-500 dark:text-zinc-400">{pt.attempt}</td>
                <td className="py-2 text-slate-900 dark:text-zinc-200 font-sans font-medium">{pt.stage_name}</td>
                <td className="py-2">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                    pt.verdict === 'ACCEPTED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400'
                  }`}>
                    {pt.verdict}
                  </span>
                </td>
                <td className="py-2 text-blue-600 dark:text-blue-400">{pt.time_complexity}</td>
                <td className="py-2">{pt.runtime_ms} ms</td>
                <td className="py-2 text-slate-500 dark:text-zinc-400">{pt.memory_kb} KB</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
