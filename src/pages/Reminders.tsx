
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Bell, Clock, Calendar, Trash2, Check, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import MobileLayout from '@/components/layout/MobileLayout';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Reminder {
  id: number;
  medicineName: string;
  time: string;
  days: string[];
  active: boolean;
}

const daysOfWeek = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const initialReminders: Reminder[] = [
  {
    id: 1,
    medicineName: 'Dolo 650',
    time: '08:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    active: true,
  },
  {
    id: 2,
    medicineName: 'Vitamin D3',
    time: '09:30',
    days: ['Monday', 'Wednesday', 'Friday'],
    active: true,
  },
  {
    id: 3,
    medicineName: 'Crocin',
    time: '20:00',
    days: ['Everyday'],
    active: false,
  },
];

const Reminders: React.FC = () => {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  
  const [newReminder, setNewReminder] = useState<Omit<Reminder, 'id'>>({
    medicineName: '',
    time: '',
    days: ['Everyday'],
    active: true,
  });

  const handleOpenAddDialog = () => {
    setNewReminder({
      medicineName: '',
      time: '',
      days: ['Everyday'],
      active: true,
    });
    setEditingReminder(null);
    setIsAddDialogOpen(true);
  };

  const handleOpenEditDialog = (reminder: Reminder) => {
    setEditingReminder(reminder);
    setNewReminder({
      medicineName: reminder.medicineName,
      time: reminder.time,
      days: [...reminder.days],
      active: reminder.active,
    });
    setIsAddDialogOpen(true);
  };

  const handleAddReminder = () => {
    if (!newReminder.medicineName || !newReminder.time) {
      toast.error('Please fill all required fields');
      return;
    }
    
    if (editingReminder) {
      // Update existing reminder
      setReminders(reminders.map(rem => 
        rem.id === editingReminder.id 
          ? { ...newReminder, id: editingReminder.id } 
          : rem
      ));
      toast.success(`Reminder updated for ${newReminder.medicineName}`);
    } else {
      // Add new reminder
      const newId = Math.max(0, ...reminders.map(r => r.id)) + 1;
      setReminders([...reminders, { ...newReminder, id: newId }]);
      toast.success(`Reminder added for ${newReminder.medicineName}`);
    }
    
    setIsAddDialogOpen(false);
  };

  const handleDeleteReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    toast.success('Reminder deleted');
  };

  const handleToggleActive = (id: number) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id 
        ? { ...reminder, active: !reminder.active } 
        : reminder
    ));
  };

  const formatDays = (days: string[]) => {
    if (days.includes('Everyday')) return 'Everyday';
    if (days.length === 7) return 'Everyday';
    if (days.length <= 3) return days.join(', ');
    return `${days.length} days`;
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
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Medicine Reminders</h1>
          <Button 
            onClick={handleOpenAddDialog}
            className="bg-medical-orange hover:bg-medical-orange/90"
          >
            <Plus size={18} className="mr-1" /> Add New
          </Button>
        </div>
        
        <div className="space-y-4">
          {reminders.length > 0 ? (
            reminders.map((reminder) => (
              <div 
                key={reminder.id} 
                className={`bg-white rounded-lg p-4 flex items-center justify-between ${
                  !reminder.active ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${
                    reminder.active ? 'bg-medical-green/20' : 'bg-gray-200'
                  }`}>
                    <Bell size={20} className={reminder.active ? 'text-medical-green' : 'text-gray-400'} />
                  </div>
                  <div>
                    <h3 className="font-medium">{reminder.medicineName}</h3>
                    <div className="flex text-sm text-gray-500 mt-1">
                      <div className="flex items-center mr-4">
                        <Clock size={14} className="mr-1" />
                        <span>{reminder.time}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>{formatDays(reminder.days)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Switch
                    checked={reminder.active}
                    onCheckedChange={() => handleToggleActive(reminder.id)}
                    className="mr-2"
                  />
                  <Button 
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenEditDialog(reminder)}
                    className="text-gray-500 hover:text-medical-blue"
                  >
                    <Edit3 size={16} />
                  </Button>
                  <Button 
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteReminder(reminder.id)}
                    className="text-gray-500 hover:text-medical-red"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
              <Bell size={48} className="text-white/40 mx-auto mb-4" />
              <p className="text-white mb-2">No reminders set</p>
              <p className="text-white/60 text-sm mb-4">Add reminders to get notifications for your medications</p>
              <Button 
                onClick={handleOpenAddDialog}
                className="bg-medical-orange hover:bg-medical-orange/90"
              >
                <Plus size={18} className="mr-1" /> Add Your First Reminder
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingReminder ? 'Edit Reminder' : 'Add New Reminder'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="medicineName">Medicine Name</Label>
              <Input 
                id="medicineName"
                placeholder="Enter medicine name"
                value={newReminder.medicineName}
                onChange={(e) => setNewReminder({...newReminder, medicineName: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="time">Reminder Time</Label>
              <Input 
                id="time"
                type="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
              />
            </div>
            
            <div>
              <Label>Frequency</Label>
              <Select 
                value={newReminder.days.includes('Everyday') ? 'Everyday' : 'Custom'} 
                onValueChange={(val) => {
                  if (val === 'Everyday') {
                    setNewReminder({...newReminder, days: ['Everyday']});
                  } else {
                    setNewReminder({...newReminder, days: []});
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Everyday">Everyday</SelectItem>
                  <SelectItem value="Custom">Custom days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {!newReminder.days.includes('Everyday') && (
              <div className="space-y-2">
                <Label>Select Days</Label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => (
                    <Button
                      key={day}
                      type="button"
                      variant={newReminder.days.includes(day) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (newReminder.days.includes(day)) {
                          setNewReminder({
                            ...newReminder,
                            days: newReminder.days.filter(d => d !== day)
                          });
                        } else {
                          setNewReminder({
                            ...newReminder,
                            days: [...newReminder.days, day]
                          });
                        }
                      }}
                    >
                      {day.substring(0, 3)}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <Label htmlFor="active">Active</Label>
              <Switch
                id="active"
                checked={newReminder.active}
                onCheckedChange={(checked) => setNewReminder({...newReminder, active: checked})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddReminder}>
              {editingReminder ? 'Update' : 'Add'} Reminder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
};

export default Reminders;
