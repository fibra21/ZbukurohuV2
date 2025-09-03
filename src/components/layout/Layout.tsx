'use client';

import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ToastProvider } from '@/components/ui/Toast';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <div className="min-h-screen bg-surface-base flex flex-col overflow-x-hidden">
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
          >
            Skip to main content
          </a>
          
          <Header />
          
          <main 
            id="main-content"
            className="flex-1 w-full"
            role="main"
            tabIndex={-1}
          >
            {children}
          </main>
          
          <Footer />
        </div>
      </ToastProvider>
    </ErrorBoundary>
  );
}
