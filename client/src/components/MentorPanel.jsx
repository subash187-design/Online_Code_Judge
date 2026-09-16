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
      <div className="p-8 text-center text-slate-500 text-xs font-mono">
        Submit code to activate the Socratic AI Code Mentor.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 text-slate-300 text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-amber-400" />
          <span className="font-semibold text-slate-100 text-xs uppercase tracking-wider">
            Socratic AI Code Mentor
          </span>
        </div>
        <span className="text-[10px] bg-amber-950/60 text-amber-300 border border-amber-800/80 px-2 py-0.5 rounded-full font-mono">
          Non-Spoiler Mode
        </span>
      </div>

      {loadingFeedback && (
        <div className="py-4 text-center text-slate-500">Formulating personalized guidance...</div>
      )}

      {error && (
        <div className="p-2.5 rounded bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {feedback && (
        <div className="space-y-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
          <div>
            <span className="text-slate-500 block font-mono text-[10px]">Approach Assessment</span>
            <p className="text-slate-200 mt-0.5 font-medium">{feedback.approach}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
            <div>
              <span className="text-emerald-400 block font-mono text-[10px] font-semibold">
                ✓ What You Did Well
              </span>
              <p className="text-slate-300 mt-0.5">{feedback.what_you_are_doing_well}</p>
            </div>
            <div>
              <span className="text-amber-400 block font-mono text-[10px] font-semibold">
                ⚡ Area for Optimization
              </span>
              <p className="text-slate-300 mt-0.5">{feedback.what_could_be_improved}</p>
            </div>
          </div>

          <div className="bg-slate-950 p-2.5 rounded border border-slate-800/80">
            <span className="text-blue-400 block font-mono text-[10px] font-semibold">
              🎯 Next Milestone Goal
            </span>
            <p className="text-slate-200 mt-0.5">{feedback.next_goal}</p>
          </div>
        </div>
      )}

      {/* Progressive Hint Progression (1 -> 2 -> 3) */}
      <div className="pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-slate-200 text-xs flex items-center gap-1.5">
            <Lightbulb size={14} className="text-amber-400" />
            Progressive Hints
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Sequential Unlocking</span>
        </div>

        <div className="flex gap-2 mb-3">
          {[1, 2, 3].map((lvl) => {
            const unlocked = hints.some((h) => h.hint_level === lvl);
            return (
              <button
                key={lvl}
                disabled={loadingHint}
                onClick={() => handleUnlockHint(lvl)}
                className={`flex-1 py-1.5 px-2 rounded-lg font-mono text-[11px] font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                  unlocked
                    ? 'bg-emerald-950/50 border-emerald-700/80 text-emerald-300'
                    : 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-400'
                }`}
              >
                {unlocked ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Lock size={12} />}
                <span>{unlocked ? `Hint ${lvl} Unlocked` : `Unlock Hint ${lvl}`}</span>
              </button>
            );
          })}
        </div>

        {/* Render Unlocked Hints */}
        <div className="space-y-2">
          {hints
            .sort((a, b) => a.hint_level - b.hint_level)
            .map((h) => (
              <div key={h.hint_level} className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-mono font-bold block text-[11px]">
                  Hint Level {h.hint_level}: {h.title}
                </span>
                <p className="text-slate-300 text-xs mt-1 leading-relaxed">{h.content}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
