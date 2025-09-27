'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdmin } from '@/contexts/AdminContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useOrders } from '@/contexts/OrderContext';
import { products } from '@/data/products';
import {
  Search,
  Bell,
  Settings,
  User,
  Moon,
  Sun,
  Menu,
  Monitor,
  LogOut,
  ChevronDown,
  Package,
  ShoppingCart,
  Users,
  FileText,
} from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
  isMobile?: boolean;
}

interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  type: 'product' | 'order' | 'customer' | 'category';
  url: string;
  icon: React.ElementType;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  status: "active" | "inactive" | "vip";
  location: string;
  loyaltyPoints?: number;
}

// Mock customer data - in a real app this would come from an API
const mockCustomers: Customer[] = [
  {
    id: "cust-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    joinDate: "2023-01-15",
    totalOrders: 8,
    totalSpent: 2340.5,
    lastOrderDate: "2024-01-15",
    status: "vip",
    location: "New York, NY",
    loyaltyPoints: 1200,
  },
  {
    id: "cust-002",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    joinDate: "2023-03-22",
    totalOrders: 5,
    totalSpent: 1580.25,
    lastOrderDate: "2024-01-10",
    status: "active",
    location: "Los Angeles, CA",
    loyaltyPoints: 790,
  },
  {
    id: "cust-003",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 345-6789",
    joinDate: "2023-05-10",
    totalOrders: 12,
    totalSpent: 3850.75,
    lastOrderDate: "2024-01-05",
    status: "vip",
    location: "Chicago, IL",
    loyaltyPoints: 1925,
  },
  {
    id: "cust-004",
    name: "David Wilson",
    email: "david.wilson@email.com",
    joinDate: "2023-07-18",
    totalOrders: 2,
    totalSpent: 650.0,
    lastOrderDate: "2023-12-28",
    status: "active",
    location: "Miami, FL",
    loyaltyPoints: 325,
  },
  {
    id: "cust-005",
    name: "Lisa Brown",
    email: "lisa.brown@email.com",
    phone: "+1 (555) 456-7890",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    joinDate: "2023-09-05",
    totalOrders: 0,
    totalSpent: 0,
    status: "inactive",
    location: "Seattle, WA",
    loyaltyPoints: 0,
  },
];

export default function AdminHeader({ title, subtitle, onMenuClick, isMobile }: AdminHeaderProps) {
  const router = useRouter();
  const { state, refreshStats, logout } = useAdmin();
  const { unreadCount } = useNotifications();
  const { state: orderState } = useOrders();
  const { theme, actualTheme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Search function
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const trimmedQuery = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Search products
    const productResults = products
      .filter(product => 
        product.name.toLowerCase().includes(trimmedQuery) ||
        product.category.toLowerCase().includes(trimmedQuery) ||
        product.id.toLowerCase().includes(trimmedQuery)
      )
      .slice(0, 3)
      .map(product => ({
        id: product.id,
        title: product.name,
        subtitle: `${product.category} - $${product.price}`,
        type: 'product' as const,
        url: `/admin/products?search=${encodeURIComponent(query)}`,
        icon: Package,
      }));

    // Search orders
    const orderResults = orderState.orders
      .filter(order => 
        order.id.toLowerCase().includes(trimmedQuery) ||
        order.status.toLowerCase().includes(trimmedQuery) ||
        order.items.some(item => item.name.toLowerCase().includes(trimmedQuery))
      )
      .slice(0, 3)
      .map(order => ({
        id: order.id,
        title: order.id,
        subtitle: `${order.status} - $${order.total.toFixed(2)}`,
        type: 'order' as const,
        url: `/admin/orders?search=${encodeURIComponent(query)}`,
        icon: ShoppingCart,
      }));

    // Search customers
    const customerResults = mockCustomers
      .filter((customer: Customer) => 
        customer.name.toLowerCase().includes(trimmedQuery) ||
        customer.email.toLowerCase().includes(trimmedQuery) ||
        customer.id.toLowerCase().includes(trimmedQuery)
      )
      .slice(0, 3)
      .map((customer: Customer) => ({
        id: customer.id,
        title: customer.name,
        subtitle: customer.email,
        type: 'customer' as const,
        url: `/admin/customers?search=${encodeURIComponent(query)}`,
        icon: Users,
      }));

    // Combine results
    results.push(...productResults, ...orderResults, ...customerResults);

    setSearchResults(results);
    setShowSearchResults(results.length > 0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    performSearch(value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (searchQuery.trim()) {
        // If there are search results, navigate to the first one
        if (searchResults.length > 0) {
          router.push(searchResults[0].url);
          setShowSearchResults(false);
        } else {
          // Otherwise, go to a general search results page
          router.push(`/admin/products?search=${encodeURIComponent(searchQuery)}`);
        }
      }
    }
  };

  const handleSearchResultClick = (url: string) => {
    router.push(url);
    setShowSearchResults(false);
    setSearchQuery('');
  };

  const getThemeIcon = () => {
    if (theme === 'system') {
      return <Monitor className="h-4 w-4" />;
    }
    return actualTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />;
  };

  const getThemeTitle = () => {
    if (theme === 'system') {
      return `System theme (${actualTheme})`;
    }
    return actualTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  };

  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border px-4 sm:px-6 py-3 sm:py-4 shadow-none">
      <div className="flex items-center justify-between">
        {/* Left Side - Mobile Menu + Title */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {/* Mobile Menu Button */}
          {isMobile && onMenuClick && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="text-muted-foreground hover:text-foreground hover:bg-accent backdrop-blur-sm transition-all duration-200 p-2 md:hidden"
              title="Open Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          {/* Title Section */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground mt-1 text-sm hidden sm:block">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Center - Large Search */}
        <div className="hidden lg:flex flex-1 justify-center relative" ref={searchRef}>
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground z-10" />
            <Input
              type="text"
              placeholder="Search products, orders, customers..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => searchQuery && setShowSearchResults(true)}
              className="pl-14 pr-6 py-3 w-full text-lg bg-background/90 backdrop-blur-sm border-border focus:border-primary focus:ring-primary focus:bg-background transition-all duration-200 rounded-xl shadow-none"
            />
          </div>
          
          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-lg py-2 z-50 max-h-96 overflow-y-auto">
              <div className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                Search Results
              </div>
              {searchResults.map((result) => {
                const Icon = result.icon;
                return (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleSearchResultClick(result.url)}
                    className="w-full text-left px-4 py-3 hover:bg-accent flex items-center space-x-3"
                  >
                    <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{result.title}</p>
                      {result.subtitle && (
                        <p className="text-xs text-muted-foreground truncate">{result.subtitle}</p>
                      )}
                    </div>
                    <span className="text-xs px-2 py-1 bg-muted rounded capitalize">
                      {result.type}
                    </span>
                  </button>
                );
              })}
              <div className="px-4 py-2 text-xs text-muted-foreground border-t border-border">
                Press Enter to search all results
              </div>
            </div>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile Search Icon with Dropdown */}
          <div className="lg:hidden relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const searchInput = document.getElementById('mobile-search-input');
                if (searchInput) {
                  searchInput.classList.toggle('hidden');
                  searchInput.classList.toggle('flex');
                  if (!searchInput.classList.contains('hidden')) {
                    (searchInput.querySelector('input') as HTMLInputElement)?.focus();
                  }
                }
              }}
              className="text-muted-foreground hover:text-foreground hover:bg-accent backdrop-blur-sm transition-all duration-200 p-2"
              title="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
            <div id="mobile-search-input" className="hidden absolute right-0 top-full mt-2 w-60 bg-background border border-border rounded-lg shadow-lg p-2 z-50">
              <div className="relative w-full">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products, orders..."
                  className="pl-8 pr-4 py-1 w-full text-sm bg-background border-border"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value;
                      if (value.trim()) {
                        // Implement search functionality
                        console.log('Searching for:', value);
                        // You can add actual search implementation here
                        // For example, redirect to search results page or filter current view
                        router.push(`/admin/products?search=${encodeURIComponent(value)}`);
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons - Condensed on mobile */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Notifications */}
            <Link href="/admin/notifications">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground hover:bg-accent backdrop-blur-sm relative transition-all duration-200 p-2"
                title="Notifications"
              >
                <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
                {/* Notification badge */}
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 sm:h-3 sm:w-3 bg-destructive rounded-full flex items-center justify-center text-[0.5rem] text-white font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Dark Mode Toggle - Visible on all devices */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground hover:bg-accent backdrop-blur-sm transition-all duration-200 p-2"
              title={getThemeTitle()}
            >
              {getThemeIcon()}
            </Button>

           
          </div>

          {/* User Profile Dropdown */}
          {state.user && (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-4 border-l border-border focus:outline-none"
              >
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-foreground">
                    {state.user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {state.user.role.replace('_', ' ').toUpperCase()}
                  </p>
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-none">
                  {state.user.avatar ? (
                    <img
                      src={state.user.avatar}
                      alt={state.user.name}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  )}
                </div>
                <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:block" />
              </button>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium text-foreground">{state.user.name}</p>
                    <p className="text-xs text-muted-foreground">{state.user.email}</p>
                  </div>
                  <Link 
                    href="/admin/profile" 
                    className="block px-4 py-2 text-sm text-foreground hover:bg-accent"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="h-4 w-4 inline mr-2" />
                    My Profile
                  </Link>
                  <Link 
                    href="/admin/settings" 
                    className="block px-4 py-2 text-sm text-foreground hover:bg-accent"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="h-4 w-4 inline mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}