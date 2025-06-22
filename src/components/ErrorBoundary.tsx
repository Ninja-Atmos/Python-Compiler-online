import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    // You can log error info here
    // console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
          <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
          <p className="mb-2">An unexpected error occurred. Please try refreshing the page.</p>
          <pre className="bg-slate-800 p-4 rounded text-red-400 max-w-xl overflow-auto text-xs">{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary; 