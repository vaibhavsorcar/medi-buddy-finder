
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Search as SearchIcon, Mic, Camera, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';
import { toast } from 'sonner';
import { medicines, getMedicineRecommendations } from '@/data/medicines';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const filterType = searchParams.get('filter') || 'all';
  
  // Popular search suggestions
  const popularMedicines = [
    'Dolo 650',
    'Crocin',
    'Calpol',
    'Azithral',
    'Benadryl',
    'Allegra',
    'Cetrizine'
  ];

  const [searchQuery, setSearchQuery] = useState(query);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    type: filterType,
    priceRange: 'all',
    availability: 'all'
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  // Mock search results filtering based on the query and filters
  const searchResults = query ? 
    medicines
      .filter(med => {
        const matchesQuery = med.name.toLowerCase().includes(query.toLowerCase()) || 
                        med.composition.toLowerCase().includes(query.toLowerCase());
        
        const matchesType = selectedFilters.type === 'all' || med.type === selectedFilters.type;
        
        return matchesQuery && matchesType;
      }) : [];

  useEffect(() => {
    if (searchQuery) {
      const filtered = popularMedicines.filter(med => 
        med.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0 && searchQuery.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(searchQuery)}&filter=${selectedFilters.type}`);
  };

  const handleResultClick = (id: string) => {
    navigate(`/medicine/${id}`);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const applyFilters = () => {
    setShowFilterPanel(false);
    setSearchParams({
      q: searchQuery,
      filter: selectedFilters.type
    });
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
      setSearchQuery('paracetamol');
      navigate(`/search?q=paracetamol&filter=${selectedFilters.type}`);
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
      setSearchQuery('DOLO 650');
      navigate(`/search?q=DOLO 650&filter=${selectedFilters.type}`);
    }, 2000);
  };

  const selectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(suggestion)}&filter=${selectedFilters.type}`);
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

        <form onSubmit={handleSearch} className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="search"
            className="bg-white w-full p-3 pl-10 pr-24 text-sm rounded-full border-none shadow-md"
            placeholder="Search for medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowSuggestions(true)}
            autoFocus
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-2">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-accent hover:bg-transparent"
              onClick={handleMicClick}
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-accent hover:bg-transparent"
              onClick={handleCameraClick}
            >
              <Camera className="h-5 w-5" />
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className={`h-8 w-8 ${showFilterPanel ? 'text-accent bg-accent/20' : 'text-accent'} hover:bg-transparent`}
              onClick={() => setShowFilterPanel(!showFilterPanel)}
            >
              <Filter className="h-5 w-5" />
            </Button>
          </div>
          
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 bg-white rounded-md shadow-lg mt-1 z-50">
              {filteredSuggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className="px-4 py-2 hover:bg-accent/10 cursor-pointer flex items-center"
                  onClick={() => selectSuggestion(suggestion)}
                >
                  <SearchIcon className="w-4 h-4 text-gray-400 mr-2" />
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </form>

        {showFilterPanel && (
          <div className="bg-white rounded-lg shadow-lg p-4 mb-5 animate-in slide-in-from-top duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Filter</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowFilterPanel(false)}>
                <X size={18} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Medication Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {['all', 'tablet', 'capsule', 'syrup'].map(type => (
                    <button
                      key={type}
                      type="button"
                      className={`py-2 px-3 text-sm rounded-full border ${
                        selectedFilters.type === type 
                          ? 'border-accent bg-accent/10 text-accent' 
                          : 'border-gray-300 text-gray-700'
                      }`}
                      onClick={() => handleFilterChange('type', type)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-2 flex justify-end">
                <Button className="bg-accent hover:bg-accent/90" onClick={applyFilters}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {query && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Search results for "{query}"
            </h2>
            {searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map((result) => (
                  <div 
                    key={result.id}
                    className="bg-white rounded-lg p-3 flex items-center shadow-md animate-fade-in"
                    onClick={() => handleResultClick(result.id)}
                  >
                    <div className="h-16 w-16 mr-4">
                      <img 
                        src={result.image} 
                        alt={result.name} 
                        className="h-full w-full object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{result.name}</h3>
                      <p className="text-xs text-gray-500">{result.composition}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-sm font-bold text-medical-green mr-3">₹{result.price}</span>
                        <span className="text-xs text-gray-500">{result.availability}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
                <p className="text-white">No results found for "{query}"</p>
              </div>
            )}
          </div>
        )}
        
        {!query && (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon size={24} className="text-white" />
            </div>
            <h3 className="text-white text-lg font-medium">Search for medicines</h3>
            <p className="text-white/70 text-sm mt-1">
              Enter a medicine name to find and compare prices
            </p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Search;
