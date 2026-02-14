import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { Badge } from './ui/badge';

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      className="group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Promo Badge */}
        {restaurant.promo && (
          <Badge 
            className="absolute top-3 left-3 bg-[#FF3008] hover:bg-[#FF3008] text-white font-medium"
          >
            {restaurant.promo}
          </Badge>
        )}
        {/* Delivery Fee */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
          <span className="text-sm font-medium">
            {restaurant.deliveryFee === 0 ? 'Free Delivery' : `$${restaurant.deliveryFee.toFixed(2)} delivery`}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <h3 className="font-semibold text-gray-900 text-lg group-hover:text-[#FF3008] transition-colors truncate">
          {restaurant.name}
        </h3>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#FF3008] text-[#FF3008]" />
            <span className="font-medium text-gray-900">{restaurant.rating}</span>
            <span className="text-gray-400">({restaurant.reviews.toLocaleString()}+)</span>
          </div>
          <span className="text-gray-300">•</span>
          <span>{restaurant.category}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{restaurant.deliveryTime} min</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;