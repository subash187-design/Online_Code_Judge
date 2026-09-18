import React, { useState, useEffect } from 'react';
import { Lightbulb, CheckCircle2, Lock, Sparkles, AlertCircle } from 'lucide-react';

export default function MentorPanel({ submissionId, stageId }) {
  const [feedback, setFeedback] = useState(null);
  const [hints, setHints] = useState([]);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [loadingHint, setLoadingHint] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (submissionId) {
      fetchFeedback(submissionId);
    }
  }, [submissionId]);

  const fetchFeedback = async (subId) => {
    setLoadingFeedback(true);
    setError(null);
    try {
      const res = await fetch(`/api/v1/mentor/feedback/${subId}?user_id=1`);
      if (res.ok) {
        const data = await res.json();
        setFeedback(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingFeedback(false);
    }
  };

  const handleUnlockHint = async (level) => {
    setLoadingHint(true);
    setError(null);
    try {
      const res = await fetch(`/api/v1/mentor/hints/${stageId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1,
          submission_id: submissionId,
          requested_level: level
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to unlock hint.');
      } else {
        setHints((prev) => [...prev.filter((h) => h.hint_level !== level), data]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingHint(false);
    }
  };

  if (!submissionId) {
    return (
      <div className="p-6 text-center text-slate-500 dark:text-zinc-400 text-xs">
        Submit or evaluate your code on this stage to activate the Socratic AI Mentor.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-1 text-xs">
      {error && (
        <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-xl flex items-center gap-2">
          <AlertCircle size={15} />
          <span>{error}</span>
        </div>
      )}

      {/* Socratic Feedback Summary */}
      {loadingFeedback ? (
        <div className="p-4 text-center text-slate-500 dark:text-zinc-400">
          Analyzing code structure with AI Mentor...
        </div>
      ) : feedback ? (
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-4 space-y-3 shadow-soft-sm">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider text-[11px]">
            <Sparkles size={14} /> Socratic Code Intelligence
          </div>

          <div className="space-y-2 text-slate-700 dark:text-zinc-300 leading-relaxed">
            <div>
              <span className="font-semibold text-slate-900 dark:text-white">Detected Approach: </span>
              {feedback.approach}
            </div>
            <div>
              <span className="font-semibold text-slate-900 dark:text-white">Asymptotic Complexity: </span>
              <span className="font-mono text-purple-600 dark:text-purple-400 font-semibold">{feedback.complexity}</span>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300">
              <strong className="block mb-0.5 text-emerald-900 dark:text-emerald-200">Strengths:</strong>
              {feedback.what_you_are_doing_well}
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-xl border border-amber-200/60 dark:border-amber-900/40 text-amber-800 dark:text-amber-300">
              <strong className="block mb-0.5 text-amber-900 dark:text-amber-200">Optimization Opportunity:</strong>
              {feedback.what_could_be_improved}
            </div>
            <div className="pt-1">
              <span className="font-semibold text-slate-900 dark:text-white">Next Learning Milestone: </span>
              {feedback.next_goal}
            </div>
          </div>
        </div>
      ) : null}

      {/* Progressive Multi-Tier Hints */}
      <div className="space-y-2 pt-2">
        <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <Lightbulb size={13} className="text-amber-500" /> Progressive Hint System
        </h4>

        {[1, 2, 3].map((lvl) => {
          const unlockedHint = hints.find((h) => h.hint_level === lvl);
          return (
            <div key={lvl} className="border border-slate-200/80 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-soft-sm">
              <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 flex items-center justify-between">
                <span className="font-semibold text-slate-900 dark:text-white">
                  Hint {lvl}: {lvl === 1 ? 'Conceptual Direction' : lvl === 2 ? 'Technique-Level Guidance' : 'Algorithmic Blueprint'}
                </span>

                {unlockedHint ? (
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={12} /> UNLOCKED
                  </span>
                ) : (
                  <button
                    disabled={loadingHint}
                    onClick={() => handleUnlockHint(lvl)}
                    className="px-2.5 py-1 rounded-lg bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-[11px] font-semibold flex items-center gap-1 transition-all disabled:opacity-50"
                  >
                    <Lock size={11} /> Unlock
                  </button>
                )}
              </div>

              {unlockedHint && (
                <div className="p-3 text-slate-700 dark:text-zinc-300 leading-relaxed border-t border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                  <div className="font-semibold text-brand-600 dark:text-brand-400 mb-1">{unlockedHint.title}</div>
                  <div>{unlockedHint.content}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
