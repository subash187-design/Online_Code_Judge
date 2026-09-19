import React from 'react';
import { Terminal, Shield, CheckCircle2, Code2, Server, Cpu } from 'lucide-react';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4 border border-blue-500/20">
          <Terminal size={32} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">About Algomind Code Judge</h1>
        <p className="text-slate-600 dark:text-zinc-400 text-base mt-2 max-w-xl mx-auto">
          An advanced, multi-phase competitive programming evaluation platform built for systematic algorithmic learning and safe code execution.
        </p>
      </div>

      <div className="space-y-8">
        <div className="p-6 rounded-2xl bg-white border border-[#e2e4e8] shadow-sm dark:bg-[#1e1e1e] dark:border-[#2d2d2d]">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <Cpu className="text-blue-600 dark:text-blue-400" size={20} />
            Architecture & Philosophy
          </h2>
          <p className="text-slate-700 dark:text-zinc-300 text-sm leading-relaxed mb-4">
            Most online judges test code with a binary result: Pass or Fail. Algomind is architected around the cognitive journey of algorithm optimization. Problems are divided into progressive stages—forcing learners to first establish working logic, then optimize time complexity, and finally pass memory and extreme boundary conditions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /> Docker Sandbox with cgroup isolation
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /> C++ GCC 12 container runner
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /> Static AST analysis & loop heuristics
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" /> Socratic AI mentoring & tiered hints
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#e2e4e8] shadow-sm dark:bg-[#1e1e1e] dark:border-[#2d2d2d]">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <Shield className="text-blue-600 dark:text-blue-400" size={20} />
            Security & Authentication
          </h2>
          <p className="text-slate-700 dark:text-zinc-300 text-sm leading-relaxed">
            Every user action is authenticated through cryptographically secure JSON Web Tokens with single-use SHA-256 email verification codes. Execution workloads run completely disconnected from the host network inside isolated Docker containers with non-root privileges.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={() => onNavigate('problems')}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-medium text-sm transition-colors shadow-md"
        >
          View Problem Catalog
        </button>
      </div>
    </div>
  );
}