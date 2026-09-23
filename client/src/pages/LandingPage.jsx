import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  Lock,
  Code2, 
  CheckCircle2,
  TrendingUp, 
  Server,
  Zap,
  Flame,
  Check
} from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      step: 1,
      name: "Brute Force",
      bigO: "O(N²)",
      tag: "Logic First",
      desc: "Nested loops confirm your functional logic and handle edge cases without premature optimization stress.",
      runtime: "420 ms",
      code: `// 1. Brute Force: Check every pair
for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
        if (nums[i] + nums[j] == target) return {i, j};
    }
}`
    },
    {
      step: 2,
      name: "Sort & Two Pointers",
      bigO: "O(N log N)",
      tag: "Prune Search",
      desc: "Sort the array and converge inward. You eliminate quadratic overhead, but sorting takes log-linear time.",
      runtime: "18 ms",
      code: `// 2. Sort & Converge: Inward pointers
sort(nums.begin(), nums.end());
int left = 0, right = n - 1;
while (left < right) {
    int s = nums[left] + nums[right];
    if (s == target) return {left, right};
    s < target ? left++ : right--;
}`
    },
    {
      step: 3,
      name: "Optimal Force",
      bigO: "O(N) ⚡",
      tag: "Peak Speed",
      desc: "Trade a tiny amount of memory for constant-time hash lookups. Zero wasted work, instant single pass.",
      runtime: "1.8 ms",
      code: `// 3. Optimal Force: Single-pass Hash Map
unordered_map<int, int> seen;
for (int i = 0; i < n; i++) {
    int complement = target - nums[i];
    if (seen.count(complement)) return {seen[complement], i};
    seen[nums[i]] = i;
}`
    }
  ];

  const current = steps.find(s => s.step === activeStep) || steps[0];

  return (
    <div className="flex flex-col min-h-full bg-[#f8f9fa] text-slate-800 dark:bg-[#121212] dark:text-zinc-100 transition-colors duration-200">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-14 md:pt-16 md:pb-20 border-b border-[#e2e4e8] dark:border-[#222222]">
        {/* Subtle Ambient Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent dark:from-blue-500/15 dark:via-indigo-500/5 dark:to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#1e1e1e] text-xs font-semibold text-slate-700 dark:text-zinc-300 border border-[#d5d9de] dark:border-[#333333] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span>AI-Guided Code Judge</span>
            <span className="text-slate-300 dark:text-zinc-600">•</span>
            <span className="text-blue-600 dark:text-blue-400 font-mono">Brute to Optimal</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Code your intuition first. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 dark:from-blue-400 dark:via-indigo-300 dark:to-blue-400">
              Master the leap to optimal code.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Traditional judges instantly fail brute-force with a cold <em>Time Limit Exceeded</em>. 
            <strong> Algomind</strong> validates your initial logic, identifies where computation is wasted, and guides you to optimal Big-O with Socratic AI hints.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
            <button
              onClick={() => onNavigate('signup')}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer group"
            >
              Get Started Free
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('signin')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm transition-all border border-[#d5d9de] shadow-xs flex items-center justify-center gap-2 dark:bg-[#1e1e1e] dark:hover:bg-[#262626] dark:text-zinc-200 dark:border-[#333333] cursor-pointer"
            >
              <Lock size={14} className="text-slate-500 dark:text-zinc-400" />
              Sign In
            </button>
          </div>

          {/* Supported Languages */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400">
            <span>Compilers:</span>
            <span className="font-semibold text-slate-700 dark:text-zinc-300">C</span>
            <span>•</span>
            <span className="font-semibold text-slate-700 dark:text-zinc-300">C++</span>
            <span>•</span>
            <span className="font-semibold text-slate-700 dark:text-zinc-300">Java</span>
            <span>•</span>
            <span className="font-semibold text-slate-700 dark:text-zinc-300">Python</span>
          </div>

        </div>
      </section>

      {/* 2. SWEET & SIMPLE: WHY BRUTE FORCE TO OPTIMAL MATTERS */}
      <section className="py-12 md:py-16 bg-white dark:bg-[#161616] border-b border-[#e2e4e8] dark:border-[#222222]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Why the Shift from Brute Force to Optimal Matters
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
              In real technical interviews and software systems, jumping straight to an optimal guess leads to bugs. Real engineering is a 3-step evolution:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Card 1 */}
            <div className="p-5 rounded-2xl bg-[#f8f9fa] dark:bg-[#1c1c1c] border border-[#e2e4e8] dark:border-[#2a2a2a] space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Correctness First
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                A working brute force proves you understand edge cases, bounds, and baseline requirements before complicating your logic.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-5 rounded-2xl bg-[#f8f9fa] dark:bg-[#1c1c1c] border border-[#e2e4e8] dark:border-[#2a2a2a] space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Isolate the Bottleneck
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                You cannot optimize what you cannot see. The brute-force reveals repeated inner loop scans or duplicate subproblems to eliminate.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-5 rounded-2xl bg-[#f8f9fa] dark:bg-[#1c1c1c] border border-[#e2e4e8] dark:border-[#2a2a2a] space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Smart Trade-offs
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                Trade auxiliary memory (Hash Maps, DP arrays) or enforce order (Sorting, Two Pointers) to achieve production-grade linear speed.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE EVOLUTION PREVIEW */}
      <section className="py-12 md:py-16 bg-[#f4f6f8] dark:bg-[#111111] border-b border-[#e2e4e8] dark:border-[#222222]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              The Evolution in Action
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
              Click a stage to see how code and complexity evolve:
            </p>
          </div>

          {/* Stage Tabs */}
          <div className="grid grid-cols-3 gap-2 bg-[#eaecee] dark:bg-[#1c1c1c] p-1.5 rounded-xl border border-[#d2d6dc] dark:border-[#2b2b2b] mb-4">
            {steps.map(s => (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                  activeStep === s.step
                    ? 'bg-white dark:bg-[#282828] text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
                }`}
              >
                <span>{s.step}. {s.name}</span>
                <span className="block text-[10px] font-mono font-normal opacity-75">{s.bigO}</span>
              </button>
            ))}
          </div>

          {/* Interactive Card */}
          <div className="rounded-2xl bg-white dark:bg-[#181818] border border-[#d5d9de] dark:border-[#2a2a2a] shadow-sm overflow-hidden">
            
            {/* Header */}
            <div className="px-4 py-2.5 bg-[#f0f2f5] dark:bg-[#141414] border-b border-[#e2e4e8] dark:border-[#262626] flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-slate-700 dark:text-zinc-300">
                {current.name} • <span className="text-blue-600 dark:text-blue-400 font-bold">{current.bigO}</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">
                Latency: {current.runtime}
              </span>
            </div>

            {/* Code */}
            <div className="p-4 bg-[#1e1e1e] text-zinc-100 font-mono text-xs overflow-x-auto">
              <pre className="text-zinc-300 leading-relaxed">
                <code>{current.code}</code>
              </pre>
            </div>

            {/* Insight */}
            <div className="p-4 bg-[#fafbfc] dark:bg-[#1a1a1a] border-t border-[#e2e4e8] dark:border-[#262626] text-xs space-y-1">
              <div className="font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-500" />
                <span>Engineering Takeaway</span>
              </div>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                {current.desc}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. THREE KEY FEATURES */}
      <section className="py-12 md:py-14 bg-white dark:bg-[#161616] border-b border-[#e2e4e8] dark:border-[#222222]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#f8f9fa] dark:bg-[#1c1c1c] border border-[#e2e4e8] dark:border-[#2a2a2a]">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shrink-0">
                <Layers size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Multi-Stage Scoring</h4>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed">
                  Earn credit for working logic in Stage 1, then scale to Stages 2 and 3.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#f8f9fa] dark:bg-[#1c1c1c] border border-[#e2e4e8] dark:border-[#2a2a2a]">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 shrink-0">
                <Cpu size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Static AST Telemetry</h4>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed">
                  Analyzes loop nesting depths and theoretical Big-O directly from your syntax.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#f8f9fa] dark:bg-[#1c1c1c] border border-[#e2e4e8] dark:border-[#2a2a2a]">
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 shrink-0">
                <Sparkles size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Socratic AI Hints</h4>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed">
                  Tiered intuition nudges without spoiling or copying code.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. SWEET CALL TO ACTION */}
      <section className="py-12 md:py-16 text-center">
        <div className="max-w-xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Ready to upgrade your algorithmic practice?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
            Join Algomind in seconds. Practice with isolated compiler sandboxes, Monaco editor, and Socratic mentorship.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => onNavigate('signup')}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Create Free Account</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => onNavigate('signin')}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 dark:bg-[#1e1e1e] dark:hover:bg-[#282828] dark:text-zinc-300 font-semibold text-xs sm:text-sm border border-[#d5d9de] dark:border-[#333333] transition-all cursor-pointer"
            >
              Log In
            </button>
          </div>
        </div>
      </section>

      {/* 6. CLEAN FOOTER */}
      <footer className="mt-auto bg-[#eaedf0] dark:bg-[#0c0c0c] py-6 text-center text-xs text-slate-500 dark:text-zinc-500 border-t border-[#d8dbe0] dark:border-[#222222]">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <div className="flex items-center gap-2">
            <img 
              src="/logo-icon-light.png" 
              alt="Algomind" 
              className="h-5 w-auto object-contain dark:hidden" 
            />
            <img 
              src="/logo-icon-dark.png" 
              alt="Algomind" 
              className="h-5 w-auto object-contain hidden dark:block" 
            />
            <span className="font-semibold text-slate-700 dark:text-zinc-300">Algomind</span>
            <span>•</span>
            <span>Online Code Judge</span>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('signin')} className="hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer">
              Sign In
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('signup')} className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-semibold transition-colors cursor-pointer">
              Register Free
            </button>
          </div>

          <span>
            &copy; {new Date().getFullYear()} Algomind Inc.
          </span>
        </div>
      </footer>

    </div>
  );
}
