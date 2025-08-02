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
      {/* Top navigation bar with links */}
      <div className="bg-blue-700 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span className="text-xl font-medium">Ummah Emergency Relief</span>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-white hover:text-gray-200"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-white hover:text-gray-200"
            >
              About
            </Link>
            <Link 
              href="/donate" 
              className="text-white hover:text-gray-200"
            >
              How To Help
            </Link>
            <Link 
              href="/contact" 
              className="text-white hover:text-gray-200"
            >
              Contact
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
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
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 