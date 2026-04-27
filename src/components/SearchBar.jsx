"use client";
import { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import { StoreContext } from "@/context/StoreContext";

const SearchBar = ({ onClose }) => {
  const { data } = useContext(StoreContext);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // Load recent searches from localStorage (client-side only)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('recentSearches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    }
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const filtered = data
        .filter(item =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6);
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query, data]);

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      // Add to recent searches (client-side only)
      if (typeof window !== 'undefined') {
        const newRecentSearches = [searchQuery.trim(), ...recentSearches.filter(s => s !== searchQuery.trim())].slice(0, 5);
        setRecentSearches(newRecentSearches);
        localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
      }
      
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden fadeIn">
        {/* Search Input */}
        <div className="relative p-6 border-b border-gray-100">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search for dishes, categories, or ingredients..."
            className="w-full px-6 py-4 pl-14 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#ff6b6b] focus:bg-white transition-all duration-300 text-lg"
          />
          <svg className="absolute left-11 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button
            onClick={onClose}
            className="absolute right-11 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-300"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quick Actions & Recent Searches */}
        <div className="p-6 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Search */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-3">QUICK SEARCH</h3>
              <div className="flex flex-wrap gap-2">
                {["Pizza", "Burger", "Salad", "Dessert", "Drinks"].map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="px-4 py-2 bg-gray-100 hover:bg-[#ff6b6b] hover:text-white text-gray-700 rounded-full text-sm font-medium transition-all duration-300"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-3">RECENT SEARCHES</h3>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-lg text-left transition-all duration-300"
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 text-sm">{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Suggestions */}
        {isOpen && suggestions.length > 0 && (
          <div className="max-h-80 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">SUGGESTIONS</h3>
              <div className="space-y-2">
                {suggestions.map((item) => (
                  <button
                    key={item._id}
                    onClick={() => handleSearch(item.name)}
                    className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-all duration-300 text-left"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.category} • ${item.price}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {isOpen && query.trim() && suggestions.length === 0 && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No results found</h3>
            <p className="text-gray-500 mb-4">Try searching for something else</p>
            <button
              onClick={() => handleSearch()}
              className="btn-primary text-white font-semibold px-6 py-2 rounded-full"
            >
              Search Anyway
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;