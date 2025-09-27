'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Heart,
  ShoppingCart,
  Trash2,
  Grid3X3,
  List,
  Star,
  Calendar,
} from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useAdmin } from '@/contexts/AdminContext';
import { formatPrice } from '@/lib/currency';

type ViewMode = 'grid' | 'list';
type SortOption = 'dateAdded' | 'priceAsc' | 'priceDesc' | 'name' | 'rating';

export default function WishlistPage() {
  const { state: wishlistState, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const { state: adminState } = useAdmin();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('dateAdded');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Sort wishlist items
  const sortedItems = React.useMemo(() => {
    const items = [...wishlistState.items];
    
    switch (sortBy) {
      case 'priceAsc':
        return items.sort((a, b) => a.product.price - b.product.price);
      case 'priceDesc':
        return items.sort((a, b) => b.product.price - a.product.price);
      case 'name':
        return items.sort((a, b) => a.product.name.localeCompare(b.product.name));
      case 'rating':
        return items.sort((a, b) => b.product.rating - a.product.rating);
      case 'dateAdded':
      default:
        return items.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    }
  }, [wishlistState.items, sortBy]);

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  const handleAddToCart = (item: any) => {
    addToCart(item.product, 1);
  };

  const handleClearWishlist = () => {
    clearWishlist();
    setShowClearConfirm(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDiscountPercentage = (product: any) => {
    return product.originalPrice 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;
  };

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-8">
            {wishlistState.itemCount > 0 && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg">
                <div className="flex items-center gap-3">
                  {/* View Mode Toggle */}
                  <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-none border-0"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-none border-0"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Sort Dropdown */}
                  <select
                    aria-label="Sort by"
                    id="sortBy"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm font-medium focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="dateAdded">Recently Added</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {/* Clear Wishlist */}
                <Button
                  variant="outline"
                  onClick={() => setShowClearConfirm(true)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            )}
          </div>

          {/* Wishlist Content */}
          {wishlistState.itemCount === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Heart className="h-16 w-16 text-red-400" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Your Wishlist is Empty
                </h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Start adding products you love to keep track of them for later!
                </p>
                <div className="space-y-4">
                  <Link href="/products">
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Browse Products
                    </Button>
                  </Link>
                  <Link href="/categories">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto ml-0 sm:ml-4">
                      <Grid3X3 className="h-5 w-5 mr-2" />
                      Explore Categories
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Wishlist Items */
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
            }`}>
              {sortedItems.map((item, index) => {
                const discountPercentage = getDiscountPercentage(item.product);
                
                return viewMode === 'grid' ? (
                  /* Grid View */
                  <Card 
                    key={item.id} 
                    className="group h-full hover:shadow-lg transition-all duration-300 border-0 p-0"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-full flex flex-col">
                      {/* Product Image */}
                      <Link href={`/products/${item.product.id}`} className="block">
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        </div>
                      </Link>

                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {item.product.isNewArrival && (
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xs font-semibold">
                            ✨ New
                          </Badge>
                        )}
                        {discountPercentage > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            -{discountPercentage}%
                          </Badge>
                        )}
                        {item.product.featured && (
                          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveItem(item.product.id);
                        }}
                        className="absolute top-2 right-2 p-2 h-8 w-8 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full shadow-lg hover:shadow-xl text-red-500 hover:text-red-600"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>

                      {/* Product Info */}
                      <div className="p-3 flex-1 flex flex-col">
                        <Link 
                          href={`/products/${item.product.id}`}
                          className="block hover:text-gray-600 transition-colors flex-1"
                        >
                          <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                            {item.product.name}
                          </h3>
                        </Link>
                        
                        {/* Price */}
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-base">{formatPrice(item.product.price, adminState.settings?.currency || 'USD')}</span>
                            {item.product.originalPrice && (
                              <span className="text-xs text-gray-500 line-through">
                                {formatPrice(item.product.originalPrice, adminState.settings?.currency || 'USD')}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="mt-3 space-y-2">
                          <Button 
                            size="sm" 
                            className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                            disabled={!item.product.inStock}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart(item);
                            }}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : (
                  /* List View */
                  <Card 
                    key={item.id} 
                    className="hover:shadow-lg transition-all duration-300 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl animate-fadeInUp"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        {/* Product Image */}
                        <Link href={`/products/${item.product.id}`}>
                          <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                              sizes="96px"
                            />
                          </div>
                        </Link>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <Link href={`/products/${item.product.id}`}>
                              <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1">
                                {item.product.name}
                              </h3>
                            </Link>
                            
                            {/* Badges */}
                            <div className="flex gap-2 ml-4">
                              {item.product.isNewArrival && (
                                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
                                  New
                                </Badge>
                              )}
                              {discountPercentage > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  -{discountPercentage}%
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Rating & Date */}
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                              <span className="text-sm font-medium">{item.product.rating}</span>
                              <span className="text-sm text-muted-foreground">({item.product.reviews})</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(item.dateAdded)}</span>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="flex items-center gap-2 mb-4">
                            <span className="font-bold text-xl text-primary">
                              {formatPrice(item.product.price, adminState.settings?.currency || 'USD')}
                            </span>
                            {item.product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {formatPrice(item.product.originalPrice, adminState.settings?.currency || 'USD')}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                          <Button 
                            onClick={() => handleAddToCart(item)}
                            className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500 text-white"
                            disabled={!item.product.inStock}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {item.product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Recommended Products Section */}
          {wishlistState.itemCount > 0 && (
            <div className="mt-16 animate-fadeInUp">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground flex items-center">
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Recommended For You
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent ml-4"></span>
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlistState.items
                  .slice(0, 4)
                  .map((item) => (
                    <Card key={item.id} className="group h-full hover:shadow-lg transition-all duration-300 border-0 p-0">
                      <div className="relative h-full flex flex-col">
                        {/* Product Image */}
                        <Link href={`/products/${item.product.id}`} className="block">
                          <div className="relative aspect-square overflow-hidden">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                          </div>
                        </Link>

                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {item.product.isNewArrival && (
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xs font-semibold">
                              ✨ New
                            </Badge>
                          )}
                          {getDiscountPercentage(item.product) > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              -{getDiscountPercentage(item.product)}%
                            </Badge>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="p-3 flex-1 flex flex-col">
                          <Link 
                            href={`/products/${item.product.id}`}
                            className="block hover:text-gray-600 transition-colors flex-1"
                          >
                            <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                              {item.product.name}
                            </h3>
                          </Link>
                          
                          {/* Price */}
                          <div className="mt-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-base">{formatPrice(item.product.price, adminState.settings?.currency || 'USD')}</span>
                              {item.product.originalPrice && (
                                <span className="text-xs text-gray-500 line-through">
                                  {formatPrice(item.product.originalPrice, adminState.settings?.currency || 'USD')}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* Clear Confirmation Modal */}
          {showClearConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-md bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trash2 className="h-8 w-8 text-red-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Clear Wishlist</h3>
                    <p className="text-muted-foreground mb-6">
                      Are you sure you want to remove all items from your wishlist? This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowClearConfirm(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleClearWishlist}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                      >
                        Clear All
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}