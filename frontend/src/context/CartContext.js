import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('doordash-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentRestaurant, setCurrentRestaurant] = useState(null);

  useEffect(() => {
    localStorage.setItem('doordash-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item, restaurant) => {
    // Check if adding from different restaurant
    if (currentRestaurant && currentRestaurant.id !== restaurant.id && cartItems.length > 0) {
      return { success: false, message: 'You have items from another restaurant. Clear cart first?' };
    }

    setCurrentRestaurant(restaurant);
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    return { success: true };
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => {
      const newItems = prev.filter(i => i.id !== itemId);
      if (newItems.length === 0) {
        setCurrentRestaurant(null);
      }
      return newItems;
    });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev => 
      prev.map(i => i.id === itemId ? { ...i, quantity } : i)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCurrentRestaurant(null);
    localStorage.removeItem('doordash-cart');
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      currentRestaurant,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getSubtotal,
      getTotalItems,
    }}>
      {children}
    </CartContext.Provider>
  );
};