import React, { useEffect, useState } from 'react';
import { Terminal, Code2, ArrowRight, Search, Filter, Layers, CheckCircle2 } from 'lucide-react';

export default function ProblemListPage({ onSelectProblem }) {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');

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

  const filteredProblems = problems.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.topic && p.topic.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDiff = difficultyFilter === 'ALL' || p.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-zinc-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Terminal className="text-brand-600 dark:text-brand-400" />
            Algomind Problem Intelligence
          </h1>
          <p className="text-slate-600 dark:text-zinc-400 text-sm mt-1">
            Solve progressive multi-stage algorithmic challenges with AST heuristics, Socratic hints, and containerized sandbox testing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200/70 dark:border-brand-800/60 text-xs font-semibold">
            {problems.length} Challenges Available
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="my-6 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Search problems by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-soft-sm"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            aria-label="Filter problems by difficulty"
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-soft-sm cursor-pointer"
          >
            <option value="ALL">All Difficulties</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="py-16 text-center text-slate-500 dark:text-zinc-400 text-sm">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping"></span>
            Loading problem catalog...
          </div>
        </div>
      )}

      {error && (
        <div className="my-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-sm">
          {error} (Ensure backend server and database are running)
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-3">
          {filteredProblems.length === 0 ? (
            <div className="py-16 text-center text-slate-500 dark:text-zinc-400 text-sm">
              No problems found matching your filters.
            </div>
          ) : (
            filteredProblems.map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProblem(p.id)}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800 hover:border-brand-300 dark:hover:border-brand-700/60 transition-all cursor-pointer flex items-center justify-between group shadow-soft-sm hover:shadow-soft-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 flex items-center justify-center font-mono font-bold text-xs">
                    #{p.id}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex items-center gap-2">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-zinc-400 mt-1">
                      <span className={`px-2 py-0.5 rounded font-semibold ${
                        p.difficulty === 'EASY' 
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/50'
                          : p.difficulty === 'MEDIUM'
                          ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200/70 dark:border-amber-800/50'
                          : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border border-rose-200/70 dark:border-rose-800/50'
                      }`}>
                        {p.difficulty}
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Layers size={12} className="text-brand-500" />
                        Multi-Stage
                      </span>
                      <span>Time: {p.time_limit_ms}ms</span>
                      <span>Memory: {Math.round(p.memory_limit_kb / 1024)}MB</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-block text-xs font-semibold text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Solve Challenge
                  </span>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
