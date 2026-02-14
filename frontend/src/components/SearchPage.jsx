import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, SlidersHorizontal, X } from 'lucide-react';
import { restaurants, categories } from '../data/mockData';
import RestaurantCard from './RestaurantCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Slider } from './ui/slider';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxDeliveryFee, setMaxDeliveryFee] = useState(10);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating');

  const filteredRestaurants = useMemo(() => {
    let results = restaurants;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(r => 
        r.name.toLowerCase().includes(query) ||
        r.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      results = results.filter(r => selectedCategories.includes(r.category));
    }

    // Delivery fee filter
    results = results.filter(r => r.deliveryFee <= maxDeliveryFee);

    // Rating filter
    results = results.filter(r => r.rating >= minRating);

    // Sort
    switch (sortBy) {
      case 'rating':
        results = [...results].sort((a, b) => b.rating - a.rating);
        break;
      case 'deliveryTime':
        results = [...results].sort((a, b) => 
          parseInt(a.deliveryTime) - parseInt(b.deliveryTime)
        );
        break;
      case 'deliveryFee':
        results = [...results].sort((a, b) => a.deliveryFee - b.deliveryFee);
        break;
      default:
        break;
    }

    return results;
  }, [searchQuery, selectedCategories, maxDeliveryFee, minRating, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMaxDeliveryFee(10);
    setMinRating(0);
    setSortBy('rating');
  };

  const hasActiveFilters = selectedCategories.length > 0 || maxDeliveryFee < 10 || minRating > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search restaurants, food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 bg-gray-100 border-0 rounded-full"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>

            {/* Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {hasActiveFilters && (
                    <Badge className="bg-[#FF3008] text-white text-xs px-1.5">
                      {selectedCategories.length + (maxDeliveryFee < 10 ? 1 : 0) + (minRating > 0 ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  {/* Sort By */}
                  <div>
                    <h4 className="font-medium mb-3">Sort By</h4>
                    <div className="flex flex-wrap gap-2">
                      {['rating', 'deliveryTime', 'deliveryFee'].map(option => (
                        <Button
                          key={option}
                          variant={sortBy === option ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSortBy(option)}
                          className={sortBy === option ? 'bg-[#FF3008] hover:bg-[#E02B07]' : ''}
                        >
                          {option === 'rating' && 'Rating'}
                          {option === 'deliveryTime' && 'Delivery Time'}
                          {option === 'deliveryFee' && 'Delivery Fee'}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h4 className="font-medium mb-3">Categories</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {categories.map(category => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={category.name}
                            checked={selectedCategories.includes(category.name)}
                            onCheckedChange={() => toggleCategory(category.name)}
                          />
                          <Label htmlFor={category.name} className="cursor-pointer">
                            {category.icon} {category.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Max Delivery Fee */}
                  <div>
                    <h4 className="font-medium mb-3">Max Delivery Fee: ${maxDeliveryFee}</h4>
                    <Slider
                      value={[maxDeliveryFee]}
                      onValueChange={([value]) => setMaxDeliveryFee(value)}
                      max={10}
                      step={0.5}
                    />
                  </div>

                  {/* Min Rating */}
                  <div>
                    <h4 className="font-medium mb-3">Min Rating: {minRating}+</h4>
                    <Slider
                      value={[minRating]}
                      onValueChange={([value]) => setMinRating(value)}
                      max={5}
                      step={0.5}
                    />
                  </div>

                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="w-full"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Active Filter Pills */}
      {hasActiveFilters && (
        <div className="bg-white border-b px-4 py-3">
          <div className="max-w-5xl mx-auto flex flex-wrap gap-2">
            {selectedCategories.map(cat => (
              <Badge
                key={cat}
                variant="secondary"
                className="cursor-pointer hover:bg-gray-300"
                onClick={() => toggleCategory(cat)}
              >
                {cat} <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
            {maxDeliveryFee < 10 && (
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-gray-300"
                onClick={() => setMaxDeliveryFee(10)}
              >
                Under ${maxDeliveryFee} delivery <X className="w-3 h-3 ml-1" />
              </Badge>
            )}
            {minRating > 0 && (
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-gray-300"
                onClick={() => setMinRating(0)}
              >
                {minRating}+ rating <X className="w-3 h-3 ml-1" />
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Results */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {searchQuery ? `Results for "${searchQuery}"` : 'All Restaurants'}
          </h1>
          <p className="text-gray-500">{filteredRestaurants.length} restaurants found</p>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No restaurants found</h2>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;