'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import MobileLayout from '@/components/layout/MobileLayout';
import { useOrders } from '@/contexts/OrderContext';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock,
  ArrowRight,
  Download,
  RefreshCw,
  Search,
  Filter,
  Calendar,
  MapPin,
  CreditCard,
  Copy,
  AlertCircle,
  X,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  CheckCircle2,
  FileCheck,
  TrendingUp,
  Box,
  Activity
} from 'lucide-react';

export default function OrdersPage() {
  const { state: orderState, cancelOrder, reorder, getOrdersByStatus } = useOrders();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'total' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredOrder, setHoveredOrder] = useState<string | null>(null);
  
  // Pagination states
  const [ordersPerPage, setOrdersPerPage] = useState(12);
  const [displayedOrdersCount, setDisplayedOrdersCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Filter and search logic
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orderState.orders;

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(order => 
        order.status.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'total':
          aValue = a.total;
          bValue = b.total;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          return 0;
      }
      
      return sortOrder === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });

    return sorted;
  }, [orderState.orders, selectedFilter, searchQuery, sortBy, sortOrder]);

  // Pagination logic
  const displayedOrders = useMemo(() => {
    return filteredAndSortedOrders.slice(0, displayedOrdersCount);
  }, [filteredAndSortedOrders, displayedOrdersCount]);

  const hasMoreOrders = displayedOrdersCount < filteredAndSortedOrders.length;
  const totalOrders = filteredAndSortedOrders.length;

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedOrdersCount(ordersPerPage);
  }, [selectedFilter, searchQuery, sortBy, sortOrder, ordersPerPage]);

  // Handle orders per page change
  const handleOrdersPerPageChange = (newCount: number) => {
    setOrdersPerPage(newCount);
    setDisplayedOrdersCount(newCount);
  };

  // Handle load more
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const newCount = Math.min(
        displayedOrdersCount + ordersPerPage,
        filteredAndSortedOrders.length
      );
      setDisplayedOrdersCount(newCount);
      setIsLoadingMore(false);
    }, 500);
  };

  const getStatusIcon = (status: string) => {
    const iconClass = "h-5 w-5 drop-shadow-sm";
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className={`${iconClass} text-emerald-600`} />;
      case 'in transit':
      case 'out for delivery':
      case 'shipped':
        return <Truck className={`${iconClass} text-blue-600`} />;
      case 'processing':
        return <Clock className={`${iconClass} text-amber-600`} />;
      case 'confirmed':
        return <CheckCircle2 className={`${iconClass} text-purple-600`} />;
      case 'cancelled':
      case 'returned':
        return <X className={`${iconClass} text-red-600`} />;
      default:
        return <Package className={`${iconClass} text-slate-600`} />;
    }
  };

  // Enhanced Order Progress Component
  const OrderProgress = ({ order }: { order: any }) => {
    const steps = [
      { 
        key: 'processing', 
        label: 'Processing', 
        icon: <Clock className="h-4 w-4" />,
        description: 'Order received'
      },
      { 
        key: 'confirmed', 
        label: 'Confirmed', 
        icon: <CheckCircle2 className="h-4 w-4" />,
        description: 'Payment verified'
      },
      { 
        key: 'shipped', 
        label: 'Shipped', 
        icon: <Truck className="h-4 w-4" />,
        description: 'Out for delivery'
      },
      { 
        key: 'delivered', 
        label: 'Delivered', 
        icon: <Package className="h-4 w-4" />,
        description: 'Order completed'
      }
    ];

    const getStepStatus = (stepKey: string) => {
      const status = order.status.toLowerCase();
      const stepOrder = ['processing', 'confirmed', 'shipped', 'delivered'];
      const currentIndex = stepOrder.indexOf(status);
      const stepIndex = stepOrder.indexOf(stepKey);
      
      if (status === 'cancelled' || status === 'returned') {
        return stepIndex === 0 ? 'completed' : 'inactive';
      }
      
      if (stepIndex < currentIndex) return 'completed';
      if (stepIndex === currentIndex) return 'current';
      return 'inactive';
    };

    const getStepColor = (status: string) => {
      switch (status) {
        case 'completed':
          return 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-500 shadow-sm shadow-emerald-500/25';
        case 'current':
          return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500 shadow-sm shadow-blue-500/25 animate-pulse';
        default:
          return 'bg-slate-100 text-slate-400 border-slate-200';
      }
    };

    const getConnectorColor = (index: number) => {
      const status = order.status.toLowerCase();
      const stepOrder = ['processing', 'confirmed', 'shipped', 'delivered'];
      const currentIndex = stepOrder.indexOf(status);
      
      if (status === 'cancelled' || status === 'returned') {
        return index === 0 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-slate-200';
      }
      
      return index < currentIndex ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-slate-200';
    };

    const progressPercentage = (() => {
      const status = order.status.toLowerCase();
      const stepOrder = ['processing', 'confirmed', 'shipped', 'delivered'];
      const currentIndex = stepOrder.indexOf(status);
      return ((currentIndex + 1) / stepOrder.length) * 100;
    })();

    return (
      <div className="mt-6 p-4 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-slate-800 flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-600" />
            Order Progress
          </h4>
          <span className="text-sm font-medium text-slate-600">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between relative px-2 mb-4">
          {steps.map((step, index) => {
            const status = getStepStatus(step.key);
            return (
              <div key={step.key} className="flex flex-col items-center relative flex-1 group">
                {/* Connector Line */}
                {index > 0 && (
                  <div className={`absolute top-5 right-1/2 h-0.5 ${
                    getConnectorColor(index - 1)
                  } transition-all duration-500 ease-out`} 
                  style={{ 
                    width: 'calc(100% - 1.25rem)',
                    zIndex: 1
                  }} />
                )}
                
                {/* Step Circle */}
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  getStepColor(status)
                } relative z-10 transform group-hover:scale-110`}>
                  {step.icon}
                </div>
                
                {/* Step Label */}
                <div className="mt-2 text-center">
                  <div className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                    status === 'completed' ? 'text-emerald-600' :
                    status === 'current' ? 'text-blue-600' :
                    'text-slate-400'
                  }`}>
                    {step.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {step.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-700 ease-out transform ${
              order.status === 'Cancelled' || order.status === 'Returned' 
                ? 'bg-gradient-to-r from-red-500 to-red-600' 
                : 'bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500'
            }`}
            style={{ 
              width: `${progressPercentage}%`,
              animation: 'progressGlow 2s ease-in-out infinite alternate'
            }}
          />
        </div>
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border-emerald-300 shadow-sm';
      case 'in transit':
      case 'out for delivery':
      case 'shipped':
        return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300 shadow-sm';
      case 'processing':
        return 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border-amber-300 shadow-sm';
      case 'confirmed':
        return 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300 shadow-sm';
      case 'cancelled':
      case 'returned':
        return 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300 shadow-sm';
      default:
        return 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 border-slate-300 shadow-sm';
    }
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  

  const filterOptions = [
    { 
      value: 'all', 
      label: 'All Orders', 
      count: orderState.orders.length,
      icon: <Box className="h-4 w-4" />,
      color: 'bg-slate-100 hover:bg-slate-200 text-slate-700'
    },
    { 
      value: 'processing', 
      label: 'Processing', 
      count: getOrdersByStatus('Processing').length,
      icon: <Clock className="h-4 w-4" />,
      color: 'bg-amber-100 hover:bg-amber-200 text-amber-700'
    },
    { 
      value: 'confirmed', 
      label: 'Confirmed', 
      count: getOrdersByStatus('Confirmed').length,
      icon: <CheckCircle2 className="h-4 w-4" />,
      color: 'bg-purple-100 hover:bg-purple-200 text-purple-700'
    },
    { 
      value: 'shipped', 
      label: 'Shipped', 
      count: getOrdersByStatus('Shipped').length,
      icon: <Truck className="h-4 w-4" />,
      color: 'bg-blue-100 hover:bg-blue-200 text-blue-700'
    },
    { 
      value: 'delivered', 
      label: 'Delivered', 
      count: getOrdersByStatus('Delivered').length,
      icon: <CheckCircle className="h-4 w-4" />,
      color: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700'
    },
    { 
      value: 'cancelled', 
      label: 'Cancelled', 
      count: getOrdersByStatus('Cancelled').length,
      icon: <X className="h-4 w-4" />,
      color: 'bg-red-100 hover:bg-red-200 text-red-700'
    }
  ];

  const activeOrders = orderState.orders.filter(o => !['Delivered', 'Cancelled', 'Returned'].includes(o.status)).length;
  const totalSpent = orderState.orders.reduce((sum, order) => sum + order.total, 0);
  const deliveredOrders = getOrdersByStatus('Delivered').length;

  if (orderState.isLoading) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading your orders...</p>
        </div>
      </MobileLayout>
    );
  }

  if (orderState.error) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
          <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-red-500 mb-4" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Error loading orders</h2>
          <p className="text-gray-600 mb-4 text-sm sm:text-base px-4">{orderState.error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 text-sm sm:text-base"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </MobileLayout>
    );
  }

  if (orderState.orders.length === 0) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
          <Package className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mb-4" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base px-4">Your order history will appear here once you make a purchase.</p>
          <Link href="/products">
            <Button className="gap-2 text-sm sm:text-base">
              <ShoppingCart className="h-4 w-4" />
              Start Shopping
            </Button>
          </Link>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <style jsx>{`
        @keyframes progressGlow {
          0% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
          100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.3); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 py-2 sm:py-4 md:py-8">
        <div className="container mx-auto px-2 sm:px-4">
          {/* Enhanced Header Section */}
          <div className="mb-4 sm:mb-6 md:mb-8 animate-fade-in-up">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 mb-4 sm:mb-6 md:mb-8">
              <div className="space-y-2 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg sm:rounded-xl p-2 sm:p-3 text-white shadow-sm">
                    <Package className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                      My Orders
                    </h1>
                    <p className="text-slate-600 text-sm sm:text-base md:text-lg">
                      Track and manage your orders • {orderState.orders.length} total orders
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Quick Stats */}
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 shadow-sm border border-slate-200 hover:shadow-sm transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-1 sm:mb-0">
                      <div className="text-xs sm:text-sm font-medium text-slate-600">Active Orders</div>
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">{activeOrders}</div>
                    </div>
                    <div className="bg-blue-100 rounded-full p-1 sm:p-2 group-hover:scale-110 transition-transform duration-300 self-end sm:self-auto">
                      <Activity className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 shadow-sm border border-slate-200 hover:shadow-sm transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-1 sm:mb-0">
                      <div className="text-xs sm:text-sm font-medium text-slate-600">Total Spent</div>
                      <div className="text-sm sm:text-lg md:text-2xl font-bold text-emerald-600">৳{totalSpent.toFixed(0)}</div>
                    </div>
                    <div className="bg-emerald-100 rounded-full p-1 sm:p-2 group-hover:scale-110 transition-transform duration-300 self-end sm:self-auto">
                      <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-emerald-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 shadow-sm border border-slate-200 hover:shadow-sm transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-1 sm:mb-0">
                      <div className="text-xs sm:text-sm font-medium text-slate-600">Delivered</div>
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600">{deliveredOrders}</div>
                    </div>
                    <div className="bg-purple-100 rounded-full p-1 sm:p-2 group-hover:scale-110 transition-transform duration-300 self-end sm:self-auto">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Search and Filter Controls */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm border border-slate-200 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
                {/* Search */}
                <div className="relative group">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 sm:h-5 sm:w-5 group-focus-within:text-blue-500 transition-colors duration-200" />
                  <Input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 sm:pl-12 pr-4 py-2 sm:py-3 w-full border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-300 text-sm sm:text-base bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white/70"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 sm:h-7 sm:w-7 p-0 hover:bg-slate-100 rounded-full"
                    >
                      <X className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  )}
                </div>
                
                {/* Sort and Filter Controls */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {/* Orders per page dropdown */}
                  <select
                    aria-label="Orders per page"
                    id="ordersPerPage"
                    value={ordersPerPage}
                    onChange={(e) => handleOrdersPerPageChange(Number(e.target.value))}
                    className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-white/80 backdrop-blur-sm text-xs sm:text-sm font-medium hover:bg-white transition-all duration-200 flex-1 sm:flex-none"
                  >
                    <option value={6}>6 orders</option>
                    <option value={12}>12 orders</option>
                    <option value={24}>24 orders</option>
                    <option value={48}>48 orders</option>
                  </select>
                  
                  <select
                    aria-label="Sort by"
                    id="sortBy"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'total' | 'status')}
                    className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-white/80 backdrop-blur-sm text-xs sm:text-sm font-medium hover:bg-white transition-all duration-200 flex-1 sm:flex-none"
                  >
                    <option value="date">Date</option>
                    <option value="total">Total</option>
                    <option value="status">Status</option>
                  </select>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white border-slate-300 transition-all duration-200"
                  >
                    {sortOrder === 'asc' ? <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" /> : <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl lg:hidden bg-white/80 backdrop-blur-sm hover:bg-white border-slate-300 transition-all duration-200 flex-1 sm:flex-none"
                  >
                    <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Filters</span>
                  </Button>
                </div>
              </div>
              
              {/* Enhanced Status Filters */}
              <div className={`mt-3 sm:mt-4 md:mt-6 transition-all duration-300 ${showFilters || 'hidden lg:block'} ${showFilters ? 'animate-fade-in-up' : ''}`}>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {filterOptions.map((filter, index) => (
                    <Button
                      key={filter.value}
                      variant={selectedFilter === filter.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedFilter(filter.value)}
                      className={`rounded-lg sm:rounded-xl transition-all duration-200 transform flex items-center gap-1 sm:gap-2 font-medium text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 ${
                        selectedFilter === filter.value 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/25 border-0' 
                          : `${filter.color} border-slate-300 hover:shadow-md`
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span className="hidden sm:inline">{filter.icon}</span>
                      <span className="truncate">{filter.label}</span>
                      {filter.count > 0 && (
                        <Badge 
                          variant="secondary" 
                          className={`ml-1 text-xs px-1 py-0 ${
                            selectedFilter === filter.value 
                              ? 'bg-white/20 text-current border-0' 
                              : 'bg-white text-slate-700 border-0 shadow-sm'
                          } transition-all duration-200`}
                        >
                          {filter.count}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Orders List */}
          {filteredAndSortedOrders.length === 0 ? (
            <div className="text-center py-12 sm:py-16 md:py-20 animate-fade-in-up">
              <div className="relative mb-6 sm:mb-8">
                <div className="bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100 rounded-2xl sm:rounded-3xl w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center mx-auto shadow-sm">
                  <Package className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 text-slate-400" />
                </div>
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-blue-500 rounded-full p-1 sm:p-2 animate-bounce">
                  <Search className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-3 sm:mb-4">
                {searchQuery.trim() || selectedFilter !== 'all' ? 'No orders found' : 'No orders yet'}
              </h2>
              <p className="text-slate-600 mb-6 sm:mb-8 max-w-md mx-auto text-base sm:text-lg px-4">
                {searchQuery.trim() || selectedFilter !== 'all' 
                  ? 'Try adjusting your search or filters to find what you\'re looking for.'
                  : 'Start shopping to see your orders here. We\'ll track everything for you!'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                {(searchQuery.trim() || selectedFilter !== 'all') && (
                  <Button 
                    variant="outline" 
                    onClick={() => { setSearchQuery(''); setSelectedFilter('all'); }}
                    className="rounded-xl border-slate-300 hover:bg-slate-50 transition-all duration-200"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                )}
                <Link href="/products">
                  <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-sm hover:shadow-sm transition-all duration-200 text-white w-full sm:w-auto">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Start Shopping
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              {/* Results counter */}
              <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white/50 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-6 py-3 sm:py-4 border border-slate-200 gap-2 sm:gap-0">
                <div className="text-slate-600 text-sm sm:text-base">
                  <span className="font-medium text-slate-800">
                    Showing {displayedOrders.length} of {totalOrders} orders
                  </span>
                  {searchQuery.trim() || selectedFilter !== 'all' ? (
                    <span className="ml-2 text-xs sm:text-sm">
                      {searchQuery.trim() && `• Searching for "${searchQuery}"`}
                      {selectedFilter !== 'all' && `• Filtered by ${selectedFilter}`}
                    </span>
                  ) : null}
                </div>
                
                {displayedOrders.length > 0 && (
                  <div className="text-xs sm:text-sm text-slate-500">
                    {ordersPerPage} per page
                  </div>
                )}
              </div>
              
              <div className="grid gap-4 sm:gap-6 md:gap-8">
                {displayedOrders.map((order, index) => (
                <Card 
                  key={order.id} 
                  className="border-0 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-2xl sm:rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm hover:bg-white animate-fade-in-up group"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredOrder(order.id)}
                  onMouseLeave={() => setHoveredOrder(null)}
                >
                  <CardContent className="p-0">
                    {/* Enhanced Order Header */}
                    <div 
                      className="p-3 sm:p-4 md:p-6 cursor-pointer hover:bg-gradient-to-br hover:from-slate-50 hover:to-blue-50/50 transition-all duration-300"
                      onClick={() => toggleOrderExpansion(order.id)}
                    >
                      <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className={`bg-gradient-to-br ${
                            hoveredOrder === order.id ? 'from-white to-white shadow-sm shadow-blue-500/25' : 'from-white to-white shadow-md'
                          } rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 text-white transition-all duration-300 transform ${
                            hoveredOrder === order.id ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
                          } flex-shrink-0`}>
                            {getStatusIcon(order.status)}
                          </div>
                          
                          <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                              <h3 className="text-lg sm:text-xl font-bold text-slate-800 hover:text-blue-600 transition-colors duration-200 truncate">#{order.id}</h3>
                              <Badge className={`${getStatusColor(order.status)} border-0 font-semibold px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full transition-all duration-300 text-xs sm:text-sm self-start sm:self-auto`}>
                                {order.status}
                              </Badge>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600">
                              <div className="flex items-center gap-1 sm:gap-2 bg-slate-100 rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-2 hover:bg-slate-200 transition-colors duration-200">
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
                                <span className="font-medium truncate">{new Date(order.date).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}</span>
                              </div>
                              
                              <div className="flex items-center gap-1 sm:gap-2 bg-slate-100 rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-2 hover:bg-slate-200 transition-colors duration-200">
                                <Package className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600 flex-shrink-0" />
                                <span className="font-medium">{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                          <div className="flex items-center justify-between sm:justify-start sm:gap-4">
                            <div className="text-left space-y-1">
                              <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                                ৳{order.total.toFixed(2)}
                              </div>
                              <div className="text-xs sm:text-sm text-slate-500 flex items-center gap-1">
                                <CreditCard className="h-3 w-3" />
                                <span className="truncate">{order.paymentMethod}</span>
                              </div>
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="rounded-xl hover:bg-blue-50 transition-all duration-300 group/button p-2 sm:p-3"
                            >
                              <ArrowRight className={`h-4 w-4 sm:h-5 sm:w-5 transition-all duration-500 group-hover/button:text-blue-600 ${
                                expandedOrder === order.id ? 'rotate-90 text-blue-600' : 'rotate-0'
                              }`} />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Mini Progress Indicator */}
                        <div className="">
                          <div className="w-full bg-slate-200 rounded-full h-1 sm:h-1.5 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-700 ease-out ${
                                order.status === 'Cancelled' || order.status === 'Returned' 
                                  ? 'bg-gradient-to-r from-red-400 to-red-500' 
                                  : 'bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500'
                              }`}
                              style={{ 
                                width: `${(() => {
                                  const status = order.status.toLowerCase();
                                  const stepOrder = ['processing', 'confirmed', 'shipped', 'delivered'];
                                  const currentIndex = stepOrder.indexOf(status);
                                  return ((currentIndex + 1) / stepOrder.length) * 100;
                                })()}%`
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Expanded Order Details */}
                    {expandedOrder === order.id && (
                      <div className="border-t border-slate-100 bg-gradient-to-br from-slate-50/80 to-blue-50/40 backdrop-blur-sm animate-fade-in-up">
                        <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 md:space-y-8">
                          {/* Order Progress */}
                          <OrderProgress order={order} />
                          
                          {/* Order Items */}
                          <div>
                            <h4 className="font-bold text-slate-900 mb-3 sm:mb-4 md:mb-6 text-base sm:text-lg flex items-center gap-2">
                              <Box className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                              Order Items
                            </h4>
                            <div className="grid gap-2 sm:gap-3 md:gap-4">
                              {order.items.map((item, itemIndex) => (
                                <div 
                                  key={item.id} 
                                  className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 shadow-sm border border-slate-100 hover:shadow-md hover:bg-white transition-all duration-300 group/item"
                                  style={{ animationDelay: `${itemIndex * 100}ms` }}
                                >
                                  <div className="flex items-start sm:items-center gap-2 sm:gap-3 md:gap-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 group-hover/item:shadow-lg transition-shadow duration-300">
                                      <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover/item:scale-105 rounded-lg sm:rounded-xl"
                                        sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 64px"
                                      />
                                    </div>
                                    
                                    <div className="flex-1 min-w-0 space-y-1 sm:space-y-2">
                                      <h5 className="font-semibold text-slate-900 text-xs sm:text-sm md:text-base leading-tight truncate hover:text-blue-600 transition-colors duration-200">
                                        {item.name}
                                      </h5>
                                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                                        {item.selectedColor && (
                                          <span className="text-xs bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium border border-slate-200">
                                            {item.selectedColor}
                                          </span>
                                        )}
                                        {item.selectedSize && (
                                          <span className="text-xs bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium border border-slate-200">
                                            {item.selectedSize}
                                          </span>
                                        )}
                                        <span className="text-xs bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-semibold border border-blue-200">
                                          Qty: {item.quantity}
                                        </span>
                                      </div>
                                    </div>
                                    
                                    <div className="text-right flex-shrink-0">
                                      <div className="text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent">
                                        ৳{item.price.toFixed(2)}
                                      </div>
                                      <div className="text-xs sm:text-sm text-slate-500">
                                        ৳{(item.price / item.quantity).toFixed(2)} each
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Order Summary */}
                          <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-slate-100 shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-3 sm:mb-4 text-base sm:text-lg flex items-center gap-2">
                              <FileCheck className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
                              Order Summary
                            </h4>
                            <div className="space-y-2 sm:space-y-3">
                              <div className="flex justify-between text-slate-600 text-sm sm:text-base">
                                <span>Subtotal:</span>
                                <span className="font-medium">${(order.total * 0.9).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-slate-600 text-sm sm:text-base">
                                <span>Shipping:</span>
                                <span className="font-medium">${(order.total * 0.05).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-slate-600 text-sm sm:text-base">
                                <span>Tax:</span>
                                <span className="font-medium">${(order.total * 0.05).toFixed(2)}</span>
                              </div>
                              <Separator className="my-2 sm:my-3" />
                              <div className="flex justify-between text-base sm:text-lg font-bold text-slate-900">
                                <span>Total:</span>
                                <span className="text-emerald-600">${order.total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Shipping Information */}
                          {order.shippingInfo && (
                            <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-slate-100 shadow-sm">
                              <h4 className="font-bold text-slate-900 mb-3 sm:mb-4 text-base sm:text-lg flex items-center gap-2">
                                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                Shipping Information
                              </h4>
                              <div className="space-y-2 sm:space-y-3 text-slate-600">
                                <div className="flex items-start gap-2 sm:gap-3">
                                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1 sm:mt-2 flex-shrink-0"></div>
                                  <div className="min-w-0">
                                    <div className="font-medium text-slate-800 text-sm sm:text-base">Delivery Address</div>
                                    <div className="text-xs sm:text-sm break-words">
                                      {order.shippingInfo.address}<br/>
                                      {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zip}
                                    </div>
                                  </div>
                                </div>
                                {order.shippingInfo.estimatedDelivery && (
                                  <div className="flex items-start gap-2 sm:gap-3">
                                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-1 sm:mt-2 flex-shrink-0"></div>
                                    <div className="min-w-0">
                                      <div className="font-medium text-slate-800 text-sm sm:text-base">Estimated Delivery</div>
                                      <div className="text-xs sm:text-sm">{order.shippingInfo.estimatedDelivery}</div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Enhanced Action Buttons */}
                          <div className="flex flex-wrap gap-2 sm:gap-3 pt-3 sm:pt-4 md:pt-6 border-t border-slate-200">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="rounded-lg sm:rounded-xl bg-white/80 backdrop-blur-sm border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-200 shadow-sm text-xs sm:text-sm px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3"
                            >
                              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                              <span className="hidden sm:inline">Download </span>Invoice
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              </div>
              
              {/* Load More Section */}
              {hasMoreOrders && (
                <div className="mt-6 sm:mt-8 text-center animate-fade-in-up">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
                    <div className="mb-3 sm:mb-4">
                      <p className="text-slate-600 mb-2 text-sm sm:text-base">
                        Showing <span className="font-semibold text-slate-800">{displayedOrders.length}</span> of{' '}
                        <span className="font-semibold text-slate-800">{totalOrders}</span> orders
                      </p>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${(displayedOrders.length / totalOrders) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <Button
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      size="lg"
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-sm hover:shadow-sm transition-all duration-200 text-white min-w-[160px] sm:min-w-[200px] text-sm sm:text-base"
                    >
                      {isLoadingMore ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-t-2 border-b-2 border-white mr-2" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                          Load More ({Math.min(ordersPerPage, totalOrders - displayedOrders.length)})
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

         
        </div>
      </div>
    </MobileLayout>
  );
}