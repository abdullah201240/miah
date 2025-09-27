import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { OrderProvider } from '@/contexts/OrderContext';
import { AdminProvider } from '@/contexts/AdminContext';
import { NotificationProvider } from '@/contexts/NotificationContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StyleHub - Trendy Clothing & Fashion",
  description: "Discover the latest fashion trends at StyleHub. Shop our curated collection of trendy clothing, accessories, and footwear for men, women, and kids.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <AdminProvider>
          <NotificationProvider>
            <CartProvider>
              <WishlistProvider>
                <OrderProvider>
                  {children}
                </OrderProvider>
              </WishlistProvider>
            </CartProvider>
          </NotificationProvider>
        </AdminProvider>
      </body>
    </html>
  );
}