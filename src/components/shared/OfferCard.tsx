
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Offer } from '@/types';

interface OfferCardProps {
  offer: Offer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };
  
  const isActive = () => {
    const now = new Date();
    const startDate = new Date(offer.startDate);
    const endDate = new Date(offer.endDate);
    return now >= startDate && now <= endDate;
  };
  
  return (
    <Link to={`/shop/${offer.shopId}?offer=${offer.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md h-full">
        <div className="aspect-video overflow-hidden relative">
          <img 
            src={offer.imageUrl || "/placeholder.svg"} 
            alt={offer.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            {offer.discountPercentage}% OFF
          </div>
          {isActive() && (
            <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-center py-1 text-xs">
              ACTIVE OFFER
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">{offer.title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{offer.description}</p>
          
          <div className="flex items-center mt-2 text-xs text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>
              {formatDate(offer.startDate)} - {formatDate(offer.endDate)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default OfferCard;
