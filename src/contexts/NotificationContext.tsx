'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'order' | 'product' | 'customer' | 'system' | 'alert';
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Mock notification data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Order Received',
    description: 'Order #ORD-2024-001 has been placed for $299.99',
    type: 'order',
    timestamp: '2024-01-15T10:30:00Z',
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    title: 'Low Stock Alert',
    description: 'Modern 3-Seater Sofa is running low (5 items remaining)',
    type: 'alert',
    timestamp: '2024-01-15T09:15:00Z',
    read: false,
    priority: 'high'
  },
  {
    id: '3',
    title: 'New Customer Registered',
    description: 'Sarah Johnson has created an account',
    type: 'customer',
    timestamp: '2024-01-14T16:45:00Z',
    read: true,
    priority: 'medium'
  },
  {
    id: '4',
    title: 'Order Shipped',
    description: 'Order #ORD-2024-002 has been shipped',
    type: 'order',
    timestamp: '2024-01-14T14:20:00Z',
    read: true,
    priority: 'medium'
  },
  {
    id: '5',
    title: 'Product Review Pending',
    description: 'New review for Wooden Dining Table needs approval',
    type: 'product',
    timestamp: '2024-01-14T11:30:00Z',
    read: false,
    priority: 'low'
  }
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('furnistore-notifications');
      return saved ? JSON.parse(saved) : mockNotifications;
    }
    return mockNotifications;
  });

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('furnistore-notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };
    setNotifications([newNotification, ...notifications]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        addNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}