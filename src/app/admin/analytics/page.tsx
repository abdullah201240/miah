'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/contexts/OrderContext';
import { products } from '@/data/products';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Target,
  Activity,
  Clock,
} from 'lucide-react';

// Mock analytics data - in a real app this would come from an API
const analyticsData = {
  salesByMonth: [
    { month: 'Jan', sales: 12500, orders: 125 },
    { month: 'Feb', sales: 14200, orders: 142 },
    { month: 'Mar', sales: 13800, orders: 138 },
    { month: 'Apr', sales: 16500, orders: 165 },
    { month: 'May', sales: 18900, orders: 189 },
    { month: 'Jun', sales: 21300, orders: 213 },
  ],
  topProducts: [
    { id: '1', name: 'Modern 3-Seater Sofa', sales: 45, revenue: 40455 },
    { id: '4', name: 'Ergonomic Office Chair', sales: 38, revenue: 11362 },
    { id: '8', name: 'Wooden Dining Table', sales: 32, revenue: 25568 },
    { id: '10', name: 'King Size Platform Bed', sales: 28, revenue: 25172 },
    { id: '7', name: 'Glass Coffee Table', sales: 24, revenue: 8376 },
  ],
  customerSegments: [
    { segment: 'New Customers', count: 234, percentage: 35 },
    { segment: 'Returning Customers', count: 312, percentage: 47 },
    { segment: 'VIP Customers', count: 119, percentage: 18 },
  ],
  trafficSources: [
    { source: 'Organic Search', visits: 4580, percentage: 42 },
    { source: 'Direct', visits: 2890, percentage: 26 },
    { source: 'Social Media', visits: 1920, percentage: 18 },
    { source: 'Email', visits: 980, percentage: 9 },
    { source: 'Paid Ads', visits: 550, percentage: 5 },
  ]
};

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: React.ElementType;
  trend: 'up' | 'down';
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

function MetricCard({ title, value, change, changeLabel, icon: Icon, trend, color }: MetricCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
  };

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${
              trend === 'up' ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30' : 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
            }`}>
              {trend === 'up' ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {change > 0 ? '+' : ''}{change}% {changeLabel}
            </div>
          </div>
          <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Chart Placeholder Component
function ChartPlaceholder({ title, description, icon: Icon }: { title: string; description: string; icon: React.ElementType }) {
  return (
    <div className="h-48 sm:h-64 bg-gradient-to-br from-muted/30 to-muted/50 rounded-lg flex flex-col items-center justify-center p-4 sm:p-6">
      <Icon className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mb-2 sm:mb-4" />
      <h4 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2 text-center">{title}</h4>
      <p className="text-xs sm:text-sm text-muted-foreground text-center">{description}</p>
      <p className="text-xs text-muted-foreground mt-1 sm:mt-2">Chart library integration needed</p>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  const { state } = useOrders();
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Calculate metrics from orders
  const totalRevenue = state.orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = state.orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const totalProducts = products.length;

  // Mock conversion rate and growth data
  const conversionRate = 3.8;
  const revenueGrowth = 12.5;
  const orderGrowth = 8.3;
  const customerGrowth = 15.2;

  return (
    <AdminLayout title="Analytics" subtitle="Comprehensive insights and performance metrics">
      <div className="space-y-6">
        {/* Time Range Filter */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Performance Overview</h3>
                <p className="text-muted-foreground">Track your store's key metrics and trends</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <select
                  aria-label="Time Range"
                  id="timeRange"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-border"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <MetricCard
            title="Total Revenue"
            value={`৳${totalRevenue.toLocaleString()}`}
            change={revenueGrowth}
            changeLabel="vs last month"
            icon={DollarSign}
            trend="up"
            color="green"
          />
          <MetricCard
            title="Total Orders"
            value={totalOrders.toLocaleString()}
            change={orderGrowth}
            changeLabel="vs last month"
            icon={ShoppingCart}
            trend="up"
            color="blue"
          />
          <MetricCard
            title="Avg Order Value"
            value={`৳${avgOrderValue.toFixed(0)}`}
            change={-2.4}
            changeLabel="vs last month"
            icon={TrendingUp}
            trend="down"
            color="orange"
          />
          <MetricCard
            title="Conversion Rate"
            value={`${conversionRate}%`}
            change={0.8}
            changeLabel="vs last month"
            icon={Target}
            trend="up"
            color="purple"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Revenue Trend Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Revenue Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <ChartPlaceholder 
                title="Monthly Revenue Chart"
                description="Track revenue trends over time"
                icon={BarChart3}
              />
            </CardContent>
          </Card>

          {/* Orders Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Order Volume
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <ChartPlaceholder 
                title="Order Volume Chart"
                description="Monitor order trends and patterns"
                icon={ShoppingCart}
              />
            </CardContent>
          </Card>
        </div>

        {/* Data Tables Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Top Products */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Package className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Top Products
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 w-full sm:w-auto">
                  View All <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {analyticsData.topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between p-2 sm:p-3 bg-muted/50 dark:bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs sm:text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-xs sm:text-sm truncate max-w-[150px] sm:max-w-none">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.sales} units sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground text-xs sm:text-sm">৳{product.revenue.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Segments */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Customer Segments
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 w-full sm:w-auto">
                  View Details <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {analyticsData.customerSegments.map((segment) => (
                  <div key={segment.segment} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 bg-muted/50 dark:bg-muted/30 rounded-lg gap-2">
                    <div>
                      <p className="font-medium text-foreground text-xs sm:text-sm">{segment.segment}</p>
                      <p className="text-xs text-muted-foreground">{segment.count} customers</p>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
                      <div className="w-full sm:w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500" 
                          style={{ width: `${segment.percentage}%` }}
                        />
                      </div>
                      <span className="font-semibold text-foreground text-xs sm:text-sm whitespace-nowrap">{segment.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Traffic Sources and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Traffic Sources */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Activity className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Traffic Sources
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 w-full sm:w-auto">
                  View Report <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {analyticsData.trafficSources.map((source) => (
                  <div key={source.source} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 bg-muted/50 dark:bg-muted/30 rounded-lg gap-2">
                    <div>
                      <p className="font-medium text-foreground text-xs sm:text-sm">{source.source}</p>
                      <p className="text-xs text-muted-foreground">{source.visits.toLocaleString()} visits</p>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
                      <div className="w-full sm:w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500" 
                          style={{ width: `${source.percentage}%` }}
                        />
                      </div>
                      <span className="font-semibold text-foreground text-xs sm:text-sm whitespace-nowrap">{source.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">New order #ORD-2024-005</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">৳899.99</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Product viewed: Modern Sofa</p>
                    <p className="text-xs text-muted-foreground">5 minutes ago</p>
                  </div>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">New customer registered</p>
                    <p className="text-xs text-muted-foreground">12 minutes ago</p>
                  </div>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Inventory alert: Low stock</p>
                    <p className="text-xs text-muted-foreground">18 minutes ago</p>
                  </div>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Order shipped #ORD-2024-003</p>
                    <p className="text-xs text-muted-foreground">25 minutes ago</p>
                  </div>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Insights */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Sales Growth</h4>
                <p className="text-sm text-muted-foreground">
                  Your sales have increased by <span className="font-semibold text-green-600 dark:text-green-400">12.5%</span> compared to last month.
                </p>
              </div>
              <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Target className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Conversion Rate</h4>
                <p className="text-sm text-muted-foreground">
                  Your conversion rate of <span className="font-semibold text-blue-600 dark:text-blue-400">3.8%</span> is above industry average.
                </p>
              </div>
              <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Customer Retention</h4>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-purple-600 dark:text-purple-400">47%</span> of your sales come from returning customers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}