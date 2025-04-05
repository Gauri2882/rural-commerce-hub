
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, ShoppingBag, Tag, Layers, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminMobileNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="md:hidden">
      <div className="flex justify-between items-center p-4 bg-primary text-white">
        <Link to="/admin/dashboard" className="text-xl font-bold">SuperMall Admin</Link>
        <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      
      {isMenuOpen && (
        <div className="bg-primary text-white p-4 animate-fade-in">
          <nav>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/admin/dashboard" 
                  className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${
                    isActive('/admin/dashboard') 
                      ? 'bg-primary-dark text-white' 
                      : 'hover:bg-primary-dark/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home size={20} />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/shops" 
                  className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${
                    isActive('/admin/shops') 
                      ? 'bg-primary-dark text-white' 
                      : 'hover:bg-primary-dark/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingBag size={20} />
                  <span>Shop Management</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/offers" 
                  className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${
                    isActive('/admin/offers') 
                      ? 'bg-primary-dark text-white' 
                      : 'hover:bg-primary-dark/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Tag size={20} />
                  <span>Offer Management</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/categories" 
                  className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${
                    isActive('/admin/categories') 
                      ? 'bg-primary-dark text-white' 
                      : 'hover:bg-primary-dark/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Layers size={20} />
                  <span>Categories & Floors</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="flex items-center space-x-3 p-3 rounded-md hover:bg-primary-dark/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AdminMobileNav;
