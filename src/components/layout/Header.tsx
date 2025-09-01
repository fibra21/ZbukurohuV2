'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { cn } from '@/utils/cn';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  Heart,
  Globe
} from 'lucide-react';
import { SearchBar } from '../search/SearchBar';
import { MiniCartDrawer } from '../cart/MiniCartDrawer';
import { LocaleSwitcher } from '../ui/LocaleSwitcher';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openMega, setOpenMega] = useState<null | 'makeup' | 'skincare' | 'services'>(null);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const { locale, getCartItemCount, getWishlistCount } = useAppStore();

  useEffect(() => setMounted(true), []);

  const effectiveLocale: 'sq-AL' | 'en' = mounted && locale === 'en' ? 'en' : 'sq-AL';

  const navigation = [
    { name: t(effectiveLocale, 'home'), href: '/' },
    { name: 'Makeup', href: '/categories/makeup', mega: 'makeup' as const },
    { name: 'Skincare', href: '/categories/skincare', mega: 'skincare' as const },
    { name: 'Services', href: '/services', mega: 'services' as const },
    { name: t(effectiveLocale, 'find'), href: '/find' },
    { name: t(effectiveLocale, 'brands'), href: '/brands' },
    { name: t(effectiveLocale, 'sellers'), href: '/sellers' },
  ];

  const slugify = useCallback((label: string) =>
    label
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''), []);

  const makeLink = useCallback((label: string) => `/categories/${slugify(label)}`,[slugify]);

  const makeupColumns = [
    {
      title: 'Eyes',
      items: ['Brows','Eye Liners','Eye Shadow','False Lashes','Mascara','Eye Primers','Eye Sets'],
    },
    {
      title: 'Face',
      items: ['BB Creams','CC Cream','Concealer','Foundation','Setting Powder & Sprays','Face Primer','Face Sets'],
    },
    {
      title: 'Lips',
      items: ['Lipstick','Lip Gloss','Lip Liners','Lip Care','Lip Brushes'],
    },
    {
      title: 'Cheeks',
      items: ['Blush','Blush & Contour Sets','Bronzer','Highlighter'],
    },
  ] as const;

  const makeupHighlights = ['Makeup Brushes','Makeup Tools','Makeup Removers','Makeup Palettes & Sets'];

  const skincareColumns = [
    {
      title: 'Skincare',
      items: [
        'Eye Treatments','Facial Cleanser','Facial Treatments','Lip Care','Makeup Removers','Moisturizer','Skincare Sets','Skincare Tools','Sunscreen','Toners & Mists'
      ],
    },
    {
      title: 'Bath and Body',
      items: [
        'Body Cleansers','Body Scrubs & Exfoliants','Body Moisturizers','Body Treatments','Hand Treatments','Sun & Tanning'
      ],
    },
  ] as const;

  const servicesColumns = [
    {
      title: 'Beauty Services',
      items: ['Nail Appointment', 'Makeup Artist', 'Waxing', 'Facial Treatment', 'Eyebrow Shaping', 'Lash Extensions'],
    },
    {
      title: 'Wellness Services',
      items: ['Massage Therapy', 'Spa Treatment', 'Body Scrub', 'Aromatherapy', 'Relaxation Session'],
    },
  ] as const;

  const handleMouseEnter = (megaType: 'makeup' | 'skincare' | 'services' | null) => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
    }
    setOpenMega(megaType);
  };

  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setOpenMega(null);
    }, 300); // 300ms delay before closing
    setHoverTimer(timer);
  };

  return (
    <header className="sticky top-0 z-50 bg-background-secondary border-b border-gray-200 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 mr-8">
            <div className="w-8 h-8 bg-primary rounded-2xl flex items-center justify-center">
              <span className="text-white font-serif font-bold text-sm">Z</span>
            </div>
            <span className="font-serif font-bold text-xl text-primary">Zbukurohu</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center ml-8 lg:ml-12 space-x-10 lg:space-x-12" suppressHydrationWarning>
            {navigation.map((item) => {
              const itemWithMega = item as typeof item & { mega?: 'makeup' | 'skincare' | 'services' };
              return (
              <div key={item.name} className="relative"
                onMouseEnter={() => handleMouseEnter(itemWithMega.mega ?? null)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className="text-text-secondary hover:text-primary transition-colors font-medium tracking-wide"
                >
                  {item.name}
                </Link>

                {/* Makeup Mega Menu */}
                {(openMega === 'makeup' && itemWithMega.mega === 'makeup') && (
                  <div className="absolute left-0 mt-3 w-[900px] bg-red-100 rounded-2xl shadow-medium border-2 border-red-500 p-6 grid grid-cols-4 gap-6 z-50">
                    {makeupColumns.map(col => (
                      <div key={col.title}>
                        <div className="font-semibold text-gray-900 mb-3">{col.title}</div>
                        <ul className="space-y-2">
                          {col.items.map(it => (
                            <li key={it}>
                              <Link href={makeLink(it)} className="text-gray-700 hover:text-primary">
                                {it}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="col-span-4 grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-gray-100">
                      {makeupHighlights.map(h => (
                        <Link key={h} href={makeLink(h)} className="font-semibold text-gray-900 hover:text-primary">
                          {h}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skincare Mega Menu */}
                {(openMega === 'skincare' && itemWithMega.mega === 'skincare') && (
                  <div className="absolute left-0 mt-3 w-[760px] bg-blue-100 rounded-2xl shadow-medium border-2 border-blue-500 p-6 grid grid-cols-2 gap-6 z-50">
                    {skincareColumns.map(col => (
                      <div key={col.title}>
                        <div className="font-semibold text-gray-900 mb-3">{col.title}</div>
                        <ul className="space-y-2">
                          {col.items.map(it => (
                            <li key={it}>
                              <Link href={makeLink(it)} className="text-gray-700 hover:text-primary">
                                {it}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Services Mega Menu */}
                {(openMega === 'services' && itemWithMega.mega === 'services') && (
                  <div className="absolute left-0 mt-3 w-[760px] bg-green-100 rounded-2xl shadow-medium border-2 border-green-500 p-6 grid grid-cols-2 gap-6 z-50">
                    {servicesColumns.map(col => (
                      <div key={col.title}>
                        <div className="font-semibold text-gray-900 mb-3">{col.title}</div>
                        <ul className="space-y-2">
                          {col.items.map(it => (
                            <li key={it}>
                              <Link href={makeLink(it)} className="text-gray-700 hover:text-primary">
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
            );})}
          </nav>

          {/* Tablet Navigation (simplified) */}
          <nav className="hidden md:flex lg:hidden items-center ml-4 space-x-6" suppressHydrationWarning>
            {navigation.slice(0, 4).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-text-secondary hover:text-primary transition-colors font-medium text-sm"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
            <SearchBar />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
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
              className="relative p-2 text-text-secondary hover:text-primary transition-colors"
            >
              <Heart className="w-5 h-5" />
              {getWishlistCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getWishlistCount()}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-text-secondary hover:text-primary transition-colors"
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
              className="p-2 text-text-secondary hover:text-primary transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => {
                const itemWithMega = item as typeof item & { mega?: 'makeup' | 'skincare' | 'services' };
                return (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="text-text-secondary hover:text-primary transition-colors font-medium text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {itemWithMega.mega && (
                      <div className="ml-4 mt-3 space-y-4 bg-gray-50 rounded-lg p-3">
                        {itemWithMega.mega === 'makeup' && makeupColumns.map(col => (
                          <div key={col.title}>
                            <div className="font-semibold text-gray-800 text-base mb-2">{col.title}</div>
                            <ul className="ml-2 space-y-2">
                              {col.items.map(it => (
                                <li key={it}>
                                  <Link 
                                    href={makeLink(it)} 
                                    className="text-gray-600 hover:text-primary text-sm block py-1"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {it}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {itemWithMega.mega === 'skincare' && skincareColumns.map(col => (
                          <div key={col.title}>
                            <div className="font-semibold text-gray-800 text-base mb-2">{col.title}</div>
                            <ul className="ml-2 space-y-2">
                              {col.items.map(it => (
                                <li key={it}>
                                  <Link 
                                    href={makeLink(it)} 
                                    className="text-gray-600 hover:text-primary text-sm block py-1"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {it}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {itemWithMega.mega === 'services' && servicesColumns.map(col => (
                          <div key={col.title}>
                            <div className="font-semibold text-gray-800 text-base mb-2">{col.title}</div>
                            <ul className="ml-2 space-y-2">
                              {col.items.map(it => (
                                <li key={it}>
                                  <Link 
                                    href={makeLink(it)} 
                                    className="text-gray-600 hover:text-primary text-sm block py-1"
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
