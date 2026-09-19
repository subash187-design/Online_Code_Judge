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
  Terminal,
  CheckCircle2,
  Code2,
  Clock,
  TrendingUp,
  Award,
  Search,
  Check
} from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  const features = [
    {
      icon: <Layers size={22} />,
      title: "Interactive Problem Drills",
      desc: "Immersive scenario-based challenges covering progressive constraints (e.g. O(N²) to O(N log N) to O(N)). Build genuine muscle memory for optimal complexities."
    },
    {
      icon: <Cpu size={22} />,
      title: "AI Adaptive Learning",
      desc: "Our AI engine analyzes AST code structures, identifies recursion depths and nested bottlenecks, ensuring targeted recommendations for every attempt."
    },
    {
      icon: <Activity size={22} />,
      title: "Studio Dashboard",
      desc: "A unified command center for developers and educators. Assign challenges, track class or personal progress, identify bottlenecks, and inspect telemetry in one click."
    },
    {
      icon: <Sparkles size={22} />,
      title: "AI Socratic Mentor",
      desc: "Progressive tiered hints keep developers guided through algorithmic intuition without spoiling full solutions, analyzing your code AST in real time."
    },
    {
      icon: <Zap size={22} />,
      title: "AST Telemetry & Sandboxing",
      desc: "Deep-dive into syntax tree depth, nested loop heuristics, Linux Docker cgroup limits, execution timings, and memory quotas in an isolated sandbox."
    },
    {
      icon: <TrendingUp size={22} />,
      title: "Optimization Journey Analytics",
      desc: "Bird's-eye view across all attempts, execution time progression curves, memory footprint benchmarks, and side-by-side submission code diffs."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Register Your Account",
      desc: "Sign up in seconds. Configure your developer profile and launch your personalized algorithmic workspace."
    },
    {
      step: "02",
      title: "Browse Challenges",
      desc: "Explore our curated catalog of progressive multi-stage problems across dynamic programming, graphs, and trees."
    },
    {
      step: "03",
      title: "Students & Devs Practice",
      desc: "Complete interactive drills at your own pace. Clean code editor with isolated Linux Docker containment ensures tamper-proof evaluation."
    },
    {
      step: "04",
      title: "Assess & Score",
      desc: "Automated test suites evaluate correctness, edge cases, and measure precise execution metrics and memory footprints instantly."
    },
    {
      step: "05",
      title: "AI Recommendations",
      desc: "Our AI analyzes your AST syntax tree and generates tailored optimization paths to close algorithmic weaknesses efficiently."
    },
    {
      step: "06",
      title: "Track on Dashboard",
      desc: "Monitor your performance evolution in real time. Generate reports, compare benchmark diffs, and inspect telemetry."
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-[#121212] text-zinc-100 transition-colors duration-200">
      
      {/* 1. Hero Section (PDF Design) */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#2d2d2d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Tagline Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1e1e] text-xs font-semibold text-zinc-300 border border-[#2d2d2d] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Prepare Today, Safe Tomorrow
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                AI-Powered <br className="hidden sm:inline" />
                <span className="text-emerald-400">Algorithmic Preparedness</span> <br />
                Learning Platform
              </h1>

              {/* Subtitle Description */}
              <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed font-normal">
                Prepare developers for complex scale, progressive multi-stage constraints, and strict algorithmic boundaries through interactive simulations, AI-powered adaptive hints, and real-time AST telemetry.
              </p>

              {/* CTA Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
                <button
                  onClick={() => onNavigate('signup')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 group"
                >
                  Get started
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate('signin')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1e1e1e] hover:bg-[#282828] text-zinc-200 font-semibold text-sm transition-all border border-[#2d2d2d] shadow-sm flex items-center justify-center gap-2"
                >
                  <Lock size={15} />
                  Sign In to Practice
                </button>
              </div>
            </div>

            {/* Right Interactive Preview Card (From PDF) */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl bg-[#1e1e1e] border border-[#2d2d2d] p-6 shadow-xl relative z-10 space-y-5">
                
                {/* Card Top: Status Pills */}
                <div className="flex items-center justify-between border-b border-[#2d2d2d] pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Algomind AI Platform
                    </span>
                  </div>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 font-semibold border border-emerald-800/60">
                    Live Active
                  </span>
                </div>

                {/* Floating Interactive Badge Tags (from PDF) */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-2xl bg-[#141414] border border-[#2d2d2d]">
                    <div className="text-[11px] text-zinc-400 font-medium">Complexity Drill</div>
                    <div className="text-xs font-bold text-emerald-400 mt-0.5">O(N) Optimal</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#141414] border border-[#2d2d2d]">
                    <div className="text-[11px] text-zinc-400 font-medium">Static AST</div>
                    <div className="text-xs font-bold text-white mt-0.5">Heuristics Active</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#141414] border border-[#2d2d2d]">
                    <div className="text-[11px] text-zinc-400 font-medium">Linux Sandbox</div>
                    <div className="text-xs font-bold text-white mt-0.5">Docker Isolated</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#141414] border border-[#2d2d2d]">
                    <div className="text-[11px] text-zinc-400 font-medium">AI Feedback</div>
                    <div className="text-xs font-bold text-emerald-400 mt-0.5">Socratic Hints</div>
                  </div>
                </div>

                {/* Preparedness / Score Gauge (from PDF Donut Gauge) */}
                <div className="p-4 rounded-2xl bg-[#141414] border border-[#2d2d2d] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">Preparedness Score</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">Algorithmic readiness metric</div>
                    <div className="text-2xl font-extrabold text-emerald-400 mt-1">86%</div>
                  </div>

                  {/* Donut SVG Meter */}
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-[#2d2d2d]"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-emerald-500"
                        strokeDasharray="86, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-[11px] font-bold text-white">86%</span>
                  </div>
                </div>

                {/* Quick Status Sub-bar */}
                <div className="pt-2 flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Check size={14} className="text-emerald-400" />
                    Docker Sandbox Verified
                  </span>
                  <span className="font-semibold text-zinc-200">6 Phases Active</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Platform Features Section (From PDF) */}
      <section id="features" className="py-20 bg-[#121212] border-b border-[#2d2d2d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Platform Features
            </h2>
            <p className="text-zinc-400 mt-3 text-base sm:text-lg font-normal">
              From individual student drills to district-wide and system-wide AST telemetry analytics.
            </p>
          </div>

          {/* 6 Feature Cards Grid (3x2 layout as in PDF) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] hover:border-[#3d3d3d] hover:bg-[#222222] transition-all shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#181818] text-emerald-400 flex items-center justify-center mb-5 border border-[#2d2d2d] shadow-sm group-hover:scale-105 transition-transform">
                    {feat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. How It Works Section (01 - 06 Steps layout from PDF) */}
      <section id="how-it-works" className="py-20 bg-[#141414] border-b border-[#2d2d2d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How It Works
            </h2>
            <p className="text-zinc-400 mt-3 text-base sm:text-lg font-normal">
              A streamlined, comprehensive pathway to progressive algorithmic mastery.
            </p>
          </div>

          {/* Steps Grid: 6 Steps (3 columns x 2 rows) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] shadow-sm relative space-y-3"
              >
                {/* Step Number Badge */}
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#181818] border border-[#2d2d2d] text-xs font-extrabold text-emerald-400 font-mono">
                  {item.step}
                </div>
                
                <h3 className="text-base font-bold text-white">
                  {item.title}
                </h3>
                
                <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Bottom Call to Action Banner */}
      <section className="py-16 bg-[#121212] border-b border-[#2d2d2d] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Prepare Today, Safe Tomorrow
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl mx-auto font-normal">
            Join developers and educators mastering algorithmic complexities and telemetry analytics.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => onNavigate('signup')}
              className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-sm flex items-center gap-2"
            >
              Get started →
            </button>
          </div>
        </div>
      </section>

      {/* 5. Clean Footer */}
      <footer id="about" className="mt-auto bg-[#0e0e0e] py-8 text-center text-xs text-zinc-500 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-auto flex items-center">
              <img src="/logo.png" alt="Algomind Logo" className="h-full w-auto object-contain brightness-110" />
            </div>
            <span className="font-semibold text-white">Online Code Judge</span>
            <span>&copy; {new Date().getFullYear()} Algomind Inc.</span>
          </div>
          <div className="flex gap-6 font-medium text-zinc-400">
            <button onClick={() => onNavigate('signin')} className="hover:text-white transition-colors">Login</button>
            <button onClick={() => onNavigate('signup')} className="hover:text-white transition-colors">Get started</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
