import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function StageFeedbackBanner({ feedback, onProceed }) {
  if (!feedback) return null;

  return (
    <div className="bg-emerald-50 border border-emerald-300 dark:bg-gradient-to-r dark:from-emerald-950/80 dark:via-slate-900 dark:to-slate-900 dark:border-emerald-600/50 p-3.5 rounded-xl mb-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400">
          <Sparkles size={16} />
        </div>
        <div>
          <h4 className="text-emerald-800 dark:text-emerald-400 font-bold text-xs">Stage Milestone Reached!</h4>
          <p className="text-slate-700 dark:text-slate-300 text-xs mt-0.5">{feedback.message}</p>
        </div>
      </div>
      {feedback.nextStageId && (
        <button
          onClick={() => onProceed(feedback.nextStageId)}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-sm transition-colors"
        >
          <span>Next Stage</span>
          <ArrowRight size={13} />
        </button>
      )}
    </div>
  );
}
