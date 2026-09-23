import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Sparkles, 
  Activity, 
  ArrowRight, 
  Zap, 
  ChevronRight,
  Lock,
  Terminal,
  CheckCircle2,
  Code2,
  Clock,
  TrendingUp,
  Award,
  Search,
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
  X,
  Play,
  RotateCcw
} from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  // Interactive Hero Simulator State
  const [activeStage, setActiveStage] = useState('stage1');
  const [activeTrack, setActiveTrack] = useState('arrays');

  // Simulation Data for Two Sum Evolution
  const simulationStages = {
    stage1: {
      stageLabel: "Stage 1: Brute Force",
      complexity: "O(N²)",
      complexityType: "Time: O(N²) · Space: O(1)",
      runtime: "142 ms",
      memory: "4.2 MB",
      badgeColor: "amber",
      astDetected: "NESTED_LOOPS (Depth 2)",
      testsPassed: "8 / 8 Base Tests Passed",
      code: `// Stage 1: Brute Force (Nested Loop Scan)
vector<int> twoSum(vector<int>& nums, int target) {
    int n = nums.size();
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] == target) {
                return {i, j};
            }
        }
    }
    return {};
}`,
      mentorFeedback: "Baseline functional correctness verified! However, your nested loop scans all pairs redundantly in O(N²) time. When N grows to 100,000, this will exceed time limits. Can you remember elements you have already seen?"
    },
    stage2: {
      stageLabel: "Stage 2: Sorted Two-Pointers",
      complexity: "O(N log N)",
      complexityType: "Time: O(N log N) · Space: O(N)",
      runtime: "26 ms",
      memory: "5.1 MB",
      badgeColor: "blue",
      astDetected: "STD_SORT + LINEAR_POINTER_SCAN",
      testsPassed: "14 / 14 Scaled Tests Passed",
      code: `// Stage 2: Sorting + Two-Pointer Convergence
vector<int> twoSum(vector<int>& nums, int target) {
    vector<pair<int, int>> arr;
    for (int i = 0; i < nums.size(); i++) arr.push_back({nums[i], i});
    sort(arr.begin(), arr.end()); // O(N log N)
    
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        int sum = arr[left].first + arr[right].first;
        if (sum == target) return {arr[left].second, arr[right].second};
        if (sum < target) left++;
        else right--;
    }
    return {};
}`,
      mentorFeedback: "Significant improvement! Sorting the array slashed execution time from 142ms down to 26ms (82% latency drop). But can we do even better? Is there a container that offers O(1) average lookup without sorting?"
    },
    stage3: {
      stageLabel: "Stage 3: Hash Map (Optimal)",
      complexity: "O(N)",
      complexityType: "Time: O(N) · Space: O(N)",
      runtime: "3 ms",
      memory: "5.9 MB",
      badgeColor: "emerald",
      astDetected: "HASH_MAP (unordered_map) + SINGLE_PASS",
      testsPassed: "20 / 20 Stress & Edge Cases Passed",
      code: `// Stage 3: Optimal Hash Map Lookup (Single Pass)
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen; // O(1) average lookup
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.find(complement) != seen.end()) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}`,
      mentorFeedback: "Optimal asymptotic bound achieved! With unordered_map lookups in O(1) amortized time, your solution completes in just 3ms across 100,000 items. All 3 stages mastered and recorded on your telemetry!"
    }
  };

  const currentSim = simulationStages[activeStage];

  // Algorithmic Tracks Data
  const tracks = {
    arrays: {
      title: "Arrays & Hashing",
      desc: "Hash tables, prefix sums, frequency vectors, and amortized constant-time lookup patterns.",
      count: "15 Problems",
      examples: [
        { title: "Two Sum", difficulty: "Easy", stages: "O(N²) → O(N log N) → O(N)" },
        { title: "Group Anagrams", difficulty: "Medium", stages: "O(N·K log K) → O(N·K)" },
        { title: "Longest Consecutive Sequence", difficulty: "Medium", stages: "O(N log N) → O(N)" }
      ]
    },
    dp: {
      title: "Dynamic Programming",
      desc: "Deconstruct recursive subproblems, memoization tables, bottom-up tabulation, and space optimizations.",
      count: "16 Problems",
      examples: [
        { title: "Coin Change", difficulty: "Medium", stages: "O(2ⁿ) → O(N·A) Memo → O(A) 1D DP" },
        { title: "Longest Increasing Subseq", difficulty: "Medium", stages: "O(2ⁿ) → O(N²) → O(N log N)" },
        { title: "0/1 Knapsack & Partition", difficulty: "Medium", stages: "O(2ⁿ) → O(N·W) 2D → O(W) 1D" }
      ]
    },
    trees: {
      title: "Trees & Binary Search Trees",
      desc: "Tree traversals, recursive invariants, Lowest Common Ancestor, and balanced binary search properties.",
      count: "14 Problems",
      examples: [
        { title: "Lowest Common Ancestor", difficulty: "Medium", stages: "O(N) with Path Vectors → O(N) O(1) Space" },
        { title: "Validate Binary Search Tree", difficulty: "Medium", stages: "In-order Array → Range Invariants" },
        { title: "Binary Tree Maximum Path", difficulty: "Hard", stages: "Brute Recursion → Post-Order DFS" }
      ]
    },
    pointers: {
      title: "Two Pointers & Sliding Window",
      desc: "Monotonic pointer movements, interval expansions, shrink conditions, and fast-slow traversals.",
      count: "12 Problems",
      examples: [
        { title: "Trapping Rain Water", difficulty: "Hard", stages: "O(N²) Brute → O(N) DP → O(N) 2-Pointers" },
        { title: "3Sum", difficulty: "Medium", stages: "O(N³) Nested → O(N²) Sort + Pointers" },
        { title: "Minimum Window Substring", difficulty: "Hard", stages: "O(N²) Substrings → O(N) Window" }
      ]
    },
    graphs: {
      title: "Graphs & Traversals",
      desc: "Breadth-first search, depth-first search, cycle detection, topological sorting, and Dijkstra's algorithm.",
      count: "12 Problems",
      examples: [
        { title: "Course Schedule", difficulty: "Medium", stages: "DFS Recursion → Kahn's Topological Sort" },
        { title: "Number of Islands", difficulty: "Medium", stages: "DFS In-Place → BFS Queue → Union-Find" },
        { title: "Word Ladder", difficulty: "Hard", stages: "All Pairs BFS → Bidirectional BFS" }
      ]
    },
    stacks: {
      title: "Stacks, Queues & Monotonic",
      desc: "Monotonic stacks, parenthetical matching, sliding window maximums, and min-heaps.",
      count: "11 Problems",
      examples: [
        { title: "Daily Temperatures", difficulty: "Medium", stages: "O(N²) Brute Force → O(N) Monotonic Stack" },
        { title: "Largest Rectangle in Histogram", difficulty: "Hard", stages: "O(N²) Scan → O(N) Monotonic Stack" },
        { title: "Sliding Window Maximum", difficulty: "Hard", stages: "O(N·K) Scan → O(N log K) → O(N) Deque" }
      ]
    }
  };

  // 4 Core Architectural Pillars
  const pillars = [
    {
      icon: <Layers size={24} className="text-blue-500" />,
      tag: "Progression Engine",
      title: "Multi-Stage Solution Drills",
      desc: "Traditional judges reject brute-force solutions outright. Algomind welcomes them as Stage 1, verifying functional correctness before systematically prompting you to refactor into near-optimal and optimal asymptotic bounds."
    },
    {
      icon: <Cpu size={24} className="text-indigo-500" />,
      tag: "Static Analysis",
      title: "Structural AST Complexity Scanner",
      desc: "Our engine performs static Abstract Syntax Tree (AST) scanning on submitted code. It inspects loop nesting levels, recursive branching, memoization caches, and container types to compute theoretical Big-O before runtime."
    },
    {
      icon: <Sparkles size={24} className="text-amber-500" />,
      tag: "AI Pedagogy",
      title: "Socratic AI Algorithmic Mentor",
      desc: "Unlike forums that give away full code solutions, our AI mentor analyzes your AST and runtime telemetry to offer stepped, Socratic hints that guide your intuition toward the mathematical invariant without spoiling the answer."
    },
    {
      icon: <Zap size={24} className="text-emerald-500" />,
      tag: "Secure Sandbox",
      title: "Linux Cgroup Sandboxing & Telemetry",
      desc: "Every submission executes inside isolated Linux Docker containers configured with strict memory and CPU cgroups. Submissions generate precise microsecond execution curves, memory footprints, and code diffs."
    }
  ];

  // Algomind vs Traditional Comparison
  const comparisons = [
    {
      feature: "Submission Philosophy",
      traditional: "All-or-nothing binary result. Submissions with high complexity fail with an uninformative 'Time Limit Exceeded' error.",
      algomind: "Progressive Multi-Stage: Validate brute-force correctness in Stage 1, then evolve step-by-step to O(N log N) and O(N)."
    },
    {
      feature: "Code Evaluation",
      traditional: "Wall-clock execution timer only. Zero insight into the underlying algorithmic structure or syntax.",
      algomind: "Deep Static AST Parser: Identifies loop depths, recursion trees, memoization matrices, and container dimensions."
    },
    {
      feature: "Mentorship & Hints",
      traditional: "Public discussion forums with spoiled full code solutions that encourage passive memorization.",
      algomind: "Socratic AI Mentor: Tiered progressive hints tailored to your exact code structure that nurture genuine problem-solving."
    },
    {
      feature: "Optimization History",
      traditional: "Disconnected list of attempts with simple Accepted / Wrong Answer / TLE tags.",
      algomind: "Interactive Journey Curves: Visual latency drop curves, memory deltas, and side-by-side code diffs across your attempts."
    },
    {
      feature: "Execution Environment",
      traditional: "Shared runners subject to noisy neighbor interference and volatile execution timings.",
      algomind: "Isolated Docker Sandbox: Strict Linux cgroup CPU & memory quotas with tamper-proof microsecond telemetry."
    }
  ];

  // Lifecycle Steps
  const lifecycleSteps = [
    {
      step: "01",
      title: "Implement Functional Logic",
      tag: "Stage 1: Correctness",
      desc: "Write your initial, intuitive solution without premature optimization anxiety. Confirm edge cases, boundary handling, and logical correctness."
    },
    {
      step: "02",
      title: "AST & Sandbox Telemetry",
      tag: "Automated Inspection",
      desc: "Our isolated Docker sandbox executes your code against base suites, while the static AST scanner measures nesting depth and space footprint."
    },
    {
      step: "03",
      title: "Socratic Mentorship",
      tag: "Adaptive Guidance",
      desc: "When constraints tighten for the next stage, consult the Socratic AI Mentor for stepped intuition prompts rather than looking up spoiler code."
    },
    {
      step: "04",
      title: "Asymptotic Mastery",
      tag: "Stage 2 & 3: Optimal",
      desc: "Refactor your logic to optimal bounds (O(N log N) or O(N)), unlock the next tier, and inspect your optimization trajectory on your profile."
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-[#f2f4f7] text-slate-800 dark:bg-[#121212] dark:text-zinc-100 transition-colors duration-200">
      
      {/* 1. HERO SECTION WITH INTERACTIVE SIMULATOR */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-20 border-b border-[#e2e4e8] dark:border-[#2d2d2d]">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Platform Identity & Value Proposition */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              {/* Distinctive Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1e1e1e] text-xs font-semibold text-slate-800 dark:text-zinc-200 border border-[#dce0e5] dark:border-[#333333] shadow-xs">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-blue-400"></span>
                </span>
                <span className="font-mono text-[11px] tracking-wide uppercase text-blue-600 dark:text-blue-400 font-bold">Algomind Code Judge</span>
                <span className="text-slate-300 dark:text-zinc-600">|</span>
                <span className="text-slate-600 dark:text-zinc-400">Multi-Stage Algorithmic Mastery</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.14]">
                Don't Just Solve Problems. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 dark:from-blue-400 dark:via-indigo-300 dark:to-blue-400">
                  Master Solution Evolution.
                </span>
              </h1>

              {/* Subheading Explaining What Algomind Is */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                Traditional code judges fail you with a generic <span className="font-mono text-rose-500 font-semibold bg-rose-50 dark:bg-rose-950/40 px-1 py-0.5 rounded border border-rose-200 dark:border-rose-900/50">Time Limit Exceeded</span>. 
                <strong className="text-slate-900 dark:text-white font-semibold"> Algomind</strong> coaches you through progressive complexity stages — evolving from brute-force to optimal with <span className="text-blue-600 dark:text-blue-400 font-medium">real-time AST analysis</span>, <span className="text-indigo-600 dark:text-indigo-400 font-medium">isolated Docker cgroups</span>, and a <span className="text-emerald-600 dark:text-emerald-400 font-medium">Socratic AI Mentor</span>.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onNavigate('problems')}
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 group"
                >
                  <Code2 size={16} />
                  Explore 100+ Challenges
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm transition-all border border-[#d5d9de] shadow-xs flex items-center justify-center gap-2 dark:bg-[#1e1e1e] dark:hover:bg-[#282828] dark:text-zinc-100 dark:border-[#333333]"
                >
                  <Sparkles size={16} className="text-amber-500" />
                  Start Free Account
                </button>
              </div>

              {/* Micro-Features Row */}
              <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 dark:text-zinc-400 border-t border-[#e2e4e8] dark:border-[#2d2d2d]">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>Multi-Stage Drills</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
                  <span>Static AST Parser</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 size={14} className="text-indigo-500 shrink-0" />
                  <span>Socratic AI Hints</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 size={14} className="text-amber-500 shrink-0" />
                  <span>Docker Cgroups</span>
                </div>
              </div>

            </div>

            {/* Right Column: Live Interactive Solution Simulator */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl bg-white dark:bg-[#1a1a1a] border border-[#dce0e5] dark:border-[#2d2d2d] shadow-lg overflow-hidden transition-all">
                
                {/* Simulator Header / Tabs */}
                <div className="px-4 py-3 bg-[#f8f9fa] dark:bg-[#141414] border-b border-[#e2e4e8] dark:border-[#2d2d2d] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-400 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-700 dark:text-zinc-300 ml-1">
                      Problem #1: Two Sum
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60">
                    Live Interactive Demo
                  </span>
                </div>

                {/* Stage Evolution Tabs */}
                <div className="grid grid-cols-3 bg-[#edeef1] dark:bg-[#202020] p-1 border-b border-[#e2e4e8] dark:border-[#2d2d2d] text-xs font-medium">
                  <button
                    onClick={() => setActiveStage('stage1')}
                    className={`py-2 px-1 rounded-md transition-all text-center flex flex-col items-center gap-0.5 ${
                      activeStage === 'stage1'
                        ? 'bg-white dark:bg-[#2b2b2b] text-amber-600 dark:text-amber-400 shadow-xs font-bold'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span>Stage 1</span>
                    <span className="text-[10px] font-mono">O(N²) Brute</span>
                  </button>
                  <button
                    onClick={() => setActiveStage('stage2')}
                    className={`py-2 px-1 rounded-md transition-all text-center flex flex-col items-center gap-0.5 ${
                      activeStage === 'stage2'
                        ? 'bg-white dark:bg-[#2b2b2b] text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span>Stage 2</span>
                    <span className="text-[10px] font-mono">O(N log N) Sort</span>
                  </button>
                  <button
                    onClick={() => setActiveStage('stage3')}
                    className={`py-2 px-1 rounded-md transition-all text-center flex flex-col items-center gap-0.5 ${
                      activeStage === 'stage3'
                        ? 'bg-white dark:bg-[#2b2b2b] text-emerald-600 dark:text-emerald-400 shadow-xs font-bold'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span>Stage 3</span>
                    <span className="text-[10px] font-mono">O(N) Optimal ★</span>
                  </button>
                </div>

                {/* Interactive Code Display */}
                <div className="p-4 bg-[#1e1e1e] text-zinc-100 font-mono text-xs overflow-x-auto border-b border-[#2d2d2d]">
                  <pre className="text-zinc-300 leading-relaxed font-mono">
                    <code>{currentSim.code}</code>
                  </pre>
                </div>

                {/* Real-Time AST & Sandbox Telemetry Panel */}
                <div className="p-4 space-y-3 bg-[#f8f9fa] dark:bg-[#181818]">
                  
                  {/* Telemetry Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#222222] border border-[#e2e4e8] dark:border-[#2d2d2d]">
                      <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">Asymptotic Bound</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 flex items-center gap-1 font-mono">
                        <span className={`w-2 h-2 rounded-full ${
                          activeStage === 'stage1' ? 'bg-amber-500' : activeStage === 'stage2' ? 'bg-blue-500' : 'bg-emerald-500'
                        }`}></span>
                        {currentSim.complexity}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#222222] border border-[#e2e4e8] dark:border-[#2d2d2d]">
                      <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">Docker Runtime</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 font-mono">
                        {currentSim.runtime}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#222222] border border-[#e2e4e8] dark:border-[#2d2d2d]">
                      <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">Memory Usage</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 font-mono">
                        {currentSim.memory}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#222222] border border-[#e2e4e8] dark:border-[#2d2d2d]">
                      <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">Stage Status</div>
                      <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 truncate">
                        ✓ Passed
                      </div>
                    </div>
                  </div>

                  {/* AST Heuristic Scanner Badge */}
                  <div className="px-3 py-2 rounded-xl bg-white dark:bg-[#222222] border border-[#e2e4e8] dark:border-[#2d2d2d] flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-zinc-400 font-mono text-[11px] flex items-center gap-1.5">
                      <Cpu size={13} className="text-blue-500" />
                      AST Detected:
                    </span>
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-[11px]">
                      {currentSim.astDetected}
                    </span>
                  </div>

                  {/* Socratic Mentor Speech Bubble */}
                  <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 dark:bg-blue-950/30 dark:border-blue-900/40 text-xs text-slate-700 dark:text-zinc-300 relative">
                    <div className="flex items-center gap-1.5 font-bold text-blue-700 dark:text-blue-400 mb-1">
                      <Sparkles size={13} />
                      AI Socratic Mentor Guidance
                    </div>
                    <p className="text-[11px] leading-relaxed font-normal">
                      "{currentSim.mentorFeedback}"
                    </p>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PLATFORM METRICS COUNTER BAR */}
      <section className="py-8 bg-white dark:bg-[#181818] border-b border-[#e2e4e8] dark:border-[#2d2d2d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                102
              </div>
              <div className="text-xs font-semibold text-slate-800 dark:text-zinc-200">
                Curated Problem Catalog
              </div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                Multi-stage algorithmic drills
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                3 Tiers
              </div>
              <div className="text-xs font-semibold text-slate-800 dark:text-zinc-200">
                Progressive Complexity Stages
              </div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                Brute → Sub-Optimal → Optimal
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                10 Tracks
              </div>
              <div className="text-xs font-semibold text-slate-800 dark:text-zinc-200">
                Data Structure Paradigms
              </div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                DP, Trees, Graphs, Sliding Window
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                &lt; 50ms
              </div>
              <div className="text-xs font-semibold text-slate-800 dark:text-zinc-200">
                Linux Cgroup Evaluation
              </div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                Isolated Docker execution timing
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. WHY ALGOMIND IS DIFFERENT: COMPARISON MATRIX */}
      <section id="comparison" className="py-16 md:py-20 bg-[#f2f4f7] dark:bg-[#121212] border-b border-[#e2e4e8] dark:border-[#2d2d2d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
              Beyond Traditional Judges
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Why Algomind Reinvents Problem Solving
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 mt-3 text-sm sm:text-base font-normal">
              Most platforms only judge the final result with zero educational scaffolding. 
              Algomind treats algorithmic problem solving as a progressive craft.
            </p>
          </div>

          {/* Comparison Cards / Table */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {comparisons.map((row, idx) => (
              <div 
                key={idx}
                className="rounded-2xl bg-white dark:bg-[#1a1a1a] border border-[#e2e4e8] dark:border-[#2d2d2d] p-5 shadow-xs transition-all hover:border-slate-300 dark:hover:border-[#383838]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-[#252525] text-xs font-bold text-slate-800 dark:text-zinc-200 font-mono">
                    {row.feature}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Traditional Judge Column */}
                  <div className="p-3.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/30">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400 mb-1">
                      <X size={14} className="shrink-0" />
                      Traditional Online Judges
                    </div>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                      {row.traditional}
                    </p>
                  </div>

                  {/* Algomind Column */}
                  <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">
                      <Check size={14} className="shrink-0" />
                      Algomind Multi-Stage Platform
                    </div>
                    <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed font-normal">
                      {row.algomind}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. FOUR CORE PILLARS OF ALGOMIND */}
      <section id="features" className="py-16 md:py-20 bg-[#f8f9fa] dark:bg-[#141414] border-b border-[#e2e4e8] dark:border-[#2d2d2d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
              Core Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Built for Genuine Algorithmic Mastery
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 mt-3 text-sm sm:text-base font-normal">
              Engineered with modern AST analysis, container isolation, and pedagogical intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#1e1e1e] border border-[#e2e4e8] dark:border-[#2d2d2d] hover:border-slate-300 dark:hover:border-[#3d3d3d] hover:shadow-md transition-all shadow-xs flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#f0f2f5] dark:bg-[#252525] flex items-center justify-center border border-[#e0e2e6] dark:border-[#333333] group-hover:scale-105 transition-transform">
                      {pillar.icon}
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#282828] text-slate-600 dark:text-zinc-300 font-semibold border border-slate-200 dark:border-[#383838]">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE PROBLEM TRACKS PREVIEW */}
      <section id="tracks" className="py-16 md:py-20 bg-[#f2f4f7] dark:bg-[#121212] border-b border-[#e2e4e8] dark:border-[#2d2d2d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
              Curated Curriculum
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Explore 10 Algorithmic Tracks
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 mt-3 text-sm sm:text-base font-normal">
              102 verified challenges systematically categorized with multi-stage constraints.
            </p>
          </div>

          {/* Track Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {Object.keys(tracks).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTrack(key)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTrack === key
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'bg-white text-slate-700 border border-[#e2e4e8] hover:bg-slate-50 dark:bg-[#1e1e1e] dark:text-zinc-300 dark:border-[#2d2d2d] dark:hover:bg-[#252525]'
                }`}
              >
                {tracks[key].title}
              </button>
            ))}
          </div>

          {/* Selected Track Details & Sample Problems */}
          <div className="max-w-4xl mx-auto bg-white dark:bg-[#1a1a1a] rounded-2xl border border-[#e2e4e8] dark:border-[#2d2d2d] p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#e2e4e8] dark:border-[#2d2d2d] gap-2">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {tracks[activeTrack].title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
                  {tracks[activeTrack].desc}
                </p>
              </div>
              <span className="self-start sm:self-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold font-mono border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800">
                {tracks[activeTrack].count}
              </span>
            </div>

            {/* Sample Problems Grid */}
            <div className="divide-y divide-[#e2e4e8] dark:divide-[#2d2d2d] mt-2">
              {tracks[activeTrack].examples.map((prob, idx) => (
                <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {prob.title}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        prob.difficulty === 'Easy' 
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50'
                          : prob.difficulty === 'Medium'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50'
                      }`}>
                        {prob.difficulty}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                      <span className="text-slate-400 dark:text-zinc-500">Stage Arc:</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{prob.stages}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('problems')}
                    className="self-start sm:self-center px-4 py-2 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-semibold transition-all border border-slate-200 dark:bg-[#252525] dark:text-zinc-200 dark:border-[#333333] dark:hover:bg-blue-600 dark:hover:text-white flex items-center gap-1.5"
                  >
                    View Problem
                    <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Catalog Button */}
            <div className="pt-5 mt-3 border-t border-[#e2e4e8] dark:border-[#2d2d2d] text-center">
              <button
                onClick={() => onNavigate('problems')}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                Browse all 102 problems in catalog →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 6. HOW IT WORKS: THE OPTIMIZATION LIFECYCLE */}
      <section id="how-it-works" className="py-16 md:py-20 bg-[#f8f9fa] dark:bg-[#141414] border-b border-[#e2e4e8] dark:border-[#2d2d2d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
              The Learning Flow
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              The 4-Step Optimization Lifecycle
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 mt-3 text-sm sm:text-base font-normal">
              How Algomind turns coding practice from rote memorization into structured engineering refinement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lifecycleSteps.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-[#1e1e1e] border border-[#e2e4e8] dark:border-[#2d2d2d] shadow-xs relative space-y-3 flex flex-col justify-between group hover:border-slate-300 dark:hover:border-[#383838] transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#f0f2f5] dark:bg-[#252525] border border-[#e0e2e6] dark:border-[#333333] text-xs font-extrabold text-blue-700 dark:text-blue-400 font-mono">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-slate-400 dark:text-zinc-500">
                      {item.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-zinc-400 text-xs leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 text-right">
                  <span className="text-slate-200 dark:text-[#2d2d2d] font-mono text-2xl font-black select-none">
                    0{idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION BANNER */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#f2f4f7] to-white dark:from-[#121212] dark:to-[#181818] border-b border-[#e2e4e8] dark:border-[#2d2d2d] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60 shadow-xs">
            <Flame size={14} className="text-amber-500" />
            Build Your Daily Algorithmic Streak
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Ready to Experience Multi-Stage Algorithmic Mastery?
          </h2>
          
          <p className="text-slate-600 dark:text-zinc-300 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
            Join developers and competitive programmers upgrading their problem-solving intuition through progressive complexity drills and live AST telemetry.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-3.5">
            <button
              onClick={() => onNavigate('signup')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Get Started Free
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNavigate('problems')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-all border border-[#d5d9de] shadow-xs flex items-center justify-center gap-2 dark:bg-[#1e1e1e] dark:hover:bg-[#282828] dark:text-zinc-200 dark:border-[#2d2d2d]"
            >
              <Code2 size={16} />
              Browse Problems Without Account
            </button>
          </div>

        </div>
      </section>

      {/* 8. FOOTER WITH BRAND LOGOS (LIGHT & DARK) */}
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
              <button onClick={() => onNavigate('problems')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Problem Catalog
              </button>
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
              &copy; {new Date().getFullYear()} Algomind Inc. All rights reserved. Built for algorithmic rigor.
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
