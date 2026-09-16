import React from 'react';
import { CheckCircle2, Lock, CircleDot } from 'lucide-react';

export default function ProgressTracker({ stages = [], activeStageId, onSelectStage, isProblemSolved }) {
  if (!stages || stages.length === 0) return null;

  const completedCount = stages.filter(s => s && s.status === 'COMPLETED').length;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 mb-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Progression Tracker</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono font-semibold">
            {completedCount} / {stages.length} Completed
          </span>
        </div>
        {isProblemSolved && (
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1.5 animate-pulse">
            <CheckCircle2 size={13} /> PROBLEM SOLVED
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {stages.map((stage) => {
          const isSelected = stage.id === activeStageId;
          const isLocked = stage.status === 'LOCKED';
          const isDone = stage.status === 'COMPLETED';

          let style = "border-slate-800/80 bg-slate-950/40 text-slate-500 cursor-not-allowed opacity-60";
          if (isSelected) {
            style = "border-blue-500 bg-slate-800 text-slate-100 ring-1 ring-blue-500 shadow-md shadow-blue-950/40";
          } else if (isDone) {
            style = "border-emerald-900/60 bg-emerald-950/20 text-emerald-300 hover:border-emerald-700/80 cursor-pointer";
          } else if (!isLocked) {
            style = "border-slate-700 bg-slate-800/60 text-slate-200 hover:border-slate-600 cursor-pointer";
          }

          return (
            <button
              key={stage.id}
              disabled={isLocked}
              onClick={() => onSelectStage(stage.id)}
              className={`p-3 rounded-lg text-left border transition-all ${style}`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono uppercase tracking-wider font-semibold text-[10px]">
                  Stage {stage.order_index}
                </span>
                <span>
                  {isDone && <CheckCircle2 size={14} className="text-emerald-400" />}
                  {isLocked && <Lock size={13} className="text-slate-500" />}
                  {!isDone && !isLocked && <CircleDot size={13} className="text-blue-400" />}
                </span>
              </div>
              <div className="font-semibold text-xs truncate text-slate-200">{stage.name}</div>
              <div className="text-[10px] text-slate-400 mt-1.5 flex gap-2 font-mono">
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
