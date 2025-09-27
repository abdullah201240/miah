'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdmin } from '@/contexts/AdminContext';
import {
  Settings,
  User,
  Bell,
  Shield,
  Database,
  Mail,
  Globe,
  CreditCard,
  Truck,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Check,
  AlertTriangle,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const { state, updateSettings } = useAdmin();
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    storeName: 'Miah',
    storeEmail: 'admin@furnistore.com',
    storePhone: '+1 (555) 123-4567',
    storeAddress: '123 Business St, City, State 12345',
    currency: 'USD',
    timezone: 'America/New_York',
    language: 'en',
    emailNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    lowStockAlerts: true,
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    autoApproveReviews: false,
    shippingTaxRate: 8.5,
    defaultShippingCost: 15.00,
    freeShippingThreshold: 500.00,
  });

  // Load settings from context when component mounts
  useEffect(() => {
    if (state.settings) {
      setSettings(prev => ({
        ...prev,
        currency: state.settings.currency || 'USD'
      }));
    }
  }, [state.settings]);

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'store', name: 'Store Info', icon: Globe },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'shipping', name: 'Shipping', icon: Truck },
    { id: 'advanced', name: 'Advanced', icon: Database },
  ];

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Update settings in AdminContext
    updateSettings({
      currency: settings.currency
    });
    // TODO: Implement settings save functionality
  };

  const handleReset = () => {
    console.log('Resetting settings');
    // TODO: Implement settings reset functionality
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Store Name
                </label>
                <Input
                  type="text"
                  value={settings.storeName}
                  onChange={(e) => setSettings(prev => ({ ...prev, storeName: e.target.value }))}
                  placeholder="Enter store name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Currency
                </label>
                <select
                  aria-label="Currency"
                  id="currency"
                  value={settings.currency}
                  onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="BDT">BDT - Bangladeshi Taka</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Timezone
                </label>
                <select
                  aria-label="Timezone"
                  id="timezone"
                  value={settings.timezone}
                  onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                >
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Language
                </label>
                <select
                  aria-label="Language"
                  id="language"
                  value={settings.language}
                  onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'store':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Store Email
              </label>
              <Input
                type="email"
                value={settings.storeEmail}
                onChange={(e) => setSettings(prev => ({ ...prev, storeEmail: e.target.value }))}
                placeholder="Enter store email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Store Phone
              </label>
              <Input
                type="text"
                value={settings.storePhone}
                onChange={(e) => setSettings(prev => ({ ...prev, storePhone: e.target.value }))}
                placeholder="Enter store phone"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Store Address
              </label>
              <Input
                type="text"
                value={settings.storeAddress}
                onChange={(e) => setSettings(prev => ({ ...prev, storeAddress: e.target.value }))}
                placeholder="Enter store address"
              />
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    aria-label="Email Notifications"
                    id="emailNotifications"
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Order Notifications</h4>
                  <p className="text-sm text-muted-foreground">Get notified about new orders</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    aria-label="Order Notifications"
                    id="orderNotifications"
                    type="checkbox"
                    checked={settings.orderNotifications}
                    onChange={(e) => setSettings(prev => ({ ...prev, orderNotifications: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Low Stock Alerts</h4>
                  <p className="text-sm text-muted-foreground">Alert when products are running low</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    aria-label="Low Stock Alerts"
                    id="lowStockAlerts"
                    type="checkbox"
                    checked={settings.lowStockAlerts}
                    onChange={(e) => setSettings(prev => ({ ...prev, lowStockAlerts: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Allow User Registration</h4>
                  <p className="text-sm text-muted-foreground">Allow new users to register accounts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    aria-label="Allow User Registration"
                    id="allowRegistration"
                    type="checkbox"
                    checked={settings.allowRegistration}
                    onChange={(e) => setSettings(prev => ({ ...prev, allowRegistration: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Require Email Verification</h4>
                  <p className="text-sm text-muted-foreground">Users must verify their email before accessing the account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    aria-label="Require Email Verification"
                    id="requireEmailVerification"
                    type="checkbox"
                    checked={settings.requireEmailVerification}
                    onChange={(e) => setSettings(prev => ({ ...prev, requireEmailVerification: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-4">Change Password</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    New Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  Update Password
                </Button>
              </div>
            </div>
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Default Shipping Cost ($)
                </label>
                <Input
                  type="number"
                  value={settings.defaultShippingCost}
                  onChange={(e) => setSettings(prev => ({ ...prev, defaultShippingCost: parseFloat(e.target.value) }))}
                  placeholder="15.00"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Free Shipping Threshold ($)
                </label>
                <Input
                  type="number"
                  value={settings.freeShippingThreshold}
                  onChange={(e) => setSettings(prev => ({ ...prev, freeShippingThreshold: parseFloat(e.target.value) }))}
                  placeholder="500.00"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tax Rate (%)
                </label>
                <Input
                  type="number"
                  value={settings.shippingTaxRate}
                  onChange={(e) => setSettings(prev => ({ ...prev, shippingTaxRate: parseFloat(e.target.value) }))}
                  placeholder="8.5"
                  step="0.1"
                />
              </div>
            </div>
          </div>
        );

      case 'advanced':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Maintenance Mode</h4>
                  <p className="text-sm text-muted-foreground">Put the store in maintenance mode</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    aria-label="Maintenance Mode"
                    id="maintenanceMode"
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => setSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Auto-Approve Reviews</h4>
                  <p className="text-sm text-muted-foreground">Automatically approve customer reviews</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    aria-label="Auto-Approve Reviews"
                    id="autoApproveReviews"
                    type="checkbox"
                    checked={settings.autoApproveReviews}
                    onChange={(e) => setSettings(prev => ({ ...prev, autoApproveReviews: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                <h4 className="font-medium text-red-900 dark:text-red-400">Danger Zone</h4>
              </div>
              <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                These actions are irreversible. Please be certain before proceeding.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                  Clear All Cache
                </Button>
                <Button variant="outline" className="border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                  Reset to Default Settings
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AdminLayout title="Settings" subtitle="Manage your store configuration and preferences">
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {tabs.find(tab => tab.id === activeTab)?.icon && 
                    React.createElement(tabs.find(tab => tab.id === activeTab)!.icon, { className: "h-5 w-5 mr-2" })
                  }
                  {tabs.find(tab => tab.id === activeTab)?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderTabContent()}
                
                {/* Save/Reset Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="flex items-center"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset Changes
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}