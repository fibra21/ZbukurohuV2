'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X, ChevronDown, Star } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/types';
import { useAppStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';
import { Skeleton } from '@/components/ui/Skeleton';

interface FilterState {
  category: string;
  brand: string;
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
}

export function AdvancedSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    brand: '',
    priceRange: [0, 1000],
    rating: 0,
    inStock: false
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch();
    }
  }, [searchQuery, filters, currentPage]);

  const fetchSuggestions = async () => {
    try {
      // Simulate API call for suggestions
      const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions || []);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    }
  };

  const performSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        q: searchQuery,
        page: currentPage.toString(),
        limit: ITEMS_PER_PAGE.toString(),
        ...(filters.category && { category: filters.category }),
        ...(filters.brand && { brand: filters.brand }),
        ...(filters.priceRange && { 
          minPrice: filters.priceRange[0].toString(),
          maxPrice: filters.priceRange[1].toString()
        }),
        ...(filters.rating > 0 && { rating: filters.rating.toString() }),
        ...(filters.inStock && { inStock: 'true' })
      });

      const response = await fetch(`/api/search?${params}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data.products || []);
        setTotalPages(Math.ceil((data.total || 0) / ITEMS_PER_PAGE));
      }
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Search Error',
        message: 'Failed to perform search. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage(1);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      priceRange: [0, 1000],
      rating: 0,
      inStock: false
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4" ref={searchRef}>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products, brands, or categories..."
            className="w-full pl-12 pr-20 py-3 text-lg border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            aria-label="Search for products"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-primary-dark transition-colors"
            aria-label="Perform search"
          >
            Search
          </button>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-b-0"
                aria-label={`Search for ${suggestion}`}
              >
                <div className="flex items-center space-x-3">
                  <Search className="w-4 h-4 text-neutral-400" />
                  <span className="text-neutral-700">{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Filters Toggle */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          aria-label="Toggle search filters"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>

        {results.length > 0 && (
          <p className="text-neutral-600">
            {results.length} results found
          </p>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border border-neutral-200 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              >
                <option value="">All Categories</option>
                <option value="makeup">Makeup</option>
                <option value="skincare">Skincare</option>
                <option value="haircare">Haircare</option>
                <option value="fragrances">Fragrances</option>
              </select>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Brand
              </label>
              <select
                value={filters.brand}
                onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              >
                <option value="">All Brands</option>
                <option value="loreal">L&apos;Oréal</option>
                <option value="maybelline">Maybelline</option>
                <option value="neutrogena">Neutrogena</option>
                <option value="nivea">Nivea</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Price Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    priceRange: [Number(e.target.value), prev.priceRange[1]] 
                  }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  min="0"
                />
                <span className="text-neutral-500 self-center">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    priceRange: [prev.priceRange[0], Number(e.target.value)] 
                  }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  min="0"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Minimum Rating
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFilters(prev => ({ ...prev, rating: prev.rating === rating ? 0 : rating }))}
                    className={`p-1 rounded ${
                      filters.rating >= rating ? 'text-yellow-400' : 'text-neutral-300'
                    }`}
                    aria-label={`Filter by ${rating} star rating`}
                  >
                    <Star className="w-5 h-5 fill-current" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-200">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
              aria-label="Clear all filters"
            >
              Clear All
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors"
              aria-label="Apply filters"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Search Results */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <Skeleton key={i} className="w-full aspect-square" />
          ))}
        </div>
      ) : results.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {results.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={`${product.name} - ${product.brandId} product`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    loading="lazy"
                  />
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-neutral-900 text-sm mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-neutral-500 mb-2">{product.brandId}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900">
                      €{product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-xs text-neutral-600">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-neutral-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50"
                aria-label="Go to previous page"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 border rounded-lg ${
                    currentPage === page
                      ? 'bg-brand-primary text-white border-brand-primary'
                      : 'border-neutral-300 hover:bg-neutral-50'
                  }`}
                  aria-label={`Go to page ${page}`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-neutral-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50"
                aria-label="Go to next page"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : searchQuery.trim() ? (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-neutral-700 mb-2">No results found</h3>
          <p className="text-neutral-500 mb-4">
            Try adjusting your search terms or filters to find what you&apos;re looking for.
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors"
            aria-label="Clear filters and try again"
          >
            Clear Filters
          </button>
        </div>
      ) : null}
    </div>
  );
}
