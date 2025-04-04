
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Pill, Stethoscope, Clock, Activity, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';

const serviceItems = [
  {
    id: 'medications',
    title: 'Medication Reminders',
    description: 'Set up reminders to never miss your medicine doses',
    icon: <Pill className="h-8 w-8 text-medical-teal" />,
  },
  {
    id: 'doctor',
    title: 'Doctor Consultation',
    description: 'Book online or in-person doctor appointments',
    icon: <Stethoscope className="h-8 w-8 text-medical-blue" />,
  },
  {
    id: 'refills',
    title: 'Auto Refills',
    description: 'Set automatic refills for regular medications',
    icon: <Clock className="h-8 w-8 text-medical-orange" />,
  },
  {
    id: 'health',
    title: 'Health Monitoring',
    description: 'Track your health metrics and medication effects',
    icon: <Activity className="h-8 w-8 text-medical-green" />,
  },
  {
    id: 'reports',
    title: 'Medical Reports',
    description: 'Store and access your medical reports digitally',
    icon: <FileText className="h-8 w-8 text-medical-purple" />,
  }
];

const Services = () => {
  const navigate = useNavigate();

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
        
        <h1 className="text-2xl font-bold text-white mb-6">Health Services</h1>
        
        <div className="space-y-4">
          {serviceItems.map(item => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg p-4 shadow-md flex items-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => {
                // Would navigate to specific service in a complete app
                // For now just show toast or alert
                alert(`Service ${item.title} selected - functionality coming soon!`);
              }}
            >
              <div className="mr-4 p-3 rounded-full bg-gray-100">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Services;
