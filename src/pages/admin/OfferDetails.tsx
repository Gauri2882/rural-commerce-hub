
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminMobileNav from '@/components/layout/AdminMobileNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Offer } from '@/types';

const OfferDetails: React.FC = () => {
  const [offers] = useState<Offer[]>([
    {
      id: '1',
      title: 'Summer Sale',
      description: 'Get 30% off on all summer products',
      shopId: '1',
      productId: '1',
      discountPercentage: 30,
      startDate: new Date('2025-05-01'),
      endDate: new Date('2025-07-31'),
      imageUrl: '/placeholder.svg'
    },
    {
      id: '2',
      title: 'Festival Discount',
      description: 'Special discounts for the harvest festival',
      shopId: '2',
      productId: '2',
      discountPercentage: 25,
      startDate: new Date('2025-08-15'),
      endDate: new Date('2025-09-15'),
      imageUrl: '/placeholder.svg'
    }
  ]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1">
        <AdminMobileNav />
        
        <main className="p-4 md:p-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Offer Management</h1>
            <Button>Create New Offer</Button>
          </div>
          
          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Active Offers</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Offers</TabsTrigger>
              <TabsTrigger value="expired">Expired Offers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="space-y-4">
              {offers.map(offer => (
                <Card key={offer.id}>
                  <CardHeader className="pb-2">
                    <CardTitle>{offer.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Description</p>
                        <p>{offer.description}</p>
                        <p className="mt-4 text-sm text-gray-500">Discount</p>
                        <p className="text-lg font-bold text-primary">{offer.discountPercentage}% OFF</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Valid Period</p>
                        <p>
                          {offer.startDate.toLocaleDateString()} - {offer.endDate.toLocaleDateString()}
                        </p>
                        <div className="mt-4 flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="upcoming">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">No upcoming offers yet.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="expired">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">No expired offers.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default OfferDetails;
