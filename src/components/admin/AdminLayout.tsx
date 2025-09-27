'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminFooter from '@/components/admin/AdminFooter';
import { useAdmin } from '@/contexts/AdminContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Loader2 } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const { state } = useAdmin();
  const { actualTheme } = useTheme();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true); // Auto-collapse on mobile
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!state.isLoading && !state.isAuthenticated) {
      router.push('/admin');
    }
  }, [state.isAuthenticated, state.isLoading, router]);

  // Show loading spinner while checking authentication
  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!state.isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Overlay */}
      {isMobile && showMobileSidebar && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${
        isMobile 
          ? `fixed left-0 top-0 bottom-0 z-30 transform transition-transform duration-300 ${
              showMobileSidebar ? 'translate-x-0' : '-translate-x-full'
            }`
          : 'fixed left-0 top-0 bottom-0 z-30'
      }`}>
        <AdminSidebar
          isCollapsed={isMobile ? false : sidebarCollapsed}
          onToggle={() => {
            if (isMobile) {
              setShowMobileSidebar(!showMobileSidebar);
            } else {
              setSidebarCollapsed(!sidebarCollapsed);
            }
          }}
          isMobile={isMobile}
          onMobileClose={() => setShowMobileSidebar(false)}
        />
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isMobile 
          ? 'ml-0' 
          : sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        {/* Sticky Header */}
        <div className="sticky top-0 z-20">
          <AdminHeader 
            title={title} 
            subtitle={subtitle} 
            onMenuClick={() => setShowMobileSidebar(true)}
            isMobile={isMobile}
          />
        </div>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-6 pb-20">
          {children}
        </main>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 z-20">
          <AdminFooter />
        </div>
      </div>
    </div>
  );
}