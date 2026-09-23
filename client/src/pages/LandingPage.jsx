import React from 'react';
import { 
  Cpu, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  // Flowchart steps for "What is Algomind?"
  const flowchartSteps = [
    "Problem",
    "Brute Force",
    "Analyze Complexity",
    "Improve Your Approach",
    "Better Solution",
    "Optimize",
    "Optimal Solution"
  ];

  return (
    <div className="flex flex-col min-h-full bg-[#f8f9fa] text-slate-800 dark:bg-[#121212] dark:text-zinc-100 transition-colors duration-200">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-14 pb-16 md:pt-20 md:pb-24 border-b border-[#e2e4e8] dark:border-[#222222]">
        {/* Subtle Ambient Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent dark:from-blue-600/15 dark:via-indigo-600/5 dark:to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#1e1e1e] text-xs font-semibold text-slate-700 dark:text-zinc-300 border border-[#d5d9de] dark:border-[#333333] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span className="font-bold">Think. Code. Improve.</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Master problem solving by improving your solution{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 dark:from-blue-400 dark:via-indigo-300 dark:to-blue-400">
              step by step.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Algomind is an AI-powered online code judge that takes you from{' '}
            <span className="font-semibold text-slate-900 dark:text-white">Brute Force → Better → Optimal</span>. 
            Write your solution, test it, understand its complexity, and use AI-powered guidance to improve your approach.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <button
              onClick={() => onNavigate('signup')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer group"
            >
              Start Coding
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('signup')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-all border border-[#d5d9de] shadow-xs flex items-center justify-center gap-2 dark:bg-[#1e1e1e] dark:hover:bg-[#262626] dark:text-zinc-200 dark:border-[#333333] cursor-pointer"
            >
              Explore Problems
            </button>
          </div>

          {/* Supported Languages */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400">
            <span>Supported:</span>
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

      {/* 2. WHAT IS ALGOMIND? */}
      <section className="py-14 md:py-20 bg-white dark:bg-[#161616] border-b border-[#e2e4e8] dark:border-[#222222]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              What is Algomind?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
              Most coding platforms tell you whether your solution is correct.
            </p>
            <p className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
              Algomind goes one step further.
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Instead of stopping when your code passes the test cases, Algomind helps you understand whether your solution can be improved and guides you toward a more efficient approach.
            </p>
          </div>

          {/* Visual Progression Diagram */}
          <div className="max-w-4xl mx-auto p-6 md:p-8 rounded-2xl bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[#e2e4e8] dark:border-[#2d2d2d] shadow-xs">
            <div className="text-center text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-6">
              The Optimization Pipeline
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {flowchartSteps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border shadow-xs transition-all ${
                    idx === 0 
                      ? 'bg-slate-200/80 text-slate-800 border-slate-300 dark:bg-[#262626] dark:text-zinc-200 dark:border-[#3a3a3a]' 
                      : idx === 1 
                        ? 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800'
                        : idx === 4
                          ? 'bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800'
                          : idx === flowchartSteps.length - 1
                            ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-sm'
                            : 'bg-white text-slate-700 border-[#d5d9de] dark:bg-[#222222] dark:text-zinc-300 dark:border-[#333333]'
                  }`}>
                    {step}
                  </div>
                  {idx < flowchartSteps.length - 1 && (
                    <span className="text-slate-400 dark:text-zinc-600 text-sm font-bold">
                      →
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. COMPLEXITY ANALYSIS */}
      <section className="py-14 md:py-20 bg-[#f4f6f8] dark:bg-[#111111] border-b border-[#e2e4e8] dark:border-[#222222]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200 dark:border-blue-900/60">
              <Cpu size={13} />
              <span>Static Syntax Parser</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Complexity Analysis
            </h2>
            
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-zinc-200">
              Know what your code is really doing.
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
              Algomind analyzes your code to estimate:
            </p>
          </div>

          {/* Complexity Elements Grid */}
          <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {[
              "Time Complexity",
              "Space Complexity",
              "Loop Complexity",
              "Nested Operations",
              "Algorithmic Patterns"
            ].map((item, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl bg-white dark:bg-[#1a1a1a] border border-[#e2e4e8] dark:border-[#2d2d2d] text-center shadow-xs flex flex-col items-center justify-center space-y-1.5"
              >
                <CheckCircle2 size={16} className="text-blue-500" />
                <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Compare your current complexity with the expected complexity of the stage and identify where optimization is needed.
          </p>

        </div>
      </section>

      {/* 4. FINAL CALL TO ACTION */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#f8f9fa] to-white dark:from-[#121212] dark:to-[#181818] text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Don't stop when your code passes.
          </h2>
          
          <p className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            Understand it. Improve it. Optimize it.
          </p>
          
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
            Start your journey with Algomind.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => onNavigate('signup')}
              className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer group"
            >
              <span>Start Coding</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. CLEAN FOOTER */}
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
