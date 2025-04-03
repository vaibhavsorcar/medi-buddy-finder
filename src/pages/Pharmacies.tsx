
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search as SearchIcon, MapPin, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';

interface Pharmacy {
  id: string;
  name: string;
  location: string;
  distance: string;
  price: number;
  imageUrl: string;
  type: string;
}

const Pharmacies = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  // Mock data for pharmacies - in a real app would fetch from API
  const pharmacies: Pharmacy[] = [
    {
      id: '1',
      name: 'Prakash Medicals',
      location: 'BTM Layout, Bangalore',
      distance: '0.9 Km',
      price: 30,
      imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=300&auto=format&fit=crop',
      type: 'generic'
    },
    {
      id: '2',
      name: 'Kamat Medicals',
      location: 'JP Nagar, Bangalore',
      distance: '1.6 Km',
      price: 36,
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop',
      type: 'generic'
    },
    {
      id: '3',
      name: 'Apollo Pharmacy',
      location: 'Jayanagar, Bangalore',
      distance: '2 Km',
      price: 40,
      imageUrl: 'https://images.unsplash.com/photo-1583912086096-8875e8810a89?q=80&w=300&auto=format&fit=crop',
      type: 'chain'
    },
    {
      id: '4',
      name: 'Jana Aushadhi Kendra',
      location: 'Koramangala, Bangalore',
      distance: '2.4 Km',
      price: 20,
      imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=300&auto=format&fit=crop',
      type: 'government'
    },
    {
      id: '5',
      name: 'MedPlus Pharmacy',
      location: 'HSR Layout, Bangalore',
      distance: '3.1 Km',
      price: 38,
      imageUrl: 'https://images.unsplash.com/photo-1579154392429-0e6b4e850ad3?q=80&w=300&auto=format&fit=crop',
      type: 'chain'
    },
    {
      id: '6',
      name: 'People\'s Pharmacy',
      location: 'Indiranagar, Bangalore',
      distance: '4.5 Km',
      price: 32,
      imageUrl: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=300&auto=format&fit=crop',
      type: 'generic'
    },
    {
      id: '7',
      name: 'Government Dispensary',
      location: 'Shivaji Nagar, Bangalore',
      distance: '5.2 Km',
      price: 15,
      imageUrl: 'https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?q=80&w=300&auto=format&fit=crop',
      type: 'government'
    }
  ];

  const handleFilterChange = (type: string) => {
    setFilterType(type);
  };

  const handlePharmacyClick = (id: string) => {
    navigate(`/pharmacy/${id}`);
  };

  const filteredPharmacies = pharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pharmacy.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || pharmacy.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <MobileLayout>
      <div className="p-4">
        <Button 
          variant="ghost" 
          className="text-white p-0 mb-4" 
          onClick={() => navigate('/')}
        >
          <ChevronLeft size={24} />
          <span className="ml-2">Back to Home</span>
        </Button>

        <h1 className="text-2xl font-bold text-white mb-4">Nearby Pharmacies</h1>
        
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="search"
            className="bg-white w-full p-3 pl-10 text-sm rounded-full border-none shadow-md"
            placeholder="Search pharmacies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
          {['all', 'generic', 'chain', 'government'].map(type => (
            <button
              key={type}
              className={`py-2 px-4 text-sm rounded-full whitespace-nowrap ${
                filterType === type 
                  ? 'bg-accent text-white' 
                  : 'bg-white/30 text-white'
              }`}
              onClick={() => handleFilterChange(type)}
            >
              {type === 'all' ? 'All Pharmacies' : 
               type === 'generic' ? 'Local Pharmacies' : 
               type === 'chain' ? 'Chain Stores' : 
               'Jan Aushadhi'}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {filteredPharmacies.map((pharmacy) => (
            <div 
              key={pharmacy.id}
              className="bg-white rounded-lg overflow-hidden shadow-md animate-fade-in"
              onClick={() => handlePharmacyClick(pharmacy.id)}
            >
              <div className="h-32 overflow-hidden">
                <img 
                  src={pharmacy.imageUrl} 
                  alt={pharmacy.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-medical-green text-white text-xs font-bold px-2 py-1 rounded-full">
                  ₹ {pharmacy.price}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-800 text-sm">{pharmacy.name}</h3>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <MapPin size={12} className="mr-1 flex-shrink-0" />
                  <p className="truncate">{pharmacy.location}</p>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600">{pharmacy.distance}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    pharmacy.type === 'government' 
                      ? 'bg-blue-100 text-blue-700' 
                      : pharmacy.type === 'chain'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {pharmacy.type === 'government' 
                      ? 'Jan Aushadhi' 
                      : pharmacy.type === 'chain'
                      ? 'Chain Store'
                      : 'Local Store'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPharmacies.length === 0 && (
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center mt-4">
            <p className="text-white">No pharmacies found matching your criteria</p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Pharmacies;
