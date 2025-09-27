'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAdmin } from '@/contexts/AdminContext';
import { formatPrice } from '@/lib/currency';
import MobileLayout from '@/components/layout/MobileLayout';
import { 
  CreditCard, 
  MapPin, 
  Truck, 
  Shield, 
  ArrowLeft,
  CheckCircle
} from 'lucide-react';

export default function CheckoutPage() {
  const { state, clearCart } = useCart();
  const { state: adminState } = useAdmin();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Calculate totals
  const subtotal = state.total;
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  // Order confirmation view
  if (orderPlaced) {
    return (
      <MobileLayout>
        <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
          <div className="container mx-auto px-4 max-w-md">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Order Placed Successfully!
                </h1>
                <p className="text-gray-600 mb-6">
                  Your order has been confirmed and will be processed soon. You'll receive an email confirmation shortly.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-1">Order Number</p>
                  <p className="font-mono text-lg font-semibold text-gray-900">
                    #ORD-{Date.now().toString().slice(-6)}
                  </p>
                </div>
                <div className="space-y-3">
                  <Link href="/orders">
                    <Button className="w-full">View Order Details</Button>
                  </Link>
                  <Link href="/products">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </MobileLayout>
    );
  }

  // Empty cart redirect
  if (state.items.length === 0) {
    return (
      <MobileLayout mobileTitle="Checkout">
        <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
          <div className="container mx-auto px-4 max-w-md">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Your cart is empty
                </h1>
                <p className="text-gray-600 mb-6">
                  Add some items to your cart before proceeding to checkout.
                </p>
                <Link href="/products">
                  <Button className="w-full">Start Shopping</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout mobileTitle="Checkout">
      <div className="min-h-screen bg-gray-50 py-4 md:py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/cart" className="md:hidden">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Checkout
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>Secure checkout powered by SSL encryption</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Address */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Shipping Address
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                    <Input placeholder="Email" type="email" className="md:col-span-2" />
                    <Input placeholder="Phone" type="tel" className="md:col-span-2" />
                    <Input placeholder="Address" className="md:col-span-2" />
                    <Input placeholder="City" />
                    <Input placeholder="State / Province" />
                    <Input placeholder="ZIP / Postal Code" />
                    <Input placeholder="Country" />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Method */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Truck className="h-5 w-5 text-green-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Shipping Method
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-300 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Standard Shipping</div>
                          <div className="text-sm text-gray-600">5-7 business days</div>
                        </div>
                        <div className="font-semibold text-gray-900">
                          {shipping === 0 ? 'Free' : `$${shipping}`}
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-300 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Express Shipping</div>
                          <div className="text-sm text-gray-600">2-3 business days</div>
                        </div>
                        <div className="font-semibold text-gray-900">{formatPrice(25, adminState.settings?.currency || 'USD')}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <CreditCard className="h-5 w-5 text-purple-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Payment Method
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <Input placeholder="Card Number" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="MM/YY" />
                      <Input placeholder="CVV" />
                    </div>
                    <Input placeholder="Name on Card" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-sm sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Order Summary
                  </h3>

                  {/* Items */}
                  <div className="space-y-4 mb-6">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {item.quantity}x
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {item.product.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {formatPrice(item.product.price, adminState.settings?.currency || 'USD')} each
                          </div>
                        </div>
                        <div className="font-medium text-gray-900">
                          {formatPrice(item.product.price * item.quantity, adminState.settings?.currency || 'USD')}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  {/* Totals */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal, adminState.settings?.currency || 'USD')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? 'Free' : `${formatPrice(shipping, adminState.settings?.currency || 'USD')}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">{formatPrice(tax, adminState.settings?.currency || 'USD')}</span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="flex justify-between text-lg font-semibold mb-6">
                    <span>Total</span>
                    <span>{formatPrice(total, adminState.settings?.currency || 'USD')}</span>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Place Order • ${formatPrice(total, adminState.settings?.currency || 'USD')}`}
                  </Button>

                  <p className="text-xs text-gray-600 text-center mt-4">
                    By placing your order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
