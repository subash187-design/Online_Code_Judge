import React, { useEffect, useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import VerdictBadge from '../components/VerdictBadge';
import ProgressTracker from '../components/ProgressTracker';
import StageFeedbackBanner from '../components/StageFeedbackModal';
import ComplexityCard from '../components/ComplexityCard';
import MentorPanel from '../components/MentorPanel';
import OptimizationJourney from '../components/analytics/OptimizationJourney';
import SubmissionDiffModal from '../components/analytics/SubmissionDiffModal';
import { Play, Send, Clock, Database, ChevronLeft, GitCompare } from 'lucide-react';
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
    try {
      setLoading(true);
      const [probRes, stagesRes] = await Promise.all([
        authFetch(`/api/v1/problems/${problemId}`),
        authFetch(`/api/v1/problems/${problemId}/stages?user_id=${effectiveUserId}`)
      ]);

      const probData = await probRes.json();
      setProblem(probData);
      if (probData.sample_test_cases && probData.sample_test_cases.length > 0) {
        setCustomInput(probData.sample_test_cases[0].input);
      }

      if (stagesRes.ok) {
        const sData = await stagesRes.json();
        setStagesData(sData);

        const currentActive = sData.stages.find(s => s.status === 'UNLOCKED') || sData.stages[0];
        if (currentActive) {
          setActiveStageId(currentActive.id);
        }
      }
    } catch (err) {
      console.error('Failed to load problem data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStageHistory = async (stageId) => {
    try {
      const res = await authFetch(`/api/v1/stages/${stageId}/submissions?user_id=${effectiveUserId}`);
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (err) {
      console.error('Failed to fetch stage history:', err);
    }
  };

  const fetchJourney = async () => {
    try {
      const res = await authFetch(`/api/v1/analytics/problems/${problemId}/journey?user_id=${effectiveUserId}`);
      if (res.ok) {
        const data = await res.json();
        setJourney(data);
      }
    } catch (err) {
      console.error('Failed to fetch journey:', err);
    }
  };

  const handleRunCode = async () => {
    setRunning(true);
    setActiveBottomTab('result');
    try {
      const res = await authFetch('/api/v1/judge/run', {
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
      setLatestVerdict(null);
    } catch (err) {
      setRunOutput({ verdict: 'RUNTIME_ERROR', stderr: err.message });
    } finally {
      setRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    if (!activeStageId) return;

    setSubmitting(true);
    setActiveBottomTab('result');
    setLatestVerdict({ verdict: 'PENDING' });
    setRunOutput(null);

    try {
      const res = await authFetch(`/api/v1/stages/${activeStageId}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: effectiveUserId,
          language: 'cpp',
          code
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setLatestVerdict({
          verdict: data.error === 'STAGE_LOCKED' ? 'RUNTIME_ERROR' : 'ERROR',
          compile_output: data.message || 'Stage submission rejected.'
        });
      } else {
        setLatestVerdict(data);

        if (data.verdict === 'ACCEPTED') {
          setStageFeedback({
            message: data.feedback_message,
            nextStageId: data.next_unlocked_stage_id
          });

          const reloadStages = await fetch(`/api/v1/problems/${problemId}/stages?user_id=1`);
          if (reloadStages.ok) {
            const updated = await reloadStages.json();
            setStagesData(updated);
          }
        }

        fetchStageHistory(activeStageId);
        fetchJourney();
      }
    } catch (err) {
      setLatestVerdict({ verdict: 'RUNTIME_ERROR', compile_output: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCompare = async (subAId, subBId) => {
    try {
      const res = await fetch(`/api/v1/analytics/compare?sub_a=${subAId}&sub_b=${subBId}&user_id=1`);
      if (res.ok) {
        const data = await res.json();
        setComparison(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const activeStage = stagesData?.stages?.find(s => s.id === activeStageId);
  const isStageLocked = activeStage?.status === 'LOCKED';

  if (loading) return <div className="p-8 text-center text-slate-500">Loading problem workspace...</div>;
  if (!problem) return <div className="p-8 text-center text-rose-400">Problem not found.</div>;

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-200">
      {/* Comparator Modal */}
      {comparison && (
        <SubmissionDiffModal comparison={comparison} onClose={() => setComparison(null)} />
      )}

      {/* Top Navbar */}
      <header className="h-14 border-b border-slate-800 px-4 flex items-center justify-between bg-slate-900/80">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-semibold text-white text-sm">
            #{problem.id}. {problem.title}
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800 font-medium">
            {problem.difficulty}
          </span>
          {activeStage && (
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800/80 font-mono font-medium">
              Target: {activeStage.name}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunCode}
            disabled={running || submitting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 disabled:opacity-50 transition-all"
          >
            <Play size={14} className="text-emerald-400" />
            {running ? 'Running...' : 'Run Custom'}
          </button>
          <button
            onClick={handleSubmitCode}
            disabled={running || submitting || isStageLocked}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-900/30 disabled:opacity-50 transition-all"
          >
            <Send size={14} />
            {submitting ? 'Evaluating...' : isStageLocked ? 'Stage Locked' : 'Submit Stage'}
          </button>
        </div>
      </header>

      {/* Two-Pane Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane */}
        <div className="w-1/2 border-r border-slate-800 p-6 overflow-y-auto space-y-5">
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
            <h2 className="text-lg font-bold text-white mb-2">{problem.title}</h2>
            <div className="flex gap-4 text-xs text-slate-400 pb-4 border-b border-slate-800 font-mono">
              <span className="flex items-center gap-1">
                <Clock size={13} /> {problem.time_limit_ms}ms
              </span>
              <span className="flex items-center gap-1">
                <Database size={13} /> {Math.round(problem.memory_limit_kb / 1024)}MB
              </span>
            </div>
          </div>

          {activeStage && (
            <div className="bg-slate-900/80 border border-blue-900/40 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-blue-400 font-mono">
                  Current Target Requirements
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  {activeStage.status}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white">{activeStage.name}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{activeStage.description}</p>
              <div className="flex gap-4 pt-2 text-[11px] font-mono text-slate-400 border-t border-slate-800/80">
                <span>Expected Time: <b className="text-blue-300">{activeStage.expected_time_complexity || 'O(1)'}</b></span>
                <span>Expected Space: <b className="text-blue-300">{activeStage.expected_space_complexity || 'O(1)'}</b></span>
              </div>
            </div>
          )}

          <div className="prose prose-invert text-slate-300 text-xs whitespace-pre-wrap leading-relaxed">
            {problem.description}
          </div>

          {problem.sample_test_cases && problem.sample_test_cases.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider text-slate-400">
                Sample Test Cases
              </h3>
              {problem.sample_test_cases.map((stc, idx) => (
                <div key={idx} className="bg-slate-900/70 border border-slate-800/80 rounded-lg p-3 text-xs font-mono">
                  <div className="mb-2">
                    <span className="text-slate-500 block mb-1">Input</span>
                    <pre className="text-slate-200 bg-slate-950 p-2 rounded">{stc.input}</pre>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Expected Output</span>
                    <pre className="text-slate-200 bg-slate-950 p-2 rounded">{stc.expected_output}</pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Pane */}
        <div className="w-1/2 flex flex-col overflow-hidden">
          <div className="flex-1 p-2 min-h-[350px]">
            <CodeEditor code={code} onChange={(v) => setCode(v || '')} />
          </div>

          {/* Bottom Tabs Drawer */}
          <div className="h-64 border-t border-slate-800 bg-slate-900/90 flex flex-col">
            <div className="flex border-b border-slate-800 px-3 pt-2 gap-2 text-xs font-semibold">
              <button
                onClick={() => setActiveBottomTab('result')}
                className={`pb-2 px-2 border-b-2 transition-colors ${
                  activeBottomTab === 'result' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Evaluation & Complexity
              </button>
              <button
                onClick={() => setActiveBottomTab('journey')}
                className={`pb-2 px-2 border-b-2 transition-colors ${
                  activeBottomTab === 'journey' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                📈 Optimization Journey
              </button>
              <button
                onClick={() => setActiveBottomTab('mentor')}
                className={`pb-2 px-2 border-b-2 transition-colors ${
                  activeBottomTab === 'mentor' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                💡 AI Mentor
              </button>
              <button
                onClick={() => setActiveBottomTab('custom')}
                className={`pb-2 px-2 border-b-2 transition-colors ${
                  activeBottomTab === 'custom' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Custom Input
              </button>
              <button
                onClick={() => setActiveBottomTab('history')}
                className={`pb-2 px-2 border-b-2 transition-colors ${
                  activeBottomTab === 'history' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Stage History ({history.length})
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
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
                <div className="p-3 h-full">
                  <textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Enter custom stdin here..."
                    className="w-full h-full bg-slate-950 text-slate-200 border border-slate-800 rounded p-2 resize-none focus:outline-none focus:border-blue-500 font-mono text-xs"
                  />
                </div>
              )}

              {/* Result Tab */}
              {activeBottomTab === 'result' && (
                <div className="p-3 text-xs font-mono">
                  {latestVerdict && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <VerdictBadge verdict={latestVerdict.verdict} />
                        {latestVerdict.execution_time_ms !== undefined && (
                          <span className="text-slate-400">Time: {latestVerdict.execution_time_ms}ms</span>
                        )}
                        {latestVerdict.memory_used_kb !== undefined && (
                          <span className="text-slate-400">Memory: {latestVerdict.memory_used_kb}KB</span>
                        )}
                      </div>

                      {latestVerdict.compile_output && (
                        <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-rose-300 whitespace-pre-wrap">
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
                        <span className="text-slate-400">Time: {runOutput.execution_time_ms}ms</span>
                        <span className="text-slate-400">Memory: {runOutput.memory_used_kb}KB</span>
                      </div>
                      {runOutput.stdout && (
                        <div>
                          <span className="text-slate-500 block mb-1">Standard Output</span>
                          <pre className="bg-slate-950 p-2 rounded text-slate-200">{runOutput.stdout}</pre>
                        </div>
                      )}
                      {runOutput.stderr && (
                        <div>
                          <span className="text-rose-400 block mb-1">Standard Error</span>
                          <pre className="bg-slate-950 p-2 rounded text-rose-300">{runOutput.stderr}</pre>
                        </div>
                      )}
                    </div>
                  )}

                  {!latestVerdict && !runOutput && (
                    <div className="text-slate-500 py-6 text-center">
                      Submit code to view evaluation results and algorithmic complexity profile.
                    </div>
                  )}
                </div>
              )}

              {/* History Tab */}
              {activeBottomTab === 'history' && (
                <div className="p-3 space-y-2 text-xs font-mono">
                  {history.map((h, idx) => (
                    <div
                      key={h.id}
                      className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800/80 hover:border-slate-700"
                    >
                      <div className="flex items-center gap-3">
                        <VerdictBadge verdict={h.verdict} />
                        <span className="text-slate-400">{h.execution_time_ms ?? 0}ms</span>
                        <span className="text-slate-400">{h.memory_used_kb ?? 0}KB</span>
                        {h.time_complexity && (
                          <span className="text-blue-400 font-bold">{h.time_complexity}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {idx < history.length - 1 && (
                          <button
                            onClick={() => handleCompare(history[idx + 1].id, h.id)}
                            className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px]"
                          >
                            <GitCompare size={11} /> Diff
                          </button>
                        )}
                        <span className="text-slate-500 text-[10px]">
                          {new Date(h.created_at).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  {history.length === 0 && (
                    <div className="text-slate-500 py-6 text-center">No submissions for this stage yet.</div>
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
