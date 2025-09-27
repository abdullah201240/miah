'use client';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { Product } from '@/data/products';

interface NewArrivalsProps {
  products: Product[];
  title?: string;
  showViewAll?: boolean;
}

export default function NewArrivals({ 
  products, 
  title = "New Arrivals", 
  showViewAll = true 
}: NewArrivalsProps) {
  
  // Show only recent arrivals (first 8)
  const displayProducts = products.slice(0, 8);
  
  if (displayProducts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No new arrivals yet.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fadeInUp">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h2>
          <p className="text-gray-600 mt-2">
            Discover our latest fashion pieces
          </p>
        </div>
        
        {showViewAll && (
          <Link 
            href="/products?category=all&sort=newest"
            className="mt-4 md:mt-0 text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
          >
            View All New Arrivals →
          </Link>
        )}
      </div>

      {/* Products Grid with Staggered Animation */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {displayProducts.map((product, index) => (
          <div
            key={product.id}
            className="group animate-fadeInUp"
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            <div className="relative">
              {/* Enhanced Product Card */}
              <div className="relative overflow-hidden rounded-lg shadow-none transition-all duration-300">
                <ProductCard product={product} />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}