import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import Image from 'next/image';
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/logo.gif"
              alt="Company Logo"
              width={100}
              height={100}
              className="w-20 h-20 mb-4 sm:mb-6"
            />
            <p className="text-gray-400 mb-4 text-sm sm:text-base leading-relaxed">
              Your go-to destination for trendy and stylish clothing.
              Discover the latest fashion trends and elevate your wardrobe with our curated collection.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  All Products
                </Link>
              </li>
             
              
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Customer Service</h4>
            <ul className="space-y-2 sm:space-y-3">
             
              
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Returns & Exchanges
                </Link>
              </li>
              
              <li>
                <Link href="/track" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base block py-1">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm sm:text-base">
                  <p>123 Furniture Street</p>
                  <p>Design District, NY 10001</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base break-all">support@furnistore.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-4 sm:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()}{' '}
              <Link 
                href="https://abdullah-al-sakib.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#D95B23] hover:underline"
              >
                Abdullah Al Sakib
              </Link>. All rights reserved.
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors text-center">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors text-center">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
