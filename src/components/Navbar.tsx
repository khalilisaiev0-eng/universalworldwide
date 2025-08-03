'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header>
      {/* Top navigation bar with links */}
      <div className="bg-[#f3fcff] text-gray-800 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image src="/images/islam.png" alt="Islam Logo" width={40} height={40} />
            <span className="text-xl font-medium">Ummah Emergency Relief</span>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center">
            <span className="text-gray-800 hover:text-blue-600">English</span>
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
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col">
              <span className="py-2 border-b text-gray-800">English</span>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 