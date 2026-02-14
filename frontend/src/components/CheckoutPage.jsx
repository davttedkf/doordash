import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Clock, Gift, DollarSign } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, currentRestaurant, getSubtotal, clearCart } = useCart();
  const { address, setAddress, addOrder, user } = useUser();
  
  const [tip, setTip] = useState(3);
  const [customTip, setCustomTip] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [editAddressOpen, setEditAddressOpen] = useState(false);
  const [tempAddress, setTempAddress] = useState(address);
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [instructions, setInstructions] = useState('');

  const subtotal = getSubtotal();
  const deliveryFee = currentRestaurant?.deliveryFee || 0;
  const serviceFee = subtotal * 0.05;
  const tax = subtotal * 0.0875;
  const tipAmount = customTip ? parseFloat(customTip) || 0 : tip;
  const total = subtotal + deliveryFee + serviceFee + tax + tipAmount;

  const tipOptions = [0, 2, 3, 5, 8];

  const handlePlaceOrder = async () => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const order = addOrder({
      items: cartItems,
      restaurant: currentRestaurant,
      subtotal,
      deliveryFee,
      serviceFee,
      tax,
      tip: tipAmount,
      total,
      address,
      paymentMethod,
      instructions,
    });

    clearCart();
    navigate(`/order/${order.id}`);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/cart')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Delivery Address */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#FF3008]/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#FF3008]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Delivery Address</h3>
                  <p className="text-gray-600 text-sm">{address}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setEditAddressOpen(true)}>
                Edit
              </Button>
            </div>
          </div>

          {/* Delivery Time */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Estimated Delivery</h3>
                <p className="text-gray-600 text-sm">
                  {currentRestaurant?.deliveryTime} min
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.quantity}x {item.name}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service Fee</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Tip Section */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-5 h-5 text-[#FF3008]" />
              <h3 className="font-semibold">Add a tip for your Dasher</h3>
            </div>
            <div className="flex gap-2 flex-wrap">
              {tipOptions.map(amount => (
                <button
                  key={amount}
                  onClick={() => {
                    setTip(amount);
                    setCustomTip('');
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    tip === amount && !customTip
                      ? 'bg-[#FF3008] text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  ${amount}
                </button>
              ))}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  type="number"
                  placeholder="Other"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  className="w-24 pl-7 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-5 h-5 text-[#FF3008]" />
              <h3 className="font-semibold">Payment Method</h3>
            </div>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex-1 cursor-pointer">
                  <span className="font-medium">Credit/Debit Card</span>
                  <p className="text-sm text-gray-500">**** **** **** 4242</p>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex-1 cursor-pointer">
                  <span className="font-medium">Cash on Delivery</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Promo Code */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="w-5 h-5 text-[#FF3008]" />
              <h3 className="font-semibold">Promo Code</h3>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline">Apply</Button>
            </div>
          </div>

          {/* Delivery Instructions */}
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-semibold mb-4">Delivery Instructions</h3>
            <Input
              placeholder="Add delivery instructions (optional)"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          {/* Total and Place Order */}
          <div className="bg-white rounded-xl p-6 sticky bottom-0 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-2xl">${total.toFixed(2)}</span>
            </div>
            <Button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full h-14 bg-[#FF3008] hover:bg-[#E02B07] text-lg font-semibold"
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Address Dialog */}
      <Dialog open={editAddressOpen} onOpenChange={setEditAddressOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Delivery Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter address..."
                value={tempAddress}
                onChange={(e) => setTempAddress(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              onClick={() => {
                setAddress(tempAddress);
                setEditAddressOpen(false);
              }}
              className="w-full bg-[#FF3008] hover:bg-[#E02B07]"
            >
              Save Address
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutPage;