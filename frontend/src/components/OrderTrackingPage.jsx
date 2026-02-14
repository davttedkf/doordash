import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageSquare, MapPin, CheckCircle2, Circle, Clock, User, Car, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useUser } from '../context/UserContext';
import { mockDashers, orderStatuses } from '../data/mockData';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const createIcon = (color, emoji) => L.divIcon({
  className: 'custom-marker',
  html: `<div style="background:${color};width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);font-size:18px;">${emoji}</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const driverIcon = createIcon('#FF3008', '🚗');
const restaurantIcon = createIcon('#22c55e', '🍽️');
const homeIcon = createIcon('#3b82f6', '🏠');

// Map updater component
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
};

// Calculate point between two coordinates
const interpolate = (start, end, fraction) => [
  start[0] + (end[0] - start[0]) * fraction,
  start[1] + (end[1] - start[1]) * fraction,
];

// Generate path with some realistic curves
const generatePath = (start, end, numPoints = 20) => {
  const path = [];
  const midLat = (start[0] + end[0]) / 2 + (Math.random() - 0.5) * 0.01;
  const midLng = (start[1] + end[1]) / 2 + (Math.random() - 0.5) * 0.01;
  const mid = [midLat, midLng];
  
  for (let i = 0; i <= numPoints / 2; i++) {
    path.push(interpolate(start, mid, i / (numPoints / 2)));
  }
  for (let i = 0; i <= numPoints / 2; i++) {
    path.push(interpolate(mid, end, i / (numPoints / 2)));
  }
  return path;
};

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus, address } = useUser();
  
  const order = orders.find(o => o.id === orderId);
  const [currentStatus, setCurrentStatus] = useState(order?.status || 1);
  const [dasher, setDasher] = useState(null);
  const [driverPosition, setDriverPosition] = useState(null);
  const [pathProgress, setPathProgress] = useState(0);
  const [eta, setEta] = useState(null);
  const [pathToRestaurant, setPathToRestaurant] = useState([]);
  const [pathToCustomer, setPathToCustomer] = useState([]);
  
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  // Simulated locations (in a real app, these would come from geocoding)
  const customerLocation = useMemo(() => {
    // San Francisco area - slight randomization for demo
    return [37.7749 + (Math.random() - 0.5) * 0.02, -122.4194 + (Math.random() - 0.5) * 0.02];
  }, []);
  
  const restaurantLocation = useMemo(() => {
    // Restaurant location - different from customer
    return [37.7849 + (Math.random() - 0.5) * 0.01, -122.4094 + (Math.random() - 0.5) * 0.01];
  }, []);
  
  const driverStartLocation = useMemo(() => {
    // Driver starts somewhere else
    return [37.7799 + (Math.random() - 0.5) * 0.01, -122.4294 + (Math.random() - 0.5) * 0.01];
  }, []);

  // Calculate total delivery time from restaurant estimate
  const deliveryTimeMinutes = useMemo(() => {
    if (!order?.restaurant?.deliveryTime) return 30;
    const timeRange = order.restaurant.deliveryTime.split('-');
    const minTime = parseInt(timeRange[0]) || 25;
    const maxTime = parseInt(timeRange[1]) || 35;
    // Return a random time within the range
    return minTime + Math.random() * (maxTime - minTime);
  }, [order]);

  useEffect(() => {
    if (!order) return;

    // Initialize paths
    setPathToRestaurant(generatePath(driverStartLocation, restaurantLocation));
    setPathToCustomer(generatePath(restaurantLocation, customerLocation));
    
    // Assign a random dasher
    const randomDasher = mockDashers[Math.floor(Math.random() * mockDashers.length)];
    setDasher(randomDasher);
    
    // Set initial driver position
    setDriverPosition(driverStartLocation);
    
    // Calculate initial ETA
    const totalSeconds = deliveryTimeMinutes * 60;
    setEta(Math.ceil(totalSeconds / 60));
    startTimeRef.current = Date.now();
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [order, deliveryTimeMinutes, driverStartLocation, restaurantLocation, customerLocation]);

  // Main delivery simulation
  useEffect(() => {
    if (!order || currentStatus >= 6) return;
    
    const totalDurationMs = deliveryTimeMinutes * 60 * 1000;
    const prepTimeMs = totalDurationMs * 0.3; // 30% prep time
    const toRestaurantMs = totalDurationMs * 0.2; // 20% driving to restaurant
    const atRestaurantMs = totalDurationMs * 0.1; // 10% at restaurant
    const toCustomerMs = totalDurationMs * 0.4; // 40% driving to customer
    
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remainingMs = Math.max(0, totalDurationMs - elapsed);
      setEta(Math.ceil(remainingMs / 60000));
      
      // Determine current phase and update accordingly
      if (elapsed < prepTimeMs) {
        // Phase 1 & 2: Order placed, Preparing
        if (currentStatus < 2) {
          setCurrentStatus(2);
          updateOrderStatus(orderId, 2);
        }
      } else if (elapsed < prepTimeMs + toRestaurantMs) {
        // Phase 3: Ready for pickup - driver heading to restaurant
        if (currentStatus < 3) {
          setCurrentStatus(3);
          updateOrderStatus(orderId, 3);
        }
        if (currentStatus < 4) {
          setCurrentStatus(4);
          updateOrderStatus(orderId, 4);
        }
        
        // Animate driver to restaurant
        const phaseElapsed = elapsed - prepTimeMs;
        const phaseProgress = Math.min(1, phaseElapsed / toRestaurantMs);
        const pathIndex = Math.floor(phaseProgress * (pathToRestaurant.length - 1));
        if (pathToRestaurant[pathIndex]) {
          setDriverPosition(pathToRestaurant[pathIndex]);
        }
        setPathProgress(phaseProgress * 0.3); // 0-30% of total progress
        
      } else if (elapsed < prepTimeMs + toRestaurantMs + atRestaurantMs) {
        // Phase 4: At restaurant, picking up
        setDriverPosition(restaurantLocation);
        setPathProgress(0.3);
        
      } else if (elapsed < totalDurationMs) {
        // Phase 5: On the way to customer
        if (currentStatus < 5) {
          setCurrentStatus(5);
          updateOrderStatus(orderId, 5);
        }
        
        // Animate driver to customer
        const phaseElapsed = elapsed - prepTimeMs - toRestaurantMs - atRestaurantMs;
        const phaseProgress = Math.min(1, phaseElapsed / toCustomerMs);
        const pathIndex = Math.floor(phaseProgress * (pathToCustomer.length - 1));
        if (pathToCustomer[pathIndex]) {
          setDriverPosition(pathToCustomer[pathIndex]);
        }
        setPathProgress(0.3 + phaseProgress * 0.7); // 30-100% of total progress
        
      } else {
        // Phase 6: Delivered
        setCurrentStatus(6);
        updateOrderStatus(orderId, 6);
        setDriverPosition(customerLocation);
        setPathProgress(1);
        clearInterval(timerRef.current);
      }
    }, 1000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [order, currentStatus, deliveryTimeMinutes, orderId, updateOrderStatus, pathToRestaurant, pathToCustomer, restaurantLocation, customerLocation]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Button onClick={() => navigate('/orders')}>View All Orders</Button>
        </div>
      </div>
    );
  }

  const progressPercent = (currentStatus / 6) * 100;
  const currentStatusInfo = orderStatuses[currentStatus - 1];

  const getStatusMessage = () => {
    switch (currentStatus) {
      case 1: return 'Order confirmed';
      case 2: return `${order.restaurant?.name || 'Restaurant'} is preparing your order`;
      case 3: return 'Order ready! Waiting for Dasher';
      case 4: return `${dasher?.name || 'Dasher'} is heading to the restaurant`;
      case 5: return `${dasher?.name || 'Dasher'} is on the way with your order`;
      case 6: return 'Order delivered! Enjoy your meal!';
      default: return 'Processing...';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-[1000]">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/orders')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-bold">Order #{orderId.slice(-6)}</h1>
              <p className="text-sm text-gray-500">{getStatusMessage()}</p>
            </div>
            {eta !== null && currentStatus < 6 && (
              <div className="text-right">
                <p className="text-2xl font-bold text-[#FF3008]">{eta}</p>
                <p className="text-xs text-gray-500">min</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Live Map */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="h-72 relative">
            <MapContainer
              center={driverPosition || customerLocation}
              zoom={14}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Customer location */}
              <Marker position={customerLocation} icon={homeIcon}>
                <Popup>Your location</Popup>
              </Marker>
              
              {/* Restaurant location */}
              <Marker position={restaurantLocation} icon={restaurantIcon}>
                <Popup>{order.restaurant?.name || 'Restaurant'}</Popup>
              </Marker>
              
              {/* Driver location */}
              {driverPosition && currentStatus >= 4 && (
                <Marker position={driverPosition} icon={driverIcon}>
                  <Popup>{dasher?.name || 'Your Dasher'}</Popup>
                </Marker>
              )}
              
              {/* Route lines */}
              {currentStatus >= 4 && currentStatus < 5 && pathToRestaurant.length > 0 && (
                <Polyline
                  positions={pathToRestaurant}
                  color="#FF3008"
                  weight={4}
                  opacity={0.7}
                  dashArray="10, 10"
                />
              )}
              {currentStatus >= 5 && pathToCustomer.length > 0 && (
                <Polyline
                  positions={pathToCustomer}
                  color="#FF3008"
                  weight={4}
                  opacity={0.7}
                />
              )}
              
              <MapUpdater center={driverPosition} />
            </MapContainer>
            
            {/* ETA overlay */}
            {currentStatus < 6 && (
              <div className="absolute bottom-4 left-4 bg-white rounded-lg px-4 py-2 shadow-lg z-[1000]">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#FF3008]" />
                  <span className="text-sm font-medium">
                    {currentStatus < 5 ? 'Driver heading to restaurant' : 'On the way to you'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Delivery Progress</span>
            <span className="text-sm font-medium text-[#FF3008]">
              {currentStatus === 6 ? 'Delivered!' : `${Math.round(pathProgress * 100)}%`}
            </span>
          </div>
          <Progress value={pathProgress * 100} className="h-2 mb-6" />
          
          {/* Status Steps */}
          <div className="space-y-3">
            {orderStatuses.map((status, index) => {
              const isCompleted = currentStatus > index + 1;
              const isCurrent = currentStatus === index + 1;
              
              return (
                <div 
                  key={status.id}
                  className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                    isCurrent ? 'bg-[#FF3008]/10 border border-[#FF3008]/20' : isCompleted ? 'opacity-60' : 'opacity-40'
                  }`}
                >
                  <div className={`${
                    isCompleted || isCurrent ? 'text-[#FF3008]' : 'text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : isCurrent ? (
                      <div className="w-6 h-6 border-2 border-[#FF3008] rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-[#FF3008] rounded-full animate-pulse" />
                      </div>
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${isCurrent ? 'text-[#FF3008]' : ''}`}>
                      {status.name}
                    </p>
                    <p className="text-sm text-gray-500">{status.description}</p>
                  </div>
                  {isCurrent && eta !== null && currentStatus < 6 && (
                    <span className="text-sm text-[#FF3008] font-medium">{eta} min</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dasher Info */}
        {dasher && currentStatus >= 4 && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Your Dasher</h3>
            <div className="flex items-center gap-4">
              <img
                src={dasher.image}
                alt={dasher.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{dasher.name}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>⭐ {dasher.rating}</span>
                  <span>•</span>
                  <span>{dasher.deliveries} deliveries</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{dasher.vehicle}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="rounded-full w-10 h-10 p-0">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="rounded-full w-10 h-10 p-0">
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Address */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Delivery Address</h3>
              <p className="text-gray-600 text-sm mt-1">{order.address || address}</p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Order Details</h3>
          
          {/* Restaurant */}
          <div className="flex items-center gap-4 mb-4 pb-4 border-b">
            <img
              src={order.restaurant?.image}
              alt={order.restaurant?.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <p className="font-medium">{order.restaurant?.name}</p>
              <p className="text-sm text-gray-500">{order.items?.length || 0} items</p>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-2 mb-4">
            {order.items?.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t pt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>${order.total?.toFixed(2)}</span>
          </div>
        </div>

        {/* Help */}
        <div className="text-center pb-8">
          <Button variant="ghost" className="text-[#FF3008]">
            Need help with your order?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;