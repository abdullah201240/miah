'use client';

import React, { useState, useMemo } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/products';
import { useOrders } from '@/contexts/OrderContext';
import { useRouter } from 'next/navigation';
import {
  Search,
  Plus,
  Minus,
  X,
  ShoppingCart,
  User,
  Package,
  Truck,
  Check,
  ArrowLeft,
  Star,
  Users,
  Crown,
  Building2,
  UserCheck,
  Calculator,
  UserPlus,
  Save,
  Upload,
  Eye,
  EyeOff,
  Camera
} from 'lucide-react';
import type { Product } from '@/data/products';
import type { Order, OrderItem } from '@/contexts/OrderContext';

// Mock VIP customers data
const vipCustomers = [
  {
    id: 'vip-001',
    name: 'Emma Thompson',
    email: 'emma.thompson@email.com',
    phone: '+1 (555) 123-4567',
    type: 'VIP',
    tier: 'Platinum',
    totalOrders: 24,
    totalSpent: 15680,
    address: '123 Luxury Ave, Beverly Hills, CA 90210',
    notes: 'Prefers expedited shipping, interior designer'
  },
  {
    id: 'vip-002',
    name: 'Marcus Johnson',
    email: 'marcus.j@corporatemail.com',
    phone: '+1 (555) 987-6543',
    type: 'Corporate',
    tier: 'Gold',
    totalOrders: 18,
    totalSpent: 23450,
    address: '456 Business Plaza, Suite 1200, New York, NY 10001',
    notes: 'Corporate account, bulk orders for office furniture'
  },
  {
    id: 'vip-003',
    name: 'Sarah Chen',
    email: 'sarah.chen@designer.com',
    phone: '+1 (555) 456-7890',
    type: 'VIP',
    tier: 'Diamond',
    totalOrders: 35,
    totalSpent: 28900,
    address: '789 Design District, Los Angeles, CA 90028',
    notes: 'Professional interior designer, frequent large orders'
  },
  {
    id: 'inhouse-001',
    name: 'In-House Sale',
    email: 'sales@furnistore.com',
    phone: '+1 (555) 999-0000',
    type: 'In-House',
    tier: 'Staff',
    totalOrders: 0,
    totalSpent: 0,
    address: 'Store Location - To be determined',
    notes: 'Walk-in customer or phone order'
  }
];

interface OrderItemWithDetails extends OrderItem {
  product: Product;
}

interface CustomerInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  tier: string;
  totalOrders: number;
  totalSpent: number;
  address: string;
  notes: string;
  image?: string;
}

export default function AdminCreateOrderPage() {
  const { addOrder } = useOrders();
  const router = useRouter();

  // Form states
  const [step, setStep] = useState(1); // 1: Customer, 2: Products, 3: Review
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerInfo | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItemWithDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [orderNotes, setOrderNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Customer selection
  const [customerSearch, setCustomerSearch] = useState('');
  const [showCreateCustomer, setShowCreateCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    type: 'Regular',
    tier: 'Bronze',
    notes: '',
    password: '',
    confirmPassword: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Filter customers
  const filteredCustomers = useMemo(() => {
    if (!customerSearch) return vipCustomers;
    const query = customerSearch.toLowerCase();
    return vipCustomers.filter(customer =>
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.type.toLowerCase().includes(query)
    );
  }, [customerSearch]);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setNewCustomer({...newCustomer, image: result});
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Create new customer
  const createNewCustomer = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone || !newCustomer.address || !newCustomer.password) {
      alert('Please fill in all required fields including password');
      return;
    }

    if (newCustomer.password !== newCustomer.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (newCustomer.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newCustomer.email)) {
      alert('Please enter a valid email address');
      return;
    }

    const customer: CustomerInfo = {
      id: `cust-${Date.now()}`,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      address: newCustomer.address,
      type: newCustomer.type,
      tier: newCustomer.tier,
      totalOrders: 0,
      totalSpent: 0,
      notes: newCustomer.notes || 'New customer created via admin order',
      image: newCustomer.image || '/default-avatar.png'
    };

    // Add to VIP customers list (in real app, this would be saved to database)
    vipCustomers.push(customer);
    setSelectedCustomer(customer);
    setShowCreateCustomer(false);
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      address: '',
      type: 'Regular',
      tier: 'Bronze',
      notes: '',
      password: '',
      confirmPassword: '',
      image: ''
    });
    setImagePreview(null);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    return filtered.filter(product => product.inStock);
  }, [searchQuery, categoryFilter]);

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const shippingCost = shippingMethod === 'standard' ? 15 : shippingMethod === 'express' ? 25 : 50;
  const total = subtotal + tax + shippingCost;

  // Add product to order
  const addProductToOrder = (product: Product) => {
    const existingItemIndex = orderItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      const newItems = [...orderItems];
      newItems[existingItemIndex].quantity += 1;
      setOrderItems(newItems);
    } else {
      const newItem: OrderItemWithDetails = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        sku: product.sku || '', // Add the sku property with a default empty string if product.sku is undefined
        product: product
      };
      setOrderItems([...orderItems, newItem]);
    }
  };

  // Update quantity
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setOrderItems(orderItems.filter(item => item.id !== productId));
    } else {
      const newItems = orderItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      setOrderItems(newItems);
    }
  };

  // Create order
  const createOrder = async () => {
    if (!selectedCustomer || orderItems.length === 0) return;
    
    setIsProcessing(true);
    
    try {
      const newOrder: Order = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Processing',
        total: total,
        subtotal: subtotal,
        shipping: shippingCost,
        tax: tax,
        items: orderItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          sku: item.product.sku || ''
        })),
        shippingInfo: {
          name: selectedCustomer.name,
          email: selectedCustomer.email,
          phone: selectedCustomer.phone,
          address: selectedCustomer.address,
          city: '',
          state: '',
          zip: '',
          method: shippingMethod === 'standard' ? 'Standard Shipping (3-5 business days)' : 
                 shippingMethod === 'express' ? 'Express Shipping (1-2 business days)' : 
                 'White Glove Delivery',
        },
        timeline: [
          {
            status: 'Order Placed',
            date: new Date().toISOString().split('T')[0],
            completed: true,
            description: `Admin order created for ${selectedCustomer.name} (${selectedCustomer.type})`
          },
          {
            status: 'Processing',
            date: new Date().toISOString().split('T')[0],
            completed: false,
            description: 'Order is being prepared for shipment'
          }
        ],
        paymentMethod: paymentMethod === 'credit-card' ? 'Credit Card' : 
                      paymentMethod === 'bank-transfer' ? 'Bank Transfer' : 'Cash',
        notes: `Admin Order - Customer: ${selectedCustomer.name} (${selectedCustomer.type}${selectedCustomer.tier ? ` - ${selectedCustomer.tier}` : ''})${orderNotes ? `\nNotes: ${orderNotes}` : ''}`
      };

      addOrder(newOrder);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      router.push('/admin/orders');
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Get tier badge color
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Diamond': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700';
      case 'Platinum': return 'bg-muted text-foreground border-border';
      case 'Gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700';
      case 'Staff': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700';
      case 'Silver': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700';
      case 'Bronze': return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700';
      default: return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700';
    }
  };

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'VIP': return <Crown className="h-4 w-4" />;
      case 'Corporate': return <Building2 className="h-4 w-4" />;
      case 'In-House': return <UserCheck className="h-4 w-4" />;
      case 'Wholesale': return <Package className="h-4 w-4" />;
      case 'Regular': return <User className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  return (
    <AdminLayout 
      title="Create New Order" 
      subtitle="Place orders for VIP clients and in-house sales"
    >
      <div className="space-y-4 sm:space-y-6 px-0 sm:px-4 md:px-6">
        {/* Progress Steps */}
        <Card className="border-none shadow-md rounded-none">
          <CardContent className="p-0 sm:p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-4 md:gap-8 w-full sm:w-auto">
                <div className={`flex items-center gap-1 sm:gap-3 ${step >= 1 ? 'text-blue-600' : 'text-muted-foreground'}`}>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground'}`}>
                    {step > 1 ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : '1'}
                  </div>
                  <span className="text-sm sm:text-base font-medium">Select Customer</span>
                </div>
                
                <div className={`hidden sm:block w-8 sm:w-12 md:w-16 h-px ${step >= 2 ? 'bg-blue-600' : 'bg-border'}`} />
                
                <div className={`flex items-center gap-1 sm:gap-3 ${step >= 2 ? 'text-blue-600' : 'text-muted-foreground'}`}>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground'}`}>
                    {step > 2 ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : '2'}
                  </div>
                  <span className="text-sm sm:text-base font-medium">Add Products</span>
                </div>
                
                <div className={`hidden sm:block w-8 sm:w-12 md:w-16 h-px ${step >= 3 ? 'bg-blue-600' : 'bg-border'}`} />
                
                <div className={`flex items-center gap-1 sm:gap-3 ${step >= 3 ? 'text-blue-600' : 'text-muted-foreground'}`}>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground'}`}>
                    3
                  </div>
                  <span className="text-sm sm:text-base font-medium">Review & Submit</span>
                </div>
              </div>
              
              <Button
                variant="outline"
                onClick={() => router.push('/admin/orders')}
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto mt-2 sm:mt-0"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Back to Orders</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Customer Selection */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
            <div className="lg:col-span-2">
              <Card className="border-none shadow-md dark:shadow-none rounded-none sm:rounded-lg">
                <CardHeader className="p-0 sm:p-4 md:p-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Select Customer</span>
                  </CardTitle>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <div className="relative flex-1 w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search customers..."
                        value={customerSearch}
                        onChange={(e) => setCustomerSearch(e.target.value)}
                        className="pl-10 w-full"
                      />
                    </div>
                    <Button
                      onClick={() => setShowCreateCustomer(!showCreateCustomer)}
                      variant="outline"
                      className="flex items-center gap-2 w-full sm:w-auto"
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>New Customer</span>
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0 sm:p-4 md:p-6 space-y-3 sm:space-y-4">  {/* Responsive padding */}
                  {/* Create New Customer Form */}
                  {showCreateCustomer && (
                    <div className="p-0 sm:p-4 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 dark:bg-blue-900/20">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-sm sm:text-base text-foreground flex items-center gap-2">
                          <UserPlus className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>Create New Customer & User Account</span>
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowCreateCustomer(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                        {/* Profile Image Upload */}
                        <div className="md:col-span-2">
                          <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Profile Image</label>
                          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/30">
                              {imagePreview ? (
                                <img
                                  src={imagePreview}
                                  alt="Preview"
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <Camera className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="customer-image"
                              />
                              <label
                                htmlFor="customer-image"
                                className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded-md cursor-pointer hover:bg-muted/50 transition-colors text-sm"
                              >
                                <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span>Upload Image</span>
                              </label>
                              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Name *</label>
                          <Input
                            value={newCustomer.name}
                            onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                            placeholder="Full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Email *</label>
                          <Input
                            type="email"
                            value={newCustomer.email}
                            onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                            placeholder="email@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Phone *</label>
                          <Input
                            value={newCustomer.phone}
                            onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Customer Type</label>
                          <select
                            aria-label="Customer Type"
                            id="customerType"
                            value={newCustomer.type}
                            onChange={(e) => setNewCustomer({...newCustomer, type: e.target.value})}
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground dark:bg-card/80"
                          >
                            <option value="Regular">Regular</option>
                            <option value="VIP">VIP</option>
                            <option value="Corporate">Corporate</option>
                            <option value="Wholesale">Wholesale</option>
                          </select>
                        </div>
                        
                        {/* Password Fields */}
                        <div>
                          <label className="block text-sm font-medium mb-1">Password *</label>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              value={newCustomer.password}
                              onChange={(e) => setNewCustomer({...newCustomer, password: e.target.value})}
                              placeholder="Minimum 6 characters"
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Confirm Password *</label>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              value={newCustomer.confirmPassword}
                              onChange={(e) => setNewCustomer({...newCustomer, confirmPassword: e.target.value})}
                              placeholder="Confirm password"
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          {newCustomer.password && newCustomer.confirmPassword && newCustomer.password !== newCustomer.confirmPassword && (
                            <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                          )}
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Address *</label>
                          <Input
                            value={newCustomer.address}
                            onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                            placeholder="Full address"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Tier</label>
                          <select
                            aria-label="Tier"
                            id="tier"
                            value={newCustomer.tier}
                            onChange={(e) => setNewCustomer({...newCustomer, tier: e.target.value})}
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground dark:bg-card/80"
                          >
                            <option value="Bronze">Bronze</option>
                            <option value="Silver">Silver</option>
                            <option value="Gold">Gold</option>
                            <option value="Platinum">Platinum</option>
                            <option value="Diamond">Diamond</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Notes</label>
                          <Input
                            value={newCustomer.notes}
                            onChange={(e) => setNewCustomer({...newCustomer, notes: e.target.value})}
                            placeholder="Additional notes (optional)"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-4">
                        <Button
                          onClick={createNewCustomer}
                          className="flex items-center space-x-2"
                          disabled={!newCustomer.name || !newCustomer.email || !newCustomer.phone || !newCustomer.address || !newCustomer.password || newCustomer.password !== newCustomer.confirmPassword}
                        >
                          <Save className="h-4 w-4" />
                          <span>Create Customer & Account</span>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowCreateCustomer(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {filteredCustomers.map((customer) => (
                    <div
                      key={customer.id}
                      className={`p-2 sm:p-4 rounded-lg border border-border shadow-sm cursor-pointer transition-all ${
                        selectedCustomer?.id === customer.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                          : 'border-border hover:border-blue-300 hover:bg-muted/50 dark:hover:bg-card/80'
                      }`}
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <div className="flex flex-col sm:flex-row items-start justify-between">
                        <div className="flex items-start space-x-2 sm:space-x-3 mb-2 sm:mb-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                            {getTypeIcon(customer.type)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium text-foreground text-sm sm:text-base">{customer.name}</h3>
                              <Badge className={getTierColor(customer.tier)}>
                                {customer.tier}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {customer.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{customer.email}</p>
                            <p className="text-sm text-muted-foreground">{customer.phone}</p>
                            <p className="text-xs text-muted-foreground mt-1">{customer.address}</p>
                            {customer.notes && (
                              <p className="text-xs text-blue-600 mt-1">{customer.notes}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-left sm:text-right text-sm">
                          <p className="text-muted-foreground">{customer.totalOrders} orders</p>
                          <p className="font-medium text-foreground">${customer.totalSpent.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="border-none shadow-md dark:shadow-none rounded-none sm:rounded-lg">
                <CardHeader className="p-0 sm:p-4 md:p-6">
                  <CardTitle>Customer Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-0 sm:p-4 md:p-6">
                  {selectedCustomer ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                          {getTypeIcon(selectedCustomer.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{selectedCustomer.name}</h3>
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <Badge className={getTierColor(selectedCustomer.tier)}>
                              {selectedCustomer.tier}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {selectedCustomer.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Email:</span> {selectedCustomer.email}</p>
                        <p><span className="font-medium">Phone:</span> {selectedCustomer.phone}</p>
                        <p><span className="font-medium">Address:</span> {selectedCustomer.address}</p>
                        <p><span className="font-medium">Total Orders:</span> {selectedCustomer.totalOrders}</p>
                        <p><span className="font-medium">Total Spent:</span> ${selectedCustomer.totalSpent.toLocaleString()}</p>
                      </div>
                      
                      <Button
                        onClick={() => setStep(2)}
                        className="w-full"
                      >
                        Continue to Products
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Select a customer to continue</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Step 2: Product Selection */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg rounded-none sm:rounded-lg">
                <CardHeader className="p-0 sm:p-4 md:p-6">
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Select Products</span>
                  </CardTitle>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2 sm:mt-0">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <select
                      aria-label="Category Filter"
                      id="categoryFilter"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="px-3 py-2 border border-border rounded-md bg-background text-foreground dark:bg-card/80"
                    >
                      <option value="all">All Categories</option>
                      <option value="sofa">Sofas</option>
                      <option value="chair">Chairs</option>
                      <option value="table">Tables</option>
                      <option value="bed">Beds</option>
                      <option value="storage">Storage</option>
                      <option value="decor">Decor</option>
                    </select>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0 sm:p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="border border-border rounded-lg p-2 sm:p-4 shadow-sm hover:shadow-md transition-shadow bg-background dark:bg-card">
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-xs sm:text-sm">{product.name}</h3>
                            <p className="text-xs text-muted-foreground">{product.category}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="font-bold text-sm">${product.price}</span>
                              {product.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through">
                                  ${product.originalPrice}
                                </span>
                              )}
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span className="text-xs">{product.rating}</span>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => addProductToOrder(product)}
                              className="mt-1 sm:mt-2 h-6 text-xs w-full sm:w-auto"
                            >
                              Add to Order
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="border-0 shadow-lg rounded-none sm:rounded-lg">
                <CardHeader className="p-0 sm:p-4 md:p-6">
                  <CardTitle className="flex items-center justify-between">
                    <span>Order Items</span>
                    <Badge variant="outline">{orderItems.length} items</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {orderItems.length > 0 ? (
                    <div className="space-y-4">
                      <div className="max-h-64 overflow-y-auto space-y-3">
                        {orderItems.map((item) => (
                          <div key={item.id} className="flex items-center space-x-2 sm:space-x-3 p-2 border border-border rounded shadow-sm bg-background dark:bg-card">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="text-xs sm:text-sm font-medium">{item.name}</h4>
                              <p className="text-xs text-muted-foreground">${item.price}</p>
                            </div>
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-6 w-6 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-6 w-6 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-4 border-t border-border space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal:</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Tax (8%):</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Shipping:</span>
                          <span>${shippingCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Total:</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Button
                        onClick={() => setStep(1)}
                        variant="outline"
                        className="w-full text-xs sm:text-sm py-1 sm:py-2"
                      >
                          Back to Customer
                        </Button>
                        <Button
                          onClick={() => setStep(3)}
                          className="w-full"
                          disabled={orderItems.length === 0}
                        >
                          Review Order
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No items added yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && selectedCustomer && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Customer Info */}
              <Card className="border-0 shadow-lg rounded-none sm:rounded-lg">
                <CardHeader className="p-0 sm:p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Customer Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 sm:p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                      {getTypeIcon(selectedCustomer.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{selectedCustomer.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{selectedCustomer.email}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{selectedCustomer.address}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                      <Badge className={getTierColor(selectedCustomer.tier)}>
                        {selectedCustomer.tier}
                      </Badge>
                      <Badge variant="outline">{selectedCustomer.type}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card className="border-0 shadow-lg rounded-none sm:rounded-lg">
                <CardHeader className="p-0 sm:p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Order Items ({orderItems.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 sm:p-4 md:p-6">
                  <div className="space-y-2 sm:space-y-3">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-2 sm:gap-4 p-2 sm:p-3 border border-border rounded-lg bg-background dark:bg-card">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-xs sm:text-sm">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping & Payment */}
              <Card className="border-0 shadow-lg rounded-none sm:rounded-lg">
                <CardHeader className="p-0 sm:p-4 md:p-6">
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="h-5 w-5" />
                    <span>Shipping & Payment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 sm:p-4 md:p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Shipping Method</label>
                    <select
                      aria-label="Shipping Method"
                      id="shippingMethod"
                      value={shippingMethod}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground dark:bg-card/80"
                    >
                      <option value="standard">Standard Shipping - $15.00 (3-5 days)</option>
                      <option value="express">Express Shipping - $25.00 (1-2 days)</option>
                      <option value="white-glove">White Glove Delivery - $50.00</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Payment Method</label>
                    <select
                      aria-label="Payment Method"
                      id="paymentMethod"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground dark:bg-card/80"
                    >
                      <option value="credit-card">Credit Card</option>
                      <option value="bank-transfer">Bank Transfer</option>
                      <option value="cash">Cash</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Order Notes</label>
                    <textarea
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="Add any special instructions or notes..."
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground dark:bg-card/80 placeholder:text-muted-foreground"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="border-0 shadow-lg rounded-none sm:rounded-lg">
                <CardHeader className="p-0 sm:p-4 md:p-6">
                  <CardTitle className="flex items-center space-x-2">
                    <Calculator className="h-5 w-5" />
                    <span>Order Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 sm:p-4 md:p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({orderItems.length} items):</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax (8%):</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping:</span>
                      <span>${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border pt-2">
                      <div className="flex justify-between font-bold text-base sm:text-lg">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button
                        onClick={() => setStep(2)}
                        variant="outline"
                        className="w-full text-xs sm:text-sm py-1 sm:py-2"
                      >
                      Back to Products
                    </Button>
                    <Button
                      onClick={createOrder}
                      disabled={isProcessing || orderItems.length === 0}
                      className="w-full text-xs sm:text-sm"
                    >
                      {isProcessing ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Creating Order...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4" />
                          <span>Create Order</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}