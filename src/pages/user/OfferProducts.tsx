
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import OfferCard from '@/components/shared/OfferCard';
import ProductCard from '@/components/shared/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Offer, Product } from '@/types';

const OfferProducts: React.FC = () => {
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
  
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Fresh Tomatoes',
      description: 'Organically grown tomatoes from local farms',
      price: 3.99,
      discountPrice: 2.99,
      shopId: '1',
      categoryId: '1',
      imageUrl: '/placeholder.svg',
      features: ['Organic', 'Locally grown', 'Pesticide-free'],
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Handwoven Basket',
      description: 'Traditional handwoven basket made from natural materials',
      price: 24.99,
      discountPrice: 18.99,
      shopId: '2',
      categoryId: '2',
      imageUrl: '/placeholder.svg',
      features: ['Handmade', 'Natural materials', 'Traditional design'],
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      name: 'Organic Honey',
      description: 'Pure, raw honey from rural beekeepers',
      price: 12.99,
      discountPrice: 10.99,
      shopId: '3',
      categoryId: '3',
      imageUrl: '/placeholder.svg',
      features: ['Organic', 'Raw', 'Unfiltered'],
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      name: 'Cotton Scarf',
      description: 'Handloomed cotton scarf with traditional design',
      price: 18.99,
      discountPrice: 15.99,
      shopId: '2',
      categoryId: '4',
      imageUrl: '/placeholder.svg',
      features: ['Handloomed', '100% cotton', 'Natural dyes'],
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  
  // Filter products that have discounts
  const discountedProducts = products.filter(product => product.discountPrice !== undefined);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Special Offers</h1>
          
          <Tabs defaultValue="offers" className="space-y-8">
            <TabsList className="mb-4">
              <TabsTrigger value="offers">Current Offers</TabsTrigger>
              <TabsTrigger value="products">Discounted Products</TabsTrigger>
            </TabsList>
            
            <TabsContent value="offers" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map(offer => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="products">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {discountedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {discountedProducts.length > 1 && (
                <div className="mt-8 text-center">
                  <Button variant="outline" size="lg" asChild>
                    <a href="/compare">Compare Selected Products</a>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OfferProducts;
