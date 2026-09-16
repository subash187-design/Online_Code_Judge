import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function StageFeedbackBanner({ feedback, onProceed }) {
  if (!feedback) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-600/50 p-3.5 rounded-lg mb-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-md bg-emerald-900/60 text-emerald-400">
          <Sparkles size={16} />
        </div>
        <div>
          <h4 className="text-emerald-400 font-semibold text-xs">Stage Milestone Reached!</h4>
          <p className="text-slate-300 text-xs mt-0.5">{feedback.message}</p>
        </div>
      </div>
      {feedback.nextStageId && (
        <button
          onClick={() => onProceed(feedback.nextStageId)}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow transition-colors"
        >
          <span>Next Stage</span>
          <ArrowRight size={13} />
        </button>
      )}
    </div>
  );
}
