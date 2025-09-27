'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/product/ProductCard';
import { 
  Search, 
  SlidersHorizontal, 
  Filter,
  ArrowLeft,
  Loader2,
  Grid3X3,
  List
} from 'lucide-react';
import { products, categories, Category } from '@/data/products';
import MobileLayout from '@/components/layout/MobileLayout';

function CategoryContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  
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
  }, [params.name, searchParams]);

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
  }, [category, selectedSubcategory, searchQuery, sortBy]);

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

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
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

          {/* Subcategories Filter */}
          {category.subcategories && category.subcategories.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Shop by Type</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedSubcategory('all')}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedSubcategory === 'all'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:text-purple-700'
                  }`}
                >
                  All Types
                </button>
                {category.subcategories.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    onClick={() => setSelectedSubcategory(subcategory.id)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedSubcategory === subcategory.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:text-purple-700'
                    }`}
                  >
                    {subcategory.name} ({subcategory.count})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder={`Search in ${category.name}...`}
                className="pl-10 w-full h-12 rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  aria-label="Grid View"
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${
                    viewMode === 'grid'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
                <button
                  aria-label="List View"
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${
                    viewMode === 'list'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                aria-label="Sort By"
                className="text-sm border rounded-lg px-4 py-3 bg-white min-w-[180px] border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured Items</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest Arrivals</option>
                <option value="name">Name A-Z</option>
              </select>

              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                className="md:hidden h-12 px-4 border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Results */}
          {filteredProducts.length > 0 ? (
            <div className="space-y-8">
              {/* Results Summary and Display Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-gray-600">
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
                
                {/* Products per page selector */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Show:</span>
                  <select
                    aria-label="Products per page"
                    className="text-sm border rounded-lg px-3 py-2 bg-white min-w-[80px] border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    value={productsPerPage}
                    onChange={(e) => handleProductsPerPageChange(Number(e.target.value))}
                  >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                  </select>
                  <span className="text-sm text-gray-600">per page</span>
                </div>
              </div>

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
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl"
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
                <div className="text-center mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <p className="text-gray-700 font-medium">
                    You've viewed all {totalProducts} products in this category.
                  </p>
                  <Button
                    onClick={() => {
                      setCurrentPage(1);
                      setDisplayedProducts(filteredProducts.slice(0, productsPerPage));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    variant="outline"
                    className="mt-4 border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    Back to Top
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="h-10 w-10 text-purple-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">No products found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSubcategory('all');
                  }}
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  Clear filters
                </Button>
                <Link href="/products">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    Browse All Products
                  </Button>
                </Link>
              </div>
            </div>
          )}
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
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        </div>
      </MobileLayout>
    }>
      <CategoryContent />
    </Suspense>
  );
}