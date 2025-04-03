
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface UserProfileProps {
  name: string;
  email: string;
  avatarUrl?: string;
  notificationCount?: number;
}

const UserProfile = ({ name, email, avatarUrl, notificationCount = 0 }: UserProfileProps) => {
  return (
    <div className="flex items-center justify-between p-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border-2 border-white">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="text-white">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-xs opacity-90">{email}</p>
        </div>
      </div>
      <div className="relative">
        <button className="p-2 bg-white rounded-full text-gray-700">
          <Bell size={20} />
        </button>
        {notificationCount > 0 && (
          <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center p-0 rounded-full">
            {notificationCount}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
