'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Heart, Star, Sparkles } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { locale, addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useAppStore();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const effectiveLocale: 'sq-AL' | 'en' = locale === 'en' ? 'en' : 'sq-AL';

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      addToCart({ productId: product.id, quantity: 1 });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-shadow overflow-hidden group">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0] || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-lg font-medium">
              {t(effectiveLocale, 'new')}
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-accent text-white text-xs px-2 py-1 rounded-lg font-medium">
              {t(effectiveLocale, 'bestseller')}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
            isInWishlist(product.id)
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
          aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 md:p-4">
        {/* Brand ID */}
        <div className="text-xs text-gray-500 mb-1 truncate">
          Brand ID: {product.brandId}
        </div>

        {/* Product Name */}
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm md:text-base leading-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 md:w-4 md:h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-bold text-primary">
              {product.price} {product.currency}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className={`w-full py-2 md:py-3 px-4 rounded-xl font-medium transition-colors text-sm md:text-base ${
            isAddingToCart
              ? 'bg-green-500 text-white hover:bg-green-600 active:scale-95'
              : 'bg-primary text-white hover:bg-primary/90 active:scale-95'
          }`}
        >
          {isAddingToCart ? (
            <div className="flex items-center space-x-1">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Shtuar</span>
            </div>
          ) : (
            t(effectiveLocale, 'addToCart')
          )}
        </button>
      </div>
    </div>
  );
}
