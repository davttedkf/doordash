import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, MapPin, CreditCard, Bell, HelpCircle, LogOut, ChevronRight, Shield } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, address, logout, isDasher } = useUser();

  if (!user) {
    navigate('/login');
    return null;
  }

  const menuItems = [
    { icon: User, label: 'Personal Info', description: 'Name, email, phone', action: () => {} },
    { icon: MapPin, label: 'Saved Addresses', description: address, action: () => {} },
    { icon: CreditCard, label: 'Payment Methods', description: '**** 4242', action: () => {} },
    { icon: Bell, label: 'Notifications', description: 'Push, email, SMS', action: () => {} },
    { icon: Shield, label: 'Privacy & Security', description: 'Password, 2FA', action: () => {} },
    { icon: HelpCircle, label: 'Help & Support', description: 'FAQs, contact us', action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Account</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#FF3008] rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              {isDasher && (
                <span className="inline-block mt-1 px-2 py-0.5 bg-[#FF3008]/10 text-[#FF3008] text-xs font-medium rounded-full">
                  Dasher
                </span>
              )}
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
        </div>

        {/* DashPass Promo */}
        <div className="bg-gradient-to-r from-[#FF3008] to-[#FF6347] rounded-xl p-6 text-white">
          <h3 className="font-bold text-lg mb-2">Try DashPass Free</h3>
          <p className="opacity-90 text-sm mb-4">
            Get $0 delivery fees and reduced service fees on eligible orders.
          </p>
          <Button variant="secondary" size="sm">
            Start Free Trial
          </Button>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-xl divide-y">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <item.icon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-gray-500 truncate">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        {/* Sign Out */}
        <Button
          variant="outline"
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>

        {/* App Info */}
        <div className="text-center text-sm text-gray-400 py-4">
          <p>DoorDash Clone v1.0.0</p>
          <p className="mt-1">For demo purposes only</p>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;