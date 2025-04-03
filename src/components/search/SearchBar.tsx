
import React, { useState } from 'react';
import { Search, Mic, Camera, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  withVoice?: boolean;
  withCamera?: boolean;
  withFilter?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search for medicines...", 
  onSearch,
  withVoice = true,
  withCamera = true,
  withFilter = true
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const handleMicClick = () => {
    toast.info("Voice search activated", {
      description: "Please speak now to search for medicines..."
    });
    
    // In a real app, implement Web Speech API here
    setTimeout(() => {
      toast.success("Voice detected", {
        description: "Searching for 'paracetamol'..."
      });
      setQuery('paracetamol');
      if (onSearch) onSearch('paracetamol');
    }, 2000);
  };

  const handleCameraClick = () => {
    toast.info("Camera activated", {
      description: "Position the medicine box or barcode in the camera frame"
    });
    
    // In a real app, implement camera API and barcode reading here
    setTimeout(() => {
      toast.success("Barcode detected", {
        description: "Found: DOLO 650"
      });
      setQuery('DOLO 650');
      if (onSearch) onSearch('DOLO 650');
    }, 2000);
  };

  const handleFilterClick = () => {
    navigate('/search');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full animate-fade-in" style={{animationDelay: '0.1s'}}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-500" />
        </div>
        <input
          type="search"
          className="bg-white w-full p-3 pl-10 pr-12 text-sm rounded-full border-none ring-0 focus:ring-0 focus:border-none shadow-md"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center gap-1">
          {withVoice && (
            <button
              type="button"
              className="text-accent p-1 hover:text-accent/80 focus:outline-none"
              onClick={handleMicClick}
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
          {withCamera && (
            <button
              type="button"
              className="text-accent p-1 hover:text-accent/80 focus:outline-none"
              onClick={handleCameraClick}
            >
              <Camera className="w-5 h-5" />
            </button>
          )}
          {withFilter && (
            <button
              type="button"
              className="text-accent p-1 hover:text-accent/80 focus:outline-none mr-2"
              onClick={handleFilterClick}
            >
              <Filter className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
