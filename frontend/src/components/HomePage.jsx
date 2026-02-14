import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import RestaurantCard from './RestaurantCard';
import { categories, restaurants, promoImages } from '../data/mockData';
import { Button } from './ui/button';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

const HomePage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredRestaurants = activeCategory === 'All' 
    ? restaurants 
    : restaurants.filter(r => r.category === activeCategory);

  const featuredRestaurants = restaurants.filter(r => r.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Promo Carousel */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Your favorite food,
                <br />
                <span className="text-[#FF3008]">delivered fast</span>
              </h1>
              <p className="text-gray-300 text-lg max-w-md">
                Order from 50+ restaurants. Fast delivery to your door with real-time tracking.
              </p>
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#FF3008] hover:bg-[#E02B07] text-white font-medium px-8"
                  onClick={() => document.getElementById('restaurants').scrollIntoView({ behavior: 'smooth' })}
                >
                  Order Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                  onClick={() => navigate('/dasher')}
                >
                  Become a Dasher
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative">
              <img
                src={promoImages[0]}
                alt="Featured Food"
                className="rounded-2xl shadow-2xl w-full h-80 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-xl shadow-lg">
                <p className="text-sm text-gray-500">Limited time</p>
                <p className="font-bold text-lg">$0 Delivery Fee</p>
                <p className="text-[#FF3008] font-medium">on your first order</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Categories</h2>
            <Button variant="ghost" className="text-[#FF3008]" onClick={() => navigate('/categories')}>
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-4 pb-4">
              <button
                onClick={() => setActiveCategory('All')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl min-w-[100px] transition-all ${
                  activeCategory === 'All' 
                    ? 'bg-[#FF3008] text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <span className="text-2xl">🍽️</span>
                <span className="text-sm font-medium">All</span>
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.name)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl min-w-[100px] transition-all ${
                    activeCategory === category.name 
                      ? 'bg-[#FF3008] text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Featured Restaurants</h2>
              <p className="text-gray-500">Our top picks for you</p>
            </div>
          </div>
          <ScrollArea className="w-full">
            <div className="flex gap-6 pb-4">
              {featuredRestaurants.slice(0, 6).map(restaurant => (
                <div key={restaurant.id} className="min-w-[300px] max-w-[300px]">
                  <RestaurantCard restaurant={restaurant} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>

      {/* All Restaurants */}
      <section id="restaurants" className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                {activeCategory === 'All' ? 'All Restaurants' : activeCategory}
              </h2>
              <p className="text-gray-500">{filteredRestaurants.length} restaurants</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>

      {/* Become a Dasher CTA */}
      <section className="py-16 bg-[#FF3008]">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Become a Dasher</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Earn money on your schedule. Deliver when you want, as much as you want.
          </p>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-[#FF3008] font-medium px-8"
            onClick={() => navigate('/dasher')}
          >
            Start Earning
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#FF3008] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <span className="text-xl font-bold">DoorDash</span>
              </div>
              <p className="text-gray-400 text-sm">
                Delivering delicious food to your doorstep since 2013.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Get to Know Us</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">About Us</li>
                <li className="hover:text-white cursor-pointer">Careers</li>
                <li className="hover:text-white cursor-pointer">Investors</li>
                <li className="hover:text-white cursor-pointer">Company Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Let Us Help You</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">Account Details</li>
                <li className="hover:text-white cursor-pointer">Order History</li>
                <li className="hover:text-white cursor-pointer">Help</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Doing Business</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">Become a Dasher</li>
                <li className="hover:text-white cursor-pointer">Be a Partner Restaurant</li>
                <li className="hover:text-white cursor-pointer">Get DoorDash for Business</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 DoorDash Clone. For demo purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;