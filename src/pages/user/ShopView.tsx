
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shared/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shop, Product } from '@/types';
import { ArrowLeft, MapPin, Phone, Mail, Star, Clock, ExternalLink } from 'lucide-react';

const ShopView: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const [searchParams] = useSearchParams();
  const highlightedProductId = searchParams.get('product');
  
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [highlightedProduct, setHighlightedProduct] = useState<Product | null>(null);
  
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
    
    // Fetch products for this shop
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
        id: '5',
        name: 'Farm Fresh Eggs',
        description: 'Free-range eggs from local farms',
        price: 5.99,
        shopId: shopId || '1',
        categoryId: '1',
        imageUrl: '/placeholder.svg',
        features: ['Free-range', 'No hormones', 'Locally sourced'],
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '6',
        name: 'Organic Potatoes',
        description: 'Naturally grown potatoes without pesticides',
        price: 2.49,
        shopId: shopId || '1',
        categoryId: '1',
        imageUrl: '/placeholder.svg',
        features: ['Organic', 'No pesticides', 'Locally grown'],
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    setShop(shopData);
    setProducts(shopProducts);
    
    // If a product is highlighted in the URL, find it
    if (highlightedProductId) {
      const product = shopProducts.find(p => p.id === highlightedProductId) || null;
      setHighlightedProduct(product);
    }
  }, [shopId, highlightedProductId]);
  
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
          
          {/* Shop Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <img 
                  src={shop.imageUrl} 
                  alt={shop.name} 
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
              <div className="md:w-3/4 md:pl-6">
                <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
                <p className="text-gray-600 mb-4">{shop.description}</p>
                
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-medium">{shop.rating}</span>
                  <span className="text-gray-500 ml-2">(48 reviews)</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{shop.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{shop.contactNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{shop.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Highlighted Product */}
          {highlightedProduct && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Featured Product</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <img 
                    src={highlightedProduct.imageUrl} 
                    alt={highlightedProduct.name} 
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold mb-2">{highlightedProduct.name}</h3>
                  <p className="text-gray-600 mb-4">{highlightedProduct.description}</p>
                  
                  <div className="mb-4">
                    {highlightedProduct.discountPrice ? (
                      <div>
                        <span className="text-2xl font-bold text-primary mr-2">
                          ${highlightedProduct.discountPrice.toFixed(2)}
                        </span>
                        <span className="text-gray-500 line-through">
                          ${highlightedProduct.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-primary">
                        ${highlightedProduct.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {highlightedProduct.features.map((feature, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button>Add to Cart</Button>
                    <Button variant="outline">
                      <Link to={`/compare?products=${highlightedProduct.id}`}>
                        Compare with other products
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Tabs */}
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="info">Shop Info</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products">
              <h2 className="text-2xl font-semibold mb-6">All Products</h2>
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-500">No products available</p>
                  </CardContent>
                </Card>
              )}
              
              {products.length > 1 && (
                <div className="mt-8 text-center">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    asChild
                  >
                    <Link to={`/compare?products=${products.map(p => p.id).join(',')}`}>
                      Compare All Products
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="info">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">About {shop.name}</h3>
                      <p className="text-gray-600">{shop.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                          <span>{shop.address}</span>
                        </li>
                        <li className="flex items-center">
                          <Phone className="w-5 h-5 text-gray-400 mr-2" />
                          <span>{shop.contactNumber}</span>
                        </li>
                        <li className="flex items-center">
                          <Mail className="w-5 h-5 text-gray-400 mr-2" />
                          <span>{shop.email}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
                      <ul className="space-y-1">
                        <li className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="w-24">Monday-Friday:</span>
                          <span>9:00 AM - 6:00 PM</span>
                        </li>
                        <li className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="w-24">Saturday:</span>
                          <span>10:00 AM - 4:00 PM</span>
                        </li>
                        <li className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="w-24">Sunday:</span>
                          <span>Closed</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="text-center pt-4">
                      <Button asChild>
                        <Link to={`/shop-offers/${shop.id}`}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Special Offers
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopView;
