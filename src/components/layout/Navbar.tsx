
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">SuperMall</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className={`font-medium ${isActive('/') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
              Home
            </Link>
            <Link to="/catalog" className={`font-medium ${isActive('/catalog') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
              Categories
            </Link>
            <Link to="/shops" className={`font-medium ${isActive('/shops') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
              Shops
            </Link>
            <Link to="/offers" className={`font-medium ${isActive('/offers') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
              Offers
            </Link>
          </div>

          {/* Search and cart */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Link to="/admin/login">
              <Button variant="outline" size="sm">Admin</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`px-2 py-1 font-medium ${isActive('/') ? 'text-primary' : 'text-gray-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/catalog" 
                className={`px-2 py-1 font-medium ${isActive('/catalog') ? 'text-primary' : 'text-gray-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/shops" 
                className={`px-2 py-1 font-medium ${isActive('/shops') ? 'text-primary' : 'text-gray-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Shops
              </Link>
              <Link 
                to="/offers" 
                className={`px-2 py-1 font-medium ${isActive('/offers') ? 'text-primary' : 'text-gray-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Offers
              </Link>
              <Link 
                to="/admin/login" 
                className="px-2 py-1 font-medium text-primary-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Login
              </Link>
              <div className="flex space-x-4 mt-2">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
