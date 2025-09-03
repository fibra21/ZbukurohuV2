'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-neutral-600 mb-6">
                We&apos;re sorry, but something unexpected happened. Please try refreshing the page or go back to the homepage.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full flex items-center justify-center space-x-2 bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-primary-dark transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Refresh Page</span>
              </button>

              <Link
                href="/"
                className="w-full flex items-center justify-center space-x-2 bg-neutral-100 text-neutral-700 px-6 py-3 rounded-lg hover:bg-neutral-200 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Go to Homepage</span>
              </Link>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-neutral-600 hover:text-neutral-800">
                  Error Details (Development)
                </summary>
                <div className="mt-2 p-4 bg-neutral-100 rounded-lg text-xs font-mono text-neutral-700 overflow-auto">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.toString()}
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="mt-1 whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo);
    // You can send error to your error reporting service here
  };
}
