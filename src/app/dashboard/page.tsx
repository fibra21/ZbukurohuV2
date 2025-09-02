'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { CustomerDashboard } from '@/components/dashboard/CustomerDashboard';
import { DistributorDashboard } from '@/components/dashboard/DistributorDashboard';
import { BusinessDashboard } from '@/components/dashboard/BusinessDashboard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { RoleGuard } from '@/components/auth/withRoleGuard';

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user.role === 'customer' && (
        <RoleGuard allowedRoles={['customer']}>
          <CustomerDashboard user={user} />
        </RoleGuard>
      )}
      {user.role === 'distributor' && (
        <RoleGuard allowedRoles={['distributor']}>
          <DistributorDashboard user={user} />
        </RoleGuard>
      )}
      {user.role === 'business' && (
        <RoleGuard allowedRoles={['business']}>
          <BusinessDashboard user={user} />
        </RoleGuard>
      )}
    </div>
  );
}
