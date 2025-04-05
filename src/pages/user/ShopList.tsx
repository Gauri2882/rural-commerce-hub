
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ShopCard from '@/components/shared/ShopCard';
import { Input } from '@/components/ui/input';
import { Shop } from '@/types';
import { Search } from 'lucide-react';

const ShopList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for shops
  const [shops] = useState<Shop[]>([
    {
      id: '1',
      name: 'Farm Fresh Produce',
      description: 'Local farm produce directly from farmers',
      ownerName: 'John Smith',
      contactNumber: '+1-234-567-8901',
      email: 'farmfresh@example.com',
      address: '123 Rural Road, Farmington',
      floorId: '1',
      categoryId: '1',
      imageUrl: '/placeholder.svg',
      rating: 4.5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Artisan Crafts',
      description: 'Handmade crafts from local artisans',
      ownerName: 'Emma Johnson',
      contactNumber: '+1-234-567-8902',
      email: 'artisan@example.com',
      address: '456 Craft Lane, Artville',
      floorId: '2',
      categoryId: '2',
      imageUrl: '/placeholder.svg',
      rating: 4.8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      name: 'Village Bakery',
      description: 'Traditional baked goods using local ingredients',
      ownerName: 'Robert Williams',
      contactNumber: '+1-234-567-8903',
      email: 'bakery@example.com',
      address: '789 Baker Street, Villageton',
      floorId: '1',
      categoryId: '3',
      imageUrl: '/placeholder.svg',
      rating: 4.7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      name: 'Rural Textiles',
      description: 'Traditional textiles and garments',
      ownerName: 'Sarah Davis',
      contactNumber: '+1-234-567-8904',
      email: 'textiles@example.com',
      address: '101 Weaver Road, Clothville',
      floorId: '3',
      categoryId: '4',
      imageUrl: '/placeholder.svg',
      rating: 4.6,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  
  // Filter shops based on search term
  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Explore Shops</h1>
          
          {/* Search */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Search shops..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {filteredShops.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShops.map(shop => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">No shops found</h3>
              <p className="text-gray-600">
                Try adjusting your search term
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopList;
