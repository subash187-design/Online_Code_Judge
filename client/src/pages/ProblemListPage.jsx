import React, { useEffect, useState } from 'react';
import { Terminal, Code2, ArrowRight } from 'lucide-react';

export default function ProblemListPage({ onSelectProblem }) {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/v1/problems')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load problems');
        return res.json();
      })
      .then(data => {
        setProblems(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Terminal className="text-blue-400" />
            Algomind Problem Set
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Solve problems with secure C++ execution, sandbox containment, and automated verdicts.
          </p>
        </div>
      </div>

      {loading && (
        <div className="py-12 text-center text-slate-500">Loading problem catalog...</div>
      )}

      {error && (
        <div className="my-6 p-4 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 text-sm">
          {error} (Ensure backend server and database are running)
        </div>
      )}

      {!loading && !error && (
        <div className="mt-6 space-y-3">
          {problems.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectProblem(p.id)}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/60 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <span className="text-slate-500 font-mono text-sm w-6">#{p.id}</span>
                <div>
                  <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-800/50 font-medium">
                      {p.difficulty}
                    </span>
                    <span>Time: {p.time_limit_ms}ms</span>
                    <span>Memory: {Math.round(p.memory_limit_kb / 1024)}MB</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm font-medium group-hover:text-blue-400">
                <span>Solve</span>
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
