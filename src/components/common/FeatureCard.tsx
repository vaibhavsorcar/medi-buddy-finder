
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  onClick 
}) => {
  return (
    <div 
      className="bg-white p-4 rounded-2xl shadow-md animate-fade-in"
      onClick={onClick}
      style={{ animationDelay: '0.3s' }}
    >
      <div className="mb-3">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
