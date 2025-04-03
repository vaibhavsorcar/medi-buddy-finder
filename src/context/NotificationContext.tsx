
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'medicine' | 'pharmacy' | 'reminder' | 'system';
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Sample notifications data
const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'Reminder',
    message: 'Time to take your medication: Dolo 650',
    time: '5 minutes ago',
    read: false,
    type: 'reminder',
  },
  {
    id: '2',
    title: 'Discount Alert',
    message: 'New offer on Apollo Pharmacy - Get 20% off on all medicines',
    time: '2 hours ago',
    read: false,
    type: 'pharmacy',
  },
  {
    id: '3',
    title: 'Medicine Delivered',
    message: 'Your order #12345 has been delivered',
    time: '1 day ago',
    read: true,
    type: 'medicine',
  },
  {
    id: '4',
    title: 'New Feature',
    message: 'Try our new voice search feature to find medicines faster',
    time: '3 days ago',
    read: true,
    type: 'system',
  }
];

export const NotificationProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      time: 'Just now',
      read: false,
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
