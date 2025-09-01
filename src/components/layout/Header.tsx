'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  Heart,
  Globe,
  Search,
  Star,
  Truck,
  Shield,
  Gift,
  Sparkles
} from 'lucide-react';
import { SearchBar } from '../search/SearchBar';
import { MiniCartDrawer } from '../cart/MiniCartDrawer';
import { LocaleSwitcher } from '../ui/LocaleSwitcher';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openMega, setOpenMega] = useState<null | 'skincare' | 'makeup' | 'haircare' | 'brands' | 'offers'>(null);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const { locale, getCartItemCount, getWishlistCount } = useAppStore();

  useEffect(() => setMounted(true), []);

  const effectiveLocale: 'sq-AL' | 'en' = mounted && locale === 'en' ? 'en' : 'sq-AL';

  const navigation = [
    { name: t(effectiveLocale, 'home'), href: '/', icon: '🏠' },
    { name: 'Skincare', href: '/categories/skincare', mega: 'skincare' as const, icon: '✨' },
    { name: 'Makeup', href: '/categories/makeup', mega: 'makeup' as const, icon: '💄' },
    { name: 'Haircare', href: '/categories/haircare', mega: 'haircare' as const, icon: '💇‍♀️' },
    { name: 'Brands', href: '/brands', mega: 'brands' as const, icon: '🏷️' },
    { name: 'Offers', href: '/offers', mega: 'offers' as const, icon: '🎁' },
  ];

  const slugify = useCallback((label: string) =>
    label
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''), []);

  const makeLink = useCallback((label: string) => `/categories/${slugify(label)}`,[slugify]);

  // Enhanced category data with better organization
  const skincareCategories = [
    {
      title: 'Face Care',
      items: ['Cleansers', 'Toners', 'Serums', 'Moisturizers', 'Sunscreen', 'Face Masks'],
      featured: 'Best Sellers'
    },
    {
      title: 'Eye Care',
      items: ['Eye Creams', 'Eye Serums', 'Eye Masks', 'Eye Patches'],
      featured: 'New Arrivals'
    },
    {
      title: 'Body Care',
      items: ['Body Wash', 'Body Lotions', 'Body Scrubs', 'Hand Creams'],
      featured: 'Trending'
    },
    {
      title: 'Specialty',
      items: ['Acne Treatment', 'Anti-Aging', 'Brightening', 'Hydrating'],
      featured: 'Limited Time'
    }
  ];

  const makeupCategories = [
    {
      title: 'Face',
      items: ['Foundation', 'Concealer', 'Primer', 'Setting Powder', 'Blush', 'Bronzer'],
      featured: 'Best Sellers'
    },
    {
      title: 'Eyes',
      items: ['Eyeshadow', 'Eyeliner', 'Mascara', 'False Lashes', 'Eyebrow Products'],
      featured: 'New Arrivals'
    },
    {
      title: 'Lips',
      items: ['Lipstick', 'Lip Gloss', 'Lip Liner', 'Lip Balm', 'Lip Stain'],
      featured: 'Trending'
    },
    {
      title: 'Tools',
      items: ['Brushes', 'Beauty Blenders', 'Eyelash Curlers', 'Mirrors'],
      featured: 'Limited Time'
    }
  ];

  const haircareCategories = [
    {
      title: 'Hair Care',
      items: ['Shampoo', 'Conditioner', 'Hair Masks', 'Hair Oils', 'Heat Protection'],
      featured: 'Best Sellers'
    },
    {
      title: 'Styling',
      items: ['Hair Spray', 'Hair Gel', 'Hair Wax', 'Texturizing Sprays', 'Dry Shampoo'],
      featured: 'New Arrivals'
    },
    {
      title: 'Hair Tools',
      items: ['Hair Dryers', 'Straighteners', 'Curling Irons', 'Hair Brushes'],
      featured: 'Trending'
    },
    {
      title: 'Hair Accessories',
      items: ['Hair Clips', 'Headbands', 'Hair Ties', 'Scrunchies'],
      featured: 'Limited Time'
    }
  ];

  const brandsCategories = [
    {
      title: 'Luxury Brands',
      items: ['La Mer', 'SK-II', 'Estée Lauder', 'Lancôme', 'Dior'],
      featured: 'Premium'
    },
    {
      title: 'Drugstore Favorites',
      items: ['Neutrogena', 'Cetaphil', 'CeraVe', 'The Ordinary', 'Inkey List'],
      featured: 'Affordable'
    },
    {
      title: 'Clean Beauty',
      items: ['Drunk Elephant', 'Glossier', 'Tower 28', 'Saie', 'Ilia'],
      featured: 'Eco-Friendly'
    },
    {
      title: 'K-Beauty',
      items: ['Innisfree', 'Etude House', 'Missha', 'Cosrx', 'Laneige'],
      featured: 'Trending'
    }
  ];

  const offersCategories = [
    {
      title: 'Seasonal Deals',
      items: ['Autumn Essentials', 'Winter Skincare', 'Holiday Sets', 'New Year Specials'],
      featured: 'Limited Time'
    },
    {
      title: 'Bundle Offers',
      items: ['Skincare Sets', 'Makeup Kits', 'Gift Sets', 'Travel Size'],
      featured: 'Save Up to 40%'
    },
    {
      title: 'Clearance',
      items: ['Last Chance', 'Discontinued', 'Overstock', 'Sample Sale'],
      featured: 'Up to 70% Off'
    },
    {
      title: 'Member Benefits',
      items: ['VIP Access', 'Early Bird', 'Exclusive Deals', 'Birthday Offers'],
      featured: 'Members Only'
    }
  ];

  const handleMouseEnter = (megaType: 'skincare' | 'makeup' | 'haircare' | 'brands' | 'offers' | null) => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
    }
    setOpenMega(megaType);
  };

  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setOpenMega(null);
    }, 300);
    setHoverTimer(timer);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      {/* Top Bar with Trust Signals */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4" />
              <span>Free Delivery on Orders Over €50</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>4.9/5 Customer Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-serif font-bold text-xl">Z</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-2xl text-primary group-hover:text-primary/80 transition-colors">Zbukurohu</span>
              <span className="text-xs text-gray-500 -mt-1">Beauty & Wellness</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" suppressHydrationWarning>
            {navigation.map((item) => {
              const itemWithMega = item as typeof item & { mega?: 'skincare' | 'makeup' | 'haircare' | 'brands' | 'offers' };
              return (
                <div key={item.name} className="relative group"
                  onMouseEnter={() => handleMouseEnter(itemWithMega.mega ?? null)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors font-medium py-2 px-3 rounded-lg hover:bg-gray-50"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>

                  {/* Mega Menus */}
                  {openMega === 'skincare' && itemWithMega.mega === 'skincare' && (
                    <div className="absolute left-0 mt-2 w-[1000px] bg-white rounded-2xl shadow-xl border border-gray-100 p-8 grid grid-cols-4 gap-8 z-50">
                      {skincareCategories.map(col => (
                        <div key={col.title}>
                          <div className="font-bold text-lg text-gray-900 mb-4 flex items-center justify-between">
                            {col.title}
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{col.featured}</span>
                          </div>
                          <ul className="space-y-3">
                            {col.items.map(it => (
                              <li key={it}>
                                <Link href={makeLink(it)} className="text-gray-600 hover:text-primary transition-colors flex items-center group/item">
                                  <span className="w-2 h-2 bg-gray-300 rounded-full group-hover/item:bg-primary transition-colors mr-3"></span>
                                  {it}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div className="col-span-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 mt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">New: Autumn Skincare Collection</h3>
                            <p className="text-gray-600 text-sm">Hydrating formulas for changing weather</p>
                          </div>
                          <Link href="/categories/skincare" className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
                            Shop Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {openMega === 'makeup' && itemWithMega.mega === 'makeup' && (
                    <div className="absolute left-0 mt-2 w-[1000px] bg-white rounded-2xl shadow-xl border border-gray-100 p-8 grid grid-cols-4 gap-8 z-50">
                      {makeupCategories.map(col => (
                        <div key={col.title}>
                          <div className="font-bold text-lg text-gray-900 mb-4 flex items-center justify-between">
                            {col.title}
                            <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">{col.featured}</span>
                          </div>
                          <ul className="space-y-3">
                            {col.items.map(it => (
                              <li key={it}>
                                <Link href={makeLink(it)} className="text-gray-600 hover:text-primary transition-colors flex items-center group/item">
                                  <span className="w-2 h-2 bg-gray-300 rounded-full group-hover/item:bg-primary transition-colors mr-3"></span>
                                  {it}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div className="col-span-4 bg-gradient-to-r from-accent/5 to-pink-100 rounded-xl p-6 mt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Holiday Makeup Collection</h3>
                            <p className="text-gray-600 text-sm">Sparkling looks for special occasions</p>
                          </div>
                          <Link href="/categories/makeup" className="bg-accent text-white px-6 py-3 rounded-xl font-medium hover:bg-accent/90 transition-colors">
                            Discover
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {openMega === 'haircare' && itemWithMega.mega === 'haircare' && (
                    <div className="absolute left-0 mt-2 w-[1000px] bg-white rounded-2xl shadow-xl border border-gray-100 p-8 grid grid-cols-4 gap-8 z-50">
                      {haircareCategories.map(col => (
                        <div key={col.title}>
                          <div className="font-bold text-lg text-gray-900 mb-4 flex items-center justify-between">
                            {col.title}
                            <span className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded-full">{col.featured}</span>
                          </div>
                          <ul className="space-y-3">
                            {col.items.map(it => (
                              <li key={it}>
                                <Link href={makeLink(it)} className="text-gray-600 hover:text-primary transition-colors flex items-center group/item">
                                  <span className="w-2 h-2 bg-gray-300 rounded-full group-hover/item:bg-primary transition-colors mr-3"></span>
                                  {it}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div className="col-span-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Professional Hair Tools</h3>
                            <p className="text-gray-600 text-sm">Salon-quality styling at home</p>
                          </div>
                          <Link href="/categories/haircare" className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
                            Shop Tools
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {openMega === 'brands' && itemWithMega.mega === 'brands' && (
                    <div className="absolute left-0 mt-2 w-[1000px] bg-white rounded-2xl shadow-xl border border-gray-100 p-8 grid grid-cols-4 gap-8 z-50">
                      {brandsCategories.map(col => (
                        <div key={col.title}>
                          <div className="font-bold text-lg text-gray-900 mb-4 flex items-center justify-between">
                            {col.title}
                            <span className="text-xs bg-purple-500/10 text-purple-600 px-2 py-1 rounded-full">{col.featured}</span>
                          </div>
                          <ul className="space-y-3">
                            {col.items.map(it => (
                              <li key={it}>
                                <Link href={`/brands/${slugify(it)}`} className="text-gray-600 hover:text-primary transition-colors flex items-center group/item">
                                  <span className="w-2 h-2 bg-gray-300 rounded-full group-hover/item:bg-primary transition-colors mr-3"></span>
                                  {it}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div className="col-span-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Brand Spotlight: New Arrivals</h3>
                            <p className="text-gray-600 text-sm">Discover trending beauty brands</p>
                          </div>
                          <Link href="/brands" className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors">
                            Explore Brands
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {openMega === 'offers' && itemWithMega.mega === 'offers' && (
                    <div className="absolute left-0 mt-2 w-[1000px] bg-white rounded-2xl shadow-xl border border-gray-100 p-8 grid grid-cols-4 gap-8 z-50">
                      {offersCategories.map(col => (
                        <div key={col.title}>
                          <div className="font-bold text-lg text-gray-900 mb-4 flex items-center justify-between">
                            {col.title}
                            <span className="text-xs bg-red-500/10 text-red-600 px-2 py-1 rounded-full">{col.featured}</span>
                          </div>
                          <ul className="space-y-3">
                            {col.items.map(it => (
                              <li key={it}>
                                <Link href={`/offers/${slugify(it)}`} className="text-gray-600 hover:text-primary transition-colors flex items-center group/item">
                                  <span className="w-2 h-2 bg-gray-300 rounded-full group-hover/item:bg-primary transition-colors mr-3"></span>
                                  {it}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div className="col-span-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 mt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">🎉 Flash Sale: 24 Hours Only!</h3>
                            <p className="text-gray-600 text-sm">Up to 70% off selected items</p>
                          </div>
                          <Link href="/offers" className="bg-red-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-600 transition-colors">
                            Shop Sale
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Locale Switcher */}
            <div className="hidden sm:block">
              <LocaleSwitcher />
            </div>

            {/* Theme Toggle */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-3 text-gray-600 hover:text-primary transition-colors hover:bg-gray-50 rounded-lg"
            >
              <Heart className="w-5 h-5" />
              {getWishlistCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getWishlistCount()}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 text-gray-600 hover:text-primary transition-colors hover:bg-gray-50 rounded-lg"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </button>

            {/* Account */}
            <Link
              href="/account"
              className="p-3 text-gray-600 hover:text-primary transition-colors hover:bg-gray-50 rounded-lg"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 text-gray-600 hover:text-primary transition-colors hover:bg-gray-50 rounded-lg"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <SearchBar />
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-6 max-h-[80vh] overflow-y-auto bg-white rounded-b-2xl shadow-lg">
            <nav className="grid grid-cols-2 gap-4">
              {navigation.map((item) => {
                const itemWithMega = item as typeof item & { mega?: 'skincare' | 'makeup' | 'haircare' | 'brands' | 'offers' };
                return (
                  <div key={item.name} className="space-y-3">
                    <Link
                      href={item.href}
                      className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </Link>
                    
                    {itemWithMega.mega && (
                      <div className="ml-4 space-y-2">
                        {itemWithMega.mega === 'skincare' && skincareCategories.slice(0, 2).map(col => (
                          <div key={col.title} className="bg-white p-3 rounded-lg border border-gray-100">
                            <div className="font-semibold text-gray-800 text-sm mb-2">{col.title}</div>
                            <ul className="space-y-1">
                              {col.items.slice(0, 3).map(it => (
                                <li key={it}>
                                  <Link 
                                    href={makeLink(it)} 
                                    className="text-gray-600 hover:text-primary text-xs block py-1"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {it}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {itemWithMega.mega === 'makeup' && makeupCategories.slice(0, 2).map(col => (
                          <div key={col.title} className="bg-white p-3 rounded-lg border border-gray-100">
                            <div className="font-semibold text-gray-800 text-sm mb-2">{col.title}</div>
                            <ul className="space-y-1">
                              {col.items.slice(0, 3).map(it => (
                                <li key={it}>
                                  <Link 
                                    href={makeLink(it)} 
                                    className="text-gray-600 hover:text-primary text-xs block py-1"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {it}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {itemWithMega.mega === 'haircare' && haircareCategories.slice(0, 2).map(col => (
                          <div key={col.title} className="bg-white p-3 rounded-lg border border-gray-100">
                            <div className="font-semibold text-gray-800 text-sm mb-2">{col.title}</div>
                            <ul className="space-y-1">
                              {col.items.slice(0, 3).map(it => (
                                <li key={it}>
                                  <Link 
                                    href={makeLink(it)} 
                                    className="text-gray-600 hover:text-primary text-xs block py-1"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {it}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {itemWithMega.mega === 'brands' && brandsCategories.slice(0, 2).map(col => (
                          <div key={col.title} className="bg-white p-3 rounded-lg border border-gray-100">
                            <div className="font-semibold text-gray-800 text-sm mb-2">{col.title}</div>
                            <ul className="space-y-1">
                              {col.items.slice(0, 3).map(it => (
                                <li key={it}>
                                  <Link 
                                    href={`/brands/${slugify(it)}`} 
                                    className="text-gray-600 hover:text-primary text-xs block py-1"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {it}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {itemWithMega.mega === 'offers' && offersCategories.slice(0, 2).map(col => (
                          <div key={col.title} className="bg-white p-3 rounded-lg border border-gray-100">
                            <div className="font-semibold text-gray-800 text-sm mb-2">{col.title}</div>
                            <ul className="space-y-1">
                              {col.items.slice(0, 3).map(it => (
                                <li key={it}>
                                  <Link 
                                    href={`/offers/${slugify(it)}`} 
                                    className="text-gray-600 hover:text-primary text-xs block py-1"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {it}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        )}
      </div>
      <MiniCartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  );
}
