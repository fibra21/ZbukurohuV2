'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { useAuth } from '@/contexts/AuthContext';
import { getProducts } from '@/lib/data';
import { Product } from '@/types';
import { X, Minus, Plus, Trash2, ShoppingCart, AlertCircle } from 'lucide-react';

interface MiniCartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MiniCartDrawer({ open, onOpenChange }: MiniCartDrawerProps) {
  const { cart, updateCartItemQuantity, removeFromCart } = useAppStore();
  const { user, canAccessBusinessFeatures } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const cartWithProducts = useMemo(() => {
    return cart
      .map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }))
      .filter((x) => x.product) as Array<typeof cart[number] & { product: Product }>;
  }, [cart, products]);

  // Calculate pricing based on user role
  const getItemPrice = (product: Product) => {
    if (canAccessBusinessFeatures && product.wholesalePrice) {
      return product.wholesalePrice;
    }
    return product.price;
  };

  const getPriceLabel = (product: Product) => {
    if (canAccessBusinessFeatures && product.wholesalePrice) {
      return 'Wholesale Price';
    }
    return 'Price';
  };

  const subtotal = cartWithProducts.reduce((sum, item) => {
    const price = getItemPrice(item.product);
    return sum + price * item.quantity;
  }, 0);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const product = products.find(p => p.id === productId);
    if (product && canAccessBusinessFeatures && product.minimumOrderQuantity) {
      if (newQuantity < product.minimumOrderQuantity) {
        // Show warning or prevent change
        return;
      }
    }
    
    updateCartItemQuantity(productId, newQuantity);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[80vh] w-full max-w-[420px] bg-white shadow-2xl p-4 sm:p-6 overflow-y-auto focus:outline-none rounded-xl border border-gray-200 z-[9999]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-primary" aria-hidden="true" />
              <Dialog.Title className="text-lg font-semibold">Your Cart</Dialog.Title>
            </div>
            <Dialog.Close className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg" aria-label="Close cart">
              <X className="w-5 h-5" aria-hidden="true" />
            </Dialog.Close>
          </div>

          {cartWithProducts.length === 0 ? (
            <div className="text-gray-600 text-sm">Your cart is empty.</div>
          ) : (
            <div className="space-y-4">
              {cartWithProducts.map((item) => {
                const price = getItemPrice(item.product);
                const priceLabel = getPriceLabel(item.product);
                const isWholesale = canAccessBusinessFeatures && item.product.wholesalePrice;
                
                return (
                  <div key={item.productId} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <Image 
                        src={item.product.imageUrl} 
                        alt={`${item.product.name} product image`} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-gray-900 truncate">{item.product.name}</div>
                      <div className="text-xs text-gray-500 space-y-1">
                        {item.selectedShade && (
                          <div>Shade: {item.selectedShade}</div>
                        )}
                        <div className="flex items-center space-x-2">
                          <span className={isWholesale ? "text-green-600 font-medium" : ""}>
                            {price} {item.product.currency}
                          </span>
                          {isWholesale && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              {priceLabel}
                            </span>
                          )}
                        </div>
                        {isWholesale && item.product.minimumOrderQuantity && (
                          <div className="flex items-center space-x-1 text-orange-600">
                            <AlertCircle className="w-3 h-3" aria-hidden="true" />
                            <span className="text-xs">Min: {item.product.minimumOrderQuantity}</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-2 flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          aria-label={`Decrease quantity of ${item.product.name}`}
                        >
                          <Minus className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold" aria-label={`Quantity: ${item.quantity}`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          aria-label={`Increase quantity of ${item.product.name}`}
                        >
                          <Plus className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {(price * item.quantity).toFixed(2)} {item.product.currency}
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.productId)} 
                        className="mt-2 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg p-1"
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-6 border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-lg font-semibold text-gray-900">
                {subtotal.toFixed(2)} €
                {canAccessBusinessFeatures && (
                  <span className="text-xs text-green-600 ml-2">(Wholesale)</span>
                )}
              </span>
            </div>

            {cartWithProducts.length > 0 && (
              <div className="space-y-3">
                <Link
                  href="/cart"
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors text-center block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Go to full cart page"
                >
                  View Full Cart
                </Link>
                <Link
                  href="/checkout"
                  className="w-full bg-accent text-white py-3 px-4 rounded-lg font-medium hover:bg-accent/90 transition-colors text-center block focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  aria-label="Proceed to checkout"
                >
                  Checkout
                </Link>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
