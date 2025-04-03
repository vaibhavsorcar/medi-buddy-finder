
import React from 'react';
import { Search, Mic } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  withVoice?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search for medicines...", 
  onSearch,
  withVoice = true
}) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
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
        {withVoice && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary"
          >
            <Mic className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
