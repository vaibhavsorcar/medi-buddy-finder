
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, UserRound } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import UserProfile from '@/components/user/UserProfile';
import SearchBar from '@/components/search/SearchBar';
import PharmacyCard from '@/components/pharmacy/PharmacyCard';
import FeatureCard from '@/components/common/FeatureCard';
import SectionTitle from '@/components/common/SectionTitle';

const Index = () => {
  const navigate = useNavigate();

  // Mock data for pharmacies
  const nearbyPharmacies = [
    {
      id: '1',
      name: 'Prakash Medicals',
      location: 'BTM Layout, Bangalore',
      distance: '0.9 Km',
      price: 30,
      imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: '2',
      name: 'Kamat Medicals',
      location: 'JP Nagar, Bangalore',
      distance: '1.6 Km',
      price: 36,
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: '3',
      name: 'Apollo Pharmacy',
      location: 'Jayanagar, Bangalore',
      distance: '2 Km',
      price: 40,
      imageUrl: 'https://images.unsplash.com/photo-1583912086096-8875e8810a89?q=80&w=300&auto=format&fit=crop'
    }
  ];

  const handleSearchMedicine = (query: string) => {
    // In a real app, this would search the medicine database
    console.log('Searching for:', query);
    navigate(`/search?q=${query}`);
  };

  const handlePharmacyClick = (id: string) => {
    navigate(`/pharmacy/${id}`);
  };

  const handleMedicineDetailClick = () => {
    navigate('/medicine/dolo650');
  };

  return (
    <MobileLayout>
      <div className="flex flex-col p-4">
        <h1 className="text-center text-white text-3xl font-bold my-4">MediBuddy</h1>
        
        <UserProfile 
          name="Ashita C"
          email="ashitacc@gmail.com"
          avatarUrl="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop"
          notificationCount={1}
        />
        
        <div className="mt-6">
          <SearchBar 
            placeholder="Search for medicines..." 
            onSearch={handleSearchMedicine}
          />
        </div>
        
        <div className="mt-6">
          <SectionTitle title="Featured Medicine" linkTo="/medicines" />
          
          <div 
            className="bg-white rounded-lg p-4 flex gap-3 shadow-md animate-fade-in"
            style={{ animationDelay: '0.1s' }}
            onClick={handleMedicineDetailClick}
          >
            <div className="w-1/3">
              <img 
                src="/lovable-uploads/92490f7a-fd7a-44cc-a221-49265e903b5e.png"
                alt="Dolo 650"
                className="rounded-md object-cover h-24 w-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">DOLO 650</h3>
              <p className="text-xs text-gray-500 mb-2">Paracetamol 650mg</p>
              <div className="flex gap-2">
                <span className="price-tag">₹ 30</span>
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock size={12} className="mr-1" />
                  Available
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <SectionTitle title="Near You" linkTo="/nearby" />
          
          <div className="grid grid-cols-3 gap-3">
            {nearbyPharmacies.map((pharmacy) => (
              <PharmacyCard
                key={pharmacy.id}
                name={pharmacy.name}
                location={pharmacy.location}
                distance={pharmacy.distance}
                price={pharmacy.price}
                imageUrl={pharmacy.imageUrl}
                onClick={() => handlePharmacyClick(pharmacy.id)}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <SectionTitle title="Other Services" />
          
          <div className="grid grid-cols-2 gap-3">
            <FeatureCard
              title="Book a Physician"
              description="Connect with trusted doctors for online consultations"
              icon={<UserRound className="h-8 w-8 text-medical-teal" />}
              onClick={() => navigate('/book-doctor')}
            />
            <FeatureCard
              title="Daily Reminders"
              description="Set reminders to take your medicines on time"
              icon={<Clock className="h-8 w-8 text-medical-orange" />}
              onClick={() => navigate('/reminders')}
            />
          </div>
          
          <button 
            className="w-full mt-4 py-3 bg-medical-orange text-white font-medium rounded-full shadow-lg flex items-center justify-center animate-fade-in"
            style={{ animationDelay: '0.4s' }}
            onClick={() => navigate('/alternatives')}
          >
            Find Alternatives
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
