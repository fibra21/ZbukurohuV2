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
import { RoleBasedMenu } from '@/components/auth/RoleBasedMenu';
import { useAppStore } from '@/lib/store';

export function Header() {
  const { user, isAuthenticated } = useAuth();
  const { cart, wishlist, openMega, setOpenMega } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback((type: string) => {
    console.log('Mouse enter:', type); // Debug log
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setOpenMega(type);
  }, [setOpenMega]);

  const handleMouseLeave = useCallback(() => {
    console.log('Mouse leave'); // Debug log
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

  const renderMegaMenu = (type: string) => {
    if (!openMega || openMega !== type) return null;

    const data = megaMenuData[type as keyof typeof megaMenuData];
    if (!data) return null;

    console.log('Rendering mega-menu for:', type, 'openMega:', openMega); // Debug log

    return (
      <div 
        ref={megaMenuRef}
        className="absolute top-full left-0 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 min-w-[600px]"
        onMouseEnter={handleMegaMenuMouseEnter}
        onMouseLeave={handleMegaMenuMouseLeave}
        style={{ border: '2px solid blue' }} // Force visible border for debugging
      >
        <h3 className="text-xl font-bold mb-2">{data.title}</h3>
        <p className="mb-4">{data.description}</p>
        
        {/* Simple horizontal layout */}
        <div className="flex flex-wrap gap-2">
          {data.items.map((item: string) => (
            <div key={item} className="bg-white text-red-500 px-3 py-2 rounded border">
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Top Bar with Trust Signals */}
      <div className="bg-gradient-to-r from-[#F9E7E7] to-[#E5C6A8] border-b border-[#E5C6A8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-6 py-2 text-sm">
            <div className="flex items-center space-x-2 text-[#2E2E2E]">
              <Gift className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              <span>Free Delivery Over €50</span>
            </div>
            <div className="flex items-center space-x-2 text-[#2E2E2E]">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              <span>Authentic Products</span>
            </div>
            <div className="flex items-center space-x-2 text-[#2E2E2E]">
              <Gift className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
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
            <Link href="/" className="flex items-center space-x-3" aria-label="Go to homepage">
              <div className="w-10 h-10 bg-gradient-to-br from-[#F9E7E7] to-[#D4AF37] rounded-xl flex items-center justify-center">
                <span className="text-[#2E2E2E] font-bold text-xl">Z</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#2E2E2E]">Zbukurohu</h1>
                <p className="text-xs text-[#555555] -mt-1">Beauty & Wellness</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name.toLowerCase())}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-[#F9E7E7] transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
                    aria-label={`Browse ${item.name} products`}
                    aria-expanded={openMega === item.name.toLowerCase()}
                    aria-haspopup="true"
                  >
                    <span className="text-lg" aria-hidden="true">{item.icon}</span>
                    <span className="font-medium text-[#2E2E2E] group-hover:text-[#D4AF37]">{item.name}</span>
                    <ChevronDown className="w-4 h-4 text-[#555555] group-hover:text-[#D4AF37] transition-colors duration-200" aria-hidden="true" />
                  </Link>
                  {renderMegaMenu(item.name.toLowerCase())}
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <button
                onClick={() => console.log('Search clicked')}
                className="group p-3 text-[#555555] hover:text-[#D4AF37] transition-all duration-300 hover:scale-125 hover:bg-[#F9E7E7] rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
                aria-label="Open search"
              >
                <Search className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Wishlist */}
              <Link 
                href="/wishlist"
                className="p-3 text-[#555555] hover:text-[#D4AF37] hover:bg-[#F9E7E7] rounded-lg transition-colors relative focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
                aria-label={`View wishlist (${wishlist.length} items)`}
              >
                <Heart className="w-5 h-5" aria-hidden="true" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-white text-xs rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button 
                onClick={() => useAppStore.getState().setIsCartOpen(true)}
                className="p-3 text-[#555555] hover:text-[#D4AF37] hover:bg-[#F9E7E7] rounded-lg transition-colors relative focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
                aria-label={`View shopping cart (${cart.length} items)`}
              >
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
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
                  className="flex items-center space-x-2 p-3 text-[#555555] hover:text-[#D4AF37] hover:bg-[#F9E7E7] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
                  aria-label={isUserMenuOpen ? "Close user menu" : "Open user menu"}
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="w-8 h-8 bg-[#F9E7E7] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#555555]" aria-hidden="true" />
                </button>

                {isUserMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                    role="menu"
                    aria-label="User account menu"
                  >
                    <RoleBasedMenu />
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 text-[#555555] hover:text-[#D4AF37] hover:bg-[#F9E7E7] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
                aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 max-h-[80vh] overflow-y-auto bg-white rounded-b-2xl shadow-lg border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 p-4 bg-[#F9E7E7] rounded-xl hover:bg-[#E5C6A8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label={`Browse ${item.name} products`}
                  >
                    <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                    <div>
                      <p className="font-medium text-[#2E2E2E]">{item.name}</p>
                      <p className="text-sm text-[#555555]">Browse collection</p>
                    </div>
                  </Link>
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
