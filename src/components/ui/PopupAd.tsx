'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import Image from 'next/image';

declare global {
  interface Window {
    popupShown?: boolean;
  }
}

export default function PopupAd({ href = '/products' }: { href?: string }) {
  const [show, setShow] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hasShown = window.popupShown;
    if (!hasShown) {
      const timer = setTimeout(() => {
        setShow(true);
        window.popupShown = true;
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShow(false);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const close = () => setShow(false);

  if (!show) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        // close when clicking the semi-transparent backdrop
        if (e.target === overlayRef.current) close();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <div ref={popupRef} className="relative w-full max-w-2xl overflow-hidden shadow-2xl">
        {/* Close button */}
        <button
          aria-label="Close popup"
          onClick={close}
          className="absolute top-3 right-3 z-30 inline-flex items-center justify-center rounded-full bg-white/80 p-2 backdrop-blur-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
        >
          <X size={18} />
        </button>

        {/* Main image - using local image from public folder */}
        <Link href={href} className="block w-full h-96 sm:h-[520px] relative  overflow-hidden">
          <Image
            src="/big-sale-fashion-poster-with-various-fashionable-male-and-female-clothing-accessories-and-shoes-on-white-background-flat-vector-illustration-2E8701Y.jpg"
            alt="Discount Sofa"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-2xl"
            priority={false}
          />
        </Link>
      </div>
    </div>
  );
}