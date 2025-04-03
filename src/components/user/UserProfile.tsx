
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import NotificationPanel from '@/components/notifications/NotificationPanel';

interface UserProfileProps {
  name: string;
  email: string;
  avatarUrl?: string;
}

const UserProfile = ({ name, email, avatarUrl }: UserProfileProps) => {
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
      <NotificationPanel />
    </div>
  );
};

export default UserProfile;
