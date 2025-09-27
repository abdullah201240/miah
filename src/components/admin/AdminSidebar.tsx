'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { useTheme } from '@/contexts/ThemeContext';
import Images from 'next/image';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  Tags,
  Plus,
  Image,
  Wallet,
  Shield,
  User,
} from 'lucide-react';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
  onMobileClose?: () => void;
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    permission: 'view_analytics',
  },
  {
    name: 'Accounts',
    href: '/admin/accounts',
    icon: Wallet,
    permission: 'view_analytics',
  },
  {
    name: 'Admins',
    href: '/admin/admins',
    icon: Shield,
    permission: 'manage_admin_users',
  },
  {
    name: 'Products',
    href: '/admin/products',
    icon: Package,
    permission: 'manage_products',
  },
  {
    name: 'Categories',
    href: '/admin/categories',
    icon: Tags,
    permission: 'manage_products',
  },
  {
    name: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart,
    permission: 'manage_orders',
  },
  {
    name: 'Create Order',
    href: '/admin/orders/create',
    icon: Plus,
    permission: 'manage_orders',
  },
  {
    name: 'Customers',
    href: '/admin/customers',
    icon: Users,
    permission: 'manage_customers',
  },
  {
    name: 'Hero Section',
    href: '/admin/hero',
    icon: Image,
    permission: 'manage_products',
  },
  // New Ads Management Section
  {
    name: 'Popup Ads',
    href: '/admin/ads/popup',
    icon: Image,
    permission: 'manage_products',
  },
  {
    name: 'Banner Ads',
    href: '/admin/ads/banner',
    icon: Image,
    permission: 'manage_products',
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    permission: 'view_analytics',
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    permission: 'system_settings',
  },
];

export default function AdminSidebar({ isCollapsed, onToggle, isMobile, onMobileClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { state, logout, hasPermission } = useAdmin();
  const { actualTheme } = useTheme();

  // Filter navigation items based on user permissions
  const allowedNavigation = navigation.filter(item =>
    hasPermission(item.permission)
  );

  // Handle navigation click on mobile
  const handleNavClick = () => {
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <div className={`bg-card border-r border-border text-card-foreground transition-all duration-300 flex flex-col h-full ${isMobile ? 'w-64' : (isCollapsed ? 'w-16' : 'w-64')
      }`}>
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-between">
          {(!isCollapsed || isMobile) && (
            <Link
              href="/admin/dashboard"
              className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              onClick={handleNavClick}
            >
              {actualTheme === 'light' ? (
                <Images
                  src="/web-black-logo.gif"
                  alt="FurniStore Logo"
                  width={200}
                  height={80}
                  className="h-12 lg:h-14 w-auto object-contain"
                />
              ) : (
                <Images
                  src="/logo.gif"
                  alt="FurniStore Logo"
                  width={200}
                  height={80}
                  className="h-12 lg:h-14 w-auto object-contain"
                />
              )}
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-muted-foreground hover:text-foreground hover:bg-accent p-2"
          >
            {isMobile ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-2 overflow-y-auto">
        {allowedNavigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href} onClick={handleNavClick}>
              <Button
                variant="ghost"
                className={`w-full justify-start text-left px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 ${isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  } ${(!isMobile && isCollapsed) ? 'justify-center px-2' : ''}`}
              >
                <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${(!isMobile && isCollapsed) ? '' : 'mr-2 sm:mr-3'}`} />
                {(!isCollapsed || isMobile) && (
                  <span className="font-medium text-sm sm:text-base">{item.name}</span>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 sm:p-4 border-t border-border space-y-2 flex-shrink-0">
        {/* Go to Store */}
        <Link href="/" onClick={handleNavClick}>
          <Button
            variant="ghost"
            className={`w-full text-muted-foreground hover:text-foreground hover:bg-accent ${(!isMobile && isCollapsed) ? 'justify-center px-2' : 'justify-start px-2 sm:px-3'
              }`}
          >
            <Home className={`h-4 w-4 sm:h-5 sm:w-5 ${(!isMobile && isCollapsed) ? '' : 'mr-2 sm:mr-3'}`} />
            {(!isCollapsed || isMobile) && <span className="text-sm sm:text-base">Go to Store</span>}
          </Button>
        </Link>

        {/* Logout */}
        <Button
          variant="ghost"
          onClick={() => {
            logout();
            if (isMobile && onMobileClose) onMobileClose();
          }}
          className={`w-full text-destructive hover:text-destructive hover:bg-destructive/10 ${(!isMobile && isCollapsed) ? 'justify-center px-2' : 'justify-start px-2 sm:px-3'
            }`}
        >
          <LogOut className={`h-4 w-4 sm:h-5 sm:w-5 ${(!isMobile && isCollapsed) ? '' : 'mr-2 sm:mr-3'}`} />
          {(!isCollapsed || isMobile) && <span className="text-sm sm:text-base">Logout</span>}
        </Button>
      </div>
    </div>
  );
}