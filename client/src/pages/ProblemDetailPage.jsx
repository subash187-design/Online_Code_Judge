import React, { useEffect, useState, useRef } from 'react';
import CodeEditor from '../components/CodeEditor';
import VerdictBadge from '../components/VerdictBadge';
import ProgressTracker from '../components/ProgressTracker';
import StageFeedbackBanner from '../components/StageFeedbackModal';
import ComplexityCard from '../components/ComplexityCard';
import MentorPanel from '../components/MentorPanel';
import OptimizationJourney from '../components/analytics/OptimizationJourney';
import SubmissionDiffModal from '../components/analytics/SubmissionDiffModal';
import { 
  Play, Send, Clock, Database, ChevronLeft, ChevronRight, GitCompare, Sparkles, Layers,
  AlertTriangle, ChevronDown, ChevronUp, GripVertical, GripHorizontal, Maximize2, Minimize2,
  FileText, Lightbulb, Tag, CheckSquare, Terminal, Sun, Moon, Lock, TrendingUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const DEFAULT_CPP_BOILERPLATE = `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Write your solution here

    return 0;
}
`;

function generateStarterBoilerplate(prob) {
  if (!prob) return DEFAULT_CPP_BOILERPLATE;
  
  if (prob.id === 1) {
    return `#include <iostream>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long a, b;
    if (cin >> a >> b) {
        // Write your solution for: ${prob.title}
        
    }

    return 0;
}
`;
  }

  if (prob.id === 2 || prob.topic === 'Strings') {
    return `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    string s;
    if (cin >> s) {
        // Write your solution for: ${prob.title}
        
    }

    return 0;
}
`;
  }

  if (prob.id === 3 || prob.title?.toLowerCase().includes('two sum')) {
    return `#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    long long target;
    // Input format: First line contains N and target
    if (cin >> n >> target) {
        vector<long long> nums(n);
        for (int i = 0; i < n; i++) {
            cin >> nums[i];
        }

        // Write your solution for: ${prob.title}
        
    }

    return 0;
}
`;
  }

  if (prob.topic === 'Arrays & Hashing' || prob.topic === 'Two Pointers & Sliding Window' || prob.topic === 'Binary Search') {
    return `#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (cin >> n) {
        vector<long long> nums(n);
        for (int i = 0; i < n; i++) {
            cin >> nums[i];
        }
        
        // Write your solution for: ${prob.title}
        
    }

    return 0;
}
`;
  }

  return `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Write your solution for: ${prob.title}

    return 0;
}
`;
}

export default function ProblemDetailPage({ problemId, onBack, onNavigateProblem }) {
  const { user, authFetch } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const effectiveUserId = user?.id || 1;

  const [problem, setProblem] = useState(null);
  const [stagesData, setStagesData] = useState(null);
  const [activeStageId, setActiveStageId] = useState(null);
  const [stageFeedback, setStageFeedback] = useState(null);

  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState(DEFAULT_CPP_BOILERPLATE);
  const [customInput, setCustomInput] = useState('');
  
  // Left Panel Tab: 'description' | 'stages' | 'solutions' | 'submissions'
  const [leftTab, setLeftTab] = useState('description');
  // Right Bottom Drawer Tab: 'testcase' | 'testresult' | 'stagefeedback' | 'journey'
  const [bottomTab, setBottomTab] = useState('testcase');

  const [submitting, setSubmitting] = useState(false);
  const [running, setRunning] = useState(false);
  const [latestVerdict, setLatestVerdict] = useState(null);
  const [runOutput, setRunOutput] = useState(null);
  const [history, setHistory] = useState([]);
  const [journey, setJourney] = useState(null);
  const [comparison, setComparison] = useState(null);

  // Workspace Resizing States
  const [leftWidth, setLeftWidth] = useState(46); // 46% width for problem pane
  const [drawerHeight, setDrawerHeight] = useState(160); // 160px default bottom drawer for spacious typing editor
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(false);
  const [isDraggingH, setIsDraggingH] = useState(false);
  const [isDraggingV, setIsDraggingV] = useState(false);
  
  const containerRef = useRef(null);
  const rightPaneRef = useRef(null);

  // Horizontal Dragging: Problem Pane <-> Editor Pane
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingH || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newPercent = ((e.clientX - rect.left) / rect.width) * 100;
      if (newPercent >= 15 && newPercent <= 85) {
        setLeftWidth(newPercent);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingH(false);
    };

    if (isDraggingH) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDraggingH]);

  // Vertical Dragging: Code Editor <-> Bottom Testcase Drawer
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingV) return;
      const container = rightPaneRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const newHeight = rect.bottom - e.clientY;
      const minHeight = 36;
      const maxHeight = Math.max(minHeight, rect.height - 70);
      const clamped = Math.min(Math.max(newHeight, minHeight), maxHeight);
      setDrawerHeight(clamped);
      if (clamped > 45 && isDrawerCollapsed) {
        setIsDrawerCollapsed(false);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingV(false);
    };

    if (isDraggingV) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDraggingV, isDrawerCollapsed]);

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
      setCode(generateStarterBoilerplate(probRes));

      if (probRes?.sample_test_cases && probRes.sample_test_cases.length > 0) {
        setCustomInput(probRes.sample_test_cases[0].input || '');
      }

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
    setBottomTab('testresult');
    if (isDrawerCollapsed) setIsDrawerCollapsed(false);

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
        stderr: err.message
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
    setBottomTab('testresult');
    if (isDrawerCollapsed) setIsDrawerCollapsed(false);

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
      <div className="flex h-screen items-center justify-center bg-[#f2f4f7] dark:bg-[#1a1a1a] text-slate-600 dark:text-zinc-400 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
          Loading algorithmic workspace...
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="p-8 text-center text-rose-500 bg-[#f2f4f7] dark:bg-[#1a1a1a] min-h-screen">
        Problem not found.
        <button onClick={onBack} className="block mx-auto mt-4 text-blue-600 dark:text-blue-400 underline">
          Return to problem list
        </button>
      </div>
    );
  }

  const activeStage = stagesData?.stages?.find(s => s.id === activeStageId);
  const isStageLocked = activeStage?.status === 'LOCKED';

  const renderFormattedDescription = (text) => {
    if (!text) return null;

    // Split into sections by markdown heading markers (### Input Format, ### Output Format, ### Constraints, etc.)
    const sections = text.split(/(?=(?:^|\n)###?\s+)/);

    return (
      <div className="space-y-4">
        {sections.map((section, idx) => {
          const trimmed = section.trim();
          if (!trimmed) return null;

          // Check if this section starts with ### or ## or #
          const match = trimmed.match(/^#{1,3}\s*([^\n]+)\n?([\s\S]*)$/);
          if (match) {
            const headingTitle = match[1].trim();
            const bodyContent = match[2].trim();
            return (
              <div key={idx} className="space-y-1.5 pt-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                  {headingTitle}
                </h4>
                <div className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {bodyContent}
                </div>
              </div>
            );
          }

          // Fallback: If section doesn't match heading regex, strip any remaining '### ' before known section titles
          const cleanedText = trimmed
            .replace(/###\s*(Input Format)/gi, '$1')
            .replace(/###\s*(Output Format)/gi, '$1')
            .replace(/###\s*(Constraints)/gi, '$1')
            .replace(/^###\s+/gm, '');

          return (
            <div key={idx} className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {cleanedText}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#f2f4f7] text-slate-800 dark:bg-[#181818] dark:text-zinc-100 overflow-hidden font-sans">
      
      {/* Global Dragging Overlay to prevent mouse event hijacking */}
      {(isDraggingV || isDraggingH) && (
        <div 
          className="fixed inset-0 z-50 select-none bg-transparent" 
          style={{ cursor: isDraggingV ? 'row-resize' : 'col-resize' }} 
        />
      )}

      {/* Diff Modal */}
      {comparison && (
        <SubmissionDiffModal
          comparison={comparison}
          onClose={() => setComparison(null)}
        />
      )}

      {/* Top LeetCode-style Navigation Header */}
      <header className="h-11 border-b border-[#e2e4e8] dark:border-[#2d2d2d] bg-[#f8f9fa] dark:bg-[#1a1a1a] px-3 flex items-center justify-between shrink-0 z-30 select-none">
        
        {/* Left: Problem List Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-[#282828] transition-colors"
            title="Back to all problems"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-[#282828] transition-colors"
          >
            <Layers size={13} className="text-slate-500 dark:text-zinc-400" />
            <span>Problem List</span>
          </button>

          <div className="flex items-center text-slate-600 dark:text-zinc-400 bg-[#edeef1] dark:bg-[#262626] rounded-md p-0.5 border border-[#e0e2e6] dark:border-[#333333]">
            <button
              onClick={() => {
                if (Number(problemId) > 1) {
                  if (onNavigateProblem) onNavigateProblem(Number(problemId) - 1);
                  else window.location.search = `?id=${Number(problemId) - 1}`;
                }
              }}
              title="Previous problem"
              className="p-1 rounded hover:bg-white hover:text-slate-900 dark:hover:bg-[#333333] dark:hover:text-white transition-colors"
            >
              <ChevronLeft size={12} />
            </button>
            <button
              onClick={() => {
                if (onNavigateProblem) onNavigateProblem(Number(problemId) + 1);
                else window.location.search = `?id=${Number(problemId) + 1}`;
              }}
              title="Next problem"
              className="p-1 rounded hover:bg-white hover:text-slate-900 dark:hover:bg-[#333333] dark:hover:text-white transition-colors"
            >
              <ChevronRight size={12} />
            </button>
          </div>
        </div>

        {/* Center: Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunCode}
            disabled={running || submitting}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#edeef1] hover:bg-slate-200 text-slate-800 border border-[#d5d9de] dark:bg-[#282828] dark:hover:bg-[#333333] dark:text-zinc-200 dark:border-[#3c3c3c] text-xs font-medium disabled:opacity-50 transition-all shadow-sm"
            title="Run Custom Input"
          >
            <Play size={12} className="text-blue-600 fill-blue-600 dark:text-blue-400 dark:fill-blue-400" />
            <span>{running ? 'Running...' : 'Run'}</span>
          </button>

          <button
            onClick={handleSubmitCode}
            disabled={running || submitting || isStageLocked}
            className="flex items-center gap-1.5 px-3.5 py-1 rounded-md bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-semibold disabled:opacity-50 transition-all shadow-sm"
            title="Submit Solution"
          >
            <Send size={12} />
            <span>{submitting ? 'Evaluating...' : isStageLocked ? 'Stage Locked' : 'Submit'}</span>
          </button>

          <button
            onClick={() => setLeftTab(prev => prev === 'solutions' ? 'description' : 'solutions')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
              leftTab === 'solutions'
                ? 'bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-950/60 dark:border-purple-500 dark:text-purple-300'
                : 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700 dark:bg-[#282828] dark:hover:bg-[#333333] dark:border-[#3c3c3c] dark:text-purple-400'
            }`}
            title="AI Code Mentor & Socratic Hints"
          >
            <Sparkles size={13} />
          </button>
        </div>

        {/* Right: Stopwatch, Theme Toggle, Streak & Profile */}
        <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-zinc-400">
          
          {/* Quick Theme Switcher */}
          <button
            onClick={toggleTheme}
            title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-zinc-400 dark:hover:text-amber-400 dark:hover:bg-[#282828] transition-colors"
          >
            {isDark ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} />}
          </button>

          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-[10px] ring-1 ring-[#d0d3d8] dark:ring-[#444]">
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </div>
        </div>
      </header>

      {/* Main Two-Pane Split Screen Layout */}
      <div 
        ref={containerRef}
        className="flex-1 flex flex-col md:flex-row p-2 gap-2 overflow-hidden bg-[#f2f4f7] dark:bg-[#181818]"
      >
        
        {/* Left Problem Specifications & Stages Card */}
        <div
          style={{ width: isMaximized ? '0%' : `${leftWidth}%`, display: isMaximized ? 'none' : 'flex' }}
          className="h-full bg-white dark:bg-[#262626] border border-[#e2e4e8] dark:border-[#333333] rounded-xl overflow-hidden flex flex-col shrink-0 min-w-0 shadow-sm"
        >
          {/* Left Card Top Tab Bar */}
          <div className="h-9 bg-[#f8f9fa] dark:bg-[#262626] border-b border-[#e2e4e8] dark:border-[#333333] px-2 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setLeftTab('description')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  leftTab === 'description' 
                    ? 'text-blue-600 bg-white font-semibold shadow-xs border-t-2 border-blue-500 dark:text-white dark:bg-[#1e1e1e] dark:border-blue-500' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-[#303030]'
                }`}
              >
                <FileText size={13} className={leftTab === 'description' ? 'text-blue-400' : 'text-zinc-500'} />
                <span>Description</span>
              </button>

              <button
                onClick={() => setLeftTab('stages')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  leftTab === 'stages' 
                    ? 'text-blue-600 bg-white font-semibold shadow-xs border-t-2 border-blue-500 dark:text-white dark:bg-[#1e1e1e] dark:border-blue-500' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-[#303030]'
                }`}
              >
                <Layers size={13} className={leftTab === 'stages' ? 'text-blue-500' : 'text-slate-400 dark:text-zinc-500'} />
                <span>Stages</span>
              </button>

              <button
                onClick={() => setLeftTab('solutions')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  leftTab === 'solutions' 
                    ? 'text-blue-600 bg-white font-semibold shadow-xs border-t-2 border-blue-500 dark:text-white dark:bg-[#1e1e1e] dark:border-blue-500' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-[#303030]'
                }`}
              >
                <Lightbulb size={13} className={leftTab === 'solutions' ? 'text-amber-500' : 'text-slate-400 dark:text-zinc-500'} />
                <span>AI Hints</span>
              </button>

              <button
                onClick={() => setLeftTab('submissions')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  leftTab === 'submissions' 
                    ? 'text-blue-600 bg-white font-semibold shadow-xs border-t-2 border-blue-500 dark:text-white dark:bg-[#1e1e1e] dark:border-blue-500' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-[#303030]'
                }`}
              >
                <Clock size={13} className={leftTab === 'submissions' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-zinc-500'} />
                <span>Submissions</span>
              </button>
            </div>

            <div className="flex items-center gap-1 text-slate-500 dark:text-zinc-500">
              <button 
                onClick={() => setLeftWidth(prev => prev > 60 ? 46 : 70)}
                title="Expand panel" 
                className="p-1 hover:text-slate-900 hover:bg-slate-200 dark:hover:text-zinc-300 dark:hover:bg-[#333333] rounded"
              >
                <Maximize2 size={12} />
              </button>
            </div>
          </div>

          {/* Left Card Content Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white dark:bg-[#1e1e1e] select-text text-slate-800 dark:text-zinc-200">
            
            {/* Tab: Description */}
            {leftTab === 'description' && (
              <div className="space-y-4">
                {/* Problem Title */}
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {problem.title}
                  </h1>
                  
                  {/* Pills Row: Difficulty, Topic, Hint button */}
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      problem.difficulty === 'EASY' 
                        ? 'bg-[#00b8a3]/10 text-[#00b8a3] border border-[#00b8a3]/30'
                        : problem.difficulty === 'MEDIUM'
                        ? 'bg-[#ffc01e]/15 text-[#b27b00] border border-[#ffc01e]/40'
                        : 'bg-[#ff375f]/10 text-[#ff375f] border border-[#ff375f]/30'
                    }`}>
                      {problem.difficulty}
                    </span>

                    {problem.topic && (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-[#f0f2f5] text-slate-700 border border-[#e0e2e6] dark:bg-[#2d2d2d] dark:text-zinc-300 dark:border-[#383838]">
                        <Tag size={11} className="text-slate-500 dark:text-zinc-400" />
                        {problem.topic}
                      </span>
                    )}

                    <button
                      onClick={() => setLeftTab('solutions')}
                      className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-[#f0f2f5] hover:bg-slate-200 text-slate-700 border border-[#e0e2e6] dark:bg-[#2d2d2d] dark:hover:bg-[#383838] dark:text-zinc-300 dark:border-[#383838] transition-colors"
                    >
                      <Lightbulb size={11} className="text-amber-500 dark:text-amber-400" />
                      <span>Hint</span>
                    </button>
                  </div>
                </div>

                {/* Active Stage Target Banner */}
                {activeStage && (
                  <div className="p-3.5 rounded-xl bg-[#f8f9fa] dark:bg-[#262626] border border-[#e2e4e8] dark:border-[#383838] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 font-mono flex items-center gap-1.5">
                        <Sparkles size={12} /> Target Stage Requirements
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-700 font-mono border border-[#e0e2e6] dark:bg-[#1e1e1e] dark:text-zinc-300 dark:border-[#333333]">
                        {activeStage.status}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white">{activeStage.name}</h4>
                    <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">{activeStage.description}</p>
                    <div className="flex gap-4 pt-1 text-[11px] font-mono text-slate-500 dark:text-zinc-400 border-t border-[#e2e4e8] dark:border-[#333333]">
                      <span>Expected Time: <b className="text-blue-600 dark:text-blue-400">{activeStage.expected_time_complexity || 'O(1)'}</b></span>
                      <span>Expected Space: <b className="text-blue-600 dark:text-blue-400">{activeStage.expected_space_complexity || 'O(1)'}</b></span>
                    </div>
                  </div>
                )}

                {/* Feedback Banner */}
                <StageFeedbackBanner
                  feedback={stageFeedback}
                  onProceed={(nextId) => {
                    setActiveStageId(nextId);
                    setStageFeedback(null);
                  }}
                />

                {/* Problem Description Text */}
                <div className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed space-y-3">
                  {renderFormattedDescription(problem.description)}
                </div>

                {/* Sample Test Cases */}
                {problem.sample_test_cases && problem.sample_test_cases.length > 0 && (
                  <div className="space-y-3 pt-3 border-t border-[#e2e4e8] dark:border-[#333333]">
                    <h3 className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                      Examples
                    </h3>
                    {problem.sample_test_cases.map((tc, idx) => (
                      <div key={idx} className="bg-[#f8f9fa] dark:bg-[#262626] p-3 rounded-xl border border-[#e2e4e8] dark:border-[#333333] text-xs font-mono space-y-2">
                        <div className="text-slate-600 dark:text-zinc-400 font-semibold text-[11px]">Example {idx + 1}:</div>
                        <div className="bg-white dark:bg-[#1a1a1a] p-2.5 rounded-lg border border-[#e2e4e8] dark:border-[#2d2d2d] space-y-1.5">
                          <div>
                            <span className="text-slate-400 dark:text-zinc-500 text-[10px] uppercase font-bold block">Input</span>
                            <pre className="text-slate-800 dark:text-zinc-200 text-xs font-mono">{tc.input}</pre>
                          </div>
                          <div className="pt-1.5 border-t border-[#e2e4e8] dark:border-[#2d2d2d]">
                            <span className="text-slate-400 dark:text-zinc-500 text-[10px] uppercase font-bold block">Output</span>
                            <pre className="text-emerald-700 dark:text-emerald-400 text-xs font-mono font-semibold">{tc.expected_output}</pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Limits */}
                <div className="flex gap-4 pt-3 text-[11px] text-slate-500 dark:text-zinc-500 font-mono border-t border-[#e2e4e8] dark:border-[#333333]">
                  <span>Time Limit: {problem.time_limit_ms}ms</span>
                  <span>Memory Limit: {Math.round(problem.memory_limit_kb / 1024)}MB</span>
                </div>
              </div>
            )}

            {/* Tab: Stages */}
            {leftTab === 'stages' && stagesData && (
              <div className="space-y-4">
                <ProgressTracker
                  stages={stagesData.stages}
                  activeStageId={activeStageId}
                  onSelectStage={(id) => setActiveStageId(id)}
                  isProblemSolved={stagesData.is_solved}
                />
              </div>
            )}

            {/* Tab: Solutions / AI Hints */}
            {leftTab === 'solutions' && (
              <div className="space-y-4">
                <MentorPanel
                  submissionId={latestVerdict?.submission_id || history[0]?.id}
                  stageId={activeStageId}
                  userId={effectiveUserId}
                />
              </div>
            )}

            {/* Tab: Submissions */}
            {leftTab === 'submissions' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#e2e4e8] dark:border-[#333333]">
                  <span className="text-xs font-semibold text-slate-800 dark:text-zinc-300">Submission History</span>
                  <span className="text-[11px] text-slate-500 dark:text-zinc-500 font-mono">{history.length} records</span>
                </div>
                {history.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 dark:text-zinc-500 text-xs">
                    No submissions recorded yet for this problem stage.
                  </div>
                ) : (
                  history.map((sub, idx) => (
                    <div
                      key={sub.id}
                      className="p-3 bg-[#f8f9fa] dark:bg-[#262626] rounded-xl border border-[#e2e4e8] dark:border-[#333333] flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center gap-3">
                        <VerdictBadge verdict={sub.verdict} />
                        <span className="text-slate-600 dark:text-zinc-400 text-[11px]">
                          {sub.execution_time_ms !== null ? `${sub.execution_time_ms}ms` : '—'}
                        </span>
                        <span className="text-slate-400 dark:text-zinc-500 text-[10px]">
                          {new Date(sub.created_at).toLocaleTimeString()}
                        </span>
                      </div>
                      {idx > 0 && (
                        <button
                          onClick={() => handleCompare(history[idx].id, history[0].id)}
                          className="px-2 py-1 rounded-md bg-[#edeef1] hover:bg-slate-200 text-slate-700 dark:bg-[#333333] dark:hover:bg-[#3d3d3d] dark:text-zinc-300 text-[11px] flex items-center gap-1 transition-colors"
                        >
                          <GitCompare size={12} /> Diff
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

          </div>

          {/* Bottom Status Bar */}
          <div className="h-9 px-4 border-t border-[#e2e4e8] dark:border-[#2d2d2d] bg-[#f8f9fa] dark:bg-[#1a1a1a] flex items-center justify-end text-xs text-slate-500 dark:text-zinc-400 shrink-0 select-none">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>Online Judge Active</span>
            </div>
          </div>
        </div>

        {/* Draggable Horizontal Splitter (Desktop) */}
        {!isMaximized && (
          <div
            onMouseDown={(e) => {
              e.preventDefault();
              setIsDraggingH(true);
            }}
            className="hidden md:flex w-2 hover:w-2.5 bg-[#e0e3e7] dark:bg-[#2c2c2c] hover:bg-blue-500 dark:hover:bg-blue-600 cursor-col-resize items-center justify-center transition-all rounded-full my-auto h-28 select-none shrink-0 group z-10"
            title="Drag left/right to resize panels"
          >
            <div className="w-0.5 h-8 rounded-full bg-slate-400 dark:bg-zinc-600 group-hover:bg-white transition-colors" />
          </div>
        )}

        {/* Right Code Editor & Execution Drawer Card */}
        <div 
          ref={rightPaneRef}
          style={{ width: isMaximized ? '100%' : `${100 - leftWidth}%` }}
          className="flex-1 h-full bg-white dark:bg-[#1e1e1e] border border-[#e2e4e8] dark:border-[#333333] rounded-xl overflow-hidden flex flex-col min-w-0 shadow-sm"
        >
          {/* Editor Container */}
          <div className="flex-1 overflow-hidden relative">
            <CodeEditor
              code={code}
              onChange={setCode}
              onReset={() => {
                if (problem) {
                  setCode(generateStarterBoilerplate(problem));
                }
              }}
              isMaximized={isMaximized}
              onToggleMaximize={() => setIsMaximized(!isMaximized)}
            />
          </div>

          {/* Draggable Vertical Splitter */}
          {!isDrawerCollapsed && !isMaximized && (
            <div
              onMouseDown={(e) => {
                e.preventDefault();
                setIsDraggingV(true);
              }}
              className="h-2 hover:h-2.5 bg-[#e2e4e8] dark:bg-[#2c2c2c] hover:bg-blue-500 dark:hover:bg-blue-600 cursor-row-resize flex items-center justify-center transition-all select-none shrink-0 group z-10"
              title="Drag up/down to increase typing editor length"
            >
              <div className="w-10 h-0.5 rounded-full bg-slate-400 dark:bg-zinc-600 group-hover:bg-white transition-colors" />
            </div>
          )}

          {/* Bottom Testcase / Test Result Drawer */}
          <div
            style={{ height: (isDrawerCollapsed || isMaximized) ? '36px' : `${drawerHeight}px` }}
            className="w-full bg-white dark:bg-[#1e1e1e] flex flex-col overflow-hidden shrink-0"
          >
            {/* Drawer Tabs Header */}
            <div className="h-9 bg-[#f8f9fa] dark:bg-[#262626] border-b border-[#e2e4e8] dark:border-[#333333] px-3 flex items-center justify-between text-xs select-none shrink-0">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setBottomTab('testcase');
                    if (isDrawerCollapsed) setIsDrawerCollapsed(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    bottomTab === 'testcase' 
                      ? 'text-slate-900 bg-white font-semibold border-t-2 border-blue-500 shadow-xs dark:text-white dark:bg-[#1e1e1e]' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-[#303030]'
                  }`}
                >
                  <CheckSquare size={13} className={bottomTab === 'testcase' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-zinc-500'} />
                  <span>Testcase</span>
                </button>

                <button
                  onClick={() => {
                    setBottomTab('testresult');
                    if (isDrawerCollapsed) setIsDrawerCollapsed(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    bottomTab === 'testresult' 
                      ? 'text-slate-900 bg-white font-semibold border-t-2 border-blue-500 shadow-xs dark:text-white dark:bg-[#1e1e1e]' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-[#303030]'
                  }`}
                >
                  <Terminal size={13} className={bottomTab === 'testresult' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-zinc-500'} />
                  <span>Test Result</span>
                </button>

                <button
                  onClick={() => {
                    setBottomTab('journey');
                    if (isDrawerCollapsed) setIsDrawerCollapsed(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    bottomTab === 'journey' 
                      ? 'text-slate-900 bg-white font-semibold border-t-2 border-blue-500 shadow-xs dark:text-white dark:bg-[#1e1e1e]' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-[#303030]'
                  }`}
                >
                  <TrendingUp size={13} className={bottomTab === 'journey' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-zinc-500'} />
                  <span>Optimization Journey</span>
                </button>
              </div>

              {/* Collapse/Expand Toggle */}
              <button
                onClick={() => setIsDrawerCollapsed(!isDrawerCollapsed)}
                className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-200 dark:text-zinc-500 dark:hover:text-zinc-200 dark:hover:bg-[#333333] rounded transition-colors"
                title={isDrawerCollapsed ? "Expand Drawer" : "Collapse Drawer"}
              >
                {isDrawerCollapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>

            {/* Drawer Tab Body */}
            {!isDrawerCollapsed && (
              <div className="flex-1 overflow-y-auto p-3.5 bg-white dark:bg-[#1e1e1e] text-xs font-mono space-y-3">
                
                {/* Tab: Testcase */}
                {bottomTab === 'testcase' && (
                  <div className="space-y-2.5 h-full flex flex-col">
                    {/* Sample Case Quick Fill Buttons */}
                    {problem.sample_test_cases && problem.sample_test_cases.length > 0 && (
                      <div className="flex items-center gap-2">
                        {problem.sample_test_cases.map((tc, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCustomInput(tc.input || '')}
                            className={`px-2.5 py-1 rounded-md text-xs font-sans transition-colors ${
                              customInput === tc.input 
                                ? 'bg-white text-slate-900 border border-[#d5d9de] shadow-xs font-semibold dark:bg-[#333333] dark:text-white dark:border-[#444444]' 
                                : 'bg-[#f0f2f5] text-slate-600 hover:text-slate-900 border border-[#e0e2e6] dark:bg-[#262626] dark:text-zinc-400 dark:hover:text-zinc-200 dark:border-[#333333]'
                            }`}
                          >
                            Case {idx + 1}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="flex-1 flex flex-col min-h-0">
                      <span className="text-[11px] text-slate-500 dark:text-zinc-500 font-sans block mb-1">Standard Input (stdin):</span>
                      <textarea
                        value={customInput}
                        onChange={(e) => setCustomInput(e.target.value)}
                        placeholder="Enter standard input for your program..."
                        className="w-full flex-1 min-h-[90px] bg-[#f8f9fa] text-slate-800 border border-[#d5d9de] focus:bg-white focus:border-blue-500 dark:bg-[#181818] dark:text-zinc-200 dark:border-[#333333] rounded-lg p-2.5 resize-none font-mono text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Tab: Test Result */}
                {bottomTab === 'testresult' && (
                  <div className="space-y-3">
                    {/* Segmentation Fault Helper */}
                    {(
                      (runOutput?.stderr && (runOutput.stderr.includes('signal 11') || runOutput.stderr.includes('dumped core') || runOutput.stderr.toLowerCase().includes('segmentation fault'))) ||
                      (latestVerdict?.compile_output && (latestVerdict.compile_output.includes('signal 11') || latestVerdict.compile_output.includes('dumped core')))
                    ) && (
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 dark:bg-amber-950/30 dark:border-amber-800/40 dark:text-amber-200 space-y-1.5 font-sans">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-amber-600 dark:text-amber-400">
                          <AlertTriangle size={14} />
                          <span>Diagnosis: Runtime Segmentation Fault (Signal 11 / Core Dump)</span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-zinc-300">
                          Your code compiled and executed, but accessed an unallocated vector or invalid index out of bounds.
                        </p>
                      </div>
                    )}

                    {/* Verdict Display */}
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

                        {latestVerdict.feedback_message && (
                          <div className={`p-3 rounded-lg border text-xs font-sans ${
                            latestVerdict.verdict === 'ACCEPTED'
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-800/40 dark:text-emerald-300'
                              : latestVerdict.verdict === 'COMPLEXITY_MISMATCH'
                              ? 'bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-950/40 dark:border-amber-600/50 dark:text-amber-200 shadow-sm'
                              : 'bg-slate-100 border-slate-300 text-slate-800 dark:bg-zinc-800/40 dark:border-zinc-700/40 dark:text-zinc-300'
                          }`}>
                            <div className="font-semibold flex items-center gap-1.5 mb-1">
                              {latestVerdict.verdict === 'ACCEPTED' ? (
                                <span className="text-emerald-700 dark:text-emerald-400">✓ Stage Accepted</span>
                              ) : latestVerdict.verdict === 'COMPLEXITY_MISMATCH' ? (
                                <span className="text-amber-700 dark:text-amber-400">⚠️ Stage Complexity Requirement</span>
                              ) : (
                                <span>Notice</span>
                              )}
                            </div>
                            <p className="leading-relaxed text-[11px] opacity-90">{latestVerdict.feedback_message}</p>
                          </div>
                        )}

                        {latestVerdict.compile_output && (
                          <div className="bg-rose-50 p-2.5 rounded-lg border border-rose-200 text-rose-700 dark:bg-rose-950/30 dark:border-rose-800/50 dark:text-rose-300 whitespace-pre-wrap font-mono text-xs">
                            {latestVerdict.compile_output}
                          </div>
                        )}

                        {latestVerdict.analysis && (
                          <ComplexityCard analysis={latestVerdict.analysis} />
                        )}
                      </div>
                    )}

                    {/* Run Custom Output Display */}
                    {!latestVerdict && runOutput && (
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-3">
                          <VerdictBadge verdict={runOutput.verdict} />
                          <span className="text-slate-600 dark:text-zinc-400">Time: {runOutput.execution_time_ms}ms</span>
                          <span className="text-slate-600 dark:text-zinc-400">Memory: {runOutput.memory_used_kb}KB</span>
                        </div>

                        {runOutput.stdout && (
                          <div>
                            <span className="text-slate-500 dark:text-zinc-500 text-[10px] block mb-1">Standard Output</span>
                            <pre className="bg-[#f8f9fa] p-2.5 rounded-lg border border-[#e2e4e8] text-slate-800 dark:bg-[#181818] dark:border-[#333333] dark:text-zinc-200 font-mono whitespace-pre-wrap text-xs">
                              {runOutput.stdout}
                            </pre>
                          </div>
                        )}

                        {runOutput.stderr && (
                          <div>
                            <span className="text-rose-600 dark:text-rose-400 text-[10px] block mb-1">Standard Error</span>
                            <pre className="bg-rose-50 p-2.5 rounded-lg border border-rose-200 text-rose-700 dark:bg-rose-950/20 dark:border-rose-800/40 dark:text-rose-300 font-mono whitespace-pre-wrap text-xs">
                              {runOutput.stderr}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    {!latestVerdict && !runOutput && (
                      <div className="text-center py-8 text-slate-500 dark:text-zinc-500">
                        Run custom input or submit code to view execution metrics.
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Optimization Journey */}
                {bottomTab === 'journey' && (
                  <div className="space-y-3">
                    <OptimizationJourney journey={journey} />
                  </div>
                )}

              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
