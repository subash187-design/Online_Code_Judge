import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ProblemListPage from './pages/ProblemListPage';
import ProblemDetailPage from './pages/ProblemDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Helper to normalize browser pathname to app route key
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
  
  // Initialize route from current window.location
  const [currentRoute, setCurrentRoute] = useState(() => {
    return getRouteFromPath(window.location.pathname);
  });
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [routeParams, setRouteParams] = useState({});

  // Sync with browser back/forward history buttons
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
    
    // Update browser URL
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

  // Route protection rules
  const renderCurrentPage = () => {
    if (loading) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center text-slate-500 text-sm">
          Loading authentication status...
        </div>
      );
    }

    switch (currentRoute) {
      case 'landing':
        // If user is already authenticated, redirect them to dashboard
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
      <Navbar onNavigate={navigate} currentPage={currentRoute} />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}