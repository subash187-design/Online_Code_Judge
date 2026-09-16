import React from 'react';
import { Cpu, CheckCircle, AlertTriangle, HelpCircle, ArrowUpRight } from 'lucide-react';

export default function ComplexityCard({ analysis }) {
  if (!analysis) return null;

  const matchBadges = {
    MATCHES_STAGE_TARGET: {
      label: 'Matches Stage Target',
      bg: 'bg-emerald-950/60 text-emerald-300 border-emerald-700/80',
      icon: <CheckCircle size={13} className="text-emerald-400" />
    },
    POSSIBLY_SUBOPTIMAL: {
      label: 'Possibly Suboptimal',
      bg: 'bg-amber-950/60 text-amber-300 border-amber-700/80',
      icon: <AlertTriangle size={13} className="text-amber-400" />
    },
    BETTER_THAN_EXPECTED: {
      label: 'Better Than Expected',
      bg: 'bg-blue-950/60 text-blue-300 border-blue-700/80',
      icon: <ArrowUpRight size={13} className="text-blue-400" />
    },
    UNDETERMINED: {
      label: 'Analysis Inconclusive',
      bg: 'bg-slate-800 text-slate-400 border-slate-700',
      icon: <HelpCircle size={13} className="text-slate-400" />
    }
  };

  const badge = matchBadges[analysis.stage_match_status] || matchBadges.UNDETERMINED;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 mt-3 text-slate-300 text-xs shadow-sm">
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Cpu size={15} className="text-blue-400" />
          <span className="font-semibold text-slate-100 text-xs uppercase tracking-wider">
            Algorithmic Complexity Profile
          </span>
        </div>
        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium flex items-center gap-1.5 ${badge.bg}`}>
          {badge.icon}
          {badge.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <span className="text-slate-500 block font-mono text-[10px]">Detected Approach</span>
          <span className="font-medium text-slate-200">{analysis.detected_approach}</span>
        </div>
        <div>
          <span className="text-slate-500 block font-mono text-[10px]">Confidence Level</span>
          <span className={`font-mono font-semibold ${
            analysis.confidence_level === 'HIGH' ? 'text-emerald-400' : analysis.confidence_level === 'MEDIUM' ? 'text-amber-400' : 'text-slate-400'
          }`}>
            {analysis.confidence_level}
          </span>
        </div>
        <div>
          <span className="text-slate-500 block font-mono text-[10px]">Estimated Time Complexity</span>
          <span className="font-mono font-bold text-blue-300 text-sm">{analysis.time_complexity}</span>
        </div>
        <div>
          <span className="text-slate-500 block font-mono text-[10px]">Estimated Space Complexity</span>
          <span className="font-mono font-semibold text-slate-200 text-sm">{analysis.space_complexity}</span>
        </div>
      </div>

      {analysis.detected_patterns && analysis.detected_patterns.length > 0 && (
        <div className="pt-2 border-t border-slate-800/80">
          <span className="text-slate-500 block mb-1.5 font-mono text-[10px]">Detected Structural Patterns</span>
          <div className="flex flex-wrap gap-1.5">
            {analysis.detected_patterns.map((pat, idx) => (
              <span key={idx} className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-[10px] font-mono text-slate-400">
                {pat}
              </span>
            ))}
          </div>
        </div>
      )}

      {analysis.notes && (
        <div className="mt-2 text-[10px] text-slate-400 italic">
          * {analysis.notes}
        </div>
      )}
    </div>
  );
}
