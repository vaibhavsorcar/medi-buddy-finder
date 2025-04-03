
import React from 'react';
import { 
  User, Bell, Shield, CreditCard, HelpCircle, LogOut, Globe, 
  Moon, Sun, PanelLeft, Smartphone, Share2, Info
} from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  onClick?: () => void;
  endElement?: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({ 
  icon, title, description, onClick, endElement 
}) => (
  <div 
    className="flex items-center justify-between py-3 cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </div>
    {endElement || <div className="text-gray-400">&gt;</div>}
  </div>
);

const Settings = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const [locationServices, setLocationServices] = React.useState(true);

  const handleLogout = () => {
    toast.info("Logged out successfully");
    // In a real app, this would handle the logout flow
  };

  const handleSettingClick = (setting: string) => {
    toast.info(`${setting} settings will open here`);
  };

  return (
    <MobileLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={32} className="text-gray-500" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Ashita C</h2>
              <p className="text-sm text-gray-500">ashitacc@gmail.com</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => handleSettingClick("Profile")}
          >
            Edit Profile
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h2 className="font-medium mb-2">App Preferences</h2>
          <Separator className="mb-3" />
          
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <Moon size={18} className="text-gray-500" />
                <Label htmlFor="dark-mode">Dark Mode</Label>
              </div>
              <Switch 
                id="dark-mode" 
                checked={darkMode} 
                onCheckedChange={setDarkMode} 
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-gray-500" />
                <Label htmlFor="notifications">Notifications</Label>
              </div>
              <Switch 
                id="notifications" 
                checked={notifications} 
                onCheckedChange={setNotifications} 
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-gray-500" />
                <Label htmlFor="location">Location Services</Label>
              </div>
              <Switch 
                id="location" 
                checked={locationServices} 
                onCheckedChange={setLocationServices} 
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 space-y-1">
          <SettingItem 
            icon={<Shield size={20} className="text-accent" />} 
            title="Privacy & Security" 
            onClick={() => handleSettingClick("Privacy")}
          />
          
          <SettingItem 
            icon={<CreditCard size={20} className="text-accent" />} 
            title="Payment Methods" 
            onClick={() => handleSettingClick("Payment")}
          />
          
          <SettingItem 
            icon={<Smartphone size={20} className="text-accent" />} 
            title="App Preferences" 
            onClick={() => handleSettingClick("Preferences")}
          />
          
          <SettingItem 
            icon={<HelpCircle size={20} className="text-accent" />} 
            title="Help & Support" 
            onClick={() => handleSettingClick("Help")}
          />
          
          <SettingItem 
            icon={<Info size={20} className="text-accent" />} 
            title="About Ozy" 
            onClick={() => handleSettingClick("About")}
          />
          
          <SettingItem 
            icon={<Share2 size={20} className="text-accent" />} 
            title="Share App" 
            onClick={() => toast.info("Share menu will open here")}
          />
        </div>
        
        <Button 
          variant="outline" 
          className="w-full border-red-500 text-red-500 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" /> Logout
        </Button>
      </div>
    </MobileLayout>
  );
};

export default Settings;
