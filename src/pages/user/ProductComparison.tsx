
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { Check, X, ArrowLeft } from 'lucide-react';

const ProductComparison: React.FC = () => {
  const [searchParams] = useSearchParams();
  const productIds = searchParams.get('products')?.split(',') || [];
  
  const [products, setProducts] = useState<Product[]>([]);
  
  // Mock products data
  const mockProducts: Product[] = [
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
  ];
  
  // Load products based on IDs
  useEffect(() => {
    if (productIds.length > 0) {
      const productsToCompare = mockProducts.filter(product => 
        productIds.includes(product.id)
      );
      
      setProducts(productsToCompare);
    }
  }, [productIds]);
  
  // Get all unique features from products
  const allFeatures = Array.from(
    new Set(products.flatMap(product => product.features))
  );
  
  const hasFeature = (product: Product, feature: string) => {
    return product.features.includes(feature);
  };
  
  if (products.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-12">
            <Button variant="ghost" onClick={() => window.history.back()} className="mb-8">
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
            
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold mb-4">No Products to Compare</h1>
              <p className="text-gray-600 mb-6">Please select products to compare.</p>
              <Button onClick={() => window.location.href = '/catalog'}>
                Browse Products
              </Button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => window.history.back()} className="mb-8">
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
          
          <h1 className="text-3xl font-bold mb-8">Product Comparison</h1>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                    Product Details
                  </th>
                  {products.map(product => (
                    <th key={product.id} className="px-6 py-3 bg-gray-50 text-center">
                      <div className="flex flex-col items-center">
                        <img 
                          src={product.imageUrl || "/placeholder.svg"} 
                          alt={product.name} 
                          className="w-24 h-24 object-cover mb-3"
                        />
                        <h3 className="text-base font-semibold text-gray-900">{product.name}</h3>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Price */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                    Price
                  </td>
                  {products.map(product => (
                    <td key={`price-${product.id}`} className="px-6 py-4 whitespace-nowrap text-center">
                      {product.discountPrice ? (
                        <div className="text-center">
                          <span className="text-lg font-bold text-primary">${product.discountPrice.toFixed(2)}</span>
                          <span className="block text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                      )}
                    </td>
                  ))}
                </tr>
                
                {/* Description */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">
                    Description
                  </td>
                  {products.map(product => (
                    <td key={`desc-${product.id}`} className="px-6 py-4 text-sm text-gray-500 text-center">
                      {product.description}
                    </td>
                  ))}
                </tr>
                
                {/* Shop */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                    Shop
                  </td>
                  {products.map(product => (
                    <td key={`shop-${product.id}`} className="px-6 py-4 whitespace-nowrap text-center">
                      <a 
                        href={`/shop/${product.shopId}`} 
                        className="text-primary hover:underline"
                      >
                        View Shop
                      </a>
                    </td>
                  ))}
                </tr>
                
                {/* In Stock */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                    Availability
                  </td>
                  {products.map(product => (
                    <td key={`stock-${product.id}`} className="px-6 py-4 whitespace-nowrap text-center">
                      {product.inStock ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Out of Stock
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
                
                {/* Features */}
                <tr>
                  <td colSpan={products.length + 1} className="px-6 py-4 text-lg font-semibold text-gray-900 bg-gray-100">
                    Features
                  </td>
                </tr>
                
                {allFeatures.map((feature, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {feature}
                    </td>
                    {products.map(product => (
                      <td key={`feature-${product.id}-${index}`} className="px-6 py-4 whitespace-nowrap text-center">
                        {hasFeature(product, feature) ? (
                          <Check className="w-5 h-5 mx-auto text-green-500" />
                        ) : (
                          <X className="w-5 h-5 mx-auto text-red-500" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                
                {/* Action buttons */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                    Actions
                  </td>
                  {products.map(product => (
                    <td key={`action-${product.id}`} className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex flex-col space-y-2">
                        <Button className="w-full">Add to Cart</Button>
                        <a href={`/shop/${product.shopId}?product=${product.id}`}>
                          <Button variant="outline" className="w-full">View Details</Button>
                        </a>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductComparison;
