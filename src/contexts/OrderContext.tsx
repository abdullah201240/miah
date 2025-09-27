'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

// Types
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sku: string;
  selectedSize?: string;
  selectedColor?: string;
}

export interface OrderTimeline {
  status: string;
  date: string;
  completed: boolean;
  description?: string;
}

export interface OrderShipping {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
  method: string;
  tracking?: string;
  estimatedDelivery?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Confirmed' | 'Shipped' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Cancelled' | 'Returned';
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  items: OrderItem[];
  shippingInfo: OrderShipping;
  timeline: OrderTimeline[];
  paymentMethod?: string;
  notes?: string;
}

interface OrderState {
  orders: Order[];
  recentOrders: Order[];
  isLoading: boolean;
  error: string | null;
}

type OrderAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { id: string; status: Order['status']; timeline?: OrderTimeline[] } }
  | { type: 'LOAD_ORDERS'; payload: Order[] }
  | { type: 'CANCEL_ORDER'; payload: string }
  | { type: 'REORDER'; payload: string };

// Initial state
const initialState: OrderState = {
  orders: [],
  recentOrders: [],
  isLoading: true, // Start with loading true
  error: null,
};

// Function to generate demo orders
function generateDemoOrders(): Order[] {
  const statuses: Order['status'][] = ['Processing', 'Confirmed', 'Shipped', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA'];
  const paymentMethods = ['Credit Card (**** 1234)', 'Credit Card (**** 5678)', 'PayPal', 'Credit Card (**** 9012)', 'Apple Pay', 'Google Pay'];
  const shippingMethods = [
    'Standard Shipping (3-5 business days)',
    'Express Shipping (1-2 business days)',
    'Overnight Shipping',
    'White Glove Delivery',
    'Local Pickup'
  ];
  
  const products = [
    { id: '1', name: 'Amanat Shah Poplin Shirt', image: '/product/Amanat Shah Poplin-001.jpg', basePrice: 29.99 },
    { id: '2', name: 'Amanat Shah Voile Salwar Kameez', image: '/product/Amanat Shah Voile-001.jpg', basePrice: 59.99 },
    { id: '3', name: 'Premium Cotton Salwar Kameez', image: '/product/Ashy Purple Digital Print Premium Cotton Salwar Kameez-001.jpg', basePrice: 49.99 },
    { id: '4', name: 'Classic Solid Lungi', image: '/product/Brown Color Classic Solid Lungi - Bikkhato _ MIAH-001.jpg', basePrice: 25.99 },
    { id: '5', name: 'Digital Print Salwar Kameez', image: '/product/Burnt Coral Digital Print Premium Cotton Salwar Kameez-001.jpg', basePrice: 54.99 },
    { id: '6', name: 'Cargo Joggers', image: '/product/Grey Cargo Joggers-001.jpg', basePrice: 35.99 },
    { id: '7', name: 'Premium Cotton Salwar Kameez', image: '/product/Heather Gray Premium Cotton Salwar Kameez Digital Print-001.jpg', basePrice: 45.99 },
    { id: '8', name: 'Stylish Print Lungi', image: '/product/Men\'s Stylish Print & Batik Lungi - Modhumoti _ MIAH-001.jpg', basePrice: 32.99 },
    { id: '9', name: 'Cargo Joggers', image: '/product/Navy Blue Cargo Joggers-001.jpg', basePrice: 37.99 },
    { id: '10', name: 'Slim Fit Jeans', image: '/product/Slim Fit Black Jeans-001.jpg', basePrice: 42.99 }
  ];

  const colors = ['Dark Grey', 'Natural Oak', 'Cream White', 'Black Leather', 'White', 'Brown', 'Blue', 'Green'];
  const sizes = ['Small', 'Medium', 'Large', 'XL', '6-Seater', '4-Seater', 'Twin', 'Queen', 'King'];

  const orders: Order[] = [];
  
  for (let i = 1; i <= 50; i++) {
    const orderNumber = String(i).padStart(3, '0');
    const randomDate = new Date(2024, 0, Math.floor(Math.random() * 365));
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const cityIndex = Math.floor(Math.random() * cities.length);
    
    // Generate 1-4 random items per order
    const itemCount = Math.floor(Math.random() * 4) + 1;
    const orderItems: OrderItem[] = [];
    let subtotal = 0;
    
    for (let j = 0; j < itemCount; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const priceVariation = (Math.random() - 0.5) * 0.2; // ±10% price variation
      const price = Math.round((product.basePrice * (1 + priceVariation)) * 100) / 100;
      
      orderItems.push({
        id: product.id,
        name: product.name,
        image: product.image,
        price: price,
        quantity: quantity,
        sku: product.id, // Added sku field
        selectedColor: colors[Math.floor(Math.random() * colors.length)],
        selectedSize: sizes[Math.floor(Math.random() * sizes.length)]
      });
      
      subtotal += price * quantity;
    }
    
    const shipping = Math.round((Math.random() * 50 + 10) * 100) / 100; // $10-$60 shipping
    const tax = Math.round((subtotal * 0.08) * 100) / 100; // 8% tax
    const total = Math.round((subtotal + shipping + tax) * 100) / 100;
    
    const order: Order = {
      id: `ORD-2024-${orderNumber}`,
      date: randomDate.toISOString().split('T')[0],
      status: status,
      total: total,
      subtotal: subtotal,
      shipping: shipping,
      tax: tax,
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      items: orderItems,
      shippingInfo: {
        name: `Customer ${i}`,
        email: `customer${i}@example.com`,
        phone: `555-123-${String(i).padStart(4, '0')}`,
        address: `${Math.floor(Math.random() * 9999) + 1} ${['Main', 'Oak', 'Pine', 'Elm', 'Maple'][Math.floor(Math.random() * 5)]} Street`,
        city: cities[cityIndex],
        state: states[cityIndex],
        zip: String(Math.floor(Math.random() * 90000) + 10000),
        method: shippingMethods[Math.floor(Math.random() * shippingMethods.length)],
        tracking: Math.random() > 0.3 ? `TRK${Math.floor(Math.random() * 1000000000)}` : undefined,
        estimatedDelivery: new Date(randomDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      timeline: [
        { status: 'Order Placed', date: randomDate.toISOString().split('T')[0], completed: true, description: 'Your order has been received and is being processed.' },
        { status: 'Confirmed', date: randomDate.toISOString().split('T')[0], completed: true, description: 'Payment confirmed and order details verified.' },
        { status: 'Processing', date: new Date(randomDate.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], completed: ['Processing', 'Confirmed', 'Shipped', 'In Transit', 'Out for Delivery', 'Delivered'].includes(status), description: 'Items are being prepared for shipment.' },
        { status: 'Shipped', date: ['Shipped', 'In Transit', 'Out for Delivery', 'Delivered'].includes(status) ? new Date(randomDate.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : '', completed: ['Shipped', 'In Transit', 'Out for Delivery', 'Delivered'].includes(status), description: 'Your order has been dispatched from our warehouse.' },
        { status: 'Delivered', date: status === 'Delivered' ? new Date(randomDate.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : '', completed: status === 'Delivered', description: 'Order delivered successfully.' }
      ],
      notes: Math.random() > 0.7 ? 'Special delivery instructions provided by customer.' : undefined
    };
    
    orders.push(order);
  }
  
  return orders;
}

// Sample orders data for demonstration
const sampleOrders: Order[] = generateDemoOrders();

// Order reducer
function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };

    case 'LOAD_ORDERS':
      // Sort orders by date (most recent first) and get the 3 most recent
      const sortedOrders = action.payload.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return {
        ...state,
        orders: sortedOrders,
        recentOrders: sortedOrders.slice(0, 3),
        isLoading: false,
        error: null,
      };

    case 'ADD_ORDER':
      const newOrders = [action.payload, ...state.orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return {
        ...state,
        orders: newOrders,
        recentOrders: newOrders.slice(0, 3),
      };

    case 'UPDATE_ORDER':
      const updatedOrdersList = state.orders.map(order =>
        order.id === action.payload.id ? action.payload : order
      ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return {
        ...state,
        orders: updatedOrdersList,
        recentOrders: updatedOrdersList.slice(0, 3),
      };

    case 'UPDATE_ORDER_STATUS':
      const updatedOrders = state.orders.map(order =>
        order.id === action.payload.id
          ? {
              ...order,
              status: action.payload.status,
              timeline: action.payload.timeline || order.timeline,
            }
          : order
      ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return {
        ...state,
        orders: updatedOrders,
        recentOrders: updatedOrders.slice(0, 3),
      };

    case 'CANCEL_ORDER':
      const cancelledOrders = state.orders.map(order =>
        order.id === action.payload
          ? { ...order, status: 'Cancelled' as const }
          : order
      );
      return {
        ...state,
        orders: cancelledOrders,
        recentOrders: cancelledOrders.slice(0, 3),
      };

    default:
      return state;
  }
}

// Context
const OrderContext = createContext<{
  state: OrderState;
  loadOrders: () => void;
  addOrder: (order: Order) => void;
  updateOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status'], timeline?: OrderTimeline[]) => void;
  cancelOrder: (id: string) => void;
  reorder: (id: string) => void;
  getOrderById: (id: string) => Order | undefined;
  getOrdersByStatus: (status: Order['status']) => Order[];
} | undefined>(undefined);

// Provider
export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  // Load orders on mount
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call
    setTimeout(() => {
      try {
        dispatch({ type: 'LOAD_ORDERS', payload: sampleOrders });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load orders' });
      }
    }, 500);
  };

  const addOrder = (order: Order) => {
    dispatch({ type: 'ADD_ORDER', payload: order });
  };

  const updateOrder = (order: Order) => {
    dispatch({ type: 'UPDATE_ORDER', payload: order });
  };

  const updateOrderStatus = (
    id: string,
    status: Order['status'],
    timeline?: OrderTimeline[]
  ) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id, status, timeline } });
  };

  const cancelOrder = (id: string) => {
    dispatch({ type: 'CANCEL_ORDER', payload: id });
  };

  const reorder = (id: string) => {
    const order = state.orders.find(o => o.id === id);
    if (order) {
      // In a real app, this would add items to cart and redirect to checkout
      console.log('Reordering items from order:', id);
    }
  };

  const getOrderById = (id: string) => {
    return state.orders.find(order => order.id === id);
  };

  const getOrdersByStatus = (status: Order['status']) => {
    return state.orders.filter(order => order.status === status);
  };

  return (
    <OrderContext.Provider
      value={{
        state,
        loadOrders,
        addOrder,
        updateOrder,
        updateOrderStatus,
        cancelOrder,
        reorder,
        getOrderById,
        getOrdersByStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

// Hook
export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider. Make sure to wrap your app with the OrderProvider component.');
  }
  return context;
}