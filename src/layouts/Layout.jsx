// src/layouts/Layout.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [showNavbar, setShowNavbar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", isDark.toString());
    document.documentElement.classList.toggle("dark", isDark);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", isDark ? "#1f2937" : "#ffffff");
    }
  }, [isDark]);

  // Close navbar on route change
  useEffect(() => {
    setShowNavbar(false);
  }, [location.pathname]);

  // Handle escape key and body scroll
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showNavbar) {
        setShowNavbar(false);
      }
    };

    if (showNavbar) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [showNavbar]);

  const toggleNavbar = useCallback(() => {
    setShowNavbar(prev => !prev);
  }, []);

  const closeNavbar = useCallback(() => {
    setShowNavbar(false);
  }, []);

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        onClick={toggleNavbar}
        className={`
          fixed top-6 left-6 z-[100] 
          flex items-center justify-center
          w-12 h-12 sm:w-auto sm:h-auto sm:px-4 sm:py-3
          text-sm font-medium 
          bg-white/90 dark:bg-gray-900/90 
          border border-gray-200/50 dark:border-gray-700/50 
          rounded-full shadow-lg backdrop-blur-xl
          hover:bg-white dark:hover:bg-gray-900
          hover:shadow-xl hover:scale-105
          transition-all duration-200 ease-out
          text-gray-700 dark:text-gray-200
          ${isScrolled ? 'shadow-xl bg-white/95 dark:bg-gray-900/95' : ''}
        `}
        aria-label={showNavbar ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={showNavbar}
      >
        <span className={`
          text-lg transition-transform duration-200 
          ${showNavbar ? 'rotate-45' : ''}
        `}>
          {showNavbar ? "✕" : "☰"}
        </span>
        <span className="hidden sm:inline sm:ml-2">
          {showNavbar ? "Close" : "Menu"}
        </span>
      </button>

      {/* Backdrop Overlay */}
      {showNavbar && (
        <div
          className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-[90] 
                     transition-all duration-300 ease-out"
          onClick={closeNavbar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed top-0 left-0 h-full w-80 max-w-[85vw] z-[95]
        transform transition-transform duration-300 ease-out
        ${showNavbar ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl 
                        border-r border-gray-200/50 dark:border-gray-700/50 
                        shadow-2xl">
          {/* Navigation Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Navigation
            </h2>
            <button
              onClick={closeNavbar}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 
                         transition-colors duration-200"
              aria-label="Close navigation"
            >
              <span className="text-xl text-gray-500 dark:text-gray-400">✕</span>
            </button>
          </div>
          
          {/* Navbar Content */}
          <div className="h-full overflow-y-auto">
            <Navbar 
              isDark={isDark} 
              setIsDark={setIsDark} 
              onClose={closeNavbar}
              className="p-6"
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-h-screen">
        <div id="main-content" className="relative">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-1/2 
                   focus:-translate-x-1/2 focus:z-[110] focus:px-4 focus:py-2 
                   focus:bg-blue-600 focus:text-white focus:rounded focus:shadow-lg"
      >
        Skip to main content
      </a>
    </>
  );
};

export default Layout;