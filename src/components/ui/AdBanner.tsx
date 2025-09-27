'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AdBanner() {
  return (
    <div className="w-full">
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <Link href="/products" className="block h-full w-full">
          <div className="relative h-full w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/fashion-advertising-web-banner-illustration-vector.jpg"
              alt="Special Offer - Fashion Banner"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
              style={{ 
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              className="transition-transform duration-500 hover:scale-105 cursor-pointer"
              priority={true}
              quality={90}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}