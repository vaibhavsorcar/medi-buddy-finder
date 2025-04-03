
import React, { useState, useEffect } from 'react';
import { Search, Mic, Camera, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { getMedicineRecommendations } from '@/data/medicines';

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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{id: string; name: string; composition: string}>>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (query.length > 1) {
      const results = getMedicineRecommendations(query);
      setSuggestions(results.map(med => ({ 
        id: med.id, 
        name: med.name, 
        composition: med.composition 
      })));
      setShowSuggestions(results.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      if (onSearch) onSearch(query);
      else navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (id: string, name: string) => {
    setQuery(name);
    setShowSuggestions(false);
    navigate(`/medicine/${id}`);
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
      else navigate(`/search?q=${encodeURIComponent('paracetamol')}`);
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
      else navigate(`/medicine/dolo650`);
    }, 2000);
  };

  const handleFilterClick = () => {
    navigate('/search');
  };

  return (
    <div className="w-full relative animate-fade-in" style={{animationDelay: '0.1s'}}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-500" />
        </div>
        <input
          type="search"
          className="bg-white w-full p-3 pl-10 pr-24 text-sm rounded-full border-none ring-0 focus:ring-0 focus:border-none shadow-md"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setSuggestions.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
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
      </form>

      {/* Search suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 bg-white rounded-md shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id} 
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion.id, suggestion.name)}
            >
              <div className="font-medium">{suggestion.name}</div>
              <div className="text-xs text-gray-500">{suggestion.composition}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
