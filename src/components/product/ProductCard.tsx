'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { formatPrice } from '@/lib/currency';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  
  const isWishlisted = isInWishlist(product.id);
  
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToWishlist(true);
    
    try {
      if (isWishlisted) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    } finally {
      setTimeout(() => setIsAddingToWishlist(false), 300);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick view functionality would go here
    console.log('Quick view for product:', product.id);
  };

  return (
    <Card className="group h-full hover:shadow-lg transition-all duration-300 border-0 p-0">
      <div className="relative h-full flex flex-col">
        {/* Product Image */}
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority
            />
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNewArrival && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xs font-semibold">
              ✨ New
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge variant="destructive" className="text-xs">
              -{discountPercentage}%
            </Badge>
          )}
          {product.featured && (
            <Badge className="bg-yellow-500 hover:bg-yellow-600 text-xs">
              Featured
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleWishlistToggle}
            disabled={isAddingToWishlist}
            className={`p-2 h-8 w-8 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl ${
              isWishlisted 
                ? 'text-red-500 bg-red-50' 
                : 'text-gray-600 hover:text-red-500'
            } ${
              isAddingToWishlist ? 'scale-110' : 'hover:scale-110'
            }`}
          >
            <Heart className={`h-4 w-4 transition-all duration-200 ${
              isWishlisted ? 'fill-current text-red-500' : ''
            } ${
              isAddingToWishlist ? 'animate-pulse' : ''
            }`} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleQuickView}
            className="p-2 h-8 w-8 bg-white/90 hover:bg-white text-gray-600 hover:text-blue-500 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Product Info */}
        <div className="p-3 flex-1 flex flex-col">
          <Link 
            href={`/products/${product.id}`}
            className="block hover:text-gray-600 transition-colors flex-1"
          >
            <h3 className="font-semibold text-sm mb-1 line-clamp-2">
              {product.name}
            </h3>
          </Link>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {product.rating} ({product.reviews})
            </span>
          </div>
          
          {/* Price */}
          <div className="mt-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base">{formatPrice(product.price, 'BDT')}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through">
                  {formatPrice(product.originalPrice, 'BDT')}
                </span>
              )}
            </div>
          </div>

          {/* Color and Size Options (if available) */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-2">
              <div className="flex flex-wrap gap-1">
                {product.colors.slice(0, 3).map((color) => (
                  <span
                    key={color}
                    className="inline-block h-3 w-3 rounded-full border border-gray-300"
                    style={{
                      backgroundColor: color.toLowerCase(),
                    }}
                    title={color}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{product.colors.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Quick Action Buttons */}
          <div className="mt-3 space-y-2">
            <Button 
              size="sm" 
              className="w-full bg-gray-900 hover:bg-gray-800 text-white"
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleWishlistToggle}
              disabled={isAddingToWishlist}
              className={`w-full transition-all duration-200 ${
                isWishlisted 
                  ? 'border-red-200 text-red-600 hover:bg-red-50 bg-red-50/50' 
                  : 'border-gray-200 hover:border-red-200 hover:text-red-600'
              }`}
            >
              <Heart className={`h-4 w-4 mr-2 transition-all duration-200 ${
                isWishlisted ? 'fill-current text-red-500' : ''
              }`} />
              {isWishlisted ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}