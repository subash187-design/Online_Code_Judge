import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Lock,
  Code2, 
  CheckCircle2,
  TrendingUp, 
  Server,
  Binary,
  Sliders,
  Check,
  Flame,
  ShieldCheck,
  Clock,
  Terminal,
  Activity
} from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  // Interactive Simulation State: 'stage1' (Brute Force) | 'stage2' (Optimized) | 'stage3' (Optimal Force)
  const [activeStage, setActiveStage] = useState('stage1');

  // Stages Data for the Interactive Brute-to-Optimal Journey Simulator
  const stageData = {
    stage1: {
      name: "Stage 1: Brute Force",
      bigO: "O(N²) Time · O(1) Space",
      badge: "Functional Baseline",
      badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800",
      verdict: "Accepted (Stage 1)",
      verdictColor: "text-amber-600 dark:text-amber-400",
      executionTime: "412.5 ms (Scale Failure at N > 10⁵)",
      astDepth: "2 (Nested Loops Detected)",
      astContainer: "None (Direct Array Indexing)",
      hint: "Your logic correctly finds pairs, proving you understand the problem requirements. However, the inner loop re-scans the entire array for every single element, performing redundant comparisons. Can we store seen elements to eliminate the inner scan?",
      code: `// Stage 1: Intuitive Brute-Force (Nested Loops)
// Correctness: 100% | Time Complexity: O(N²)
vector<int> twoSum(vector<int>& nums, int target) {
    int n = nums.size();
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] == target) {
                return {i, j}; // Redundant comparisons
            }
        }
    }
    return {};
}`
    },
    stage2: {
      name: "Stage 2: Intermediate Sort",
      bigO: "O(N log N) Time · O(1) Space",
      badge: "Search Space Pruned",
      badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300 dark:border-blue-800",
      verdict: "Accepted (Stage 2)",
      verdictColor: "text-blue-600 dark:text-blue-400",
      executionTime: "18.4 ms (22x Latency Reduction)",
      astDepth: "1 + QuickSort (Log-Linear Bound)",
      astContainer: "std::pair Vector Allocation",
      hint: "By sorting and applying two inward pointers, you eliminated the quadratic bottleneck! However, sorting costs O(N log N) time and disturbs original indices. Can we achieve direct linear O(N) by trading a small amount of memory for constant-time lookups?",
      code: `// Stage 2: Inward Convergence (Two Pointers)
// Correctness: 100% | Time Complexity: O(N log N)
vector<int> twoSum(vector<int>& nums, int target) {
    vector<pair<int, int>> indexed;
    for (int i = 0; i < nums.size(); i++) indexed.push_back({nums[i], i});
    sort(indexed.begin(), indexed.end()); // O(N log N)
    
    int left = 0, right = indexed.size() - 1;
    while (left < right) {
        int sum = indexed[left].first + indexed[right].first;
        if (sum == target) return {indexed[left].second, indexed[right].second};
        if (sum < target) left++; else right--;
    }
    return {};
}`
    },
    stage3: {
      name: "Stage 3: Optimal Force",
      bigO: "O(N) Time · O(N) Space",
      badge: "Asymptotic Mastery",
      badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
      verdict: "⚡ Optimal Mastered",
      verdictColor: "text-emerald-600 dark:text-emerald-400",
      executionTime: "1.8 ms (230x Acceleration · Sub-millisecond)",
      astDepth: "1 (Single-Pass Linear)",
      astContainer: "unordered_map<int, int> (O(1) Avg)",
      hint: "Perfection! By leveraging a hash map, you traded O(N) space for constant-time complement lookups. In a single linear pass, every element checks if its target complement has been encountered. Zero redundant comparisons, optimal production-grade code.",
      code: `// Stage 3: Optimal Single-Pass Hash Lookup
// Correctness: 100% | Time Complexity: O(N) Optimal
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen; // O(1) amortized
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.count(complement)) {
            return {seen[complement], i}; // Instant match
        }
        seen[nums[i]] = i;
    }
    return {};
}`
    }
  };

  const currentSimulation = stageData[activeStage];

  // Core Pillars on Why Brute to Optimal Matters
  const corePillars = [
    {
      icon: <CheckCircle2 size={24} className="text-emerald-500 shrink-0" />,
      title: "1. Correctness Before Premature Optimization",
      desc: "Premature optimization is the root of algorithmic failure. In real engineering and competitive interviews, an un-working 'optimal' guess scores zero. Writing an intuitive brute-force solution guarantees complete understanding of the problem's boundary constraints, edge cases, and invariant logic first."
    },
    {
      icon: <Cpu size={24} className="text-blue-500 shrink-0" />,
      title: "2. Pinpointing the Real Computational Bottleneck",
      desc: "You cannot optimize what you do not diagnose. Brute-force code visibly exposes redundant computation: repeated nested loop traversals, duplicate subproblem evaluations, or unnecessary allocations. Once the bottleneck is identified, the path to optimization becomes obvious."
    },
    {
      icon: <Layers size={24} className="text-indigo-500 shrink-0" />,
      title: "3. Mastering Intentional Space-Time Trade-offs",
      desc: "Real-world engineering is governed by trade-offs. Moving to optimal force is the art of strategic resource substitution: trading auxiliary memory (Hash Tables, DP Caches) for time acceleration, or enforcing order (Sorting, Two Pointers) to prune vast search spaces."
    },
    {
      icon: <Flame size={24} className="text-rose-500 shrink-0" />,
      title: "4. Developing True Algorithmic Resilience",
      desc: "Candidates who rely on memorized optimal code freeze when faced with unfamiliar problem variants. Engineers who master the systematic progression from brute force to optimal force can reliably decompose and solve any unseen algorithmic challenge under pressure."
    }
  ];

  // Platform Capabilities
  const platformFeatures = [
    {
      icon: <Layers size={20} className="text-blue-500" />,
      title: "Multi-Stage Solution Drills",
      desc: "No cold Time Limit Exceeded rejections. Algomind accepts your working logic in Stage 1, then unlocks Stages 2 & 3 with scaled constraints."
    },
    {
      icon: <Cpu size={20} className="text-indigo-500" />,
      title: "Static AST Syntax Analyzer",
      desc: "Our engine parses the Abstract Syntax Tree of your code, calculating loop depths, container dimensions, and Big-O bounds before runtime tests complete."
    },
    {
      icon: <Sparkles size={20} className="text-amber-500" />,
      title: "Tiered Socratic AI Guidance",
      desc: "Never copy paste spoilers. Our AI mentor inspects your code's syntax bottlenecks and nudges your intuition with targeted, mathematical hints."
    },
    {
      icon: <Server size={20} className="text-emerald-500" />,
      title: "Multi-Language Docker Sandbox",
      desc: "Compile and execute C, C++, Java 17, and Python 3 inside hardened Linux Docker containers with microsecond telemetry and isolated cgroups."
    }
  ];

  return (
    <div className="flex flex-col min-h-full bg-[#f4f6f8] text-slate-800 dark:bg-[#111111] dark:text-zinc-100 transition-colors duration-200">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#e2e4e8] dark:border-[#222222]">
        {/* Ambient Gradient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-b from-blue-500/15 via-indigo-500/5 to-transparent dark:from-blue-600/20 dark:via-indigo-600/5 dark:to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#1a1a1a] text-xs font-semibold text-slate-700 dark:text-zinc-300 border border-[#d5d9de] dark:border-[#333333] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              <span>Next-Generation Online Code Judge</span>
              <span className="text-slate-300 dark:text-zinc-600">•</span>
              <span className="text-blue-600 dark:text-blue-400 font-mono">AST Telemetry & Socratic AI</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.14]">
              Don't Just Memorize Code. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 dark:from-blue-400 dark:via-indigo-300 dark:to-blue-400">
                Master the Leap from Brute Force to Optimal Force.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed font-normal">
              Traditional code platforms reject your intuitive initial solution with an unhelpful <span className="font-mono text-rose-500 font-semibold bg-rose-50 dark:bg-rose-950/40 px-1 py-0.5 rounded border border-rose-200 dark:border-rose-900/50">Time Limit Exceeded</span>. 
              <strong> Algomind</strong> coaches you through the actual engineering lifecycle — verifying functional correctness in Stage 1, analyzing computational bottlenecks with our static AST parser, and guiding you to optimal Big-O with Socratic AI hints.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
              <button
                onClick={() => onNavigate('signup')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
              >
                Start Coding Free
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('signin')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-all border border-[#d5d9de] shadow-xs flex items-center justify-center gap-2 dark:bg-[#1e1e1e] dark:hover:bg-[#282828] dark:text-zinc-200 dark:border-[#333333] cursor-pointer"
              >
                <Lock size={15} className="text-slate-500 dark:text-zinc-400" />
                Sign In to Judge
              </button>
            </div>

            {/* Multi-language Support Badges */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400">
              <span className="font-sans font-medium text-slate-400 dark:text-zinc-500">Supported Sandboxes:</span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1a1a1a] border border-[#e2e4e8] dark:border-[#2d2d2d] text-slate-700 dark:text-zinc-300 font-semibold">C</span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1a1a1a] border border-[#e2e4e8] dark:border-[#2d2d2d] text-slate-700 dark:text-zinc-300 font-semibold">C++20</span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1a1a1a] border border-[#e2e4e8] dark:border-[#2d2d2d] text-slate-700 dark:text-zinc-300 font-semibold">Java 17</span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1a1a1a] border border-[#e2e4e8] dark:border-[#2d2d2d] text-slate-700 dark:text-zinc-300 font-semibold">Python 3</span>
            </div>

          </div>

        </div>
      </section>

      {/* 2. THE CORE PHILOSOPHY: WHY BRUTE FORCE TO OPTIMAL FORCE IS IMPORTANT */}
      <section className="py-16 md:py-20 bg-white dark:bg-[#151515] border-b border-[#e2e4e8] dark:border-[#222222]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
              The Engineering Reality
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Why the Journey from Brute Force to Optimal Force is Essential
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base font-normal leading-relaxed">
              In technical interviews and real software systems, jumping straight to an optimal solution is often a trap. The true mark of senior engineering capability is the ability to establish functional correctness, analyze computational bottlenecks, and systematically refactor toward asymptotic efficiency.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {corePillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e4e8] dark:border-[#262626] hover:border-slate-300 dark:hover:border-[#383838] shadow-xs transition-all space-y-3"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#222222] border border-[#dce0e5] dark:border-[#333333] flex items-center justify-center shadow-xs shrink-0">
                    {pillar.icon}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE SIMULATOR: LIVE EVOLUTION FROM BRUTE FORCE TO OPTIMAL FORCE */}
      <section className="py-16 md:py-20 bg-[#f4f6f8] dark:bg-[#111111] border-b border-[#e2e4e8] dark:border-[#222222]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
              Interactive Architecture Demo
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              See the Optimization Journey in Action
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base font-normal">
              Click through the 3 progressive stages below to witness how code, execution telemetry, and Socratic hints transform from an intuitive brute force into an optimal asymptotic bound.
            </p>
          </div>

          {/* Interactive Stage Selector Tabs */}
          <div className="max-w-2xl mx-auto mb-6 grid grid-cols-3 gap-2 bg-[#e4e7ec] dark:bg-[#1c1c1c] p-1.5 rounded-2xl border border-[#d2d6dc] dark:border-[#2b2b2b]">
            <button
              onClick={() => setActiveStage('stage1')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
                activeStage === 'stage1'
                  ? 'bg-white dark:bg-[#282828] text-amber-700 dark:text-amber-300 shadow-sm border border-amber-200/80 dark:border-amber-900/50'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              <span>1. Brute Force</span>
              <span className="text-[10px] font-mono opacity-80">O(N²) Quadratic</span>
            </button>

            <button
              onClick={() => setActiveStage('stage2')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
                activeStage === 'stage2'
                  ? 'bg-white dark:bg-[#282828] text-blue-700 dark:text-blue-300 shadow-sm border border-blue-200/80 dark:border-blue-900/50'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              <span>2. Intermediate</span>
              <span className="text-[10px] font-mono opacity-80">O(N log N) Sort</span>
            </button>

            <button
              onClick={() => setActiveStage('stage3')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
                activeStage === 'stage3'
                  ? 'bg-white dark:bg-[#282828] text-emerald-700 dark:text-emerald-300 shadow-sm border border-emerald-200/80 dark:border-emerald-900/50'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              <span>3. Optimal Force</span>
              <span className="text-[10px] font-mono opacity-80">⚡ O(N) Linear</span>
            </button>
          </div>

          {/* Simulator Visualizer Card */}
          <div className="rounded-2xl bg-white dark:bg-[#181818] border border-[#d5d9de] dark:border-[#2d2d2d] shadow-xl overflow-hidden">
            
            {/* Stage Info Header */}
            <div className="px-5 py-3.5 bg-[#eaedf0] dark:bg-[#121212] border-b border-[#dce0e5] dark:border-[#262626] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${currentSimulation.badgeColor}`}>
                  {currentSimulation.badge}
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-white">
                  {currentSimulation.name}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-slate-500 dark:text-zinc-400">Target Complexity:</span>
                <span className="font-bold text-slate-900 dark:text-white bg-white dark:bg-[#1e1e1e] px-2.5 py-1 rounded-md border border-[#e0e2e6] dark:border-[#333]">
                  {currentSimulation.bigO}
                </span>
              </div>
            </div>

            {/* Split Grid: Code + Telemetry & Socratic Guidance */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#e2e4e8] dark:divide-[#262626]">
              
              {/* Code Panel */}
              <div className="lg:col-span-7 p-4 bg-[#1e1e1e] text-zinc-100 font-mono text-xs overflow-x-auto flex flex-col justify-between">
                <div className="flex items-center justify-between text-zinc-400 text-[11px] pb-2.5 mb-2 border-b border-zinc-800">
                  <span className="flex items-center gap-1.5 font-sans">
                    <Code2 size={13} className="text-blue-400" />
                    TwoSum_Solution.cpp (C++20 GCC)
                  </span>
                  <span className="text-emerald-400 font-mono">{currentSimulation.verdict}</span>
                </div>
                
                <pre className="text-zinc-300 font-mono leading-relaxed py-2 overflow-x-auto">
                  <code>{currentSimulation.code}</code>
                </pre>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Isolated Linux Docker Container</span>
                  <span className="text-blue-400 font-semibold">Strict cgroup validation</span>
                </div>
              </div>

              {/* Telemetry & AI Mentor Panel */}
              <div className="lg:col-span-5 p-5 bg-[#f8f9fa] dark:bg-[#181818] flex flex-col justify-between space-y-4">
                
                <div className="space-y-4">
                  {/* AST Telemetry Box */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#202020] border border-[#e2e4e8] dark:border-[#2d2d2d] space-y-2.5 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-2">
                      <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Cpu size={14} className="text-blue-500" />
                        Static AST Parser Telemetry
                      </span>
                      <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                        VERIFIED
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[11px] font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-zinc-400">Loop Nesting Depth:</span>
                        <span className="font-bold text-slate-800 dark:text-zinc-200">{currentSimulation.astDepth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-zinc-400">Memory Allocation:</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">{currentSimulation.astContainer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-zinc-400">Benchmark Latency:</span>
                        <span className="font-bold text-slate-900 dark:text-white">{currentSimulation.executionTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Socratic AI Hint Box */}
                  <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/40 space-y-2 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-indigo-700 dark:text-indigo-400">
                      <Sparkles size={14} />
                      Socratic AI Algorithmic Guidance
                    </div>
                    <p className="text-[11px] text-slate-700 dark:text-zinc-300 leading-relaxed font-normal">
                      "{currentSimulation.hint}"
                    </p>
                  </div>
                </div>

                {/* Bottom Call to Action inside simulator */}
                <div className="pt-2 border-t border-[#e2e4e8] dark:border-[#262626] flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-zinc-400 font-mono text-[11px]">
                    100+ Progressive Challenges
                  </span>
                  <button
                    onClick={() => onNavigate('signup')}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>Practice Live</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. PLATFORM SUPERPOWERS: HOW ALGOMIND DELIVERS THIS EXPERIENCE */}
      <section className="py-16 md:py-20 bg-white dark:bg-[#151515] border-b border-[#e2e4e8] dark:border-[#222222]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
              Engineered For Algorithmic Mastery
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Platform Features Built Around the Optimization Lifecycle
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base font-normal">
              Every component in Algomind is architected to nurture intuition, isolate bottlenecks, and guide developers toward optimal asymptotic thinking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e4e8] dark:border-[#262626] flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-[#383838] transition-all shadow-xs group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#222222] border border-[#dce0e5] dark:border-[#333333] flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                    {feat.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#f4f6f8] to-white dark:from-[#111111] dark:to-[#161616] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60 shadow-xs">
            <Flame size={14} className="text-amber-500" />
            Build Real Algorithmic Muscle Memory
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Stop Guessing. Start Systematically Optimizing.
          </h2>
          
          <p className="text-slate-600 dark:text-zinc-300 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
            Create your account to unlock the full library of progressive multi-stage challenges, live Monaco code editor, AST syntax diagnostics, and Socratic hints.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-3.5">
            <button
              onClick={() => onNavigate('signup')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              Create Free Account
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNavigate('signin')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-all border border-[#d5d9de] shadow-xs flex items-center justify-center gap-2 dark:bg-[#1e1e1e] dark:hover:bg-[#282828] dark:text-zinc-200 dark:border-[#333333] cursor-pointer"
            >
              <Lock size={15} className="text-slate-500 dark:text-zinc-400" />
              Sign In to Your Workspace
            </button>
          </div>

          <p className="text-[11px] text-slate-400 dark:text-zinc-500">
            Free developer access • Instant registration • Complete privacy
          </p>

        </div>
      </section>

      {/* 6. CLEAN MINIMAL FOOTER */}
      <footer className="mt-auto bg-[#eaedf0] dark:bg-[#0c0c0c] py-8 text-center text-xs text-slate-500 dark:text-zinc-500 transition-colors border-t border-[#d8dbe0] dark:border-[#222222]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
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
                Multi-Stage Algorithmic Code Judge
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <button 
                onClick={() => onNavigate('signin')} 
                className="text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <span className="text-slate-300 dark:text-zinc-700">•</span>
              <button 
                onClick={() => onNavigate('signup')} 
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-semibold transition-colors cursor-pointer"
              >
                Create Account
              </button>
            </div>

          </div>

          <div className="pt-3 border-t border-[#d8dbe0] dark:border-[#1e1e1e] flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 dark:text-zinc-500 gap-2">
            <span>
              &copy; {new Date().getFullYear()} Algomind. All rights reserved.
            </span>
            <div className="flex items-center gap-3">
              <span>AST Static Heuristics Engine</span>
              <span>•</span>
              <span>Linux Docker Sandbox</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
