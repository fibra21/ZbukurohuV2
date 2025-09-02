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
  Sparkles,
  Palette,
  Scissors,
  Star
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
    { name: 'Skincare', href: '/categories/skincare', icon: <Sparkles className="w-5 h-5" /> },
    { name: 'Makeup', href: '/categories/makeup', icon: <Palette className="w-5 h-5" /> },
    { name: 'Haircare', href: '/categories/haircare', icon: <Scissors className="w-5 h-5" /> },
    { name: 'Fragrances', href: '/categories/fragrances', icon: <Heart className="w-5 h-5" /> },
    { name: 'Services', href: '/services', icon: <Star className="w-5 h-5" /> },
    { name: 'Offers', href: '/offers', icon: <Gift className="w-5 h-5" /> }
  ];

  const megaMenuData = {
    skincare: {
      title: 'Skincare Collection',
      description: 'Nourish and protect your skin with premium products',
      items: ['Cleansers', 'Moisturizers', 'Serums', 'Sunscreen', 'Masks', 'Toners']
    },
    makeup: {
      title: 'Makeup by Face Parts',
      description: 'Complete makeup collection organized by face areas',
      sections: [
        {
          title: 'Eyes',
          items: ['Eyeshadow', 'Mascara', 'Eyeliner', 'Eyebrows']
        },
        {
          title: 'Face',
          items: ['Foundation', 'Concealer', 'Blush', 'Powder']
        },
        {
          title: 'Lips',
          items: ['Lipstick', 'Lip Gloss', 'Lip Liner', 'Lip Balm']
        }
      ]
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

    // Special handling for makeup with sections
    if (type === 'makeup' && 'sections' in data) {
      if (isMobile) {
        return (
          <div className="mt-4 p-4 bg-surface-muted rounded-xl border border-neutral-200">
            <h4 className="font-bold text-text-primary mb-3 font-heading">{data.title}</h4>
            <p className="text-sm text-text-secondary mb-4 font-body">{data.description}</p>
            <div className="space-y-4">
              {data.sections.map((section: { title: string; items: string[] }) => (
                <div key={section.title}>
                  <h5 className="font-semibold text-brand-accent mb-2 text-sm font-heading">{section.title}</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {section.items.map((item: string) => (
                      <Link
                        key={item}
                        href={`/categories/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="bg-surface-elevated text-text-primary px-3 py-2 rounded-lg text-sm text-center hover:bg-brand-primary transition-colors border border-transparent hover:border-brand-accent font-body"
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
              ))}
            </div>
          </div>
        );
      }

      return (
        <div 
          ref={megaMenuRef}
          className="absolute top-full left-1/2 transform -translate-x-1/2 bg-surface-elevated text-text-primary p-6 rounded-xl shadow-xl border border-neutral-200 z-50 w-[600px] max-w-[calc(100vw-2rem)] mt-2 mega-menu"
          onMouseEnter={handleMegaMenuMouseEnter}
          onMouseLeave={handleMegaMenuMouseLeave}
        >
          <h3 className="text-xl font-bold mb-3 text-center text-text-primary font-heading">{data.title}</h3>
          <p className="mb-6 text-center text-text-secondary text-sm font-body">{data.description}</p>
          
          {/* Face parts layout */}
          <div className="grid grid-cols-3 gap-4">
            {data.sections.map((section: { title: string; items: string[] }) => (
              <div key={section.title} className="space-y-2">
                <h4 className="font-bold text-brand-accent text-center mb-3 font-heading">{section.title}</h4>
                <div className="space-y-2">
                  {section.items.map((item: string) => (
                    <Link
                      key={item}
                      href={`/categories/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block bg-brand-primary text-text-primary px-3 py-2 rounded-lg text-sm text-center hover:bg-brand-secondary transition-colors duration-base border border-transparent hover:border-brand-accent font-body"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Default handling for other categories
    if (isMobile) {
      return (
        <div className="mt-4 p-4 bg-surface-muted rounded-xl border border-neutral-200">
          <h4 className="font-bold text-text-primary mb-3 font-heading">{data.title}</h4>
          <p className="text-sm text-text-secondary mb-4 font-body">{data.description}</p>
          <div className="grid grid-cols-2 gap-2">
            {(data as { items: string[] }).items.map((item: string) => (
              <Link
                key={item}
                href={`/categories/${type}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-surface-elevated text-text-primary px-3 py-2 rounded-lg text-sm text-center hover:bg-brand-primary transition-colors border border-transparent hover:border-brand-accent font-body"
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
        className="absolute top-full left-1/2 transform -translate-x-1/2 bg-surface-elevated text-text-primary p-6 rounded-xl shadow-xl border border-neutral-200 z-50 w-[500px] max-w-[calc(100vw-2rem)] mt-2 mega-menu"
        onMouseEnter={handleMegaMenuMouseEnter}
        onMouseLeave={handleMegaMenuMouseLeave}
      >
        <h3 className="text-xl font-bold mb-3 text-center text-text-primary font-heading">{data.title}</h3>
        <p className="mb-4 text-center text-text-secondary text-sm font-body">{data.description}</p>
        
        {/* Clickable horizontal layout */}
        <div className="grid grid-cols-3 gap-3">
          {(data as { items: string[] }).items.map((item: string) => (
            <Link
              key={item}
              href={`/categories/${type}/${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-brand-primary text-text-primary px-3 py-2 rounded-lg text-sm text-center hover:bg-brand-secondary transition-colors duration-base border border-transparent hover:border-brand-accent font-body"
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
      <header className="sticky top-0 z-40 bg-surface-elevated border-b border-neutral-200 shadow-md w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-4 flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-accent rounded-xl flex items-center justify-center">
                <span className="text-text-primary font-bold text-2xl font-heading">Z</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary font-heading">Zbukurohu</h1>
                <p className="text-xs text-text-secondary -mt-1 font-body">Beauty & Wellness</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4 flex-1 justify-center max-w-5xl mx-10">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative nav-item"
                  onMouseEnter={() => handleMouseEnter(item.name.toLowerCase())}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 py-3 px-4 rounded-lg hover:bg-brand-primary transition-colors duration-base group whitespace-nowrap"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium text-text-primary group-hover:text-brand-accent font-body nav-text">{item.name}</span>
                    <ChevronDown className="w-4 h-4 text-text-secondary group-hover:text-brand-accent transition-colors duration-base" />
                  </Link>
                  {renderMegaMenu(item.name.toLowerCase(), false)}
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-1 flex-shrink-0">
              {/* Mobile Menu Button - Show first on mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 text-[#555555] hover:text-[#D4AF37] hover:bg-[#F9E7E7] rounded-lg transition-colors mobile-menu-button"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Search - Hidden on smallest screens */}
              <button
                onClick={() => console.log('Search clicked')}
                className="hidden sm:block p-2 text-[#555555] hover:text-[#D4AF37] hover:bg-[#F9E7E7] rounded-lg transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart - Always visible */}
              <button 
                onClick={() => useAppStore.getState().setIsCartOpen(true)}
                className="p-2 text-[#555555] hover:text-[#D4AF37] hover:bg-[#F9E7E7] rounded-lg transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-white text-xs rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* Wishlist - Hidden on mobile, shown on larger screens */}
              <Link 
                href="/wishlist"
                className="hidden md:block p-2 text-[#555555] hover:text-[#D4AF37] hover:bg-[#F9E7E7] rounded-lg transition-colors relative"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-white text-xs rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* User Menu - Simplified on mobile */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center p-2 text-[#555555] hover:text-[#D4AF37] hover:bg-[#F9E7E7] rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-[#F9E7E7] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#555555] hidden sm:block ml-1" />
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
                          className="btn-accent text-center block"
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-surface-elevated shadow-xl border-t border-neutral-200 z-50 max-h-[85vh] overflow-y-auto">
            <div className="px-4 py-6">
              {/* Mobile Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-3 bg-surface-muted border border-neutral-200 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                  />
                </div>
              </div>

              {/* Navigation Items */}
              <div className="space-y-3">
                {navigation.map((item) => (
                  <div key={item.name} className="border-b border-neutral-100 pb-3 last:border-b-0">
                    <button
                      onClick={() => toggleMobileMenu(item.name.toLowerCase())}
                      className="w-full flex items-center justify-between p-4 bg-brand-primary rounded-xl hover:bg-brand-secondary transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-brand-accent rounded-lg flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-text-primary font-heading">{item.name}</p>
                          <p className="text-sm text-text-secondary font-body">Browse collection</p>
                        </div>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 text-text-secondary transition-transform ${
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

              {/* Mobile-only Links */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/wishlist"
                    className="flex items-center space-x-3 p-3 bg-surface-muted rounded-lg hover:bg-brand-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart className="w-5 h-5 text-brand-accent" />
                    <span className="font-medium text-text-primary">Wishlist</span>
                    {wishlist.length > 0 && (
                      <span className="ml-auto bg-brand-accent text-text-inverse text-xs px-2 py-1 rounded-full">
                        {wishlist.length}
                      </span>
                    )}
                  </Link>
                  
                  <Link
                    href="/account"
                    className="flex items-center space-x-3 p-3 bg-surface-muted rounded-lg hover:bg-brand-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5 text-brand-accent" />
                    <span className="font-medium text-text-primary">Account</span>
                  </Link>
                </div>
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
