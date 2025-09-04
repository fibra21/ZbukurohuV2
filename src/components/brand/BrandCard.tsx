'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Award, MapPin, Shield } from 'lucide-react';
import { Brand } from '@/types';

interface BrandCardProps {
  brand: Brand;
  variant?: 'default' | 'compact';
}

export function BrandCard({ brand, variant = 'default' }: BrandCardProps) {
  if (variant === 'compact') {
    return (
      <Link
        href={`/brands/${brand.slug}`}
        className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 text-center border border-neutral-200"
      >
        <div className="relative w-16 h-16 mx-auto mb-3">
          <Image
            src={brand.logo}
            alt={brand.name}
            fill
            className="object-contain"
            sizes="64px"
            loading="lazy"
          />
        </div>
        <h3 className="font-semibold text-neutral-900 text-sm mb-2 line-clamp-1">
          {brand.name}
        </h3>
        <div className="flex items-center justify-center space-x-1 text-xs text-neutral-500 mb-2">
          <MapPin className="w-3 h-3" />
          <span>{brand.country}</span>
        </div>
        {brand.isOfficialDistributorInKosovo && (
          <div className="flex items-center justify-center space-x-1 text-xs text-brand-primary">
            <Shield className="w-3 h-3" />
            <span>Official Distributor</span>
          </div>
        )}
      </Link>
    );
  }

  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-neutral-200 h-full flex flex-col"
    >
      <div className="relative aspect-video">
        <Image
          src={brand.heroImage}
          alt={brand.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Logo Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 bg-white rounded-xl p-2 flex-shrink-0">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain p-1"
                sizes="48px"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-lg line-clamp-1">
                {brand.name}
              </h3>
              <div className="flex items-center center space-x-2 text-white/80 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="line-clamp-1">{brand.country}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Official Distributor Badge */}
        {brand.isOfficialDistributorInKosovo && (
          <div className="absolute top-4 right-4 bg-brand-primary text-white text-xs px-3 py-1 rounded-full flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>Official</span>
          </div>
        )}
      </div>

      {/* Content Section - Fixed Height */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Description - Fixed Height */}
        <p className="text-neutral-600 text-sm line-clamp-3 mb-4 leading-relaxed flex-shrink-0">
          {brand.story}
        </p>
        
        {/* Bottom Section - Fixed at Bottom */}
        <div className="mt-auto">
          {/* Country and Status Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-sm text-neutral-500">
              <MapPin className="w-4 h-4" />
              <span>{brand.country}</span>
            </div>
            
            {brand.isOfficialDistributorInKosovo && (
              <div className="flex items-center justify-center space-x-1 text-xs text-brand-primary">
                <Award className="w-3 h-3" />
                <span>Verified</span>
                </div>
            )}
          </div>
          
          {/* Button Row - Separate from other content */}
          <div className="pt-2 border-t border-neutral-100">
            <span className="text-brand-primary font-medium text-sm block text-center py-2 px-4 bg-brand-primary/10 rounded-lg hover:bg-brand-primary/20 transition-colors">
              Shiko Produktet
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
