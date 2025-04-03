
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  // Mock search results - in a real app would come from an API
  const searchResults = query ? [
    {
      id: 'dolo650',
      name: 'DOLO 650',
      composition: 'Paracetamol 650mg',
      price: 30,
      availability: 'In Stock',
      image: '/lovable-uploads/92490f7a-fd7a-44cc-a221-49265e903b5e.png',
    },
    {
      id: 'calpol500',
      name: 'Calpol 500',
      composition: 'Paracetamol 500mg',
      price: 25,
      availability: 'In Stock',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop'
    },
    {
      id: 'paracip650',
      name: 'Paracip 650',
      composition: 'Paracetamol 650mg',
      price: 35,
      availability: 'Limited Stock',
      image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=300&auto=format&fit=crop'
    }
  ] : [];

  const [searchQuery, setSearchQuery] = React.useState(query);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleResultClick = (id: string) => {
    navigate(`/medicine/${id}`);
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
            className="bg-white w-full p-3 pl-10 text-sm rounded-full border-none shadow-md"
            placeholder="Search for medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </form>

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
        ) : (
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
