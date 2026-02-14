import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageSquare, MapPin, CheckCircle2, Circle, Clock, User, Car } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { mockDashers, orderStatuses } from '../data/mockData';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useUser();
  
  const order = orders.find(o => o.id === orderId);
  const [currentStatus, setCurrentStatus] = useState(order?.status || 1);
  const [dasher, setDasher] = useState(null);

  // Simulate order progress
  useEffect(() => {
    if (!order) return;

    // Assign a random dasher when status reaches 4
    if (currentStatus >= 4 && !dasher) {
      const randomDasher = mockDashers[Math.floor(Math.random() * mockDashers.length)];
      setDasher(randomDasher);
    }

    // Auto-progress through statuses for demo
    if (currentStatus < 6) {
      const timer = setTimeout(() => {
        const newStatus = currentStatus + 1;
        setCurrentStatus(newStatus);
        updateOrderStatus(orderId, newStatus);
      }, 8000); // Progress every 8 seconds

      return () => clearTimeout(timer);
    }
  }, [currentStatus, order, orderId, updateOrderStatus, dasher]);

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'receipt': return <CheckCircle2 className="w-6 h-6" />;
      case 'chef': return <Clock className="w-6 h-6" />;
      case 'package': return <CheckCircle2 className="w-6 h-6" />;
      case 'bike': return <User className="w-6 h-6" />;
      case 'truck': return <Car className="w-6 h-6" />;
      case 'check': return <CheckCircle2 className="w-6 h-6" />;
      default: return <Circle className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/orders')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold">Order #{orderId.slice(-6)}</h1>
              <p className="text-sm text-gray-500">{currentStatusInfo.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Map Placeholder */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="relative h-64 bg-gradient-to-br from-green-100 to-green-200">
            {/* Simulated Map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF3008] rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <p className="font-medium text-gray-700">
                  {currentStatus < 5 ? 'Preparing your order' : 'Your order is on the way!'}
                </p>
              </div>
            </div>
            
            {/* Address Pin */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FF3008]" />
              <span className="text-sm font-medium">{order.address}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Order Status</span>
            <span className="text-sm font-medium text-[#FF3008]">
              {currentStatus === 6 ? 'Delivered!' : `Step ${currentStatus} of 6`}
            </span>
          </div>
          <Progress value={progressPercent} className="h-2 mb-6" />
          
          {/* Status Steps */}
          <div className="space-y-4">
            {orderStatuses.map((status, index) => {
              const isCompleted = currentStatus > index + 1;
              const isCurrent = currentStatus === index + 1;
              
              return (
                <div 
                  key={status.id}
                  className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                    isCurrent ? 'bg-[#FF3008]/10' : isCompleted ? 'opacity-60' : 'opacity-40'
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

        {/* Order Details */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Order Details</h3>
          
          {/* Restaurant */}
          <div className="flex items-center gap-4 mb-4 pb-4 border-b">
            <img
              src={order.restaurant.image}
              alt={order.restaurant.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <p className="font-medium">{order.restaurant.name}</p>
              <p className="text-sm text-gray-500">{order.items.length} items</p>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-2 mb-4">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t pt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
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