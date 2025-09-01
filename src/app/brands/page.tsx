'use client';

import { useEffect, useState } from 'react';
import { BrandCard } from '@/components/brand/BrandCard';
import { getBrands } from '@/lib/data';
import { Brand } from '@/types';

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBrands().then((data) => {
      setBrands(data);
      setLoading(false);
    });
  }, []);

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Brands</h1>

        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        )}
      </div>
  );
}
