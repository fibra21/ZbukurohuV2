'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { getProducts } from '@/lib/data';
import { Product } from '@/types';
import { 
  Trash2, 
  ArrowLeft, 
  ShoppingBag,
  Minus,
  Plus,
  Shield,
  Truck,
  CreditCard
} from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { locale, cart, removeFromCart, updateCartItemQuantity, clearCart } = useAppStore();
  const effectiveLocale = (locale === 'sq-AL' || locale === 'en') ? locale : 'sq-AL';
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const cartProducts = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  const subtotal = cartProducts.reduce((total, item) => {
    return total + (item.product!.price * item.quantity);
  }, 0);

  const shipping = subtotal > 30 ? 0 : 5;
  const total = subtotal + shipping;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateCartItemQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">{t(effectiveLocale, 'loading')}...</p>
          </div>
        </div>
    );
  }

  if (cart.length === 0) {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {t(effectiveLocale, 'cartEmpty')}
            </h1>
            <p className="text-gray-600 mb-8">
              Shporta juaj është bosh. Filloni blerjen për të shtuar produkte.
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-2xl font-semibold hover:bg-primary-600 transition-colors"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              {t(effectiveLocale, 'continueShopping')}
            </Link>
          </div>
        </div>
    );
  }

  return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              {t(effectiveLocale, 'cart')}
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-600 transition-colors text-sm font-medium"
          >
            Pastro Shportën
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Produktet ({cartProducts.length})
              </h2>
              
              <div className="space-y-6">
                {cartProducts.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-2xl">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.product!.imageUrl}
                        alt={item.product!.name}
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">
                        {item.product!.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.product!.price} {item.product!.currency}
                      </p>
                      {item.selectedShade && (
                        <p className="text-xs text-gray-500 mt-1">
                          Ngjyrë: {item.selectedShade}
                        </p>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {(item.product!.price * item.quantity).toFixed(2)} {item.product!.currency}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Përmbledhja e Porosisë
              </h2>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>{t(effectiveLocale, 'subtotal')}</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t(effectiveLocale, 'shipping')}</span>
                  <span>{shipping === 0 ? 'Falas' : `${shipping.toFixed(2)} €`}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold text-lg text-gray-900">
                  <span>{t(effectiveLocale, 'total')}</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {shipping > 0 && (
                <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center space-x-2 text-primary text-sm">
                    <Truck className="w-4 h-4" />
                    <span>Transporti falas për porosi mbi 30€</span>
                  </div>
                  <p className="text-xs text-primary-600 mt-1">
                    Më shumë {(30 - subtotal).toFixed(2)}€ për transport falas
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-primary text-white py-4 rounded-2xl font-semibold hover:bg-primary-600 transition-colors mb-4"
              >
                {t(effectiveLocale, 'checkout')}
              </button>

              {/* Trust Badges */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Pagesa e sigurt</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4" />
                  <span>Dërgesa e shpejtë</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4" />
                  <span>30 ditë për kthim</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
