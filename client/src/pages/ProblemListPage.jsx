import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Layers, 
  ArrowRight,
  Filter
} from 'lucide-react';

const TOPIC_OPTIONS = [
  { value: 'ALL', label: 'All Topics' },
  { value: 'Arrays', label: 'Arrays' },
  { value: 'Strings', label: 'Strings' },
  { value: 'Dynamic Programming', label: 'DP' },
  { value: 'Two Pointers', label: 'Two Pointers' },
  { value: 'Trees', label: 'Trees' },
  { value: 'Graphs', label: 'Graphs' },
  { value: 'Binary Search', label: 'Binary Search' },
  { value: 'Greedy', label: 'Greedy' },
  { value: 'Backtracking', label: 'Backtracking' },
  { value: 'Math', label: 'Math' }
];

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
                          (p.description && p.description.toLowerCase().includes(query)) ||
                          (p.topic && p.topic.toLowerCase().includes(query)) ||
                          (p.subtopics && p.subtopics.some(s => s.toLowerCase().includes(query))) ||
                          (p.tags && p.tags.some(t => t.toLowerCase().includes(query)));
    const matchesDiff = difficultyFilter === 'ALL' || p.difficulty === difficultyFilter;
    const matchesTopic = topicFilter === 'ALL' || p.topic === topicFilter;
    return matchesSearch && matchesDiff && matchesTopic;
  });

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#f2f4f7] text-slate-800 dark:bg-[#121212] dark:text-zinc-100 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e2e4e8] dark:border-[#262626]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Algomind Problems
            </h1>
            <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm mt-1.5">
              Practice progressive multi-stage algorithmic interview drills with AST complexity evaluation and Socratic hints.
            </p>
          </div>
        </div>

        {/* Quick Topic Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {TOPIC_OPTIONS.map(top => (
            <button
              key={top.value}
              onClick={() => setTopicFilter(top.value)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                topicFilter === top.value
                  ? 'bg-slate-900 text-white border-slate-900 font-semibold shadow-xs dark:bg-blue-500/15 dark:text-blue-400 dark:border-blue-500/40'
                  : 'bg-white text-slate-600 border-[#e0e2e6] hover:text-slate-900 hover:bg-slate-100 dark:bg-[#1e1e1e] dark:text-zinc-400 dark:border-[#2e2e2e] dark:hover:text-white dark:hover:bg-[#262626]'
              }`}
            >
              {top.label}
            </button>
          ))}
        </div>

        {/* Filter Controls Bar */}
        <div className="p-3 rounded-xl bg-[#f8f9fa] border border-[#e0e2e6] dark:bg-[#1a1a1a] dark:border-[#282828] flex flex-col sm:flex-row items-center gap-3 shadow-xs">
          <div className="relative flex-1 w-full">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
            <input
              type="text"
              placeholder="Search problems by name, pattern, topic, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-[#d5d9de] text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 dark:bg-[#121212] dark:border-[#2e2e2e] dark:text-white dark:placeholder-zinc-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Difficulty Tabs */}
            <div className="flex items-center p-1 rounded-lg bg-[#edeef1] border border-[#d5d9de] dark:bg-[#121212] dark:border-[#2e2e2e] text-xs">
              {['ALL', 'EASY', 'MEDIUM', 'HARD'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setDifficultyFilter(diff)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    difficultyFilter === diff
                      ? 'bg-white text-slate-900 font-semibold shadow-xs dark:bg-[#262626] dark:text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white'
                  }`}
                >
                  {diff === 'ALL' ? 'All Diff' : diff.charAt(0) + diff.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center text-slate-500 dark:text-zinc-400 text-sm">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
              Loading problems...
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 dark:bg-rose-950/30 dark:border-rose-800/50 dark:text-rose-300 text-xs sm:text-sm">
            {error} (Ensure backend server is running on port 5000)
          </div>
        )}

        {/* Problem Card List */}
        {!loading && !error && (
          <div className="space-y-2.5">
            {filteredProblems.length === 0 ? (
              <div className="py-16 text-center text-slate-500 dark:text-zinc-500 text-sm bg-white dark:bg-[#1a1a1a] rounded-xl border border-[#e0e2e6] dark:border-[#282828]">
                No problems found matching your search and filter criteria.
              </div>
            ) : (
              filteredProblems.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectProblem(p.id)}
                  className="p-4 sm:p-5 rounded-xl bg-white border border-[#e2e4e8] hover:border-slate-300 hover:bg-[#fafbfc] dark:bg-[#1e1e1e] dark:border-[#2d2d2d] dark:hover:border-[#444] dark:hover:bg-[#232323] transition-all cursor-pointer flex items-center justify-between group shadow-xs"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors truncate">
                          {p.title}
                        </h3>
                        {p.topic && (
                          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-[#f0f2f5] text-slate-700 border border-[#e0e2e6] dark:bg-[#282828] dark:text-zinc-300 dark:border-[#383838]">
                            {p.topic}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-500 dark:text-zinc-400">
                        {/* Difficulty Pill */}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          p.difficulty === 'EASY' 
                            ? 'text-[#00b8a3] bg-[#00b8a3]/10 border-[#00b8a3]/30'
                            : p.difficulty === 'MEDIUM'
                            ? 'text-[#b27b00] bg-[#ffc01e]/15 border-[#ffc01e]/40'
                            : 'text-[#ff375f] bg-[#ff375f]/10 border-[#ff375f]/30'
                        }`}>
                          {p.difficulty}
                        </span>

                        {p.expected_time_complexity && (
                          <span className="font-mono text-[10px] text-slate-600 bg-[#f0f2f5] px-2 py-0.5 rounded border border-[#e0e2e6] dark:text-zinc-400 dark:bg-[#262626] dark:border-[#333333]">
                            {p.expected_time_complexity}
                          </span>
                        )}

                        <span className="flex items-center gap-1 font-mono text-[10px] text-purple-700 bg-purple-50 border border-purple-200 dark:text-purple-300 dark:bg-purple-950/40 dark:border-purple-800/40 px-2 py-0.5 rounded">
                          <Layers size={11} className="text-purple-600 dark:text-purple-400" />
                          Multi-Stage
                        </span>

                        <span className="text-[11px] text-slate-400 dark:text-zinc-500">
                          {p.time_limit_ms || 1000}ms limit
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Action Button */}
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className="hidden md:inline-block text-xs font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Solve Challenge
                    </span>
                    <div className="p-2 rounded-lg bg-[#f0f2f5] border border-[#e0e2e6] text-slate-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 dark:bg-[#282828] dark:border-[#383838] dark:text-zinc-400 transition-all shadow-xs">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
