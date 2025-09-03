'use client';

import { useState, useCallback, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
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
  Star,
  Eye,
  Smile,
  PaintBucket,
  Droplets,
  Zap,
  Flower,
  Headphones
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

// Dynamic imports for performance optimization
const MiniCartDrawer = dynamic(() => import('@/components/cart/MiniCartDrawer').then(mod => ({ default: mod.MiniCartDrawer })), {
  loading: () => <div className="w-8 h-8 bg-neutral-200 rounded-lg animate-pulse" />,
  ssr: false
});

const RoleBasedMenu = dynamic(() => import('@/components/auth/RoleBasedMenu').then(mod => ({ default: mod.RoleBasedMenu })), {
  loading: () => <div className="w-8 h-8 bg-neutral-200 rounded-lg animate-pulse" />,
  ssr: false
});

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
    { name: 'Makeup', href: '/categories/makeup', icon: <Palette className="w-5 h-5" />, key: 'makeup' },
    { name: 'Skincare', href: '/categories/skincare', icon: <Sparkles className="w-5 h-5" />, key: 'skincare' },
    { name: 'Haircare', href: '/categories/haircare', icon: <Scissors className="w-5 h-5" />, key: 'haircare' },
    { name: 'Fragrances', href: '/categories/fragrances', icon: <Flower className="w-5 h-5" />, key: 'fragrances' },
    { name: 'Services', href: '/services', icon: <Headphones className="w-5 h-5" />, key: 'services' },
    { name: 'Offers', href: '/offers', icon: <Gift className="w-5 h-5" />, key: 'offers' }
  ];

  const megaMenuData = {
    makeup: {
      title: 'Makeup by Face & Body Parts',
      description: 'Complete makeup collection organized by areas',
      sections: [
        {
          title: 'Face',
          icon: <Smile className="w-4 h-4" />,
          items: [
            { name: 'Foundation', href: '/categories/foundation' },
            { name: 'Concealer', href: '/categories/concealer' },
            { name: 'Blush', href: '/categories/blush' },
            { name: 'Bronzer', href: '/categories/bronzer' },
            { name: 'Highlighter', href: '/categories/highlighter' },
            { name: 'Setting Powder', href: '/categories/setting-powder' }
          ]
        },
        {
          title: 'Eyes',
          icon: <Eye className="w-4 h-4" />,
          items: [
            { name: 'Mascara', href: '/categories/mascara' },
            { name: 'Eyeliner', href: '/categories/eyeliner' },
            { name: 'Eyeshadow', href: '/categories/eyeshadow' },
            { name: 'Brows', href: '/categories/brows' }
          ]
        },
        {
          title: 'Lips',
          icon: <Heart className="w-4 h-4" />,
          items: [
            { name: 'Lipstick', href: '/categories/lipstick' },
            { name: 'Lip Gloss', href: '/categories/lip-gloss' },
            { name: 'Lip Liner', href: '/categories/lip-liner' },
            { name: 'Lip Care', href: '/categories/lip-care' }
          ]
        },
        {
          title: 'Nails',
          icon: <PaintBucket className="w-4 h-4" />,
          items: [
            { name: 'Nail Polish', href: '/categories/nail-polish' },
            { name: 'Nail Care', href: '/categories/nail-care' },
            { name: 'Tools & Accessories', href: '/categories/nail-tools' }
          ]
        }
      ]
    },
    skincare: {
      title: 'Skincare Solutions',
      description: 'Targeted skincare for every concern and need',
      sections: [
        {
          title: 'By Skin Concern',
          icon: <Zap className="w-4 h-4" />,
          items: [
            { name: 'Acne', href: '/categories/acne-treatment' },
            { name: 'Dryness', href: '/categories/dry-skin' },
            { name: 'Anti-Aging', href: '/categories/anti-aging' },
            { name: 'Dark Spots', href: '/categories/dark-spots' },
            { name: 'Sensitivity', href: '/categories/sensitive-skin' },
            { name: 'Oily/Combo', href: '/categories/oily-skin' },
            { name: 'Sun Protection', href: '/categories/sun-protection' }
          ]
        },
        {
          title: 'By Product Type',
          icon: <Droplets className="w-4 h-4" />,
          items: [
            { name: 'Cleansers', href: '/categories/cleansers' },
            { name: 'Toners', href: '/categories/toners' },
            { name: 'Serums', href: '/categories/serums' },
            { name: 'Moisturizers', href: '/categories/moisturizers' },
            { name: 'Eye Care', href: '/categories/eye-care' },
            { name: 'Masks', href: '/categories/masks' },
            { name: 'Sunscreen', href: '/categories/sunscreen' }
          ]
        }
      ]
    },
    haircare: {
      title: 'Haircare Solutions',
      description: 'Transform your hair with targeted treatments',
      sections: [
        {
          title: 'By Hair Concern',
          icon: <Zap className="w-4 h-4" />,
          items: [
            { name: 'Dandruff', href: '/categories/dandruff' },
            { name: 'Hair Loss', href: '/categories/hair-loss' },
            { name: 'Dry/Damaged', href: '/categories/dry-damaged-hair' },
            { name: 'Frizz Control', href: '/categories/frizz-control' },
            { name: 'Color Protection', href: '/categories/color-protection' }
          ]
        },
        {
          title: 'By Product Type',
          icon: <Droplets className="w-4 h-4" />,
          items: [
            { name: 'Shampoo', href: '/categories/shampoo' },
            { name: 'Conditioner', href: '/categories/conditioner' },
            { name: 'Treatments', href: '/categories/hair-treatments' },
            { name: 'Hair Oils', href: '/categories/hair-oils' },
            { name: 'Styling Products', href: '/categories/hair-styling' }
          ]
        }
      ]
    },
    fragrances: {
      title: 'Fragrance Collection',
      description: 'Discover your signature scent',
      sections: [
        {
          title: 'Shop by Category',
          icon: <Flower className="w-4 h-4" />,
          items: [
            { name: 'Women', href: '/categories/fragrances-women' },
            { name: 'Men', href: '/categories/fragrances-men' },
            { name: 'Unisex', href: '/categories/fragrances-unisex' },
            { name: 'Body Mists', href: '/categories/body-mists' },
            { name: 'Gift Sets', href: '/categories/fragrance-gift-sets' }
          ]
        }
      ]
    },
    services: {
      title: 'Beauty Services',
      description: 'Professional beauty services and consultations',
      sections: [
        {
          title: 'Our Services',
          icon: <Star className="w-4 h-4" />,
          items: [
            { name: 'Skin Consultation', href: '/services/skin-consultation' },
            { name: 'Makeup Services', href: '/services/makeup' },
            { name: 'Gift Wrapping', href: '/services/gift-wrapping' },
            { name: 'Subscriptions', href: '/services/subscriptions' }
          ]
        }
      ]
    },
    offers: {
      title: 'Special Offers',
      description: 'Exclusive deals and seasonal collections',
      sections: [
        {
          title: 'Current Offers',
          icon: <Gift className="w-4 h-4" />,
          items: [
            { name: 'Flash Sales', href: '/offers/flash-sales' },
            { name: 'Bundle Deals', href: '/offers/bundles' },
            { name: 'New Arrivals', href: '/offers/new-arrivals' },
            { name: 'Seasonal Sets', href: '/offers/seasonal' },
            { name: 'VIP Benefits', href: '/offers/vip' },
            { name: 'Limited Edition', href: '/offers/limited-edition' }
          ]
        }
      ]
    }
  };

  const renderMegaMenu = (type: string, isMobile: boolean = false) => {
    if (!openMega || openMega !== type) return null;

    const data = megaMenuData[type as keyof typeof megaMenuData];
    if (!data) return null;

    // All categories now use sections structure
    if ('sections' in data) {
      if (isMobile) {
        return (
          <div className="mt-4 p-4 bg-surface-muted rounded-xl border border-neutral-200 shadow-sm">
            <h4 className="font-bold text-text-primary mb-3 font-heading">{data.title}</h4>
            <p className="text-sm text-text-secondary mb-4 font-body">{data.description}</p>
            <div className="space-y-4">
              {data.sections.map((section: { title: string; icon: React.ReactNode; items: { name: string; href: string }[] }) => (
                <div key={section.title}>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="text-brand-accent">{section.icon}</div>
                    <h5 className="font-semibold text-brand-accent text-sm font-heading">{section.title}</h5>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {section.items.map((item: { name: string; href: string }) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group bg-surface-elevated text-text-primary px-3 py-2 rounded-lg text-sm text-center hover:bg-brand-primary transition-all duration-200 border border-transparent hover:border-brand-accent font-body hover:shadow-sm"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setActiveMobileMenu(null);
                        }}
                      >
                        <span className="group-hover:text-brand-accent-dark transition-colors">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      // Desktop mega menu with enhanced design
      const isWideMenu = type === 'makeup' || type === 'skincare' || type === 'haircare';
      const menuWidth = isWideMenu ? 'w-[600px]' : 'w-[450px]';
      const gridCols = isWideMenu && data.sections.length > 2 ? 'grid-cols-3' : data.sections.length === 2 ? 'grid-cols-2' : 'grid-cols-2';

      return (
        <div 
          ref={megaMenuRef}
          className={`absolute top-full left-1/2 transform -translate-x-1/2 bg-surface-elevated text-text-primary p-4 rounded-lg shadow-lg border border-neutral-200 z-40 ${menuWidth} max-w-[80vw] mt-1 mega-menu`}
          onMouseEnter={handleMegaMenuMouseEnter}
          onMouseLeave={handleMegaMenuMouseLeave}
        >
          <div className="text-center mb-3">
            <h3 className="text-base font-bold text-text-primary font-heading mb-1">{data.title}</h3>
            <p className="text-text-secondary text-xs font-body">{data.description}</p>
          </div>
          
          {/* Enhanced sections layout */}
          <div className={`grid ${gridCols} gap-3`}>
            {data.sections.map((section: { title: string; icon: React.ReactNode; items: { name: string; href: string }[] }) => (
              <div key={section.title} className="space-y-1.5">
                <div className="flex items-center space-x-2 mb-2 pb-1 border-b border-brand-primary/20">
                  <div className="w-5 h-5 bg-brand-accent/10 rounded-md flex items-center justify-center text-brand-accent">
                    {section.icon}
                  </div>
                  <h4 className="font-bold text-brand-accent font-heading text-xs">{section.title}</h4>
                </div>
                <div className="space-y-1">
                  {section.items.map((item: { name: string; href: string }) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group flex items-center space-x-2 bg-brand-primary/15 text-text-primary px-2 py-1.5 rounded-md text-xs hover:bg-brand-secondary transition-all duration-200 border border-transparent hover:border-brand-accent hover:shadow-sm font-body"
                    >
                      <span className="w-1 h-1 bg-brand-accent/60 rounded-full group-hover:bg-brand-accent transition-colors"></span>
                      <span className="group-hover:text-brand-accent-dark transition-colors font-medium">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-3 pt-2 border-t border-neutral-200">
            <Link
              href={`/categories/${type}`}
              className="inline-flex items-center space-x-2 text-brand-accent hover:text-brand-accent-dark font-semibold text-xs transition-colors"
            >
              <span>View All {data.title}</span>
              <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            </Link>
          </div>
        </div>
      );
    }

    return null;
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
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
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
            <nav className="hidden lg:flex items-center space-x-4 flex-1 justify-center max-w-4xl mx-8">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative nav-item"
                  onMouseEnter={() => handleMouseEnter(item.key)}
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
                  {renderMegaMenu(item.key, false)}
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
                aria-label="Open search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart - Always visible */}
              <button 
                onClick={() => useAppStore.getState().setIsCartOpen(true)}
                className="p-2 text-[#555555] hover:text-[#D4AF37] hover:bg-[#F9E7E7] rounded-lg transition-colors relative"
                aria-label="Open shopping cart"
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
                aria-label="View wishlist"
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
                      onClick={() => toggleMobileMenu(item.key)}
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
                          activeMobileMenu === item.key ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {/* Mobile Mega Menu */}
                    {activeMobileMenu === item.key && 
                     renderMegaMenu(item.key, true)}
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
