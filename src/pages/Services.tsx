
import React from 'react';
import { Stethoscope, Pills, Thermometer, Activity, Syringe, FileText, Baby, HeartPulse } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import MobileLayout from '@/components/layout/MobileLayout';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, onClick }) => (
  <Card 
    className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer animate-fade-in" 
    onClick={onClick}
  >
    <CardContent className="p-6 flex flex-col items-center text-center">
      <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-medium text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </CardContent>
  </Card>
);

const Services = () => {
  const services = [
    {
      icon: <Stethoscope size={24} className="text-accent" />,
      title: "Doctor Consultation",
      description: "Connect with verified doctors for online consultations"
    },
    {
      icon: <Pills size={24} className="text-accent" />,
      title: "Medicine Delivery",
      description: "Get your prescribed medicines delivered to your home"
    },
    {
      icon: <Thermometer size={24} className="text-accent" />,
      title: "Health Checkup",
      description: "Book full body checkups and tests at affordable rates"
    },
    {
      icon: <Activity size={24} className="text-accent" />,
      title: "Health Tracker",
      description: "Monitor your vitals and medicine schedule"
    },
    {
      icon: <Syringe size={24} className="text-accent" />,
      title: "Vaccination",
      description: "Book your vaccination slots at nearby centers"
    },
    {
      icon: <FileText size={24} className="text-accent" />,
      title: "Health Records",
      description: "Store and access your medical records securely"
    },
    {
      icon: <Baby size={24} className="text-accent" />,
      title: "Child Care",
      description: "Specialized services for child healthcare"
    },
    {
      icon: <HeartPulse size={24} className="text-accent" />,
      title: "Chronic Care",
      description: "Specialized care for chronic conditions"
    }
  ];

  return (
    <MobileLayout>
      <div className="p-4">
        <div className="bg-gradient-to-br from-accent to-accent/80 rounded-lg p-6 mb-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Our Services</h1>
          <p className="text-sm opacity-90">
            Comprehensive healthcare services at your fingertips
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Services;
