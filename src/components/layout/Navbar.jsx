import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useTranslation } from '../../hooks/useTranslation';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout, isRestaurant } = useAuth();
  const { itemCount } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container-wrapper">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/browse" className="text-gray-700 hover:text-primary font-medium">
              {t('navigation.home')}
            </Link>
            
            <Link to="/restaurants" className="text-gray-700 hover:text-primary font-medium">
              {t('navigation.restaurants')}
            </Link>
            
            {isRestaurant ? (
              <Link to="/restaurant/dashboard" className="text-gray-700 hover:text-primary font-medium">
                {t('restaurant.information')}
              </Link>
            ) : null}
            
            <LanguageSwitcher />
            
            {currentUser ? (
              <>
                <div className="relative">
                  <Link to="/cart" className="text-gray-700 hover:text-primary">
                    <FiShoppingCart className="h-6 w-6" />
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                </div>
                
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium">
                    <FiUser className="h-5 w-5" />
                    <span>{currentUser.displayName || t('navigation.profile')}</span>
                  </button>
                  
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-20 hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                      {t('navigation.profile')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      {t('auth.logout')}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-primary font-medium">
                  {t('auth.login')}
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  {t('auth.signup')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <LanguageSwitcher />
            
            {currentUser && (
              <Link to="/cart" className="text-gray-700 mx-4 relative">
                <FiShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary focus:outline-none ml-2"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-inner">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/browse" 
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-primary font-medium py-2"
            >
              {t('navigation.home')}
            </Link>
            
            <Link 
              to="/restaurants" 
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-primary font-medium py-2"
            >
              {t('navigation.restaurants')}
            </Link>
            
            {isRestaurant && (
              <Link 
                to="/restaurant/dashboard" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-primary font-medium py-2"
              >
                {t('restaurant.information')}
              </Link>
            )}
            
            {currentUser ? (
              <>
                <Link 
                  to="/profile" 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-primary font-medium py-2"
                >
                  {t('navigation.profile')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-gray-700 hover:text-primary font-medium py-2"
                >
                  {t('auth.logout')}
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-primary font-medium py-2"
                >
                  {t('auth.login')}
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setIsOpen(false)}
                  className="btn btn-primary w-full text-center py-2"
                >
                  {t('auth.signup')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 