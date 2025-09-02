'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  LogOut,
  Settings,
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    }, 100); // Reduced delay for better responsiveness
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

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setOpenMega(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setOpenMega]);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
  };

  const navigation = [
    { name: 'Skincare', href: '/categories/skincare', icon: '✨' },
    { name: 'Makeup', href: '/categories/makeup', icon: '💄' },
    { name: 'Haircare', href: '/categories/haircare', icon: '💇‍♀️' },
    { name: 'Brands', href: '/brands', icon: '🏷️' },
    { name: 'Offers', href: '/offers', icon: '🎁' },
    { name: 'Services', href: '/services', icon: '🎨' }
  ];

  const skincareCategories = [
    { title: 'Cleansers', items: ['Face Wash', 'Micellar Water', 'Cleansing Oil'] },
    { title: 'Treatments', items: ['Serums', 'Toners', 'Essences'] },
    { title: 'Moisturizers', items: ['Day Cream', 'Night Cream', 'Gel'] },
    { title: 'Sun Protection', items: ['Sunscreen', 'SPF Cream', 'UV Protection'] }
  ];

  const makeupCategories = [
    { title: 'Face', items: ['Foundation', 'Concealer', 'Powder', 'Blush'] },
    { title: 'Eyes', items: ['Eyeshadow', 'Eyeliner', 'Mascara', 'Brows'] },
    { title: 'Lips', items: ['Lipstick', 'Lip Gloss', 'Lip Liner'] },
    { title: 'Tools', items: ['Brushes', 'Sponges', 'Mirrors'] }
  ];

  const haircareCategories = [
    { title: 'Hair Care', items: ['Shampoo', 'Conditioner', 'Hair Masks', 'Hair Oils'] },
    { title: 'Styling', items: ['Hair Spray', 'Hair Gel', 'Texturizing Sprays'] },
    { title: 'Hair Tools', items: ['Hair Dryers', 'Straighteners', 'Curling Irons'] },
    { title: 'Hair Accessories', items: ['Hair Clips', 'Headbands', 'Hair Ties'] }
  ];

  const brandsCategories = [
    { title: 'Luxury', items: ['MAC', 'Urban Decay', 'Too Faced', 'Anastasia Beverly Hills'] },
    { title: 'Drugstore', items: ['L\'Oréal', 'Maybelline', 'CoverGirl', 'Revlon'] },
    { title: 'Skincare', items: ['The Ordinary', 'CeraVe', 'Neutrogena', 'Clinique'] },
    { title: 'Indie', items: ['Glossier', 'Fenty Beauty', 'Huda Beauty', 'Pat McGrath'] }
  ];

  const offersCategories = [
    { title: 'Seasonal', items: ['Autumn Essentials', 'Holiday Collections', 'Summer Must-Haves'] },
    { title: 'Deals', items: ['Flash Sales', 'Bundle Offers', 'Clearance Items'] },
    { title: 'Membership', items: ['VIP Benefits', 'Loyalty Rewards', 'Early Access'] },
    { title: 'New Arrivals', items: ['Latest Products', 'Trending Items', 'Limited Edition'] }
  ];

  const servicesCategories = [
    { title: 'Beauty Services', items: ['Makeup Artist', 'Nail Technician', 'Hair Stylist'] },
    { title: 'Wellness', items: ['Facial Treatments', 'Massage Therapy', 'Spa Services'] },
    { title: 'Consultations', items: ['Skin Analysis', 'Color Matching', 'Product Recommendations'] },
    { title: 'Events', items: ['Wedding Makeup', 'Party Looks', 'Special Occasions'] }
  ];

  const renderMegaMenu = (type: string) => {
    if (!openMega || openMega !== type) return null;

    let categories: { title: string; items: string[] }[] = [];
    let title = '';
    let description = '';

    switch (type) {
      case 'skincare':
        categories = skincareCategories;
        title = 'Skincare Collection';
        description = 'Nourish and protect your skin with premium products';
        break;
      case 'makeup':
        categories = makeupCategories;
        title = 'Makeup Collection';
        description = 'Express your beauty with professional cosmetics';
        break;
      case 'haircare':
        categories = haircareCategories;
        title = 'Haircare Collection';
        description = 'Transform your hair with expert care products';
        break;
      case 'brands':
        categories = brandsCategories;
        title = 'Brand Collections';
        description = 'Discover premium beauty brands and their stories';
        break;
      case 'offers':
        categories = offersCategories;
        title = 'Special Offers';
        description = 'Exclusive deals and seasonal collections';
        break;
      case 'services':
        categories = servicesCategories;
        title = 'Beauty Services';
        description = 'Professional beauty services at your fingertips';
        break;
      default:
        return null;
    }

    return (
      <div 
        ref={megaMenuRef}
        className="absolute top-full left-0 right-0 bg-white rounded-b-2xl shadow-lg border border-gray-100 z-50"
        onMouseEnter={handleMegaMenuMouseEnter}
        onMouseLeave={handleMegaMenuMouseLeave}
      >
        <div className="max-w-7xl mx-auto p-8">
          {/* Header Section */}
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-[#2E2E2E] mb-3">
              {title}
            </h3>
            <p className="text-[#555555] text-lg max-w-2xl">
              {description}
            </p>
          </div>
          
          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div key={category.title} className="space-y-4">
                <h4 className="font-semibold text-[#2E2E2E] text-base uppercase tracking-wide border-b border-[#F9E7E7] pb-2">
                  {category.title}
                </h4>
                <ul className="space-y-2">
                  {category.items.map((item: string) => (
                    <li key={item}>
                      <Link 
                        href={`/categories/${type}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-[#555555] hover:text-[#D4AF37] text-sm transition-colors duration-300 block py-2 px-3 hover:bg-[#F9E7E7] rounded-lg -ml-3"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-[#F9E7E7]">
            <Link 
              href={`/categories/${type}`}
              className="inline-flex items-center space-x-2 text-[#D4AF37] hover:text-[#B8941F] font-medium transition-colors text-base"
            >
              <span>View All {type}</span>
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </Link>
          </div>
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
              <Gift className="w-4 h-4 text-[#D4AF37]" />
              <span>Free Delivery Over €50</span>
            </div>
            <div className="flex items-center space-x-2 text-[#2E2E2E]">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center space-x-2 text-[#2E2E2E]">
              <Gift className="w-4 h-4 text-[#D4AF37]" />
              <span>Customer Rating 4.9/5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#F9E7E7] to-[#D4AF37] rounded-xl flex items-center justify-center">
                <span className="text-[#2E2E2E] font-bold text-xl">Z</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#2E2E2E]">Zbukurohu</h1>
                <p className="text-xs text-[#555555] -mt-1">Beauty & Wellness</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
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
                  {renderMegaMenu(item.name.toLowerCase())}
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
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
                className="p-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-3 text-[#555555] hover:text-[#D4AF37] hover:bg-[#F9E7E7] rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-[#F9E7E7] rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <span className="hidden sm:block font-medium">{user?.name}</span>
                    <ChevronDown className="w-4 h-4 text-[#555555]" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                      <Link
                        href="/dashboard"
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 text-[#2E2E2E] hover:text-[#D4AF37] font-medium transition-colors"
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
              <div className="grid grid-cols-2 gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 p-4 bg-[#F9E7E7] rounded-xl hover:bg-[#E5C6A8] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-2xl">{item.icon}</span>
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
