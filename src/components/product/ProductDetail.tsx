'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/types';
import { Heart, Star, Share2, Minus, Plus, Check, Truck, Shield, Clock } from 'lucide-react';
import Image from 'next/image';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useAppStore();
  const { canAccessBusinessFeatures } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedShade, setSelectedShade] = useState<string | null>(null);

  const getDisplayPrice = () => {
    if (canAccessBusinessFeatures && product.wholesalePrice) {
      return product.wholesalePrice;
    }
    return product.price;
  };

  const getPriceLabel = () => {
    if (canAccessBusinessFeatures && product.wholesalePrice) {
      return 'Wholesale Price';
    }
    return 'Price';
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedShade || undefined);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const displayPrice = getDisplayPrice();
  const priceLabel = getPriceLabel();
  const isWholesale = canAccessBusinessFeatures && product.wholesalePrice;

  const productHighlights = [
    'Suitable for all skin types',
    'Dermatologist tested',
    'Cruelty-free formula',
    'Long-lasting results'
  ];

  const productBenefits = [
    'Hydrates and nourishes skin',
    'Improves skin texture',
    'Reduces fine lines',
    'Brightens complexion'
  ];

  const ingredients = [
    'Hyaluronic Acid',
    'Vitamin C',
    'Niacinamide',
    'Peptides',
    'Ceramides'
  ];

  const usageInstructions = [
    'Apply to clean, dry skin',
    'Use morning and evening',
    'Follow with moisturizer',
    'Use sunscreen during the day'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-soft p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative group">
            <Image 
              src={product.imageUrl} 
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <button 
                onClick={handleWishlistToggle}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors shadow-lg"
                aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current text-red-500' : ''}`} />
              </button>
              <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-primary transition-colors shadow-lg">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            {product.discount && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-2 rounded-full">
                -{product.discount}%
              </div>
            )}
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative cursor-pointer group">
                <Image 
                  src={product.imageUrl} 
                  alt={`${product.name} view ${i}`}
                  width={100}
                  height={100}
                  className="w-full h-24 object-cover rounded-xl border-2 border-transparent group-hover:border-primary transition-colors"
                />
                {i === 1 && (
                  <div className="absolute inset-0 bg-primary/20 rounded-xl border-2 border-primary"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Brand & Category */}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
              {product.categoryId}
            </span>
            <span>Brand ID: {product.brandId}</span>
          </div>

          {/* Product Name */}
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>

          {/* Rating & Reviews */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="font-bold text-gray-900">{product.rating}</span>
            </div>
            <span className="text-gray-500">({product.reviewsCount} reviews)</span>
            <span className="text-green-600 font-medium">In Stock</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-primary">€{displayPrice}</span>
            {isWholesale && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                {priceLabel}
              </span>
            )}
          </div>

          {/* Wholesale Notice */}
          {isWholesale && product.minimumOrderQuantity && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-orange-700">
                <Check className="w-5 h-5" />
                <span className="font-medium">Minimum order quantity: {product.minimumOrderQuantity}</span>
              </div>
            </div>
          )}

          {/* Product Highlights */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Key Benefits</span>
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {productHighlights.map((highlight, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="font-medium text-gray-900">Quantity:</label>
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-none focus:outline-none focus:ring-0"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Add to Cart</span>
              </button>
              <button className="bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition-colors">
                Buy Now
              </button>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Truck className="w-5 h-5 text-green-500" />
              <span>Free delivery over €50</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Shield className="w-5 h-5 text-blue-500" />
              <span>Secure checkout</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Clock className="w-5 h-5 text-purple-500" />
              <span>Fast shipping</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Check className="w-5 h-5 text-green-500" />
              <span>Authentic products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Key Ingredients</h3>
              <ul className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center space-x-2 text-gray-700">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Benefits</h3>
              <ul className="space-y-2">
                {productBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-2 text-gray-700">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-4">How to Use</h3>
            <ol className="space-y-2">
              {usageInstructions.map((instruction, index) => (
                <li key={index} className="flex items-start space-x-3 text-gray-700">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
