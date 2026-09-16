import React, { useState } from 'react';
import { 
  Terminal, 
  LogOut, 
  User, 
  Shield, 
  LogIn, 
  UserPlus, 
  LayoutDashboard, 
  Code2, 
  Menu, 
  X 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onNavigate, currentPage }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (route) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    onNavigate('landing');
    setMobileMenuOpen(false);
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div
          onClick={() => handleNav(isAuthenticated ? 'dashboard' : 'landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400 group-hover:bg-blue-600/20 transition-colors">
            <Terminal size={20} />
          </div>
          <div className="flex items-center">
            <span className="font-bold text-lg text-white tracking-tight">Algomind</span>
            <span className="text-[10px] text-blue-400 ml-1.5 font-mono px-1.5 py-0.5 rounded bg-blue-950/80 border border-blue-800/50 font-semibold">
              JUDGE
            </span>
          </div>
        </div>

        {/* Center: Navigation Links ONLY shown when authenticated */}
        {isAuthenticated ? (
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => handleNav('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1.5 ${
                currentPage === 'dashboard'
                  ? 'text-white bg-slate-800/80 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard size={15} />
              Dashboard
            </button>
            <button
              onClick={() => handleNav('problems')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1.5 ${
                currentPage === 'problems' || currentPage === 'problem-detail'
                  ? 'text-white bg-slate-800/80 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 size={15} />
              Problems
            </button>
            {user?.role === 'ADMIN' && (
              <button
                onClick={() => handleNav('admin')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1.5 ${
                  currentPage === 'admin'
                    ? 'text-amber-300 bg-amber-950/40 border border-amber-800/50 font-medium'
                    : 'text-amber-400/80 hover:text-amber-300'
                }`}
              >
                <Shield size={15} />
                Admin
              </button>
            )}
          </nav>
        ) : null}

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 font-semibold text-xs">
                  {user?.name ? user.name.charAt(0).toUpperCase() : <User size={14} />}
                </div>

                <div className="text-left">
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <span className="truncate max-w-[120px]">{user?.name || user?.username}</span>
                    {user?.role === 'ADMIN' && (
                      <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1 rounded uppercase font-bold">
                        Admin
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate max-w-[130px]">{user?.email}</div>
                </div>

                <button
                  onClick={handleLogout}
                  title="Log out"
                  className="p-2 ml-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 rounded-lg transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav('signin')}
                className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  currentPage === 'signin'
                    ? 'text-white bg-slate-800 font-medium'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <LogIn size={15} />
                Sign In
              </button>

              <button
                onClick={() => handleNav('signup')}
                className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors shadow-sm flex items-center gap-1.5"
              >
                <UserPlus size={15} />
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-900 px-4 py-4 space-y-2">
          {isAuthenticated ? (
            <div className="space-y-2">
              <div className="px-3 py-1 text-xs text-slate-400">
                Signed in as <strong className="text-white">{user?.name || user?.email}</strong> ({user?.role})
              </div>
              <button
                onClick={() => handleNav('dashboard')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 flex items-center gap-2"
              >
                <LayoutDashboard size={16} /> Dashboard
              </button>
              <button
                onClick={() => handleNav('problems')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 flex items-center gap-2"
              >
                <Code2 size={16} /> Problems
              </button>
              {user?.role === 'ADMIN' && (
                <button
                  onClick={() => handleNav('admin')}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-amber-400 hover:bg-slate-800 flex items-center gap-2"
                >
                  <Shield size={16} /> Admin Console
                </button>
              )}
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-rose-400 hover:bg-slate-800 flex items-center gap-2 pt-2 border-t border-slate-800"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleNav('signin')}
                className="w-full py-2 rounded-lg text-center text-sm font-medium text-slate-300 hover:bg-slate-800 flex items-center justify-center gap-2"
              >
                <LogIn size={15} /> Sign In
              </button>
              <button
                onClick={() => handleNav('signup')}
                className="w-full py-2 rounded-lg text-center text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-2"
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