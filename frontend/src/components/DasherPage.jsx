import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, Star, TrendingUp, Clock, MapPin, ChevronRight, CheckCircle, XCircle, Navigation } from 'lucide-react';
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

const DasherPage = () => {
  const navigate = useNavigate();
  const { user, isDasher, dasherStats, updateDasherStats, toggleDasherMode } = useUser();
  
  const [availableOrders, setAvailableOrders] = useState(mockDasherOrders);
  const [activeOrder, setActiveOrder] = useState(null);
  const [orderStep, setOrderStep] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);

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
    setOrderStep(1);
    setShowAcceptDialog(false);
    setSelectedOrder(null);
  };

  const handleOrderProgress = () => {
    if (orderStep < 4) {
      setOrderStep(orderStep + 1);
    } else {
      // Complete delivery
      updateDasherStats({
        totalDeliveries: dasherStats.totalDeliveries + 1,
        earnings: dasherStats.earnings + activeOrder.payout,
      });
      setActiveOrder(null);
      setOrderStep(0);
    }
  };

  const orderSteps = [
    'Accept Order',
    'Head to Restaurant',
    'Arrived at Restaurant',
    'Picked Up Order',
    'Delivered',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#FF3008] text-white">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Dasher Dashboard</h1>
                <p className="opacity-90">Welcome back, {user.name}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={toggleDasherMode}
              className="border-white text-white hover:bg-white hover:text-[#FF3008]"
            >
              Exit Dasher Mode
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 -mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">${dasherStats.earnings.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Total Earnings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{dasherStats.totalDeliveries}</p>
              <p className="text-sm text-gray-500">Deliveries</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{dasherStats.rating}</p>
              <p className="text-sm text-gray-500">Rating</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-[#FF3008] mx-auto mb-2" />
              <p className="text-2xl font-bold">{dasherStats.acceptanceRate}%</p>
              <p className="text-sm text-gray-500">Acceptance</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Active Order */}
        {activeOrder && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Active Delivery</h2>
            <Card className="border-2 border-[#FF3008]">
              <CardContent className="p-6">
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-[#FF3008]">{orderSteps[orderStep]}</span>
                    <span className="text-gray-500">Step {orderStep + 1} of 5</span>
                  </div>
                  <Progress value={(orderStep / 4) * 100} className="h-2" />
                </div>

                {/* Order Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Restaurant</p>
                      <p className="font-semibold">{activeOrder.restaurant}</p>
                      <p className="text-sm text-gray-600">{activeOrder.pickup}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Deliver to</p>
                      <p className="font-semibold">{activeOrder.dropoff}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Distance</span>
                      <span className="font-medium">{activeOrder.distance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Items</span>
                      <span className="font-medium">{activeOrder.items} items</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payout</span>
                      <span className="font-bold text-green-600">${activeOrder.payout.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  onClick={handleOrderProgress}
                  className="w-full mt-6 h-12 bg-[#FF3008] hover:bg-[#E02B07] text-lg"
                >
                  {orderStep === 4 ? 'Complete Delivery' : `Mark as ${orderSteps[orderStep + 1]}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Available Orders */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            {activeOrder ? 'Other Available Orders' : 'Available Orders'}
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
            <div className="space-y-4">
              {availableOrders.map(order => (
                <Card 
                  key={order.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => !activeOrder && handleAcceptOrder(order)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{order.restaurant}</h3>
                          <Badge variant="secondary">{order.items} items</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {order.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {order.estimatedTime}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">${order.payout.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Est. payout</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Accept this order?</DialogTitle>
            <DialogDescription>
              You'll need to pick up from {selectedOrder?.restaurant} and deliver to the customer.
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pickup</span>
                  <span className="font-medium">{selectedOrder.pickup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dropoff</span>
                  <span className="font-medium">{selectedOrder.dropoff}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance</span>
                  <span className="font-medium">{selectedOrder.distance}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-gray-600">Your Earnings</span>
                  <span className="font-bold text-green-600 text-lg">${selectedOrder.payout.toFixed(2)}</span>
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