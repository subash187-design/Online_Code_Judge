import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Sparkles, 
  Activity, 
  ArrowRight, 
  Zap, 
  Lock,
  Terminal,
  CheckCircle2,
  Code2,
  Clock,
  TrendingUp,
  Award,
  Check,
  GitBranch,
  ShieldCheck,
  BarChart3,
  Flame,
  BookOpen,
  Binary,
  Boxes,
  FileCode2,
  Server,
  HelpCircle,
  Play,
  RotateCcw,
  Sliders,
  ChevronRight,
  Eye,
  Workflow
} from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  // Interactive Studio Tab: 'ast' | 'mentor' | 'sandbox'
  const [activeStudioTab, setActiveStudioTab] = useState('ast');

  // 10 Algorithmic Tracks in Algomind (Curriculum overview)
  const tracks = [
    { name: "Dynamic Programming", desc: "Top-down memoization, bottom-up tabulation & state space reduction", count: "16 Drills", icon: <Boxes size={18} /> },
    { name: "Graph Algorithms", desc: "BFS, DFS, cycle detection, topological sort & shortest path Dijkstra", count: "12 Drills", icon: <GitBranch size={18} /> },
    { name: "Trees & Binary Search Trees", desc: "Tree inversions, Lowest Common Ancestor, path sums & validation", count: "14 Drills", icon: <Workflow size={18} /> },
    { name: "Arrays & Hash Tables", desc: "Amortized O(1) lookups, prefix sums, frequency vectors & two sum", count: "15 Drills", icon: <Binary size={18} /> },
    { name: "Two Pointers & Sliding Window", desc: "Monotonic bounds, expanding intervals & container trapping", count: "12 Drills", icon: <Sliders size={18} /> },
    { name: "Monotonic Stacks & Queues", desc: "Next greater element, histogram areas & sliding window extremes", count: "11 Drills", icon: <Layers size={18} /> },
    { name: "Binary Search & Bounds", desc: "Lower/upper bound heuristics & searching rotated sorted spaces", count: "8 Drills", icon: <Activity size={18} /> },
    { name: "Greedy & Priority Queues", desc: "Interval scheduling, heap top-k elements & optimal caching", count: "8 Drills", icon: <TrendingUp size={18} /> },
    { name: "Linked List Manipulation", desc: "Fast-slow pointer cycles, list reversals & merging k-lists", count: "8 Drills", icon: <Code2 size={18} /> },
    { name: "String Algorithms", desc: "Anagram groupings, pattern matching & palindromic substrings", count: "8 Drills", icon: <FileCode2 size={18} /> }
  ];

  // Core Superpowers
  const superpowers = [
    {
      icon: <Layers size={22} className="text-blue-500" />,
      tag: "Phase Progression",
      title: "Multi-Stage Solution Drills",
      desc: "Unlike traditional judges that reject brute force with cold TLE errors, Algomind accepts your working logic in Stage 1, verifying correctness before challenging you with Stage 2 & 3 scaled constraints."
    },
    {
      icon: <Cpu size={22} className="text-indigo-500" />,
      tag: "Deep Compiler Scan",
      title: "Real-Time Static AST Parser",
      desc: "Our engine scans the Abstract Syntax Tree (AST) of your code. It calculates loop nesting levels, recursive branching, and container dimensions to evaluate theoretical Big-O before tests finish running."
    },
    {
      icon: <Sparkles size={22} className="text-amber-500" />,
      tag: "AI Pedagogy",
      title: "Socratic AI Algorithmic Mentor",
      desc: "Never get stuck copying solutions from forums. Our AI inspects your code's syntax bottlenecks and provides tiered, Socratic hints that guide your intuition toward the optimal mathematical invariant."
    },
    {
      icon: <Server size={22} className="text-emerald-500" />,
      tag: "Hardened Security",
      title: "Isolated Linux Docker Sandboxing",
      desc: "Submissions compile and execute within secure Linux Docker containers with strict cgroup limits for microsecond CPU timing, memory quotas, and hidden edge-case stress validation."
    },
    {
      icon: <TrendingUp size={22} className="text-cyan-500" />,
      tag: "Optimization Analytics",
      title: "Submission Journey & Code Diffs",
      desc: "Track your algorithmic growth with visual latency drop curves, memory delta benchmarks, and side-by-side code diffs across every attempt you submit."
    },
    {
      icon: <Flame size={22} className="text-rose-500" />,
      tag: "Habit Engine",
      title: "6-Month Heatmap & Streaks",
      desc: "Stay disciplined with GitHub/LeetCode-style daily submission heatmaps, current streak counters, and multi-stage completion badges displayed directly on your profile."
    }
  ];

  // How it works steps
  const steps = [
    {
      number: "01",
      title: "Draft Working Logic (Stage 1)",
      desc: "Write your intuitive, initial brute-force approach. Confirm test suite edge cases, boundary parameters, and logical correctness without premature optimization stress."
    },
    {
      number: "02",
      title: "AST Compiler & Docker Execution",
      desc: "Our isolated container evaluates microsecond execution timing, while the static AST scanner maps loop nesting depths, container dimensions, and theoretical Big-O."
    },
    {
      number: "03",
      title: "Consult Socratic AI Guidance",
      desc: "When constraints tighten for Stage 2 & 3, request tiered Socratic hints that nudge your problem-solving intuition rather than handing over spoiler code."
    },
    {
      number: "04",
      title: "Unlock Asymptotic Mastery",
      desc: "Refactor to O(N log N) or optimal O(N) linear bounds. Master all 3 stages, log submission telemetry curves, and build your daily developer streak."
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-[#f4f6f8] text-slate-800 dark:bg-[#111111] dark:text-zinc-100 transition-colors duration-200">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#e2e4e8] dark:border-[#222222]">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent dark:from-blue-600/15 dark:via-indigo-600/5 dark:to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Hero Header & Title */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#1a1a1a] text-xs font-semibold text-slate-700 dark:text-zinc-300 border border-[#d5d9de] dark:border-[#333333] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              <span>The Next-Generation Online Code Judge</span>
              <span className="text-slate-300 dark:text-zinc-600">•</span>
              <span className="text-blue-600 dark:text-blue-400 font-mono">AST Telemetry & Socratic AI</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              Code. Optimize. Evolve. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 dark:from-blue-400 dark:via-indigo-300 dark:to-blue-400">
                The Multi-Stage Code Judge.
              </span>
            </h1>

            {/* Subheading describing what Algomind is */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Traditional code judges reject brute-force solutions with an unhelpful <span className="font-mono text-rose-500 font-semibold bg-rose-50 dark:bg-rose-950/40 px-1 py-0.5 rounded border border-rose-200 dark:border-rose-900/50">Time Limit Exceeded</span>. 
              <strong> Algomind</strong> coaches you through progressive complexity tiers — evaluating functional correctness in Stage 1, analyzing your <span className="text-blue-600 dark:text-blue-400 font-medium">AST syntax tree</span>, and guiding you to optimal Big-O with <span className="text-indigo-600 dark:text-indigo-400 font-medium">Socratic AI hints</span>.
            </p>

            {/* Dual Primary Call-to-Actions (No Problem Access before login) */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
              <button
                onClick={() => onNavigate('signup')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 group"
              >
                Create Free Account
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('signin')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-all border border-[#d5d9de] shadow-xs flex items-center justify-center gap-2 dark:bg-[#1e1e1e] dark:hover:bg-[#282828] dark:text-zinc-200 dark:border-[#333333]"
              >
                <Lock size={15} className="text-slate-500 dark:text-zinc-400" />
                Sign In to Judge
              </button>
            </div>

            {/* Notice */}
            <p className="text-xs text-slate-500 dark:text-zinc-500 font-medium">
              🔒 Free developer account required to access 100+ challenges, Monaco editor, and isolated sandbox.
            </p>

          </div>

          {/* 2. THE HERO VISUAL: "ALGOMIND STUDIO INTERFACE PREVIEW" */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="rounded-2xl bg-white dark:bg-[#181818] border border-[#d5d9de] dark:border-[#2d2d2d] shadow-xl overflow-hidden">
              
              {/* Studio Window Bar */}
              <div className="px-4 py-3 bg-[#eaedf0] dark:bg-[#121212] border-b border-[#dce0e5] dark:border-[#262626] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-400/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block"></span>
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-600 dark:text-zinc-400 ml-2">
                    algomind-studio :: challenge-003 :: two-sum
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[11px] font-mono font-bold border border-emerald-200 dark:border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Sandbox Ready
                  </span>
                </div>
              </div>

              {/* Progressive Stage Stepper Bar */}
              <div className="bg-[#f0f2f5] dark:bg-[#1a1a1a] px-4 py-2.5 border-b border-[#e2e4e8] dark:border-[#262626] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase font-mono">
                    Multi-Stage Drill:
                  </span>
                  
                  {/* Stages */}
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-100/70 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 font-mono font-bold text-[11px] flex items-center gap-1">
                      ✓ Stage 1: O(N²)
                    </span>
                    <span className="text-slate-300 dark:text-zinc-600">→</span>
                    <span className="px-2.5 py-1 rounded-md bg-blue-100/70 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300 font-mono font-bold text-[11px] flex items-center gap-1">
                      ✓ Stage 2: O(N log N)
                    </span>
                    <span className="text-slate-300 dark:text-zinc-600">→</span>
                    <span className="px-2.5 py-1 rounded-md bg-amber-100/80 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 font-mono font-bold text-[11px] flex items-center gap-1 border border-amber-300/60 dark:border-amber-700/60 shadow-xs">
                      ⚡ Stage 3: O(N) Optimal
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                  Target: <strong className="text-slate-900 dark:text-white">O(N) Time · O(N) Space</strong>
                </div>
              </div>

              {/* Studio Body: Split View (Code Editor + Interactive Inspector) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#e2e4e8] dark:divide-[#262626]">
                
                {/* Left: Code Editor Preview */}
                <div className="lg:col-span-7 p-4 bg-[#1e1e1e] text-zinc-100 font-mono text-xs overflow-x-auto">
                  <div className="flex items-center justify-between text-zinc-400 text-[11px] pb-3 mb-2 border-b border-zinc-800">
                    <span className="flex items-center gap-1.5 font-sans">
                      <Code2 size={13} className="text-blue-400" />
                      Solution.cpp (C++20 GCC)
                    </span>
                    <span>14 lines</span>
                  </div>
                  
                  <div className="space-y-1 text-zinc-300 font-mono leading-relaxed">
                    <div className="text-zinc-500">// Stage 3: Optimal Hash Map Lookup (Single-Pass)</div>
                    <div><span className="text-purple-400">#include</span> <span className="text-emerald-300">&lt;unordered_map&gt;</span></div>
                    <div><span className="text-purple-400">#include</span> <span className="text-emerald-300">&lt;vector&gt;</span></div>
                    <div><span className="text-blue-400">using namespace</span> std;</div>
                    <div className="pt-1"><span className="text-blue-400">vector</span>&lt;<span className="text-blue-400">int</span>&gt; twoSum(<span className="text-blue-400">vector</span>&lt;<span className="text-blue-400">int</span>&gt;&amp; nums, <span className="text-blue-400">int</span> target) &#123;</div>
                    <div className="pl-4"><span className="text-blue-400">unordered_map</span>&lt;<span className="text-blue-400">int</span>, <span className="text-blue-400">int</span>&gt; seen; <span className="text-zinc-500">// O(1) avg</span></div>
                    <div className="pl-4"><span className="text-purple-400">for</span> (<span className="text-blue-400">int</span> i = <span className="text-amber-300">0</span>; i &lt; nums.size(); i++) &#123;</div>
                    <div className="pl-8"><span className="text-blue-400">int</span> complement = target - nums[i];</div>
                    <div className="pl-8"><span className="text-purple-400">if</span> (seen.find(complement) != seen.end()) &#123;</div>
                    <div className="pl-12"><span className="text-purple-400">return</span> &#123;seen[complement], i&#125;;</div>
                    <div className="pl-8">&#125;</div>
                    <div className="pl-8">seen[nums[i]] = i;</div>
                    <div className="pl-4">&#125;</div>
                    <div className="pl-4"><span className="text-purple-400">return</span> &#123;&#125;;</div>
                    <div>&#125;</div>
                  </div>
                </div>

                {/* Right: Interactive Telemetry & Intelligence Panel */}
                <div className="lg:col-span-5 p-4 bg-[#f8f9fa] dark:bg-[#181818] flex flex-col justify-between space-y-4">
                  
                  {/* Inspector Tabs */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 bg-[#edeef1] dark:bg-[#222222] p-1 rounded-xl text-[11px] font-semibold border border-[#dce0e5] dark:border-[#303030]">
                      <button
                        onClick={() => setActiveStudioTab('ast')}
                        className={`py-1.5 px-1 rounded-lg transition-all text-center ${
                          activeStudioTab === 'ast'
                            ? 'bg-white dark:bg-[#2d2d2d] text-blue-600 dark:text-blue-400 shadow-xs'
                            : 'text-slate-600 dark:text-zinc-400'
                        }`}
                      >
                        AST Parser
                      </button>
                      <button
                        onClick={() => setActiveStudioTab('mentor')}
                        className={`py-1.5 px-1 rounded-lg transition-all text-center ${
                          activeStudioTab === 'mentor'
                            ? 'bg-white dark:bg-[#2d2d2d] text-indigo-600 dark:text-indigo-400 shadow-xs'
                            : 'text-slate-600 dark:text-zinc-400'
                        }`}
                      >
                        AI Mentor
                      </button>
                      <button
                        onClick={() => setActiveStudioTab('sandbox')}
                        className={`py-1.5 px-1 rounded-lg transition-all text-center ${
                          activeStudioTab === 'sandbox'
                            ? 'bg-white dark:bg-[#2d2d2d] text-emerald-600 dark:text-emerald-400 shadow-xs'
                            : 'text-slate-600 dark:text-zinc-400'
                        }`}
                      >
                        Sandbox
                      </button>
                    </div>

                    {/* Tab 1: AST Parser View */}
                    {activeStudioTab === 'ast' && (
                      <div className="p-3.5 rounded-xl bg-white dark:bg-[#202020] border border-[#e2e4e8] dark:border-[#2d2d2d] space-y-2.5 text-xs">
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-2">
                          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <Cpu size={14} className="text-blue-500" />
                            Static Syntax Analysis
                          </span>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 font-bold">
                            Confidence: 95%
                          </span>
                        </div>
                        <div className="space-y-1.5 text-[11px] font-mono">
                          <div className="flex justify-between py-0.5">
                            <span className="text-slate-500 dark:text-zinc-400">Loop Nesting Depth:</span>
                            <span className="font-bold text-slate-800 dark:text-zinc-200">1 (Linear Single Pass)</span>
                          </div>
                          <div className="flex justify-between py-0.5">
                            <span className="text-slate-500 dark:text-zinc-400">Container Allocation:</span>
                            <span className="font-bold text-blue-600 dark:text-blue-400">unordered_map&lt;int, int&gt;</span>
                          </div>
                          <div className="flex justify-between py-0.5">
                            <span className="text-slate-500 dark:text-zinc-400">Theoretical Time:</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">O(N) Optimal</span>
                          </div>
                          <div className="flex justify-between py-0.5">
                            <span className="text-slate-500 dark:text-zinc-400">Theoretical Space:</span>
                            <span className="font-bold text-slate-800 dark:text-zinc-200">O(N) Aux Hash Map</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tab 2: Socratic AI Mentor View */}
                    {activeStudioTab === 'mentor' && (
                      <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-900/40 space-y-2 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-indigo-700 dark:text-indigo-400">
                          <Sparkles size={14} />
                          Socratic Guidance (Tier 2 of 3)
                        </div>
                        <p className="text-[11px] text-slate-700 dark:text-zinc-300 leading-relaxed font-normal">
                          "Excellent transition from Stage 2! Instead of sorting in O(N log N), you've leveraged a hash table to trade O(N) memory for constant-time complement lookup. Notice how this avoids duplicate pair scans entirely."
                        </p>
                        <div className="pt-1 text-[10px] font-mono text-indigo-600 dark:text-indigo-400">
                          Stepped Hint: Next stage invariant locked.
                        </div>
                      </div>
                    )}

                    {/* Tab 3: Docker Sandbox View */}
                    {activeStudioTab === 'sandbox' && (
                      <div className="p-3.5 rounded-xl bg-white dark:bg-[#202020] border border-[#e2e4e8] dark:border-[#2d2d2d] space-y-2.5 text-xs">
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-2">
                          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <Server size={14} className="text-emerald-500" />
                            Docker Cgroups Telemetry
                          </span>
                          <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                            VERDICT: ACCEPTED
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                          <div className="p-2 rounded-lg bg-slate-50 dark:bg-[#181818] border border-slate-200/60 dark:border-[#2a2a2a]">
                            <span className="text-[10px] text-slate-500 block">Execution Latency</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">2.8 ms</span>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-50 dark:bg-[#181818] border border-slate-200/60 dark:border-[#2a2a2a]">
                            <span className="text-[10px] text-slate-500 block">Memory Footprint</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">14.1 MB</span>
                          </div>
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">
                          Stress Runner: 20/20 Test Cases Passed (0 timeouts)
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action in Studio Preview */}
                  <div className="pt-2 border-t border-[#e2e4e8] dark:border-[#262626] flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-zinc-400 font-mono text-[11px]">
                      Stage 3 Mastered
                    </span>
                    <button
                      onClick={() => onNavigate('signup')}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <span>Try Live</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. PLATFORM IDENTITY: WHAT MAKES ALGOMIND DIFFERENT */}
      <section id="features" className="py-16 md:py-20 bg-white dark:bg-[#151515] border-b border-[#e2e4e8] dark:border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
              Engineered for Mastery
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Why Algomind Reinvents Algorithmic Practice
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base font-normal leading-relaxed">
              Traditional code platforms only verify whether your final code passes tests in a single submission. Algomind treats algorithmic problem solving as a progressive, multi-stage engineering discipline.
            </p>
          </div>

          {/* 6 Superpowers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {superpowers.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e4e8] dark:border-[#262626] hover:border-slate-300 dark:hover:border-[#383838] hover:shadow-md transition-all shadow-xs flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#222222] border border-[#dce0e5] dark:border-[#333333] flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                      {feat.icon}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-[#262626] text-slate-700 dark:text-zinc-300 font-semibold">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {feat.title}
                  </h3>

                  <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. THE 4-STEP OPTIMIZATION LIFECYCLE */}
      <section id="how-it-works" className="py-16 md:py-20 bg-[#f4f6f8] dark:bg-[#111111] border-b border-[#e2e4e8] dark:border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
              The Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              The 4-Step Optimization Lifecycle
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base font-normal">
              How developers build authentic problem-solving muscle memory on Algomind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-[#181818] border border-[#e2e4e8] dark:border-[#262626] shadow-xs relative flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-[#383838] transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#f0f2f5] dark:bg-[#242424] border border-[#e0e2e6] dark:border-[#333333] text-xs font-mono font-extrabold text-blue-700 dark:text-blue-400">
                      STEP {item.number}
                    </span>
                    <span className="text-slate-200 dark:text-[#262626] font-mono text-2xl font-black select-none">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 dark:text-zinc-400 text-xs leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. CURRICULUM PREVIEW: 10 ALGORITHMIC TRACKS (LOCKED BEHIND LOGIN) */}
      <section id="platform" className="py-16 md:py-20 bg-white dark:bg-[#151515] border-b border-[#e2e4e8] dark:border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#202020] text-slate-600 dark:text-zinc-300 text-xs font-semibold border border-slate-200 dark:border-[#303030]">
              <Lock size={12} className="text-blue-500" />
              <span>Full Curriculum Available After Authentication</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              10 Comprehensive Algorithmic Tracks
            </h2>

            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base font-normal">
              100+ multi-stage problems covering fundamental to advanced competitive programming paradigms.
            </p>
          </div>

          {/* Tracks 10-Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {tracks.map((trk, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e4e8] dark:border-[#262626] flex flex-col justify-between space-y-3 shadow-xs hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-blue-600 dark:text-blue-400">
                      {trk.icon}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-[#242424] text-slate-700 dark:text-zinc-300 font-bold border border-slate-200 dark:border-[#333333]">
                      {trk.count}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {trk.name}
                  </h3>

                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed font-normal">
                    {trk.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#e2e4e8] dark:border-[#262626] flex items-center justify-between text-[10px] text-slate-400 dark:text-zinc-500">
                  <span className="flex items-center gap-1 font-mono">
                    <Lock size={10} /> Member Access
                  </span>
                  <span>3 Stages</span>
                </div>
              </div>
            ))}
          </div>

          {/* Login Banner for Tracks */}
          <div className="mt-10 max-w-xl mx-auto p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 text-center space-y-3">
            <p className="text-xs text-slate-700 dark:text-zinc-300 font-medium">
              Want to start practicing these tracks with the live compiler and Socratic mentor?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => onNavigate('signup')}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-xs transition-colors"
              >
                Sign Up to Unlock
              </button>
              <button
                onClick={() => onNavigate('signin')}
                className="px-5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 dark:bg-[#202020] dark:text-zinc-200 dark:hover:bg-[#282828] font-semibold text-xs border border-slate-200 dark:border-[#303030] transition-colors"
              >
                Log In
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION BANNER */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#f4f6f8] to-white dark:from-[#111111] dark:to-[#161616] border-b border-[#e2e4e8] dark:border-[#222222] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60 shadow-xs">
            <Flame size={14} className="text-amber-500" />
            Build Your Daily Algorithmic Streak
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Ready to Master Algorithms Systematically?
          </h2>
          
          <p className="text-slate-600 dark:text-zinc-300 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
            Create your account in seconds. Access the complete library of progressive multi-stage challenges, live AST syntax analysis, and Socratic AI guidance.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-3.5">
            <button
              onClick={() => onNavigate('signup')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Create Free Account
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNavigate('signin')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-all border border-[#d5d9de] shadow-xs flex items-center justify-center gap-2 dark:bg-[#1e1e1e] dark:hover:bg-[#282828] dark:text-zinc-200 dark:border-[#333333]"
            >
              <Lock size={15} />
              Sign In to Your Workspace
            </button>
          </div>

          <p className="text-[11px] text-slate-400 dark:text-zinc-500">
            No credit card required • Instant access upon registration
          </p>

        </div>
      </section>

      {/* 7. FOOTER WITH BRAND LOGOS (LIGHT & DARK) */}
      <footer id="about" className="mt-auto bg-[#eaedf0] dark:bg-[#0c0c0c] py-10 text-center text-xs text-slate-500 dark:text-zinc-500 transition-colors border-t border-[#d8dbe0] dark:border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="h-7 w-auto flex items-center">
                <img 
                  src="/logo-horizontal-light.png" 
                  alt="Algomind Logo" 
                  className="h-full w-auto object-contain dark:hidden" 
                />
                <img 
                  src="/logo-horizontal-dark.png" 
                  alt="Algomind Logo" 
                  className="h-full w-auto object-contain hidden dark:block" 
                />
              </div>
              <span className="text-slate-400 dark:text-zinc-600">|</span>
              <span className="font-semibold text-slate-800 dark:text-zinc-300">
                AI-Guided Online Code Judge
              </span>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 font-medium text-slate-600 dark:text-zinc-400">
              <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                How It Works
              </a>
              <a href="#platform" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Curriculum
              </a>
              <button onClick={() => onNavigate('signin')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Sign In
              </button>
              <button onClick={() => onNavigate('signup')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Register Free
              </button>
            </div>

          </div>

          <div className="pt-4 border-t border-[#d8dbe0] dark:border-[#1e1e1e] flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 dark:text-zinc-500 gap-2">
            <span>
              &copy; {new Date().getFullYear()} Algomind Inc. All rights reserved.
            </span>
            <div className="flex gap-4">
              <span>AST Static Heuristics Engine</span>
              <span>•</span>
              <span>Linux Docker Cgroups Sandbox</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
