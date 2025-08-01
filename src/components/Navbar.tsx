'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="bg-purple-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="md:hidden mr-2"
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
          
          <Link href="/" className="text-2xl font-bold">
            Universal
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            href="/" 
            className={`hover:underline ${pathname === '/' ? 'font-semibold' : ''}`}
          >
            Home
          </Link>
          <Link 
            href="/catalog" 
            className={`hover:underline ${pathname === '/catalog' ? 'font-semibold' : ''}`}
          >
            Catalog
          </Link>
          <Link 
            href="/contact" 
            className={`hover:underline ${pathname === '/contact' ? 'font-semibold' : ''}`}
          >
            Contact
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="hover:text-gray-200">
            <FiSearch size={20} />
          </button>
          
          <div className="relative group">
            <Link href="/account" className="hover:text-gray-200">
              <FiUser size={20} />
            </Link>
          </div>
          
          <Link href="/cart" className="hover:text-gray-200 relative">
            <FiShoppingCart size={20} />
          </Link>
          
          <div className="hidden md:block">
            <select className="bg-transparent border-none focus:outline-none">
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <nav className="flex flex-col space-y-2">
            <Link 
              href="/" 
              className={`hover:bg-purple-700 px-2 py-1 rounded ${pathname === '/' ? 'font-semibold' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/catalog" 
              className={`hover:bg-purple-700 px-2 py-1 rounded ${pathname === '/catalog' ? 'font-semibold' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Catalog
            </Link>
            <Link 
              href="/contact" 
              className={`hover:bg-purple-700 px-2 py-1 rounded ${pathname === '/contact' ? 'font-semibold' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="py-2">
              <select className="bg-purple-800 border-none focus:outline-none w-full">
                <option value="en">English</option>
              </select>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
} 