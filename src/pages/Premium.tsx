
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, Star, Shield, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';
import { toast } from 'sonner';

const Premium = () => {
  const navigate = useNavigate();

  const subscriptionPlans = [
    {
      name: 'Monthly',
      price: '₹99',
      duration: 'per month',
      features: [
        'Priority medicine searching',
        'No ads experience',
        'Exclusive discounts',
        'Medicine price alerts'
      ],
      popular: false,
      color: 'bg-gradient-to-br from-blue-500 to-purple-500',
      icon: <Star className="h-6 w-6" />
    },
    {
      name: 'Quarterly',
      price: '₹249',
      duration: 'for 3 months',
      features: [
        'All Monthly features',
        'Medicine reminder',
        '24/7 pharmacist chat',
        'Advanced price comparison'
      ],
      popular: true,
      color: 'bg-gradient-to-br from-accent to-purple-600',
      icon: <Award className="h-6 w-6" />
    },
    {
      name: 'Yearly',
      price: '₹899',
      duration: 'per year',
      features: [
        'All Quarterly features',
        'Family accounts (up to 5)',
        'Medicine home delivery',
        'Annual health checkup'
      ],
      popular: false,
      color: 'bg-gradient-to-br from-yellow-500 to-amber-600',
      icon: <Shield className="h-6 w-6" />
    }
  ];

  const handleSubscribe = (plan: string) => {
    toast.success(`Selected ${plan} subscription`, {
      description: "Redirecting to payment gateway..."
    });
    // In a real app, this would navigate to the payment gateway
    setTimeout(() => {
      toast.info("This is a demo", {
        description: "No payment will be processed"
      });
    }, 2000);
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
          <span className="ml-2">Back</span>
        </Button>

        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-accent rounded-full mb-3">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Ozy Premium</h1>
          <p className="text-white/70 mt-2">
            Get exclusive features and save more on medicines
          </p>
        </div>

        <div className="space-y-6">
          {subscriptionPlans.map((plan) => (
            <div 
              key={plan.name} 
              className={`rounded-xl overflow-hidden relative ${
                plan.popular ? 'ring-2 ring-accent ring-offset-2 ring-offset-medical-dark' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
              )}
              <div className={`p-5 text-white ${plan.color}`}>
                <div className="flex items-center">
                  {plan.icon}
                  <div className="ml-3">
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold">{plan.price}</span>
                      <span className="ml-2 opacity-80 text-sm">{plan.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full mt-4 ${
                    plan.popular ? 'bg-accent hover:bg-accent/90' : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => handleSubscribe(plan.name)}
                >
                  Subscribe Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white/10 backdrop-blur-md rounded-lg p-4 text-white">
          <h3 className="font-semibold mb-2">Why go Premium?</h3>
          <p className="text-sm opacity-80 mb-3">
            Ozy Premium gives you access to exclusive features that help you save more on medicines
            and provides a seamless medication management experience for you and your family.
          </p>
          <Button
            variant="link"
            className="text-accent p-0"
            onClick={() => navigate('/premium/benefits')}
          >
            Learn more about Premium benefits
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Premium;
