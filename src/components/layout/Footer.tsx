
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-dark text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SuperMall</h3>
            <p className="text-sm">
              Connecting rural merchants with global customers. Bringing local products to the worldwide market.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/catalog" className="text-sm hover:text-accent transition-colors">Categories</Link></li>
              <li><Link to="/shops" className="text-sm hover:text-accent transition-colors">Shops</Link></li>
              <li><Link to="/offers" className="text-sm hover:text-accent transition-colors">Offers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm hover:text-accent transition-colors">Help Center</Link></li>
              <li><Link to="#" className="text-sm hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link to="#" className="text-sm hover:text-accent transition-colors">FAQs</Link></li>
              <li><Link to="#" className="text-sm hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Admin</h4>
            <ul className="space-y-2">
              <li><Link to="/admin/login" className="text-sm hover:text-accent transition-colors">Admin Login</Link></li>
              <li><Link to="/admin/dashboard" className="text-sm hover:text-accent transition-colors">Dashboard</Link></li>
              <li><Link to="/admin/shops" className="text-sm hover:text-accent transition-colors">Manage Shops</Link></li>
              <li><Link to="/admin/offers" className="text-sm hover:text-accent transition-colors">Manage Offers</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6">
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} SuperMall. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
