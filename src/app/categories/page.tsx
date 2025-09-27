'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';
import { categories } from '@/data/products';
import { ArrowRight } from 'lucide-react';

export default function CategoriesPage() {
  // Filter out the 'all' category for display
  const displayCategories = categories.filter(cat => cat.id !== 'all');

  return (
    <MobileLayout >
      <div className="min-h-screen bg-gray-50 py-2 md:py-4">
        <div className="container mx-auto px-3">
          {/* Categories Grid */}
          <div className="space-y-4 md:space-y-6">
            {displayCategories.map((category, index) => (
              <div 
                key={category.id} 
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                      {category.name}
                    </h2>
                    <p className="text-sm md:text-base text-gray-600">{category.description}</p>
                  </div>
                  <Link href={`/categories/${category.id}`}>
                    <Button variant="outline" size="sm" className="hidden md:flex">
                      View All
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>

                {/* Main Category Card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-4">
                  <Link 
                    href={`/categories/${category.id}`}
                    className="lg:col-span-2"
                  >
                    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                      <div className="relative h-40 md:h-48 overflow-hidden">
                        {category.image && (
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw"
                            priority
                          />
                        )}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white px-4">
                            <h3 className="text-xl md:text-2xl font-bold mb-1">
                              {category.name}
                            </h3>
                            <p className="text-sm md:text-base opacity-90 mb-2">
                              {category.count} items available
                            </p>
                            <Button 
                              size="sm"
                              variant="secondary" 
                              className="bg-white/90 text-gray-900 hover:bg-white text-sm"
                            >
                              Explore Collection
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>

                  {/* Category Stats */}
                  <div className="space-y-2">
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-3 text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {category.count}
                        </div>
                        <div className="text-sm text-gray-600">Total Items</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-3 text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {category.subcategories?.length || 0}
                        </div>
                        <div className="text-sm text-gray-600">Subcategories</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Subcategories */}
                {category.subcategories && category.subcategories.length > 0 && (
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">
                      Browse by Type
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          href={`/categories/${category.id}?subcategory=${subcategory.id}`}
                        >
                          <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                            <div className="relative h-24 md:h-28 overflow-hidden">
                              {subcategory.image && (
                                <Image
                                  src={subcategory.image}
                                  alt={subcategory.name}
                                  fill
                                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />
                              )}
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>
                            <CardContent className="p-2">
                              <h4 className="font-medium text-gray-900 text-sm group-hover:text-gray-600 transition-colors line-clamp-1">
                                {subcategory.name}
                              </h4>
                              <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                                {subcategory.count} items
                              </p>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Mobile View All Button */}
                <div className="md:hidden mt-3">
                  <Link href={`/categories/${category.id}`}>
                    <Button size="sm" className="w-full">
                      View All {category.name}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Browse All Products CTA */}
          <div className="text-center mt-6 md:mt-8">
            <Card className="border-0 shadow-sm bg-gray-900 text-white">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold mb-2">
                  Can't Find What You're Looking For?
                </h2>
                <p className="text-gray-300 mb-4 text-sm max-w-xl mx-auto">
                  Browse our complete collection of furniture and home decor items
                </p>
                <Link href="/products">
                  <Button variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                    Browse All Products
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}