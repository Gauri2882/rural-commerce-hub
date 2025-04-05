
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ShopCard from '@/components/shared/ShopCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Floor, Shop } from '@/types';
import { ArrowLeft } from 'lucide-react';

const FloorDetails: React.FC = () => {
  const { floorId } = useParams<{ floorId: string }>();
  
  const [floor, setFloor] = useState<Floor | null>(null);
  const [shops, setShops] = useState<Shop[]>([]);
  
  // Mock data
  useEffect(() => {
    // Fetch floor details
    const floorData: Floor = {
      id: floorId || '1',
      name: 'Ground Floor',
      description: 'Food and grocery section',
      level: 0
    };
    
    // Fetch shops for this floor
    const floorShops: Shop[] = [
      {
        id: '1',
        name: 'Farm Fresh Produce',
        description: 'Local farm produce directly from farmers',
        ownerName: 'John Smith',
        contactNumber: '+1-234-567-8901',
        email: 'farmfresh@example.com',
        address: '123 Rural Road, Farmington',
        floorId: floorId || '1',
        categoryId: '1',
        imageUrl: '/placeholder.svg',
        rating: 4.5,
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
        floorId: floorId || '1',
        categoryId: '3',
        imageUrl: '/placeholder.svg',
        rating: 4.7,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    setFloor(floorData);
    setShops(floorShops);
  }, [floorId]);
  
  if (!floor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => window.history.back()} className="mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{floor.name}</h1>
            <p className="text-gray-600">{floor.description}</p>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6">Shops on this Floor</h2>
          {shops.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shops.map(shop => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No shops available on this floor</p>
              </CardContent>
            </Card>
          )}
          
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              <Link to="/shops">View All Shops</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FloorDetails;
