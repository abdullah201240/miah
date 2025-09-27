'use client';

import { useEffect, useState } from 'react';
import MobileTopBar from './MobileTopBar';
import MobileBottomNav from './MobileBottomNav';
import Header from './Header';
import Footer from './Footer';

interface MobileLayoutProps {
  children: React.ReactNode;
  showMobileHeader?: boolean;
  showMobileFooter?: boolean;
  showDesktopHeader?: boolean;
  showDesktopFooter?: boolean;
  mobileTitle?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export default function MobileLayout({
  children,
  showMobileHeader = true,
  showMobileFooter = true,
  showDesktopHeader = true,
  showDesktopFooter = true,
  mobileTitle,
  showBack = false,
  onBack
}: MobileLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Desktop Header */}
      {!isMobile && showDesktopHeader && <Header />}
      
      {/* Mobile Header */}
      {isMobile && showMobileHeader && (
        <MobileTopBar 
          title={mobileTitle}
          showBack={showBack}
          onBack={onBack}
        />
      )}

      {/* Main Content */}
      <main className={`flex-1 ${isMobile && showMobileFooter ? 'pb-16' : ''}`}>
        {children}
      </main>

      {/* Footer - Show on both mobile and desktop */}
      {((isMobile && showMobileFooter) || (!isMobile && showDesktopFooter)) && <Footer />}
      
      {/* Mobile Bottom Navigation */}
      {isMobile && showMobileFooter && <MobileBottomNav />}
    </div>
  );
}
