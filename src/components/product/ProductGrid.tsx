'use client';

import ProductCard from './ProductCard';
import { Product } from '@/data/products';

interface ProductGridProps {
  products: Product[];
  title?: string;
  className?: string;
  startIndex?: number; // For proper animation delays in paginated content
}

export default function ProductGrid({ products, title, className = '', startIndex = 0 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={`py-12 text-center ${className}`}>
        <p className="text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {title && (
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="animate-fadeInUp"
            style={{
              animationDelay: `${(startIndex + index) * 0.1}s`,
              animationFillMode: 'both'
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}