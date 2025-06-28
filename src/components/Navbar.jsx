import { NavLink } from "react-router-dom";

import { logo } from "../assets/images";
import { Link } from "react-router-dom";

const Navbar = ({ isDark, setIsDark, onClose, className = "" }) => {
  const handleLinkClick = () => {
    // Close the sidebar when a link is clicked
    if (onClose) onClose();
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Logo Section */}
      <div className="flex items-center mb-8">
        <NavLink 
          to="/" 
          onClick={handleLinkClick}
          className="flex items-center space-x-3 group"
        >
          <img
            src={logo}
            alt="logo"
            className="w-12 h-12 object-contain rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-200"
            style={{ background: 'black' }}
          />
          <span className={`text-xl font-bold transition-colors duration-200 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Aryan
          </span>
        </NavLink>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2 mb-8">
        <NavLink
          to="/about"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `block w-full px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${
              isActive
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : isDark
                ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`
          }
        >
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>About</span>
          </div>
        </NavLink>

        <NavLink
          to="/projects"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `block w-full px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${
              isActive
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : isDark
                ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`
          }
        >
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Projects</span>
          </div>
        </NavLink>

        <NavLink
          to="/contact"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `block w-full px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${
              isActive
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : isDark
                ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`
          }
        >
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Contact</span>
          </div>
        </NavLink>
      </nav>

      {/* Dark Mode Toggle Section */}
      <div className={`border-t pt-6 transition-colors duration-200 ${
        isDark ? "border-gray-700/50" : "border-gray-200/50"
      }`}>
        <div className="flex items-center justify-between mb-4">
          <span className={`text-sm font-medium transition-colors duration-200 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}>
            Theme
          </span>
        </div>
        <button
          onClick={() => setIsDark(!isDark)}
          className={`relative w-full h-14 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 ${
            isDark 
              ? 'bg-gray-800 border-gray-600 hover:bg-gray-700' 
              : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center justify-between px-4 h-full">
            <div className="flex items-center space-x-3">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                  isDark 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-yellow-400 text-gray-800 shadow-lg'
                }`}
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className={`text-base font-medium transition-colors duration-200 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
            
            {/* Toggle indicator */}
            <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
              isDark 
                ? 'border-blue-400 bg-blue-100' 
                : 'border-yellow-500 bg-yellow-100'
            }`}>
              <div className={`w-2 h-2 rounded-full mt-1 ml-1 transition-all duration-300 ${
                isDark ? 'bg-blue-600' : 'bg-yellow-500'
              }`}></div>
            </div>
          </div>
        </button>
      </div>

      {/* Footer Section */}
      <div className="pt-6 mt-auto">
        <div className="text-center">
          <p className={`text-xs transition-colors duration-200 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}>
            Made with ❤️ by Aryan
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;