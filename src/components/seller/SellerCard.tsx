'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Seller } from '@/types';
import { ShieldCheck, MapPin, Truck, RotateCcw, Star } from 'lucide-react';

interface SellerCardProps {
  seller: Seller;
}

export function SellerCard({ seller }: SellerCardProps) {
  return (
    <Link
      href={`/sellers/${seller.slug}`}
      className="group block bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-40">
        <Image
          src={seller.heroImage}
          alt={seller.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          {seller.verifiedDistributor && (
            <span className="inline-flex items-center text-xs bg-primary text-white px-2 py-1 rounded-full">
              <ShieldCheck className="w-3 h-3 mr-1" /> Official Distributor
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-gray-900">{seller.name}</h3>
            <div className="text-sm text-gray-600 flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{seller.country}</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>{seller.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4 text-gray-500" />
            <span>{seller.policies.shipping}</span>
          </div>
          <div className="flex items-center space-x-2">
            <RotateCcw className="w-4 h-4 text-gray-500" />
            <span>{seller.policies.returns}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
