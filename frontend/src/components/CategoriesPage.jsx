import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { categories, restaurants } from '../data/mockData';
import RestaurantCard from './RestaurantCard';
import { Button } from './ui/button';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredRestaurants = selectedCategory 
    ? restaurants.filter(r => r.category === selectedCategory)
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => selectedCategory ? setSelectedCategory(null) : navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">
              {selectedCategory || 'All Categories'}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {!selectedCategory ? (
          // Categories Grid
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map(category => {
              const count = restaurants.filter(r => r.category === category.name).length;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-all group"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#FF3008]/10 transition-colors">
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-[#FF3008] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">{count} places</p>
                </button>
              );
            })}
          </div>
        ) : (
          // Filtered Restaurants
          <>
            <p className="text-gray-500 mb-6">{filteredRestaurants.length} restaurants</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
            {filteredRestaurants.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500">No restaurants in this category</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;