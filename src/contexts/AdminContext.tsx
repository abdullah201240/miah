'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

// Types
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin' | 'manager';
  avatar?: string;
  permissions: string[];
  lastLogin?: string;
}

export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
  recentOrders: number;
  pendingOrders: number;
  lowStockItems: number;
  monthlyGrowth: number;
}

// Add currency settings to the interface
export interface AdminSettings {
  currency: string;
}

interface AdminState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  stats: AdminStats;
  // Add settings to the state
  settings: AdminSettings;
  error: string | null;
}

type AdminAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGIN_SUCCESS'; payload: AdminUser }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_STATS'; payload: AdminStats }
  | { type: 'UPDATE_SETTINGS'; payload: AdminSettings }
  | { type: 'LOAD_ADMIN_DATA'; payload: { user: AdminUser; stats: AdminStats; settings: AdminSettings } };

// Initial state
const initialState: AdminState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  stats: {
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalProducts: 0,
    recentOrders: 0,
    pendingOrders: 0,
    lowStockItems: 0,
    monthlyGrowth: 0,
  },
  // Initialize settings with default currency
  settings: {
    currency: 'BDT', // Default to BDT as requested
  },
  error: null,
};

// Mock admin user for demonstration
const mockAdminUser: AdminUser = {
  id: 'admin-001',
  name: 'John Admin',
  email: 'admin@furnistore.com',
  role: 'super_admin',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  permissions: [
    'manage_products',
    'manage_orders',
    'manage_customers',
    'view_analytics',
    'manage_admin_users',
    'system_settings'
  ],
  lastLogin: new Date().toISOString(),
};

// Mock stats for demonstration
const mockStats: AdminStats = {
  totalOrders: 1247,
  totalRevenue: 156780,
  totalCustomers: 892,
  totalProducts: 156,
  recentOrders: 23,
  pendingOrders: 8,
  lowStockItems: 5,
  monthlyGrowth: 12.5,
};

// Mock settings for demonstration
const mockSettings: AdminSettings = {
  currency: 'BDT', // Default to BDT as requested
};

// Add updateSettings to the reducer
function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case 'UPDATE_STATS':
      return {
        ...state,
        stats: action.payload,
      };

    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: action.payload,
      };

    case 'LOAD_ADMIN_DATA':
      return {
        ...state,
        user: action.payload.user,
        stats: action.payload.stats,
        settings: action.payload.settings || mockSettings,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    default:
      return state;
  }
}

// Add updateSettings to the context value
const AdminContext = createContext<{
  state: AdminState;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshStats: () => void;
  hasPermission: (permission: string) => boolean;
  updateSettings: (settings: AdminSettings) => void;
} | undefined>(undefined);

// Add updateSettings function
export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  // Load admin data on mount
  useEffect(() => {
    loadAdminData();
  }, []);

  const updateSettings = (settings: AdminSettings) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
    // Also save to localStorage
    const savedAdmin = localStorage.getItem('furnistore-admin');
    if (savedAdmin) {
      const parsedAdmin = JSON.parse(savedAdmin);
      localStorage.setItem('furnistore-admin', JSON.stringify({
        ...parsedAdmin,
        settings
      }));
    }
  };

  // Update loadAdminData to include settings
  const loadAdminData = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Check if admin is already logged in (mock check)
      const savedAdmin = localStorage.getItem('furnistore-admin');
      if (savedAdmin) {
        const parsedAdmin = JSON.parse(savedAdmin);
        dispatch({ 
          type: 'LOAD_ADMIN_DATA', 
          payload: { 
            user: parsedAdmin, 
            stats: mockStats,
            settings: parsedAdmin.settings || mockSettings
          } 
        });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load admin data' });
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Mock login validation
      if (email === 'admin@furnistore.com' && password === 'admin123') {
        const adminUser = { ...mockAdminUser, lastLogin: new Date().toISOString() };
        
        localStorage.setItem('furnistore-admin', JSON.stringify(adminUser));
        dispatch({ type: 'LOGIN_SUCCESS', payload: adminUser });
        dispatch({ type: 'UPDATE_STATS', payload: mockStats });
        
        return true;
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Invalid credentials' });
        return false;
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Login failed' });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('furnistore-admin');
    dispatch({ type: 'LOGOUT' });
  };

  const refreshStats = async () => {
    try {
      // In a real app, this would fetch fresh stats from the API
      dispatch({ type: 'UPDATE_STATS', payload: mockStats });
    } catch (error) {
      console.error('Failed to refresh stats:', error);
    }
  };

  const hasPermission = (permission: string): boolean => {
    return state.user?.permissions.includes(permission) || false;
  };

  return (
    <AdminContext.Provider
      value={{
        state,
        login,
        logout,
        refreshStats,
        hasPermission,
        updateSettings, // Add updateSettings to the provider value
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

// Hook
export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}