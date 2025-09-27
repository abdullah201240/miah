'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Search,
  Calendar,
  User,
  Phone,
  Mail,
  ArrowLeft,
  Copy,
  ExternalLink,
  Star,
  Shield
} from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';

export default function EnhancedTrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Enhanced mock order data
  const mockOrderData = {
    id: 'ORD-789456123',
    status: 'In Transit',
    date: '2024-12-15',
    estimatedDelivery: 'December 20, 2024',
    total: 129.99,
    carrier: 'Express Shipping',
    trackingCode: 'EX1234567890',
    items: [
      {
        id: 1,
        name: 'Modern Coffee Table',
        quantity: 1,
        price: 89.99,
        image: '/placeholder.jpg',
        rating: 4.8
      },
      {
        id: 2,
        name: 'Accent Chair - Velvet Blue',
        quantity: 1,
        price: 39.99,
        image: '/placeholder.jpg',
        rating: 4.9
      }
    ],
    shippingInfo: {
      address: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      recipient: 'John Doe',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@email.com'
    },
    progress: [
      { status: 'Order Placed', date: 'Dec 15, 2024 10:30 AM', time: '10:30 AM', completed: true, description: 'Order confirmed and payment processed' },
      { status: 'Processing', date: 'Dec 16, 2024 2:15 PM', time: '2:15 PM', completed: true, description: 'Items picked and packaged' },
      { status: 'Shipped', date: 'Dec 17, 2024 9:00 AM', time: '9:00 AM', completed: true, description: 'Package handed to carrier' },
      { status: 'In Transit', date: 'Dec 18, 2024 11:45 AM', time: '11:45 AM', completed: true, description: 'Currently at sorting facility - Chicago, IL' },
      { status: 'Out for Delivery', date: '', time: '', completed: false, description: 'Package will be delivered today' },
      { status: 'Delivered', date: '', time: '', completed: false, description: 'Package successfully delivered' }
    ]
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      if (trackingNumber === '123456' || trackingNumber === mockOrderData.id) {
        setOrderData(mockOrderData);
      } else {
        setError('Order not found. Please check your tracking number and try again.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'in transit':
      case 'out for delivery':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'processing':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'shipped':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-emerald-600" />;
      case 'in transit':
      case 'out for delivery':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-amber-600" />;
      case 'shipped':
        return <Package className="h-5 w-5 text-purple-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <MobileLayout>

   

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      
      <div className="container mx-auto px-4 py-6 lg:py-6 max-w-7xl">
        {/* Desktop Header */}
       

        {/* Mobile Header Content */}
        <div className="text-center mb-6 lg:hidden">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl mb-4">
            <Package className="h-8 w-8 text-white" />
          </div>
          <p className="text-gray-600">Enter your tracking number below</p>
        </div>

        {/* Enhanced Tracking Form */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 lg:p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="trackingNumber" className="block text-sm font-semibold text-gray-700 mb-3">
                  Tracking Number
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="trackingNumber"
                    type="text"
                    placeholder="Enter your tracking number (e.g., ORD-789456123)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder(e)}
                    className="pl-12 pr-4 py-4 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
                  />
                </div>
                {error && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">{error}</p>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={handleTrackOrder}
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" />
                    <span>Tracking Order...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Search className="h-5 w-5 mr-2" />
                    Track Order
                  </div>
                )}
              </Button>
            </div>
            
            {/* Enhanced Sample Tracking */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Try our demo tracking
                  </h3>
                  <p className="text-sm text-blue-700 mb-4">
                    See how order tracking works with this sample order:
                  </p>
                  <div 
                    className="inline-flex items-center px-4 py-2 bg-white border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-50 transition-all duration-200 group"
                    onClick={() => setTrackingNumber('ORD-789456123')}
                  >
                    <code className="text-blue-700 font-mono text-sm mr-3">ORD-789456123</code>
                    <Copy className="h-4 w-4 text-blue-500 group-hover:text-blue-600" />
                  </div>
                  <p className="text-xs text-blue-600 mt-2">
                    Click to auto-fill this tracking number
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Order Information */}
        {orderData && (
          <div className="space-y-6 animate-slideUp">
            {/* Order Header Card */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 lg:px-8 py-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="text-white">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-5 w-5" />
                      <span className="text-sm font-medium opacity-90">Verified Order</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-1">Order #{orderData.id}</h2>
                    <p className="opacity-90">Placed on {new Date(orderData.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                  <div className="flex flex-col items-start lg:items-end space-y-2">
                    <div className={`px-4 py-2 rounded-full border text-sm font-semibold flex items-center space-x-2 bg-white ${getStatusColor(orderData.status).replace('bg-', 'text-').replace('text-', '')}`}>
                      {getStatusIcon(orderData.status)}
                      <span>{orderData.status}</span>
                    </div>
                    <div className="text-white/90 text-sm">
                      <span>Total: </span>
                      <span className="font-bold text-lg">${orderData.total}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-0">
                <div className="grid grid-cols-1 xl:grid-cols-2 divide-y xl:divide-y-0 xl:divide-x divide-gray-100">
                  {/* Order Items */}
                  <div className="p-6 lg:p-8">
                    <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center">
                      <Package className="h-6 w-6 mr-3 text-blue-600" />
                      Order Items ({orderData.items.length})
                    </h3>
                    <div className="space-y-4">
                      {orderData.items.map((item: any) => (
                        <div key={item.id} className="group">
                          <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                            <div className="bg-white border-2 border-gray-200 rounded-xl w-16 h-16 flex-shrink-0 flex items-center justify-center">
                              <Package className="h-8 w-8 text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                              <div className="flex items-center space-x-3 mb-2">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                                </div>
                                <span className="text-gray-300">•</span>
                                <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                              </div>
                              <div className="text-lg font-bold text-blue-600">${item.price}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="p-6 lg:p-8 bg-gradient-to-br from-gray-50/50 to-blue-50/30">
                    <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center">
                      <MapPin className="h-6 w-6 mr-3 text-blue-600" />
                      Delivery Details
                    </h3>
                    
                    <div className="space-y-6">
                      {/* Delivery Address */}
                      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1">{orderData.shippingInfo.recipient}</p>
                            <p className="text-gray-600 text-sm mb-1">{orderData.shippingInfo.address}</p>
                            <p className="text-gray-600 text-sm">
                              {orderData.shippingInfo.city}, {orderData.shippingInfo.state} {orderData.shippingInfo.zip}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                          <Phone className="h-5 w-5 text-gray-500" />
                          <span className="text-sm text-gray-700">{orderData.shippingInfo.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                          <Mail className="h-5 w-5 text-gray-500" />
                          <span className="text-sm text-gray-700">{orderData.shippingInfo.email}</span>
                        </div>
                      </div>

                      {/* Delivery Info */}
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="text-sm text-green-700 font-medium">Estimated Delivery</p>
                            <p className="font-bold text-green-800">{orderData.estimatedDelivery}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Progress Tracker */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-gray-900 text-xl flex items-center">
                    <Truck className="h-6 w-6 mr-3 text-blue-600" />
                    Tracking Progress
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Carrier:</span>
                    <span className="font-semibold">{orderData.carrier}</span>
                  </div>
                </div>
                
                <div className="relative">
                  {orderData.progress.map((step: any, index: number) => (
                    <div key={index} className={`flex items-start pb-8 ${index === orderData.progress.length - 1 ? 'pb-0' : ''}`}>
                      <div className="flex flex-col items-center mr-6 relative z-10">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                          step.completed 
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 border-blue-200 shadow-lg' 
                            : 'bg-white border-gray-300'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="h-6 w-6 text-white" />
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-gray-400" />
                          )}
                        </div>
                        {index < orderData.progress.length - 1 && (
                          <div className={`h-16 w-1 mt-2 rounded-full transition-all duration-300 ${
                            step.completed ? 'bg-gradient-to-b from-blue-500 to-blue-300' : 'bg-gray-200'
                          }`}></div>
                        )}
                      </div>
                      <div className={`flex-1 min-w-0 ${step.completed ? '' : 'opacity-60'}`}>
                        <div className={`rounded-xl p-5 border transition-all duration-200 ${
                          step.completed 
                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200' 
                            : 'bg-gray-50 border-gray-200'
                        }`}>
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-2">
                            <h4 className={`font-bold text-lg ${
                              step.completed ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {step.status}
                            </h4>
                            {step.date && (
                              <div className={`text-sm ${
                                step.completed ? 'text-blue-700' : 'text-gray-500'
                              }`}>
                                <span className="font-medium">{step.date}</span>
                              </div>
                            )}
                          </div>
                          <p className={`text-sm ${
                            step.completed ? 'text-gray-700' : 'text-gray-500'
                          }`}>
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Enhanced Empty State */}
        {!orderData && !isLoading && (
          <div className="text-center py-16 lg:py-24">
            <div className="relative inline-block mb-8">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
                <Package className="h-12 w-12 lg:h-16 lg:w-16 text-gray-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Search className="h-4 w-4 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Track Your Order</h3>
            <p className="text-gray-600 max-w-md mx-auto text-lg leading-relaxed">
              Enter your tracking number above to get real-time updates on your order status and delivery progress.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Real-time updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>Secure tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-purple-500" />
                <span>Multiple carriers</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
     </MobileLayout>
  );
}