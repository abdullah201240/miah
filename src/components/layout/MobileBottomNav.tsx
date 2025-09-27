'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Grid3X3, 
  ShoppingCart, 
  Heart,
  User,
  Package,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { categories } from '@/data/products';
import { useState, useRef, useEffect } from 'react';

const navigationItems = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
    exact: true
  },
  {
    name: 'Categories',
    href: '/categories',
    icon: Grid3X3,
    exact: false
  },
  {
    name: 'Wishlist',
    href: '/wishlist',
    icon: Heart,
    exact: false
  },
  {
    name: 'Cart',
    href: '/cart',
    icon: ShoppingCart,
    exact: false
  },
  {
    name: 'Orders',
    href: '/orders',
    icon: Package,
    exact: false
  },
  {
    name: 'Account',
    href: '/account',
    icon: User,
    exact: false
  }
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { state } = useCart();
  const { state: wishlistState } = useWishlist();
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActiveRoute = (item: typeof navigationItems[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  return (
    <>
      {/* Category Dropdown */}
      <div
        ref={dropdownRef}
        className={`fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out z-50 ${
          showCategoryDropdown 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-h-96 overflow-y-auto">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
          </div>
          <div className="p-2">
            {categories.filter(cat => cat.id !== 'all').map((category) => (
              <div key={category.id} className="mb-2">
                <Link
                  href={`/categories/${category.id}`}
                  onClick={() => setShowCategoryDropdown(false)}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    {category.image && (
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                        <img 
                          src={category.image} 
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h4>
                      <p className="text-sm text-gray-500">{category.count} items</p>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </Link>
                
                {/* Subcategories */}
                {category.subcategories && category.subcategories.length > 0 && (
                  <div className="ml-6 mt-1 space-y-1">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        href={`/categories/${subcategory.id}`}
                        onClick={() => setShowCategoryDropdown(false)}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center space-x-2">
                          {subcategory.image && (
                            <div className="w-6 h-6 rounded overflow-hidden bg-gray-100">
                              <img 
                                src={subcategory.image} 
                                alt={subcategory.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                              {subcategory.name}
                            </p>
                            <p className="text-xs text-gray-400">{subcategory.count} items</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <nav className="flex items-center justify-around py-2 px-4">
          {navigationItems.map((item) => {
            const isActive = isActiveRoute(item);
            const Icon = item.icon;
            const isCategoriesItem = item.name === 'Categories';

            if (isCategoriesItem) {
              return (
                <button
                  key={item.name}
                  onClick={handleCategoryClick}
                  className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors min-w-0 flex-1 ${
                    isActive || showCategoryDropdown
                      ? 'text-gray-900 bg-gray-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="relative">
                    <div className="flex items-center">
                      <Icon className="h-5 w-5" />
                      {showCategoryDropdown ? (
                        <ChevronUp className="h-3 w-3 ml-1" />
                      ) : (
                        <ChevronDown className="h-3 w-3 ml-1" />
                      )}
                    </div>
                  </div>
                </button>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors min-w-0 flex-1 ${
                  isActive
                    ? 'text-gray-900 bg-gray-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {item.name === 'Cart' && state.itemCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs"
                    >
                      {state.itemCount > 9 ? '9+' : state.itemCount}
                    </Badge>
                  )}
                  {item.name === 'Wishlist' && wishlistState.itemCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs bg-red-500"
                    >
                      {wishlistState.itemCount > 9 ? '9+' : wishlistState.itemCount}
                    </Badge>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
