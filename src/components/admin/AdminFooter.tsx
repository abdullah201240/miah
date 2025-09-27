'use client';

import React from 'react';
import { Heart, Code } from 'lucide-react';

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border px-6 py-3">
      <div className="flex items-center justify-center text-sm text-muted-foreground">
        {/* Centered Content */}
        <div className="flex items-center space-x-1">
          <span>© {currentYear} <a 
            href="https://abdullah-al-sakib.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium hover:underline transition-colors duration-200"
            style={{ color: '#E8532F' }}
          > Abdullah Al Sakib.</a>
          </span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}