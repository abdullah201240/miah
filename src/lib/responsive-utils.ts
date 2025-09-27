"use client";

import { useState, useEffect } from "react";

// Tailwind CSS breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

// Hook to detect current breakpoint
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | null>(null);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;

      if (width >= BREAKPOINTS["2xl"]) {
        setBreakpoint("2xl");
      } else if (width >= BREAKPOINTS.xl) {
        setBreakpoint("xl");
      } else if (width >= BREAKPOINTS.lg) {
        setBreakpoint("lg");
      } else if (width >= BREAKPOINTS.md) {
        setBreakpoint("md");
      } else if (width >= BREAKPOINTS.sm) {
        setBreakpoint("sm");
      } else {
        setBreakpoint(null);
      }
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);

    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
}

// Hook to check if screen is at least a certain breakpoint
export function useMediaQuery(breakpoint: Breakpoint) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${BREAKPOINTS[breakpoint]}px)`);

    const updateMatches = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", updateMatches);

    return () => mediaQuery.removeEventListener("change", updateMatches);
  }, [breakpoint]);

  return matches;
}

// Helper functions for responsive design
export const responsive = {
  // Check if current screen is mobile
  isMobile: () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < BREAKPOINTS.md;
  },

  // Check if current screen is tablet
  isTablet: () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= BREAKPOINTS.md && window.innerWidth < BREAKPOINTS.lg;
  },

  // Check if current screen is desktop
  isDesktop: () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= BREAKPOINTS.lg;
  },

  // Get responsive classes based on breakpoint
  classes: {
    hideOnMobile: "hidden md:block",
    hideOnTablet: "block md:hidden lg:block",
    showOnMobile: "block md:hidden",
    showOnTablet: "hidden md:block lg:hidden",
    showOnDesktop: "hidden lg:block",
  },

  // Get column count based on breakpoint
  getColumns: (mobile = 1, tablet = 2, desktop = 3, xl = 4) => {
    if (typeof window === "undefined") return mobile;

    const width = window.innerWidth;
    if (width >= BREAKPOINTS.xl) return xl;
    if (width >= BREAKPOINTS.lg) return desktop;
    if (width >= BREAKPOINTS.md) return tablet;
    return mobile;
  },

  // Get items per page based on breakpoint
  getItemsPerPage: (mobile = 5, tablet = 10, desktop = 15) => {
    if (typeof window === "undefined") return mobile;

    const width = window.innerWidth;
    if (width >= BREAKPOINTS.lg) return desktop;
    if (width >= BREAKPOINTS.md) return tablet;
    return mobile;
  },

  // Get table column configuration
  getTableConfig: () => {
    if (typeof window === "undefined") {
      return { showAllColumns: true, compactMode: false };
    }

    const width = window.innerWidth;

    if (width < BREAKPOINTS.md) {
      return { showAllColumns: false, compactMode: true };
    } else if (width < BREAKPOINTS.lg) {
      return { showAllColumns: false, compactMode: false };
    } else {
      return { showAllColumns: true, compactMode: false };
    }
  },
};

// Responsive table column configuration
export interface ResponsiveTableColumn {
  key: string;
  label: string;
  width?: string;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  priority: number; // Lower numbers have higher priority
}

// Generate responsive table columns based on screen size
export function getResponsiveColumns(
  columns: ResponsiveTableColumn[],
  currentBreakpoint: Breakpoint | null
): ResponsiveTableColumn[] {
  const isMobile = !currentBreakpoint || currentBreakpoint === "sm";
  const isTablet = currentBreakpoint === "md";

  return columns
    .filter((column) => {
      if (isMobile && column.hideOnMobile) return false;
      if (isTablet && column.hideOnTablet) return false;
      return true;
    })
    .sort((a, b) => a.priority - b.priority);
}

// Responsive grid system
export const gridSizes = {
  mobile: {
    cols: "grid-cols-1",
    gap: "gap-3",
  },
  tablet: {
    cols: "grid-cols-2",
    gap: "gap-4",
  },
  desktop: {
    cols: "grid-cols-3",
    gap: "gap-6",
  },
  xl: {
    cols: "grid-cols-4",
    gap: "gap-6",
  },
};

export function getResponsiveGridClasses(
  mobile = "grid-cols-1",
  tablet = "md:grid-cols-2",
  desktop = "lg:grid-cols-3",
  xl = "xl:grid-cols-4"
) {
  return `${mobile} ${tablet} ${desktop} ${xl}`;
}

// Responsive spacing utilities
export const spacing = {
  padding: {
    mobile: "p-3",
    tablet: "md:p-4",
    desktop: "lg:p-6",
  },
  margin: {
    mobile: "m-3",
    tablet: "md:m-4",
    desktop: "lg:m-6",
  },
  gap: {
    mobile: "gap-3",
    tablet: "md:gap-4",
    desktop: "lg:gap-6",
  },
};

export function getResponsiveSpacing(type: "padding" | "margin" | "gap") {
  const config = spacing[type];
  return `${config.mobile} ${config.tablet} ${config.desktop}`;
}

// Responsive text sizes
export const textSizes = {
  xs: "text-xs",
  sm: "text-sm md:text-base",
  base: "text-sm md:text-base lg:text-lg",
  lg: "text-base md:text-lg lg:text-xl",
  xl: "text-lg md:text-xl lg:text-2xl",
};

// Truncation utilities for different screen sizes
export function getResponsiveTruncation(
  mobileLength = 20,
  tabletLength = 30,
  desktopLength = 50
) {
  return {
    mobile: (text: string) => text.length > mobileLength ? text.substring(0, mobileLength) + "..." : text,
    tablet: (text: string) => text.length > tabletLength ? text.substring(0, tabletLength) + "..." : text,
    desktop: (text: string) => text.length > desktopLength ? text.substring(0, desktopLength) + "..." : text,
  };
}

// Mobile-first responsive design helpers
export function createResponsiveClasses(
  base: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string
) {
  const classes = [base];
  if (sm) classes.push(`sm:${sm}`);
  if (md) classes.push(`md:${md}`);
  if (lg) classes.push(`lg:${lg}`);
  if (xl) classes.push(`xl:${xl}`);
  return classes.join(" ");
}

// Layout utilities for responsive design
export const layouts = {
  container: "w-full mx-auto px-4 sm:px-6 lg:px-8",
  maxWidth: "max-w-7xl",
  section: "py-8 md:py-12 lg:py-16",
  card: "p-4 md:p-6 lg:p-8",
  button: {
    mobile: "text-sm px-3 py-2",
    desktop: "md:text-base md:px-4 md:py-2",
  },
};

export function getLayoutClasses(component: keyof typeof layouts) {
  return layouts[component];
}
