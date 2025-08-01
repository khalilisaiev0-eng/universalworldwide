'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header>
      {/* Top navigation bar with language selector and login */}
      <div className="bg-blue-700 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="hidden md:block">
            <span className="text-sm">Gaza Emergency Relief</span>
          </div>
          <div className="flex items-center space-x-4">
            <select className="bg-transparent border-none text-sm focus:outline-none">
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="fr">Français</option>
            </select>
            <Link href="/login" className="text-sm hover:underline">Login</Link>
          </div>
        </div>
      </div>
      
      {/* Main navigation with logo and menu items */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-blue-700 font-bold text-2xl">Gaza Relief</span>
              </Link>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href="/" 
                className={`text-gray-800 hover:text-blue-700 ${pathname === '/' ? 'font-semibold' : ''}`}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className={`text-gray-800 hover:text-blue-700 ${pathname === '/about' ? 'font-semibold' : ''}`}
              >
                About
              </Link>
              <Link 
                href="/donate" 
                className={`text-gray-800 hover:text-blue-700 ${pathname === '/donate' ? 'font-semibold' : ''}`}
              >
                How To Help
              </Link>
              <Link 
                href="/contact" 
                className={`text-gray-800 hover:text-blue-700 ${pathname === '/contact' ? 'font-semibold' : ''}`}
              >
                Contact
              </Link>
              <Link
                href="/donate-now"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium"
              >
                Donate Now
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-800"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col">
              <Link 
                href="/" 
                className={`py-2 border-b ${pathname === '/' ? 'text-blue-700 font-semibold' : 'text-gray-800'}`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className={`py-2 border-b ${pathname === '/about' ? 'text-blue-700 font-semibold' : 'text-gray-800'}`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/donate" 
                className={`py-2 border-b ${pathname === '/donate' ? 'text-blue-700 font-semibold' : 'text-gray-800'}`}
                onClick={() => setIsOpen(false)}
              >
                How To Help
              </Link>
              <Link 
                href="/contact" 
                className={`py-2 border-b ${pathname === '/contact' ? 'text-blue-700 font-semibold' : 'text-gray-800'}`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/donate-now"
                className="bg-red-600 text-white py-2 px-4 mt-4 mb-2 text-center rounded-md font-medium"
                onClick={() => setIsOpen(false)}
              >
                Donate Now
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 