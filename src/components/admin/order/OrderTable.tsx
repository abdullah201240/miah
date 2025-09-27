'use client';

import React from 'react';
import { Order } from '@/contexts/OrderContext';
import { OrderRow } from './OrderRow';
import { MobileOrderCard } from './MobileOrderCard';
import { ShoppingCart } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface OrderTableProps {
  orders: Order[];
  onView: (order: Order) => void;
  onEdit: (order: Order) => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
  onPrintInvoice: (order: Order) => void;
}

export function OrderTable({ orders, onView, onEdit, onUpdateStatus, onPrintInvoice }: OrderTableProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Desktop Table View */}
      <div className="hidden lg:flex flex-col h-full">
        <div className="rounded-none overflow-hidden">
          <div className="overflow-x-auto">
            <div>
              <Table>
                <TableHeader className="bg-muted/50 dark:bg-muted/30 sticky top-0 z-10">
                  <TableRow>
                    <TableHead>Order ID & Date</TableHead>
                    <TableHead>Delivery Address</TableHead>
                    <TableHead>Products & Quantities</TableHead>
                    <TableHead>Pricing Details</TableHead>
                    <TableHead>Status & Tracking</TableHead>
                    <TableHead>Payment & Notes</TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length > 0 ? (
                    orders.map((order: Order) => (
                      <OrderRow
                        key={order.id}
                        order={order}
                        onView={onView}
                        onEdit={onEdit}
                        onUpdateStatus={onUpdateStatus}
                        onPrintInvoice={onPrintInvoice}
                      />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="py-12 text-center">
                        <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-foreground">No orders found</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Try adjusting your search or filter criteria
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden flex-1 overflow-auto">
        <div className="space-y-0">
          {orders.length > 0 ? (
            orders.map((order: Order) => (
              <div key={order.id} >
                <MobileOrderCard
                  order={order}
                  onView={onView}
                  onEdit={onEdit}
                  onUpdateStatus={onUpdateStatus}
                  onPrintInvoice={onPrintInvoice}
                />
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground">No orders found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}