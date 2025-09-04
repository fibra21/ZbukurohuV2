'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Eye, Star, Tag, Zap } from 'lucide-react';
import { Product } from '@/types';
import { useAppStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'featured';
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useAppStore();
  const { addToast } = useToast();

  const isInWishlist = wishlist.some(item => item.productId === product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount && product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      addToCart(product, 1);
      addToast({
        type: 'success',
        title: 'Added to Cart!',
        message: `${product.name} has been added to your cart.`
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to add product to cart. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlistToggle = () => {
    try {
      if (isInWishlist) {
        removeFromWishlist(product.id);
        addToast({
          type: 'info',
          title: 'Removed from Wishlist',
          message: `${product.name} has been removed from your wishlist.`
        });
      } else {
        addToWishlist(product);
        addToast({
          type: 'success',
          title: 'Added to Wishlist!',
          message: `${product.name} has been added to your wishlist.`
        });
      }
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to update wishlist. Please try again.'
      });
    }
  };

  // Compact variant for smaller displays
  if (variant === 'compact') {
    return (
      <Link
        href={`/products/${product.slug}`}
        className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-[#D4AF37] overflow-hidden"
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discountPercentage}%
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">
              €{product.price.toFixed(2)}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-500">{product.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#D4AF37] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3" />
              NEW
            </div>
          )}
          {product.isBestseller && (
            <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3" />
              BEST
            </div>
          )}
        </div>
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discountPercentage}%
          </div>
        )}
        
        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-black/20 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-3">
              <Link
                href={`/products/${product.slug}`}
                className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all duration-200 transform hover:scale-110"
                aria-label={`Quick view ${product.name}`}
              >
                <Eye className="w-5 h-5 text-gray-700" />
              </Link>
              
              <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="bg-[#D4AF37] p-3 rounded-full hover:bg-[#B8941F] transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={`Quick add ${product.name} to cart`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ShoppingCart className="w-5 h-5 text-white" />
                )}
              </button>
              
              <button
                onClick={handleWishlistToggle}
                className={`p-3 rounded-full transition-all duration-200 transform hover:scale-110 ${
                  isInWishlist 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-white/90 backdrop-blur-sm hover:bg-white'
                }`}
                aria-label={isInWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
              >
                <Heart 
                  className={`w-5 h-5 ${
                    isInWishlist ? 'text-white fill-current' : 'text-gray-700'
                  }`} 
                />
              </button>
            </div>
          </div>
        </div>
        
        {/* Stock Badge */}
        {product.stock < 5 && product.stock > 0 && (
          <div className="absolute bottom-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Only {product.stock} left
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            {product.brandId}
          </span>
          {product.tags.length > 0 && (
            <div className="flex items-center gap-1">
              <Tag className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">{product.tags[0]}</span>
            </div>
          )}
        </div>

        {/* Product Name */}
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating & Reviews */}
        <div className="flex items-center mb-3">
          <div className="flex items-center" role="img" aria-label={`Rating: ${product.rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {hasDiscount && product.originalPrice ? (
              <>
                <span className="text-lg font-bold text-gray-900">
                  €{product.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  €{product.originalPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                €{product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Stock Status */}
          {product.stock === 0 && (
            <span className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading || product.stock === 0}
          className="w-full flex items-center justify-center py-2 px-4 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8941F] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          aria-label={`Add ${product.name} to cart`}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Adding...
            </div>
          ) : product.stock === 0 ? (
            'Out of Stock'
          ) : (
            <div className="flex items-center">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </div>
          )}
        </button>
      </div>
    </div>
  );
} 
