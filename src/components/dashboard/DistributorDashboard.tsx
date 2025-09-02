'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, TrendingUp, Users, DollarSign, Plus, Edit, Eye, BarChart3 } from 'lucide-react';

interface DistributorDashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export function DistributorDashboard({ user }: DistributorDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for distributor
  const mockStats = {
    totalProducts: 24,
    totalSales: 12450.75,
    totalOrders: 89,
    totalCustomers: 156
  };

  const mockProducts = [
    {
      id: '1',
      name: 'L\'Oréal Paris True Match Foundation',
      price: 24.99,
      stock: 45,
      status: 'active',
      sales: 23,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop'
    },
    {
      id: '2',
      name: 'Neutrogena Ultra Sheer Sunscreen',
      price: 16.25,
      stock: 12,
      status: 'low-stock',
      sales: 18,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop'
    },
    {
      id: '3',
      name: 'The Ordinary Niacinamide',
      price: 12.75,
      stock: 0,
      status: 'out-of-stock',
      sales: 31,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop'
    }
  ];

  const mockRecentOrders = [
    {
      id: '1',
      orderNumber: '#ZBK-2024-001',
      customer: 'John Smith',
      date: '2024-01-20',
      total: 89.99,
      status: 'pending'
    },
    {
      id: '2',
      orderNumber: '#ZBK-2024-002',
      customer: 'Sarah Johnson',
      date: '2024-01-19',
      total: 156.75,
      status: 'confirmed'
    }
  ];

  const mockMonthlyRevenue = [
    { month: 'Jan', revenue: 8500 },
    { month: 'Feb', revenue: 9200 },
    { month: 'Mar', revenue: 7800 },
    { month: 'Apr', revenue: 10200 },
    { month: 'May', revenue: 12450 },
    { month: 'Jun', revenue: 11800 }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Package className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {user.name}! 🏪</h2>
            <p className="text-white/90">Here&apos;s your business overview for today</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">€{mockStats.totalSales.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Customers</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.totalCustomers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/dashboard/products/add"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Add Product</p>
              <p className="text-sm text-gray-600">Upload new items</p>
            </div>
          </Link>

          <Link 
            href="/dashboard/orders"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">View Orders</p>
              <p className="text-sm text-gray-600">Process requests</p>
            </div>
          </Link>

          <Link 
            href="/dashboard/analytics"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Analytics</p>
              <p className="text-sm text-gray-600">View insights</p>
            </div>
          </Link>
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
          {mockRecentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.orderNumber}</p>
                  <p className="text-sm text-gray-600">{order.customer} • {order.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">€{order.total}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Product Management</h3>
            <Link 
              href="/dashboard/products/add"
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockProducts.map((product) => (
              <div key={product.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>€{product.price}</span>
                    <span>Stock: {product.stock}</span>
                    <span>Sales: {product.sales}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === 'active' ? 'bg-green-100 text-green-800' :
                    product.status === 'low-stock' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.status}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-primary">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-primary">
                    <Eye className="w-4 h-4" />
                  </button>
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
          <h3 className="text-lg font-semibold text-gray-900">Order Management</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockRecentOrders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{order.orderNumber}</h4>
                    <p className="text-sm text-gray-600">Customer: {order.customer}</p>
                    <p className="text-sm text-gray-600">Date: {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">€{order.total}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
                    Process Order
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:border-primary hover:text-primary">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Chart component would go here</p>
            <p className="text-sm text-gray-500">Monthly revenue data available</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
          <div className="space-y-3">
            {mockProducts.slice(0, 3).map((product, index) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-900">{product.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{product.sales} sold</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Alerts</h3>
          <div className="space-y-3">
            {mockProducts.filter(p => p.status !== 'active').map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-sm text-red-800">{product.name}</span>
                <span className="text-sm font-medium text-red-800">
                  {product.status === 'out-of-stock' ? 'Out of Stock' : 'Low Stock'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Distributor Dashboard</h1>
        <p className="text-gray-600">Manage your products, track sales, and grow your business</p>
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
      {activeTab === 'products' && renderProducts()}
      {activeTab === 'orders' && renderOrders()}
      {activeTab === 'analytics' && renderAnalytics()}
    </div>
  );
}
