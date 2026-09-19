import React, { useEffect, useState } from 'react';
import { Code2, ArrowRight, Search, Filter, Layers, CheckCircle2, Sparkles, Terminal } from 'lucide-react';

const TOPIC_OPTIONS = [
  { label: 'All Topics', value: 'ALL' },
  { label: 'Arrays & Hashing', value: 'Arrays & Hashing' },
  { label: 'Strings', value: 'Strings' },
  { label: 'Two Pointers & Sliding Window', value: 'Two Pointers & Sliding Window' },
  { label: 'Binary Search', value: 'Binary Search' },
  { label: 'Linked List', value: 'Linked List' },
  { label: 'Stack & Queue', value: 'Stack & Queue' },
  { label: 'Trees & BST', value: 'Trees & Binary Search Trees' },
  { label: 'Graphs', value: 'Graphs' },
  { label: 'Dynamic Programming', value: 'Dynamic Programming' },
  { label: 'Greedy & Intervals', value: 'Greedy / Heap / Intervals' }
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
                          (p.topic && p.topic.toLowerCase().includes(query)) ||
                          (p.subtopics && p.subtopics.some(s => s.toLowerCase().includes(query))) ||
                          (p.tags && p.tags.some(t => t.toLowerCase().includes(query)));
    const matchesDiff = difficultyFilter === 'ALL' || p.difficulty === difficultyFilter;
    const matchesTopic = topicFilter === 'ALL' || p.topic === topicFilter;
    return matchesSearch && matchesDiff && matchesTopic;
  });

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#121212] text-zinc-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262626]">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-md bg-[#262626] border border-[#333333] text-emerald-400">
                <Terminal size={18} />
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Algomind Problem Catalog
              </h1>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1.5">
              Practice progressive multi-stage algorithmic interview drills with AST complexity evaluation and Socratic hints.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-[#1e1e1e] border border-[#2e2e2e] text-xs font-mono text-zinc-300">
              <span className="text-emerald-400 font-bold">{problems.length}</span> Challenges Loaded
            </div>
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
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 font-semibold shadow-sm'
                  : 'bg-[#1e1e1e] text-zinc-400 border-[#2e2e2e] hover:text-white hover:bg-[#262626]'
              }`}
            >
              {top.label}
            </button>
          ))}
        </div>

        {/* Filter Controls Bar */}
        <div className="p-3 rounded-xl bg-[#1a1a1a] border border-[#282828] flex flex-col sm:flex-row items-center gap-3 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search problems by name, pattern, topic, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#121212] border border-[#2e2e2e] text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Difficulty Tabs */}
            <div className="flex items-center p-1 rounded-lg bg-[#121212] border border-[#2e2e2e] text-xs">
              {['ALL', 'EASY', 'MEDIUM', 'HARD'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setDifficultyFilter(diff)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    difficultyFilter === diff
                      ? 'bg-[#262626] text-white font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
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
          <div className="py-20 text-center text-zinc-400 text-sm">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Loading problem catalog...
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50 text-rose-300 text-xs sm:text-sm">
            {error} (Ensure backend server is running on port 5000)
          </div>
        )}

        {/* Problem Card List */}
        {!loading && !error && (
          <div className="space-y-2.5">
            {filteredProblems.length === 0 ? (
              <div className="py-16 text-center text-zinc-500 text-sm bg-[#1a1a1a] rounded-xl border border-[#282828]">
                No problems found matching your search and filter criteria.
              </div>
            ) : (
              filteredProblems.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectProblem(p.id)}
                  className="p-4 sm:p-5 rounded-xl bg-[#1e1e1e] border border-[#2d2d2d] hover:border-[#444] hover:bg-[#232323] transition-all cursor-pointer flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-xs font-mono text-zinc-500">#{p.id}</span>
                        <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-emerald-400 transition-colors truncate">
                          {p.title}
                        </h3>
                        {p.topic && (
                          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-[#282828] text-zinc-300 border border-[#383838]">
                            {p.topic}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-zinc-400">
                        {/* Difficulty Pill */}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          p.difficulty === 'EASY' 
                            ? 'text-[#00b8a3] bg-[#00b8a3]/10 border-[#00b8a3]/30'
                            : p.difficulty === 'MEDIUM'
                            ? 'text-[#ffc01e] bg-[#ffc01e]/10 border-[#ffc01e]/30'
                            : 'text-[#ff375f] bg-[#ff375f]/10 border-[#ff375f]/30'
                        }`}>
                          {p.difficulty}
                        </span>

                        {p.expected_time_complexity && (
                          <span className="font-mono text-[10px] text-zinc-400 bg-[#262626] px-2 py-0.5 rounded border border-[#333333]">
                            {p.expected_time_complexity}
                          </span>
                        )}

                        <span className="flex items-center gap-1 font-mono text-[10px] text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-800/40">
                          <Layers size={11} className="text-purple-400" />
                          Multi-Stage
                        </span>

                        <span className="text-[11px] text-zinc-500">
                          {p.time_limit_ms || 1000}ms limit
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Action Button */}
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className="hidden md:inline-block text-xs font-medium text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Solve Challenge
                    </span>
                    <div className="p-2 rounded-lg bg-[#282828] border border-[#383838] text-zinc-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 transition-all">
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
