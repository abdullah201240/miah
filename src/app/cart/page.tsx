'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import MobileLayout from '@/components/layout/MobileLayout';
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ArrowLeft, 
  Heart,
  Share2,
  Gift,
  Shield,
  Truck,
  Clock,
  CheckCircle2,
  X,
  ShoppingCart
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { products, featuredProducts } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { useWishlist } from '@/contexts/WishlistContext';
import { formatPrice } from '@/lib/currency';
import { useAdmin } from '@/contexts/AdminContext';

export default function CartPage() {
  const { state: adminState } = useAdmin();
  const { state, updateQuantity, removeItem, clearCart, addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | ''>('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());
  const [addingToCart, setAddingToCart] = useState<Set<string>>(new Set());
  const [togglingWishlist, setTogglingWishlist] = useState<Set<string>>(new Set());

  // Define a type for the promo codes
  type PromoCode = 'SAVE10' | 'WELCOME20' | 'FREESHIP';

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleQuickAdd = async (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAddingToCart(prev => new Set(prev).add(product.id));
    
    try {
      addItem(product, 1);
      // Optional: Show success notification
      setTimeout(() => {
        setAddingToCart(prev => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });
      }, 1000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setAddingToCart(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }
  };

  const handleWishlistToggle = async (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setTogglingWishlist(prev => new Set(prev).add(product.id));
    
    try {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    } finally {
      setTimeout(() => {
        setTogglingWishlist(prev => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });
      }, 300);
    }
  };

  const handleShare = async (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const shareData = {
      title: product.name,
      text: `Check out this ${product.name} - ${product.description}`,
      url: `${window.location.origin}/products/${product.id}`
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareData.url);
        // Optional: Show notification that link was copied
        console.log('Product link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url);
        console.log('Product link copied to clipboard!');
      } catch (clipboardError) {
        console.error('Failed to copy to clipboard:', clipboardError);
      }
    }
  };

  const handleCartItemWishlist = async (item: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (isInWishlist(item.product.id)) {
        removeFromWishlist(item.product.id);
      } else {
        addToWishlist(item.product);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handleCartItemShare = async (item: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const shareData = {
      title: item.product.name,
      text: `Check out this ${item.product.name} - ${item.product.description}`,
      url: `${window.location.origin}/products/${item.product.id}`
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        // Optional: Show notification that link was copied
      }
    } catch (error) {
      console.error('Error sharing:', error);
      try {
        await navigator.clipboard.writeText(shareData.url);
      } catch (clipboardError) {
        console.error('Failed to copy to clipboard:', clipboardError);
      }
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setRemovingItems(prev => new Set(prev).add(itemId));
    setTimeout(() => {
      removeItem(itemId);
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }, 300);
  };

  const applyPromoCode = () => {
    // Mock promo code logic
    const validCodes: Record<PromoCode, number> = {
      'SAVE10': 0.1,
      'WELCOME20': 0.2,
      'FREESHIP': 0.05
    };
    
    const upperPromoCode = promoCode.toUpperCase() as PromoCode;
    
    if (validCodes[upperPromoCode] !== undefined) {
      setAppliedPromo(upperPromoCode);
      setPromoDiscount(validCodes[upperPromoCode]);
      setPromoCode('');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo('');
    setPromoDiscount(0);
  };

  const subtotal = state.total;
  const discount = subtotal * promoDiscount;
  const discountedSubtotal = subtotal - discount;
  const shipping = discountedSubtotal > 500 ? 0 : 50;
  const tax = discountedSubtotal * 0.08; // 8% tax
  const total = discountedSubtotal + shipping + tax;
  const savings = discount + (subtotal > 500 ? 50 : 0);

  // Smart product recommendations based on cart items
  const recommendedProducts = useMemo(() => {
    if (state.items.length === 0) {
      // If cart is empty, show featured products
      return featuredProducts.slice(0, 4);
    }

    // Get categories of items in cart
    const cartCategories = state.items.map(item => item.product.category);
    const uniqueCategories = [...new Set(cartCategories)];
    
    // Get products from same categories (excluding items already in cart)
    const cartProductIds = state.items.map(item => item.product.id);
    const sameCategoryProducts = products.filter(product => 
      uniqueCategories.includes(product.category) && 
      !cartProductIds.includes(product.id) &&
      product.inStock
    );
    
    // If we have products from same categories, prioritize them
    if (sameCategoryProducts.length >= 4) {
      // Sort by rating and featured status
      return sameCategoryProducts
        .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating)
        .slice(0, 4);
    }
    
    // Otherwise, mix same category products with featured products
    const featuredNotInCart = featuredProducts.filter(product => 
      !cartProductIds.includes(product.id)
    );
    
    const recommendations = [...sameCategoryProducts, ...featuredNotInCart]
      .filter((product, index, arr) => 
        arr.findIndex(p => p.id === product.id) === index 
      )
      .slice(0, 4);
    
    return recommendations;
  }, [state.items]);

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50">
        
        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/products" className="md:hidden mr-4">
                  <Button variant="ghost" size="sm" className="hover:bg-white hover:shadow-sm">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                    Shopping Cart
                  </h1>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-gray-600">
                      {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'}
                    </p>
                    {savings > 0 && (
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        You're saving ${savings.toFixed(2)}!
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {state.items.length > 0 && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 border-gray-200"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Save for Later</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Clear</span>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {state.items.length === 0 ? (
            // Enhanced Empty Cart State
            <div className="text-center py-16 md:py-24">
              <Card className="max-w-md mx-auto border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <ShoppingBag className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Your cart is empty
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Discover amazing products and start building your perfect collection.
                  </p>
                  <div className="space-y-3">
                    <Link href="/products">
                      <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                        Start Shopping
                      </Button>
                    </Link>
                    <Link href="/categories">
                      <Button variant="outline" size="lg" className="w-full">
                        Browse Categories
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Enhanced Cart with Items
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {/* Free Shipping Banner */}
                {subtotal < 500 && (
                  <Card className="border-0 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="text-sm font-medium text-blue-900">
                            Add ${(500 - subtotal).toFixed(2)} more for FREE shipping!
                          </span>
                        </div>
                        <div className="w-24 bg-blue-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((subtotal / 500) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {state.items.map((item) => (
                  <Card 
                    key={item.id} 
                    className={`border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white group ${
                      removingItems.has(item.id) ? 'opacity-50 scale-95' : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Compact Product Image */}
                        <div className="relative flex-shrink-0">
                          <div className="w-20 h-20 relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="80px"
                            />
                          </div>
                          {/* Compact Badge */}
                          {item.product.inStock && (
                            <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full text-[10px] font-medium">
                              ✓
                            </div>
                          )}
                        </div>

                        {/* Compact Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 min-w-0 mr-3">
                              <Link 
                                href={`/products/${item.product.id}`}
                                className="hover:text-blue-600 transition-colors"
                              >
                                <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                  {item.product.name}
                                </h3>
                              </Link>
                              
                              {/* Compact attributes */}
                              <div className="flex flex-wrap gap-1 mt-1">
                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs capitalize">
                                  {item.product.category.replace('-', ' ')}
                                </span>
                                {item.selectedSize && (
                                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                                    {item.selectedSize}
                                  </span>
                                )}
                                {item.selectedColor && (
                                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">
                                    {item.selectedColor}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Price */}
                            <div className="text-right flex-shrink-0">
                              <div className="text-lg font-bold text-gray-900">
                                {formatPrice(item.product.price, adminState.settings?.currency || 'USD')}
                              </div>
                              {item.product.originalPrice && (
                                <div className="text-xs text-gray-500 line-through">
                                  {formatPrice(item.product.originalPrice, adminState.settings?.currency || 'USD')}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Compact Controls Row */}
                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center bg-gray-50 rounded-md border">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0 hover:bg-white rounded-l-md"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-10 h-8 flex items-center justify-center text-sm font-medium bg-transparent">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0 hover:bg-white rounded-r-md"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-1">
                              {/* Wishlist Button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => handleCartItemWishlist(item, e)}
                                className={`h-8 w-8 p-0 rounded-md transition-all duration-200 ${
                                  isInWishlist(item.product.id)
                                    ? 'text-red-500 bg-red-50 hover:bg-red-100'
                                    : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                                }`}
                                title={isInWishlist(item.product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                              >
                                <Heart className={`h-3 w-3 ${
                                  isInWishlist(item.product.id) ? 'fill-current' : ''
                                }`} />
                              </Button>

                              {/* Share Button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => handleCartItemShare(item, e)}
                                className="h-8 w-8 p-0 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                                title="Share product"
                              >
                                <Share2 className="h-3 w-3" />
                              </Button>

                              {/* Remove Button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveItem(item.id)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                                title="Remove from cart"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Compact Total for this item */}
                          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                            <span className="text-xs text-gray-500 flex items-center">
                              <Shield className="h-3 w-3 mr-1" />
                              30-day returns
                            </span>
                            <span className="text-sm font-semibold text-gray-900">
                              Subtotal: {formatPrice(item.product.price * item.quantity, adminState.settings?.currency || 'USD')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Enhanced Recommendations Section */}
                <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          You might also like
                        </h3>
                        <p className="text-sm text-gray-600">
                          Curated picks based on your cart items
                        </p>
                      </div>
                      <Link 
                        href="/products" 
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                      >
                        View all →
                      </Link>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {recommendedProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow group">
                          <Link href={`/products/${product.id}`} className="block">
                            <div className="relative aspect-square overflow-hidden rounded-md mb-3 bg-gray-100">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 1024px) 50vw, 25vw"
                              />
                              
                              {/* Badges */}
                              <div className="absolute top-2 left-2 flex flex-col gap-1">
                                {product.discount && (
                                  <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                    -{product.discount}%
                                  </div>
                                )}
                                {product.isNewArrival && (
                                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                    New
                                  </div>
                                )}
                              </div>
                              
                              {/* Action buttons overlay */}
                              <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                {/* Wishlist Button */}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => handleWishlistToggle(product, e)}
                                  disabled={togglingWishlist.has(product.id)}
                                  className={`p-2 h-8 w-8 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
                                    isInWishlist(product.id) 
                                      ? 'text-red-500 bg-red-50' 
                                      : 'text-gray-600 hover:text-red-500'
                                  } ${
                                    togglingWishlist.has(product.id) ? 'scale-110' : 'hover:scale-110'
                                  }`}
                                >
                                  <Heart className={`h-4 w-4 transition-all duration-200 ${
                                    isInWishlist(product.id) ? 'fill-current text-red-500' : ''
                                  } ${
                                    togglingWishlist.has(product.id) ? 'animate-pulse' : ''
                                  }`} />
                                </Button>
                                
                                {/* Share Button */}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => handleShare(product, e)}
                                  className="p-2 h-8 w-8 bg-white/90 hover:bg-white text-gray-600 hover:text-blue-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                                >
                                  <Share2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </Link>
                          
                          <div className="space-y-2">
                            <Link href={`/products/${product.id}`}>
                              <h4 className="font-medium text-sm text-gray-900 line-clamp-2 leading-tight hover:text-blue-600 transition-colors">
                                {product.name}
                              </h4>
                            </Link>
                            
                            <div className="flex items-center gap-1">
                              <div className="flex items-center text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-200'}`} viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">({product.reviews})</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-900">
                                {formatPrice(product.price, adminState.settings?.currency || 'USD')}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-gray-500 line-through">
                                  {formatPrice(product.originalPrice, adminState.settings?.currency || 'USD')}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                className={`flex-1 text-xs font-medium transition-all duration-200 ${
                                  addingToCart.has(product.id)
                                    ? 'bg-green-600 hover:bg-green-700 text-white'
                                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                                }`}
                                disabled={addingToCart.has(product.id) || !product.inStock}
                                onClick={(e) => handleQuickAdd(product, e)}
                              >
                                <ShoppingCart className="h-3 w-3 mr-1" />
                                {addingToCart.has(product.id) ? 'Added!' : 'Quick Add'}
                              </Button>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => handleWishlistToggle(product, e)}
                                disabled={togglingWishlist.has(product.id)}
                                className={`p-2 transition-all duration-200 ${
                                  isInWishlist(product.id) 
                                    ? 'border-red-200 text-red-600 hover:bg-red-50 bg-red-50/50' 
                                    : 'border-gray-200 hover:border-red-200 hover:text-red-600'
                                }`}
                              >
                                <Heart className={`h-3 w-3 transition-all duration-200 ${
                                  isInWishlist(product.id) ? 'fill-current text-red-500' : ''
                                } ${
                                  togglingWishlist.has(product.id) ? 'animate-pulse' : ''
                                }`} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Additional CTA */}
                    <div className="mt-6 text-center">
                      <Link href="/products">
                        <Button 
                          variant="outline" 
                          className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                        >
                          Explore More Products
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Order Summary */}
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-xl sticky top-24 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">
                        Order Summary
                      </h3>
                      <Gift className="h-5 w-5 text-purple-600" />
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal ({state.itemCount} items)</span>
                        <span className="font-semibold">{formatPrice(subtotal, adminState.settings?.currency || 'USD')}</span>
                      </div>
                      
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount ({appliedPromo})</span>
                          <span>-{formatPrice(discount, adminState.settings?.currency || 'USD')}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <span className="text-gray-600">Shipping</span>
                          <Truck className="h-4 w-4 ml-1 text-gray-400" />
                        </div>
                        <span className="font-semibold">
                          {shipping === 0 ? (
                            <span className="text-green-600">Free</span>
                          ) : (
                            `${formatPrice(shipping, adminState.settings?.currency || 'USD')}`
                          )}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-semibold">{formatPrice(tax, adminState.settings?.currency || 'USD')}</span>
                      </div>

                      {shipping === 0 && (
                        <div className="text-sm text-green-700 bg-green-100 p-3 rounded-lg flex items-center">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Free shipping activated!
                        </div>
                      )}
                    </div>

                    <Separator className="my-6" />

                    <div className="flex justify-between text-xl font-bold mb-6 p-3 bg-gray-50 rounded-lg">
                      <span>Total</span>
                      <span className="text-blue-600">{formatPrice(total, adminState.settings?.currency || 'USD')}</span>
                    </div>

                    {/* Enhanced Promo Code Section */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Gift className="h-4 w-4 mr-2 text-purple-600" />
                        Promo Code
                      </h4>
                      
                      {appliedPromo ? (
                        <div className="flex items-center justify-between bg-green-100 p-3 rounded-lg">
                          <div className="flex items-center">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                            <span className="text-green-800 font-medium">{appliedPromo}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={removePromoCode}
                            className="text-green-700 hover:text-green-800 p-1"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-1 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                          />
                          <Button 
                            variant="outline" 
                            onClick={applyPromoCode}
                            className="border-purple-200 text-purple-700 hover:bg-purple-50"
                          >
                            Apply
                          </Button>
                        </div>
                      )}
                      
                      <div className="mt-2 text-xs text-gray-500">
                        Try: SAVE10, WELCOME20, or FREESHIP
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Link href="/checkout">
                        <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg text-white font-semibold">
                          Proceed to Checkout
                        </Button>
                      </Link>
                      
                      <Link href="/products">
                        <Button variant="outline" size="lg" className="w-full border-gray-200 hover:bg-gray-50">
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="flex flex-col items-center">
                          <Shield className="h-6 w-6 text-green-600 mb-1" />
                          <span className="text-xs text-gray-600">Secure Payment</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Truck className="h-6 w-6 text-blue-600 mb-1" />
                          <span className="text-xs text-gray-600">Fast Delivery</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}