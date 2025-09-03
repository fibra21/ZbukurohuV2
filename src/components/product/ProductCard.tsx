'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useAppStore } from '@/lib/store';
import { useToast } from '@/components/ui/Toast';

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
}

export function ProductCard({ product, showActions = true }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useAppStore();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleWishlistToggle = async () => {
    try {
      if (isInWishlist(product.id)) {
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

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-200 overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Link href={`/products/${product.slug}`} className="block">
          <Image
            src={product.image}
            alt={`${product.name} - ${product.brand} ${product.category} product`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </Link>
        
        {/* Quick View Button */}
        <Link
          href={`/products/${product.slug}`}
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
          aria-label={`Quick view ${product.name}`}
        >
          <Eye className="w-8 h-8 text-white" />
        </Link>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{product.discount}%
          </div>
        )}

        {/* New Badge */}
        {product.isNew && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand & Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-neutral-500 font-medium uppercase tracking-wide">
            {product.brand}
          </span>
          <span className="text-xs text-neutral-400">
            {product.categoryId}
          </span>
        </div>

        {/* Product Name */}
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="font-semibold text-neutral-900 text-sm leading-tight mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center" role="img" aria-label={`Rating: ${product.rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-neutral-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-neutral-500 ml-1">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {product.discount ? (
              <>
                <span className="text-lg font-bold text-neutral-900">
                  €{((product.price * (100 - product.discount)) / 100).toFixed(2)}
                </span>
                <span className="text-sm text-neutral-500 line-through">
                  €{product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-neutral-900">
                €{product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleWishlistToggle}
              className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg border transition-all duration-200 ${
                isInWishlist(product.id)
                  ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
              }`}
              aria-label={isInWishlist(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            >
              <Heart
                className={`w-4 h-4 ${
                  isInWishlist(product.id) ? 'fill-current' : ''
                }`}
              />
            </button>
            
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center py-2 px-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Add ${product.name} to cart`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

