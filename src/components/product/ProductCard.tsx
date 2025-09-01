'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Product } from '@/types';
import { 
  Heart, 
  Star, 
  ShoppingCart,
  Eye,
  Sparkles
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { locale, addToWishlist, removeFromWishlist, isInWishlist, addToRecentlyViewed } = useAppStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToCart(true);
    addToCart({
      productId: product.id,
      quantity: 1
    });
    
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  const handleProductClick = () => {
    addToRecentlyViewed(product.id);
  };

  const { addToCart } = useAppStore();

  if (variant === 'compact') {
    return (
      <Link
        href={`/products/${product.slug}`}
        onClick={handleProductClick}
        className="group block bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden"
      >
        <div className="relative aspect-square">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.isNew && (
            <div className="absolute top-2 left-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
              {t(locale, 'new')}
            </div>
          )}
          {product.isBestseller && (
            <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
              {t(locale, 'bestseller')}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="font-bold text-primary">
              {product.price} {product.currency}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">{product.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div
      className="group bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`} onClick={handleProductClick}>
        <div className="relative aspect-square">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product.isNew && (
              <div className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                {t(locale, 'new')}
              </div>
            )}
            {product.isBestseller && (
              <div className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                {t(locale, 'bestseller')}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className={cn(
            "absolute top-3 right-3 flex flex-col space-y-2 transition-all duration-300",
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          )}>
            <button
              onClick={handleWishlistToggle}
              className={cn(
                "w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center transition-colors",
                isWishlisted ? "text-red-500" : "text-gray-600 hover:text-red-500"
              )}
            >
              <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
            </button>
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center text-gray-600 hover:text-primary transition-colors disabled:opacity-50"
            >
              {isAddingToCart ? (
                <Sparkles className="w-4 h-4 animate-spin" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Quick View Overlay */}
          <div className={cn(
            "absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center",
            isHovered && "bg-opacity-20"
          )}>
            <div className={cn(
              "bg-white rounded-full p-3 shadow-soft transform scale-0 group-hover:scale-100 transition-transform duration-300",
              isHovered && "scale-100"
            )}>
              <Eye className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 flex-1">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center space-x-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">{product.rating}</span>
          <span className="text-sm text-gray-400">({product.reviewsCount})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-primary">
            {product.price} {product.currency}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={cn(
              "px-4 py-2 bg-primary text-white rounded-xl font-semibold text-sm transition-all duration-300",
              "hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed",
              isAddingToCart && "bg-green-500"
            )}
          >
            {isAddingToCart ? (
              <div className="flex items-center space-x-1">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Shtuar</span>
              </div>
            ) : (
              t(locale, 'addToCart')
            )}
          </button>
        </div>

        {/* Badges */}
        {product.badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {product.badges.slice(0, 2).map((badge, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                {t(locale, badge.toLowerCase().replace(/\s+/g, ''))}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
