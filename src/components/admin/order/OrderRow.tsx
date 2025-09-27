'use client';

import React, { useState } from 'react';
import { Order, OrderItem, OrderTimeline } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { OrderStatusBadge } from './OrderStatusBadge';
import {
  Eye,
  Edit3,
  Printer,
  MoreHorizontal,
  Package,
  Truck,
  DollarSign,
  Clock,
} from 'lucide-react';
import {
  TableRow,
  TableCell,
}
from "@/components/ui/table"

interface OrderRowProps {
  order: Order;
  onView: (order: Order) => void;
  onEdit: (order: Order) => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
  onPrintInvoice: (order: Order) => void;
}

export function OrderRow({ order, onEdit, onUpdateStatus, onPrintInvoice }: OrderRowProps) {
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
    <>
      <TableRow className="hover:bg-muted/50">
        {/* Order ID & Date */}
        <TableCell className="py-4 px-4">
          <div className="flex flex-col">
            <span className="font-medium text-foreground truncate" title={order.id}>
              {order.id}
            </span>
            <span className="text-sm text-muted-foreground">
              {new Date(order.date).toLocaleDateString()}
            </span>
          </div>
        </TableCell>

        {/* Delivery Address */}
        <TableCell className="py-4 px-4">
          <div className="flex flex-col">
            <span className="font-medium text-foreground truncate" title={order.shippingInfo?.address || 'N/A'}>
              {order.shippingInfo?.address || 'N/A'}
            </span>
            <span className="text-sm text-muted-foreground truncate">
              {order.shippingInfo?.city}, {order.shippingInfo?.state} {order.shippingInfo?.zip}
            </span>
            <span className="text-xs text-muted-foreground mt-1 truncate">
              {order.shippingInfo?.method}
            </span>
          </div>
        </TableCell>

        {/* Products & Quantities */}
        <TableCell className="py-4 px-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-foreground">{order.items.length} items</span>
              {order.items.slice(0, 2).map((item: OrderItem, index: number) => (
                <div key={index} className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-8 h-8 rounded object-cover"
                    title={`${item.name} (Qty: ${item.quantity})`}
                  />
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {item.quantity}
                  </span>
                </div>
              ))}
              {order.items.length > 2 && (
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">+{order.items.length - 2}</span>
              )}
            </div>
            <div className="space-y-1 max-h-20 overflow-y-auto">
              {order.items.slice(0, 3).map((item: OrderItem, index: number) => (
                <div key={index} className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="truncate max-w-32" title={item.name}>
                    {item.name.length > 25 ? item.name.substring(0, 25) + '...' : item.name}
                  </span>
                  <span className="font-medium text-foreground ml-2">×{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </TableCell>

        {/* Pricing Details */}
        <TableCell className="py-4 px-4">
          <div className="flex flex-col text-right">
            <span className="font-semibold text-foreground">৳{order.total.toFixed(2)}</span>
            <div className="text-xs text-muted-foreground space-y-0.5 mt-1">
              <div className="flex justify-between">
                <span>Sub:</span>
                <span>৳{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Ship:</span>
                <span>৳{order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>৳{order.tax.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </TableCell>

        {/* Status & Tracking */}
        <TableCell className="py-4 px-4">
          <div className="flex flex-col space-y-2">
            <OrderStatusBadge status={order.status} />
            {order.shippingInfo?.tracking && (
              <span className="text-xs text-blue-600 dark:text-blue-400 font-mono truncate" title={order.shippingInfo.tracking}>
                {order.shippingInfo.tracking.length > 12 
                  ? order.shippingInfo.tracking.substring(0, 12) + '...' 
                  : order.shippingInfo.tracking}
              </span>
            )}
          </div>
        </TableCell>

        {/* Payment & Notes */}
        <TableCell className="py-4 px-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground truncate" title={order.paymentMethod || 'Credit Card'}>
              {order.paymentMethod || 'Credit Card'}
            </span>
            <span className="text-xs text-green-600 dark:text-green-400">Paid</span>
            {order.notes && (
              <span className="text-xs text-muted-foreground mt-1 truncate max-w-28" title={order.notes}>
                Notes: {order.notes.length > 15 ? order.notes.substring(0, 15) + '...' : order.notes}
              </span>
            )}
          </div>
        </TableCell>

        {/* Invoice */}
        <TableCell className="py-4 px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPrintInvoice(order)}
            className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
            title="Print Invoice"
          >
            <Printer className="h-4 w-4" />
          </Button>
        </TableCell>

        {/* Actions */}
        <TableCell className="py-4 px-4">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 p-1"
              title={expanded ? "Collapse Details" : "Expand Details"}
            >
              <Eye className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(order)}
              className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 p-1"
              title="Edit Order"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowActions(!showActions);
                }}
                className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 p-1"
                title="More actions"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              {showActions && (
                <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-background border border-border z-10">
                  <div className="py-1">
                    <button
                      onClick={() => onUpdateStatus(order.id, 'Processing')}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center"
                    >
                      <Package className="h-4 w-4 mr-2" />
                      Mark as Processing
                    </button>
                    <button
                      onClick={() => onUpdateStatus(order.id, 'Shipped')}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center"
                    >
                      <Truck className="h-4 w-4 mr-2" />
                      Mark as Shipped
                    </button>
                    <button
                      onClick={() => onUpdateStatus(order.id, 'Delivered')}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Mark as Delivered
                    </button>
                    <button
                      onClick={() => onUpdateStatus(order.id, 'Cancelled')}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Cancel Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TableCell>
      </TableRow>

      {/* Expanded details */}
      {expanded && (
        <TableRow className="bg-muted/10">
          <TableCell colSpan={8} className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Customer Information</h4>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">{order.shippingInfo?.name}</p>
                    <p className="text-muted-foreground">{order.shippingInfo?.email}</p>
                    <p className="text-muted-foreground">{order.shippingInfo?.phone || 'No phone provided'}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Shipping Information</h4>
                  <div className="text-sm space-y-1">
                    <p>{order.shippingInfo?.address}</p>
                    <p className="text-muted-foreground">
                      {order.shippingInfo?.city}, {order.shippingInfo?.state} {order.shippingInfo?.zip}
                    </p>
                    <p className="text-muted-foreground">
                      {order.shippingInfo?.country || 'United States'}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Order Details</h4>
                  <div className="text-sm space-y-1">
                    <p>Order ID: {order.id}</p>
                    <p>Date: {new Date(order.date).toLocaleString()}</p>
                    <p>Payment: {order.paymentMethod || 'Credit Card'}</p>
                    <p>Status: <OrderStatusBadge status={order.status} /></p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Order Items</h4>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">Product</th>
                        <th className="text-right p-3 text-sm font-medium text-muted-foreground">Price</th>
                        <th className="text-right p-3 text-sm font-medium text-muted-foreground">Quantity</th>
                        <th className="text-right p-3 text-sm font-medium text-muted-foreground">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {order.items.map((item: OrderItem, index: number) => (
                        <tr key={index}>
                          <td className="p-3">
                            <div className="flex items-center space-x-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 rounded object-cover"
                              />
                              <div>
                                <p className="font-medium text-sm">{item.name}</p>
                                <p className="text-xs text-muted-foreground">SKU: {item.sku || 'N/A'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-right text-sm">৳{item.price.toFixed(2)}</td>
                          <td className="p-3 text-right text-sm">{item.quantity}</td>
                          <td className="p-3 text-right text-sm font-medium">
                            ৳{(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="w-full max-w-xs space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>৳{order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>৳{order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>৳{order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-medium">
                    <span>Total</span>
                    <span>৳{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {order.notes && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">Order Notes</h4>
                  <p className="text-sm text-muted-foreground">{order.notes}</p>
                </div>
              )}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}