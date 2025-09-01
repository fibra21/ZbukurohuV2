import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, WishlistItem } from '@/types';

interface AppState {
  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;

  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistCount: () => number;

  // Recently Viewed
  recentlyViewed: string[];
  addToRecentlyViewed: (productId: string) => void;

  // Locale
  locale: string;
  setLocale: (locale: string) => void;

  // Theme
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (item) => {
        const { cart } = get();
        const existingItem = cart.find(cartItem => cartItem.productId === item.productId);
        
        if (existingItem) {
          set({
            cart: cart.map(cartItem =>
              cartItem.productId === item.productId
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem
            )
          });
        } else {
          set({ cart: [...cart, item] });
        }
      },
      removeFromCart: (productId) => {
        const { cart } = get();
        set({ cart: cart.filter(item => item.productId !== productId) });
      },
      updateCartItemQuantity: (productId, quantity) => {
        const { cart } = get();
        if (quantity <= 0) {
          get().removeFromCart(productId);
        } else {
          set({
            cart: cart.map(item =>
              item.productId === productId ? { ...item, quantity } : item
            )
          });
        }
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const { cart } = get();
        // This would need to be calculated with actual product prices
        return cart.reduce((total, item) => total + (item.quantity * 25), 0);
      },
      getCartItemCount: () => {
        const { cart } = get();
        return cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Wishlist
      wishlist: [],
      addToWishlist: (productId) => {
        const { wishlist } = get();
        if (!get().isInWishlist(productId)) {
          set({
            wishlist: [...wishlist, { productId, addedAt: new Date().toISOString() }]
          });
        }
      },
      removeFromWishlist: (productId) => {
        const { wishlist } = get();
        set({ wishlist: wishlist.filter(item => item.productId !== productId) });
      },
      isInWishlist: (productId) => {
        const { wishlist } = get();
        return wishlist.some(item => item.productId === productId);
      },
      getWishlistCount: () => {
        const { wishlist } = get();
        return wishlist.length;
      },

      // Recently Viewed
      recentlyViewed: [],
      addToRecentlyViewed: (productId) => {
        const { recentlyViewed } = get();
        const filtered = recentlyViewed.filter(id => id !== productId);
        const updated = [productId, ...filtered].slice(0, 10); // Keep last 10
        set({ recentlyViewed: updated });
      },

      // Locale
      locale: 'sq-AL',
      setLocale: (locale) => set({ locale }),

      // Theme
      theme: 'system',
      setTheme: (theme) => set({ theme }),

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'zbukurohu-store',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        recentlyViewed: state.recentlyViewed,
        locale: state.locale,
        theme: state.theme,
      }),
    }
  )
);
