
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MobileLayout from '@/components/layout/MobileLayout';

const MedicineDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock data - in a real app would come from an API
  const medicineInfo = {
    name: 'DOLO 650',
    image1: '/lovable-uploads/92490f7a-fd7a-44cc-a221-49265e903b5e.png',
    image2: '/lovable-uploads/a764832a-5a1a-4a7a-917c-85b0e28fe83c.png',
    pharmacy: 'Prakash Medicals BTM Layout',
    distance: '0.9 Km',
    composition: 'Paracetamol 650mg',
    description: 'Dolo 650 is used for pain relief and fever reduction. It contains Paracetamol (Acetaminophen) 650mg as its active ingredient.',
    uses: 'Relief from headache, toothache, backache, period pain, and reducing fever.',
    directions: 'Take 1 tablet every 4-6 hours as needed, not exceeding 4 tablets in 24 hours.',
    howWorks: 'It works by blocking the production of certain chemicals that cause pain and fever.',
    sideEffects: 'Side effects are rare but may include nausea, abdominal discomfort, and allergic reactions.',
    moreInfo: 'Not recommended for children under 12 years without medical advice.'
  };

  return (
    <MobileLayout>
      <div className="p-4">
        <Button 
          variant="ghost" 
          className="text-white p-0" 
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={24} />
          <span className="ml-2">Back</span>
        </Button>
        
        <div className="my-4">
          <h1 className="text-2xl font-bold text-white">{medicineInfo.name}</h1>
          <p className="text-white/70 text-sm">{medicineInfo.pharmacy} ({medicineInfo.distance})</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 my-6">
          <div className="bg-white rounded-xl p-4 h-40 flex items-center justify-center">
            <img src={medicineInfo.image1} alt={medicineInfo.name} className="max-h-full object-contain" />
          </div>
          <div className="bg-white rounded-xl p-4 h-40 flex items-center justify-center">
            <img src={medicineInfo.image2} alt={medicineInfo.name} className="max-h-full object-contain" />
          </div>
          <div className="col-span-1 bg-black/10 backdrop-blur-sm rounded-xl p-4 h-40 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <Play size={48} className="text-white mb-2" />
              <p className="text-white text-sm font-semibold">How to use</p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="composition" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4 bg-white/20">
            <TabsTrigger value="composition" className="text-white data-[state=active]:text-accent data-[state=active]:bg-white/10">Info</TabsTrigger>
            <TabsTrigger value="uses" className="text-white data-[state=active]:text-accent data-[state=active]:bg-white/10">Uses</TabsTrigger>
            <TabsTrigger value="side-effects" className="text-white data-[state=active]:text-accent data-[state=active]:bg-white/10">Side Effects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="composition" className="bg-white/10 rounded-xl p-4 text-white animate-fade-in">
            <h3 className="font-semibold mb-2">Composition</h3>
            <p className="mb-4">{medicineInfo.composition}</p>
            
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="mb-4">{medicineInfo.description}</p>
            
            <h3 className="font-semibold mb-2">How it works</h3>
            <p>{medicineInfo.howWorks}</p>
          </TabsContent>
          
          <TabsContent value="uses" className="bg-white/10 rounded-xl p-4 text-white animate-fade-in">
            <h3 className="font-semibold mb-2">Uses</h3>
            <p className="mb-4">{medicineInfo.uses}</p>
            
            <h3 className="font-semibold mb-2">Directions of use</h3>
            <p>{medicineInfo.directions}</p>
          </TabsContent>
          
          <TabsContent value="side-effects" className="bg-white/10 rounded-xl p-4 text-white animate-fade-in">
            <h3 className="font-semibold mb-2">Side effects</h3>
            <p className="mb-4">{medicineInfo.sideEffects}</p>
            
            <h3 className="font-semibold mb-2">More information</h3>
            <p className="mb-4">{medicineInfo.moreInfo}</p>
            
            <div className="mt-4 bg-white/5 p-3 rounded-lg flex items-center">
              <Info size={20} className="text-white mr-2" />
              <p className="text-sm">Consult your doctor for more detailed information.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default MedicineDetail;
