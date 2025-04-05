
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CategoryCard from '@/components/shared/CategoryCard';
import ProductCard from '@/components/shared/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Category, Product } from '@/types';
import { Filter, Search, X } from 'lucide-react';

const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Fresh Produce',
      description: 'Farm-fresh fruits and vegetables',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Handmade Crafts',
      description: 'Artisanal handcrafted items from local artisans',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Organic Food',
      description: 'Certified organic food products',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '4',
      name: 'Textiles',
      description: 'Traditional and modern textiles',
      imageUrl: '/placeholder.svg'
    }
  ]);
  
  const [products, setProducts] = useState<Product[]>([
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
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryId);
  const [showOnlyDiscounted, setShowOnlyDiscounted] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  
  // Get selected category name
  const selectedCategoryName = selectedCategory
    ? categories.find(cat => cat.id === selectedCategory)?.name || 'All Categories'
    : 'All Categories';
  
  // Apply filters
  useEffect(() => {
    let filtered = products;
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.categoryId === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(term) || 
          product.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(
      product => {
        const price = product.discountPrice || product.price;
        return price >= priceRange[0] && price <= priceRange[1];
      }
    );
    
    // Filter discounted items
    if (showOnlyDiscounted) {
      filtered = filtered.filter(product => product.discountPrice !== undefined);
    }
    
    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm, priceRange, showOnlyDiscounted]);
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(prevCategory => prevCategory === categoryId ? null : categoryId);
    
    // Update URL parameter
    if (categoryId && categoryId !== selectedCategory) {
      searchParams.set('category', categoryId);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 100]);
    setSelectedCategory(null);
    setShowOnlyDiscounted(false);
    searchParams.delete('category');
    setSearchParams(searchParams);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold">Product Catalog</h1>
              <p className="text-gray-600">
                {selectedCategory 
                  ? `Browsing: ${selectedCategoryName}`
                  : 'Browse all categories and products'
                }
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              {/* Mobile filter button */}
              <Button 
                variant="outline" 
                className="md:hidden mr-2"
                onClick={() => setShowMobileFilter(true)}
              >
                <Filter size={18} className="mr-2" />
                Filters
              </Button>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-10 w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <div key={category.id} 
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedCategory === category.id 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-white border hover:shadow-sm'
                  }`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <div className="flex items-center">
                    <img 
                      src={category.imageUrl} 
                      alt={category.name} 
                      className="w-10 h-10 object-cover rounded mr-3"
                    />
                    <span className="font-medium">{category.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop filters sidebar */}
            <div className="hidden md:block w-64 shrink-0">
              <div className="bg-white p-6 rounded-lg border">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Price Range</h3>
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="mb-2"
                    />
                    <div className="flex justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  {/* Discounts */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Offers</h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="discount" 
                        checked={showOnlyDiscounted} 
                        onCheckedChange={(checked) => 
                          setShowOnlyDiscounted(checked === true)
                        }
                      />
                      <label htmlFor="discount" className="text-sm font-medium cursor-pointer">
                        Show only discounted items
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile filters */}
            {showMobileFilter && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
                <div className="bg-white w-80 max-w-full h-full overflow-auto float-right p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Filters</h2>
                    <Button variant="ghost" size="sm" onClick={() => setShowMobileFilter(false)}>
                      <X size={20} />
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Categories */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`cat-${category.id}`} 
                              checked={selectedCategory === category.id} 
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  handleCategorySelect(category.id);
                                } else if (selectedCategory === category.id) {
                                  handleCategorySelect(category.id);
                                }
                              }}
                            />
                            <label htmlFor={`cat-${category.id}`} className="text-sm font-medium cursor-pointer">
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Price Range */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Price Range</h3>
                      <Slider
                        defaultValue={[0, 100]}
                        max={100}
                        step={1}
                        value={priceRange}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                        className="mb-2"
                      />
                      <div className="flex justify-between">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                    
                    {/* Discounts */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Offers</h3>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="discount-mobile" 
                          checked={showOnlyDiscounted} 
                          onCheckedChange={(checked) => 
                            setShowOnlyDiscounted(checked === true)
                          }
                        />
                        <label htmlFor="discount-mobile" className="text-sm font-medium cursor-pointer">
                          Show only discounted items
                        </label>
                      </div>
                    </div>
                    
                    <div className="pt-4 space-y-3">
                      <Button 
                        className="w-full" 
                        onClick={() => setShowMobileFilter(false)}
                      >
                        Apply Filters
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => {
                          clearFilters();
                          setShowMobileFilter(false);
                        }}
                      >
                        Clear All
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Products */}
            <div className="flex-1">
              {/* Active filters */}
              {(selectedCategory || searchTerm || priceRange[0] > 0 || priceRange[1] < 100 || showOnlyDiscounted) && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {selectedCategory && (
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                      Category: {selectedCategoryName}
                      <button 
                        className="ml-2 text-gray-500"
                        onClick={() => handleCategorySelect(selectedCategory)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  
                  {searchTerm && (
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                      Search: {searchTerm}
                      <button 
                        className="ml-2 text-gray-500"
                        onClick={() => setSearchTerm('')}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  
                  {(priceRange[0] > 0 || priceRange[1] < 100) && (
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                      Price: ${priceRange[0]} - ${priceRange[1]}
                      <button 
                        className="ml-2 text-gray-500"
                        onClick={() => setPriceRange([0, 100])}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  
                  {showOnlyDiscounted && (
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                      Discounted Items Only
                      <button 
                        className="ml-2 text-gray-500"
                        onClick={() => setShowOnlyDiscounted(false)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">Try changing your filters or search term</p>
                  <Button onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Catalog;
