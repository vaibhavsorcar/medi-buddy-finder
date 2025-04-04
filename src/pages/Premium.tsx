
import React from 'react';
import { Check, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

interface PlanFeature {
  included: boolean;
  text: string;
}

interface PlanProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  recommended?: boolean;
  onSelect: () => void;
}

const PlanCard: React.FC<PlanProps> = ({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  recommended = false,
  onSelect 
}) => {
  return (
    <Card className={`relative overflow-hidden ${recommended ? 'border-accent border-2' : ''}`}>
      {recommended && (
        <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
          RECOMMENDED
        </div>
      )}
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-gray-500 text-sm mb-4">{description}</p>
        
        <div className="mb-6">
          <span className="text-3xl font-bold">₹{price}</span>
          <span className="text-gray-500 text-sm">/{period}</span>
        </div>
        
        <div className="space-y-2">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-2"
            >
              {feature.included ? (
                <Check size={18} className="text-medical-green" />
              ) : (
                <div className="w-[18px] h-[18px] flex items-center justify-center">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
              )}
              <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={onSelect}
          className={`${recommended ? 'bg-accent hover:bg-accent/90' : ''} w-full shadow-md hover:shadow-lg transition-shadow py-6 text-base font-semibold`}
          variant={recommended ? 'default' : 'outline'}
          size="lg"
        >
          Choose Plan
        </Button>
      </CardFooter>
    </Card>
  );
};

const Premium = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (planName: string) => {
    toast.success(`You've selected the ${planName} plan`, {
      description: "Redirecting to payment..."
    });
    // In a real app, redirect to checkout/payment page
  };

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
        
        <div className="bg-gradient-to-br from-accent to-accent/80 rounded-lg p-6 mb-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Ozy Premium</h1>
          <p className="text-sm opacity-90">
            Get exclusive access to special features and discounts
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <PlanCard 
            name="Basic"
            price="0"
            period="month"
            description="Essential features for everyone"
            features={[
              { included: true, text: "Medicine search and comparison" },
              { included: true, text: "Find nearby pharmacies" },
              { included: true, text: "Basic medication reminders" },
              { included: false, text: "Home delivery priority" },
              { included: false, text: "24/7 pharmacist consultation" },
              { included: false, text: "Exclusive discounts" }
            ]}
            onSelect={() => handleSelectPlan('Basic')}
          />
          
          <PlanCard 
            name="Premium"
            price="199"
            period="month"
            description="Enhanced features for better healthcare"
            features={[
              { included: true, text: "All Basic plan features" },
              { included: true, text: "Free home delivery" },
              { included: true, text: "Priority customer support" },
              { included: true, text: "10% discount on all medicines" },
              { included: true, text: "Family account (up to 4 members)" },
              { included: false, text: "24/7 doctor consultation" }
            ]}
            recommended={true}
            onSelect={() => handleSelectPlan('Premium')}
          />
          
          <PlanCard 
            name="Family"
            price="499"
            period="month"
            description="Complete coverage for the whole family"
            features={[
              { included: true, text: "All Premium plan features" },
              { included: true, text: "Family account (up to 6 members)" },
              { included: true, text: "24/7 doctor consultation" },
              { included: true, text: "Health records management" },
              { included: true, text: "15% discount on all medicines" },
              { included: true, text: "Seasonal health checkup (bi-annual)" }
            ]}
            onSelect={() => handleSelectPlan('Family')}
          />
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Why go Premium?</h3>
          <p className="text-sm text-gray-600">
            Ozy Premium gives you and your family access to exclusive features, priority delivery, and special discounts on medicines. Subscribe today for a better healthcare experience!
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Premium;
