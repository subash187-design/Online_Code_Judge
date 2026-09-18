import React, { useState } from 'react';
import { 
  LogOut, 
  User, 
  Shield, 
  LogIn, 
  UserPlus, 
  LayoutDashboard, 
  Code2, 
  Menu, 
  X,
  Sun,
  Moon,
  Compass
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onNavigate, currentPage }) {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (route) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    onNavigate('dashboard');
    setMobileMenuOpen(false);
  };

  return (
    <header className="border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/85 dark:bg-[#030712]/85 backdrop-blur sticky top-0 z-40 transition-colors duration-200 shadow-soft-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo & Title */}
        <div
          onClick={() => handleNav(isAuthenticated ? 'dashboard' : 'landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="h-8 w-auto flex items-center">
            <img 
              src="/logo.png" 
              alt="Algomind Logo" 
              className="h-full w-auto object-contain dark:brightness-110 drop-shadow-sm group-hover:scale-105 transition-transform" 
            />
          </div>
          <div className="flex items-center">
            <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">Algomind</span>
            <span className="text-[10px] text-brand-600 dark:text-brand-400 ml-2 font-mono px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800/50 font-semibold tracking-wide">
              INTELLIGENCE
            </span>
          </div>
        </div>

        {/* Center: Global Direct Workspace Navigation (Shown for authenticated users) */}
        {isAuthenticated ? (
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/70 dark:bg-zinc-900/70 p-1 rounded-xl border border-slate-200/60 dark:border-zinc-800/60">
            <button
              onClick={() => handleNav('dashboard')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentPage === 'dashboard'
                  ? 'text-slate-900 dark:text-white bg-white dark:bg-zinc-800 shadow-soft-sm'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutDashboard size={14} />
              Studio Dashboard
            </button>

            <button
              onClick={() => handleNav('problems')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentPage === 'problems' || currentPage === 'problem-detail'
                  ? 'text-slate-900 dark:text-white bg-white dark:bg-zinc-800 shadow-soft-sm'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Code2 size={14} />
              Problems
            </button>

            <button
              onClick={() => handleNav('landing')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentPage === 'landing'
                  ? 'text-slate-900 dark:text-white bg-white dark:bg-zinc-800 shadow-soft-sm'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Compass size={14} />
              Overview
            </button>

            {user?.role === 'ADMIN' && (
              <button
                onClick={() => handleNav('admin')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  currentPage === 'admin'
                    ? 'text-brand-600 dark:text-brand-400 bg-white dark:bg-zinc-800 shadow-soft-sm'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400'
                }`}
              >
                <Shield size={14} />
                Admin
              </button>
            )}
          </nav>
        ) : (
          <div className="hidden md:block" />
        )}

        {/* Right Controls: [Theme Toggle] | [Sign In / User Avatar] */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle theme"
            className="p-2 rounded-xl text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-zinc-800/80 hover:bg-slate-200 dark:hover:bg-zinc-700/80 border border-slate-200 dark:border-zinc-700/80 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            {isDark ? (
              <Sun size={17} className="text-amber-400 transition-transform rotate-0 hover:rotate-45" />
            ) : (
              <Moon size={17} className="text-slate-700 transition-transform -rotate-12 hover:rotate-0" />
            )}
          </button>

          <div className="h-5 w-[1px] bg-slate-200 dark:bg-zinc-800" />

          {isAuthenticated ? (
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80">
                <div className="w-7 h-7 rounded-lg bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-xs">
                  {user?.name ? user.name.charAt(0).toUpperCase() : <User size={13} />}
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white truncate max-w-[110px]">
                      {user?.name || user?.username}
                    </span>
                    {user?.role === 'ADMIN' && (
                      <span className="text-[9px] bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 px-1 rounded uppercase font-bold">
                        Admin
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-zinc-400 truncate max-w-[110px]">{user?.email}</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="Log out"
                className="p-2 text-slate-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav('signin')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  currentPage === 'signin'
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 border border-brand-200/60 dark:border-brand-800/60'
                    : 'text-slate-700 dark:text-zinc-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
                }`}
              >
                <LogIn size={14} />
                Sign In
              </button>

              <button
                onClick={() => handleNav('signup')}
                className="px-4 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs font-semibold transition-all shadow-soft-sm hover:shadow-glow-brand flex items-center gap-1.5"
              >
                <UserPlus size={14} />
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle and Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle light/dark theme"
            className="p-2 rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800"
          >
            {isDark ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#030712] px-4 py-4 space-y-2 shadow-lg">
          {isAuthenticated && (
            <>
              <button
                onClick={() => handleNav('dashboard')}
                className="w-full text-left px-3 py-2 rounded-xl text-sm text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 flex items-center gap-2 font-medium"
              >
                <LayoutDashboard size={16} /> Studio Dashboard
              </button>
              <button
                onClick={() => handleNav('problems')}
                className="w-full text-left px-3 py-2 rounded-xl text-sm text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 flex items-center gap-2 font-medium"
              >
                <Code2 size={16} /> Problems
              </button>
            </>
          )}
          <button
            onClick={() => handleNav('landing')}
            className="w-full text-left px-3 py-2 rounded-xl text-sm text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 flex items-center gap-2 font-medium"
          >
            <Compass size={16} /> Overview
          </button>
          {!isAuthenticated && (
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
              <button
                onClick={() => handleNav('signin')}
                className="w-full py-2.5 rounded-xl text-center text-sm font-semibold text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 flex items-center justify-center gap-2"
              >
                <LogIn size={15} /> Sign In
              </button>
              <button
                onClick={() => handleNav('signup')}
                className="w-full py-2.5 rounded-xl text-center text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center gap-2 shadow-sm"
              >
                <UserPlus size={15} /> Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
