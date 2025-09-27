'use client';

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { useOrders } from '@/contexts/OrderContext';
import { products } from '@/data/products';
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  CheckCircle,
  Truck,
  Eye,
  ArrowUpRight,
  BarChart3,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ElementType;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

function StatsCard({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon: Icon, 
  trend = 'neutral',
  color = 'blue' 
}: StatsCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
  };

  const trendClasses = {
    up: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30',
    down: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30',
    neutral: 'text-muted-foreground bg-muted',
  };

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {change !== undefined && (
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${trendClasses[trend]}`}>
                {trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : trend === 'down' ? (
                  <TrendingDown className="h-3 w-3 mr-1" />
                ) : null}
                {change > 0 ? '+' : ''}{change}% {changeLabel}
              </div>
            )}
          </div>
          <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Recent Orders Component
function RecentOrdersCard() {
  const { state: orderState } = useOrders();
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'in transit':
      case 'shipped':
        return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      case 'processing':
      case 'confirmed':
        return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'in transit':
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'processing':
      case 'confirmed':
        return <Clock className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const recentOrders = orderState.orders.slice(0, 5);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700" asChild>
            <Link href="/admin/orders">
              View All <ArrowUpRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">৳{order.total.toFixed(2)}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Low Stock Alert Component
function LowStockAlert() {
  const lowStockProducts = products.filter(product => 
    product.inStock && Math.random() < 0.2 // Simulate low stock
  ).slice(0, 5);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
            Low Stock Alert
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700" asChild>
            <Link href="/admin/products?statusFilter=outofstock">
              View All <ArrowUpRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {lowStockProducts.length > 0 ? lowStockProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/10 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-center space-x-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-foreground text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-orange-700 dark:text-orange-400">
                  {Math.floor(Math.random() * 5) + 1} left
                </p>
                <Button variant="ghost" size="sm" className="text-xs text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 p-0 h-auto">
                  Restock
                </Button>
              </div>
            </div>
          )) : (
            <div className="text-center py-4">
              <Package className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">All products are well-stocked!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  const { state } = useAdmin();
  const { state: orderState } = useOrders();

  // Calculate dynamic stats
  const totalProducts = products.length;
  const inStockProducts = products.filter(p => p.inStock).length;
  const totalRevenue = orderState.orders.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = orderState.orders.length > 0 ? totalRevenue / orderState.orders.length : 0;

  return (
    <AdminLayout title="Dashboard" subtitle="Welcome back! Here's what's happening in your store.">
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Revenue"
            value={`৳${totalRevenue.toLocaleString()}`}
            change={12.5}
            changeLabel="vs last month"
            icon={DollarSign}
            trend="up"
            color="green"
          />
          <StatsCard
            title="Total Orders"
            value={orderState.orders.length.toLocaleString()}
            change={8.2}
            changeLabel="vs last month"
            icon={ShoppingCart}
            trend="up"
            color="blue"
          />
          <StatsCard
            title="Total Products"
            value={totalProducts.toLocaleString()}
            change={5.1}
            changeLabel="new this month"
            icon={Package}
            trend="up"
            color="purple"
          />
          <StatsCard
            title="Average Order"
            value={`৳${avgOrderValue.toFixed(0)}`}
            change={-2.4}
            changeLabel="vs last month"
            icon={TrendingUp}
            trend="down"
            color="orange"
          />
        </div>

        {/* Charts and Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Overview Chart Placeholder */}
          <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Sales Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-muted/30 to-muted/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Sales chart would go here</p>
                  <p className="text-sm text-muted-foreground mt-1">Integration with charting library needed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Products in Stock</span>
                  <span className="font-semibold text-foreground">{inStockProducts}/{totalProducts}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Pending Orders</span>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    {orderState.orders.filter(o => o.status === 'Processing').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Delivered Today</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {orderState.orders.filter(o => o.status === 'Delivered').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Active Customers</span>
                  <span className="font-semibold text-foreground">1,234</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Today's Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">5 new orders received</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">12 products viewed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">3 customers registered</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">2 support tickets</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Data Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentOrdersCard />
          <LowStockAlert />
        </div>

        {/* Action Items */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/admin/products/add" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Package className="h-6 w-6" />
                <span className="text-sm">Add Product</span>
              </Link>
              <Link href="/admin/orders" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Eye className="h-6 w-6" />
                <span className="text-sm">View Orders</span>
              </Link>
              <Link href="/admin/customers" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Users className="h-6 w-6" />
                <span className="text-sm">Manage Users</span>
              </Link>
              <Link href="/admin/analytics" className="h-20 flex flex-col items-center justify-center space-y-2">
                <BarChart3 className="h-6 w-6" />
                <span className="text-sm">View Reports</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}