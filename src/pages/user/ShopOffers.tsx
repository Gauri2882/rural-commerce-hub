
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import OfferCard from '@/components/shared/OfferCard';
import ProductCard from '@/components/shared/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shop, Offer, Product } from '@/types';
import { ArrowLeft } from 'lucide-react';

const ShopOffers: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  
  const [shop, setShop] = useState<Shop | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  
  // Mock data
  useEffect(() => {
    // Fetch shop details
    const shopData: Shop = {
      id: shopId || '1',
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
    };
    
    // Fetch offers for this shop
    const shopOffers: Offer[] = [
      {
        id: '1',
        title: 'Summer Sale',
        description: 'Get 30% off on all summer products',
        shopId: shopId || '1',
        productId: '1',
        discountPercentage: 30,
        startDate: new Date('2025-05-01'),
        endDate: new Date('2025-07-31'),
        imageUrl: '/placeholder.svg'
      },
      {
        id: '3',
        title: 'Weekend Special',
        description: 'Buy one get one free on selected items',
        shopId: shopId || '1',
        productId: '3',
        discountPercentage: 50,
        startDate: new Date('2025-04-01'),
        endDate: new Date('2025-04-30'),
        imageUrl: '/placeholder.svg'
      }
    ];
    
    // Fetch discounted products for this shop
    const shopProducts: Product[] = [
      {
        id: '1',
        name: 'Fresh Tomatoes',
        description: 'Organically grown tomatoes from local farms',
        price: 3.99,
        discountPrice: 2.99,
        shopId: shopId || '1',
        categoryId: '1',
        imageUrl: '/placeholder.svg',
        features: ['Organic', 'Locally grown', 'Pesticide-free'],
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
        shopId: shopId || '1',
        categoryId: '3',
        imageUrl: '/placeholder.svg',
        features: ['Organic', 'Raw', 'Unfiltered'],
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    setShop(shopData);
    setOffers(shopOffers);
    setDiscountedProducts(shopProducts);
  }, [shopId]);
  
  if (!shop) {
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
            <h1 className="text-3xl font-bold mb-2">{shop.name} - Special Offers</h1>
            <p className="text-gray-600">{shop.description}</p>
          </div>
          
          {offers.length > 0 ? (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Current Promotions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map(offer => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            </div>
          ) : (
            <Card className="mb-12">
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No current promotions for this shop</p>
              </CardContent>
            </Card>
          )}
          
          <h2 className="text-2xl font-semibold mb-6">Discounted Products</h2>
          {discountedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {discountedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No discounted products available</p>
              </CardContent>
            </Card>
          )}
          
          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link to={`/shop/${shop.id}`}>
                View All Products from {shop.name}
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopOffers;
