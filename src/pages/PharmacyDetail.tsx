
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Star, Navigation2, Phone, Clock, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';
import { toast } from 'sonner';

interface Medicine {
  id: string;
  name: string;
  composition: string;
  price: number;
  availability: string;
  image: string;
}

const PharmacyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  // Mock data - in a real app would fetch from API based on ID
  const pharmacyData = {
    id: id || '1',
    name: id === '1' ? 'Prakash Medicals' : id === '2' ? 'Kamat Medicals' : 'Apollo Pharmacy',
    location: id === '1' ? 'BTM Layout, Bangalore' : id === '2' ? 'JP Nagar, Bangalore' : 'Jayanagar, Bangalore',
    distance: id === '1' ? '0.9 Km' : id === '2' ? '1.6 Km' : '2 Km',
    rating: 4.5,
    reviewCount: 120,
    openingHours: '8:00 AM - 10:00 PM',
    phone: '+91 98765 43210',
    imageUrl: id === '1' 
      ? 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=800&auto=format&fit=crop' 
      : id === '2' 
      ? 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop'
      : 'https://images.unsplash.com/photo-1583912086096-8875e8810a89?q=80&w=800&auto=format&fit=crop',
    availableMedicines: [
      {
        id: 'dolo650',
        name: 'DOLO 650',
        composition: 'Paracetamol 650mg',
        price: 30,
        availability: 'In Stock',
        image: '/lovable-uploads/92490f7a-fd7a-44cc-a221-49265e903b5e.png',
      },
      {
        id: 'calpol500',
        name: 'Calpol 500',
        composition: 'Paracetamol 500mg',
        price: 25,
        availability: 'In Stock',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop',
      },
    ]
  };

  const handleStartNavigation = () => {
    toast.success("Starting navigation", {
      description: `Directions to ${pharmacyData.name}`
    });
    // In a real app, this would open the maps application or embed a map
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pharmacyData.name + ' ' + pharmacyData.location)}`, '_blank');
  };

  const handleCall = () => {
    toast.info("Calling pharmacy", {
      description: pharmacyData.phone
    });
    window.location.href = `tel:${pharmacyData.phone}`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Ozy - ${pharmacyData.name}`,
        text: `Check out ${pharmacyData.name} on Ozy!`,
        url: window.location.href,
      })
      .catch((error) => toast.error('Error sharing:', error));
    } else {
      toast.success("Link copied to clipboard!");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleMedicineClick = (medicineId: string) => {
    navigate(`/medicine/${medicineId}`);
  };

  return (
    <MobileLayout>
      <div className="relative">
        <div className="h-64 w-full relative">
          <img 
            src={pharmacyData.imageUrl} 
            alt={pharmacyData.name} 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <Button 
            variant="ghost" 
            className="absolute top-4 left-4 text-white p-2 bg-black/20 rounded-full" 
            onClick={() => navigate(-1)}
            size="icon"
          >
            <ChevronLeft size={24} />
          </Button>
          
          <Button 
            variant="ghost" 
            className={`absolute top-4 right-4 text-white p-2 ${isSaved ? 'bg-accent/70' : 'bg-black/20'} rounded-full`} 
            onClick={() => setIsSaved(!isSaved)}
            size="icon"
          >
            <Bookmark size={24} fill={isSaved ? 'currentColor' : 'none'} />
          </Button>
        </div>
        
        <div className="p-4 pt-0 mt-[-2rem] relative z-10 bg-gradient-medical rounded-t-3xl">
          <div className="bg-white rounded-xl p-4 shadow-lg -mt-8">
            <h1 className="text-xl font-bold">{pharmacyData.name}</h1>
            
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={14} className="text-gray-500" />
              <p className="text-sm text-gray-500">{pharmacyData.location}</p>
              <span className="ml-auto text-xs font-medium text-gray-600">({pharmacyData.distance})</span>
            </div>
            
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <Star size={16} className="text-medical-orange fill-medical-orange" />
                <span className="text-sm font-semibold ml-1">{pharmacyData.rating}</span>
                <span className="text-xs text-gray-500 ml-1">({pharmacyData.reviewCount} reviews)</span>
              </div>
              <div className="ml-auto text-xs text-gray-500 flex items-center">
                <Clock size={14} className="mr-1" />
                {pharmacyData.openingHours}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-4">
              <Button 
                className="flex flex-col items-center justify-center h-20 bg-accent/10 hover:bg-accent/20 text-accent"
                onClick={handleStartNavigation}
              >
                <Navigation2 size={24} />
                <span className="text-xs mt-1">Navigate</span>
              </Button>
              
              <Button
                className="flex flex-col items-center justify-center h-20 bg-green-100 hover:bg-green-200 text-green-700"
                onClick={handleCall}
              >
                <Phone size={24} />
                <span className="text-xs mt-1">Call</span>
              </Button>
              
              <Button
                className="flex flex-col items-center justify-center h-20 bg-blue-100 hover:bg-blue-200 text-blue-700"
                onClick={handleShare}
              >
                <Share2 size={24} />
                <span className="text-xs mt-1">Share</span>
              </Button>
            </div>
          </div>
          
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-white mb-3">Available Medicines</h2>
            <div className="space-y-3">
              {pharmacyData.availableMedicines.map((medicine) => (
                <div 
                  key={medicine.id}
                  className="bg-white rounded-lg p-3 flex items-center shadow-md animate-fade-in"
                  onClick={() => handleMedicineClick(medicine.id)}
                >
                  <div className="h-16 w-16 mr-4">
                    <img 
                      src={medicine.image} 
                      alt={medicine.name} 
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{medicine.name}</h3>
                    <p className="text-xs text-gray-500">{medicine.composition}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-sm font-bold text-medical-green mr-3">₹{medicine.price}</span>
                      <span className="text-xs text-gray-500">{medicine.availability}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default PharmacyDetail;
