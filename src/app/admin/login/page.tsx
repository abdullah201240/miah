'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Eye,
  EyeOff,
  LogIn,
  Shield,
  User,
  Lock,
  AlertTriangle,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  Loader2,
} from 'lucide-react';

export default function AdminLoginPage() {
  const { state, login } = useAdmin();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!state.isLoading && state.isAuthenticated) {
      // If authenticated, redirect to dashboard
      router.push('/admin/dashboard');
    }
  }, [state.isAuthenticated, state.isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        router.push('/admin/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('admin@furnistore.com');
    setPassword('admin123');
  };

  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (state.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-muted-foreground">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FurniStore Admin
                </h1>
                <p className="text-muted-foreground">Powerful admin dashboard</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">
              Manage your e-commerce business
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Access powerful tools to manage products, orders, customers, and analytics. 
              Monitor your business performance and grow your online store.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-background/50 border border-border/50">
              <div className="flex items-center space-x-3 mb-2">
                <Package className="h-5 w-5 text-blue-500" />
                <span className="font-medium text-foreground">Product Management</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Add, edit, and organize your product catalog
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-background/50 border border-border/50">
              <div className="flex items-center space-x-3 mb-2">
                <ShoppingCart className="h-5 w-5 text-green-500" />
                <span className="font-medium text-foreground">Order Processing</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Track and manage customer orders
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-background/50 border border-border/50">
              <div className="flex items-center space-x-3 mb-2">
                <BarChart3 className="h-5 w-5 text-purple-500" />
                <span className="font-medium text-foreground">Analytics</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Monitor sales and performance metrics
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-background/50 border border-border/50">
              <div className="flex items-center space-x-3 mb-2">
                <Settings className="h-5 w-5 text-orange-500" />
                <span className="font-medium text-foreground">System Settings</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Configure your store settings
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="border-0 shadow-2xl bg-background/80 backdrop-blur-sm">
            <CardHeader className="space-y-4 pb-6">
              <div className="flex items-center justify-center lg:hidden mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <CardTitle className="text-2xl text-center lg:text-left">
                Admin Login
              </CardTitle>
              <p className="text-muted-foreground text-center lg:text-left">
                Enter your credentials to access the admin dashboard
              </p>

              {/* Demo Credentials Banner */}
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="h-3 w-3 text-white" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Demo Credentials
                    </p>
                    <div className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                      <p>Email: admin@furnistore.com</p>
                      <p>Password: admin123</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={fillDemoCredentials}
                      className="text-xs h-7 border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/50"
                    >
                      Use Demo Credentials
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-11"
                    required
                    disabled={isLoggingIn}
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-11 pr-10"
                      required
                      disabled={isLoggingIn}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoggingIn}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center space-x-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                    <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <LogIn className="h-4 w-4" />
                      <span>Sign In to Admin Panel</span>
                    </div>
                  )}
                </Button>
              </form>

              {/* Additional Info */}
              <div className="pt-4 border-t border-border">
                <div className="text-center space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Secure admin access powered by
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      FurniStore Security
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}