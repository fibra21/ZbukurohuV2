import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, WishlistItem } from '@/types';

interface AppState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, shade?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;

  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistCount: () => number;

  // Cart Drawer
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Mega Menu
  openMega: string | null;
  setOpenMega: (type: string | null) => void;

  // Locale
  locale: 'sq-AL' | 'en';
  setLocale: (locale: 'sq-AL' | 'en') => void;

  // Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (product: Product, quantity = 1, shade?: string) => {
        const { cart } = get();
        const existingItem = cart.find(item => 
          item.productId === product.id && item.selectedShade === shade
        );

        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.productId === product.id && item.selectedShade === shade
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({
            cart: [...cart, { productId: product.id, quantity, selectedShade: shade }]
          });
        }
      },
      removeFromCart: (productId: string) => {
        const { cart } = get();
        set({ cart: cart.filter(item => item.productId !== productId) });
      },
      updateCartItemQuantity: (productId: string, quantity: number) => {
        const { cart } = get();
        if (quantity <= 0) {
          set({ cart: cart.filter(item => item.productId !== productId) });
        } else {
          set({
            cart: cart.map(item =>
              item.productId === productId ? { ...item, quantity } : item
            )
          });
        }
      },
      clearCart: () => set({ cart: [] }),
      getCartItemCount: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      getCartTotal: () => {
        const { cart } = get();
        // This would need products data to calculate actual total
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      // Wishlist
      wishlist: [],
      addToWishlist: (product: Product) => {
        const { wishlist } = get();
        if (!get().isInWishlist(product.id)) {
          set({
            wishlist: [...wishlist, { productId: product.id, addedAt: new Date().toISOString() }]
          });
        }
      },
      removeFromWishlist: (productId: string) => {
        const { wishlist } = get();
        set({ wishlist: wishlist.filter(item => item.productId !== productId) });
      },
      isInWishlist: (productId: string) => {
        const { wishlist } = get();
        return wishlist.some(item => item.productId === productId);
      },
      getWishlistCount: () => {
        const { wishlist } = get();
        return wishlist.length;
      },

      // Cart Drawer
      isCartOpen: false,
      setIsCartOpen: (open: boolean) => set({ isCartOpen: open }),

      // Mega Menu
      openMega: null,
      setOpenMega: (type: string | null) => set({ openMega: type }),

      // Locale
      locale: 'sq-AL',
      setLocale: (locale: 'sq-AL' | 'en') => set({ locale }),

      // Theme
      theme: 'light',
      setTheme: (theme: 'light' | 'dark') => set({ theme }),

      // Search
      searchQuery: '',
      setSearchQuery: (query: string) => set({ searchQuery: query }),
    }),
    {
      name: 'zbukurohu-store',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        locale: state.locale,
        theme: state.theme,
      }),
    }
  )
);
