'use client';

import React, { useState } from 'react';
import { Order, OrderItem } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { OrderStatusBadge } from './OrderStatusBadge';
import {
  Eye,
  Edit3,
  Printer,
  MoreHorizontal,
  Package,
  Truck,
} from 'lucide-react';

interface MobileOrderCardProps {
  order: Order;
  onView: (order: Order) => void;
  onEdit: (order: Order) => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
  onPrintInvoice: (order: Order) => void;
}

export function MobileOrderCard({ order, onEdit, onUpdateStatus, onPrintInvoice }: MobileOrderCardProps) {
  const [showActions, setShowActions] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Close actions dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showActions) {
        setShowActions(false);
      }
    };

    if (showActions) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showActions]);

  return (
    <div className="bg-background border-b border-border">
      {/* Main Card Content */}
      <div className="p-4 space-y-3">
        {/* Header Row - Order ID, Status, Total */}
        <div className="flex items-center justify-between">
          <div className="max-w-[60%]">
            <span className="font-semibold text-foreground text-sm truncate block" title={order.id}>
              {order.id}
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">
              {new Date(order.date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <OrderStatusBadge status={order.status} />
            <span className="font-bold text-foreground text-sm">৳{order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Address & Shipping */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground truncate" title={order.shippingInfo?.address || 'N/A'}>
            {order.shippingInfo?.address || 'N/A'}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {order.shippingInfo?.city}, {order.shippingInfo?.state} {order.shippingInfo?.zip}
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 truncate">
            {order.shippingInfo?.method}
          </p>
        </div>

        {/* Products Summary */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">{order.items.length} items</span>
              <div className="flex space-x-1">
                {order.items.slice(0, 3).map((item: OrderItem, index: number) => (
                  <div key={index} className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-6 h-6 rounded object-cover"
                      title={`${item.name} (Qty: ${item.quantity})`}
                    />
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>
                ))}
                {order.items.length > 3 && (
                  <span className="text-xs bg-muted text-muted-foreground px-1 py-0.5 rounded">+{order.items.length - 3}</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Product details with quantities */}
          <div className="space-y-1 max-h-20 overflow-y-auto">
            {order.items.slice(0, 2).map((item: OrderItem, index: number) => (
              <div key={index} className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="truncate max-w-32" title={item.name}>
                  {item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name}
                </span>
                <span className="font-medium text-foreground ml-2">×{item.quantity}</span>
              </div>
            ))}
            {order.items.length > 2 && (
              <div className="text-xs text-muted-foreground">
                +{order.items.length - 2} more items
              </div>
            )}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs text-muted-foreground space-y-0.5">
              <div className="flex justify-between">
                <span>Sub:</span>
                <span>৳{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Ship:</span>
                <span>৳{order.shipping.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground space-y-0.5">
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>৳{order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-foreground">
                <span>Total:</span>
                <span>৳{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Tracking */}
        <div className="flex flex-col text-xs space-y-1">
          <div>
            <span className="text-muted-foreground">Payment: </span>
            <span className="font-medium text-foreground">{order.paymentMethod || 'Credit Card'}</span>
            <span className="text-green-600 dark:text-green-400 ml-2">• Paid</span>
          </div>
          {order.shippingInfo?.tracking && (
            <div className="flex items-center">
              <span className="text-muted-foreground">Tracking: </span>
              <span className="text-blue-600 dark:text-blue-400 font-mono ml-1 truncate" title={order.shippingInfo.tracking}>
                {order.shippingInfo.tracking}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 p-1 h-8 w-8"
              title={expanded ? "Collapse Details" : "Expand Details"}
            >
              <Eye className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(order)}
              className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 p-1 h-8 w-8"
              title="Edit Order"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPrintInvoice(order)}
              className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 p-1 h-8 w-8"
              title="Print Invoice"
            >
              <Printer className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setShowActions(!showActions);
              }}
              className="text-muted-foreground hover:text-foreground p-1 h-8 w-8"
              title="More Actions"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            {showActions && (
              <div 
                className="absolute right-0 top-8 bg-card border border-border rounded-lg shadow-lg z-10 min-w-32"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    onUpdateStatus(order.id, 'Confirmed');
                    setShowActions(false);
                  }}
                  className="block w-full px-3 py-2 text-left text-xs hover:bg-muted text-foreground"
                >
                  Mark Confirmed
                </button>
                <button
                  onClick={() => {
                    onUpdateStatus(order.id, 'Shipped');
                    setShowActions(false);
                  }}
                  className="block w-full px-3 py-2 text-left text-xs hover:bg-muted text-foreground"
                >
                  Mark Shipped
                </button>
                <button
                  onClick={() => {
                    onUpdateStatus(order.id, 'Delivered');
                    setShowActions(false);
                  }}
                  className="block w-full px-3 py-2 text-left text-xs hover:bg-muted text-foreground"
                >
                  Mark Delivered
                </button>
                <div className="border-t border-border my-1"></div>
                <button
                  onClick={() => {
                    onUpdateStatus(order.id, 'Cancelled');
                    setShowActions(false);
                  }}
                  className="block w-full px-3 py-2 text-left text-xs hover:bg-muted text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-border bg-muted/20 dark:bg-muted/10 p-4 space-y-4">
          {/* Products Detail */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
              <Package className="h-3 w-3 mr-1" />
              Order Items
            </h4>
            <div className="space-y-2">
              {order.items.map((item: OrderItem, index: number) => (
                <div key={index} className="flex items-center space-x-3 bg-background p-2 rounded border border-border">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-foreground text-sm truncate">{item.name}</h5>
                    <div className="text-xs text-muted-foreground">
                      {item.selectedColor && (
                        <span className="inline-flex items-center mr-2">
                          <div 
                            className="w-2 h-2 rounded-full mr-1 border border-border" 
                            style={{ backgroundColor: item.selectedColor.toLowerCase() }}
                          />
                          {item.selectedColor}
                        </span>
                      )}
                      {item.selectedSize && (
                        <span>Size: {item.selectedSize}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">×{item.quantity}</div>
                    <div className="text-xs text-muted-foreground">৳{item.price.toFixed(2)}</div>
                    <div className="text-sm font-semibold text-foreground">৳{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Payment Info */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                <Truck className="h-3 w-3 mr-1" />
                Delivery Info
              </h4>
              <div className="bg-background p-3 rounded border border-border space-y-1 text-xs">
                <div>
                  <span className="text-muted-foreground">Address: </span>
                  <span className="text-foreground">{order.shippingInfo?.address}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Method: </span>
                  <span className="text-foreground">{order.shippingInfo?.method}</span>
                </div>
                {order.shippingInfo?.estimatedDelivery && (
                  <div>
                    <span className="text-muted-foreground">Est. Delivery: </span>
                    <span className="text-foreground">
                      {new Date(order.shippingInfo.estimatedDelivery).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {order.shippingInfo?.tracking && (
                  <div>
                    <span className="text-muted-foreground">Tracking: </span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono">
                      {order.shippingInfo.tracking}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Notes</h4>
              <div className="bg-background p-3 rounded border border-border">
                <p className="text-xs text-foreground">{order.notes}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
