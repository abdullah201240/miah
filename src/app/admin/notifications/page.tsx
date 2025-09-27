'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/contexts/NotificationContext';
import {
  Bell,
  Check,
  CheckCircle,
  Clock,
  Package,
  ShoppingCart,
  Users,
  AlertTriangle,
  X,
  Filter,
  Eye,
  Trash2,
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'order' | 'product' | 'customer' | 'system' | 'alert';
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'order': return ShoppingCart;
    case 'product': return Package;
    case 'customer': return Users;
    case 'system': return Bell;
    case 'alert': return AlertTriangle;
    default: return Bell;
  }
};

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'order': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    case 'product': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
    case 'customer': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'system': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    case 'alert': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const getPriorityColor = (priority: Notification['priority']) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const [filter, setFilter] = useState<'all' | Notification['type']>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredNotifications = notifications.filter(notification => {
    const typeMatch = filter === 'all' || notification.type === filter;
    const unreadMatch = !showUnreadOnly || !notification.read;
    return typeMatch && unreadMatch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <AdminLayout title="Notifications" subtitle="Stay updated with all activities in your store">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Notifications</p>
                  <p className="text-3xl font-bold text-foreground">{notifications.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Bell className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unread</p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{unreadCount}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Bell className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Important</p>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {notifications.filter(n => n.priority === 'high').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Filter:</span>
                </div>
                
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                
                <Button
                  variant={filter === 'order' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('order')}
                  className="flex items-center"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Orders
                </Button>
                
                <Button
                  variant={filter === 'product' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('product')}
                  className="flex items-center"
                >
                  <Package className="h-4 w-4 mr-1" />
                  Products
                </Button>
                
                <Button
                  variant={filter === 'customer' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('customer')}
                  className="flex items-center"
                >
                  <Users className="h-4 w-4 mr-1" />
                  Customers
                </Button>
                
                <Button
                  variant={filter === 'alert' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('alert')}
                  className="flex items-center"
                >
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Alerts
                </Button>
              </div>
              
              <div className="flex items-center gap-3">
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showUnreadOnly}
                    onChange={(e) => setShowUnreadOnly(e.target.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-muted-foreground">Unread only</span>
                </label>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Mark all as read
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Notifications</CardTitle>
              <span className="text-sm text-muted-foreground">
                {filteredNotifications.length} {filteredNotifications.length === 1 ? 'notification' : 'notifications'}
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filteredNotifications.length > 0 ? (
              <div className="divide-y divide-border">
                {filteredNotifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  return (
                    <div 
                      key={notification.id} 
                      className={`p-4 hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h3 className="font-medium text-foreground">{notification.title}</h3>
                            <Badge variant="secondary" className={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-muted-foreground">
                              {formatDate(notification.timestamp)}
                            </span>
                            
                            <div className="flex items-center space-x-2">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs h-8 px-2"
                                >
                                  <Check className="h-3 w-3 mr-1" />
                                  Mark as read
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="text-xs h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-1">No notifications found</h3>
                <p className="text-muted-foreground">
                  {showUnreadOnly 
                    ? "You're all caught up! No unread notifications." 
                    : "There are no notifications matching your filters."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}