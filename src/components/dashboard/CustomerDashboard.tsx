'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Package, Heart, Clock, Star, ShoppingBag, Calendar, MapPin } from 'lucide-react';

interface CustomerDashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export function CustomerDashboard({ user }: CustomerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app, this would come from API
  const mockOrders = [
    {
      id: '1',
      orderNumber: '#ZBK-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 89.99,
      items: [
        { name: 'L\'Oréal Paris True Match Foundation', quantity: 1, price: 24.99 },
        { name: 'Neutrogena Ultra Sheer Sunscreen', quantity: 2, price: 32.50 }
      ]
    },
    {
      id: '2',
      orderNumber: '#ZBK-2024-002',
      date: '2024-01-20',
      status: 'shipped',
      total: 156.75,
      items: [
        { name: 'Urban Decay Naked3 Eyeshadow Palette', quantity: 1, price: 54.00 },
        { name: 'The Ordinary Niacinamide', quantity: 1, price: 12.75 }
      ]
    }
  ];

  const mockWishlist = [
    {
      id: '1',
      name: 'MAC Ruby Woo Lipstick',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=150&h=150&fit=crop',
      rating: 4.8,
      reviewsCount: 1247
    },
    {
      id: '2',
      name: 'Clinique Moisture Surge',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=150&h=150&fit=crop',
      rating: 4.6,
      reviewsCount: 892
    }
  ];

  const mockRecentActivity = [
    {
      id: '1',
      type: 'order',
      message: 'Order #ZBK-2024-002 has been shipped',
      date: '2 hours ago',
      icon: Package
    },
    {
      id: '2',
      type: 'wishlist',
      message: 'Added MAC Ruby Woo to wishlist',
      date: '1 day ago',
      icon: Heart
    },
    {
      id: '3',
      type: 'review',
      message: 'Left a 5-star review for L\'Oréal Foundation',
      date: '3 days ago',
      icon: Star
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'reviews', label: 'My Reviews', icon: Star }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {user.name}! 👋</h2>
            <p className="text-white/90">Here's what's happening with your beauty journey</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{mockOrders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Wishlist Items</p>
              <p className="text-2xl font-bold text-gray-900">{mockWishlist.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Reviews Given</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <Link href="/dashboard?tab=orders" className="text-primary hover:text-primary/80 text-sm font-medium">
              View All
            </Link>
          </div>
        </div>
        <div className="p-6">
          {mockOrders.slice(0, 2).map((order) => (
            <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.orderNumber}</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">€{order.total}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockRecentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <activity.icon className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Order History</h3>
        </div>
        <div className="p-6">
          {mockOrders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-xl p-4 mb-4 last:mb-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{order.orderNumber}</h4>
                  <p className="text-sm text-gray-600">Placed on {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">€{order.total}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{item.name} x{item.quantity}</span>
                    <span className="text-gray-900">€{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <Link 
                  href={`/orders/${order.id}`}
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  View Details
                </Link>
                {order.status === 'delivered' && (
                  <button className="text-primary hover:text-primary/80 text-sm font-medium">
                    Write Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">My Wishlist</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockWishlist.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-start space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">{item.name}</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({item.reviewsCount})</span>
                    </div>
                    <p className="text-lg font-bold text-primary mb-3">€{item.price}</p>
                    <div className="flex space-x-2">
                      <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
                        Add to Cart
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:border-primary hover:text-primary">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">My Reviews</h3>
        </div>
        <div className="p-6">
          <div className="text-center py-8">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
            <p className="text-gray-600 mb-4">Start reviewing products you've purchased to help other customers</p>
            <Link 
              href="/orders"
              className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90"
            >
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Manage your account and track your orders</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-100 mb-8">
        <div className="flex space-x-1 p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'orders' && renderOrders()}
      {activeTab === 'wishlist' && renderWishlist()}
      {activeTab === 'reviews' && renderReviews()}
    </div>
  );
}
