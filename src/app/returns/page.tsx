'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import MobileLayout from '@/components/layout/MobileLayout';
import { 
  Package, 
  RotateCcw, 
  FileText, 
  Truck, 
  Calendar, 
  CreditCard, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Download,
  AlertCircle,
  Clock,
  User,
  Mail,
  Phone
} from 'lucide-react';

export default function ReturnsExchangesPage() {
  const [activeTab, setActiveTab] = useState<'return' | 'exchange'>('return');
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [returnMethod, setReturnMethod] = useState('pickup');
  const [exchangeItem, setExchangeItem] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const returnReasons = [
    "Item damaged or defective",
    "Wrong item received",
    "Item not as described",
    "Changed mind",
    "Item doesn't fit",
    "Other"
  ];

  const exchangeReasons = [
    "Wrong size",
    "Wrong color",
    "Damaged item",
    "Item not as described",
    "Changed preference",
    "Other"
  ];

  const returnMethods = [
    { value: 'pickup', label: 'Schedule a pickup (Free)', description: 'We\'ll arrange for a courier to pick up your item' },
    { value: 'dropoff', label: 'Drop off at location', description: 'Drop off at one of our return centers' },
    { value: 'mail', label: 'Mail back', description: 'Print label and mail back yourself' }
  ];

  const policies = [
    {
      title: "Return Policy",
      description: "You can return most items within 30 days of purchase for a full refund.",
      icon: <RotateCcw className="h-5 w-5" />
    },
    {
      title: "Exchange Policy",
      description: "Exchange items within 30 days for a different size, color, or style.",
      icon: <ArrowRight className="h-5 w-5" />
    },
    {
      title: "Refund Process",
      description: "Refunds are processed within 5-7 business days after we receive your item.",
      icon: <CreditCard className="h-5 w-5" />
    },
    {
      title: "Condition Requirements",
      description: "Items must be in new, unused condition with all original packaging.",
      icon: <CheckCircle className="h-5 w-5" />
    }
  ];

  if (isSubmitted) {
    return (
      <MobileLayout showBack={true}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-6">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
                <CheckCircle className="h-10 w-10 text-emerald-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Request Submitted!</h1>
              <p className="text-gray-600 mb-6">
                Your {activeTab === 'return' ? 'return' : 'exchange'} request has been received.
              </p>
              <Card className="max-w-md mx-auto mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">Request ID:</span>
                    <span className="font-medium">REQ-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{orderId || 'N/A'}</span>
                  </div>
                </CardContent>
              </Card>
              <p className="text-gray-600 mb-8">
                We've sent a confirmation email to {email || 'your email address'}.<br />
                Our team will process your request within 1-2 business days.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setOrderId('');
                    setEmail('');
                    setReason('');
                    setDetails('');
                  }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                >
                  Submit Another Request
                </Button>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout showBack={true}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-6">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full mb-4">
              <RotateCcw className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Returns & Exchanges</h1>
            <p className="text-gray-600">Easy process for returning or exchanging your items</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-1 max-w-md mx-auto">
            <button
              className={`flex-1 py-3 px-4 rounded-md text-center font-medium transition-colors ${
                activeTab === 'return'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('return')}
            >
              <div className="flex items-center justify-center gap-2">
                <RotateCcw className="h-5 w-5" />
                Return
              </div>
            </button>
            <button
              className={`flex-1 py-3 px-4 rounded-md text-center font-medium transition-colors ${
                activeTab === 'exchange'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('exchange')}
            >
              <div className="flex items-center justify-center gap-2">
                <ArrowRight className="h-5 w-5" />
                Exchange
              </div>
            </button>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <Card className="shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {activeTab === 'return' ? (
                      <>
                        <RotateCcw className="h-5 w-5" />
                        Return Request
                      </>
                    ) : (
                      <>
                        <ArrowRight className="h-5 w-5" />
                        Exchange Request
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                          Order ID *
                        </label>
                        <Input
                          id="orderId"
                          type="text"
                          placeholder="Enter your order ID"
                          value={orderId}
                          onChange={(e) => setOrderId(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                        {activeTab === 'return' ? 'Reason for Return *' : 'Reason for Exchange *'}
                      </label>
                      <select
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a reason</option>
                        {(activeTab === 'return' ? returnReasons : exchangeReasons).map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    {activeTab === 'exchange' && (
                      <div>
                        <label htmlFor="exchangeItem" className="block text-sm font-medium text-gray-700 mb-2">
                          Desired Exchange Item
                        </label>
                        <Input
                          id="exchangeItem"
                          type="text"
                          placeholder="What would you like to exchange for? (e.g., Size Large Blue Shirt)"
                          value={exchangeItem}
                          onChange={(e) => setExchangeItem(e.target.value)}
                        />
                      </div>
                    )}

                    <div>
                      <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Details
                      </label>
                      <Textarea
                        id="details"
                        placeholder="Please provide any additional information that might help us process your request faster..."
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        rows={4}
                      />
                    </div>

                    {activeTab === 'return' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Return Method
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {returnMethods.map((method) => (
                            <div
                              key={method.value}
                              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                returnMethod === method.value
                                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => setReturnMethod(method.value)}
                            >
                              <div className="flex items-start">
                                <div className={`mt-1 mr-3 w-4 h-4 rounded-full border flex items-center justify-center ${
                                  returnMethod === method.value
                                    ? 'border-blue-500 bg-blue-500'
                                    : 'border-gray-300'
                                }`}>
                                  {returnMethod === method.value && (
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-800">{method.label}</div>
                                  <div className="text-sm text-gray-600 mt-1">{method.description}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium text-base"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2" />
                          Processing Request...
                        </>
                      ) : (
                        `Submit ${activeTab === 'return' ? 'Return' : 'Exchange'} Request`
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Policy Information */}
            <div>
              <div className="space-y-6">
                <Card className="shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Our Policies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {policies.map((policy, index) => (
                        <div key={index} className="flex items-start">
                          <div className="mt-1 mr-3 text-blue-600">
                            {policy.icon}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">{policy.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{policy.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Return Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-medium text-sm">1</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Submit Request</h3>
                          <p className="text-sm text-gray-600">Fill out our simple return form</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-medium text-sm">2</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Get Approval</h3>
                          <p className="text-sm text-gray-600">We'll review and approve your request</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-medium text-sm">3</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Return Item</h3>
                          <p className="text-sm text-gray-600">Send back your item using your preferred method</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-medium text-sm">4</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Get Refund</h3>
                          <p className="text-sm text-gray-600">Receive your refund or exchange within 5-7 business days</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-800 mb-2">Need Help?</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Our customer service team is here to help with any questions about returns or exchanges.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-4 w-4 mr-2 text-gray-500" />
                            <span>+1 (555) 123-4567</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-4 w-4 mr-2 text-gray-500" />
                            <span>returns@furniture.com</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}