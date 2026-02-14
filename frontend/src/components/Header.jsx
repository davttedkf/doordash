import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, ShoppingBag, User, Menu, X, Search, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Input } from './ui/input';
import LocationPicker from './LocationPicker';

const Header = () => {
  const navigate = useNavigate();
  const { getTotalItems, currentRestaurant } = useCart();
  const { user, address, setAddress, setDeliveryLocation, isDasher, toggleDasherMode, logout } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationPickerOpen, setLocationPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLocationSelect = (locationData) => {
    setAddress(locationData.address);
    if (setDeliveryLocation) {
      setDeliveryLocation(locationData.coordinates);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const totalItems = getTotalItems();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#FF3008] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">DoorDash</span>
            </Link>

            {/* Delivery Address - Desktop */}
            <button 
              onClick={() => setLocationPickerOpen(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MapPin className="w-5 h-5 text-[#FF3008]" />
              <span className="text-sm font-medium text-gray-900 max-w-[200px] truncate">
                {address}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search restaurants, food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-[#FF3008]"
                />
              </div>
            </form>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Dasher Mode Toggle */}
              {user && (
                <Button
                  variant={isDasher ? "default" : "outline"}
                  size="sm"
                  onClick={toggleDasherMode}
                  className={`hidden sm:flex ${isDasher ? 'bg-[#FF3008] hover:bg-[#E02B07]' : ''}`}
                >
                  {isDasher ? 'Dasher Mode' : 'Become a Dasher'}
                </Button>
              )}

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/cart')}
                className="relative"
              >
                <ShoppingBag className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF3008] text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => navigate('/account')}>
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/orders')}>
                      Orders
                    </DropdownMenuItem>
                    {isDasher && (
                      <DropdownMenuItem onClick={() => navigate('/dasher')}>
                        Dasher Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="bg-[#FF3008] hover:bg-[#E02B07]"
                >
                  Sign In
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Secondary Nav - Categories link */}
        <div className="hidden md:block border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-6 h-12 text-sm">
              <Link to="/" className="font-medium text-gray-900 hover:text-[#FF3008] transition-colors">Delivery</Link>
              <Link to="/pickup" className="text-gray-600 hover:text-[#FF3008] transition-colors">Pickup</Link>
              <Link to="/categories" className="text-gray-600 hover:text-[#FF3008] transition-colors">All Categories</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-bold text-lg">Menu</span>
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 bg-gray-100 border-0 rounded-full"
                  />
                </div>
              </form>

              {/* Mobile Address */}
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAddressDialogOpen(true);
                }}
                className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <MapPin className="w-5 h-5 text-[#FF3008]" />
                <span className="text-sm text-gray-900 truncate">{address}</span>
              </button>

              {/* Mobile Links */}
              <nav className="space-y-2">
                <Link 
                  to="/" 
                  className="block p-3 rounded-lg hover:bg-gray-100 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/orders" 
                  className="block p-3 rounded-lg hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Orders
                </Link>
                {user && (
                  <button
                    onClick={() => {
                      toggleDasherMode();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-100"
                  >
                    {isDasher ? 'Exit Dasher Mode' : 'Become a Dasher'}
                  </button>
                )}
                {isDasher && (
                  <Link 
                    to="/dasher" 
                    className="block p-3 rounded-lg hover:bg-gray-100 text-[#FF3008]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dasher Dashboard
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Address Dialog */}
      <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your delivery address</DialogTitle>
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
              onClick={handleAddressSave}
              className="w-full bg-[#FF3008] hover:bg-[#E02B07]"
            >
              Save Address
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;