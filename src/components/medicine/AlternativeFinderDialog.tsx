
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface AlternativeFinderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlternativeFinderDialog: React.FC<AlternativeFinderDialogProps> = ({
  open,
  onOpenChange
}) => {
  const [medicineName, setMedicineName] = useState('');
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();
  
  const handleSearch = () => {
    if (!medicineName.trim()) return;
    
    setSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      setSearching(false);
      onOpenChange(false);
      navigate(`/search?q=${encodeURIComponent(medicineName)}&alternatives=true`);
    }, 1000);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Find Alternative Medicines</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-gray-500 mb-4">
            Enter the name of the medicine to find more affordable alternatives with similar composition
          </p>
          
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Enter medicine name"
              className="pl-10"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
            />
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>Popular searches:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {['Dolo 650', 'Crocin', 'Allegra', 'Montair LC'].map((med) => (
                <Button 
                  key={med} 
                  variant="outline" 
                  size="sm"
                  onClick={() => setMedicineName(med)}
                >
                  {med}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSearch} 
            disabled={!medicineName.trim() || searching}
            className="bg-medical-blue hover:bg-medical-blue/90"
          >
            {searching ? 'Searching...' : 'Find Alternatives'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlternativeFinderDialog;
