'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Shield, 
  Play,
  ThumbsUp,
  Verified,
  ChevronLeft,
  ChevronRight,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Plus,
  Minus,
  Loader
} from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { products, Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAdmin } from '@/contexts/AdminContext';
import { formatPrice } from '@/lib/currency';
import Link from 'next/link';



interface VideoPlayerProps {
  src: string;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const updateDuration = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    video.currentTime = newTime;
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isFullscreen) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full h-0 pb-[56.25%] bg-black rounded-lg overflow-hidden group">
      <video
        ref={videoRef}
        src={src}
        className="absolute top-0 left-0 w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      {/* Close button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 h-8 w-8 p-0 bg-black/50 text-white hover:bg-black/70"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Video controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Progress bar */}
        <div 
          className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-white rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <span className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-white hover:bg-white/20"
            onClick={toggleFullscreen}
          >
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { state: adminState } = useAdmin();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const productId = params.id as string;
    const foundProduct = products.find(p => p.id === productId);
    setProduct(foundProduct || null);
    setLoading(false);
  }, [params.id]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [showVideo, setShowVideo] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [addedToCart, setAddedToCart] = useState(false);

  const imageRef = useRef<HTMLDivElement>(null);
  
  // Get wishlist status from context
  const isWishlisted = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || '');
      setSelectedSize(product.sizes?.[0] || '');
    }
  }, [product]);

  const discountPercentage = product?.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity, selectedSize, selectedColor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = () => {
    if (!product) return;
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const nextImage = () => {
    if (!product) return;
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const previousImage = () => {
    if (!product) return;
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleImageZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) {
      setIsZoomed(true);
      setZoomScale(2);
      
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPosition({ x: x - 50, y: y - 50 });
    }
  };

  const handleZoomOut = () => {
    setIsZoomed(false);
    setZoomScale(1);
    setZoomPosition({ x: 0, y: 0 });
    setRotation(0);
  };

  const handleZoomIn = () => {
    setZoomScale(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomDecrease = () => {
    setZoomScale(prev => {
      const newScale = Math.max(prev - 0.5, 1);
      if (newScale === 1) {
        setIsZoomed(false);
        setZoomPosition({ x: 0, y: 0 });
        setRotation(0);
      }
      return newScale;
    });
  };

  const handleRotate = () => {
    setRotation(prev => prev + 90);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isZoomed && zoomScale > 1) {
      setIsDragging(true);
      setDragStart({ 
        x: e.clientX - zoomPosition.x, 
        y: e.clientY - zoomPosition.y 
      });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && isZoomed) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Constrain movement within reasonable bounds
      const constrainedX = Math.max(-100, Math.min(100, newX));
      const constrainedY = Math.max(-100, Math.min(100, newY));
      
      setZoomPosition({ x: constrainedX, y: constrainedY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isZoomed && e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({ 
        x: touch.clientX - zoomPosition.x, 
        y: touch.clientY - zoomPosition.y 
      });
      e.preventDefault();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && isZoomed && e.touches.length === 1) {
      const touch = e.touches[0];
      const newX = touch.clientX - dragStart.x;
      const newY = touch.clientY - dragStart.y;
      
      const constrainedX = Math.max(-100, Math.min(100, newX));
      const constrainedY = Math.max(-100, Math.min(100, newY));
      
      setZoomPosition({ x: constrainedX, y: constrainedY });
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 transition-all duration-200 ${
          i < Math.floor(rating)
            ? 'fill-amber-400 text-amber-400'
            : i < rating
            ? 'fill-amber-400/50 text-amber-400'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <MobileLayout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader className="h-8 w-8 animate-spin mx-auto border-black" />
            <p className="text-muted-foreground">Loading product details...</p>
          </div>
        </div>
      </MobileLayout>
    );
  }

  if (!product) {
    return (
      <MobileLayout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">Product Not Found</h1>
            <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-white dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
     

      <div className="container mx-auto px-2 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4 animate-fade-in">
            {/* Main Image/Video */}
            <div className="relative h-96 lg:h-[500px] bg-transparent rounded-lg overflow-hidden shadow-none group border border-white/20 backdrop-blur-sm">
              {showVideo && product.videos && product.videos.length > 0 ? (
                <VideoPlayer
                  src={product.videos[0]}
                  onClose={() => setShowVideo(false)}
                />
              ) : (
                <>
                  <div
                    ref={imageRef}
                    className={`relative w-full h-full transition-all duration-300 ${
                      isZoomed ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
                    } overflow-hidden select-none`}
                    onClick={!isZoomed ? handleImageZoom : undefined}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={product.images[selectedImage]}
                        alt={product.name}
                        fill
                        className="object-contain transition-all duration-500 ease-out select-none"
                        style={{
                          transform: `scale(${zoomScale}) rotate(${rotation}deg) translate(${zoomPosition.x}px, ${zoomPosition.y}px)`,
                          transformOrigin: 'center center'
                        }}
                        draggable={false}
                      />
                    </div>
                                        
                    {/* Zoom indicator */}
                    {isZoomed && (
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium animate-fadeInUp">
                        {Math.round(zoomScale * 100)}%
                      </div>
                    )}
                  </div>

                  {/* Zoom Controls */}
                  {isZoomed && (
                    <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl p-3 flex flex-col gap-2 shadow-none
                     border border-white/20 animate-slideDown">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-primary/10 hover:scale-110 transition-all duration-200"
                        onClick={handleZoomIn}
                        disabled={zoomScale >= 3}
                        title="Zoom In"
                      >
                        <ZoomIn className="h-4 w-4 border-black" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-primary/10 hover:scale-110 transition-all duration-200"
                        onClick={handleZoomDecrease}
                        disabled={zoomScale <= 1}
                        title="Zoom Out"
                      >
                        <ZoomOut className="h-4 w-4 border-black" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-primary/10 hover:scale-110 transition-all duration-200"
                        onClick={handleRotate}
                        title="Rotate"
                      >
                        <RotateCw className="h-4 w-4 border-black" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:scale-110 transition-all duration-200"
                        onClick={handleZoomOut}
                        title="Reset"
                      >
                        <X className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  )}

                  {/* Navigation Arrows */}
                  {product.images.length > 1 && !isZoomed && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={previousImage}
                        className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 h-10 w-10 lg:h-12 lg:w-12 p-0 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 hover:scale-110 transition-all duration-300 shadow-none border border-white/20 backdrop-blur-sm rounded-full"
                        title="Previous Image"
                      >
                        <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6 border-black" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={nextImage}
                        className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 h-10 w-10 lg:h-12 lg:w-12 p-0 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 hover:scale-110 transition-all duration-300 shadow-none border border-white/20 backdrop-blur-sm rounded-full"
                        title="Next Image"
                      >
                        <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6 border-black" />
                      </Button>
                    </>
                  )}

                  {/* Video Play Button */}
                  {product.videos && product.videos.length > 0 && !showVideo && !isZoomed && (
                    <Button
                      variant="ghost"
                      onClick={() => setShowVideo(true)}
                      className="absolute bottom-4 right-4 h-14 w-14 p-0 bg-black hover:bg-black/90 border-black-foreground rounded-full hover:scale-110 transition-all duration-300 shadow-2xl border-2 border-white/20 animate-pulse"
                    >
                      <Play className="h-7 w-7 ml-1" />
                    </Button>
                  )}
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((image, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => {
                    setSelectedImage(index);
                    setShowVideo(false);
                    handleZoomOut();
                  }}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 p-0 rounded-xl overflow-hidden border-2 hover:scale-110 transition-all duration-300 shadow-lg ${
                    selectedImage === index && !showVideo
                      ? 'border-black shadow-none ring-2 ring-primary/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-black/50'
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 80px"
                    />
                  </div>
                </Button>
              ))}
              {/* Video Thumbnail */}
              {product.videos && product.videos.length > 0 && (
                <Button
                  variant="ghost"
                  onClick={() => setShowVideo(true)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 p-0 rounded-xl overflow-hidden border-2 relative hover:scale-110 transition-all duration-300 shadow-lg ${
                    showVideo ? 'border-black shadow-none ring-2 ring-primary/20' : 'border-gray-200 dark:border-gray-700 hover:border-black/50'
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={product.images[0]}
                      alt="Video thumbnail"
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 80px"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <Play className="h-4 w-4 sm:h-5 sm:w-5 text-white drop-shadow-lg" />
                  </div>
                </Button>
              )}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6 animate-fadeInUp order-2 lg:order-2" style={{ animationDelay: '0.2s' }}>
            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              {product.isNewArrival && (
                <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg animate-bounce-in border-0">
                  ✨ New Arrival
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg animate-bounce-in border-0" style={{ animationDelay: '0.1s' }}>
                  -{discountPercentage}% OFF
                </Badge>
              )}
              {product.featured && (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg animate-bounce-in border-0" style={{ animationDelay: '0.2s' }}>
                  Featured
                </Badge>
              )}
            </div>

            {/* Title and Rating */}
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text animate-fadeInUp">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 animate-slideIn">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                  <span className="ml-2 text-sm text-muted-foreground font-medium">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 animate-slideIn" style={{ animationDelay: '0.1s' }}>
              <span className="text-4xl font-bold bg-black bg-clip-text text-transparent">
                ৳{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through opacity-75">
                  ৳{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-sm font-semibold text-foreground">Color: <span className="text-black">{selectedColor}</span></h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {product.colors.map((color, index) => (
                    <Button
                      key={color}
                      variant="outline"
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium transition-all duration-300 hover:scale-105 border-2 rounded-xl ${
                        selectedColor === color
                          ? 'border-black bg-black text-white'
                          : 'border-slate-300'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-sm font-semibold text-foreground">Size: <span className="text-black">{selectedSize}</span></h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {product.sizes.map((size, index) => (
                    <Button
                      key={size}
                      variant="outline"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium transition-all duration-300 hover:scale-105 border-2 rounded-xl ${
                        selectedSize === size
                          ? 'border-black bg-black text-white shadow-lg ring-2 ring-black/20'
                          : 'border-gray-200 '
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-sm font-semibold text-foreground">Quantity</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-12 w-12 p-0 hover:bg-primary/10 transition-all duration-200 border-black  dark:border-gray-700 rounded-none shadow-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-6 py-3 min-w-[80px] text-center font-semibold text-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-12 w-12 p-0 hover:bg-primary/10 transition-all duration-200  border-l border-gray-200 dark:border-gray-700 rounded-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Badge 
                  variant={product.inStock ? "default" : "destructive"} 
                  className={`text-sm px-4 py-2 font-medium shadow-lg ${
                    product.inStock 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 animate-pulse border-0' 
                      : 'bg-gradient-to-r from-red-500 to-pink-600 border-0'
                  }`}
                >
                  {product.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <Button
                size="lg"
                className={`w-full text-lg font-semibold transition-all duration-300 shadow-none h-14 rounded-xl ${
                  addedToCart 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' 
                    : 'bg-black hover:shadow-xl hover:bg-transparent hover:text-black hover:border-1'
                } border-0 text-white`}
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-6 w-6 mr-3" />
                {addedToCart ? '✓ Added to Cart!' : `Add to Cart - ${formatPrice(product.price * quantity, adminState.settings?.currency || 'BDT')}`}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className={`w-full transition-all duration-300 hover:scale-[1.02] h-14 rounded-xl border-2 font-semibold ${
                  isWishlisted 
                    ? 'border-red-400 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 bg-red-50/50 dark:bg-red-950/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-black hover:bg-primary/5'
                }`}
                onClick={handleWishlist}
              >
                <Heart className={`h-6 w-6 mr-3 transition-all duration-200 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>

          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="bg-white shadow-none border-none dark:bg-gray-800/70 backdrop-blur-xl animate-fadeInUp " style={{ animationDelay: '0.3s' }}>
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white overflow-x-auto scrollbar-hide">
            {[
              { key: 'description', label: 'Description', shortLabel: 'Desc' },
              { key: 'specifications', label: 'Specifications', shortLabel: 'Specs' },
              { key: 'reviews', label: `Reviews (${product.reviews})`, shortLabel: `Reviews (${product.reviews})` }
            ].map(({ key, label, shortLabel }) => (
              <Button
                key={key}
                variant="ghost"
                onClick={() => setActiveTab(key as any)}
                className={`flex-shrink-0 px-3 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-xs sm:text-sm font-semibold rounded-none transition-all duration-300 min-w-fit ${
                  activeTab === key
                    ? 'border-b-2 sm:border-b-3 border-black bg-white shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:scale-105'
                }`}
              >
                <span className="block sm:hidden">{shortLabel}</span>
                <span className="hidden sm:block">{label}</span>
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          <CardContent className="p-4 sm:p-6 md:p-8 shadow-none border-none">
            {activeTab === 'description' && (
              <div className="space-y-4 sm:space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-foreground">Description</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{product.description}</p>
                </div>
                
                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-foreground">Key Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li 
                          key={index} 
                          className="flex items-start gap-2 animate-slide-up"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <span className="text-success mt-1 font-bold text-sm sm:text-base">✓</span>
                          <span className="text-sm sm:text-base text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.dimensions && (
                  <div className="animate-fade-in">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-foreground">Dimensions</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {product.dimensions.length}" L × {product.dimensions.width}" W × {product.dimensions.height}" H
                      {product.weight && ` • Weight: ${product.weight}`}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="animate-fade-in">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-foreground">Product Specifications</h3>
                {product.specifications ? (
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div 
                        key={key} 
                        className="flex flex-col sm:flex-row sm:justify-between py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 animate-slideIn group"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <span className="font-semibold text-foreground group-hover:border-black transition-colors text-sm sm:text-base mb-1 sm:mb-0">{key}:</span>
                        <span className="text-muted-foreground font-medium text-sm sm:text-base">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                    </div>
                    <p className="text-muted-foreground text-base sm:text-lg">No specifications available.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4 sm:space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-foreground">Customer Reviews</h3>
                  
                  {/* Rating Summary */}
                  <Card className="bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-950 border border-black/20 mb-6 sm:mb-8 shadow-none border-none">
                    <CardContent className=" shadow-none border-none p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                        <div className="text-center">
                          <div className="text-3xl sm:text-4xl font-bold border-black animate-bounce-in mb-2">{product.rating}</div>
                          <div className="flex justify-center mb-2">
                            {renderStars(product.rating)}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground font-medium">{product.reviews} reviews</div>
                        </div>
                        <div className="flex-1">
                          <div className="space-y-2 sm:space-y-3">
                            {[5, 4, 3, 2, 1].map((rating, index) => (
                              <div key={rating} className="flex items-center gap-2 sm:gap-3">
                                <span className="text-xs sm:text-sm w-3 font-medium">{rating}</span>
                                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-amber-400 fill-current" />
                                <div className="flex-1 h-2 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full transition-all duration-1000 animate-slideIn"
                                    style={{ 
                                      width: `${Math.random() * 80 + 10}%`,
                                      animationDelay: `${index * 0.2}s`
                                    }}
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground w-6 sm:w-8">{Math.floor(Math.random() * 50 + 10)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Reviews List */}
                      {product.reviewsList && product.reviewsList.length > 0 ? (
                        <div className="space-y-4 sm:space-y-6">
                          {product.reviewsList.map((review, index) => (
                            <Card 
                              key={review.id} 
                              className="border border-gray-200 dark:border-gray-700 shadow-none border-none hover:shadow-none transition-all duration-300 animate-slideIn bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:scale-[1.02]"
                              style={{ animationDelay: `${index * 0.15}s` }}
                            >
                              <CardContent className="shadow-none border-none p-4 sm:p-6">
                                <div className="flex items-start justify-between mb-3 sm:mb-4">
                                  <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                                      {review.user.name.charAt(0)}
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2 sm:gap-3 mb-1">
                                        <span className="font-semibold text-foreground text-sm sm:text-lg">{review.user.name}</span>
                                        {review.user.verified && (
                                          <Verified className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                                        )}
                                      </div>
                                      <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="flex">{renderStars(review.rating)}</div>
                                        <span className="text-xs sm:text-sm text-muted-foreground">{review.date}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <h4 className="font-semibold mb-2 sm:mb-3 text-foreground text-sm sm:text-lg">{review.title}</h4>
                                <p className="text-muted-foreground mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{review.comment}</p>
                                
                                <div className="flex items-center gap-4 text-xs sm:text-sm">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="text-muted-foreground hover:border-black p-0 h-auto font-normal hover:bg-primary/5 px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all duration-200"
                                  >
                                    <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                    Helpful ({review.helpful})
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 sm:py-12">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                          </div>
                          <p className="text-muted-foreground text-sm sm:text-lg">No reviews yet. Be the first to review this product!</p>
                        </div>
                      )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommended Products Section */}
        <div className="mt-16 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground flex items-center">
            <span className="bg-black from-primary  bg-clip-text text-transparent">
              Recommended For You
            </span>
            <span className="h-px flex-1 bg-black to-transparent ml-4"></span>
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((item) => (
                <Card key={item.id} className="group h-full shadow-none border-none transition-all duration-300 border-0 p-0">
                  <div className="relative h-full flex flex-col">
                    {/* Product Image */}
                    <Link href={`/products/${item.id}`} className="block">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </div>
                    </Link>

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {item.isNewArrival && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xs font-semibold">
                          ✨ New
                        </Badge>
                      )}
                      {item.discount && (
                        <Badge variant="destructive" className="text-xs">
                          -{item.discount}%
                        </Badge>
                      )}
                      {item.featured && (
                        <Badge className="bg-yellow-500 hover:bg-yellow-600 text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-3 flex-1 flex flex-col">
                      <Link 
                        href={`/products/${item.id}`}
                        className="block hover:text-gray-600 transition-colors flex-1"
                      >
                        <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      
                      {/* Price */}
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base">৳{item.price.toFixed(2)}</span>
                          {item.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">
                              ৳{item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-3 space-y-2">
                        <Button 
                          size="sm" 
                          className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                          disabled={!item.inStock}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addItem(item, 1);
                          }}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (isInWishlist(item.id)) {
                              removeFromWishlist(item.id);
                            } else {
                              addToWishlist(item);
                            }
                          }}
                          className={`w-full transition-all duration-200 ${
                            isInWishlist(item.id) 
                              ? 'border-red-200 text-red-600 hover:bg-red-50 bg-red-50/50' 
                              : 'border-gray-200 hover:border-red-200 hover:text-red-600'
                          }`}
                        >
                          <Heart className={`h-4 w-4 mr-2 transition-all duration-200 ${
                            isInWishlist(item.id) ? 'fill-current text-red-500' : ''
                          }`} />
                          {isInWishlist(item.id) ? 'Saved' : 'Save'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
    </MobileLayout>
  );
}