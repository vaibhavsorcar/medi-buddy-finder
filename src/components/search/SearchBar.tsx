
import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, Camera, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { getMedicineRecommendations } from '@/data/medicines';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const [isListening, setIsListening] = useState(false);
  const [showVoiceDialog, setShowVoiceDialog] = useState(false);
  const [showCameraDialog, setShowCameraDialog] = useState(false);
  const navigate = useNavigate();
  
  // Create a ref for speech recognition
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition when component mounts
  useEffect(() => {
    if (withVoice && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setShowVoiceDialog(false);
        if (onSearch) onSearch(transcript);
        else navigate(`/search?q=${encodeURIComponent(transcript)}`);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        setIsListening(false);
        setShowVoiceDialog(false);
        toast.error("Voice recognition error. Please try again.");
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors when stopping non-started recognition
        }
      }
    };
  }, [withVoice, navigate, onSearch]);
  
  // Handle search suggestions
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
    if (!withVoice) return;
    
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setShowVoiceDialog(true);
      setIsListening(true);
      
      try {
        recognitionRef.current.start();
      } catch (e) {
        // Handle potential errors
        recognitionRef.current.stop();
        setTimeout(() => recognitionRef.current.start(), 200);
      }
    } else {
      toast.error("Voice recognition is not supported in your browser");
    }
  };

  const handleCameraClick = () => {
    if (!withCamera) return;
    
    setShowCameraDialog(true);
    
    // Simulate camera scan result after a short delay
    setTimeout(() => {
      setShowCameraDialog(false);
      toast.success("Barcode detected", {
        description: "Found: DOLO 650"
      });
      setQuery('DOLO 650');
      if (onSearch) onSearch('DOLO 650');
      else navigate(`/medicine/dolo650`);
    }, 3000);
  };

  const handleFilterClick = () => {
    navigate('/search');
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore errors
      }
    }
    setIsListening(false);
    setShowVoiceDialog(false);
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
          onFocus={() => query.length > 1 && suggestions.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
          {withVoice && (
            <button
              type="button"
              className={`p-1 focus:outline-none ${
                isListening ? "text-accent animate-pulse" : "text-accent hover:text-accent/80"
              }`}
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

      {/* Voice search dialog */}
      <Dialog open={showVoiceDialog} onOpenChange={setShowVoiceDialog}>
        <DialogContent className="sm:max-w-md" onInteractOutside={stopVoiceRecognition}>
          <DialogHeader>
            <DialogTitle>Voice Search</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <div className={`w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-4 ${isListening ? 'animate-pulse' : ''}`}>
              <Mic className={`h-10 w-10 ${isListening ? 'text-accent' : 'text-gray-400'}`} />
            </div>
            <p className="text-center">
              {isListening ? "Listening... Speak now" : "Ready to listen"}
            </p>
            <Button 
              className="mt-4" 
              variant={isListening ? "destructive" : "default"}
              onClick={isListening ? stopVoiceRecognition : handleMicClick}
            >
              {isListening ? "Stop" : "Start"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Camera dialog */}
      <Dialog open={showCameraDialog} onOpenChange={setShowCameraDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan Medicine</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-full aspect-video bg-gray-100 rounded-md mb-4 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="h-10 w-10 text-gray-400 animate-pulse" />
              </div>
              <div className="absolute inset-0 border-2 border-accent/50 rounded-md">
                <div className="absolute top-0 w-full h-1 bg-accent animate-scan"></div>
              </div>
            </div>
            <p className="text-center">
              Position barcode or medicine label in the frame
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchBar;
