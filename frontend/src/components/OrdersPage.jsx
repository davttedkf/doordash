import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Package, Clock, ChevronRight, Star } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { orderStatuses } from '../data/mockData';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

const OrdersPage = () => {
  const navigate = useNavigate();
  const { orders } = useUser();

  const activeOrders = orders.filter(o => o.status < 6);
  const pastOrders = orders.filter(o => o.status === 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Your Orders</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">When you place an order, it will appear here</p>
            <Button onClick={() => navigate('/')} className="bg-[#FF3008] hover:bg-[#E02B07]">
              Start Ordering
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="active">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="active" className="flex-1">
                Active ({activeOrders.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="flex-1">
                Past ({pastOrders.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {activeOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No active orders</p>
                </div>
              ) : (
                activeOrders.map(order => (
                  <OrderCard key={order.id} order={order} />
                ))
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No past orders</p>
                </div>
              ) : (
                pastOrders.map(order => (
                  <OrderCard key={order.id} order={order} isPast />
                ))
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

const OrderCard = ({ order, isPast }) => {
  const navigate = useNavigate();
  const statusInfo = orderStatuses[order.status - 1];

  return (
    <div 
      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/order/${order.id}`)}
    >
      <div className="flex items-start gap-4">
        <img
          src={order.restaurant.image}
          alt={order.restaurant.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{order.restaurant.name}</h3>
              <p className="text-sm text-gray-500">
                {order.items.length} items • ${order.total.toFixed(2)}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          
          {!isPast ? (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-[#FF3008]/10 rounded-full">
                <div className="w-2 h-2 bg-[#FF3008] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-[#FF3008]">
                  {statusInfo.name}
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-3 flex items-center gap-3">
              <Badge variant="secondary">
                Delivered
              </Badge>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;