
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SectionTitleProps {
  title: string;
  linkTo?: string;
  linkText?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  linkTo, 
  linkText = "See all" 
}) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {linkTo && (
        <Link 
          to={linkTo} 
          className="flex items-center text-white text-sm font-medium opacity-80"
        >
          {linkText}
          <ChevronRight size={16} />
        </Link>
      )}
    </div>
  );
};

export default SectionTitle;
