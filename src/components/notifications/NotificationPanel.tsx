
import React from 'react';
import { Bell, Check, Trash2, X, Calendar, ShoppingBag, AlertCircle, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Notification, useNotifications } from '@/context/NotificationContext';
import { toast } from 'sonner';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'medicine':
      return <Pill className="h-5 w-5 text-medical-orange" />;
    case 'pharmacy':
      return <ShoppingBag className="h-5 w-5 text-medical-green" />;
    case 'reminder':
      return <Calendar className="h-5 w-5 text-medical-blue" />;
    case 'system':
      return <AlertCircle className="h-5 w-5 text-medical-purple" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
};

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  const { markAsRead } = useNotifications();
  
  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
      toast.success(`Marked "${notification.title}" as read`);
    }
  };

  return (
    <div 
      className={`p-4 border-b ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
      onClick={handleClick}
    >
      <div className="flex items-start">
        <div className="mr-3 mt-1">
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h4 className="text-sm font-medium">{notification.title}</h4>
            {!notification.read && (
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
        </div>
      </div>
    </div>
  );
};

const NotificationPanel: React.FC = () => {
  const { notifications, unreadCount, markAllAsRead, clearNotifications } = useNotifications();
  
  const handleMarkAllRead = () => {
    markAllAsRead();
    toast.success("All notifications marked as read");
  };

  const handleClearAll = () => {
    clearNotifications();
    toast.success("All notifications cleared");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer">
          <Button variant="ghost" size="icon" className="bg-white rounded-full text-gray-700">
            <Bell size={20} />
          </Button>
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center p-0 rounded-full">
              {unreadCount}
            </Badge>
          )}
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-sm">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>Notifications</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X size={18} />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        
        {notifications.length > 0 ? (
          <>
            <div className="flex justify-between items-center py-2 px-4">
              <span className="text-sm text-gray-500">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleMarkAllRead} className="text-xs">
                  <Check size={14} className="mr-1" /> Mark all read
                </Button>
                <Button variant="ghost" size="sm" onClick={handleClearAll} className="text-xs">
                  <Trash2 size={14} className="mr-1" /> Clear all
                </Button>
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(100vh-180px)]">
              {notifications.map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <Bell size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500">No notifications yet</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NotificationPanel;
