import React from 'react';
import { TrendingUp, Clock, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

export default function OptimizationJourney({ journey, onCompareClick }) {
  if (!journey || !journey.complexity_timeline || journey.complexity_timeline.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 text-xs font-mono">
        No submissions logged yet to build an optimization journey.
      </div>
    );
  }

  const points = journey.complexity_timeline;
  const maxRuntime = Math.max(...points.map((p) => p.runtime_ms), 1);

  return (
    <div className="p-4 space-y-4 text-slate-300 text-xs">
      {/* Header Metric Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <span className="text-slate-500 font-mono text-[10px] block">Runtime Drop</span>
          <span className="text-emerald-400 font-bold text-base font-mono">
            {journey.journey_summary.runtime_drop_pct}
          </span>
        </div>
        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <span className="text-slate-500 font-mono text-[10px] block">Complexity Evolution</span>
          <span className="text-blue-400 font-bold text-xs font-mono truncate block mt-0.5">
            {journey.journey_summary.initial_complexity} → {journey.journey_summary.optimal_complexity}
          </span>
        </div>
        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <span className="text-slate-500 font-mono text-[10px] block">Memory Delta</span>
          <span className="text-slate-200 font-bold text-sm font-mono">
            {journey.journey_summary.memory_delta_kb}
          </span>
        </div>
      </div>

      {/* Execution Time Trend Chart (Pure SVG) */}
      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold text-slate-200 flex items-center gap-1.5">
            <TrendingUp size={14} className="text-blue-400" />
            Execution Latency Trend (ms)
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Across {points.length} Attempts</span>
        </div>

        <div className="h-28 flex items-end gap-2 pt-3 px-1 border-b border-slate-800">
          {points.map((pt, idx) => {
            const heightPct = Math.max(15, (pt.runtime_ms / maxRuntime) * 100);
            const isAc = pt.verdict === 'ACCEPTED';

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div className="hidden group-hover:block absolute -top-10 bg-slate-800 text-white px-2 py-1 rounded text-[10px] whitespace-nowrap shadow-lg border border-slate-700 z-10 font-mono">
                  #{pt.attempt}: {pt.runtime_ms}ms ({pt.time_complexity})
                </div>
                <div
                  style={{ height: `${heightPct}%` }}
                  className={`w-full rounded-t transition-all ${
                    isAc ? 'bg-blue-600 group-hover:bg-blue-500' : 'bg-rose-800/80 group-hover:bg-rose-700'
                  }`}
                />
                <span className="text-[9px] text-slate-500 font-mono">#{pt.attempt}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Optimization Insight */}
      {journey.ai_insight && (
        <div className="bg-blue-950/20 border border-blue-900/40 p-3 rounded-lg text-slate-300 text-xs leading-relaxed">
          <span className="text-blue-400 font-semibold block text-[11px] mb-1">
            ✦ Optimization Retrospective
          </span>
          {journey.ai_insight}
        </div>
      )}

      {/* Chronological Attempts Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="text-slate-500 border-b border-slate-800">
            <tr>
              <th className="pb-2">#</th>
              <th className="pb-2">Stage</th>
              <th className="pb-2">Verdict</th>
              <th className="pb-2">Time Complexity</th>
              <th className="pb-2">Runtime</th>
              <th className="pb-2">Memory</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {points.map((pt) => (
              <tr key={pt.attempt} className="hover:bg-slate-800/30">
                <td className="py-2 text-slate-400">#{pt.attempt}</td>
                <td className="py-2 text-slate-200 font-sans font-medium">{pt.stage_name}</td>
                <td className="py-2">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                    pt.verdict === 'ACCEPTED' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                  }`}>
                    {pt.verdict}
                  </span>
                </td>
                <td className="py-2 text-blue-300">{pt.time_complexity}</td>
                <td className="py-2">{pt.runtime_ms} ms</td>
                <td className="py-2 text-slate-400">{pt.memory_kb} KB</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
