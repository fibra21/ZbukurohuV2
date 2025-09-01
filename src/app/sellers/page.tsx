'use client';

import { useEffect, useState } from 'react';
import { SellerCard } from '@/components/seller/SellerCard';
import { getSellers } from '@/lib/data';
import { Seller } from '@/types';

export default function SellersPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSellers().then((data) => {
      setSellers(data);
      setLoading(false);
    });
  }, []);

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Sellers</h1>

        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellers.map((seller) => (
              <SellerCard key={seller.id} seller={seller} />
            ))}
          </div>
        )}
      </div>
  );
}
