'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/contexts/AdminContext';
import { Loader2 } from 'lucide-react';

export default function AdminPage() {
  const { state } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!state.isLoading) {
      if (state.isAuthenticated) {
        // If authenticated, redirect to dashboard
        router.push('/admin/dashboard');
      } else {
        // If not authenticated, redirect to login
        router.push('/admin/login');
      }
    }
  }, [state.isAuthenticated, state.isLoading, router]);

  // Show loading spinner while checking authentication or redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-muted-foreground">Loading admin panel...</p>
      </div>
    </div>
  );
}