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
      setActiveTab(initialTab === 'studio' ? 'profile' : initialTab);
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
        
        {/* Top Header Greeting from PDF */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#e2e4e8] dark:border-zinc-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {activeTab === 'profile' && 'Profile & Account Details'}
              {activeTab === 'edit' && 'Profile Editing'}
              {activeTab === 'settings' && 'Platform Settings'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1 font-normal">
              {activeTab === 'profile' && 'View your personal profile, credentials, and learning progress.'}
              {activeTab === 'edit' && 'Manage your personal details, profile picture, and bio information.'}
              {activeTab === 'settings' && 'Configure theme preferences, code editor, and notification settings.'}
            </p>
          </div>

          {/* Quick Tab Switcher */}
          <div className="flex items-center flex-wrap gap-1.5 bg-[#edeef1] dark:bg-zinc-900 p-1 rounded-xl border border-[#e2e4e8] dark:border-zinc-800">
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
                      <span>&bull;</span>
                      <span className="flex items-center gap-1"><Building size={12} /> {profileData.organization || 'Greenfield High School'}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {profileData.location || 'Coimbatore, India'}</span>
                    </p>
                    <p className="text-xs text-slate-600 dark:text-zinc-300 mt-2.5 max-w-xl italic">
                      "{profileData.bio || 'Algorithm enthusiast learning progressive asymptotic complexities.'}"
                    </p>
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

            {/* Account Details */}
            <div className="rounded-2xl bg-white border border-[#e2e4e8] shadow-sm dark:bg-[#1e1e1e] dark:border-[#2d2d2d] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#e2e4e8] dark:border-[#2d2d2d] pb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <User size={16} className="text-blue-600 dark:text-blue-400" />
                  Personal & Account Details
                </h3>
                <button
                  onClick={() => setActiveTab('edit')}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Edit details
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-[#e2e4e8] dark:border-[#2d2d2d]">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">Full Name</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{profileData.name || 'Developer'}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#e2e4e8] dark:border-[#2d2d2d]">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">Email Address</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{user?.email || profileData.email}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#e2e4e8] dark:border-[#2d2d2d]">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">Phone Number</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{profileData.phone || '+91 9876543210'}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#e2e4e8] dark:border-[#2d2d2d]">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">School / Organization</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{profileData.organization || 'Greenfield High School'}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#e2e4e8] dark:border-[#2d2d2d]">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">Location</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{profileData.location || 'Coimbatore, India'}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">Account Status</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/60">Active Verified</span>
                </div>
              </div>
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
                        placeholder="+91 9876543210"
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
                        placeholder="e.g. Greenfield High School"
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
                      placeholder="e.g. Coimbatore, India"
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
                      placeholder="Tell us about your algorithmic journey..."
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
