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

function getRouteFromPath(pathname) {
  const path = pathname.toLowerCase().replace(/\/$/, '');
  if (!path || path === '') return 'landing';
  if (path === '/signin' || path === '/login') return 'signin';
  if (path === '/signup' || path === '/register') return 'signup';
  if (path === '/verify-email') return 'verify-email';
  if (path === '/dashboard') return 'dashboard';
  if (path === '/admin') return 'admin';
  if (path === '/problems') return 'problems';
  return 'landing';
}

function getPathFromRoute(route, params = {}) {
  switch (route) {
    case 'landing': return '/';
    case 'signin': return '/signin';
    case 'signup': return '/signup';
    case 'verify-email': return '/verify-email';
    case 'dashboard': return '/dashboard';
    case 'admin': return '/admin';
    case 'problems': return '/problems';
    case 'problem-detail': return `/problems?id=${params.problemId || ''}`;
    default: return '/';
  }
}

function MainApp() {
  const { user, isAuthenticated, loading } = useAuth();
  
  const [currentRoute, setCurrentRoute] = useState(() => {
    return getRouteFromPath(window.location.pathname);
  });
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [routeParams, setRouteParams] = useState({});

  useEffect(() => {
    const handlePopState = () => {
      const route = getRouteFromPath(window.location.pathname);
      setCurrentRoute(route);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route, params = {}) => {
    setRouteParams(params);
    setCurrentRoute(route);
    
    const targetUrl = getPathFromRoute(route, params);
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
            Loading authentication status...
          </div>
        </div>
      );
    }

    switch (currentRoute) {
      case 'landing':
        if (isAuthenticated) {
          return user?.role === 'ADMIN' ? (
            <AdminDashboardPage onNavigate={navigate} />
          ) : (
            <UserDashboardPage onNavigate={navigate} onSelectProblem={handleSelectProblem} />
          );
        }
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

      case 'dashboard':
        if (!isAuthenticated) {
          return <LoginPage onNavigate={navigate} />;
        }
        return <UserDashboardPage onNavigate={navigate} onSelectProblem={handleSelectProblem} />;

      case 'admin':
        if (!isAuthenticated) {
          return <LoginPage onNavigate={navigate} />;
        }
        return <AdminDashboardPage onNavigate={navigate} />;

      case 'problems':
        if (!isAuthenticated) {
          return <LoginPage onNavigate={navigate} />;
        }
        return <ProblemListPage onSelectProblem={handleSelectProblem} />;

      case 'problem-detail':
        if (!isAuthenticated) {
          return <LoginPage onNavigate={navigate} />;
        }
        return selectedProblemId ? (
          <ProblemDetailPage
            problemId={selectedProblemId}
            onBack={handleBackToList}
          />
        ) : (
          <ProblemListPage onSelectProblem={handleSelectProblem} />
        );

      default:
        return isAuthenticated ? (
          <UserDashboardPage onNavigate={navigate} onSelectProblem={handleSelectProblem} />
        ) : (
          <LandingPage onNavigate={navigate} />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-brand-500/20 selection:text-brand-700 dark:selection:text-brand-300 transition-colors duration-200">
      <Navbar onNavigate={navigate} currentPage={currentRoute} />
      <main className="flex-1">
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
