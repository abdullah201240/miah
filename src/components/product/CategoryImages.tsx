'use client';

import React from 'react';
import Link from 'next/link';

const CategoryImages = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Women's Salwar Kameez Category */}
          <Link href="/categories/women" className="group block overflow-hidden rounded-sm shadow-none hover:shadow-none transition-all duration-300">
            <div className="relative h-64 md:h-80 w-full">
              <img 
                src="/salwarkamiz_desktop.jpg" 
                alt="Women's Salwar Kameez Collection" 
                className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl md:text-2xl font-bold">Women's Salwar Kameez</h3>
                <p className="text-sm md:text-base mt-1">Explore our exclusive collection</p>
              </div>
            </div>
          </Link>

          {/* Men's Panjabi Category */}
          <Link href="/categories/man" className="group block overflow-hidden rounded-sm shadow-none hover:shadow-none transition-all duration-300">
            <div className="relative h-64 md:h-80 w-full">
              <img 
                src="/panjabi_desktop.jpg" 
                alt="Men's Panjabi Collection" 
                className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl md:text-2xl font-bold">Men's Panjabi</h3>
                <p className="text-sm md:text-base mt-1">Discover traditional elegance</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryImages;