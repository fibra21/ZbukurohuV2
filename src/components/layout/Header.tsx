'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Gift,
  Sparkles
} from 'lucide-react';
import { MiniCartDrawer } from '@/components/cart/MiniCartDrawer';
import { useAppStore } from '@/lib/store';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const { cart, wishlist, openMega, setOpenMega } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback((type: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setOpenMega(type);
  }, [setOpenMega]);

  const handleMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenMega(null);
    }, 100);
  }, [setOpenMega]);

  const handleMegaMenuMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  }, []);

  const handleMegaMenuMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenMega(null);
    }, 100);
  }, [setOpenMega]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setOpenMega(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setOpenMega]);

  const navigation = [
    { name: 'Skincare', href: '/categories/skincare', icon: '✨' },
    { name: 'Makeup', href: '/categories/makeup', icon: '💄' },
    { name: 'Haircare', href: '/categories/haircare', icon: '💇‍♀️' },
    { name: 'Brands', href: '/brands', icon: '🏷️' },
    { name: 'Offers', href: '/offers', icon: '🎁' },
    { name: 'Services', href: '/services', icon: '🎨' }
  ];

  const megaMenuData = {
    skincare: {
      title: 'Skincare Collection',
      description: 'Nourish and protect your skin with premium products',
      items: ['Cleansers', 'Moisturizers', 'Serums', 'Sunscreen', 'Masks', 'Toners']
    },
    makeup: {
      title: 'Makeup Collection',
      description: 'Express your beauty with professional cosmetics',
      items: ['Foundation', 'Lipstick', 'Eyeshadow', 'Mascara', 'Blush', 'Brushes']
    },
    haircare: {
      title: 'Haircare Collection',
      description: 'Transform your hair with expert care products',
      items: ['Shampoo', 'Conditioner', 'Hair Masks', 'Styling', 'Hair Oils', 'Tools']
    },
    brands: {
      title: 'Brand Collections',
      description: 'Discover premium beauty brands and their stories',
      items: ['MAC', 'L\'Oréal', 'The Ordinary', 'Urban Decay', 'CeraVe', 'Fenty Beauty']
    },
    offers: {
      title: 'Special Offers',
      description: 'Exclusive deals and seasonal collections',
      items: ['Autumn Essentials', 'Holiday Collections', 'Flash Sales', 'VIP Benefits', 'New Arrivals', 'Limited Edition']
    },
    services: {
      title: 'Beauty Services',
      description: 'Professional beauty services at your fingertips',
      items: ['Makeup Artist', 'Nail Technician', 'Hair Stylist', 'Facial Treatments', 'Wedding Makeup', 'Consultations']
    }
  };

  const renderMegaMenu = (type: string, isMobile: boolean = false) => {
    if (!openMega || openMega !== type) return null;

    const data = megaMenuData[type as keyof typeof megaMenuData];
    if (!data) return null;

    if (isMobile) {
      return (
        <div className="mt-4 p-4 bg-[#F9E7E7] rounded-xl">
          <h4 className="font-bold text-[#2E2E2E] mb-3">{data.title}</h4>
          <p className="text-sm text-[#555555] mb-4">{data.description}</p>
          <div className="grid grid-cols-2 gap-2">
            {data.items.map((item: string) => (
              <Link
                key={item}
                href={`/categories/${type}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white text-[#2E2E2E] px-3 py-2 rounded-lg text-sm text-center hover:bg-[#E5C6A8] transition-colors"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setActiveMobileMenu(null);
                }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div 
        ref={megaMenuRef}
        className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white text-[#2E2E2E] p-6 rounded-xl shadow-xl border border-gray-200 z-50 w-[500px] max-w-[calc(100vw-2rem)]"
        onMouseEnter={handleMegaMenuMouseEnter}
        onMouseLeave={handleMegaMenuMouseLeave}
      >
        <h3 className="text-xl font-bold mb-3 text-center text-[#2E2E2E]">{data.title}</h3>
        <p className="mb-4 text-center text-[#555555] text-sm">{data.description}</p>
        
        {/* Clickable horizontal layout */}
        <div className="grid grid-cols-3 gap-3">
          {data.items.map((item: string) => (
            <Link
              key={item}
              href={`/categories/${type}/${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-[#F9E7E7] text-[#2E2E2E] px-3 py-2 rounded-lg text-sm text-center hover:bg-[#E5C6A8] transition-colors border border-transparent hover:border-[#D4AF37]"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const toggleMobileMenu = (type: string) => {
    if (activeMobileMenu === type) {
      setActiveMobileMenu(null);
    } else {
      setActiveMobileMenu(type);
      setOpenMega(type);
    }
  };

  return (
    <>
      {/* Top Bar with Trust Signals */}
      <div className="bg-gradient-to-r from-[#F9E7E7] to-[#E5C6A8] border-b border-[#E5C6A8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-6 py-2 text-sm">
            <div className="flex items-center space-x-2 text-[#2E2E2E]">
              <Gift className="w-4 h-4 text-[#D4AF37]" />
              <span>Free Delivery Over €50</span>
            </div>
            <div className="flex items-center space-x-2 text-[#2E2E2E]">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Authentic Products</span>
            </div>
            <div className="flex items-center space-x-2 text-[#2E2E2E]">
              <Gift className="w-4 h-4 text-[#D4AF37]" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-[#F9E7E7] to-[#D4AF37] rounded-xl flex items-center justify-center">
                <span className="text-[#2E2E2E] font-bold text-xl">Z</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#2E2E2E]">Zbukurohu</h1>
                <p className="text-xs text-[#555555] -mt-1">Beauty & Wellness</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name.toLowerCase())}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-[#F9E7E7] transition-colors duration-200 group"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium text-[#2E2E2E] group-hover:text-[#D4AF37]">{item.name}</span>
                    <ChevronDown className="w-4 h-4 text-[#555555] group-hover:text-[#D4AF37] transition-colors duration-200" />
                  </Link>
                  {renderMegaMenu(item.name.toLowerCase(), false)}
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              {/* Search */}
              <button
                onClick={() => console.log('Search clicked')}
                className="group p-3 text-[#555555] hover:text-[#D4AF37] transition-all duration-300 hover:scale-125 hover:bg-[#F9E7E7] rounded-full"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link 
                href="/wishlist"
                className="p-3 text-[#555555] hover:text-[#D4AF37] hover:bg-[#F9E7E7] rounded-lg transition-colors relative"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-white text-xs rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button 
                onClick={() => useAppStore.getState().setIsCartOpen(true)}
                className="p-3 text-[#555555] hover:text-[#D4AF37] hover:bg-[#F9E7E7] rounded-lg transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-white text-xs rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-3 text-[#555555] hover:text-[#D4AF37] hover:bg-[#F9E7E7] rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-[#F9E7E7] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#555555]" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-[#2E2E2E]">{user?.name || 'User'}</p>
                          <p className="text-xs text-[#555555]">{user?.email}</p>
                        </div>
                        <Link
                          href="/account"
                          className="block px-4 py-2 text-[#2E2E2E] hover:text-[#D4AF37] font-medium transition-colors"
                        >
                          Account Settings
                        </Link>
                        <button
                          onClick={logout}
                          className="block w-full text-left px-4 py-2 text-[#2E2E2E] hover:text-[#D4AF37] font-medium transition-colors"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <div className="px-4 py-2 space-y-2">
                        <Link
                          href="/auth/login"
                          className="block px-4 py-2 text-[#2E2E2E] hover:text-[#D4AF37] font-medium transition-colors"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/auth/register"
                          className="px-4 py-2 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#B8941F] transition-colors"
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 text-[#555555] hover:text-[#D4AF37] hover:bg-[#F9E7E7] rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 max-h-[80vh] overflow-y-auto bg-white rounded-b-2xl shadow-lg border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-4">
                {navigation.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <button
                      onClick={() => toggleMobileMenu(item.name.toLowerCase())}
                      className="w-full flex items-center justify-between p-4 bg-[#F9E7E7] rounded-xl hover:bg-[#E5C6A8] transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div className="text-left">
                          <p className="font-medium text-[#2E2E2E]">{item.name}</p>
                          <p className="text-sm text-[#555555]">Browse collection</p>
                        </div>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 text-[#555555] transition-transform ${
                          activeMobileMenu === item.name.toLowerCase() ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {/* Mobile Mega Menu */}
                    {activeMobileMenu === item.name.toLowerCase() && 
                     renderMegaMenu(item.name.toLowerCase(), true)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mini Cart Drawer */}
      <MiniCartDrawer open={useAppStore.getState().isCartOpen} onOpenChange={useAppStore.getState().setIsCartOpen} />
    </>
  );
}
