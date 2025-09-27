import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center justify-start flex-grow-0">
              <div className="flex-shrink-0 flex items-center cursor-pointer hover:scale-105 transition-transform duration-200">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold text-sm mr-2">
                  🐄
                </div>
                <span className="font-semibold text-gray-800">D-LIVESTOCK</span>
              </div>
            </div>
            <div className="hidden md:flex flex-grow justify-end space-x-8 items-center">
              <Link
                to="/login"
                className="text-gray-700 hover:text-green-600 font-medium cursor-pointer transition-colors duration-200 hover:underline"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="text-gray-700 hover:text-green-600 font-medium cursor-pointer transition-colors duration-200 hover:underline"
              >
                Browse Cattle
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-green-600 font-medium cursor-pointer transition-colors duration-200 hover:underline"
              >
                About Us
              </Link>
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium cursor-pointer transition-colors duration-200 hover:underline"
              >
                Services
              </a>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-green-600 font-medium cursor-pointer transition-colors duration-200 hover:underline"
              >
                Contact
              </Link>
              <Link
                to="/login"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer hover:shadow-md inline-block"
              >
                Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-green-600 focus:outline-none cursor-pointer transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:text-green-600 cursor-pointer transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:text-green-600 cursor-pointer transition-colors duration-200"
            >
              Browse Cattle
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:text-green-600 cursor-pointer transition-colors duration-200"
            >
              About Us
            </Link>
            <a
              href="#"
              className="block px-3 py-2 text-gray-700 hover:text-green-600 cursor-pointer transition-colors duration-200"
            >
              Services
            </a>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:text-green-600 cursor-pointer transition-colors duration-200"
            >
              Contact
            </Link>
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full cursor-pointer transition-all duration-200 hover:shadow-md text-center"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
