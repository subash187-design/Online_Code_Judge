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
  Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import VerdictBadge from '../components/VerdictBadge';

export default function UserDashboardPage({ onNavigate, onSelectProblem, initialTab = 'studio' }) {
  const { user, authFetch, logout, updateUser } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState(initialTab || 'studio'); // 'studio' | 'problems' | 'journey' | 'telemetry' | 'profile' | 'settings'
  const [submissions, setSubmissions] = useState([]);
  const [dashboardMetrics, setDashboardMetrics] = useState(null);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');

  // Profile management state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+91 9876543210',
    organization: user?.organization || 'Greenfield High School',
    location: user?.location || 'Coimbatore, India',
    bio: user?.bio || 'Algorithm enthusiast learning progressive asymptotic complexities.'
  });
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [profileSaved, setProfileSaved] = useState(false);

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
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        organization: user.organization || prev.organization,
        location: user.location || prev.location,
        bio: user.bio || prev.bio
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
          if (dashData && dashData.overview) {
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

  const acceptedCount = submissions.filter(s => s.verdict === 'ACCEPTED').length;
  const totalSubmissions = submissions.length;
  const solveRate = totalSubmissions > 0 ? Math.round((acceptedCount / totalSubmissions) * 100) : 86;

  // Mock performance sparkline data points
  const sparklineBars = [35, 60, 45, 80, 65, 95, 75, 100, 85, 90, 70, 85];

  const filteredProblems = problems.filter(p => {
    const matchesSearch = p.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.topic && p.topic.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDiff = difficultyFilter === 'ALL' || p.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

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
    <div className="flex min-h-[calc(100vh-3.5rem)] bg-[#121212] text-zinc-100 transition-colors">
      
      {/* 1. Left Vertical Sidebar */}
      <aside className="w-60 bg-[#1a1a1a] text-zinc-300 p-4 hidden lg:flex flex-col justify-between shrink-0 border-r border-[#2d2d2d] shadow-sm">
        <div className="space-y-5">
          
          {/* Brand Header */}
          <div className="flex items-center gap-2.5 px-2 py-1">
            <div className="h-7 w-auto flex items-center">
              <img 
                src="/logo.png" 
                alt="Algomind Logo" 
                className="h-full w-auto object-contain brightness-125" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white tracking-tight">Algomind Studio</span>
              <span className="text-[10px] text-zinc-500 font-medium">Algorithmic Learning</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 pt-1">
            <button
              onClick={() => setActiveTab('studio')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'studio'
                  ? 'bg-[#262626] text-white border border-[#383838] border-l-2 border-l-emerald-500 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-[#222222]'
              }`}
            >
              <LayoutDashboard size={15} className={activeTab === 'studio' ? 'text-emerald-400' : ''} />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('problems')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'problems'
                  ? 'bg-[#262626] text-white border border-[#383838] border-l-2 border-l-emerald-500 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-[#222222]'
              }`}
            >
              <Code2 size={15} className={activeTab === 'problems' ? 'text-emerald-400' : ''} />
              My assignments
            </button>

            <button
              onClick={() => setActiveTab('telemetry')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'telemetry'
                  ? 'bg-[#262626] text-white border border-[#383838] border-l-2 border-l-emerald-500 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-[#222222]'
              }`}
            >
              <Cpu size={15} className={activeTab === 'telemetry' ? 'text-emerald-400' : ''} />
              Assessments
            </button>

            <button
              onClick={() => setActiveTab('journey')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'journey'
                  ? 'bg-[#262626] text-white border border-[#383838] border-l-2 border-l-emerald-500 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-[#222222]'
              }`}
            >
              <TrendingUp size={15} className={activeTab === 'journey' ? 'text-emerald-400' : ''} />
              AI Learning path
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#262626] text-white border border-[#383838] border-l-2 border-l-emerald-500 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-[#222222]'
              }`}
            >
              <User size={15} className={activeTab === 'profile' ? 'text-emerald-400' : ''} />
              Profile
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#262626] text-white border border-[#383838] border-l-2 border-l-emerald-500 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-[#222222]'
              }`}
            >
              <Settings size={15} className={activeTab === 'settings' ? 'text-emerald-400' : ''} />
              Settings
            </button>
          </nav>
        </div>

        {/* User Card at Sidebar Bottom (Click to navigate to profile) */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <div 
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-3 px-2 py-1.5 rounded-xl cursor-pointer hover:bg-white/5 transition-colors group"
            title="Open Profile Page"
          >
            <div className="w-8 h-8 rounded-full bg-zinc-800 text-white flex items-center justify-center font-bold text-xs border border-slate-700 overflow-hidden shrink-0">
              {avatarPreview ? (
                <img src={avatarPreview} alt={profileData.name || 'User'} className="w-full h-full object-cover" />
              ) : profileData.name ? (
                profileData.name.charAt(0).toUpperCase()
              ) : (
                'U'
              )}
            </div>
            <div className="flex flex-col overflow-hidden text-left">
              <span className="text-xs font-bold text-white truncate group-hover:underline">
                {profileData.name || user?.username || 'Developer'}
              </span>
              <span className="text-[10px] text-slate-400 truncate">
                {profileData.organization || 'Software Engineer'}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              onNavigate('landing');
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all border border-slate-800"
          >
            <LogOut size={13} />
            Sign Out
          </button>
          
          <div className="text-center text-[10px] text-slate-500 font-medium">
            Prepare today, safe tomorrow
          </div>
        </div>
      </aside>

      {/* 2. Main Canvas */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto space-y-6">
        
        {/* Top Header Greeting from PDF */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/90 dark:border-zinc-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white tracking-tight">
              {activeTab === 'profile' && `Profile & Account Details`}
              {activeTab === 'settings' && `Platform Settings`}
              {activeTab !== 'profile' && activeTab !== 'settings' && `Welcome back, ${profileData.name ? profileData.name.split(' ')[0] : 'Developer'}!`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1 font-normal">
              {activeTab === 'profile' && 'Manage your personal details, profile picture, and learning achievements.'}
              {activeTab === 'settings' && 'Configure theme preferences, code editor, and notification settings.'}
              {activeTab !== 'profile' && activeTab !== 'settings' && "Stay prepared, Stay safe. Here's an overview of your algorithmic performance."}
            </p>
          </div>

          {/* Quick Tab Switcher */}
          <div className="flex items-center flex-wrap gap-1.5 bg-slate-200/70 dark:bg-zinc-900 p-1 rounded-xl border border-slate-300/60 dark:border-zinc-800">
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'studio'
                  ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('problems')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'problems'
                  ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Problems
            </button>
            <button
              onClick={() => setActiveTab('journey')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'journey'
                  ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Journey
            </button>
            <button
              onClick={() => setActiveTab('telemetry')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'telemetry'
                  ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Telemetry
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        {/* 3. Primary KPI Metric Cards (Always visible on Studio Dashboard) */}
        {activeTab === 'studio' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Preparedness Score */}
            <div className="p-5 rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Preparedness Score</div>
                <div className="text-3xl font-extrabold text-black dark:text-white mt-1.5 font-mono">{solveRate}%</div>
              </div>
              <div className="mt-3 text-[11px] text-slate-600 dark:text-zinc-400 font-medium">
                Keep it up!, you are doing great.
              </div>
            </div>

            {/* Card 2: Simulations Assigned */}
            <div className="p-5 rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Simulations assigned</div>
                <div className="text-3xl font-extrabold text-black dark:text-white mt-1.5 font-mono">{problems.length || 3}</div>
              </div>
              <div className="mt-3 text-[11px] text-slate-600 dark:text-zinc-400 font-medium">
                Multi-stage challenges
              </div>
            </div>

            {/* Card 3: Completed Simulations */}
            <div className="p-5 rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Completed simulations</div>
                <div className="text-3xl font-extrabold text-black dark:text-white mt-1.5 font-mono">+{acceptedCount}</div>
              </div>
              <div className="mt-3 text-[11px] text-slate-600 dark:text-zinc-400 font-medium">
                Verified in Docker sandbox
              </div>
            </div>

            {/* Card 4: Donut Radial Gauge */}
            <div className="p-5 rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] shadow-sm flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Preparedness Overview</div>
                <div className="text-[11px] text-slate-600 dark:text-zinc-400 mt-1">Consistent progress</div>
              </div>
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200 dark:text-zinc-700"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-black dark:text-white"
                    strokeDasharray="78, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-[11px] font-extrabold text-black dark:text-white">78%</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: STUDIO VIEW */}
        {activeTab === 'studio' && (
          <div className="space-y-6">
            
            {/* Quick Profile Link Banner */}
            <div className="p-4 rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 overflow-hidden flex items-center justify-center">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt={profileData.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={18} className="text-black dark:text-white" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-black dark:text-white">
                    {profileData.name || 'Developer Profile'}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                    {profileData.organization || 'Greenfield High School'} &bull; {profileData.location || 'India'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('profile')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-black dark:text-white text-xs font-semibold transition-all border border-slate-200 dark:border-zinc-700 flex items-center gap-1.5"
              >
                Edit Profile & Photo
                <ArrowUpRight size={14} />
              </button>
            </div>

            {/* Assigned Simulation Table */}
            <div className="rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm font-bold text-black dark:text-white">
                    Assigned Simulation
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                    Simulations assigned for algorithmic practice
                  </p>
                </div>

                <button 
                  onClick={() => setActiveTab('problems')}
                  className="text-xs font-semibold text-black dark:text-white hover:underline text-left sm:text-right"
                >
                  View all assignments
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#181818] text-zinc-400 font-semibold border-b border-[#2d2d2d] text-[11px]">
                    <tr>
                      <th className="py-3 px-5">Simulation</th>
                      <th className="py-3 px-5">Difficulty</th>
                      <th className="py-3 px-5">Assigned on</th>
                      <th className="py-3 px-5">Due date</th>
                      <th className="py-3 px-5">Status</th>
                      <th className="py-3 px-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2d2d2d]">
                    {problems.slice(0, 4).map((prob, idx) => (
                      <tr key={prob.id} className="hover:bg-[#252525] transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="font-bold text-white text-xs">{prob.title}</div>
                          <div className="text-[11px] text-zinc-400 mt-0.5 max-w-sm truncate">
                            {prob.description || 'Learn how to optimize memory and execution time across stages.'}
                          </div>
                        </td>
                        <td className="py-3.5 px-5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                            prob.difficulty === 'Easy'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : prob.difficulty === 'Medium'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}>
                            {prob.difficulty}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-zinc-400">
                          {idx === 0 ? '30 Jun 2026' : idx === 1 ? '18 Jun 2026' : '15 Jun 2026'}
                        </td>
                        <td className="py-3.5 px-5 text-zinc-400">
                          {idx === 0 ? '28 Jun 2026' : idx === 1 ? '25 Jun 2026' : '20 Jun 2026'}
                        </td>
                        <td className="py-3.5 px-5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                            idx === 2 
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60' 
                              : 'bg-[#262626] text-zinc-400 border border-[#333333]'
                          }`}>
                            {idx === 2 ? 'Completed' : 'Not Started'}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <button
                            onClick={() => onSelectProblem(prob.id)}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-sm"
                          >
                            {idx === 2 ? 'View result' : 'Start now'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Adaptive Learning Panel */}
            <div className="rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] shadow-sm p-6 space-y-6">
              <div>
                <h2 className="text-base font-extrabold text-white">
                  AI Adaptive Learning
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Personalized learning that adapts to your performance and helps you improve.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-[#181818] border border-[#2d2d2d] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Your Learning Intelligence</div>
                      <div className="text-[11px] text-zinc-400">Insight based on your performance</div>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-400 font-mono bg-[#222222] px-2.5 py-1 rounded-xl border border-[#333333]">
                      100%
                    </span>
                  </div>

                  <div className="pt-2">
                    <div className="text-sm font-bold text-black dark:text-white">Good Work!</div>
                    <div className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5">
                      You're improving consistently. +12% from last week.
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 dark:border-zinc-800">
                    <div className="text-xs font-bold text-black dark:text-white mb-2">Strong Areas</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-medium text-black dark:text-white">
                        Flood Response / DP
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-medium text-black dark:text-white">
                        First Aid / Two-Pointers
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-medium text-black dark:text-white">
                        Earthquake Basics
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800 space-y-4">
                  <div>
                    <div className="text-xs font-bold text-black dark:text-white">Learning Focus Areas</div>
                    <div className="text-[11px] text-slate-500 dark:text-zinc-400">Topics you should focus on</div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-black dark:text-white">Fire Evacuation / Recursion Depth</span>
                      <span className="text-[11px] font-semibold text-slate-700 dark:text-zinc-300">Weak 35% Score</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-black dark:bg-white h-full w-[35%]" />
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-zinc-400">
                      Understand safe evacuation routes, exit points, and call stack boundaries.
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-black dark:text-white">Emergency Planning / Memory Allocation</span>
                      <span className="text-[11px] font-semibold text-slate-700 dark:text-zinc-300">Average 50% Score</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-black dark:bg-white h-full w-[50%]" />
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-zinc-400">
                      Learn how to optimize space tradeoffs and memory footprint limits.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submissions Telemetry Table */}
            <div className="rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-black dark:text-white flex items-center gap-2">
                    <Clock size={16} />
                    Live Submission Telemetry Feed
                  </h2>
                  <span className="text-[11px] text-slate-500 dark:text-zinc-400">Docker container isolation with cgroup limits</span>
                </div>
                <span className="text-xs text-slate-600 dark:text-zinc-400 font-mono bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-xl">
                  {submissions.length} Recorded Runs
                </span>
              </div>

              {loading ? (
                <div className="py-12 text-center text-slate-500 dark:text-zinc-400 text-xs">
                  Loading submission telemetry...
                </div>
              ) : submissions.length === 0 ? (
                <div className="py-12 text-center text-slate-500 dark:text-zinc-400 text-xs">
                  No submissions recorded yet. Open a problem to begin evaluation.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/70 dark:bg-zinc-900/50 text-slate-500 dark:text-zinc-400 font-bold border-b border-slate-200/80 dark:border-zinc-800/80 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-5">Verdict</th>
                        <th className="py-3 px-5">Language</th>
                        <th className="py-3 px-5">Runtime</th>
                        <th className="py-3 px-5">Virtual Memory</th>
                        <th className="py-3 px-5">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 font-mono">
                      {submissions.slice(0, 6).map((sub) => (
                        <tr key={sub.id} className="hover:bg-slate-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                          <td className="py-3.5 px-5">
                            <VerdictBadge verdict={sub.verdict} />
                          </td>
                          <td className="py-3.5 px-5 uppercase text-black dark:text-white font-semibold">
                            {sub.language || 'cpp'}
                          </td>
                          <td className="py-3.5 px-5 text-black dark:text-white">
                            {sub.execution_time_ms !== null ? `${sub.execution_time_ms} ms` : '—'}
                          </td>
                          <td className="py-3.5 px-5 text-black dark:text-white">
                            {sub.memory_used_kb !== null ? `${sub.memory_used_kb} KB` : '—'}
                          </td>
                          <td className="py-3.5 px-5 text-slate-500 dark:text-zinc-400 font-sans text-xs">
                            {new Date(sub.created_at).toLocaleString()}
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

        {/* TAB 2: PROBLEMS VIEW */}
        {activeTab === 'problems' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] shadow-sm flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search challenges by title, category, or algorithmic topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/70 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-xs text-black dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-black dark:focus:border-white"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  aria-label="Filter problems by difficulty"
                  className="px-3.5 py-2.5 rounded-xl bg-slate-50/70 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white cursor-pointer"
                >
                  <option value="ALL">All Difficulties</option>
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>

                <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 px-2">
                  {filteredProblems.length} Found
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {filteredProblems.length === 0 ? (
                <div className="py-16 text-center text-slate-500 dark:text-zinc-400 text-xs bg-white dark:bg-[#181B22] rounded-2xl border border-slate-200/90 dark:border-zinc-800">
                  No problems match your current filter.
                </div>
              ) : (
                filteredProblems.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onSelectProblem(p.id)}
                    className="p-5 rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] hover:border-black dark:hover:border-white transition-all cursor-pointer flex items-center justify-between group shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-zinc-800 text-black dark:text-white flex items-center justify-center font-mono font-bold text-xs border border-slate-200 dark:border-zinc-700">
                        #{p.id}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-black dark:text-white transition-colors flex items-center gap-2">
                          {p.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-zinc-400 mt-1">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-zinc-800 text-black dark:text-white border border-slate-200 dark:border-zinc-700">
                            {p.difficulty}
                          </span>
                          <span className="flex items-center gap-1 font-mono text-[11px]">
                            <Layers size={12} />
                            Multi-Stage Progressive
                          </span>
                          <span className="text-[11px] font-mono">Limit: {p.time_limit_ms}ms</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="hidden sm:inline-block text-xs font-semibold text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        Solve Challenge
                      </span>
                      <div className="p-2 rounded-xl bg-black text-white dark:bg-white dark:text-black transition-colors">
                        <ArrowUpRight size={15} />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: JOURNEY VIEW */}
        {activeTab === 'journey' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-4">
                <div>
                  <h2 className="text-base font-bold text-black dark:text-white">
                    Stage Progression & Complexity Drops
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    Algorithmic Evolution Timeline across attempts
                  </p>
                </div>
                <div className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                  Target: O(N²) → O(N log N) → O(N)
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">Total Runtime Drop</span>
                  <span className="text-2xl font-bold font-mono text-black dark:text-white mt-1 block">-84.2%</span>
                  <span className="text-[10px] text-slate-500 dark:text-zinc-400 mt-0.5 block">From 420ms (Stage 1) down to 66ms (Stage 2)</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">Complexity Shift</span>
                  <span className="text-2xl font-bold font-mono text-black dark:text-white mt-1 block">O(N²) → O(N log N)</span>
                  <span className="text-[10px] text-slate-500 dark:text-zinc-400 mt-0.5 block">Eliminated brute force iterations</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">Memory Footprint Delta</span>
                  <span className="text-2xl font-bold font-mono text-black dark:text-white mt-1 block">+128 KB</span>
                  <span className="text-[10px] text-slate-500 dark:text-zinc-400 mt-0.5 block">Tradeoff: Hash mapping for speedup</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-black dark:text-white flex items-center gap-1.5">
                    <TrendingUp size={14} />
                    Latency Drop Trend Over Recent Attempts (ms)
                  </span>
                  <span className="font-mono text-[10px] text-slate-500 dark:text-zinc-400">12 Attempts Logged</span>
                </div>

                <div className="h-28 flex items-end gap-2 pt-3">
                  {sparklineBars.map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                      <div 
                        className={`w-full rounded-t-lg transition-all ${
                          i >= sparklineBars.length - 3 ? 'bg-emerald-500 shadow-sm shadow-emerald-500/30' : 'bg-[#333333]'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-[9px] font-mono text-zinc-500">#{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TELEMETRY VIEW */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <Cpu size={16} /> AST Syntax Tree Diagnostics
                </div>
                <h3 className="text-base font-bold text-white">
                  Static Code Analysis & Pattern Detection
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Automated parser extracts control flow graphs, loop nesting depths, and memory allocations directly from C++ syntax trees before compilation.
                </p>

                <div className="p-4 rounded-xl bg-[#141414] border border-[#2d2d2d] space-y-2 font-mono text-xs">
                  <div className="flex justify-between py-1 border-b border-[#262626]">
                    <span className="text-zinc-400">Parser Status:</span>
                    <span className="text-emerald-400 font-semibold">PASS (0 syntax errors)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#262626]">
                    <span className="text-zinc-400">Max Loop Nesting Depth:</span>
                    <span className="text-white font-semibold">1 (Linear scan)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#262626]">
                    <span className="text-zinc-400">Recursion Detected:</span>
                    <span className="text-white font-semibold">False</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-400">Detected Complexity:</span>
                    <span className="text-emerald-400 font-bold">O(N log N)</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <ShieldCheck size={16} /> Docker Containment Telemetry
                </div>
                <h3 className="text-base font-bold text-white">
                  Kernel cgroup Isolation Quotas
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Real-time containment metrics reporting enforced hardware boundaries, syscall filtering (seccomp), and network blocking.
                </p>

                <div className="p-4 rounded-xl bg-[#141414] border border-[#2d2d2d] space-y-2 font-mono text-xs">
                  <div className="flex justify-between py-1 border-b border-[#262626]">
                    <span className="text-zinc-400">Network Sockets:</span>
                    <span className="text-white font-semibold">DISABLED (Strict Sandbox)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#262626]">
                    <span className="text-zinc-400">CPU Time Quota:</span>
                    <span className="text-white font-semibold">1000 ms Max Limit</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#262626]">
                    <span className="text-zinc-400">Virtual Memory Cap:</span>
                    <span className="text-white font-semibold">256 MB cgroup limit</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-400">Process Count Limit:</span>
                    <span className="text-white font-semibold">pids.max = 16</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] shadow-sm overflow-hidden">
              <div className="p-5 border-b border-[#2d2d2d] flex items-center justify-between">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock size={16} className="text-emerald-400" />
                  All Historical Sandbox Runs
                </h2>
                <span className="text-xs font-mono text-zinc-400">
                  {submissions.length} Total Submissions
                </span>
              </div>

              {submissions.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 text-xs">
                  No submissions to display.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#181818] text-zinc-400 font-bold border-b border-[#2d2d2d] uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-5">ID</th>
                        <th className="py-3 px-5">Verdict</th>
                        <th className="py-3 px-5">Runtime</th>
                        <th className="py-3 px-5">Virtual Memory</th>
                        <th className="py-3 px-5">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2d2d2d]">
                      {submissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-[#252525] transition-colors">
                          <td className="py-3.5 px-5 text-zinc-400">#{sub.id}</td>
                          <td className="py-3.5 px-5">
                            <VerdictBadge verdict={sub.verdict} />
                          </td>
                          <td className="py-3.5 px-5 text-white">
                            {sub.execution_time_ms !== null ? `${sub.execution_time_ms} ms` : '—'}
                          </td>
                          <td className="py-3.5 px-5 text-white">
                            {sub.memory_used_kb !== null ? `${sub.memory_used_kb} KB` : '—'}
                          </td>
                          <td className="py-3.5 px-5 text-zinc-400 font-sans text-xs">
                            {new Date(sub.created_at).toLocaleString()}
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

        {/* TAB 5: PROFILE VIEW (PDF Screen 12 Layout) */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            
            {profileSaved && (
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 flex items-center justify-between text-xs text-black dark:text-white shadow-sm">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 size={16} />
                  Profile details and photo updated successfully!
                </div>
                <button
                  onClick={() => setActiveTab('studio')}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
                >
                  Move to Dashboard →
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Avatar & Overview */}
              <div className="lg:col-span-4 rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] p-6 shadow-sm flex flex-col items-center text-center space-y-5">
                
                {/* Avatar Display */}
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-[#181818] border-2 border-[#333333] flex items-center justify-center overflow-hidden shadow-sm">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt={profileData.name || 'User Avatar'} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-extrabold text-white">
                        {profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                    )}
                  </div>
                  
                  <label 
                    htmlFor="avatar-upload-btn"
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 cursor-pointer shadow-md hover:scale-105 transition-all"
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
                  <h2 className="text-lg font-bold text-white">
                    {profileData.name || 'Developer'}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {user?.email || profileData.email || 'developer@algomind.dev'}
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#262626] text-emerald-400 border border-[#333333]">
                    Software Developer
                  </span>
                </div>

                <div className="w-full flex items-center justify-center gap-2 pt-1">
                  <label 
                    htmlFor="avatar-upload-btn" 
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Upload size={13} />
                    Upload Photo
                  </label>
                  {avatarPreview && (
                    <button 
                      type="button" 
                      onClick={() => setAvatarPreview(null)}
                      className="px-3 py-1.5 rounded-xl bg-[#282828] text-zinc-300 text-xs font-semibold hover:bg-[#333333] transition-colors border border-[#383838]"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Quick Stats from PDF Screen 12 */}
                <div className="w-full pt-4 border-t border-[#2d2d2d] space-y-3 text-left">
                  <div className="text-xs font-bold text-white">Quick Stats</div>
                  
                  <div className="p-3 rounded-xl bg-[#181818] border border-[#2d2d2d] flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Simulations Completed</span>
                    <span className="text-sm font-bold font-mono text-emerald-400">+{acceptedCount}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#181818] border border-[#2d2d2d] flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Total Learning Time</span>
                    <span className="text-sm font-bold font-mono text-white">8h 16m</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#181818] border border-[#2d2d2d] flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Preparedness Score</span>
                    <span className="text-sm font-bold font-mono text-emerald-400">{solveRate}%</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Personal Information Form */}
              <div className="lg:col-span-8 rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-4">
                  <div>
                    <h2 className="text-base font-extrabold text-black dark:text-white">
                      Personal Information
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                      Enter and update your personal details and developer background
                    </p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setActiveTab('studio')}
                    className="text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Move to Dashboard →
                  </button>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Full Name
                      </label>
                      <input 
                        type="text"
                        required
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#141414] border border-[#2e2e2e] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Email Address
                      </label>
                      <input 
                        type="email"
                        disabled
                        value={user?.email || profileData.email}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#141414]/50 border border-[#282828] text-xs text-zinc-500 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Mobile / Phone Number
                      </label>
                      <input 
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#141414] border border-[#2e2e2e] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                        placeholder="+91 9876543210"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        School / Organization
                      </label>
                      <input 
                        type="text"
                        value={profileData.organization}
                        onChange={(e) => setProfileData(prev => ({ ...prev, organization: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#141414] border border-[#2e2e2e] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                        placeholder="e.g. Greenfield High School"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Address / Location
                    </label>
                    <input 
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#141414] border border-[#2e2e2e] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                      placeholder="e.g. Coimbatore, India"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Bio / Description
                    </label>
                    <textarea 
                      rows={3}
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#141414] border border-[#2e2e2e] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 leading-relaxed"
                      placeholder="Tell us about your algorithmic journey..."
                    />
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <Save size={14} />
                      Save Details & Photo
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('studio')}
                      className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#282828] hover:bg-[#333333] text-zinc-300 text-xs font-medium transition-colors border border-[#383838] flex items-center justify-center gap-1.5"
                    >
                      Move to Dashboard →
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
              <div className="p-4 rounded-2xl bg-[#1e1e1e] border border-emerald-500/30 flex items-center justify-between text-xs text-white shadow-sm">
                <div className="flex items-center gap-2 font-semibold text-emerald-400">
                  <CheckCircle2 size={16} />
                  Settings saved successfully!
                </div>
                <button
                  onClick={() => setActiveTab('studio')}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
                >
                  Move to Dashboard →
                </button>
              </div>
            )}

            <div className="max-w-4xl space-y-6">
              
              {/* Appearance & Theme */}
              <div className="rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] p-6 shadow-sm space-y-4">
                <div>
                  <h2 className="text-base font-bold text-white">Appearance & Theme</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Customize interface theme for day and night practice</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => { if (isDark) toggleTheme(); }}
                    className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                      !isDark 
                        ? 'border-emerald-500 bg-[#262626] text-white shadow-sm font-bold' 
                        : 'border-[#2d2d2d] bg-[#181818] text-zinc-400 hover:bg-[#222222]'
                    }`}
                  >
                    <Sun size={20} className={!isDark ? 'text-emerald-400' : 'text-zinc-500'} />
                    <div className="text-left">
                      <div className="text-xs font-bold text-white">Light Mode</div>
                      <div className="text-[10px] text-zinc-400">High contrast day theme</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { if (!isDark) toggleTheme(); }}
                    className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                      isDark 
                        ? 'border-emerald-500 bg-[#262626] text-white shadow-sm font-bold' 
                        : 'border-[#2d2d2d] bg-[#181818] text-zinc-400 hover:bg-[#222222]'
                    }`}
                  >
                    <Moon size={20} className={isDark ? 'text-emerald-400' : 'text-zinc-500'} />
                    <div className="text-left">
                      <div className="text-xs font-bold text-white">Dark Mode</div>
                      <div className="text-[10px] text-zinc-400">Deep graphite IDE theme</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Code Editor Settings */}
              <div className="rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] p-6 shadow-sm space-y-4">
                <div>
                  <h2 className="text-base font-bold text-white">Code Editor Preferences</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Configure Monaco editor typography and indentation</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Font Size
                    </label>
                    <select
                      value={editorSettings.fontSize}
                      onChange={(e) => setEditorSettings(prev => ({ ...prev, fontSize: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#2e2e2e] text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="12">12px — Compact</option>
                      <option value="14">14px — Standard</option>
                      <option value="16">16px — Large</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Tab Indentation
                    </label>
                    <select
                      value={editorSettings.tabSize}
                      onChange={(e) => setEditorSettings(prev => ({ ...prev, tabSize: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#2e2e2e] text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="2">2 Spaces (Google C++ Style)</option>
                      <option value="4">4 Spaces (Standard)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Account Security Info */}
              <div className="rounded-2xl bg-[#1e1e1e] border border-[#2d2d2d] p-6 shadow-sm space-y-4">
                <div>
                  <h2 className="text-base font-bold text-white">Account & Authentication</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Your sign-in credentials and security</p>
                </div>

                <div className="p-4 rounded-xl bg-[#181818] border border-[#2d2d2d] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">Registered Email</div>
                    <div className="text-xs text-zinc-400 mt-0.5">{user?.email || 'user@algomind.dev'}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                    Verified
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Save size={14} />
                  Save Settings
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('studio')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#282828] text-zinc-300 text-xs font-semibold hover:bg-[#333333] transition-colors border border-[#383838] flex items-center justify-center gap-1.5"
                >
                  Move to Dashboard →
                </button>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}
