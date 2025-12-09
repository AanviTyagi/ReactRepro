import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const profileMenuRef = useRef(null);
  const { getCartCount, toggleCart } = useCart();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.info('Logged out successfully');
    navigate('/login');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'bg-green-700' : '';
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center flex-1">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="font-bold text-xl">ReproCare</span>
              </Link>
            </div>

            {/* Main Navigation */}
            <div className="hidden md:flex ml-10 flex-1">
              <div className="flex items-center space-x-4">
                <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors ${isActive('/')}`}>Home</Link>
                <Link to="/articles" className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors ${isActive('/articles')}`}>Articles</Link>
                <Link to="/about" className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors ${isActive('/about')}`}>About Us</Link>
                <Link to="/shop" className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors ${isActive('/shop')}`}>ReproCare Products</Link>
                <Link to="/tracking" className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors ${isActive('/tracking')}`}>Tracking</Link>
                <Link to="/education" className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors ${isActive('/education')}`}>Education</Link>
              </div>
            </div>
          </div>

          {/* Right side - Cart, Consult Dr., and Profile */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <button
              onClick={toggleCart}
              className="relative p-1 rounded-full hover:bg-green-700 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>

            <Link
              to="/consult"
              className="hidden md:flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-white text-green-600 hover:bg-green-50 transition-colors"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Consult Dr.
            </Link>

            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-3 max-w-xs rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-600 focus:ring-white transition-shadow duration-200"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-white text-green-600 flex items-center justify-center font-semibold">
                      {getInitials(user.name)}
                    </div>
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></div>
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-semibold text-white">{user.name}</div>
                    <div className="text-xs text-green-200">View profile</div>
                  </div>
                </button>
                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 z-50">
                    <div className="px-4 py-4">
                      <p className="text-sm text-gray-900 font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Your Profile
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Appointments
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </Link>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 group"
                      >
                        <svg className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-700 focus:outline-none transition-colors"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 transition-colors ${isActive('/')}`}>Home</Link>
            <Link to="/articles" className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 transition-colors ${isActive('/articles')}`}>Articles</Link>
            <Link to="/about" className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 transition-colors ${isActive('/about')}`}>About Us</Link>
            <Link to="/shop" className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 transition-colors ${isActive('/shop')}`}>ReproCare Products</Link>
            <Link to="/tracking" className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 transition-colors ${isActive('/tracking')}`}>Tracking</Link>
            <Link to="/education" className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 transition-colors ${isActive('/education')}`}>Education</Link>
            <Link to="/consult" className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 transition-colors ${isActive('/consult')}`}>Consult Dr.</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar; 