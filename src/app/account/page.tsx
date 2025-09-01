'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { getProducts } from '@/lib/data';
import { useEffect, useState } from 'react';
import { Product } from '@/types';

export default function AccountPage() {
  const { wishlist } = useAppStore();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const wishlistProducts = wishlist
    .map(w => products.find(p => p.id === w.productId))
    .filter(Boolean) as Product[];

  return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders (mock) */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-soft p-6">
            <h2 className="text-xl font-semibold mb-4">Orders</h2>
            <div className="text-gray-600 text-sm">No orders in this demo. Place a mock checkout to see confirmation.</div>
          </div>

          {/* Addresses (mock) */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h2 className="text-xl font-semibold mb-4">Addresses</h2>
            <div className="text-gray-600 text-sm">Add your shipping address during checkout.</div>
          </div>
        </div>

        {/* Wishlist */}
        <div className="mt-8 bg-white rounded-2xl shadow-soft p-6">
          <h2 className="text-xl font-semibold mb-4">Wishlist</h2>
          {wishlistProducts.length === 0 ? (
            <div className="text-gray-600 text-sm">Your wishlist is empty.</div>
          ) : (
            <ul className="space-y-2">
              {wishlistProducts.map((p) => (
                <li key={p.id} className="flex items-center justify-between">
                  <span>{p.name}</span>
                  <Link href={`/products/${p.slug}`} className="text-primary text-sm font-medium">View</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
  );
}
