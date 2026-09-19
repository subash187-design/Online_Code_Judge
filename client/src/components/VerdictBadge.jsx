import React from 'react';

const VERDICT_CONFIG = {
  ACCEPTED: { label: 'Accepted', bg: 'bg-emerald-950/80', text: 'text-emerald-400', border: 'border-emerald-700' },
  WRONG_ANSWER: { label: 'Wrong Answer', bg: 'bg-rose-950/80', text: 'text-rose-400', border: 'border-rose-700' },
  TIME_LIMIT_EXCEEDED: { label: 'Time Limit Exceeded', bg: 'bg-amber-950/80', text: 'text-amber-400', border: 'border-amber-700' },
  MEMORY_LIMIT_EXCEEDED: { label: 'Memory Limit Exceeded', bg: 'bg-orange-950/80', text: 'text-orange-400', border: 'border-orange-700' },
  RUNTIME_ERROR: { label: 'Runtime Error', bg: 'bg-purple-950/80', text: 'text-purple-400', border: 'border-purple-700' },
  COMPILATION_ERROR: { label: 'Compilation Error', bg: 'bg-yellow-950/80', text: 'text-yellow-400', border: 'border-yellow-700' },
  PENDING: { label: 'Evaluating...', bg: 'bg-blue-950/80', text: 'text-blue-400', border: 'border-blue-700' },
  SUCCESS: { label: 'Run Succeeded', bg: 'bg-emerald-950/80', text: 'text-emerald-400', border: 'border-emerald-700' },
  COMPLEXITY_MISMATCH: { label: 'Complexity Mismatch', bg: 'bg-amber-950/80', text: 'text-amber-400', border: 'border-amber-700' }
};

export default function VerdictBadge({ verdict }) {
  const cfg = VERDICT_CONFIG[verdict] || { label: verdict || 'Unknown', bg: 'bg-slate-800', text: 'text-slate-300', border: 'border-slate-700' };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      {cfg.label}
    </span>
  );
}
