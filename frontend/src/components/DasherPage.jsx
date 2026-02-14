import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, Star, TrendingUp, Clock, MapPin, ChevronRight, CheckCircle, XCircle, Navigation, Phone, Package, Timer, Route } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useUser } from '../context/UserContext';
import { mockDasherOrders } from '../data/mockData';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Card, CardContent } from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';

// Fix for default marker icons
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
const customerIcon = createIcon('#3b82f6', '🏠');

// Map component to follow marker
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
};

// Generate path between points
const generatePath = (start, end, numPoints = 15) => {
  const path = [];
  for (let i = 0; i <= numPoints; i++) {
    const fraction = i / numPoints;
    path.push([
      start[0] + (end[0] - start[0]) * fraction + (Math.random() - 0.5) * 0.002,
      start[1] + (end[1] - start[1]) * fraction + (Math.random() - 0.5) * 0.002,
    ]);
  }
  return path;
};

const DasherPage = () => {
  const navigate = useNavigate();
  const { user, isDasher, dasherStats, updateDasherStats, toggleDasherMode } = useUser();
  
  const [availableOrders, setAvailableOrders] = useState(mockDasherOrders);
  const [activeOrder, setActiveOrder] = useState(null);
  const [deliveryPhase, setDeliveryPhase] = useState(0); // 0: none, 1: to restaurant, 2: at restaurant, 3: to customer, 4: delivered
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [driverPosition, setDriverPosition] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [earnings, setEarnings] = useState(0);
  
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  
  // Simulated locations
  const [restaurantLocation] = useState([37.7849, -122.4094]);
  const [customerLocation] = useState([37.7749, -122.4194]);
  const [driverStartLocation] = useState([37.7799, -122.4244]);
  const [pathToRestaurant, setPathToRestaurant] = useState([]);
  const [pathToCustomer, setPathToCustomer] = useState([]);

  useEffect(() => {
    // Generate paths
    setPathToRestaurant(generatePath(driverStartLocation, restaurantLocation));
    setPathToCustomer(generatePath(restaurantLocation, customerLocation));
  }, [driverStartLocation, restaurantLocation, customerLocation]);

  // Delivery simulation
  useEffect(() => {
    if (!activeOrder || deliveryPhase === 0 || deliveryPhase === 4) return;
    
    const estimatedMinutes = parseInt(activeOrder.estimatedTime) || 15;
    const phaseDuration = (estimatedMinutes * 60 * 1000) / 3; // Split into 3 phases
    
    startTimeRef.current = Date.now();
    setDriverPosition(driverStartLocation);
    
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const phaseElapsed = elapsed % phaseDuration;
      const currentPhaseIndex = Math.floor(elapsed / phaseDuration) + 1;
      const phaseProgress = phaseElapsed / phaseDuration;
      
      // Update time remaining
      const totalRemaining = Math.max(0, (estimatedMinutes * 60 * 1000) - elapsed);
      setTimeRemaining(Math.ceil(totalRemaining / 1000));
      
      if (currentPhaseIndex === 1 && deliveryPhase === 1) {
        // Driving to restaurant
        const pathIndex = Math.floor(phaseProgress * (pathToRestaurant.length - 1));
        if (pathToRestaurant[pathIndex]) {
          setDriverPosition(pathToRestaurant[pathIndex]);
        }
      } else if (currentPhaseIndex === 2) {
        // At restaurant
        if (deliveryPhase !== 2) setDeliveryPhase(2);
        setDriverPosition(restaurantLocation);
      } else if (currentPhaseIndex === 3) {
        // Driving to customer
        if (deliveryPhase !== 3) setDeliveryPhase(3);
        const pathIndex = Math.floor(phaseProgress * (pathToCustomer.length - 1));
        if (pathToCustomer[pathIndex]) {
          setDriverPosition(pathToCustomer[pathIndex]);
        }
      } else if (currentPhaseIndex >= 4) {
        // Delivered
        setDeliveryPhase(4);
        setDriverPosition(customerLocation);
        clearInterval(timerRef.current);
      }
    }, 500);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeOrder, deliveryPhase, pathToRestaurant, pathToCustomer, restaurantLocation, customerLocation, driverStartLocation]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sign in to become a Dasher</h1>
          <Button onClick={() => navigate('/login')} className="bg-[#FF3008] hover:bg-[#E02B07]">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (!isDasher) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-[#FF3008] text-white py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Become a Dasher</h1>
            <p className="text-xl opacity-90 mb-8">
              Earn money on your own schedule. Deliver when you want, how much you want.
            </p>
            <Button 
              size="lg"
              onClick={toggleDasherMode}
              className="bg-white text-[#FF3008] hover:bg-gray-100 font-semibold px-8"
            >
              Start Earning Today
            </Button>
          </div>
        </div>

        {/* Benefits */}
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Dash?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF3008]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-[#FF3008]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Competitive Pay</h3>
              <p className="text-gray-600">Earn money for every delivery plus 100% of tips</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF3008]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[#FF3008]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Flexible Schedule</h3>
              <p className="text-gray-600">Work when you want, no minimum hours required</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF3008]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation className="w-8 h-8 text-[#FF3008]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy to Start</h3>
              <p className="text-gray-600">Sign up in minutes and start earning right away</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleAcceptOrder = (order) => {
    setSelectedOrder(order);
    setShowAcceptDialog(true);
  };

  const confirmAcceptOrder = () => {
    setActiveOrder(selectedOrder);
    setAvailableOrders(prev => prev.filter(o => o.id !== selectedOrder.id));
    setDeliveryPhase(1);
    setShowAcceptDialog(false);
    setSelectedOrder(null);
    setDriverPosition(driverStartLocation);
  };

  const handleCompleteDelivery = () => {
    const newEarnings = dasherStats.earnings + activeOrder.payout;
    updateDasherStats({
      totalDeliveries: dasherStats.totalDeliveries + 1,
      earnings: newEarnings,
    });
    setActiveOrder(null);
    setDeliveryPhase(0);
    setTimeRemaining(0);
  };

  const getPhaseText = () => {
    switch (deliveryPhase) {
      case 1: return 'Driving to restaurant...';
      case 2: return 'Picking up order...';
      case 3: return 'Delivering to customer...';
      case 4: return 'Delivered!';
      default: return 'Waiting for order';
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#FF3008] text-white">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold">Dasher Mode</h1>
                <p className="text-sm opacity-90">Welcome, {user.name}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleDasherMode}
              className="border-white text-white hover:bg-white hover:text-[#FF3008]"
            >
              Exit
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-green-600">${dasherStats.earnings.toFixed(2)}</p>
              <p className="text-xs text-gray-500">Earnings</p>
            </div>
            <div>
              <p className="text-lg font-bold">{dasherStats.totalDeliveries}</p>
              <p className="text-xs text-gray-500">Deliveries</p>
            </div>
            <div>
              <p className="text-lg font-bold text-yellow-600">⭐ {dasherStats.rating}</p>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[#FF3008]">{dasherStats.acceptanceRate}%</p>
              <p className="text-xs text-gray-500">Acceptance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Active Delivery with Map */}
        {activeOrder && (
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Active Delivery</h2>
              <Badge className="bg-[#FF3008]">
                {getPhaseText()}
              </Badge>
            </div>
            
            {/* Map */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="h-64 relative">
                <MapContainer
                  center={driverPosition || driverStartLocation}
                  zoom={14}
                  style={{ height: '100%', width: '100%' }}
                  zoomControl={false}
                >
                  <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Restaurant */}
                  <Marker position={restaurantLocation} icon={restaurantIcon}>
                    <Popup>{activeOrder.restaurant}</Popup>
                  </Marker>
                  
                  {/* Customer */}
                  <Marker position={customerLocation} icon={customerIcon}>
                    <Popup>Customer</Popup>
                  </Marker>
                  
                  {/* Driver */}
                  {driverPosition && (
                    <Marker position={driverPosition} icon={driverIcon}>
                      <Popup>You</Popup>
                    </Marker>
                  )}
                  
                  {/* Routes */}
                  {deliveryPhase === 1 && (
                    <Polyline positions={pathToRestaurant} color="#FF3008" weight={4} dashArray="10,10" />
                  )}
                  {deliveryPhase >= 3 && (
                    <Polyline positions={pathToCustomer} color="#FF3008" weight={4} />
                  )}
                  
                  <MapUpdater center={driverPosition} />
                </MapContainer>
                
                {/* Time overlay */}
                {timeRemaining > 0 && (
                  <div className="absolute top-4 right-4 bg-white rounded-lg px-4 py-2 shadow-lg z-[1000]">
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-[#FF3008]" />
                      <span className="font-bold">{formatTime(timeRemaining)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Order Card */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{activeOrder.restaurant}</h3>
                    <p className="text-sm text-gray-500">{activeOrder.items} items</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">${activeOrder.payout.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">Your earnings</p>
                  </div>
                </div>
                
                {/* Progress steps */}
                <div className="flex items-center justify-between mb-4 px-4">
                  <div className={`flex flex-col items-center ${deliveryPhase >= 1 ? 'text-[#FF3008]' : 'text-gray-300'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${deliveryPhase >= 1 ? 'bg-[#FF3008] text-white' : 'bg-gray-200'}`}>
                      <Navigation className="w-4 h-4" />
                    </div>
                    <span className="text-xs mt-1">Driving</span>
                  </div>
                  <div className={`flex-1 h-1 mx-2 ${deliveryPhase >= 2 ? 'bg-[#FF3008]' : 'bg-gray-200'}`} />
                  <div className={`flex flex-col items-center ${deliveryPhase >= 2 ? 'text-[#FF3008]' : 'text-gray-300'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${deliveryPhase >= 2 ? 'bg-[#FF3008] text-white' : 'bg-gray-200'}`}>
                      <Package className="w-4 h-4" />
                    </div>
                    <span className="text-xs mt-1">Pickup</span>
                  </div>
                  <div className={`flex-1 h-1 mx-2 ${deliveryPhase >= 3 ? 'bg-[#FF3008]' : 'bg-gray-200'}`} />
                  <div className={`flex flex-col items-center ${deliveryPhase >= 3 ? 'text-[#FF3008]' : 'text-gray-300'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${deliveryPhase >= 3 ? 'bg-[#FF3008] text-white' : 'bg-gray-200'}`}>
                      <Route className="w-4 h-4" />
                    </div>
                    <span className="text-xs mt-1">Deliver</span>
                  </div>
                  <div className={`flex-1 h-1 mx-2 ${deliveryPhase >= 4 ? 'bg-[#FF3008]' : 'bg-gray-200'}`} />
                  <div className={`flex flex-col items-center ${deliveryPhase >= 4 ? 'text-[#FF3008]' : 'text-gray-300'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${deliveryPhase >= 4 ? 'bg-[#FF3008] text-white' : 'bg-gray-200'}`}>
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className="text-xs mt-1">Done</span>
                  </div>
                </div>
                
                {/* Addresses */}
                <div className="space-y-2 text-sm bg-gray-50 p-3 rounded-lg mb-4">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">📍</span>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Pickup</p>
                      <p className="font-medium">{activeOrder.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">🏠</span>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Dropoff</p>
                      <p className="font-medium">{activeOrder.dropoff}</p>
                    </div>
                  </div>
                </div>
                
                {deliveryPhase === 4 ? (
                  <Button
                    onClick={handleCompleteDelivery}
                    className="w-full h-12 bg-green-600 hover:bg-green-700 text-lg"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Complete & Collect ${activeOrder.payout.toFixed(2)}
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Customer
                    </Button>
                    <Button variant="outline" className="flex-1" size="sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      Navigate
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Available Orders */}
        <div>
          <h2 className="text-lg font-bold mb-4">
            {activeOrder ? 'More Orders Nearby' : 'Available Orders'}
          </h2>
          
          {availableOrders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No orders available right now</p>
                <p className="text-sm text-gray-400">Check back in a few minutes</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {availableOrders.map(order => (
                <Card 
                  key={order.id} 
                  className={`hover:shadow-md transition-shadow ${activeOrder ? 'opacity-50' : 'cursor-pointer'}`}
                  onClick={() => !activeOrder && handleAcceptOrder(order)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{order.restaurant}</h3>
                          <Badge variant="secondary" className="text-xs">{order.items} items</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {order.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {order.estimatedTime}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">${order.payout.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">Est. payout</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Accept Order Dialog */}
      <Dialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>New Delivery Request</DialogTitle>
            <DialogDescription>
              Accept this order to start earning
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="text-center py-4">
                <p className="text-4xl font-bold text-green-600">${selectedOrder.payout.toFixed(2)}</p>
                <p className="text-gray-500">Guaranteed earnings</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Restaurant</span>
                  <span className="font-medium">{selectedOrder.restaurant}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance</span>
                  <span className="font-medium">{selectedOrder.distance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Est. Time</span>
                  <span className="font-medium">{selectedOrder.estimatedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Items</span>
                  <span className="font-medium">{selectedOrder.items} items</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAcceptDialog(false)}
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Decline
                </Button>
                <Button 
                  onClick={confirmAcceptOrder}
                  className="flex-1 bg-[#FF3008] hover:bg-[#E02B07]"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Accept
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DasherPage;