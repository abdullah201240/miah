'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product } from '@/data/products';

// Types
export interface WishlistItem {
  id: string;
  product: Product;
  dateAdded: string;
}

interface WishlistState {
  items: WishlistItem[];
  itemCount: number;
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: { product: Product } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: WishlistState };

// Initial state
const initialState: WishlistState = {
  items: [],
  itemCount: 0,
};

// Wishlist reducer
function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product } = action.payload;
      
      // Check if item already exists
      const existingItem = state.items.find(item => item.product.id === product.id);
      if (existingItem) {
        return state; // Item already in wishlist
      }

      const newItem: WishlistItem = {
        id: `wishlist-${product.id}-${Date.now()}`,
        product,
        dateAdded: new Date().toISOString(),
      };

      const newItems = [...state.items, newItem];

      return {
        ...state,
        items: newItems,
        itemCount: newItems.length,
      };
    }

    case 'REMOVE_ITEM': {
      const { productId } = action.payload;
      const newItems = state.items.filter(item => item.product.id !== productId);

      return {
        ...state,
        items: newItems,
        itemCount: newItems.length,
      };
    }

    case 'CLEAR_WISHLIST': {
      return {
        ...state,
        items: [],
        itemCount: 0,
      };
    }

    case 'LOAD_WISHLIST': {
      return action.payload;
    }

    default:
      return state;
  }
}

// Context
const WishlistContext = createContext<{
  state: WishlistState;
  addItem: (product: Product) => boolean;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
} | undefined>(undefined);

// Provider
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('furnistore-wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        dispatch({ type: 'LOAD_WISHLIST', payload: parsedWishlist });
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (state.items.length >= 0) {
      localStorage.setItem('furnistore-wishlist', JSON.stringify(state));
    }
  }, [state]);

  const addItem = (product: Product): boolean => {
    // Check if item already exists
    const exists = state.items.some(item => item.product.id === product.id);
    if (exists) {
      return false; // Item already in wishlist
    }

    dispatch({
      type: 'ADD_ITEM',
      payload: { product },
    });
    return true; // Item successfully added
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
    localStorage.removeItem('furnistore-wishlist');
  };

  const isInWishlist = (productId: string): boolean => {
    return state.items.some(item => item.product.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// Hook
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}