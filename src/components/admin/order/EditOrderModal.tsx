'use client';

import React from 'react';
import { Order, OrderItem } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EditOrderModalProps {
  editingOrder: Order;
  setEditingOrder: (order: Order) => void;
  handleSaveEdit: () => void;
  handleCancelEdit: () => void;
}

export function EditOrderModal({ editingOrder, setEditingOrder, handleSaveEdit, handleCancelEdit }: EditOrderModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={handleCancelEdit}
    >
      <div 
        className="bg-background dark:bg-card border border-border rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Edit Order {editingOrder.id}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancelEdit}
              className="text-muted-foreground hover:text-foreground p-2"
            >
              ✕
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Order Information */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-medium text-foreground">Order Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Order Status</label>
                <select
                  aria-label="Order Status"
                  id="orderStatus"
                  value={editingOrder.status}
                  onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value as Order['status'] })}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                >
                  <option value="Processing">Processing</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Returned">Returned</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Payment Method</label>
                <Input
                  value={editingOrder.paymentMethod || ''}
                  onChange={(e) => setEditingOrder({ ...editingOrder, paymentMethod: e.target.value })}
                  placeholder="Credit Card, PayPal, etc."
                  className="text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Order Notes</label>
                <textarea
                  value={editingOrder.notes || ''}
                  onChange={(e) => setEditingOrder({ ...editingOrder, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-20 sm:h-24 resize-none text-sm"
                  placeholder="Add any notes about this order..."
                />
              </div>
            </div>

            {/* Shipping Information */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-medium text-foreground">Shipping Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                <Input
                  value={editingOrder.shippingInfo?.address || ''}
                  onChange={(e) => setEditingOrder({
                    ...editingOrder,
                    shippingInfo: { ...editingOrder.shippingInfo, address: e.target.value }
                  })}
                  placeholder="Street address"
                  className="text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">City</label>
                  <Input
                    value={editingOrder.shippingInfo?.city || ''}
                    onChange={(e) => setEditingOrder({
                      ...editingOrder,
                      shippingInfo: { ...editingOrder.shippingInfo, city: e.target.value }
                    })}
                    placeholder="City"
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">State</label>
                  <Input
                    value={editingOrder.shippingInfo?.state || ''}
                    onChange={(e) => setEditingOrder({
                      ...editingOrder,
                      shippingInfo: { ...editingOrder.shippingInfo, state: e.target.value }
                    })}
                    placeholder="State"
                    className="text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">ZIP Code</label>
                  <Input
                    value={editingOrder.shippingInfo?.zip || ''}
                    onChange={(e) => setEditingOrder({
                      ...editingOrder,
                      shippingInfo: { ...editingOrder.shippingInfo, zip: e.target.value }
                    })}
                    placeholder="ZIP Code"
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tracking Number</label>
                  <Input
                    value={editingOrder.shippingInfo?.tracking || ''}
                    onChange={(e) => setEditingOrder({
                      ...editingOrder,
                      shippingInfo: { ...editingOrder.shippingInfo, tracking: e.target.value }
                    })}
                    placeholder="Tracking number"
                    className="text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Shipping Method</label>
                <select
                  aria-label="Shipping Method"
                  id="shippingMethod"
                  value={editingOrder.shippingInfo?.method || ''}
                  onChange={(e) => setEditingOrder({
                    ...editingOrder,
                    shippingInfo: { ...editingOrder.shippingInfo, method: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                >
                  <option value="">Select shipping method</option>
                  <option value="Standard Shipping (3-5 business days)">Standard Shipping (3-5 business days)</option>
                  <option value="Express Shipping (1-2 business days)">Express Shipping (1-2 business days)</option>
                  <option value="Overnight Shipping">Overnight Shipping</option>
                  <option value="White Glove Delivery">White Glove Delivery</option>
                  <option value="Local Pickup">Local Pickup</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Estimated Delivery</label>
                <Input
                  aria-label="Estimated Delivery"
                  id="estimatedDelivery"
                  type="date"
                  value={editingOrder.shippingInfo?.estimatedDelivery || ''}
                  onChange={(e) => setEditingOrder({
                    ...editingOrder,
                    shippingInfo: { ...editingOrder.shippingInfo, estimatedDelivery: e.target.value }
                  })}
                  className="text-sm"
                />
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="mt-4 sm:mt-6">
            <h3 className="text-base sm:text-lg font-medium text-foreground mb-3 sm:mb-4">Pricing Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Subtotal</label>
                <Input
                  aria-label="Subtotal"
                  id="subtotal"
                  type="number"
                  step="0.01"
                  value={editingOrder.subtotal || 0}
                  onChange={(e) => {
                    const subtotal = parseFloat(e.target.value) || 0;
                    const total = subtotal + editingOrder.shipping + editingOrder.tax;
                    setEditingOrder({ ...editingOrder, subtotal, total });
                  }}
                  placeholder="0.00"
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Shipping</label>
                <Input
                  aria-label="Shipping"
                  id="shipping"
                  type="number"
                  step="0.01"
                  value={editingOrder.shipping || 0}
                  onChange={(e) => {
                    const shipping = parseFloat(e.target.value) || 0;
                    const total = editingOrder.subtotal + shipping + editingOrder.tax;
                    setEditingOrder({ ...editingOrder, shipping, total });
                  }}
                  placeholder="0.00"
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tax</label>
                <Input
                  aria-label="Tax"
                  id="tax"
                  type="number"
                  step="0.01"
                  value={editingOrder.tax || 0}
                  onChange={(e) => {
                    const tax = parseFloat(e.target.value) || 0;
                    const total = editingOrder.subtotal + editingOrder.shipping + tax;
                    setEditingOrder({ ...editingOrder, tax, total });
                  }}
                  placeholder="0.00"
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Total</label>
                <Input
                  aria-label="Total"
                  id="total"
                  type="number"
                  step="0.01"
                  value={editingOrder.total || 0}
                  onChange={(e) => setEditingOrder({ ...editingOrder, total: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                  className="text-sm"
                />
              </div>
            </div>
          </div>

          {/* Products List */}
          <div className="mt-4 sm:mt-6">
            <h3 className="text-base sm:text-lg font-medium text-foreground mb-3 sm:mb-4">Order Items</h3>
            <div className="space-y-2 sm:space-y-3">
              {editingOrder.items?.map((item: OrderItem, index: number) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 border border-border rounded-lg bg-muted/30">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm">{item.name}</h4>
                    <div className="text-xs text-muted-foreground">
                      {item.selectedColor && `Color: ${item.selectedColor}`}
                      {item.selectedSize && ` • Size: ${item.selectedSize}`}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                    <div className="flex-1 sm:flex-none">
                      <label className="block text-xs text-muted-foreground mb-1">Quantity</label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const newItems = [...editingOrder.items];
                          newItems[index] = { ...item, quantity: parseInt(e.target.value) || 1 };
                          const newSubtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                          const newTotal = newSubtotal + editingOrder.shipping + editingOrder.tax;
                          setEditingOrder({ ...editingOrder, items: newItems, subtotal: newSubtotal, total: newTotal });
                        }}
                        className="w-full sm:w-20 text-sm"
                      />
                    </div>
                    <div className="flex-1 sm:flex-none">
                      <label className="block text-xs text-muted-foreground mb-1">Price</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => {
                          const newItems = [...editingOrder.items];
                          newItems[index] = { ...item, price: parseFloat(e.target.value) || 0 };
                          const newSubtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                          const newTotal = newSubtotal + editingOrder.shipping + editingOrder.tax;
                          setEditingOrder({ ...editingOrder, items: newItems, subtotal: newSubtotal, total: newTotal });
                        }}
                        className="w-full sm:w-24 text-sm"
                      />
                    </div>
                    <div className="text-right flex-1 sm:flex-none">
                      <div className="text-xs text-muted-foreground mb-1">Total</div>
                      <div className="font-medium text-foreground text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleCancelEdit}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
