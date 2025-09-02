'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

type UserRole = User['role'];

interface WithRoleGuardProps {
  allowedRoles: UserRole[];
  redirectTo?: string;
  children: React.ReactNode;
}

export function withRoleGuard<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: UserRole[],
  redirectTo: string = '/auth/login'
) {
  return function RoleGuardedComponent(props: P) {
    const { user, isLoading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push(redirectTo);
          return;
        }

        if (user && !allowedRoles.includes(user.role)) {
          // Redirect unauthorized users to appropriate page
          if (user.role === 'customer') {
            router.push('/dashboard');
          } else {
            router.push('/auth/login');
          }
        }
      }
    }, [isLoading, isAuthenticated, user, router, redirectTo]);

    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

// Standalone role guard component for use in JSX
export function RoleGuard({ allowedRoles, redirectTo = '/auth/login', children }: WithRoleGuardProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (user && !allowedRoles.includes(user.role)) {
        if (user.role === 'customer') {
          router.push('/dashboard');
        } else {
          router.push('/auth/login');
        }
      }
    }
  }, [isLoading, isAuthenticated, user, router, redirectTo]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
