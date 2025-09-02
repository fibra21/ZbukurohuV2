'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { CustomerDashboard } from '@/components/dashboard/CustomerDashboard';
import { DistributorDashboard } from '@/components/dashboard/DistributorDashboard';
import { BusinessDashboard } from '@/components/dashboard/BusinessDashboard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user.role === 'customer' && <CustomerDashboard user={user} />}
      {user.role === 'distributor' && <DistributorDashboard user={user} />}
      {user.role === 'business' && <BusinessDashboard user={user} />}
    </div>
  );
}
