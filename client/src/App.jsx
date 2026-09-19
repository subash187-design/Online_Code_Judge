import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ProblemListPage from './pages/ProblemListPage';
import ProblemDetailPage from './pages/ProblemDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function getRouteFromPath(pathname, isAuthenticated) {
  const path = pathname.toLowerCase().replace(/\/$/, '');
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const problemId = searchParams?.get('id');
  if (problemId && (path === '/problems' || path === '')) {
    return isAuthenticated ? 'problem-detail' : 'signin';
  }
  if (!path || path === '') return isAuthenticated ? 'dashboard' : 'landing';
  if (path === '/landing') return 'landing';
  if (path === '/signin' || path === '/login') return 'signin';
  if (path === '/signup' || path === '/register') return 'signup';
  if (path === '/verify-email') return 'verify-email';
  if (path === '/dashboard') return isAuthenticated ? 'dashboard' : 'signin';
  if (path === '/profile') return isAuthenticated ? 'profile' : 'signin';
  if (path === '/settings') return isAuthenticated ? 'settings' : 'signin';
  if (path === '/admin') return 'admin';
  if (path === '/problems') return isAuthenticated ? 'problems' : 'signin';
  return isAuthenticated ? 'dashboard' : 'landing';
}

function getPathFromRoute(route, params = {}, isAuthenticated = false) {
  switch (route) {
    case 'landing': return '/';
    case 'dashboard': return '/dashboard';
    case 'profile': return '/profile';
    case 'settings': return '/settings';
    case 'signin': return '/signin';
    case 'signup': return '/signup';
    case 'verify-email': return '/verify-email';
    case 'admin': return '/admin';
    case 'problems': return '/problems';
    case 'problem-detail': return `/problems?id=${params.problemId || ''}`;
    default: return '/';
  }
}

function MainApp() {
  const { user, isAuthenticated, loading } = useAuth();
  
  const [currentRoute, setCurrentRoute] = useState(() => {
    return getRouteFromPath(window.location.pathname, isAuthenticated);
  });
  const [selectedProblemId, setSelectedProblemId] = useState(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      return searchParams.get('id') || null;
    }
    return null;
  });
  const [routeParams, setRouteParams] = useState({});

  useEffect(() => {
    if (!loading) {
      const route = getRouteFromPath(window.location.pathname, isAuthenticated);
      const searchParams = new URLSearchParams(window.location.search);
      const pid = searchParams.get('id');
      if (pid) setSelectedProblemId(pid);
      setCurrentRoute(route);
    }
  }, [isAuthenticated, loading]);

  useEffect(() => {
    const handlePopState = () => {
      const route = getRouteFromPath(window.location.pathname, isAuthenticated);
      const searchParams = new URLSearchParams(window.location.search);
      const pid = searchParams.get('id');
      setSelectedProblemId(pid || null);
      setCurrentRoute(route);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isAuthenticated]);

  const navigate = (route, params = {}) => {
    setRouteParams(params);
    setCurrentRoute(route);
    
    const targetUrl = getPathFromRoute(route, params, isAuthenticated);
    window.history.pushState({}, '', targetUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProblem = (id) => {
    setSelectedProblemId(id);
    navigate('problem-detail', { problemId: id });
  };

  const handleBackToList = () => {
    setSelectedProblemId(null);
    navigate('problems');
  };

  const renderCurrentPage = () => {
    if (loading) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center text-slate-500 dark:text-zinc-400 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping"></span>
            Loading intelligence platform...
          </div>
        </div>
      );
    }

    switch (currentRoute) {
      case 'dashboard':
        return <UserDashboardPage onNavigate={navigate} onSelectProblem={handleSelectProblem} initialTab="studio" />;

      case 'profile':
        return <UserDashboardPage onNavigate={navigate} onSelectProblem={handleSelectProblem} initialTab="profile" />;

      case 'settings':
        return <UserDashboardPage onNavigate={navigate} onSelectProblem={handleSelectProblem} initialTab="settings" />;

      case 'landing':
        return <LandingPage onNavigate={navigate} />;

      case 'signin':
        if (isAuthenticated) {
          return user?.role === 'ADMIN' ? (
            <AdminDashboardPage onNavigate={navigate} />
          ) : (
            <UserDashboardPage onNavigate={navigate} onSelectProblem={handleSelectProblem} />
          );
        }
        return <LoginPage onNavigate={navigate} />;

      case 'signup':
        if (isAuthenticated) {
          return <UserDashboardPage onNavigate={navigate} onSelectProblem={handleSelectProblem} />;
        }
        return <RegisterPage onNavigate={navigate} />;

      case 'verify-email':
        return (
          <VerifyEmailPage
            initialEmail={routeParams.email}
            onNavigate={navigate}
          />
        );

      case 'admin':
        if (!isAuthenticated) {
          return <LoginPage onNavigate={navigate} />;
        }
        return <AdminDashboardPage onNavigate={navigate} />;

      case 'problems':
        return <ProblemListPage onSelectProblem={handleSelectProblem} />;

      case 'problem-detail':
        return selectedProblemId ? (
          <ProblemDetailPage
            problemId={selectedProblemId}
            onBack={handleBackToList}
            onNavigateProblem={handleSelectProblem}
          />
        ) : (
          <ProblemListPage onSelectProblem={handleSelectProblem} />
        );

      default:
        return <UserDashboardPage onNavigate={navigate} onSelectProblem={handleSelectProblem} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-brand-500/20 selection:text-brand-700 dark:selection:text-brand-300 transition-colors duration-200">
      {currentRoute !== 'problem-detail' && (
        <Navbar onNavigate={navigate} currentPage={currentRoute} />
      )}
      <main className={`flex-1 ${currentRoute === 'problem-detail' ? 'h-screen overflow-hidden' : ''}`}>
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
