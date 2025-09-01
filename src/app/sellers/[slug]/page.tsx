'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { getSellerBySlug, getProductsBySeller } from '@/lib/data';
import { Seller, Product } from '@/types';
import { ShieldCheck, Truck, RotateCcw, Star } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

export default function SellerDetailPage() {
  const params = useParams<{ slug: string }>();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!params?.slug) return;
    (async () => {
      const s = await getSellerBySlug(params.slug);
      setSeller(s);
      if (s) {
        const p = await getProductsBySeller(s.id);
        setProducts(p);
      }
    })();
  }, [params?.slug]);

  if (!seller) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600">Loading...</div>
        </div>
    );
  }

  const chartData = [
    { name: 'Jan', sales: 120 },
    { name: 'Feb', sales: 160 },
    { name: 'Mar', sales: 140 },
    { name: 'Apr', sales: 200 },
    { name: 'May', sales: 180 },
  ];

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="relative h-56 rounded-2xl overflow-hidden mb-8">
          <Image src={seller.heroImage} alt={seller.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-3xl font-serif font-bold">{seller.name}</h1>
              <div className="flex items-center space-x-3 text-sm mt-1">
                {seller.verifiedDistributor && (
                  <span className="inline-flex items-center bg-primary px-2 py-1 rounded-full">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Official Distributor
                  </span>
                )}
                <span className="inline-flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" /> {seller.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Policies */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h2 className="font-semibold mb-3">Policies</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <Truck className="w-4 h-4 mt-0.5" />
                <span>{seller.policies.shipping}</span>
              </div>
              <div className="flex items-start space-x-2">
                <RotateCcw className="w-4 h-4 mt-0.5" />
                <span>{seller.policies.returns}</span>
              </div>
            </div>
          </div>

          {/* Metrics Chart */}
          <div className="bg-white rounded-2xl shadow-soft p-6 md:col-span-2">
            <h2 className="font-semibold mb-3">Sales (mock)</h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                  <Bar dataKey="sales" fill="#5A2A5A" radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Catalog */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Catalog</h2>
            <Link href="/sellers" className="text-primary font-medium">All sellers</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
  );
}
