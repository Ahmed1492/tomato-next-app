"use client";
import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { StoreContext } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginPop from "@/components/LoginPop";
import ProductPopup from "@/components/ProductPopup";
import SkeletonCard from "@/components/SkeletonCard";

export default function SearchPage() {
  const { data, addToCart, removeFromCart, cartItems, url } = useContext(StoreContext);
  const [isLogin, setIsLogin] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const searchParams = useSearchParams();
  
  // Get unique categories from food data
  const categories = ["All", ...new Set(data.map(item => item.category))];
  
  // Get initial search query from URL params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = searchParams.get('q');
      if (query) {
        setSearchQuery(query);
      }
    }
  }, [searchParams]);

  // Filter and search foods
  useEffect(() => {
    setLoading(true);
    let filtered = data;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(item => 
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredFoods(filtered);
    setCurrentPage(1); // reset to page 1 on any filter change
    setLoading(false);
  }, [data, searchQuery, selectedCategory, priceRange, sortBy]);

  const handleAddToCart = (itemId) => {
    addToCart(itemId);
  };

  return (
    <>
      <Navbar setIsLogin={setIsLogin} />
      {isLogin && <LoginPop setIsLogin={setIsLogin} />}
      {selectedItem && <ProductPopup item={selectedItem} onClose={() => setSelectedItem(null)} />}
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 fadeInUp">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Search <span className="gradient-text">Menu</span>
            </h1>
            <p className="text-xl text-gray-600">Find your favorite dishes from our extensive menu</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-12 fadeInUp">
            {/* Search Bar */}
            <div className="relative mb-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for dishes, categories, or ingredients..."
                className="w-full px-6 py-4 pl-14 bg-gray-50 border-2 border-gray-200 rounded-2xl outline-none focus:border-[#ff6b6b] focus:bg-white transition-all duration-300 text-lg"
              />
              <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#ff6b6b] focus:bg-white transition-all duration-300"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="flex gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="flex-1 accent-[#ff6b6b]"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="flex-1 accent-[#ff6b6b]"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#ff6b6b] focus:bg-white transition-all duration-300"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
              </div>
            </div>

            {/* Clear Filters & Advanced Options */}
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-gray-600">
                {filteredFoods.length} {filteredFoods.length === 1 ? 'result' : 'results'} found
                {searchQuery && <span className="font-medium"> for "{searchQuery}"</span>}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setPriceRange([0, 100]);
                    setSortBy("name");
                  }}
                  className="px-6 py-2 text-gray-600 hover:text-[#ff6b6b] font-medium transition-colors duration-300"
                >
                  Clear All Filters
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-300"
                >
                  Browse Menu
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          {(() => {
            const totalPages = Math.ceil(filteredFoods.length / ITEMS_PER_PAGE);
            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const pageItems = filteredFoods.slice(startIndex, startIndex + ITEMS_PER_PAGE);

            const goToPage = (page) => {
              if (page < 1 || page > totalPages) return;
              setCurrentPage(page);
              document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
            };

            const renderPagination = () => {
              if (totalPages <= 1) return null;
              const maxVisible = 5;
              let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
              let end = Math.min(totalPages, start + maxVisible - 1);
              if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

              return (
                <div className="flex flex-col items-center gap-3 mt-12 fadeInUp">
                  <div className="flex items-center gap-1">
                    {/* Prev */}
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {start > 1 && (
                      <>
                        <button onClick={() => goToPage(1)} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300">1</button>
                        {start > 2 && <span className="px-2 text-gray-400">…</span>}
                      </>
                    )}

                    {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((p) => (
                      <button
                        key={p}
                        onClick={() => goToPage(p)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                          p === currentPage
                            ? "bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white shadow-lg scale-105"
                            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </button>
                    ))}

                    {end < totalPages && (
                      <>
                        {end < totalPages - 1 && <span className="px-2 text-gray-400">…</span>}
                        <button onClick={() => goToPage(totalPages)} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300">{totalPages}</button>
                      </>
                    )}

                    {/* Next */}
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filteredFoods.length)} of {filteredFoods.length} results
                  </p>
                </div>
              );
            };

            if (loading) return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            );

            if (filteredFoods.length === 0) return (
              <div className="text-center py-20 fadeInUp">
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">No results found</h2>
                <p className="text-gray-600 mb-8">Try adjusting your search terms or filters</p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setPriceRange([0, 100]); }}
                  className="btn-primary text-white font-semibold px-8 py-3 rounded-full"
                >
                  Clear Filters
                </button>
              </div>
            );

            return (
              <div id="search-results">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {pageItems.map((item, index) => (
                    <div
                      key={item._id}
                      className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 fadeInUp cursor-pointer group"
                      style={{ animationDelay: `${index * 0.05}s` }}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="relative">
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-4 right-4">
                          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full">
                            {item.category}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                            Quick View
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold gradient-text">${item.price}</span>
                          {cartItems[item._id] ? (
                            <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => addToCart(item._id)}
                                className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-all duration-300"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                              <span className="px-3 font-bold text-gray-800">{cartItems[item._id]}</span>
                              <button
                                onClick={() => removeFromCart(item._id)}
                                className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-300"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleAddToCart(item._id); }}
                              className="btn-primary text-white font-semibold px-6 py-2 rounded-full hover:scale-105 transition-all duration-300"
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {renderPagination()}
              </div>
            );
          })()}
        </div>
      </div>

      <Footer />
    </>
  );
}