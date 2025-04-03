
import React from 'react';
import { Home, BookOpen, Search, Star, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface BottomNavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
}

const BottomNavItem: React.FC<BottomNavItemProps> = ({ icon, label, to, isActive }) => {
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center text-xs ${
        isActive ? 'text-accent' : 'text-gray-500'
      }`}
    >
      {icon}
      <span className="mt-1">{label}</span>
    </Link>
  );
};

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { icon: <Home size={20} />, label: 'Home', path: '/' },
    { icon: <BookOpen size={20} />, label: 'Services', path: '/services' },
    { icon: <Search size={20} />, label: 'Search', path: '/search' },
    { icon: <Star size={20} />, label: 'Premium', path: '/premium' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-medical">
      <main className="flex-1 pb-16 overflow-auto">
        {children}
      </main>
      
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <BottomNavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              to={item.path}
              isActive={currentPath === item.path}
            />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout;
