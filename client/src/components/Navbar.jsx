import React, { useState } from 'react';
import { 
  Terminal, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  User, 
  LogOut, 
  Shield, 
  LogIn, 
  UserPlus, 
  LayoutDashboard,
  Code2,
  Compass
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onNavigate, currentPage }) {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    onNavigate('dashboard');
    setMobileMenuOpen(false);
  };

  return (
    <header className="border-b border-[#e2e4e8] dark:border-[#2d2d2d] bg-[#f8f9fa] dark:bg-[#1a1a1a] sticky top-0 z-40 transition-colors duration-150 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div
          onClick={() => handleNav(isAuthenticated ? 'dashboard' : 'landing')}
          className="flex items-center gap-2 cursor-pointer group"
          title="Algomind"
        >
          <div className="h-7 w-auto flex items-center">
            <img 
              src="/logo.png" 
              alt="Algomind Logo" 
              className="h-full w-auto object-contain brightness-105 dark:brightness-110 drop-shadow-sm group-hover:scale-105 transition-transform" 
            />
          </div>
        </div>

        {/* Center: Navigation */}
        {isAuthenticated ? (
          <nav className="hidden md:flex items-center gap-1 bg-[#edeef1] dark:bg-[#262626] p-1 rounded-lg border border-[#e0e2e6] dark:border-[#333333]">
            <button
              onClick={() => handleNav('dashboard')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                currentPage === 'dashboard'
                  ? 'text-slate-900 bg-white shadow-sm font-semibold border-t-2 border-emerald-500 dark:text-white dark:bg-[#1e1e1e]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-[#2d2d2d]'
              }`}
            >
              <LayoutDashboard size={13} className={currentPage === 'dashboard' ? 'text-emerald-500' : ''} />
              Studio Dashboard
            </button>

            <button
              onClick={() => handleNav('problems')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                currentPage === 'problems' || currentPage === 'problem-detail'
                  ? 'text-slate-900 bg-white shadow-sm font-semibold border-t-2 border-emerald-500 dark:text-white dark:bg-[#1e1e1e]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-[#2d2d2d]'
              }`}
            >
              <Code2 size={13} className={currentPage === 'problems' ? 'text-emerald-500' : ''} />
              Problems
            </button>

            {user?.role === 'ADMIN' && (
              <button
                onClick={() => handleNav('admin')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                  currentPage === 'admin'
                    ? 'text-slate-900 bg-white shadow-sm font-semibold border-t-2 border-emerald-500 dark:text-white dark:bg-[#1e1e1e]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-[#2d2d2d]'
                }`}
              >
                <Shield size={13} />
                Admin
              </button>
            )}
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-zinc-400">
            <button 
              onClick={() => handleNav('landing')} 
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Home
            </button>
            <a 
              href="#features" 
              onClick={() => handleNav('landing')} 
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => handleNav('landing')} 
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              How it Works
            </a>
            <a 
              href="#about" 
              onClick={() => handleNav('landing')} 
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              About
            </a>
          </nav>
        )}

        {/* Right Controls: [Theme Toggle + Sign In / User Avatar] */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle light/dark theme"
            title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-[#edeef1] dark:text-zinc-400 dark:hover:text-amber-400 dark:hover:bg-[#262626] transition-colors border border-transparent hover:border-[#e0e2e6] dark:hover:border-[#333333]"
          >
            {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-slate-700" />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2.5">
              <div 
                onClick={() => handleNav('profile')}
                className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-lg bg-white dark:bg-[#262626] border border-[#e0e2e6] dark:border-[#333333] cursor-pointer hover:border-slate-300 dark:hover:border-[#444] transition-colors shadow-sm"
                title="View Profile"
              >
                <div className="w-6 h-6 rounded bg-[#edeef1] dark:bg-[#333333] text-slate-800 dark:text-white flex items-center justify-center font-bold text-xs overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name || 'User'} className="w-full h-full object-cover" />
                  ) : user?.name ? (
                    user.name.charAt(0).toUpperCase()
                  ) : (
                    <User size={12} />
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 truncate max-w-[110px]">
                      {user?.name || user?.username}
                    </span>
                    {user?.role === 'ADMIN' && (
                      <span className="text-[9px] bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 px-1 rounded uppercase font-bold">
                        Admin
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-zinc-500 truncate max-w-[110px]">{user?.email}</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="Log out"
                className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:text-zinc-400 dark:hover:text-rose-400 dark:hover:bg-rose-950/40 rounded-lg transition-all"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => handleNav('signin')}
                className={`text-xs font-medium transition-colors px-3 py-1.5 rounded-lg ${
                  currentPage === 'signin'
                    ? 'text-slate-900 bg-white font-semibold border border-[#e0e2e6] shadow-sm dark:text-white dark:bg-[#262626] dark:border-[#333333]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-[#262626]'
                }`}
              >
                Login
              </button>

              <button
                onClick={() => handleNav('signup')}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5"
              >
                Get started
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
        <div className="md:hidden border-b border-[#e2e4e8] dark:border-zinc-800 bg-[#f8f9fa] dark:bg-[#1a1a1a] px-4 py-4 space-y-2 shadow-lg">
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
          {!isAuthenticated && (
            <>
              <button
                onClick={() => handleNav('landing')}
                className="w-full text-left px-3 py-2 rounded-xl text-sm text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 flex items-center gap-2 font-medium"
              >
                <Compass size={16} /> Overview
              </button>
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-200 dark:border-zinc-800">
                <button
                  onClick={() => handleNav('signin')}
                  className="w-full py-2.5 rounded-xl text-center text-sm font-semibold text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 flex items-center justify-center gap-2"
                >
                  <LogIn size={15} /> Login
                </button>
                <button
                  onClick={() => handleNav('signup')}
                  className="w-full py-2.5 rounded-xl text-center text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-500 flex items-center justify-center gap-2 shadow-sm"
                >
                  <UserPlus size={15} /> Get started
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}
