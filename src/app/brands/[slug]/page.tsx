'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BrandCard } from '@/components/brand/BrandCard';
import { ProductCard } from '@/components/product/ProductCard';
import { getBrandBySlug, getProductsByBrand } from '@/lib/data';
import { Brand, Product } from '@/types';
import { Shield } from 'lucide-react';

export default function BrandDetailPage() {
  const params = useParams<{ slug: string }>();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!params?.slug) return;
    (async () => {
      const b = await getBrandBySlug(params.slug);
      setBrand(b);
      if (b) {
        const p = await getProductsByBrand(b.id);
        setProducts(p);
      }
    })();
  }, [params?.slug]);

  if (!brand) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600">Loading...</div>
        </div>
    );
  }

  const bestsellers = products.filter(p => p.isBestseller).slice(0, 8);

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="relative h-64 rounded-2xl overflow-hidden mb-8">
          <Image src={brand.heroImage} alt={brand.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-4">
            <div className="relative w-16 h-16 bg-white rounded-xl overflow-hidden">
              <Image src={brand.logo} alt={brand.name} fill className="object-contain p-2" />
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-serif font-bold">{brand.name}</h1>
              {brand.isOfficialDistributorInKosovo && (
                <div className="mt-1 inline-flex items-center bg-primary px-2 py-1 rounded-full text-xs">
                  <Shield className="w-3 h-3 mr-1" /> Official Distributor in Kosovo
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-3">Brand Story</h2>
            <p className="text-gray-700 leading-relaxed">{brand.story}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h3 className="font-semibold mb-2">Marketplace Info</h3>
            <p className="text-sm text-gray-600">
              Zbukurohu is a third-party marketplace connecting buyers with official distributors in Kosovo.
            </p>
          </div>
        </div>

        {/* Bestsellers */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Bestsellers</h2>
            <Link href="/brands" className="text-primary font-medium">All brands</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
  );
}
