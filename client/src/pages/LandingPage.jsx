import React from 'react';
import { 
  Layers, 
  Cpu, 
  Sparkles, 
  Activity, 
  ShieldAlert, 
  ArrowRight, 
  Zap, 
  ChevronRight,
  Lock,
  Terminal
} from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  const features = [
    {
      icon: <Layers className="text-brand-600 dark:text-brand-400" size={24} />,
      bg: "bg-brand-50 border-brand-200/70 dark:bg-brand-950/40 dark:border-brand-900/50",
      title: "Progressive Multi-Stage Problems",
      desc: "Problems evolve across increasing constraints (e.g. O(N²) to O(N log N) to O(N)). Unlock stages through optimal algorithmic complexity and strict scale boundaries."
    },
    {
      icon: <Cpu className="text-brand-600 dark:text-brand-400" size={24} />,
      bg: "bg-brand-50 border-brand-200/70 dark:bg-brand-950/40 dark:border-brand-900/50",
      title: "AST & Static Complexity Analysis",
      desc: "Automated Abstract Syntax Tree parsing and heuristic profilers that detect recursion depths, nested loops, and memory space allocations before compilation."
    },
    {
      icon: <Sparkles className="text-purple-600 dark:text-purple-400" size={24} />,
      bg: "bg-purple-50 border-purple-200/70 dark:bg-purple-950/40 dark:border-purple-900/50",
      title: "AI Interactive Mentor",
      desc: "Tiered Socratic assistance. Request hints ranging from gentle algorithmic direction to structural pseudocode and bottleneck diagnostics without spoiling the solution."
    },
    {
      icon: <Activity className="text-blue-600 dark:text-blue-400" size={24} />,
      bg: "bg-blue-50 border-blue-200/70 dark:bg-blue-950/40 dark:border-blue-900/50",
      title: "Optimization Journey Analytics",
      desc: "Interactive visual dashboard showing your execution time progression, memory footprint curves, and side-by-side submission diffs across attempts."
    },
    {
      icon: <ShieldAlert className="text-brand-600 dark:text-brand-400" size={24} />,
      bg: "bg-brand-50 border-brand-200/70 dark:bg-brand-950/40 dark:border-brand-900/50",
      title: "Adversarial Stress Testing",
      desc: "Automatic randomized corner-case generators with dual-reference verification comparing naive vs optimal logic to catch subtle edge cases."
    },
    {
      icon: <Zap className="text-amber-500" size={24} />,
      bg: "bg-amber-50 border-amber-200/70 dark:bg-amber-950/40 dark:border-amber-900/50",
      title: "Isolated Container Sandbox",
      desc: "Direct Linux Docker containment with strict cgroup limits (time limit enforcement, memory quotas, disabled network sockets) for tamper-proof C++ evaluation."
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-20 md:pb-28 border-b border-slate-200/80 dark:border-zinc-800/80">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-500/15 via-purple-500/10 to-transparent blur-[120px] pointer-events-none -z-0" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          {/* Clean Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black dark:text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Master Algorithmic Optimization with{' '}
            <span className="text-black dark:text-white font-extrabold underline decoration-slate-300 dark:decoration-zinc-700">
              Intelligent Guidance
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
            More than just an online judge. Experience progressive complexity stages, real-time AST analysis, interactive AI mentoring, and stress test generators in an isolated sandbox.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => onNavigate('signup')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold text-base transition-all shadow-md hover:shadow-glow-brand flex items-center justify-center gap-2 group"
            >
              Get Started Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('signin')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-200 font-semibold text-base transition-all border border-slate-200 dark:border-zinc-800 shadow-soft-sm flex items-center justify-center gap-2"
            >
              <Lock size={16} className="text-slate-500 dark:text-zinc-400" />
              Sign In to Practice
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-14 pt-8 border-t border-slate-200 dark:border-zinc-800 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-left">
            <div className="p-3.5 bg-white dark:bg-zinc-900/90 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-soft-sm">
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">6 Phases</div>
              <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">Fully Integrated Engine</div>
            </div>
            <div className="p-3.5 bg-white dark:bg-zinc-900/90 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-soft-sm">
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">Isolated</div>
              <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">Linux Docker Sandbox</div>
            </div>
            <div className="p-3.5 bg-white dark:bg-zinc-900/90 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-soft-sm">
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">Automated</div>
              <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">AST Complexity Heuristics</div>
            </div>
            <div className="p-3.5 bg-white dark:bg-zinc-900/90 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-soft-sm">
              <div className="text-2xl font-bold text-black dark:text-white font-mono">AI-Powered</div>
              <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">Socratic Code Mentoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Capabilities Grid */}
      <section className="py-20 bg-slate-100/60 dark:bg-zinc-950/60 border-b border-slate-200/80 dark:border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Built for Deep Algorithmic Mastery
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 mt-3 text-base sm:text-lg">
              Traditional code judges only verify whether your code yields correct outputs. Algomind inspects how your solution computes and evolves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 hover:border-brand-300 dark:hover:border-brand-700/60 transition-all shadow-soft-sm hover:shadow-soft-md group relative"
              >
                <div className={`p-3 w-fit rounded-xl ${feat.bg} border mb-4 group-hover:scale-105 transition-transform shadow-soft-sm`}>
                  {feat.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{feat.title}</h3>
                <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="mt-auto border-t border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#030712] py-6 text-center text-xs text-slate-500 dark:text-zinc-400 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-auto flex items-center">
              <img src="/logo.png" alt="Algomind Logo" className="h-full w-auto object-contain dark:brightness-110" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-zinc-100">Online Code Judge</span>
            <span>&copy; {new Date().getFullYear()} Algomind Inc.</span>
          </div>
          <div className="flex gap-6 font-medium">
            <button onClick={() => onNavigate('signin')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Sign In</button>
            <button onClick={() => onNavigate('signup')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Sign Up</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
