"use client";
// src/components/layout/Header.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useScrollPosition } from '@portfolio/lib/hooks/useScrollPosition';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contact', href: '/#contact' },
];

export default function Header() {
  const scrollPosition = useScrollPosition();
  const [isScrolled, setIsScrolled] = useState(false);
  // Add state for mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsScrolled(scrollPosition > 20);
  }, [scrollPosition]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background-primary/90 backdrop-blur-md py-4 shadow-lg' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-heading font-bold text-white">
            <span className="text-accent-primary">A</span>ryan
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link 
                  href={item.href}
                  className="text-white/80 hover:text-accent-primary transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Mobile menu button - single button with toggle functionality */}
        <button className="md:hidden text-white" aria-label="Toggle mobile menu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button> 
         
      </div>
      
      {/* Mobile Menu (slides down when open) */}
      <motion.div 
        className={`md:hidden bg-background-primary/95 backdrop-blur-md ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <nav className="container mx-auto px-4 py-6">
          <ul className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link 
                  href={item.href}
                  className="text-white/80 hover:text-accent-primary transition-colors block py-2"
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu when item is clicked
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </motion.header>
  );
}