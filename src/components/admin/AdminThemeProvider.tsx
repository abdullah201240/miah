'use client';

import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';

interface AdminThemeProviderProps {
  children: React.ReactNode;
}

export function AdminThemeProvider({ children }: AdminThemeProviderProps) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="furnistore-admin-theme">
      {children}
    </ThemeProvider>
  );
}