import React from 'react';
import { 
  ArrowRight 
} from 'lucide-react';

export default function LandingPage({ onNavigate }) {

  // 4 Steps for "Learn the Way You Solve Problems"
  const problemSolvingSteps = [
    {
      num: "01",
      title: "Start Simple",
      desc: "Begin with the most straightforward solution. Focus on understanding the problem before worrying about optimization."
    },
    {
      num: "02",
      title: "Understand Your Complexity",
      desc: "Algomind analyzes your submitted code and estimates its time and space complexity."
    },
    {
      num: "03",
      title: "Improve Step by Step",
      desc: "Once your solution works, move to the next stage and improve your approach instead of immediately looking at the answer."
    },
    {
      num: "04",
      title: "Reach Optimal",
      desc: "Complete the optimization journey and understand why the final approach is more efficient."
    }
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
        </div>
      </section>


      {/* 2. LEARN THE WAY YOU SOLVE PROBLEMS */}
      <section className="py-14 md:py-20 bg-[#f4f6f8] dark:bg-[#111111] border-b border-[#e2e4e8] dark:border-[#222222]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Learn the Way You Solve Problems
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
              A structured progression designed around genuine understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {problemSolvingSteps.map((step, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-[#181818] border border-[#e2e4e8] dark:border-[#262626] shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-[#383838] transition-all"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-200 dark:border-blue-900/60 inline-block">
                    Step {step.num}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

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
