import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Algomind UI runtime exception:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f2f4f7] dark:bg-[#121212] text-slate-900 dark:text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-[#e0e2e6] dark:border-[#2e2e2e] shadow-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center font-bold text-xl">
              !
            </div>
            <h2 className="text-xl font-bold">Something went wrong</h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              An unexpected display error occurred while rendering the page.
            </p>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#121212] text-[11px] font-mono text-left text-rose-600 dark:text-rose-400 overflow-auto max-h-32">
              {this.state.error?.message || 'Unknown Error'}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  try {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                  } catch (e) {}
                  window.location.href = '/';
                }}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-[#262626] dark:hover:bg-[#333] dark:text-zinc-200 transition-colors"
              >
                Reset & Home
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
