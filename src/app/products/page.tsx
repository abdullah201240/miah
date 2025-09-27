'use client';

import { Suspense, useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/product/ProductGrid';
import CategoryFilter from '@/components/product/CategoryFilter';
import { products, categories } from '@/data/products';
import { Search, SlidersHorizontal, Loader2, ChevronDown, X } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { useSearchParams } from 'next/navigation';

// Move the main component logic to a separate component
function ProductsContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]); // Default price range
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  
  // Pagination state
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Sync URL search params with local state
  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    
    if (search) {
      setSearchQuery(search);
    }
    if (category && category !== 'all') {
      setSelectedCategory(category);
    }
    if (sort) {
      setSortBy(sort);
    }
  }, [searchParams]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy, priceRange]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query - enhanced search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query))) ||
        (product.features && product.features.some(feature => feature.toLowerCase().includes(query)))
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

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
        // Filter to show only new arrivals and sort by arrival date (newest first)
        filtered = filtered.filter(product => product.isNewArrival);
        filtered = [...filtered].sort((a, b) => {
          // If both products have arrival dates, sort by date (newest first)
          if (a.arrivalDate && b.arrivalDate) {
            return new Date(b.arrivalDate).getTime() - new Date(a.arrivalDate).getTime();
          }
          // If only one has an arrival date, prioritize it
          if (a.arrivalDate) return -1;
          if (b.arrivalDate) return 1;
          // If neither has an arrival date, keep original order
          return 0;
        });
        break;
      default:
        // Default sorting (featured)
        filtered = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [selectedCategory, searchQuery, sortBy, priceRange]);

  // Paginated products for display
  const paginatedProducts = useMemo(() => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const hasMoreProducts = paginatedProducts.length < filteredProducts.length;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Load more functionality
  const handleLoadMore = async () => {
    if (hasMoreProducts && !isLoadingMore) {
      setIsLoadingMore(true);
      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentPage(prev => prev + 1);
      setIsLoadingMore(false);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Handle price range change
  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  // Reset price filter
  const resetPriceFilter = () => {
    // Find min and max prices in all products
    const prices = products.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    setPriceRange([minPrice, maxPrice]);
  };

  return (
    <MobileLayout>
      <div className="container mx-auto px-2 py-2">
        {/* Search and filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
         
          
          {/* Mobile filter toggle */}
          <Button
            variant="outline"
            className="lg:hidden flex-shrink-0"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Category filter - responsive sidebar */}
          <div className={`${
            showFilters ? 'block' : 'hidden'
          } lg:block w-full lg:w-72 flex-shrink-0`}>
            <div className="sticky top-4">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              
              {/* Price Range Filter */}
              <div className="bg-white rounded-lg  p-6 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Price Range</h3>
                  {(priceRange[0] > 0 || priceRange[1] < 200) && (
                    <button 
                      onClick={resetPriceFilter}
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
                      <span className="text-sm font-medium text-gray-700">Min: ৳{priceRange[0]}</span>
                      <span className="text-sm font-medium text-gray-700">Max: ৳{priceRange[1]}</span>
                    </div>
                    <div className="relative pt-1">
                      <label htmlFor="minPriceRange" className="sr-only">Minimum price</label>
                      <input
                        type="range"
                        id="minPriceRange"
                        min="0"
                        max="200"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(Number(e.target.value), priceRange[1])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        aria-label="Minimum price range"
                      />
                      <label htmlFor="maxPriceRange" className="sr-only">Maximum price</label>
                      <input
                        type="range"
                        id="maxPriceRange"
                        min="0"
                        max="200"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(priceRange[0], Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer absolute top-0 left-0"
                        style={{ pointerEvents: 'none' }}
                        aria-label="Maximum price range"
                      />
                      <div 
                        className="absolute h-2 bg-blue-600 rounded-lg top-0 left-0"
                        style={{
                          left: `${(priceRange[0] / 200) * 100}%`,
                          right: `${100 - (priceRange[1] / 200) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                      <input
                        type="number"
                        id="minPrice"
                        min="0"
                        max="200"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(Number(e.target.value), priceRange[1])}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        aria-label="Minimum price"
                      />
                    </div>
                    <div>
                      <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                      <input
                        type="number"
                        id="maxPrice"
                        min="0"
                        max="200"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(priceRange[0], Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        aria-label="Maximum price"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedCategory === 'all' ? 'All Products' : 
                   categories.find(c => c.id === selectedCategory)?.name || 'Products'}
                </h2>
                {searchQuery && (
                  <p className="text-sm text-gray-600 mt-1">
                    Showing results for "{searchQuery}"
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Showing {paginatedProducts.length} of {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                  {currentPage > 1 && ` (page ${currentPage} of ${totalPages})`}
                </p>
              </div>
              
              {/* Controls: Items per page and Sort */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-shrink-0">
                {/* Items per page selector */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 font-medium">Show:</span>
                  <select
                    aria-label="Items per page"
                    id="itemsPerPage"
                    className="text-sm border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={itemsPerPage}
                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                  >
                    <option value={8}>8 per page</option>
                    <option value={12}>12 per page</option>
                    <option value={16}>16 per page</option>
                    <option value={24}>24 per page</option>
                  </select>
                </div>
                
                {/* Sort dropdown */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 font-medium">Sort by:</span>
                  <select
                    aria-label="Sort by"
                    id="sortBy"
                    className="text-sm border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Products display */}
            {filteredProducts.length > 0 ? (
              <div>
                <ProductGrid 
                  products={paginatedProducts} 
                  startIndex={0} // Always start from 0 since we show accumulated products
                />
                
                {/* Load More Button and Pagination Info */}
                {hasMoreProducts && (
                  <div className="mt-8 text-center">
                    <Button
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      className="px-8 py-3 text-base font-medium"
                      variant="outline"
                    >
                      {isLoadingMore ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Loading more products...
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-2" />
                          Load More ({filteredProducts.length - paginatedProducts.length} remaining)
                        </>
                      )}
                    </Button>
                    
                    <div className="mt-4 text-sm text-gray-600">
                      <div className="flex items-center justify-center gap-2">
                        <span>Page {currentPage} of {totalPages}</span>
                        <span>•</span>
                        <span>{paginatedProducts.length} of {filteredProducts.length} products loaded</span>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="w-full max-w-xs mx-auto mt-2 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${(paginatedProducts.length / filteredProducts.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* All products loaded message */}
                {!hasMoreProducts && filteredProducts.length > itemsPerPage && (
                  <div className="mt-8 text-center py-6 border-t border-gray-200">
                    <p className="text-gray-600">
                      ✅ All {filteredProducts.length} products loaded
                    </p>
                    <Button
                      onClick={() => {
                        setCurrentPage(1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      variant="ghost"
                      className="mt-2 text-blue-600 hover:text-blue-700"
                    >
                      Back to top
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-6">
                    {searchQuery 
                      ? `No products match "${searchQuery}" in the selected category.`
                      : 'No products found in the selected category.'
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => setSearchQuery('')}
                      disabled={!searchQuery}
                    >
                      Clear search
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                        resetPriceFilter();
                      }}
                    >
                      View all products
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}

// Main page component with Suspense boundary
export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}