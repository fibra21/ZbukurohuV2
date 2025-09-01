'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Brand } from '@/types';
import { Shield, MapPin } from 'lucide-react';
import { cn } from '@/utils/cn';

interface BrandCardProps {
  brand: Brand;
  variant?: 'default' | 'compact';
}

export function BrandCard({ brand, variant = 'default' }: BrandCardProps) {
  const { locale } = useAppStore();
  const effectiveLocale = (locale === 'sq-AL' || locale === 'en') ? locale : 'sq-AL';

  if (variant === 'compact') {
    return (
      <Link
        href={`/brands/${brand.slug}`}
        className="group block bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 p-4 text-center"
      >
        <div className="relative w-16 h-16 mx-auto mb-3">
          <Image
            src={brand.logo}
            alt={brand.name}
            fill
            className="object-contain"
          />
        </div>
        <h3 className="font-semibold text-gray-900 text-sm mb-1">
          {brand.name}
        </h3>
        <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
          <MapPin className="w-3 h-3" />
          <span>{brand.country}</span>
        </div>
        {brand.isOfficialDistributorInKosovo && (
          <div className="mt-2 flex items-center justify-center space-x-1 text-xs text-primary">
            <Shield className="w-3 h-3" />
            <span>{t(effectiveLocale, 'officialDistributor')}</span>
          </div>
        )}
      </Link>
    );
  }

  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="group block bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-video">
        <Image
          src={brand.heroImage}
          alt={brand.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Logo Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 bg-white rounded-xl p-2">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg">
                {brand.name}
              </h3>
              <div className="flex items-center space-x-2 text-white/80 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{brand.country}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Official Distributor Badge */}
        {brand.isOfficialDistributorInKosovo && (
          <div className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>{t(effectiveLocale, 'officialDistributor')}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {brand.story}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>{brand.country}</span>
          </div>
          
          <div className="text-primary font-semibold text-sm">
            Shiko Produktet
          </div>
        </div>
      </div>
    </Link>
  );
}
