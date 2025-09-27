'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatPrice } from '@/lib/currency';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Filter,
  Download,
  Calendar,
  Package,
  Users,
  BarChart3,
  PieChart,
  Wallet,
  ShoppingCart,
  CreditCard,
  Building,
  FileText,
  Upload,
} from 'lucide-react';

// Types
interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
}

interface Revenue {
  id: string;
  date: string;
  source: string;
  description: string;
  amount: number;
  orderId?: string;
}

interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
}

// Mock data - in a real app this would come from an API
const mockExpenses: Expense[] = [
  { id: 'exp-001', date: '2024-01-15', category: 'Marketing', description: 'Google Ads Campaign', amount: 1200.00, paymentMethod: 'Credit Card' },
  { id: 'exp-002', date: '2024-01-14', category: 'Salary', description: 'Employee Payroll', amount: 8500.00, paymentMethod: 'Bank Transfer' },
  { id: 'exp-003', date: '2024-01-12', category: 'Inventory', description: 'New Product Stock', amount: 4200.00, paymentMethod: 'Credit Card' },
  { id: 'exp-004', date: '2024-01-10', category: 'Marketing', description: 'Social Media Ads', amount: 800.00, paymentMethod: 'PayPal' },
  { id: 'exp-005', date: '2024-01-08', category: 'Operations', description: 'Warehouse Rent', amount: 2500.00, paymentMethod: 'Bank Transfer' },
  { id: 'exp-006', date: '2024-01-05', category: 'Salary', description: 'Contractor Payment', amount: 1800.00, paymentMethod: 'Bank Transfer' },
  { id: 'exp-007', date: '2024-01-03', category: 'Technology', description: 'Software Subscription', amount: 350.00, paymentMethod: 'Credit Card' },
];

const mockRevenue: Revenue[] = [
  { id: 'rev-001', date: '2024-01-15', source: 'Product Sales', description: 'Order #ORD-2024-005', amount: 1899.99, orderId: 'ORD-2024-005' },
  { id: 'rev-002', date: '2024-01-14', source: 'Product Sales', description: 'Order #ORD-2024-004', amount: 2450.50, orderId: 'ORD-2024-004' },
  { id: 'rev-003', date: '2024-01-12', source: 'Product Sales', description: 'Order #ORD-2024-003', amount: 899.99, orderId: 'ORD-2024-003' },
  { id: 'rev-004', date: '2024-01-10', source: 'Product Sales', description: 'Order #ORD-2024-002', amount: 3200.00, orderId: 'ORD-2024-002' },
  { id: 'rev-005', date: '2024-01-08', source: 'Product Sales', description: 'Order #ORD-2024-001', amount: 1550.75, orderId: 'ORD-2024-001' },
  { id: 'rev-006', date: '2024-01-05', source: 'Shipping', description: 'Shipping Fees', amount: 120.00 },
  { id: 'rev-007', date: '2024-01-03', source: 'Product Sales', description: 'Order #ORD-2023-125', amount: 2100.25, orderId: 'ORD-2023-125' },
];

const expenseCategories = [
  'Marketing',
  'Salary',
  'Inventory',
  'Operations',
  'Technology',
  'Shipping',
  'Taxes',
  'Office Supplies',
  'Utilities',
  'Insurance',
  'Maintenance',
  'Professional Services',
  'Travel',
  'Meals & Entertainment',
  'Other'
];

const revenueSources = [
  'Product Sales',
  'Shipping Fees',
  'Subscription',
  'Other'
];

// Financial Summary Component
function FinancialSummaryCards({ summary }: { summary: FinancialSummary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-foreground">{formatPrice(summary.totalRevenue, 'BDT')}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Expenses</p>
              <p className="text-2xl font-bold text-foreground">{formatPrice(summary.totalExpenses, 'BDT')}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Net Profit</p>
              <p className={`text-2xl font-bold ${summary.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPrice(summary.netProfit, 'BDT')}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              summary.netProfit >= 0 
                ? 'bg-gradient-to-r from-green-500 to-green-600' 
                : 'bg-gradient-to-r from-red-500 to-red-600'
            }`}>
              <Wallet className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Profit Margin</p>
              <p className={`text-2xl font-bold ${summary.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {summary.profitMargin.toFixed(2)}%
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              summary.profitMargin >= 0 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                : 'bg-gradient-to-r from-orange-500 to-orange-600'
            }`}>
              <PieChart className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Expense Form Component
function ExpenseForm({ onSubmit }: { onSubmit: (expense: Omit<Expense, 'id'>) => void }) {
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [receipt, setReceipt] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState('monthly');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date,
      category,
      description,
      amount: parseFloat(amount),
      paymentMethod
    });
    // Reset form
    setDate('');
    setCategory('');
    setDescription('');
    setAmount('');
    setPaymentMethod('');
    setReceipt(null);
    setNotes('');
    setIsRecurring(false);
    setFrequency('monthly');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceipt(e.target.files[0]);
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add New Expense
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Select Category</option>
                {expenseCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter expense description"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Amount (BDT)</label>
              <Input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Select Method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="PayPal">PayPal</option>
                <option value="Cash">Cash</option>
                <option value="Check">Check</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Receipt (Optional)</label>
            <Input
              type="file"
              onChange={handleFileChange}
              accept="image/*,.pdf"
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Notes (Optional)</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes about this expense"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="recurring"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="recurring" className="text-sm font-medium text-foreground">
              This is a recurring expense
            </label>
          </div>
          
          {isRecurring && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          )}
          
          <Button type="submit" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// Revenue Form Component
function RevenueForm({ onSubmit }: { onSubmit: (revenue: Omit<Revenue, 'id'>) => void }) {
  const [date, setDate] = useState('');
  const [source, setSource] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [orderId, setOrderId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date,
      source,
      description,
      amount: parseFloat(amount),
      orderId: orderId || undefined
    });
    // Reset form
    setDate('');
    setSource('');
    setDescription('');
    setAmount('');
    setOrderId('');
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add New Revenue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Select Source</option>
                {revenueSources.map((src) => (
                  <option key={src} value={src}>{src}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter revenue description"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Amount (BDT)</label>
              <Input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Order ID (Optional)</label>
              <Input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Order ID"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Revenue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// Financial Table Component
function FinancialTable({ 
  title, 
  icon: Icon, 
  data, 
  columns 
}: { 
  title: string; 
  icon: React.ElementType; 
  data: any[]; 
  columns: { key: string; label: string; render?: (value: any) => React.ReactNode }[] 
}) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon className="h-5 w-5 mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {columns.map((column) => (
                  <th key={column.key} className="pb-3 text-left text-sm font-semibold text-foreground">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/50">
                  {columns.map((column) => (
                    <td key={column.key} className="py-3 text-sm text-foreground">
                      {column.render ? column.render(row[column.key]) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminAccountsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPaymentMethod, setFilterPaymentMethod] = useState('all');

  // Calculate financial summary
  const totalRevenue = mockRevenue.reduce((sum, rev) => sum + rev.amount, 0);
  const totalExpenses = mockExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  const financialSummary: FinancialSummary = {
    totalRevenue,
    totalExpenses,
    netProfit,
    profitMargin
  };

  // Filter expenses based on search and filters
  const filteredExpenses = mockExpenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || expense.category === filterCategory;
    const matchesPaymentMethod = filterPaymentMethod === 'all' || expense.paymentMethod === filterPaymentMethod;
    return matchesSearch && matchesCategory && matchesPaymentMethod;
  });

  // Filter revenue based on search
  const filteredRevenue = mockRevenue.filter(revenue => {
    const matchesSearch = revenue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         revenue.source.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Handle form submissions
  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    console.log('Adding expense:', expense);
    // In a real app, this would make an API call to add the expense
    alert('Expense added successfully!');
  };

  const handleAddRevenue = (revenue: Omit<Revenue, 'id'>) => {
    console.log('Adding revenue:', revenue);
    // In a real app, this would make an API call to add the revenue
    alert('Revenue added successfully!');
  };

  // Get unique categories and payment methods for filters
  const uniqueCategories = ['all', ...new Set(mockExpenses.map(exp => exp.category))];
  const uniquePaymentMethods = ['all', ...new Set(mockExpenses.map(exp => exp.paymentMethod))];

  // Define table columns
  const expenseColumns = [
    { key: 'date', label: 'Date', render: (value: string) => new Date(value).toLocaleDateString() },
    { key: 'category', label: 'Category' },
    { key: 'description', label: 'Description' },
    { key: 'amount', label: 'Amount', render: (value: number) => formatPrice(value, 'BDT') },
    { key: 'paymentMethod', label: 'Payment Method' }
  ];

  const revenueColumns = [
    { key: 'date', label: 'Date', render: (value: string) => new Date(value).toLocaleDateString() },
    { key: 'source', label: 'Source' },
    { key: 'description', label: 'Description' },
    { key: 'amount', label: 'Amount', render: (value: number) => formatPrice(value, 'BDT') },
    { key: 'orderId', label: 'Order ID' }
  ];

  return (
    <AdminLayout title="Accounts" subtitle="Track your expenses, revenue, and financial performance">
      <div className="space-y-6">
        {/* Time Range Filter */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Financial Overview</h3>
                <p className="text-muted-foreground">Monitor your business finances and performance</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <select
                  aria-label="Time Range"
                  id="timeRange"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Summary Cards */}
        <FinancialSummaryCards summary={financialSummary} />

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'expenses'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Expenses
            </button>
            <button
              onClick={() => setActiveTab('revenue')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'revenue'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Revenue
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'add'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Add Transaction
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Additional Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Top Expense Category</p>
                      <p className="text-xl font-bold text-foreground">
                        {mockExpenses.length > 0 ? 
                          mockExpenses.reduce((acc, expense) => {
                            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
                            return acc;
                          }, {} as Record<string, number>) 
                          && Object.entries(
                            mockExpenses.reduce((acc, expense) => {
                              acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
                              return acc;
                            }, {} as Record<string, number>)
                          ).sort((a, b) => b[1] - a[1])[0][0] 
                          : 'N/A'}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                      <TrendingDown className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Top Revenue Source</p>
                      <p className="text-xl font-bold text-foreground">
                        {mockRevenue.length > 0 ? 
                          Object.entries(
                            mockRevenue.reduce((acc, revenue) => {
                              acc[revenue.source] = (acc[revenue.source] || 0) + revenue.amount;
                              return acc;
                            }, {} as Record<string, number>)
                          ).sort((a, b) => b[1] - a[1])[0][0] 
                          : 'N/A'}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Expense to Revenue Ratio</p>
                      <p className="text-xl font-bold text-foreground">
                        {totalRevenue > 0 ? `${((totalExpenses / totalRevenue) * 100).toFixed(1)}%` : 'N/A'}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <PieChart className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Revenue vs Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-muted/30 to-muted/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Revenue vs Expenses chart would go here</p>
                      <p className="text-sm text-muted-foreground mt-1">Integration with charting library needed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2" />
                    Expense Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-muted/30 to-muted/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Expense breakdown chart would go here</p>
                      <p className="text-sm text-muted-foreground mt-1">Integration with charting library needed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FinancialTable 
                title="Recent Expenses" 
                icon={TrendingDown} 
                data={mockExpenses.slice(0, 5)} 
                columns={expenseColumns} 
              />
              
              <FinancialTable 
                title="Recent Revenue" 
                icon={TrendingUp} 
                data={mockRevenue.slice(0, 5)} 
                columns={revenueColumns} 
              />
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="space-y-6">
            {/* Expense Filters */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Search</label>
                    <Input
                      type="text"
                      placeholder="Search expenses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {uniqueCategories.map((category) => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Payment Method</label>
                    <select
                      value={filterPaymentMethod}
                      onChange={(e) => setFilterPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {uniquePaymentMethods.map((method) => (
                        <option key={method} value={method}>
                          {method === 'all' ? 'All Methods' : method}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm('');
                        setFilterCategory('all');
                        setFilterPaymentMethod('all');
                      }}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Filtered Expense Summary */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Filtered Expenses Summary</h3>
                    <p className="text-sm text-muted-foreground">
                      Showing {filteredExpenses.length} of {mockExpenses.length} expenses
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {formatPrice(filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0), 'BDT')}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {new Set(filteredExpenses.map(exp => exp.category)).size}
                      </p>
                      <p className="text-sm text-muted-foreground">Categories</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {new Set(filteredExpenses.map(exp => exp.paymentMethod)).size}
                      </p>
                      <p className="text-sm text-muted-foreground">Payment Methods</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Expense Table */}
            <FinancialTable 
              title={`All Expenses (${filteredExpenses.length})`} 
              icon={TrendingDown} 
              data={filteredExpenses} 
              columns={expenseColumns} 
            />
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="space-y-6">
            {/* Revenue Filters */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Search</label>
                    <Input
                      type="text"
                      placeholder="Search revenue..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      variant="outline" 
                      onClick={() => setSearchTerm('')}
                      className="w-full"
                    >
                      Clear Search
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Filtered Revenue Summary */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Filtered Revenue Summary</h3>
                    <p className="text-sm text-muted-foreground">
                      Showing {filteredRevenue.length} of {mockRevenue.length} revenue entries
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {formatPrice(filteredRevenue.reduce((sum, rev) => sum + rev.amount, 0), 'BDT')}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {new Set(filteredRevenue.map(rev => rev.source)).size}
                      </p>
                      <p className="text-sm text-muted-foreground">Sources</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Revenue Table */}
            <FinancialTable 
              title={`All Revenue (${filteredRevenue.length})`} 
              icon={TrendingUp} 
              data={filteredRevenue} 
              columns={revenueColumns} 
            />
          </div>
        )}

        {activeTab === 'add' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExpenseForm onSubmit={handleAddExpense} />
            <RevenueForm onSubmit={handleAddRevenue} />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}