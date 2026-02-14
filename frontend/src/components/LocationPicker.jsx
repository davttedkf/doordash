import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom home icon
const homeIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="background:#FF3008;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);font-size:20px;">🏠</div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// Map click handler
const MapClickHandler = ({ onLocationSelect }) => {
  useMapEvents({
    click: (e) => {
      onLocationSelect([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

// Map center updater
const MapCenterUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 15);
    }
  }, [center, map]);
  return null;
};

// Predefined locations (simulating search results)
const suggestedLocations = [
  { name: '123 Main Street, San Francisco, CA', coords: [37.7749, -122.4194] },
  { name: '456 Market Street, San Francisco, CA', coords: [37.7899, -122.4004] },
  { name: '789 Mission Street, San Francisco, CA', coords: [37.7855, -122.4064] },
  { name: '321 Castro Street, San Francisco, CA', coords: [37.7609, -122.4350] },
  { name: '555 Valencia Street, San Francisco, CA', coords: [37.7632, -122.4216] },
];

const LocationPicker = ({ open, onClose, onLocationSelect, currentAddress }) => {
  const [selectedLocation, setSelectedLocation] = useState([37.7749, -122.4194]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addressText, setAddressText] = useState(currentAddress || '');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter suggestions based on search
  const filteredSuggestions = suggestedLocations.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationClick = (coords) => {
    setSelectedLocation(coords);
    // Reverse geocode simulation - find closest suggested address
    const closest = suggestedLocations.reduce((prev, curr) => {
      const prevDist = Math.abs(prev.coords[0] - coords[0]) + Math.abs(prev.coords[1] - coords[1]);
      const currDist = Math.abs(curr.coords[0] - coords[0]) + Math.abs(curr.coords[1] - coords[1]);
      return currDist < prevDist ? curr : prev;
    });
    setAddressText(closest.name);
  };

  const handleSuggestionClick = (location) => {
    setSelectedLocation(location.coords);
    setAddressText(location.name);
    setSearchQuery(location.name);
    setShowSuggestions(false);
  };

  const handleConfirm = () => {
    onLocationSelect({
      address: addressText,
      coordinates: selectedLocation,
    });
    onClose();
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.latitude, position.coords.longitude];
          setSelectedLocation(coords);
          setAddressText('Current Location');
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to default SF location
          setSelectedLocation([37.7749, -122.4194]);
          setAddressText('123 Main Street, San Francisco, CA');
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Set Delivery Location</DialogTitle>
        </DialogHeader>
        
        <div className="p-4 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for address..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSuggestions(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            
            {/* Suggestions Dropdown */}
            {showSuggestions && searchQuery && (
              <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg mt-1 z-50 max-h-48 overflow-y-auto">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((loc, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(loc)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b last:border-0"
                    >
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm">{loc.name}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500">No results found</div>
                )}
              </div>
            )}
          </div>

          {/* Use Current Location Button */}
          <Button
            variant="outline"
            onClick={handleUseCurrentLocation}
            className="w-full"
          >
            <Navigation className="w-4 h-4 mr-2" />
            Use Current Location
          </Button>

          {/* Map */}
          <div className="h-64 rounded-lg overflow-hidden border">
            <MapContainer
              center={selectedLocation}
              zoom={15}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={selectedLocation} icon={homeIcon} />
              <MapClickHandler onLocationSelect={handleLocationClick} />
              <MapCenterUpdater center={selectedLocation} />
            </MapContainer>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Tap on the map to select your delivery location
          </p>

          {/* Selected Address */}
          {addressText && (
            <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF3008]/10 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#FF3008]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Deliver to</p>
                <p className="font-medium text-sm">{addressText}</p>
              </div>
            </div>
          )}

          {/* Confirm Button */}
          <Button
            onClick={handleConfirm}
            className="w-full h-12 bg-[#FF3008] hover:bg-[#E02B07]"
            disabled={!addressText}
          >
            Confirm Location
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationPicker;
