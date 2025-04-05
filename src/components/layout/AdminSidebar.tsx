
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Tag, Layers, LogOut } from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <aside className="bg-primary text-white w-64 min-h-screen p-5 hidden md:block">
      <div className="mb-10">
        <Link to="/admin/dashboard" className="text-xl font-bold">SuperMall Admin</Link>
      </div>
      
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
            >
              <Layers size={20} />
              <span>Categories & Floors</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="absolute bottom-5 left-0 w-64 px-5">
        <Link 
          to="/" 
          className="flex items-center space-x-3 p-3 rounded-md hover:bg-primary-dark/50 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
