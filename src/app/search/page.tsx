'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/product/ProductCard';
import { searchProducts } from '@/lib/data';
import { Product } from '@/types';

export default function SearchPage() {
  const params = useSearchParams();
  const q = params.get('q') || '';
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const r = q ? await searchProducts(q) : [];
      setResults(r);
      setLoading(false);
    })();
  }, [q]);

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Search</h1>
        <p className="text-gray-600 mb-6">{q ? `Results for "${q}"` : 'Enter a query above to search'}</p>

        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : results.length === 0 ? (
          <div className="text-gray-600">No results.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
  );
}
