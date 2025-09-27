'use client';

import React, { useState, useMemo } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { useOrders, Order, OrderItem } from '@/contexts/OrderContext';
import { 
  OrderStats, 
  OrderFilters, 
  OrderTable, 
  EditOrderModal, 
  Pagination 
} from '@/components/admin/order';

export default function AdminOrdersPage() {
  const { state, updateOrder, updateOrderStatus } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    let filtered = [...state.orders];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(query) ||
        order.shippingInfo?.address?.toLowerCase().includes(query) ||
        order.items.some((item: OrderItem) => item.name.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status.toLowerCase() === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(order => new Date(order.date) >= filterDate);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(order => new Date(order.date) >= filterDate);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(order => new Date(order.date) >= filterDate);
          break;
      }
    }

    // Sort
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'total':
        filtered.sort((a, b) => b.total - a.total);
        break;
      case 'status':
        filtered.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }

    return filtered;
  }, [state.orders, searchQuery, statusFilter, dateFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  // Event handlers
  const handleView = (order: Order) => {
    console.log('View order:', order);
    // TODO: Open order details modal or navigate to view page
  };

  const handleEdit = (order: Order) => {
    setEditingOrder({ ...order });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editingOrder) {
      // Update the order in the context
      updateOrder(editingOrder);
      setShowEditModal(false);
      setEditingOrder(null);
      console.log('Order updated successfully:', editingOrder.id);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingOrder(null);
  };

  const handleUpdateStatus = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
  };

  const handlePrintInvoice = (order: Order) => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice ${order.id}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                margin: 20px;
                color: #333;
              }
              .header {
                text-align: center;
                border-bottom: 2px solid #333;
                padding-bottom: 10px;
                margin-bottom: 20px;
              }
              .invoice-title {
                font-size: 24px;
                font-weight: bold;
                color: #000;
              }
              .company-info {
                text-align: right;
                margin-bottom: 20px;
              }
              .customer-info {
                margin-bottom: 20px;
              }
              .items-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
              }
              .items-table th {
                border: 1px solid #333;
                padding: 8px;
                background-color: #f0f0f0;
                text-align: left;
              }
              .items-table td {
                border: 1px solid #333;
                padding: 8px;
              }
              .summary {
                width: 300px;
                margin-left: auto;
              }
              .summary-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
              }
              .total {
                font-weight: bold;
                border-top: 1px solid #333;
                padding-top: 10px;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                font-size: 12px;
                color: #666;
              }
              @media print {
                body {
                  margin: 0;
                }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="invoice-title">INVOICE</div>
              <div>Order #${order.id}</div>
              <div>Date: ${new Date(order.date).toLocaleDateString()}</div>
            </div>
            
            <div class="company-info">
              <div><strong>Miah</strong></div>
              <div>123 Furniture Street</div>
              <div>New York, NY 10001</div>
              <div>contact@miah.com</div>
              <div>(555) 123-4567</div>
            </div>
            
            <div class="customer-info">
              <div><strong>Bill To:</strong></div>
              <div>${order.shippingInfo?.name || 'N/A'}</div>
              <div>${order.shippingInfo?.address || 'N/A'}</div>
              <div>${order.shippingInfo?.city}, ${order.shippingInfo?.state} ${order.shippingInfo?.zip}</div>
              <div>${order.shippingInfo?.email || 'N/A'}</div>
              <div>${order.shippingInfo?.phone || 'N/A'}</div>
            </div>
            
            <table class="items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map((item: OrderItem) => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>৳${item.price.toFixed(2)}</td>
                    <td>৳${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div class="summary">
              <div class="summary-row">
                <span>Subtotal:</span>
                <span>৳${order.subtotal.toFixed(2)}</span>
              </div>
              <div class="summary-row">
                <span>Shipping:</span>
                <span>৳${order.shipping.toFixed(2)}</span>
              </div>
              <div class="summary-row">
                <span>Tax:</span>
                <span>৳${order.tax.toFixed(2)}</span>
              </div>
              <div class="summary-row total">
                <span>Total:</span>
                <span>৳${order.total.toFixed(2)}</span>
              </div>
            </div>
            
            <div class="footer">
              <p>Thank you for your business!</p>
              <p>This is a computer generated invoice and does not require a signature.</p>
            </div>
            
            <script>
              window.onload = function() {
                window.print();
                // Attempt to close the window after printing
                setTimeout(function() {
                  window.close();
                }, 1000);
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  // Calculate stats
  const totalOrders = state.orders.length;
  const pendingOrders = state.orders.filter(o => o.status === 'Processing').length;
  const shippedOrders = state.orders.filter(o => ['Shipped', 'In Transit', 'Out for Delivery'].includes(o.status)).length;
  const deliveredOrders = state.orders.filter(o => o.status === 'Delivered').length;
  const totalRevenue = state.orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <AdminLayout title="Orders" subtitle="Manage customer orders and track fulfillment">
      <div className="space-y-6">
        <OrderStats 
          totalOrders={totalOrders} 
          pendingOrders={pendingOrders} 
          shippedOrders={shippedOrders} 
          deliveredOrders={deliveredOrders} 
          totalRevenue={totalRevenue} 
        />

        <Card className="border-0 shadow-lg flex flex-col h-auto p-0">
          <OrderFilters 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            statusFilter={statusFilter} 
            setStatusFilter={setStatusFilter} 
            dateFilter={dateFilter} 
            setDateFilter={setDateFilter} 
            sortBy={sortBy} 
            setSortBy={setSortBy} 
            itemsPerPage={itemsPerPage} 
            setItemsPerPage={setItemsPerPage} 
            setCurrentPage={setCurrentPage} 
          />

          <div className="flex-1 flex flex-col min-h-0">
            <OrderTable 
              orders={paginatedOrders} 
              onView={handleView} 
              onEdit={handleEdit} 
              onUpdateStatus={handleUpdateStatus} 
              onPrintInvoice={handlePrintInvoice} 
            />
          </div>

          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            setCurrentPage={setCurrentPage} 
            filteredOrders={filteredOrders} 
            itemsPerPage={itemsPerPage} 
            startIndex={startIndex} 
          />
        </Card>
      </div>

      {showEditModal && editingOrder && (
        <EditOrderModal 
          editingOrder={editingOrder} 
          setEditingOrder={setEditingOrder} 
          handleSaveEdit={handleSaveEdit} 
          handleCancelEdit={handleCancelEdit} 
        />
      )}
    </AdminLayout>
  );
}