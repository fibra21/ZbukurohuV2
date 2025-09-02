'use client';

import { useState, useCallback } from 'react';
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

  const handleMouseEnter = useCallback((type: string) => {
    setOpenMega(type);
  }, [setOpenMega]);

  const handleMouseLeave = useCallback(() => {
    setTimeout(() => {
      setOpenMega(null);
    }, 200);
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

    let categories: any[] = [];
    let title = '';
    let color = '';

    switch (type) {
      case 'skincare':
        categories = skincareCategories;
        title = 'Skincare Collection';
        color = 'from-blue-500 to-cyan-500';
        break;
      case 'makeup':
        categories = makeupCategories;
        title = 'Makeup Collection';
        color = 'from-pink-500 to-rose-500';
        break;
      case 'haircare':
        categories = haircareCategories;
        title = 'Haircare Collection';
        color = 'from-green-500 to-emerald-500';
        break;
      case 'brands':
        categories = brandsCategories;
        title = 'Brand Collections';
        color = 'from-purple-500 to-violet-500';
        break;
      case 'offers':
        categories = offersCategories;
        title = 'Special Offers';
        color = 'from-orange-500 to-red-500';
        break;
      case 'services':
        categories = servicesCategories;
        title = 'Beauty Services';
        color = 'from-indigo-500 to-blue-500';
        break;
      default:
        return null;
    }

    return (
      <div 
        className="absolute top-full left-0 right-0 bg-white rounded-b-2xl shadow-xl border border-gray-100 p-8 z-50"
        onMouseEnter={() => handleMouseEnter(type)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h3 className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-4`}>
                {title}
              </h3>
              <p className="text-gray-600 mb-6">
                Discover our curated collection of premium beauty products and services
              </p>
              <Link 
                href={`/categories/${type}`}
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium"
              >
                <span>View All {type}</span>
                <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              </Link>
            </div>
            
            <div className="md:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <div key={category.title}>
                    <h4 className="font-semibold text-gray-900 mb-3">{category.title}</h4>
                    <ul className="space-y-2">
                                             {category.items.map((item: string) => (
                         <li key={item}>
                           <Link 
                             href={`/categories/${type}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                             className="text-gray-600 hover:text-primary text-sm transition-colors"
                           >
                             {item}
                           </Link>
                         </li>
                       ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Top Bar with Trust Signals */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-6 py-2 text-sm">
            <div className="flex items-center space-x-2 text-gray-700">
              <Gift className="w-4 h-4 text-primary" />
              <span>Free Delivery Over €50</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Gift className="w-4 h-4 text-primary" />
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
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">Z</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Zbukurohu</h1>
                <p className="text-xs text-gray-500 -mt-1">Beauty & Wellness</p>
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
                    className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium text-gray-700">{item.name}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
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
                className="group p-3 text-gray-600 hover:text-primary transition-all duration-300 hover:scale-125 hover:bg-gray-50 rounded-full"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link 
                href="/wishlist"
                className="p-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors relative"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
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
                    className="flex items-center space-x-2 p-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <span className="hidden sm:block font-medium">{user?.name}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
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
                    className="px-4 py-2 text-gray-700 hover:text-primary font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
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
                    className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">Browse collection</p>
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
