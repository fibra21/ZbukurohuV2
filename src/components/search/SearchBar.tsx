'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { Product } from '@/types';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';

export function SearchBar() {
  const { locale, searchQuery, setSearchQuery } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const effectiveLocale: 'sq-AL' | 'en' = locale === 'en' ? 'en' : 'sq-AL';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      performSearch();
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [searchQuery]);

  const performSearch = async () => {
    if (searchQuery.trim().length < 2) return;

    setIsLoading(true);
    try {
      // Simulate API call - replace with actual search API
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data.products || []);
        setIsOpen(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
    }
  };

  const handleResultClick = (product: Product) => {
    router.push(`/products/${product.slug}`);
    setIsOpen(false);
    setSearchQuery('');
  };

  const clearSearch = () => {
    setSearchQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-4 md:h-4" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t(effectiveLocale, 'searchPlaceholder')}
            className="w-full pl-10 pr-10 py-2 md:py-2 text-sm md:text-base border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            aria-label="Search for products"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 md:w-4 md:h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-2xl shadow-medium z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              {t(effectiveLocale, 'loading')}...
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleResultClick(product)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3"
                  aria-label={`View ${product.name} product details`}
                >
                  <div className="w-12 h-12 md:w-12 md:h-12 bg-gray-200 rounded-lg flex-shrink-0 relative overflow-hidden">
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={`${product.name} product image`}
                        fill
                        className="object-cover rounded-lg"
                        sizes="48px"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 truncate">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      €{product.price.toFixed(2)}
                    </div>
                  </div>
                </button>
              ))}
              <div className="border-t border-gray-200 mt-2 pt-2">
                <button
                  onClick={() => {
                    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-primary hover:bg-gray-50 transition-colors"
                  aria-label={`View all ${results.length} search results`}
                >
                  {t(effectiveLocale, 'view')} {t(effectiveLocale, 'searchResults')} ({results.length})
                </button>
              </div>
            </div>
          ) : searchQuery.trim().length >= 2 ? (
            <div className="p-4 text-center text-gray-500">
              {t(effectiveLocale, 'noResults')}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
