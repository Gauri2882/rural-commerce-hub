
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Shop } from '@/types';

interface ShopCardProps {
  shop: Shop;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>);
      }
    }
    return stars;
  };

  return (
    <Link to={`/shop/${shop.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md h-full">
        <div className="aspect-video overflow-hidden">
          <img 
            src={shop.imageUrl || "/placeholder.svg"} 
            alt={shop.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">{shop.name}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{shop.description}</p>
          <div className="flex mt-2">
            {renderStars(shop.rating)}
          </div>
          <p className="text-xs text-gray-500 mt-2">Floor: {shop.floorId}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ShopCard;
