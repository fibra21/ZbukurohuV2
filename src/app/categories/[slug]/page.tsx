'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/product/ProductCard';
import { getProducts, getBrands } from '@/lib/data';
import { Product, Brand } from '@/types';

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    (async () => {
      const [p, b] = await Promise.all([getProducts(), getBrands()]);
      setAllProducts(p);
      setBrands(b);
    })();
  }, []);

  const products = useMemo(() => {
    const slug = params?.slug?.toString() || '';
    let filtered = allProducts.filter(p =>
      p.tags.some(tag => tag.toLowerCase().includes(slug.toLowerCase())) ||
      p.name.toLowerCase().includes(slug.toLowerCase())
    );

    if (selectedBrands.length) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brandId));
    }
    filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);
    filtered = filtered.filter(p => p.rating >= minRating);

    switch (sortBy) {
      case 'new':
        filtered = filtered.sort((a,b) => Number(b.isNew) - Number(a.isNew));
        break;
      case 'price-asc':
        filtered = filtered.sort((a,b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered = filtered.sort((a,b) => b.price - a.price);
        break;
      case 'rating':
        filtered = filtered.sort((a,b) => b.rating - a.rating);
        break;
      case 'bestsellers':
        filtered = filtered.sort((a,b) => Number(b.isBestseller) - Number(a.isBestseller));
        break;
    }
    return filtered;
  }, [allProducts, params?.slug, selectedBrands, minPrice, maxPrice, minRating, sortBy]);

  const toggleBrand = (id: string) => {
    setSelectedBrands(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <aside className="bg-white rounded-2xl shadow-soft p-6 h-max">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Brand</h3>
              <div className="space-y-2 max-h-48 overflow-auto pr-1">
                {brands.map((b) => (
                  <label key={b.id} className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" checked={selectedBrands.includes(b.id)} onChange={() => toggleBrand(b.id)} />
                    <span>{b.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Price (€)</h3>
              <div className="flex items-center space-x-3 text-sm">
                <input type="number" value={minPrice} onChange={(e)=>setMinPrice(Number(e.target.value)||0)} className="w-20 border rounded-lg px-2 py-1" />
                <span>-</span>
                <input type="number" value={maxPrice} onChange={(e)=>setMaxPrice(Number(e.target.value)||0)} className="w-20 border rounded-lg px-2 py-1" />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Min Rating</h3>
              <input type="range" min={0} max={5} step={0.5} value={minRating} onChange={(e)=>setMinRating(Number(e.target.value))} className="w-full" />
              <div className="text-sm text-gray-600 mt-1">{minRating}+</div>
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-serif font-bold">Results</h1>
              <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="border rounded-xl px-3 py-2 text-sm">
                <option value="relevance">Relevance</option>
                <option value="new">New</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="bestsellers">Bestsellers</option>
              </select>
            </div>

            {products.length === 0 ? (
              <div className="text-gray-600">No products found.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
  );
}
