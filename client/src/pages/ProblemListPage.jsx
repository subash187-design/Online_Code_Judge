import React, { useEffect, useState } from 'react';
import { Code2, ArrowRight, Search, Filter, Layers, CheckCircle2 } from 'lucide-react';

export default function ProblemListPage({ onSelectProblem }) {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [topicFilter, setTopicFilter] = useState('ALL');

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
    const query = searchQuery.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(query) || 
                          (p.topic && p.topic.toLowerCase().includes(query)) ||
                          (p.subtopics && p.subtopics.some(s => s.toLowerCase().includes(query))) ||
                          (p.tags && p.tags.some(t => t.toLowerCase().includes(query)));
    const matchesDiff = difficultyFilter === 'ALL' || p.difficulty === difficultyFilter;
    const matchesTopic = topicFilter === 'ALL' || p.topic === topicFilter;
    return matchesSearch && matchesDiff && matchesTopic;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-zinc-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Algomind Problems
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
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            aria-label="Filter problems by topic"
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-soft-sm cursor-pointer"
          >
            <option value="ALL">All Topics (10)</option>
            <option value="Arrays & Hashing">Arrays & Hashing (15)</option>
            <option value="Strings">Strings (11)</option>
            <option value="Two Pointers & Sliding Window">Two Pointers & Sliding Window (10)</option>
            <option value="Binary Search">Binary Search (10)</option>
            <option value="Linked List">Linked List (10)</option>
            <option value="Stack & Queue">Stack & Queue (10)</option>
            <option value="Trees & Binary Search Trees">Trees & BST (10)</option>
            <option value="Graphs">Graphs (10)</option>
            <option value="Dynamic Programming">Dynamic Programming (10)</option>
            <option value="Greedy / Heap / Intervals">Greedy / Heap / Intervals (5)</option>
          </select>

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
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {p.title}
                      </h3>
                      {p.topic && (
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 border border-slate-200/60 dark:border-zinc-700/60">
                          {p.topic}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-500 dark:text-zinc-400 mt-1.5">
                      <span className={`px-2 py-0.5 rounded font-semibold ${
                        p.difficulty === 'EASY' 
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/50'
                          : p.difficulty === 'MEDIUM'
                          ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200/70 dark:border-amber-800/50'
                          : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border border-rose-200/70 dark:border-rose-800/50'
                      }`}>
                        {p.difficulty}
                      </span>
                      {p.expected_time_complexity && (
                        <span className="font-mono text-[11px] text-slate-600 dark:text-zinc-300 bg-slate-50 dark:bg-zinc-800/60 px-1.5 py-0.5 rounded border border-slate-200/60 dark:border-zinc-700/60">
                          {p.expected_time_complexity}
                        </span>
                      )}
                      <span className="flex items-center gap-1 font-mono">
                        <Layers size={12} className="text-brand-500" />
                        Multi-Stage
                      </span>
                      <span>Time: {p.time_limit_ms}ms</span>
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
