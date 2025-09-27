'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import HeroSlider from '@/components/ui/hero-slider';
import ProductGrid from '@/components/product/ProductGrid';
import NewArrivals from '@/components/product/NewArrivals';
import MobileLayout from '@/components/layout/MobileLayout';
import PopupAd from '@/components/ui/PopupAd';
import { featuredProducts, discountedProducts, newArrivalProducts, categories, heroSlides } from '@/data/products';
import AdBanner from '@/components/ui/AdBanner';

export default function Home() {
  return (
    <MobileLayout>
      <div className="min-h-screen bg-gray-50">
        <PopupAd />

        {/* Hero Slider */}
        <HeroSlider slides={heroSlides} />

        {/* Categories Section */}
        <section className="py-6 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-left mb-6 animate-fadeInUp">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Shop by Category
              </h2>
             
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.slice(1).map((category, index) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="group animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 p-0 rounded-xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative aspect-square overflow-hidden">
                        {category.image ? (
                          <img 
                            src={category.image} 
                            alt={category.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <span className="text-3xl font-bold text-gray-400 group-hover:text-gray-600">
                              {category.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 text-center bg-white">
                        <h3 className="font-semibold text-sm mb-1 group-hover:text-gray-900 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {category.count} items
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-12 bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50">
          <div className="container mx-auto px-4">
            
            <NewArrivals products={newArrivalProducts} />
          </div>
        </section>
        
        {/* Ad Banner */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <AdBanner />
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-left mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600">
                Our most popular items loved by customers
              </p>
            </div>
            <ProductGrid products={featuredProducts.slice(0, 8)} />
          </div>
        </section>

        {/* Special Offers */}
        <section className="py-12 bg-gradient-to-r from-amber-50 via-orange-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="text-left mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Special Deals & Discounts
              </h2>
              <p className="text-gray-600">
                Limited time offers you don't want to miss
              </p>
            </div>
            <ProductGrid products={discountedProducts.slice(0, 4)} />
          </div>
        </section>
      </div>
    </MobileLayout>
  );
}