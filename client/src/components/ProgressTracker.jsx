import React from 'react';
import { CheckCircle2, Lock, CircleDot } from 'lucide-react';

export default function ProgressTracker({ stages = [], activeStageId, onSelectStage, isProblemSolved }) {
  if (!stages || stages.length === 0) return null;

  const completedCount = stages.filter(s => s && s.status === 'COMPLETED').length;

  return (
    <div className="bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl p-4 mb-4 shadow-soft-sm transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-zinc-400">Progression Tracker</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-mono font-semibold">
            {completedCount} / {stages.length} Completed
          </span>
        </div>
        {isProblemSolved && (
          <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 animate-pulse">
            <CheckCircle2 size={13} /> PROBLEM SOLVED
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {stages.map((stage) => {
          const isSelected = stage.id === activeStageId;
          const isLocked = stage.status === 'LOCKED';
          const isDone = stage.status === 'COMPLETED';

          let style = "border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-zinc-950/40 text-slate-400 dark:text-zinc-500 cursor-not-allowed opacity-60";
          if (isSelected) {
            style = "border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 text-brand-950 dark:text-white ring-2 ring-brand-500/20 shadow-soft-sm font-semibold";
          } else if (isDone) {
            style = "border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/70 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 hover:border-emerald-300 dark:hover:border-emerald-700/80 cursor-pointer";
          } else if (!isLocked) {
            style = "border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 text-slate-800 dark:text-zinc-200 hover:border-brand-300 dark:hover:border-zinc-600 cursor-pointer shadow-soft-sm";
          }

          return (
            <button
              key={stage.id}
              disabled={isLocked}
              onClick={() => onSelectStage(stage.id)}
              className={`p-3 rounded-xl text-left border transition-all ${style}`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono uppercase tracking-wider font-semibold text-[10px]">
                  Stage {stage.order_index}
                </span>
                <span>
                  {isDone && <CheckCircle2 size={14} className="text-emerald-500" />}
                  {isLocked && <Lock size={13} className="text-slate-400 dark:text-zinc-500" />}
                  {!isDone && !isLocked && <CircleDot size={13} className="text-brand-600 dark:text-brand-400" />}
                </span>
              </div>
              <div className="font-semibold text-xs truncate text-slate-900 dark:text-white">{stage.name}</div>
              <div className="text-[10px] text-slate-500 dark:text-zinc-400 mt-1.5 flex gap-2 font-mono">
                <span>Time: {stage.expected_time_complexity || 'N/A'}</span>
                <span>Space: {stage.expected_space_complexity || 'N/A'}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
