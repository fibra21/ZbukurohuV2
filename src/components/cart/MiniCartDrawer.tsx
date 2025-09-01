'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { getProducts } from '@/lib/data';
import { Product } from '@/types';
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';

interface MiniCartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MiniCartDrawer({ open, onOpenChange }: MiniCartDrawerProps) {
  const { cart, updateCartItemQuantity, removeFromCart } = useAppStore();
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

  const subtotal = cartWithProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-medium p-4 sm:p-6 overflow-y-auto focus:outline-none">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <Dialog.Title className="text-lg font-semibold">Your Cart</Dialog.Title>
            </div>
            <Dialog.Close className="p-2 text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          {cartWithProducts.length === 0 ? (
            <div className="text-gray-600 text-sm">Your cart is empty.</div>
          ) : (
            <div className="space-y-4">
              {cartWithProducts.map((item) => (
                <div key={item.productId} className="flex items-center space-x-3">
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 truncate">{item.product.name}</div>
                    <div className="text-xs text-gray-500">
                      {item.selectedShade ? `Shade: ${item.selectedShade} · ` : ''}
                      {item.product.price} {item.product.currency}
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                      <button
                        onClick={() => updateCartItemQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateCartItemQuantity(item.productId, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">
                      {(item.product.price * item.quantity).toFixed(2)} {item.product.currency}
                    </div>
                    <button onClick={() => removeFromCart(item.productId)} className="mt-2 text-gray-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-lg font-semibold text-gray-900">{subtotal.toFixed(2)} €</span>
            </div>
            <div className="flex gap-3">
              <Link href="/cart" className="flex-1 text-center border border-gray-300 rounded-2xl py-3 font-semibold text-gray-700 hover:bg-gray-50">
                View Cart
              </Link>
              <Link href="/checkout" className="flex-1 text-center bg-primary text-white rounded-2xl py-3 font-semibold hover:bg-primary-600">
                Checkout
              </Link>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
