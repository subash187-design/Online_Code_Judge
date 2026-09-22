import React, { useState, useEffect } from 'react';
import { 
  User, 
  Activity, 
  Code2, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  ChevronRight, 
  TrendingUp, 
  Zap, 
  Layers, 
  ArrowUpRight,
  Flame,
  Search,
  Sparkles,
  LayoutDashboard,
  Filter,
  BarChart2,
  Cpu,
  ShieldCheck,
  Compass,
  FileCode,
  LogOut,
  ChevronDown,
  Settings,
  BookOpen,
  Check,
  AlertCircle,
  Camera,
  Upload,
  Save,
  Moon,
  Sun,
  MapPin,
  Building,
  Phone,
  Mail,
  Shield,
  ArrowLeft,
  ArrowRight,
  Edit3,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import VerdictBadge from '../components/VerdictBadge';

export default function UserDashboardPage({ onNavigate, onSelectProblem, initialTab = 'profile' }) {
  const { user, authFetch, logout, updateUser } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState(initialTab === 'studio' ? 'profile' : (initialTab || 'profile')); // 'profile' | 'edit' | 'settings'
  const [submissions, setSubmissions] = useState([]);
  const [dashboardMetrics, setDashboardMetrics] = useState(null);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Profile management state - no hardcoded defaults
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    organization: user?.organization || '',
    location: user?.location || '',
    bio: user?.bio || ''
  });
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [profileSaved, setProfileSaved] = useState(false);
  const [historyFilter, setHistoryFilter] = useState('ALL'); // 'ALL' | 'SOLVED' | 'ATTEMPTED'
  const [hoveredDay, setHoveredDay] = useState(null);

  // Settings management state
  const [editorSettings, setEditorSettings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('algomind_editor_settings')) || {
        fontSize: '14',
        tabSize: '4'
      };
    } catch (e) {
      return { fontSize: '14', tabSize: '4' };
    }
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab === 'studio' ? 'profile' : initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone || '',
        organization: user.organization || '',
        location: user.location || '',
        bio: user.bio || ''
      }));
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      Promise.all([
        authFetch(`/api/v1/submissions?user_id=${user.id}`).then(res => res.json()).catch(() => []),
        authFetch(`/api/v1/analytics/dashboard?user_id=${user.id}`).then(res => res.json()).catch(() => null),
        fetch('/api/v1/problems').then(res => res.json()).catch(() => [])
      ])
        .then(([subsData, dashData, probData]) => {
          setSubmissions(Array.isArray(subsData) ? subsData : []);
          if (dashData) {
            setDashboardMetrics(dashData);
          }
          setProblems(Array.isArray(probData) ? probData : []);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to load user dashboard analytics:', err);
          setLoading(false);
        });
    } else {
      fetch('/api/v1/problems')
        .then(res => res.json())
        .then(probData => {
          setProblems(Array.isArray(probData) ? probData : []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  // Unified problem history mapping solved/attempted status
  const userProblemsHistory = React.useMemo(() => {
    const historyMap = new Map();

    // 1. Ingest from dashboardMetrics.problem_history (multi-stage summaries)
    if (dashboardMetrics?.problem_history && Array.isArray(dashboardMetrics.problem_history)) {
      for (const item of dashboardMetrics.problem_history) {
        const pid = Number(item.problem_id);
        historyMap.set(pid, {
          problem_id: pid,
          title: item.title,
          difficulty: item.difficulty || 'Medium',
          topic: item.topic || 'Algorithms',
          is_solved: Boolean(item.is_solved),
          total_submissions: item.total_submissions || 1,
          best_execution_time_ms: item.best_execution_time_ms,
          best_memory_used_kb: item.best_memory_used_kb,
          updated_at: item.updated_at
        });
      }
    }

    // 2. Ingest from direct submissions array
    if (submissions && Array.isArray(submissions)) {
      for (const sub of submissions) {
        const pid = Number(sub.problem_id);
        const existing = historyMap.get(pid);
        const isAccepted = sub.verdict === 'ACCEPTED';

        if (existing) {
          existing.total_submissions += 1;
          if (isAccepted) existing.is_solved = true;
          if (new Date(sub.created_at || 0) > new Date(existing.updated_at || 0)) {
            existing.updated_at = sub.created_at;
          }
          if (sub.execution_time_ms !== null && (existing.best_execution_time_ms === null || sub.execution_time_ms < existing.best_execution_time_ms)) {
            existing.best_execution_time_ms = sub.execution_time_ms;
          }
        } else {
          const prob = problems.find(p => Number(p.id) === pid);
          historyMap.set(pid, {
            problem_id: pid,
            title: prob ? prob.title : `Problem #${pid}`,
            difficulty: prob ? prob.difficulty : 'Medium',
            topic: prob ? prob.topic : 'Algorithms',
            is_solved: isAccepted,
            total_submissions: 1,
            best_execution_time_ms: sub.execution_time_ms,
            best_memory_used_kb: sub.memory_used_kb,
            updated_at: sub.created_at
          });
        }
      }
    }

    return Array.from(historyMap.values()).sort(
      (a, b) => (new Date(b.updated_at || 0) - new Date(a.updated_at || 0)) || 0
    );
  }, [dashboardMetrics, submissions, problems]);

  const solvedCount = userProblemsHistory.filter(p => p.is_solved).length;
  const attemptedCount = userProblemsHistory.filter(p => !p.is_solved).length;
  const totalInteracted = userProblemsHistory.length;

  const filteredHistory = React.useMemo(() => {
    if (historyFilter === 'SOLVED') {
      return userProblemsHistory.filter(p => p.is_solved);
    }
    if (historyFilter === 'ATTEMPTED') {
      return userProblemsHistory.filter(p => !p.is_solved);
    }
    return userProblemsHistory;
  }, [userProblemsHistory, historyFilter]);

  // 6 Months Submission Activity Heatmap & Streak Computation
  const { streakStats, monthCalendarData } = React.useMemo(() => {
    const submissionsByDate = {};
    const activeDateSet = new Set();
    
    if (Array.isArray(submissions)) {
      for (const s of submissions) {
        if (!s.created_at) continue;
        const d = new Date(s.created_at);
        if (isNaN(d.getTime())) continue;
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        submissionsByDate[key] = (submissionsByDate[key] || 0) + 1;
        activeDateSet.add(key);
      }
    }

    const now = new Date();
    const formatKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const todayKey = formatKey(now);
    
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = formatKey(yesterday);

    let currentStreak = 0;
    let checkDate = new Date(now);
    if (activeDateSet.has(todayKey)) {
      while (activeDateSet.has(formatKey(checkDate))) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      }
    } else if (activeDateSet.has(yesterdayKey)) {
      checkDate = new Date(yesterday);
      while (activeDateSet.has(formatKey(checkDate))) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      }
    }

    const sortedDates = Array.from(activeDateSet).sort();
    let maxStreak = 0;
    let tempStreak = 0;
    let prevTime = null;
    for (const dStr of sortedDates) {
      const [y, m, d] = dStr.split('-').map(Number);
      const time = new Date(y, m - 1, d).getTime();
      if (prevTime === null) {
        tempStreak = 1;
      } else {
        const diffDays = Math.round((time - prevTime) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          tempStreak++;
        } else {
          tempStreak = 1;
        }
      }
      prevTime = time;
      if (tempStreak > maxStreak) maxStreak = tempStreak;
    }

    const monthCalendar = [];
    let periodSubmissionsCount = 0;

    for (let i = 5; i >= 0; i--) {
      const mDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = mDate.getFullYear();
      const month = mDate.getMonth();
      const monthName = mDate.toLocaleString('en-US', { month: 'short' });
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const weeks = [];
      let currentWeek = new Array(7).fill(null);

      for (let day = 1; day <= daysInMonth; day++) {
        const d = new Date(year, month, day);
        const dayOfWeek = d.getDay(); // 0: Sun, 1: Mon, ... 6: Sat
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const count = submissionsByDate[dateKey] || 0;
        periodSubmissionsCount += count;

        currentWeek[dayOfWeek] = {
          day,
          year,
          monthName,
          dateKey,
          count
        };

        if (dayOfWeek === 6 || day === daysInMonth) {
          weeks.push(currentWeek);
          currentWeek = new Array(7).fill(null);
        }
      }

      monthCalendar.push({
        year,
        month,
        monthName,
        weeks
      });
    }

    return {
      streakStats: {
        currentStreak,
        maxStreak,
        totalActiveDays: activeDateSet.size,
        periodSubmissionsCount
      },
      monthCalendarData: monthCalendar
    };
  }, [submissions]);

  const getTileColor = (count) => {
    if (count === 0) {
      return 'bg-[#2b2b2b] dark:bg-[#262626] border border-transparent';
    }
    if (count === 1) {
      return 'bg-[#15803d] dark:bg-[#14532d]';
    }
    if (count <= 3) {
      return 'bg-[#16a34a] dark:bg-[#16a34a]';
    }
    if (count <= 5) {
      return 'bg-[#22c55e] dark:bg-[#22c55e]';
    }
    return 'bg-[#86efac] dark:bg-[#86efac]';
  };



  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert('Please select an image smaller than 3MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (updateUser) {
      updateUser({
        ...profileData,
        avatar: avatarPreview
      });
    }
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 4000);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('algomind_editor_settings', JSON.stringify(editorSettings));
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] bg-[#f2f4f7] text-slate-800 dark:bg-[#121212] dark:text-zinc-100 transition-colors">
      
      {/* 1. Left Vertical Sidebar */}
      <aside className="w-60 bg-[#f8f9fa] text-slate-600 dark:bg-[#1a1a1a] dark:text-zinc-300 p-4 hidden lg:flex flex-col justify-between shrink-0 border-r border-[#e2e4e8] dark:border-[#2d2d2d] shadow-sm">
        <div className="space-y-5">
          
          {/* Brand Header */}
          <div className="flex items-center gap-2.5 px-2 py-1">
            <div className="h-7 w-auto flex items-center">
              <img 
                src="/logo.png" 
                alt="Algomind Logo" 
                className="h-full w-auto object-contain brightness-110 dark:brightness-125" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 dark:text-white tracking-tight">Algomind</span>
              <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-medium">Algorithmic Platform</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 pt-1">
            <button
              onClick={() => onNavigate('problems')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all text-slate-600 hover:text-slate-900 hover:bg-[#edeef1] dark:text-zinc-400 dark:hover:text-white dark:hover:bg-[#222222]"
            >
              <Code2 size={15} className="text-blue-600 dark:text-blue-400" />
              Problems
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'profile'
                  ? 'bg-white text-slate-900 border border-[#e2e4e8] border-l-2 border-l-blue-600 font-semibold shadow-sm dark:bg-[#262626] dark:text-white dark:border-[#383838] dark:border-l-blue-500'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-[#edeef1] dark:text-zinc-400 dark:hover:text-white dark:hover:bg-[#222222]'
              }`}
            >
              <User size={15} className={activeTab === 'profile' ? 'text-blue-600 dark:text-blue-400' : ''} />
              Profile Details
            </button>

            <button
              onClick={() => setActiveTab('edit')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'edit'
                  ? 'bg-white text-slate-900 border border-[#e2e4e8] border-l-2 border-l-blue-600 font-semibold shadow-sm dark:bg-[#262626] dark:text-white dark:border-[#383838] dark:border-l-blue-500'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-[#edeef1] dark:text-zinc-400 dark:hover:text-white dark:hover:bg-[#222222]'
              }`}
            >
              <Edit3 size={15} className={activeTab === 'edit' ? 'text-blue-600 dark:text-blue-400' : ''} />
              Profile Editing
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-white text-slate-900 border border-[#e2e4e8] border-l-2 border-l-blue-600 font-semibold shadow-sm dark:bg-[#262626] dark:text-white dark:border-[#383838] dark:border-l-blue-500'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-[#edeef1] dark:text-zinc-400 dark:hover:text-white dark:hover:bg-[#222222]'
              }`}
            >
              <Settings size={15} className={activeTab === 'settings' ? 'text-blue-600 dark:text-blue-400' : ''} />
              Settings
            </button>
          </nav>
        </div>

        {/* User Card at Sidebar Bottom (Click to navigate to profile) */}
        <div className="pt-4 border-t border-[#e2e4e8] dark:border-slate-800/80 space-y-3">
          <div 
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-3 px-2 py-1.5 rounded-xl cursor-pointer hover:bg-[#edeef1] dark:hover:bg-white/5 transition-colors group"
            title="Open Profile Page"
          >
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-zinc-800 text-slate-800 dark:text-white flex items-center justify-center font-bold text-xs border border-[#d5d9de] dark:border-slate-700 overflow-hidden shrink-0">
              {avatarPreview ? (
                <img src={avatarPreview} alt={profileData.name || 'User'} className="w-full h-full object-cover" />
              ) : profileData.name ? (
                profileData.name.charAt(0).toUpperCase()
              ) : (
                'U'
              )}
            </div>
            <div className="flex flex-col overflow-hidden text-left">
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:underline">
                {profileData.name || user?.username || 'Developer'}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                {profileData.organization || 'Software Engineer'}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              onNavigate('landing');
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-[#edeef1] border border-[#d5d9de] dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5 dark:border-slate-800 transition-all"
          >
            <LogOut size={13} />
            Sign Out
          </button>
          
          <div className="text-center text-[10px] text-slate-400 dark:text-slate-500 font-medium">
            Prepare today, safe tomorrow
          </div>
        </div>
      </aside>

      {/* 2. Main Canvas */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto space-y-6">
        
        {/* Top Header Greeting */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#e2e4e8] dark:border-zinc-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {activeTab === 'profile' && 'Profile Details'}
              {activeTab === 'edit' && 'Profile Editing'}
              {activeTab === 'settings' && 'Platform Settings'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1 font-normal">
              {activeTab === 'profile' && 'View your problem solving progress and historical submission activity.'}
              {activeTab === 'edit' && 'Manage your personal details, profile picture, and bio information.'}
              {activeTab === 'settings' && 'Configure theme preferences, code editor, and notification settings.'}
            </p>
          </div>

          {/* Quick Tab Switcher */}
          <div className="flex items-center flex-wrap gap-1.5 bg-[#edeef1] dark:bg-zinc-900 p-1 rounded-xl border border-[#e2e4e8] dark:border-zinc-800">
            <button
              onClick={() => onNavigate('problems')}
              className="lg:hidden px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/60"
            >
              <Code2 size={13} />
              <span>Problems</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-white text-slate-900 border border-[#e2e4e8] shadow-sm font-bold dark:bg-zinc-800 dark:text-white dark:border-transparent'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Profile Details
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'edit'
                  ? 'bg-white text-slate-900 border border-[#e2e4e8] shadow-sm font-bold dark:bg-zinc-800 dark:text-white dark:border-transparent'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Profile Editing
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-white text-slate-900 border border-[#e2e4e8] shadow-sm font-bold dark:bg-zinc-800 dark:text-white dark:border-transparent'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        {/* TAB: PROFILE DETAILS VIEW */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {profileSaved && (
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-300 text-blue-800 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white flex items-center justify-between text-xs shadow-sm">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" />
                  Profile details and photo updated successfully!
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('edit')}
                    className="px-3 py-1.5 rounded-xl bg-white text-slate-800 border border-[#d5d9de] dark:bg-zinc-700 dark:text-white text-xs font-semibold hover:bg-slate-50 transition-all"
                  >
                    Edit Again
                  </button>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            )}

            {/* Profile Overview Card */}
            <div className="rounded-2xl bg-white border border-[#e2e4e8] shadow-sm dark:bg-[#1e1e1e] dark:border-[#2d2d2d] p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#f1f3f5] dark:bg-zinc-800 text-slate-800 dark:text-white flex items-center justify-center font-bold text-2xl border-2 border-[#e2e4e8] dark:border-zinc-700 overflow-hidden shadow-sm shrink-0">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt={profileData.name || 'User'} className="w-full h-full object-cover" />
                    ) : profileData.name ? (
                      profileData.name.charAt(0).toUpperCase()
                    ) : (
                      'U'
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {profileData.name || 'Developer'}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-[#262626] dark:text-blue-400 dark:border-[#333333]">
                        {user?.role === 'ADMIN' ? 'Platform Administrator' : 'Software Developer'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1"><Mail size={12} /> {user?.email || profileData.email || 'developer@algomind.dev'}</span>
                      {profileData.organization ? (
                        <>
                          <span>&bull;</span>
                          <span className="flex items-center gap-1"><Building size={12} /> {profileData.organization}</span>
                        </>
                      ) : null}
                      {profileData.location ? (
                        <>
                          <span>&bull;</span>
                          <span className="flex items-center gap-1"><MapPin size={12} /> {profileData.location}</span>
                        </>
                      ) : null}
                    </p>
                    {profileData.bio ? (
                      <p className="text-xs text-slate-600 dark:text-zinc-300 mt-2.5 max-w-xl italic">
                        "{profileData.bio}"
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTab('edit')}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Edit3 size={14} />
                    Edit Profile Details
                  </button>
                </div>
              </div>
            </div>

            {/* Problems Solved, Problems Attempted & Current Streak with Last 6 Months Heatmap */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left Column: Problems Solved & Problems Attempted */}
              <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#e2e4e8] shadow-sm dark:bg-[#1e1e1e] dark:border-[#2d2d2d] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">Problems Solved</span>
                      <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                        <CheckCircle2 size={16} />
                      </span>
                    </div>
                    <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-2">
                      {solvedCount}
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] text-slate-500 dark:text-zinc-400">
                    {problems.length > 0 ? `out of ${problems.length} total challenges` : 'Completed algorithmic problems'}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#e2e4e8] shadow-sm dark:bg-[#1e1e1e] dark:border-[#2d2d2d] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">Problems Attempted</span>
                      <span className="p-2 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                        <Clock size={16} />
                      </span>
                    </div>
                    <div className="text-3xl font-black font-mono text-amber-600 dark:text-amber-400 mt-2">
                      {attemptedCount}
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] text-slate-500 dark:text-zinc-400">
                    Challenges in progress
                  </div>
                </div>
              </div>

              {/* Right Column: Current Streak & 6-Month Submission Activity Heatmap (Replacing Total Runs & Solve Rate) */}
              <div className="lg:col-span-8 p-5 sm:p-6 rounded-2xl bg-white border border-[#e2e4e8] shadow-sm dark:bg-[#1e1e1e] dark:border-[#2d2d2d] flex flex-col justify-between">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e2e4e8] dark:border-[#2d2d2d]">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-950/60 dark:text-orange-400 shadow-xs">
                      <Flame size={20} className="fill-orange-500 text-orange-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                          Current Streak
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-700 dark:bg-orange-950/80 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60">
                          Last 6 Months
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
                          {streakStats.currentStreak} {streakStats.currentStreak === 1 ? 'Day' : 'Days'}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-zinc-400">
                          (Max: {streakStats.maxStreak} {streakStats.maxStreak === 1 ? 'day' : 'days'})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    {hoveredDay ? (
                      <div className="text-xs font-semibold text-slate-900 dark:text-zinc-200">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">{hoveredDay.count}</span> submission{hoveredDay.count === 1 ? '' : 's'} on {hoveredDay.monthName} {hoveredDay.day}, {hoveredDay.year}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-500 dark:text-zinc-400">
                        <span className="font-semibold text-slate-800 dark:text-zinc-200">{streakStats.periodSubmissionsCount}</span> submissions in last 6 months
                      </div>
                    )}
                    <div className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5">
                      {streakStats.totalActiveDays} active coding days
                    </div>
                  </div>
                </div>

                {/* Heatmap Grid Matching User Screenshot */}
                <div className="py-4 overflow-x-auto flex justify-center sm:justify-start">
                  <div className="inline-flex items-start gap-2 sm:gap-3 p-3.5 rounded-xl bg-[#f8f9fa] dark:bg-[#181818] border border-[#e2e4e8] dark:border-[#2a2a2a] min-w-max shadow-inner">
                    {monthCalendarData.map((m) => (
                      <div key={`${m.year}-${m.month}`} className="flex flex-col items-center">
                        <div className="flex gap-[2.5px]">
                          {m.weeks.map((week, wIdx) => (
                            <div key={wIdx} className="flex flex-col gap-[2.5px]">
                              {week.map((cell, dayIdx) => {
                                if (!cell) {
                                  return (
                                    <div key={dayIdx} className="w-[11px] h-[11px] sm:w-3 sm:h-3 invisible" />
                                  );
                                }
                                return (
                                  <div
                                    key={dayIdx}
                                    onMouseEnter={() => setHoveredDay(cell)}
                                    onMouseLeave={() => setHoveredDay(null)}
                                    className={`w-[11px] h-[11px] sm:w-3 sm:h-3 rounded-[2.5px] transition-transform duration-100 cursor-pointer hover:scale-125 hover:z-10 ${getTileColor(cell.count)}`}
                                    title={`${cell.count} submission${cell.count === 1 ? '' : 's'} on ${cell.monthName} ${cell.day}, ${cell.year}`}
                                  />
                                );
                              })}
                            </div>
                          ))}
                        </div>
                        <span className="text-[10px] sm:text-xs text-slate-600 dark:text-zinc-400 font-semibold mt-2.5 tracking-tight">
                          {m.monthName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Legend */}
                <div className="flex items-center justify-between pt-2 border-t border-[#e2e4e8] dark:border-[#2d2d2d] text-[11px] text-slate-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-zinc-500">
                    <span>Daily algorithmic practice frequency</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px]">Less</span>
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#2b2b2b] dark:bg-[#262626]" title="0 submissions" />
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#14532d]" title="1 submission" />
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#16a34a]" title="2-3 submissions" />
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#22c55e]" title="4-5 submissions" />
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#86efac]" title="6+ submissions" />
                    <span className="text-[10px]">More</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Problems History Section */}
            <div className="rounded-2xl bg-white border border-[#e2e4e8] shadow-sm dark:bg-[#1e1e1e] dark:border-[#2d2d2d] overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-[#e2e4e8] dark:border-[#2d2d2d] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Code2 size={18} className="text-blue-600 dark:text-blue-400" />
                    Problems History
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    Your algorithmic problem attempts and verification status
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1.5 bg-[#edeef1] dark:bg-[#262626] p-1 rounded-xl border border-[#e2e4e8] dark:border-[#333333] self-start sm:self-auto">
                  <button
                    onClick={() => setHistoryFilter('ALL')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      historyFilter === 'ALL'
                        ? 'bg-white text-slate-900 shadow-sm dark:bg-[#1e1e1e] dark:text-white'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    All ({userProblemsHistory.length})
                  </button>
                  <button
                    onClick={() => setHistoryFilter('SOLVED')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      historyFilter === 'SOLVED'
                        ? 'bg-white text-emerald-700 shadow-sm dark:bg-[#1e1e1e] dark:text-emerald-400'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                    }`}
                  >
                    Solved ({solvedCount})
                  </button>
                  <button
                    onClick={() => setHistoryFilter('ATTEMPTED')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      historyFilter === 'ATTEMPTED'
                        ? 'bg-white text-amber-700 shadow-sm dark:bg-[#1e1e1e] dark:text-amber-400'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400'
                    }`}
                  >
                    Attempted ({attemptedCount})
                  </button>
                </div>
              </div>

              {filteredHistory.length === 0 ? (
                <div className="py-14 text-center space-y-3 px-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-zinc-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-xs">
                    <Code2 size={24} />
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {historyFilter === 'SOLVED'
                      ? 'No solved problems yet'
                      : historyFilter === 'ATTEMPTED'
                      ? 'No attempted problems yet'
                      : 'No problem history recorded yet'}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
                    {historyFilter === 'SOLVED'
                      ? 'Complete test cases with an Accepted verdict to mark problems as solved.'
                      : 'Explore our catalog to start practicing algorithmic challenges.'}
                  </p>
                  <button
                    onClick={() => onNavigate('problems')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all mt-2"
                  >
                    <span>Browse Algomind Problems</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#f8f9fa] dark:bg-[#181818] text-slate-500 dark:text-zinc-400 font-bold border-b border-[#e2e4e8] dark:border-[#2d2d2d] uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-5">Problem</th>
                        <th className="py-3 px-4">Difficulty</th>
                        <th className="py-3 px-4">Topic</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Submissions</th>
                        <th className="py-3 px-4">Last Activity</th>
                        <th className="py-3 px-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e2e4e8] dark:divide-[#2d2d2d]">
                      {filteredHistory.map((item) => (
                        <tr
                          key={item.problem_id}
                          className="hover:bg-[#f8f9fa] dark:hover:bg-[#222222] transition-colors group"
                        >
                          <td className="py-3.5 px-5">
                            <div
                              onClick={() => {
                                if (onSelectProblem) onSelectProblem(item.problem_id);
                                else onNavigate('problem-detail', { problemId: item.problem_id });
                              }}
                              className="font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                            >
                              {item.title}
                            </div>
                            <div className="text-[11px] text-slate-400 dark:text-zinc-500 font-mono mt-0.5">
                              #{item.problem_id}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            {(() => {
                              const d = (item.difficulty || 'MEDIUM').toUpperCase();
                              if (d === 'EASY') {
                                return (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/60">
                                    Easy
                                  </span>
                                );
                              }
                              if (d === 'HARD') {
                                return (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-300 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800/60">
                                    Hard
                                  </span>
                                );
                              }
                              return (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-300 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800/60">
                                  Medium
                                </span>
                              );
                            })()}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-md bg-[#edeef1] text-slate-700 dark:bg-[#282828] dark:text-zinc-300 text-[11px] font-medium border border-[#d5d9de] dark:border-[#383838]">
                              {item.topic || 'Algorithms'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            {item.is_solved ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/60 shadow-xs">
                                <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" />
                                Solved
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-300 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800/60 shadow-xs">
                                <Clock size={12} className="text-amber-600 dark:text-amber-400" />
                                Attempted
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-zinc-400">
                            {item.total_submissions} run{item.total_submissions > 1 ? 's' : ''}
                            {item.best_execution_time_ms ? (
                              <span className="text-[10px] text-slate-400 block">{item.best_execution_time_ms} ms</span>
                            ) : null}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 dark:text-zinc-400 text-xs">
                            {(() => {
                              if (!item.updated_at) return '—';
                              const d = new Date(item.updated_at);
                              return isNaN(d.getTime()) ? '—' : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
                            })()}
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <button
                              onClick={() => {
                                if (onSelectProblem) onSelectProblem(item.problem_id);
                                else onNavigate('problem-detail', { problemId: item.problem_id });
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1 shadow-xs ${
                                item.is_solved
                                  ? 'bg-[#edeef1] hover:bg-[#e2e4e8] text-slate-700 dark:bg-[#282828] dark:hover:bg-[#333333] dark:text-zinc-200 border border-[#d5d9de] dark:border-[#383838]'
                                  : 'bg-blue-600 hover:bg-blue-500 text-white'
                              }`}
                            >
                              <span>{item.is_solved ? 'Review' : 'Continue'}</span>
                              <ArrowRight size={12} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: PROFILE EDITING VIEW */}
        {activeTab === 'edit' && (
          <div className="space-y-6">
            {profileSaved && (
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-300 text-blue-800 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white flex items-center justify-between text-xs shadow-sm">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400" />
                  Profile details and photo updated successfully!
                </div>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm"
                >
                  View Profile Details →
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Avatar & Overview */}
              <div className="lg:col-span-4 rounded-2xl bg-white border border-[#e2e4e8] shadow-sm dark:bg-[#1e1e1e] dark:border-[#2d2d2d] p-6 flex flex-col items-center text-center space-y-5">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-[#f8f9fa] border-2 border-[#e2e4e8] dark:bg-[#181818] dark:border-[#333333] flex items-center justify-center overflow-hidden shadow-sm">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt={profileData.name || 'User Avatar'} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-extrabold text-slate-800 dark:text-white">
                        {profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                    )}
                  </div>
                  
                  <label 
                    htmlFor="avatar-upload-btn"
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 cursor-pointer shadow-md hover:scale-105 transition-all"
                    title="Upload profile picture"
                  >
                    <Camera size={15} />
                    <input 
                      id="avatar-upload-btn"
                      type="file" 
                      accept="image/*" 
                      onChange={handleAvatarChange}
                      className="hidden" 
                    />
                  </label>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {profileData.name || 'Developer'}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    {user?.email || profileData.email || 'developer@algomind.dev'}
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#f1f3f5] text-blue-700 border border-blue-200 dark:bg-[#262626] dark:text-blue-400 dark:border-[#333333]">
                    {user?.role === 'ADMIN' ? 'Platform Administrator' : 'Software Developer'}
                  </span>
                </div>

                <div className="w-full flex items-center justify-center gap-2 pt-1">
                  <label 
                    htmlFor="avatar-upload-btn" 
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Upload size={13} />
                    Upload Photo
                  </label>
                  {avatarPreview && (
                    <button 
                      type="button" 
                      onClick={() => setAvatarPreview(null)}
                      className="px-3 py-1.5 rounded-xl bg-[#edeef1] text-slate-700 text-xs font-semibold hover:bg-[#e2e4e8] transition-colors border border-[#d5d9de] dark:bg-[#282828] dark:text-zinc-300 dark:hover:bg-[#333333] dark:border-[#383838]"
                    >
                      Remove
                    </button>
                  )}
                </div>


              </div>

              {/* Right Column: Personal Information Form */}
              <div className="lg:col-span-8 rounded-2xl bg-white border border-[#e2e4e8] shadow-sm dark:bg-[#1e1e1e] dark:border-[#2d2d2d] p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-[#e2e4e8] dark:border-zinc-800 pb-4">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                      Edit Personal Information
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                      Update your developer profile details, bio, and contact information
                    </p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setActiveTab('profile')}
                    className="text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    View Details →
                  </button>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                        Full Name
                      </label>
                      <input 
                        type="text"
                        required
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#f8f9fa] border border-[#d5d9de] text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 dark:bg-[#141414] dark:border-[#2e2e2e] dark:text-white dark:placeholder-zinc-500 dark:focus:border-blue-500"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                        Email Address
                      </label>
                      <input 
                        type="email"
                        disabled
                        value={user?.email || profileData.email}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#edeef1] border border-[#d5d9de] text-xs text-slate-500 cursor-not-allowed dark:bg-[#141414]/50 dark:border-[#282828] dark:text-zinc-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                        Mobile / Phone Number
                      </label>
                      <input 
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#f8f9fa] border border-[#d5d9de] text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 dark:bg-[#141414] dark:border-[#2e2e2e] dark:text-white dark:placeholder-zinc-500 dark:focus:border-blue-500"
                        placeholder="e.g. +91 9876543210"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                        School / Organization
                      </label>
                      <input 
                        type="text"
                        value={profileData.organization}
                        onChange={(e) => setProfileData(prev => ({ ...prev, organization: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#f8f9fa] border border-[#d5d9de] text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 dark:bg-[#141414] dark:border-[#2e2e2e] dark:text-white dark:placeholder-zinc-500 dark:focus:border-blue-500"
                        placeholder="Enter school, university, or company"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Address / Location
                    </label>
                    <input 
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#f8f9fa] border border-[#d5d9de] text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 dark:bg-[#141414] dark:border-[#2e2e2e] dark:text-white dark:placeholder-zinc-500 dark:focus:border-blue-500"
                      placeholder="Enter your city, state, or country"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Bio / Description
                    </label>
                    <textarea 
                      rows={3}
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#f8f9fa] border border-[#d5d9de] text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 dark:bg-[#141414] dark:border-[#2e2e2e] dark:text-white dark:placeholder-zinc-500 dark:focus:border-blue-500 leading-relaxed"
                      placeholder="Write a brief bio about yourself..."
                    />
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <Save size={14} />
                      Save Details & Photo
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('profile')}
                      className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#edeef1] hover:bg-[#e2e4e8] text-slate-700 text-xs font-medium transition-colors border border-[#d5d9de] dark:bg-[#282828] dark:hover:bg-[#333333] dark:text-zinc-300 dark:border-[#383838] flex items-center justify-center gap-1.5"
                    >
                      Cancel / View Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS VIEW */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            
            {settingsSaved && (
              <div className="p-4 rounded-2xl bg-white border border-blue-500/50 dark:bg-[#1e1e1e] dark:border-blue-500/30 flex items-center justify-between text-xs text-slate-800 dark:text-white shadow-sm">
                <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                  <CheckCircle2 size={16} />
                  Settings saved successfully!
                </div>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm"
                >
                  View Profile Details →
                </button>
              </div>
            )}

            <div className="max-w-4xl space-y-6">
              
              {/* Appearance & Theme */}
              <div className="rounded-2xl bg-white border border-[#e2e4e8] shadow-sm dark:bg-[#1e1e1e] dark:border-[#2d2d2d] p-6 space-y-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Appearance & Theme</h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">Customize interface theme for day and night practice</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => { if (isDark) toggleTheme(); }}
                    className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                      !isDark 
                        ? 'border-blue-600 bg-blue-50/50 text-slate-900 shadow-sm font-bold' 
                        : 'border-[#e2e4e8] bg-[#f8f9fa] text-slate-600 hover:bg-[#edeef1] dark:border-[#2d2d2d] dark:bg-[#181818] dark:text-zinc-400 dark:hover:bg-[#222222]'
                    }`}
                  >
                    <Sun size={20} className={!isDark ? 'text-blue-600' : 'text-slate-400 dark:text-zinc-500'} />
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Light Mode</div>
                      <div className="text-[10px] text-slate-500 dark:text-zinc-400">High contrast day theme</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { if (!isDark) toggleTheme(); }}
                    className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                      isDark 
                        ? 'border-blue-500 bg-[#262626] text-white shadow-sm font-bold' 
                        : 'border-[#e2e4e8] bg-[#f8f9fa] text-slate-600 hover:bg-[#edeef1] dark:border-[#2d2d2d] dark:bg-[#181818] dark:text-zinc-400 dark:hover:bg-[#222222]'
                    }`}
                  >
                    <Moon size={20} className={isDark ? 'text-blue-400' : 'text-slate-400 dark:text-zinc-500'} />
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Dark Mode</div>
                      <div className="text-[10px] text-slate-500 dark:text-zinc-400">Deep graphite IDE theme</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Code Editor Settings */}
              <div className="rounded-2xl bg-white border border-[#e2e4e8] shadow-sm dark:bg-[#1e1e1e] dark:border-[#2d2d2d] p-6 space-y-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Code Editor Preferences</h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">Configure Monaco editor typography and indentation</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Font Size
                    </label>
                    <select
                      value={editorSettings.fontSize}
                      onChange={(e) => setEditorSettings(prev => ({ ...prev, fontSize: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#f8f9fa] border border-[#d5d9de] text-xs text-slate-900 focus:outline-none focus:border-blue-600 dark:bg-[#141414] dark:border-[#2e2e2e] dark:text-white dark:focus:border-blue-500"
                    >
                      <option value="12">12px — Compact</option>
                      <option value="14">14px — Standard</option>
                      <option value="16">16px — Large</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Tab Indentation
                    </label>
                    <select
                      value={editorSettings.tabSize}
                      onChange={(e) => setEditorSettings(prev => ({ ...prev, tabSize: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#f8f9fa] border border-[#d5d9de] text-xs text-slate-900 focus:outline-none focus:border-blue-600 dark:bg-[#141414] dark:border-[#2e2e2e] dark:text-white dark:focus:border-blue-500"
                    >
                      <option value="2">2 Spaces (Google C++ Style)</option>
                      <option value="4">4 Spaces (Standard)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Account Security Info */}
              <div className="rounded-2xl bg-white border border-[#e2e4e8] shadow-sm dark:bg-[#1e1e1e] dark:border-[#2d2d2d] p-6 space-y-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Account & Authentication</h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">Your sign-in credentials and security</p>
                </div>

                <div className="p-4 rounded-xl bg-[#f8f9fa] border border-[#e2e4e8] dark:bg-[#181818] dark:border-[#2d2d2d] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Registered Email</div>
                    <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">{user?.email || 'user@algomind.dev'}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-300 dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-800/60">
                    Verified
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Save size={14} />
                  Save Settings
                </button>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}
