'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product/ProductCard';
import { 
  SlidersHorizontal, 
  Filter,
  ArrowLeft,
  Loader2,
  X
} from 'lucide-react';
import { products, categories, Category } from '@/data/products';
import MobileLayout from '@/components/layout/MobileLayout';
import { useNotifications } from '@/contexts/NotificationContext';

function CategoryContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { addNotification } = useNotifications();
  const [category, setCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  
  // Price range filter states
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [displayedProducts, setDisplayedProducts] = useState<typeof products>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const categoryName = params.name as string;
    const foundCategory = categories.find(cat => 
      cat.id === categoryName || 
      cat.name.toLowerCase().replace(/\s+/g, '-') === categoryName.toLowerCase()
    );
    setCategory(foundCategory || null);
    setLoading(false);

    // Check for subcategory in URL params
    const subcategory = searchParams.get('subcategory');
    if (subcategory) {
      setSelectedSubcategory(subcategory);
    }
    
    // Calculate price range from products
    if (foundCategory) {
      const categoryProducts = products.filter(product => product.category === foundCategory.id);
      if (categoryProducts.length > 0) {
        const prices = categoryProducts.map(p => p.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        // Add some padding to the max value to ensure we can select the highest priced items
        const paddedMax = Math.ceil(max * 1.1);
        setPriceRange({ min: Math.floor(min), max: paddedMax });
      }
    }
  }, [params.name, searchParams]);

  // Handle min price input change with validation
  const handleMinPriceChange = (value: number | '') => {
    if (value === '') {
      setMinPrice('');
      return;
    }
    
    // Ensure value is within global min/max range
    if (value < priceRange.min) {
      addNotification({
        title: 'Invalid Minimum Price',
        description: `Minimum price cannot be less than ৳${priceRange.min}`,
        type: 'alert',
        priority: 'medium',
        read: false
      });
      return;
    }
    
    if (maxPrice !== '' && value > maxPrice) {
      addNotification({
        title: 'Invalid Price Range',
        description: `Minimum price cannot be greater than maximum price (৳${maxPrice})`,
        type: 'alert',
        priority: 'medium',
        read: false
      });
      return;
    }
    
    setMinPrice(value);
  };

  // Handle max price input change with validation
  const handleMaxPriceChange = (value: number | '') => {
    if (value === '') {
      setMaxPrice('');
      return;
    }
    
    // Ensure value is within global min/max range
    if (value > priceRange.max) {
      addNotification({
        title: 'Invalid Maximum Price',
        description: `Maximum price cannot be greater than ৳${priceRange.max}`,
        type: 'alert',
        priority: 'medium',
        read: false
      });
      return;
    }
    
    if (minPrice !== '' && value < minPrice) {
      addNotification({
        title: 'Invalid Price Range',
        description: `Maximum price cannot be less than minimum price (৳${minPrice})`,
        type: 'alert',
        priority: 'medium',
        read: false
      });
      return;
    }
    
    setMaxPrice(value);
  };

  const filteredProducts = useMemo(() => {
    if (!category) return [];

    let filtered = products.filter(product => product.category === category.id);

    // Filter by subcategory if selected
    if (selectedSubcategory !== 'all' && category.subcategories) {
      // This is a simplified subcategory filter - in a real app, 
      // you'd want to add subcategory fields to your product data
      const subcategoryName = category.subcategories.find(sub => sub.id === selectedSubcategory)?.name;
      if (subcategoryName) {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(subcategoryName.toLowerCase()) ||
          product.description.toLowerCase().includes(subcategoryName.toLowerCase())
        );
      }
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range with validation
    filtered = filtered.filter(product => {
      const productPrice = product.price;
      // Use priceRange values as defaults if minPrice or maxPrice are empty
      const min = minPrice === '' ? priceRange.min : minPrice;
      const max = maxPrice === '' ? priceRange.max : maxPrice;
      
      // Ensure min doesn't exceed max
      const effectiveMin = Math.min(min, max);
      const effectiveMax = Math.max(min, max);
      
      return productPrice >= effectiveMin && productPrice <= effectiveMax;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered = [...filtered].sort((a, b) => {
          const dateA = new Date(a.arrivalDate || '').getTime();
          const dateB = new Date(b.arrivalDate || '').getTime();
          return dateB - dateA;
        });
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Default sorting (featured first)
        filtered = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [category, selectedSubcategory, searchQuery, sortBy, minPrice, maxPrice, priceRange.min, priceRange.max, addNotification]);

  // Calculate pagination
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const hasMoreProducts = displayedProducts.length < totalProducts;
  
  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
    setDisplayedProducts(filteredProducts.slice(0, productsPerPage));
  }, [filteredProducts, productsPerPage]);

  // Load more products function
  const loadMoreProducts = async () => {
    if (isLoadingMore || !hasMoreProducts) return;
    
    setIsLoadingMore(true);
    
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const nextPage = currentPage + 1;
    const startIndex = 0;
    const endIndex = nextPage * productsPerPage;
    
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
    setCurrentPage(nextPage);
    setIsLoadingMore(false);
  };

  // Handle products per page change
  const handleProductsPerPageChange = (newCount: number) => {
    setProductsPerPage(newCount);
    setCurrentPage(1);
    setDisplayedProducts(filteredProducts.slice(0, newCount));
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedSubcategory('all');
    setMinPrice('');
    setMaxPrice('');
    setSearchQuery('');
    setSortBy('featured');
  };

  // Check if any filters are applied
  const hasActiveFilters = selectedSubcategory !== 'all' || minPrice !== '' || maxPrice !== '' || searchQuery !== '';

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-black" />
        </div>
      </MobileLayout>
    );
  }

  if (!category) {
    return (
      <MobileLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
            <Link href="/categories">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Categories
              </Button>
            </Link>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gray-50">
       
        <div className="container mx-auto px-4 py-6">
          {/* Category Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
            <p className="text-gray-600">{category.description}</p>
          </div>

          {/* Mobile filter toggle */}
          <div className="mb-6 lg:hidden">
            <Button
              variant="outline"
              className="w-full flex-shrink-0"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-2">
            {/* Category filter - responsive sidebar */}
            <div className={`${
              showFilters ? 'block' : 'hidden'
            } lg:block w-full lg:w-72 flex-shrink-0`}>
              <div className="sticky top-4">
                {/* Subcategories Filter */}
                {category.subcategories && category.subcategories.length > 0 && (
                  <div className="bg-white rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Shop by Type</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setSelectedSubcategory('all');
                          if (window.innerWidth < 1024) setShowFilters(false); // Close filters on mobile after selection
                        }}
                        className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-all ${
                          selectedSubcategory === 'all'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        All Types
                      </button>
                      {category.subcategories.map((subcategory) => (
                        <button
                          key={subcategory.id}
                          onClick={() => {
                            setSelectedSubcategory(subcategory.id);
                            if (window.innerWidth < 1024) setShowFilters(false); // Close filters on mobile after selection
                          }}
                          className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-all ${
                            selectedSubcategory === subcategory.id
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {subcategory.name} ({subcategory.count})
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Range Filter */}
                <div className="bg-white rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Price Range</h3>
                    {(minPrice !== '' || maxPrice !== '') && (
                      <button 
                        onClick={() => { setMinPrice(''); setMaxPrice(''); }}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                        aria-label="Reset price filter"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reset
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Min: ৳{minPrice === '' ? priceRange.min : minPrice}</span>
                        <span className="text-sm font-medium text-gray-700">Max: ৳{maxPrice === '' ? priceRange.max : maxPrice}</span>
                      </div>
                      <div className="relative pt-1">
                        <input
                          type="range"
                          min={priceRange.min}
                          max={maxPrice === '' ? priceRange.max : maxPrice}
                          value={minPrice === '' ? priceRange.min : minPrice}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            handleMinPriceChange(value);
                          }}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          aria-label="Minimum price slider"
                        />
                        <input
                          type="range"
                          min={minPrice === '' ? priceRange.min : minPrice}
                          max={priceRange.max}
                          value={maxPrice === '' ? priceRange.max : maxPrice}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            handleMaxPriceChange(value);
                          }}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer absolute top-0 left-0"
                          style={{ pointerEvents: 'none' }}
                          aria-label="Maximum price slider"
                        />
                        <div 
                          className="absolute h-2 bg-blue-600 rounded-lg top-0 left-0"
                          style={{
                            left: `${(((minPrice === '' ? priceRange.min : minPrice) - priceRange.min) / (priceRange.max - priceRange.min)) * 100}%`,
                            right: `${100 - (((maxPrice === '' ? priceRange.max : maxPrice) - priceRange.min) / (priceRange.max - priceRange.min)) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="minPriceInput" className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                        <input
                          type="number"
                          id="minPriceInput"
                          min={priceRange.min}
                          max={maxPrice === '' ? priceRange.max : maxPrice}
                          value={minPrice}
                          onChange={(e) => {
                            const value = e.target.value === '' ? '' : Number(e.target.value);
                            handleMinPriceChange(value);
                          }}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          aria-label="Minimum price"
                        />
                      </div>
                      <div>
                        <label htmlFor="maxPriceInput" className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                        <input
                          type="number"
                          id="maxPriceInput"
                          min={minPrice === '' ? priceRange.min : minPrice}
                          max={priceRange.max}
                          value={maxPrice}
                          onChange={(e) => {
                            const value = e.target.value === '' ? '' : Number(e.target.value);
                            handleMaxPriceChange(value);
                          }}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          aria-label="Maximum price"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid - Right Column */}
            <div className="flex-1 min-w-0">
              {/* Results header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {category.name} Products
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Showing {displayedProducts.length} of {totalProducts} products
                    {searchQuery && ` for "${searchQuery}"`}
                    {selectedSubcategory !== 'all' && (
                      <span>
                        {' '}in {category.subcategories?.find(sub => sub.id === selectedSubcategory)?.name}
                      </span>
                    )}
                  </p>
                  {totalProducts > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      Page {currentPage} of {totalPages}
                    </p>
                  )}
                </div>
                
                {/* Controls: Items per page and Sort - Right aligned like products page */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-shrink-0">
                  {/* Items per page selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 font-medium">Show:</span>
                    <select
                      aria-label="Items per page"
                      className="text-sm border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={productsPerPage}
                      onChange={(e) => handleProductsPerPageChange(Number(e.target.value))}
                    >
                      <option value={6}>6 per page</option>
                      <option value={12}>12 per page</option>
                      <option value={24}>24 per page</option>
                      <option value={48}>48 per page</option>
                    </select>
                  </div>
                  
                  {/* Sort dropdown */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 font-medium">Sort by:</span>
                    <select
                      aria-label="Sort by"
                      className="text-sm border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                      <option value="newest">Newest</option>
                      <option value="name">Name A-Z</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Results */}
              {filteredProducts.length > 0 ? (
                <div className="space-y-8">
                  {/* Products Grid */}
                  <div className={`${
                    viewMode === 'grid'
                      ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
                      : 'space-y-6'
                  }`}>
                    {displayedProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className="animate-fadeInUp"
                        style={{
                          animationDelay: `${(index % productsPerPage) * 0.1}s`,
                          animationFillMode: 'both'
                        }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                  
                  {/* Load More Button */}
                  {hasMoreProducts && (
                    <div className="flex justify-center mt-12">
                      <Button
                        onClick={loadMoreProducts}
                        disabled={isLoadingMore}
                        className="px-8 py-3 bg-black hover:bg-gray-800 text-white rounded-xl transition-all shadow-lg hover:shadow-xl"
                      >
                        {isLoadingMore ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>Load More Products ({totalProducts - displayedProducts.length} remaining)</>
                        )}
                      </Button>
                    </div>
                  )}
                  
                  {/* Pagination Info */}
                  {!hasMoreProducts && totalProducts > productsPerPage && (
                    <div className="text-center mt-12 p-6 bg-gray-100 rounded-xl">
                      <p className="text-gray-700 font-medium">
                        You've viewed all {totalProducts} products in this category.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
                        <span className="text-sm text-gray-600">
                          Page {currentPage} of {totalPages}
                        </span>
                        <Button
                          onClick={() => {
                            setCurrentPage(1);
                            setDisplayedProducts(filteredProducts.slice(0, productsPerPage));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          variant="outline"
                          className="border-gray-300 text-gray-700 hover:bg-gray-200"
                        >
                          Back to Top
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Filter className="h-10 w-10 text-black" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">No products found</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Try adjusting your search or filter criteria to find what you're looking for.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      onClick={resetFilters}
                      className="border-gray-300 text-gray-700 hover:bg-gray-200"
                    >
                      Clear filters
                    </Button>
                    <Link href="/products">
                      <Button className="bg-black hover:bg-gray-800 text-white">
                        Browse All Products
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={
      <MobileLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-black" />
        </div>
      </MobileLayout>
    }>
      <CategoryContent />
    </Suspense>
  );
}