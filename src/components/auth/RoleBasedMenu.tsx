'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { 
  User, 
  Store, 
  Building2, 
  ShoppingCart, 
  Heart, 
  Settings, 
  LogOut,
  Shield,
  TrendingUp
} from 'lucide-react';

export function RoleBasedMenu() {
  const { user, logout, canAccessDistributorFeatures, canAccessBusinessFeatures } = useAuth();

  if (!user) {
    return (
      <div className="space-y-2">
        <Link
          href="/auth/login"
          className="flex items-center space-x-3 p-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Sign in to your account"
        >
          <User className="w-5 h-5" />
          <span>Sign In</span>
        </Link>
        <Link
          href="/auth/register"
          className="flex items-center space-x-3 p-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Create a new account"
        >
          <User className="w-5 h-5" />
          <span>Sign Up</span>
        </Link>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="space-y-2">
      {/* User Info */}
      <div className="px-3 py-2 border-b border-gray-100">
        <p className="text-sm font-medium text-gray-900">{user.name}</p>
        <p className="text-xs text-gray-500">{user.email}</p>
        <div className="flex items-center space-x-2 mt-1">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            user.role === 'customer' ? 'bg-blue-100 text-blue-800' :
            user.role === 'distributor' ? 'bg-purple-100 text-purple-800' :
            'bg-green-100 text-green-800'
          }`}>
            {user.role === 'customer' && <User className="w-3 h-3 mr-1" />}
            {user.role === 'distributor' && <Store className="w-3 h-3 mr-1" />}
            {user.role === 'business' && <Building2 className="w-3 h-3 mr-1" />}
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </span>
          {user.isVerified && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </span>
          )}
        </div>
      </div>

      {/* Common Menu Items */}
      <Link
        href="/dashboard"
        className="flex items-center space-x-3 p-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Go to your dashboard"
      >
        <TrendingUp className="w-5 h-5" />
        <span>Dashboard</span>
      </Link>

      <Link
        href="/cart"
        className="flex items-center space-x-3 p-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="View your shopping cart"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>Cart</span>
      </Link>

      <Link
        href="/wishlist"
        className="flex items-center space-x-3 p-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="View your wishlist"
      >
        <Heart className="w-5 h-5" />
        <span>Wishlist</span>
      </Link>

      {/* Role-Specific Menu Items */}
      {user.role === 'customer' && (
        <div className="space-y-2">
          <div className="px-3 py-2">
            <p className="text-xs text-gray-500 mb-2">Upgrade Your Account</p>
            <Link
              href="/auth/apply-distributor"
              className="flex items-center space-x-3 p-2 text-sm text-purple-700 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              aria-label="Apply to become a distributor"
            >
              <Store className="w-4 h-4" />
              <span>Apply to Become Distributor</span>
            </Link>
            <Link
              href="/auth/apply-business"
              className="flex items-center space-x-3 p-2 text-sm text-green-700 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Apply for business account"
            >
              <Building2 className="w-4 h-4" />
              <span>Apply for Business Account</span>
            </Link>
          </div>
        </div>
      )}

      {canAccessDistributorFeatures && (
        <div className="space-y-2">
          <div className="px-3 py-2">
            <p className="text-xs text-gray-500 mb-2">Distributor Tools</p>
            <Link
              href="/distributor/products"
              className="flex items-center space-x-3 p-2 text-sm text-purple-700 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              aria-label="Manage your products"
            >
              <Store className="w-4 h-4" />
              <span>Manage Products</span>
            </Link>
            <Link
              href="/distributor/orders"
              className="flex items-center space-x-3 p-2 text-sm text-purple-700 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              aria-label="View distributor orders"
            >
              <TrendingUp className="w-4 h-4" />
              <span>View Orders</span>
            </Link>
          </div>
        </div>
      )}

      {canAccessBusinessFeatures && (
        <div className="space-y-2">
          <div className="px-3 py-2">
            <p className="text-xs text-gray-500 mb-2">Business Tools</p>
            <Link
              href="/business/bulk-orders"
              className="flex items-center space-x-3 p-2 text-sm text-green-700 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Place bulk orders"
            >
              <Building2 className="w-4 h-4" />
              <span>Bulk Orders</span>
            </Link>
            <Link
              href="/business/invoices"
              className="flex items-center space-x-3 p-2 text-sm text-green-700 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="View business invoices"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Invoices</span>
            </Link>
          </div>
        </div>
      )}

      {/* Account Settings */}
      <Link
        href="/account"
        className="flex items-center space-x-3 p-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Manage your account settings"
      >
        <Settings className="w-5 h-5" />
        <span>Account Settings</span>
      </Link>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        aria-label="Sign out of your account"
      >
        <LogOut className="w-5 h-5" />
        <span>Sign Out</span>
      </button>
    </div>
  );
}
