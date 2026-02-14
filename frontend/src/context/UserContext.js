import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('doordash-user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [address, setAddress] = useState(() => {
    const saved = localStorage.getItem('doordash-address');
    return saved || '123 Main Street, San Francisco, CA 94105';
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('doordash-orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [isDasher, setIsDasher] = useState(() => {
    const saved = localStorage.getItem('doordash-dasher');
    return saved === 'true';
  });

  const [dasherStats, setDasherStats] = useState(() => {
    const saved = localStorage.getItem('doordash-dasher-stats');
    return saved ? JSON.parse(saved) : {
      rating: 4.9,
      totalDeliveries: 0,
      earnings: 0,
      acceptanceRate: 95,
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('doordash-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('doordash-user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('doordash-address', address);
  }, [address]);

  useEffect(() => {
    localStorage.setItem('doordash-orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('doordash-dasher', isDasher.toString());
  }, [isDasher]);

  useEffect(() => {
    localStorage.setItem('doordash-dasher-stats', JSON.stringify(dasherStats));
  }, [dasherStats]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('doordash-user');
  };

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 1,
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => 
      prev.map(o => o.id === orderId ? { ...o, status } : o)
    );
  };

  const toggleDasherMode = () => {
    setIsDasher(prev => !prev);
  };

  const updateDasherStats = (updates) => {
    setDasherStats(prev => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{
      user,
      address,
      orders,
      isDasher,
      dasherStats,
      login,
      logout,
      setAddress,
      addOrder,
      updateOrderStatus,
      toggleDasherMode,
      updateDasherStats,
    }}>
      {children}
    </UserContext.Provider>
  );
};