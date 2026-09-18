import React, { useEffect, useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import VerdictBadge from '../components/VerdictBadge';
import ProgressTracker from '../components/ProgressTracker';
import StageFeedbackBanner from '../components/StageFeedbackModal';
import ComplexityCard from '../components/ComplexityCard';
import MentorPanel from '../components/MentorPanel';
import OptimizationJourney from '../components/analytics/OptimizationJourney';
import SubmissionDiffModal from '../components/analytics/SubmissionDiffModal';
import { Play, Send, Clock, Database, ChevronLeft, GitCompare, Sparkles, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DEFAULT_CPP_BOILERPLATE = `#include <iostream>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long a, b;
    if (cin >> a >> b) {
        cout << (a + b) << "\n";
    }

    return 0;
}
`;

export default function ProblemDetailPage({ problemId, onBack }) {
  const { user, authFetch } = useAuth();
  const effectiveUserId = user?.id || 1;

  const [problem, setProblem] = useState(null);
  const [stagesData, setStagesData] = useState(null);
  const [activeStageId, setActiveStageId] = useState(null);
  const [stageFeedback, setStageFeedback] = useState(null);

  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState(DEFAULT_CPP_BOILERPLATE);
  const [customInput, setCustomInput] = useState('');
  const [activeBottomTab, setActiveBottomTab] = useState('result'); // 'result' | 'journey' | 'mentor' | 'custom' | 'history'

  const [submitting, setSubmitting] = useState(false);
  const [running, setRunning] = useState(false);
  const [latestVerdict, setLatestVerdict] = useState(null);
  const [runOutput, setRunOutput] = useState(null);
  const [history, setHistory] = useState([]);
  const [journey, setJourney] = useState(null);
  const [comparison, setComparison] = useState(null);

  useEffect(() => {
    loadProblemAndStages();
  }, [problemId, effectiveUserId]);

  useEffect(() => {
    if (activeStageId) {
      fetchStageHistory(activeStageId);
      fetchJourney();
    }
  }, [activeStageId, effectiveUserId]);

  const loadProblemAndStages = async () => {
    setLoading(true);
    try {
      const [probRes, stagesRes] = await Promise.all([
        fetch(`/api/v1/problems/${problemId}`).then(r => r.json()),
        fetch(`/api/v1/problems/${problemId}/stages?user_id=${effectiveUserId}`).then(r => r.json())
      ]);

      setProblem(probRes);
      setStagesData(stagesRes);

      if (stagesRes && stagesRes.stages && stagesRes.stages.length > 0) {
        const activeOrUnlocked = stagesRes.stages.find(s => s.status === 'UNLOCKED') || stagesRes.stages[0];
        setActiveStageId(activeOrUnlocked.id);
      }
    } catch (err) {
      console.error('Failed to load problem context:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStageHistory = async (stageId) => {
    try {
      const res = await fetch(`/api/v1/stages/${stageId}/submissions?user_id=${effectiveUserId}`);
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (err) {
      console.error('Error loading history:', err);
    }
  };

  const fetchJourney = async () => {
    try {
      const res = await fetch(`/api/v1/analytics/problems/${problemId}/journey?user_id=${effectiveUserId}`);
      if (res.ok) {
        const data = await res.json();
        setJourney(data);
      }
    } catch (err) {
      console.error('Error loading journey:', err);
    }
  };

  const handleRunCode = async () => {
    setRunning(true);
    setRunOutput(null);
    setLatestVerdict(null);
    setActiveBottomTab('result');

    try {
      const res = await fetch('/api/v1/judge/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: 'cpp',
          code,
          custom_input: customInput,
          time_limit_ms: problem?.time_limit_ms || 1000,
          memory_limit_kb: problem?.memory_limit_kb || 262144
        })
      });

      const data = await res.json();
      setRunOutput(data);
    } catch (err) {
      setRunOutput({
        verdict: 'INTERNAL_ERROR',
        stderr: err.message,
        execution_time_ms: 0,
        memory_used_kb: 0
      });
    } finally {
      setRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    if (!activeStageId) return;

    setSubmitting(true);
    setLatestVerdict(null);
    setRunOutput(null);
    setActiveBottomTab('result');

    try {
      const res = await fetch(`/api/v1/stages/${activeStageId}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: effectiveUserId,
          language: 'cpp',
          code
        })
      });

      const data = await res.json();
      setLatestVerdict(data);

      if (data.verdict === 'ACCEPTED') {
        const updatedStages = await fetch(`/api/v1/problems/${problemId}/stages?user_id=${effectiveUserId}`).then(r => r.json());
        setStagesData(updatedStages);

        setStageFeedback({
          stage_status: data.stage_status,
          next_unlocked_stage_id: data.next_unlocked_stage_id,
          is_problem_solved: data.is_problem_solved,
          feedback_message: data.feedback_message
        });

        if (data.next_unlocked_stage_id) {
          setActiveStageId(data.next_unlocked_stage_id);
        }
      }

      fetchStageHistory(activeStageId);
      fetchJourney();
    } catch (err) {
      setLatestVerdict({
        verdict: 'INTERNAL_ERROR',
        compile_output: err.message
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCompare = async (subAId, subBId) => {
    try {
      const res = await fetch(`/api/v1/analytics/compare?sub_a=${subAId}&sub_b=${subBId}&user_id=${effectiveUserId}`);
      if (res.ok) {
        const data = await res.json();
        setComparison(data);
      }
    } catch (err) {
      console.error('Error fetching diff:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 dark:bg-[#030712] text-slate-500 dark:text-zinc-400 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping"></span>
          Loading algorithmic workspace...
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="p-8 text-center text-rose-500 bg-slate-50 dark:bg-[#030712]">
        Problem not found.
        <button onClick={onBack} className="block mx-auto mt-4 text-brand-600 dark:text-brand-400 underline">
          Return to problem list
        </button>
      </div>
    );
  }

  const activeStage = stagesData?.stages?.find(s => s.id === activeStageId);
  const isStageLocked = activeStage?.status === 'LOCKED';

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-zinc-100 transition-colors">
      
      {/* Diff Modal */}
      {comparison && (
        <SubmissionDiffModal
          comparison={comparison}
          onClose={() => setComparison(null)}
        />
      )}

      {/* Top Workspace Header */}
      <header className="h-14 border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-[#030712]/90 backdrop-blur px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            title="Back to problems"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-slate-900 dark:text-white">
              #{problem.id}. {problem.title}
            </h1>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
              problem.difficulty === 'EASY' 
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/50'
                : 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200/70 dark:border-amber-800/50'
            }`}>
              {problem.difficulty}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunCode}
            disabled={running || submitting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 text-xs font-semibold border border-slate-200 dark:border-zinc-700 disabled:opacity-50 transition-all shadow-soft-sm"
          >
            <Play size={14} className="text-emerald-500" />
            {running ? 'Running...' : 'Run Custom'}
          </button>
          <button
            onClick={handleSubmitCode}
            disabled={running || submitting || isStageLocked}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs font-semibold shadow-soft-sm hover:shadow-glow-brand disabled:opacity-50 transition-all"
          >
            <Send size={14} />
            {submitting ? 'Evaluating...' : isStageLocked ? 'Stage Locked' : 'Submit Stage'}
          </button>
        </div>
      </header>

      {/* Two-Pane Workspace Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Problem Specs & Target Pane */}
        <div className="w-full md:w-1/2 border-r border-slate-200/80 dark:border-zinc-800/80 p-6 overflow-y-auto space-y-5 bg-white/60 dark:bg-zinc-950/40">
          {stagesData && (
            <ProgressTracker
              stages={stagesData.stages}
              activeStageId={activeStageId}
              onSelectStage={(id) => setActiveStageId(id)}
              isProblemSolved={stagesData.is_solved}
            />
          )}

          <StageFeedbackBanner
            feedback={stageFeedback}
            onProceed={(nextId) => {
              setActiveStageId(nextId);
              setStageFeedback(null);
            }}
          />

          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{problem.title}</h2>
            <div className="flex gap-4 text-xs text-slate-500 dark:text-zinc-400 pb-4 border-b border-slate-200/80 dark:border-zinc-800/80 font-mono">
              <span className="flex items-center gap-1">
                <Clock size={13} /> {problem.time_limit_ms}ms
              </span>
              <span className="flex items-center gap-1">
                <Database size={13} /> {Math.round(problem.memory_limit_kb / 1024)}MB
              </span>
            </div>
          </div>

          {activeStage && (
            <div className="bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200/80 dark:border-brand-900/50 rounded-2xl p-4 space-y-2 shadow-soft-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold tracking-wider text-brand-600 dark:text-brand-400 font-mono flex items-center gap-1.5">
                  <Sparkles size={12} /> Target Stage Requirements
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 font-mono border border-slate-200 dark:border-zinc-800">
                  {activeStage.status}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{activeStage.name}</h4>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">{activeStage.description}</p>
              <div className="flex gap-4 pt-2 text-[11px] font-mono text-slate-500 dark:text-zinc-400 border-t border-brand-200/50 dark:border-brand-900/30">
                <span>Expected Time: <b className="text-brand-600 dark:text-brand-400">{activeStage.expected_time_complexity || 'O(1)'}</b></span>
                <span>Expected Space: <b className="text-brand-600 dark:text-brand-400">{activeStage.expected_space_complexity || 'O(1)'}</b></span>
              </div>
            </div>
          )}

          <div className="text-slate-700 dark:text-zinc-300 text-xs whitespace-pre-wrap leading-relaxed">
            {problem.description}
          </div>

          {problem.sample_test_cases && problem.sample_test_cases.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-slate-200/80 dark:border-zinc-800/80">
              <h3 className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                Sample Test Cases
              </h3>
              {problem.sample_test_cases.map((tc, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-zinc-900 p-3 rounded-xl border border-slate-200/80 dark:border-zinc-800 text-xs font-mono space-y-1.5 shadow-soft-sm">
                  <div>
                    <span className="text-slate-400 dark:text-zinc-500 block text-[10px] uppercase font-bold">Input</span>
                    <pre className="text-slate-800 dark:text-zinc-200 mt-0.5">{tc.input}</pre>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-zinc-500 block text-[10px] uppercase font-bold">Expected Output</span>
                    <pre className="text-emerald-600 dark:text-emerald-400 mt-0.5">{tc.expected_output}</pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Code Editor & Diagnostic Drawer Pane */}
        <div className="w-full md:w-1/2 flex flex-col overflow-hidden bg-slate-100/50 dark:bg-zinc-950/80">
          
          {/* Monaco Code Editor (Strict Syntax Colors Preserved) */}
          <div className="flex-1 p-3 overflow-hidden">
            <CodeEditor code={code} onChange={(newVal) => setCode(newVal)} />
          </div>

          {/* Diagnostic & AI Mentor Bottom Drawer */}
          <div className="h-64 border-t border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#0a0e1a] flex flex-col">
            
            {/* Drawer Tabs */}
            <div className="flex items-center gap-1 border-b border-slate-200/80 dark:border-zinc-800/80 px-4 pt-2 text-xs font-semibold bg-slate-50/70 dark:bg-zinc-900/40">
              <button
                onClick={() => setActiveBottomTab('result')}
                className={`pb-2 px-3 border-b-2 transition-all ${
                  activeBottomTab === 'result' ? 'border-brand-600 text-brand-600 dark:text-brand-400 font-bold' : 'border-transparent text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Evaluation & Complexity
              </button>
              <button
                onClick={() => setActiveBottomTab('journey')}
                className={`pb-2 px-3 border-b-2 transition-all ${
                  activeBottomTab === 'journey' ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 font-bold' : 'border-transparent text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Optimization Journey
              </button>
              <button
                onClick={() => setActiveBottomTab('mentor')}
                className={`pb-2 px-3 border-b-2 transition-all ${
                  activeBottomTab === 'mentor' ? 'border-purple-600 text-purple-600 dark:text-purple-400 font-bold' : 'border-transparent text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                💡 AI Mentor
              </button>
              <button
                onClick={() => setActiveBottomTab('custom')}
                className={`pb-2 px-3 border-b-2 transition-all ${
                  activeBottomTab === 'custom' ? 'border-brand-600 text-brand-600 dark:text-brand-400 font-bold' : 'border-transparent text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Custom Input
              </button>
              <button
                onClick={() => setActiveBottomTab('history')}
                className={`pb-2 px-3 border-b-2 transition-all ${
                  activeBottomTab === 'history' ? 'border-brand-600 text-brand-600 dark:text-brand-400 font-bold' : 'border-transparent text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                History ({history.length})
              </button>
            </div>

            {/* Drawer Tab Content */}
            <div className="flex-1 overflow-y-auto p-4">
              
              {/* Journey Tab */}
              {activeBottomTab === 'journey' && (
                <OptimizationJourney journey={journey} />
              )}

              {/* Mentor Tab */}
              {activeBottomTab === 'mentor' && (
                <MentorPanel
                  submissionId={latestVerdict?.submission_id || history[0]?.id}
                  stageId={activeStageId}
                />
              )}

              {/* Custom Input Tab */}
              {activeBottomTab === 'custom' && (
                <div className="h-full">
                  <textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Enter custom stdin here..."
                    className="w-full h-full bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-200 border border-slate-200 dark:border-zinc-800 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-mono text-xs shadow-soft-sm"
                  />
                </div>
              )}

              {/* Result Tab */}
              {activeBottomTab === 'result' && (
                <div className="text-xs font-mono">
                  {latestVerdict && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <VerdictBadge verdict={latestVerdict.verdict} />
                        {latestVerdict.execution_time_ms !== undefined && (
                          <span className="text-slate-600 dark:text-zinc-400">Time: {latestVerdict.execution_time_ms}ms</span>
                        )}
                        {latestVerdict.memory_used_kb !== undefined && (
                          <span className="text-slate-600 dark:text-zinc-400">Memory: {latestVerdict.memory_used_kb}KB</span>
                        )}
                      </div>

                      {latestVerdict.compile_output && (
                        <div className="bg-rose-50 dark:bg-rose-950/40 p-3 rounded-xl border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 whitespace-pre-wrap font-mono">
                          {latestVerdict.compile_output}
                        </div>
                      )}

                      {latestVerdict.analysis && (
                        <ComplexityCard analysis={latestVerdict.analysis} />
                      )}
                    </div>
                  )}

                  {!latestVerdict && runOutput && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <VerdictBadge verdict={runOutput.verdict} />
                        <span className="text-slate-600 dark:text-zinc-400">Time: {runOutput.execution_time_ms}ms</span>
                        <span className="text-slate-600 dark:text-zinc-400">Memory: {runOutput.memory_used_kb}KB</span>
                      </div>
                      {runOutput.stdout && (
                        <div>
                          <span className="text-slate-400 dark:text-zinc-500 block mb-1">Standard Output</span>
                          <pre className="bg-slate-50 dark:bg-zinc-950 p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 font-mono whitespace-pre-wrap">
                            {runOutput.stdout}
                          </pre>
                        </div>
                      )}
                      {runOutput.stderr && (
                        <div>
                          <span className="text-rose-500 block mb-1">Standard Error</span>
                          <pre className="bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-xl border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-mono whitespace-pre-wrap">
                            {runOutput.stderr}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}

                  {!latestVerdict && !runOutput && (
                    <div className="text-center py-8 text-slate-400 dark:text-zinc-500">
                      Run code with custom input or submit stage to view execution metrics.
                    </div>
                  )}
                </div>
              )}

              {/* History Tab */}
              {activeBottomTab === 'history' && (
                <div className="space-y-2">
                  {history.length === 0 ? (
                    <div className="text-center py-6 text-slate-400 dark:text-zinc-500 text-xs">
                      No submissions recorded for this stage yet.
                    </div>
                  ) : (
                    history.map((sub, idx) => (
                      <div
                        key={sub.id}
                        className="p-3 bg-slate-50 dark:bg-zinc-900 rounded-xl border border-slate-200/80 dark:border-zinc-800 flex items-center justify-between text-xs font-mono shadow-soft-sm"
                      >
                        <div className="flex items-center gap-3">
                          <VerdictBadge verdict={sub.verdict} />
                          <span className="text-slate-600 dark:text-zinc-400">
                            {sub.execution_time_ms !== null ? `${sub.execution_time_ms}ms` : '—'}
                          </span>
                          <span className="text-slate-400 dark:text-zinc-500">
                            {new Date(sub.created_at).toLocaleTimeString()}
                          </span>
                        </div>
                        {idx > 0 && (
                          <button
                            onClick={() => handleCompare(history[idx].id, history[0].id)}
                            className="px-2.5 py-1 rounded-lg bg-brand-50 dark:bg-brand-950/60 hover:bg-brand-100 text-brand-600 dark:text-brand-400 border border-brand-200/60 text-[11px] font-semibold flex items-center gap-1"
                          >
                            <GitCompare size={12} /> Diff with Latest
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
