
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Search, ArrowRight } from 'lucide-react';
import CategoryCard from '@/components/shared/CategoryCard';
import ShopCard from '@/components/shared/ShopCard';
import OfferCard from '@/components/shared/OfferCard';
import { Category, Shop, Offer } from '@/types';

const Home: React.FC = () => {
  // Mock data
  const [featuredCategories] = useState<Category[]>([
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
  
  const [popularShops] = useState<Shop[]>([
    {
      id: '1',
      name: 'Farm Fresh Produce',
      description: 'Local farm products directly from farmers',
      ownerName: 'John Smith',
      contactNumber: '+1234567890',
      email: 'john@farmfresh.com',
      address: '123 Rural Road, Countryside',
      floorId: '1',
      categoryId: '1',
      imageUrl: '/placeholder.svg',
      rating: 4.5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Handmade Crafts',
      description: 'Artisanal handcrafted items from local artisans',
      ownerName: 'Jane Doe',
      contactNumber: '+0987654321',
      email: 'jane@handmade.com',
      address: '456 Artisan Street, Craftville',
      floorId: '2',
      categoryId: '2',
      imageUrl: '/placeholder.svg',
      rating: 4.2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      name: 'Organic Delights',
      description: 'Certified organic food products for health-conscious consumers',
      ownerName: 'Michael Brown',
      contactNumber: '+1122334455',
      email: 'michael@organic.com',
      address: '789 Healthy Lane, Greenville',
      floorId: '1',
      categoryId: '3',
      imageUrl: '/placeholder.svg',
      rating: 4.8,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  
  const [currentOffers] = useState<Offer[]>([
    {
      id: '1',
      title: 'Summer Sale',
      description: 'Get 25% off on all fresh produce',
      shopId: '1',
      productId: '1',
      discountPercentage: 25,
      startDate: new Date('2025-06-01'),
      endDate: new Date('2025-06-30'),
      imageUrl: '/placeholder.svg'
    },
    {
      id: '2',
      title: 'Handmade Crafts Special',
      description: 'Buy one get one free on selected items',
      shopId: '2',
      productId: '2',
      discountPercentage: 50,
      startDate: new Date('2025-04-01'),
      endDate: new Date('2025-04-15'),
      imageUrl: '/placeholder.svg'
    },
    {
      id: '3',
      title: 'Organic Week',
      description: '30% discount on all organic products',
      shopId: '3',
      productId: '3',
      discountPercentage: 30,
      startDate: new Date('2025-05-01'),
      endDate: new Date('2025-05-07'),
      imageUrl: '/placeholder.svg'
    }
  ]);
  
  const heroSlides = [
    {
      title: 'Discover Local Treasures',
      description: 'Connect with rural artisans and farmers offering unique products',
      image: '/placeholder.svg',
      ctaLink: '/shops',
      ctaText: 'Explore Shops'
    },
    {
      title: 'Fresh Farm Produce',
      description: 'Farm to table products delivered directly from local farmers',
      image: '/placeholder.svg',
      ctaLink: '/catalog?category=1',
      ctaText: 'View Products'
    },
    {
      title: 'Special Offers',
      description: 'Don\'t miss out on exclusive deals from our merchants',
      image: '/placeholder.svg',
      ctaLink: '/offers',
      ctaText: 'See Offers'
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Carousel */}
        <section className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {heroSlides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[500px] w-full">
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-center text-white max-w-3xl px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                        <p className="text-lg md:text-xl mb-8">{slide.description}</p>
                        <Link to={slide.ctaLink}>
                          <Button size="lg" className="bg-primary-light hover:bg-primary">
                            {slide.ctaText}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="absolute left-4 top-1/2" />
              <CarouselNext className="absolute right-4 top-1/2" />
            </div>
          </Carousel>
        </section>
        
        {/* Search Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Find What You're Looking For</h2>
                <div className="flex">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input 
                      type="text" 
                      placeholder="Search for shops, products, or categories..." 
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <Button className="px-6 rounded-l-none">
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold">Browse Categories</h2>
                <p className="text-gray-600">Explore our wide range of product categories</p>
              </div>
              <Link to="/catalog" className="text-primary flex items-center hover:underline">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Popular Shops Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold">Popular Shops</h2>
                <p className="text-gray-600">Discover our most visited shops</p>
              </div>
              <Link to="/shops" className="text-primary flex items-center hover:underline">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularShops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Current Offers Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold">Current Offers</h2>
                <p className="text-gray-600">Limited time offers from our merchants</p>
              </div>
              <Link to="/offers" className="text-primary flex items-center hover:underline">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="py-16 bg-primary-dark text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose SuperMall</h2>
              <p className="text-lg max-w-2xl mx-auto">We connect rural merchants with global customers, providing a platform for sustainable commerce and growth.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-primary p-6 rounded-lg text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Direct from Source</h3>
                <p>Products directly from rural artisans and farmers without middlemen markup.</p>
              </div>
              
              <div className="bg-primary p-6 rounded-lg text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
                <p>Every merchant is vetted to ensure authentic, high-quality products.</p>
              </div>
              
              <div className="bg-primary p-6 rounded-lg text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Support Local Communities</h3>
                <p>Your purchases help sustain rural livelihoods and preserve traditional crafts.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-accent rounded-xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-dark">Ready to Discover Unique Products?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-700">
                Start exploring our marketplace today and connect with rural merchants offering exceptional products.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/shops">
                  <Button size="lg" className="bg-primary-dark hover:bg-primary text-white w-full sm:w-auto">
                    Browse Shops
                  </Button>
                </Link>
                <Link to="/catalog">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    View Categories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
