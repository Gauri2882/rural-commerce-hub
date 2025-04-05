
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tag } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  showCompareButton?: boolean;
  onAddToCompare?: (product: Product) => void;
  isInCompare?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showCompareButton = false, 
  onAddToCompare,
  isInCompare = false
}) => {
  const hasDiscount = product.discountPrice !== undefined && product.discountPrice < product.price;
  
  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCompare) {
      onAddToCompare(product);
    }
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md h-full">
      <Link to={`/shop/${product.shopId}?product=${product.id}`}>
        <div className="aspect-square overflow-hidden relative">
          <img 
            src={product.imageUrl || "/placeholder.svg"} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <Tag size={12} className="mr-1" />
              {Math.round(((product.price - (product.discountPrice || 0)) / product.price) * 100)}% OFF
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
          
          <div className="mt-2 flex items-center justify-between">
            <div>
              {hasDiscount ? (
                <div className="flex items-center">
                  <span className="text-lg font-bold text-primary">${product.discountPrice?.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {showCompareButton && (
              <button
                onClick={handleCompareClick}
                className={`text-xs px-2 py-1 rounded ${
                  isInCompare 
                    ? 'bg-primary-light text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                {isInCompare ? 'Added' : 'Compare'}
              </button>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
