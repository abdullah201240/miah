'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { 
  Search, 
  X,
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

interface MobileTopBarProps {
  showSearch?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

export default function MobileTopBar({ 
  title 
}: MobileTopBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLFormElement>(null);
  const { state } = useCart();
  const router = useRouter();

  // Mock search function - replace with your actual search API call
  const performSearch = (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    // Simulate API call with mock data
    const mockResults = [
      `${query} chair`,
      `${query} table`,
      `${query} sofa`,
      `${query} bed`,
      `${query} lamp`
    ];
    setSearchResults(mockResults);
    setShowResults(true);
  };

  // Handle search input change with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  const handleResultClick = (result: string) => {
    setSearchQuery(result);
    router.push(`/products?search=${encodeURIComponent(result)}`);
    setShowResults(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        {/* First Line - Company Name */}
        <div className="flex items-center justify-center px-4 py-2 border-b border-gray-100">
          {title ? (
            <h1 className="text-lg font-semibold text-gray-900 truncate">{title}</h1>
          ) : (
            <Link href="/" className="text-2xl lg:text-3xl font-bold text-gray-900 hover:text-gray-700 transition-all duration-300 flex-shrink-0 hover:scale-105">
              <Image 
                            src="/web-black-logo.gif" 
                            alt="FurniStore Logo" 
                            width={200}
                            height={80}
                            className="h-12 lg:h-14 w-auto object-contain"
                          />
            </Link>
          )}
        </div>

        {/* Second Line - Search Options */}
        <div className="px-4 py-3">
          <form onSubmit={handleSearchSubmit} className="relative" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search furniture, decor..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim() === '') {
                    setShowResults(false);
                  }
                }}
                onFocus={() => searchQuery.trim() !== '' && setShowResults(true)}
              />
              {searchQuery && (
                <button
                  aria-label="Clear search"
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                    setShowResults(false);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                <div className="py-1">
                  {searchResults.map((result, index) => (
                    <button
                      aria-label="Search result"
                      key={index}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors duration-200"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="flex items-center">
                        <Search className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{result}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={toggleMenu}>
            <div className="bg-white w-64 h-full shadow-lg" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMenu}
                    className="p-2"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <nav className="p-4">
                <div className="space-y-4">
                  <Link 
                    href="/" 
                    className="block text-gray-700 hover:text-gray-900 py-2 font-medium"
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/products" 
                    className="block text-gray-700 hover:text-gray-900 py-2 font-medium"
                    onClick={toggleMenu}
                  >
                    All Products
                  </Link>
                  <Link 
                    href="/categories" 
                    className="block text-gray-700 hover:text-gray-900 py-2 font-medium"
                    onClick={toggleMenu}
                  >
                    Categories
                  </Link>
                  <Link 
                    href="/deals" 
                    className="block text-gray-700 hover:text-gray-900 py-2 font-medium"
                    onClick={toggleMenu}
                  >
                    Deals
                  </Link>
                  <Link 
                    href="/account" 
                    className="block text-gray-700 hover:text-gray-900 py-2 font-medium"
                    onClick={toggleMenu}
                  >
                    Account
                  </Link>
                  <Link 
                    href="/orders" 
                    className="block text-gray-700 hover:text-gray-900 py-2 font-medium"
                    onClick={toggleMenu}
                  >
                    Orders
                  </Link>
                  <Link 
                    href="/about" 
                    className="block text-gray-700 hover:text-gray-900 py-2 font-medium"
                    onClick={toggleMenu}
                  >
                    About
                  </Link>
                  <Link 
                    href="/contact" 
                    className="block text-gray-700 hover:text-gray-900 py-2 font-medium"
                    onClick={toggleMenu}
                  >
                    Contact
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
