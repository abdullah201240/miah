'use client';

import { AdminProvider, useAdmin } from '@/contexts/AdminContext';
import { AdminThemeProvider } from '@/components/admin/AdminThemeProvider';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const { state } = useAdmin();
  const router = useRouter();
  const pathname = usePathname();

  // Define public routes that don't require authentication
  const publicRoutes = ['/admin', '/admin/login'];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (!state.isLoading && !state.isAuthenticated && !isPublicRoute) {
      // Redirect to login if not authenticated and trying to access protected route
      router.push('/admin/login');
    }
  }, [state.isAuthenticated, state.isLoading, router, isPublicRoute]);

  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Allow access to public routes even when not authenticated
  if (isPublicRoute || state.isAuthenticated) {
    return <>{children}</>;
  }

  // Show loading for protected routes while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminThemeProvider>
      <AdminProvider>
        <AdminRouteGuard>
          {children}
        </AdminRouteGuard>
      </AdminProvider>
    </AdminThemeProvider>
  );
}