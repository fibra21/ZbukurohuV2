'use client';

import { useEffect, useState } from 'react';
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
  const { locale, getCartItemCount, getWishlistCount } = useAppStore();

  useEffect(() => setMounted(true), []);

  const effectiveLocale: 'sq-AL' | 'en' = mounted && locale === 'en' ? 'en' : 'sq-AL';

  const navigation = [
    { name: t(effectiveLocale, 'home'), href: '/' },
    { name: t(effectiveLocale, 'find'), href: '/find' },
    { name: t(effectiveLocale, 'categories'), href: '/categories' },
    { name: t(effectiveLocale, 'brands'), href: '/brands' },
    { name: t(effectiveLocale, 'sellers'), href: '/sellers' },
  ];

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
          <nav className="hidden md:flex items-center ml-8 lg:ml-12 space-x-10 lg:space-x-12" suppressHydrationWarning>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-text-secondary hover:text-primary transition-colors font-medium tracking-wide"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Locale Switcher */}
            <LocaleSwitcher />

            {/* Theme Toggle */}
            <ThemeToggle />

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
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-text-secondary hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
      <MiniCartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  );
}
