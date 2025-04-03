
import React from 'react';
import { MapPin } from 'lucide-react';

interface PharmacyCardProps {
  name: string;
  location: string;
  distance: string;
  price: number;
  imageUrl: string;
  onClick?: () => void;
}

const PharmacyCard: React.FC<PharmacyCardProps> = ({ 
  name, 
  location, 
  distance, 
  price,
  imageUrl,
  onClick 
}) => {
  return (
    <div 
      className="rounded-2xl overflow-hidden bg-white shadow-md animate-fade-in"
      onClick={onClick}
      style={{ animationDelay: '0.2s' }}
    >
      <div className="relative h-32 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-medical-green text-white text-sm font-bold px-3 py-1 rounded-full">
          ₹ {price}
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 truncate">{name}</h3>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <MapPin size={12} className="mr-1" />
          <p className="truncate">{location}</p>
          <span className="ml-auto text-xs font-medium text-gray-600">({distance})</span>
        </div>
      </div>
    </div>
  );
};

export default PharmacyCard;
