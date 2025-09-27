'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Download,
  RefreshCw,
  Plus,
} from 'lucide-react';

interface OrderFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  dateFilter: string;
  setDateFilter: (date: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  itemsPerPage: number;
  setItemsPerPage: (count: number) => void;
  setCurrentPage: (page: number) => void;
}

export function OrderFilters({ searchQuery, setSearchQuery, statusFilter, setStatusFilter, dateFilter, setDateFilter, sortBy, setSortBy, itemsPerPage, setItemsPerPage, setCurrentPage }: OrderFiltersProps) {
  return (
    <div className="flex-shrink-0 bg-muted/20 dark:bg-muted/10 p-0 sm:p-4">
      {/* Mobile Layout */}
      <div className="block sm:hidden space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>
        
        {/* Filters Row 1 */}
        <div className="grid grid-cols-2 gap-2">
          <select
            title='filter by status'
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2 py-2 rounded-none bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="processing">Processing</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <select
            title='filter by date'
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-2 py-2 rounded-none bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        
        {/* Filters Row 2 */}
        <div className="grid grid-cols-2 gap-2">
          <select
            title='sort by'
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2 py-2 rounded-none bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="total">Sort by Total</option>
            <option value="status">Sort by Status</option>
          </select>
          
          <select
            title='items per page'
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-2 rounded-none bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
          </select>
        </div>
        
        {/* Mobile Actions */}
        <div className="flex items-center gap-2">
          <Link href="/admin/orders/create" className="flex-1">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs py-2">
              <Plus className="h-3 w-3 mr-1" />
              Create
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="text-xs px-2">
            <Download className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" className="text-xs px-2">
            <RefreshCw className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search orders by ID, customer, or items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <select
              title='filter by status'
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2  rounded-none bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-border"
            >
              <option value="all">All Status</option>
              <option value="processing">Processing</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="in transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Date Filter */}
            <select
              title='filter by date'
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 rounded-none bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-border"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            {/* Sort */}
            <select
              title='sort by'
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-none bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-border"
            >
              <option value="date">Sort by Date</option>
              <option value="total">Sort by Total</option>
              <option value="status">Sort by Status</option>
            </select>

            {/* Items per page */}
            <select
              title='items per page'
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-none bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-border"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link href="/admin/orders/create">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Order
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
