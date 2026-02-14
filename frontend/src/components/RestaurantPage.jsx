import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, ChevronLeft, Plus, Minus, Info, X } from 'lucide-react';
import { restaurants, generateMenuItems } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { useToast } from '../hooks/use-toast';
import { Toaster } from './ui/toaster';

const RestaurantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart, cartItems, currentRestaurant, clearCart } = useCart();
  const [selectedItem, setSelectedItem] = useState(null);
  const [conflictDialog, setConflictDialog] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);

  const restaurant = restaurants.find(r => r.id === parseInt(id));
  const menuItems = useMemo(() => 
    restaurant ? generateMenuItems(restaurant.id, restaurant.category) : [],
    [restaurant]
  );

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const popularItems = menuItems.filter(item => item.popular);

  const handleAddToCart = (item) => {
    const result = addToCart(item, restaurant);
    if (!result.success) {
      setPendingItem(item);
      setConflictDialog(true);
    } else {
      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart`,
      });
      setSelectedItem(null);
    }
  };

  const handleClearAndAdd = () => {
    clearCart();
    if (pendingItem) {
      addToCart(pendingItem, restaurant);
      toast({
        title: "Added to cart",
        description: `${pendingItem.name} has been added to your cart`,
      });
    }
    setConflictDialog(false);
    setPendingItem(null);
    setSelectedItem(null);
  };

  const getItemQuantityInCart = (itemId) => {
    const item = cartItems.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      
      {/* Hero Header */}
      <div className="relative h-64 md:h-80">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Restaurant Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#FF3008] text-[#FF3008]" />
                    <span className="font-medium">{restaurant.rating}</span>
                    <span className="opacity-75">({restaurant.reviews.toLocaleString()}+ ratings)</span>
                  </div>
                  <span className="opacity-50">•</span>
                  <span>{restaurant.category}</span>
                </div>
              </div>
              {restaurant.promo && (
                <Badge className="bg-[#FF3008] text-white text-sm py-1">
                  {restaurant.promo}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>{restaurant.deliveryTime} min</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>
                {restaurant.deliveryFee === 0 
                  ? 'Free Delivery' 
                  : `$${restaurant.deliveryFee.toFixed(2)} delivery fee`
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="mb-6 bg-gray-100">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="all">Full Menu</TabsTrigger>
          </TabsList>

          <TabsContent value="popular">
            <div className="grid md:grid-cols-2 gap-4">
              {popularItems.map(item => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  quantity={getItemQuantityInCart(item.id)}
                  onAdd={() => handleAddToCart(item)}
                  onView={() => setSelectedItem(item)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div className="grid md:grid-cols-2 gap-4">
              {menuItems.map(item => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  quantity={getItemQuantityInCart(item.id)}
                  onAdd={() => handleAddToCart(item)}
                  onView={() => setSelectedItem(item)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Item Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-md">
          {selectedItem && (
            <>
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-48 object-cover rounded-lg -mt-2"
              />
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedItem.name}</DialogTitle>
              </DialogHeader>
              <p className="text-gray-600">{selectedItem.description}</p>
              <div className="flex items-center justify-between pt-4">
                <span className="text-2xl font-bold">${selectedItem.price.toFixed(2)}</span>
                <Button 
                  onClick={() => handleAddToCart(selectedItem)}
                  className="bg-[#FF3008] hover:bg-[#E02B07]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Cart Conflict Dialog */}
      <Dialog open={conflictDialog} onOpenChange={setConflictDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start a new cart?</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            You have items from <strong>{currentRestaurant?.name}</strong> in your cart. 
            Would you like to clear your cart and start a new order from <strong>{restaurant.name}</strong>?
          </p>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setConflictDialog(false)} className="flex-1">
              Keep Current Cart
            </Button>
            <Button onClick={handleClearAndAdd} className="flex-1 bg-[#FF3008] hover:bg-[#E02B07]">
              Start New Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Cart Button */}
      {cartItems.length > 0 && currentRestaurant?.id === restaurant.id && (
        <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50">
          <Button
            onClick={() => navigate('/cart')}
            className="w-full bg-[#FF3008] hover:bg-[#E02B07] h-14 text-lg shadow-xl"
          >
            View Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
          </Button>
        </div>
      )}
    </div>
  );
};

// Menu Item Card Component
const MenuItemCard = ({ item, quantity, onAdd, onView }) => {
  return (
    <div 
      className="bg-white rounded-xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
      onClick={onView}
    >
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            {item.popular && (
              <Badge variant="secondary" className="mt-1 text-xs">
                Most Liked
              </Badge>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-gray-900">${item.price.toFixed(2)}</span>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className={`rounded-full w-8 h-8 p-0 ${
              quantity > 0 
                ? 'bg-[#FF3008] hover:bg-[#E02B07]' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {quantity > 0 ? quantity : <Plus className="w-4 h-4" />}
          </Button>
        </div>
      </div>
      <img
        src={item.image}
        alt={item.name}
        className="w-28 h-28 object-cover rounded-lg flex-shrink-0"
      />
    </div>
  );
};

export default RestaurantPage;