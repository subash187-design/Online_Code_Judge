import React from 'react';
import { 
  Terminal, 
  Layers, 
  Cpu, 
  Sparkles, 
  Activity, 
  ShieldAlert, 
  ArrowRight, 
  Code2, 
  Zap, 
  ChevronRight,
  Lock
} from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  const features = [
    {
      icon: <Layers className="text-blue-400" size={24} />,
      title: "Progressive Multi-Stage Problems",
      desc: "Problems evolve across increasing constraints (e.g. O(N²) to O(N log N) to O(N)). Unlocking stages requires optimal complexity and passing strict scale boundaries."
    },
    {
      icon: <Cpu className="text-purple-400" size={24} />,
      title: "AST & Static Complexity Analysis",
      desc: "Automated parsing of Abstract Syntax Trees and heuristic profilers that detect recursion depths, nested loops, and memory space allocations before compilation."
    },
    {
      icon: <Sparkles className="text-emerald-400" size={24} />,
      title: "AI Interactive Mentor",
      desc: "Tiered Socratic assistance. Request hints ranging from gentle algorithmic direction to structural pseudocode and bottleneck diagnostics without spoiling the solution."
    },
    {
      icon: <Activity className="text-amber-400" size={24} />,
      title: "Optimization Journey Analytics",
      desc: "Interactive visual dashboard showing your execution time progression, memory footprint curves, and side-by-side submission diffs across attempts."
    },
    {
      icon: <ShieldAlert className="text-rose-400" size={24} />,
      title: "Adversarial Stress Testing",
      desc: "Automatic randomized corner-case generators with dual-reference verification comparing naive vs optimal logic to catch subtle edge cases."
    },
    {
      icon: <Zap className="text-cyan-400" size={24} />,
      title: "Isolated Container Sandbox",
      desc: "Direct Linux Docker containment with strict cgroup limits (time limit enforcement, memory quotas, disabled network sockets) for tamper-proof C++ evaluation."
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/50 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Terminal size={14} />
            Next-Gen Competitive Programming
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Master Algorithmic Optimization with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">Intelligent Guidance</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            More than just an online judge. Experience progressive complexity stages, real-time AST analysis, interactive AI mentoring, and stress test generators in an isolated sandbox.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('signup')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 group"
            >
              Get Started Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('signin')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-base transition-all border border-slate-800 flex items-center justify-center gap-2"
            >
              <Lock size={16} className="text-blue-400" />
              Sign In to Practice
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-14 pt-8 border-t border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-left">
            <div>
              <div className="text-2xl font-bold text-white font-mono">6 Phases</div>
              <div className="text-xs text-slate-400 mt-0.5">Fully Integrated Engine</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400 font-mono">Isolated</div>
              <div className="text-xs text-slate-400 mt-0.5">Linux Docker Sandbox</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400 font-mono">Automated</div>
              <div className="text-xs text-slate-400 mt-0.5">AST Complexity Heuristics</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400 font-mono">AI-Powered</div>
              <div className="text-xs text-slate-400 mt-0.5">Socratic Code Mentoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Capabilities Grid */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white tracking-tight">Built for Deep Algorithmic Mastery</h2>
            <p className="text-slate-400 mt-3 text-base">
              Traditional code judges only verify whether your code yields correct outputs. Algomind inspects how your solution computes and evolves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all hover:shadow-xl hover:shadow-blue-500/5 group"
              >
                <div className="p-3 w-fit rounded-xl bg-slate-800/80 border border-slate-700/60 mb-4 group-hover:scale-105 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900/80 border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Ready to elevate your competitive programming skills?</h2>
          <p className="mt-3 text-slate-400 text-sm max-w-xl mx-auto">
            Create an account in seconds, verify your email, and tackle your first multi-stage challenge.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => onNavigate('signup')}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-600/20 flex items-center gap-2"
            >
              Sign Up Now
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => onNavigate('signin')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-sm transition-colors"
            >
              Already Registered? Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="mt-auto border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-blue-400" />
            <span className="font-semibold text-slate-300">Algomind Online Code Judge</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => onNavigate('signin')} className="hover:text-slate-300 transition-colors">Sign In</button>
            <button onClick={() => onNavigate('signup')} className="hover:text-slate-300 transition-colors">Sign Up</button>
          </div>
        </div>
      </footer>
    </div>
  );
}