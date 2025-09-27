'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image?: string;
  video?: string;
  cta: string;
  category: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlayInterval?: number;
}

export default function PremiumHeroSlider({ slides, autoPlayInterval = 6000 }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  // Progress bar animation
  useEffect(() => {
    if (!isAutoPlaying || !progressRef.current) return;

    const progressBar = progressRef.current;
    progressBar.style.width = '0%';
    progressBar.style.transition = 'none';
    
    // Force reflow to reset the animation
    progressBar.offsetHeight;
    
    progressBar.style.transition = `width ${autoPlayInterval}ms linear`;
    progressBar.style.width = '100%';

    // Cleanup function to prevent memory leaks
    return () => {
      if (progressBar) {
        progressBar.style.transition = 'none';
      }
    };
  }, [currentSlide, isAutoPlaying, autoPlayInterval]);

  // Auto-play functionality
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning, slides.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setTimeout(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearTimeout(timer);
  }, [currentSlide, isAutoPlaying, autoPlayInterval, goToNext]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const handleImageLoad = (slideId: number) => {
    setLoadedImages(prev => new Set(prev).add(slideId));
  };

  // Handle video play/pause based on current slide
  useEffect(() => {
    // Pause all videos
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause();
      }
    });

    // Play video for current slide if it exists
    const currentVideo = videoRefs.current[currentSlide];
    if (currentVideo) {
      // Reset video to start
      currentVideo.currentTime = 0;
      currentVideo.play().catch(e => console.log("Video play failed:", e));
    }
  }, [currentSlide]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[40vh] xs:h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[75vh] xl:h-[80vh] overflow-hidden mx-auto max-w-[1500px] shadow-lg mt-2">
      {/* Background Particles Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px] animate-pulse"></div>
      </div>

      {/* Slides Container */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100 z-10' 
                : index === (currentSlide - 1 + slides.length) % slides.length
                ? 'opacity-0 scale-95 -translate-x-full z-5'
                : index === (currentSlide + 1) % slides.length
                ? 'opacity-0 scale-95 translate-x-full z-5'
                : 'opacity-0 scale-90 z-0'
            }`}
          >
            {/* Background Media (Image or Video) */}
            <div className="absolute inset-0 overflow-hidden bg-gray-900">
              {slide.video ? (
                // Video Background
                <video
                  ref={(el) => {
                    if (el) {
                      videoRefs.current[index] = el;
                    }
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay={index === currentSlide}
                  muted
                  loop
                  playsInline
                >
                  <source src={slide.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : slide.image ? (
                // Image Background with Ken Burns Effect
                <div className={`relative w-full h-full transition-transform duration-[12000ms] ease-out ${
                  index === currentSlide ? 'scale-110' : 'scale-100'
                }`}>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    className="object-cover object-center"
                    style={{
                      objectPosition: 'center center',
                      width: '100%',
                      height: '100%',
                    }}
                    priority={index <= 1}
                    quality={90}
                    onLoad={() => handleImageLoad(slide.id)}
                  />
                </div>
              ) : null}
              
              {/* Advanced Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
            </div>

            
          </div>
        ))}
      </div>

      {/* Premium Slide Indicators - Responsive */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-2 sm:space-x-3 md:space-x-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`relative overflow-hidden rounded-full transition-all duration-500 ${
              currentSlide === index
                ? 'w-12 h-3 sm:w-16 sm:h-4 bg-gradient-to-r from-blue-500 to-purple-500'
                : 'w-3 h-3 sm:w-4 sm:h-4 bg-white/40 hover:bg-white/60 hover:scale-125'
            }`}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
          >
            {currentSlide === index && (
              <div 
                ref={index === currentSlide ? progressRef : null}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-white/80 to-white/60 rounded-full transition-all duration-300"
                style={{ width: '0%' }}
              ></div>
            )}
          </button>
        ))}
      </div>

      {/* Auto-play Control - Responsive */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2 sm:p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 text-white transition-all duration-300 hover:scale-110"
      >
        {isAutoPlaying ? (
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
          </svg>
        ) : (
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1" />
          </svg>
        )}
      </button>

      {/* Loading States */}
      {slides.map((slide, index) => (
        !loadedImages.has(slide.id) && index <= currentSlide + 1 && slide.image && (
          <div key={`loading-${slide.id}`} className="absolute inset-0 bg-gray-900 flex items-center justify-center z-30">
            <div className="flex space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )
      ))}

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        /* Custom breakpoint for extra small screens */
        @media (min-width: 475px) {
          .xs\:h-\[50vh\] {
            height: 50vh;
          }
        }
      `}</style>
    </div>
  );
}