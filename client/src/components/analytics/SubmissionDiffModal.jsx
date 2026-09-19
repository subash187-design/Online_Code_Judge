import React from 'react';
import { X, ArrowRight } from 'lucide-react';

export default function SubmissionDiffModal({ comparison, onClose }) {
  if (!comparison) return null;
  const { submission_a: subA, submission_b: subB, delta } = comparison;

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-[#e2e4e8] dark:border-slate-800 rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-[#e2e4e8] dark:border-slate-800 flex justify-between items-center bg-[#f8f9fa] dark:bg-slate-900/80">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Submission Comparative Diff</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{delta.approach_evolution}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Delta Summary Header */}
        <div className="grid grid-cols-3 gap-3 p-3.5 bg-[#f2f4f7] dark:bg-slate-950 border-b border-[#e2e4e8] dark:border-slate-800 text-center text-xs font-mono">
          <div className="bg-white dark:bg-slate-900/60 p-2.5 rounded-lg border border-[#e2e4e8] dark:border-slate-800/80 shadow-sm">
            <span className="text-slate-500 block text-[10px]">Complexity Shift</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">{delta.time_complexity_step}</span>
          </div>
          <div className="bg-white dark:bg-slate-900/60 p-2.5 rounded-lg border border-[#e2e4e8] dark:border-slate-800/80 shadow-sm">
            <span className="text-slate-500 block text-[10px]">Runtime Delta</span>
            <span className={`font-bold ${delta.runtime_difference_ms <= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {delta.runtime_difference_ms} ms ({delta.runtime_reduction_pct})
            </span>
          </div>
          <div className="bg-white dark:bg-slate-900/60 p-2.5 rounded-lg border border-[#e2e4e8] dark:border-slate-800/80 shadow-sm">
            <span className="text-slate-500 block text-[10px]">Memory Delta</span>
            <span className="text-slate-800 dark:text-slate-300 font-bold">
              {delta.memory_difference_kb > 0 ? `+${delta.memory_difference_kb}` : delta.memory_difference_kb} KB
            </span>
          </div>
        </div>

        {/* Dual Code View */}
        <div className="grid grid-cols-2 gap-3 p-4 overflow-y-auto flex-1 font-mono text-xs">
          <div className="bg-[#f8f9fa] dark:bg-slate-950 p-3 rounded-xl border border-[#e2e4e8] dark:border-slate-800 flex flex-col">
            <div className="text-slate-700 dark:text-slate-400 font-semibold mb-2 pb-1.5 border-b border-[#e2e4e8] dark:border-slate-800 flex justify-between">
              <span>Attempt A ({subA.stage_name})</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">{subA.time_complexity || 'N/A'}</span>
            </div>
            <pre className="text-slate-800 dark:text-slate-300 overflow-x-auto whitespace-pre leading-relaxed flex-1">
              {subA.code}
            </pre>
          </div>

          <div className="bg-[#f8f9fa] dark:bg-slate-950 p-3 rounded-xl border border-[#e2e4e8] dark:border-slate-800 flex flex-col">
            <div className="text-slate-700 dark:text-slate-400 font-semibold mb-2 pb-1.5 border-b border-[#e2e4e8] dark:border-slate-800 flex justify-between">
              <span>Attempt B ({subB.stage_name})</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{subB.time_complexity || 'N/A'}</span>
            </div>
            <pre className="text-slate-800 dark:text-slate-300 overflow-x-auto whitespace-pre leading-relaxed flex-1">
              {subB.code}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
