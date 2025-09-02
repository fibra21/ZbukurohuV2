'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Building2, TrendingUp, Users, DollarSign, Package, FileText, ShoppingCart, BarChart3, Download } from 'lucide-react';

interface BusinessDashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export function BusinessDashboard({ user }: BusinessDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for business user
  const mockStats = {
    totalOrders: 23,
    totalSpent: 45680.50,
    totalProducts: 156,
    wholesaleDiscount: 25
  };

  const mockBulkOrders = [
    {
      id: '1',
      orderNumber: '#B2B-2024-001',
      date: '2024-01-20',
      status: 'confirmed',
      total: 12450.75,
      items: 45,
      deliveryDate: '2024-01-25'
    },
    {
      id: '2',
      orderNumber: '#B2B-2024-002',
      date: '2024-01-18',
      status: 'processing',
      total: 8920.30,
      items: 32,
      deliveryDate: '2024-01-23'
    }
  ];

  const mockWholesaleProducts = [
    {
      id: '1',
      name: 'L\'Oréal Paris True Match Foundation',
      retailPrice: 24.99,
      wholesalePrice: 18.74,
      minOrderQty: 10,
      stock: 500,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop'
    },
    {
      id: '2',
      name: 'Neutrogena Ultra Sheer Sunscreen',
      retailPrice: 16.25,
      wholesalePrice: 12.19,
      minOrderQty: 15,
      stock: 300,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop'
    },
    {
      id: '3',
      name: 'The Ordinary Niacinamide',
      retailPrice: 12.75,
      wholesalePrice: 9.56,
      minOrderQty: 20,
      stock: 800,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop'
    }
  ];

  const mockInvoices = [
    {
      id: '1',
      invoiceNumber: '#INV-2024-001',
      date: '2024-01-20',
      dueDate: '2024-02-20',
      amount: 12450.75,
      status: 'paid'
    },
    {
      id: '2',
      invoiceNumber: '#INV-2024-002',
      date: '2024-01-18',
      dueDate: '2024-02-18',
      amount: 8920.30,
      status: 'pending'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'bulk-orders', label: 'Bulk Orders', icon: ShoppingCart },
    { id: 'wholesale', label: 'Wholesale Catalog', icon: Package },
    { id: 'invoices', label: 'Invoices', icon: FileText }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {user.name}! 🏢</h2>
            <p className="text-white/90">Your B2B wholesale dashboard with exclusive pricing</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">€{mockStats.totalSpent.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Products Ordered</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Wholesale Discount</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.wholesaleDiscount}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/dashboard/bulk-orders/new"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Place Bulk Order</p>
              <p className="text-sm text-gray-600">Order in large quantities</p>
            </div>
          </Link>

          <Link 
            href="/dashboard/wholesale"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Browse Catalog</p>
              <p className="text-sm text-gray-600">View wholesale prices</p>
            </div>
          </Link>

          <Link 
            href="/dashboard/invoices"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">View Invoices</p>
              <p className="text-sm text-gray-600">Manage payments</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Bulk Orders */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Bulk Orders</h3>
            <Link href="/dashboard?tab=bulk-orders" className="text-primary hover:text-primary/80 text-sm font-medium">
              View All
            </Link>
          </div>
        </div>
        <div className="p-6">
          {mockBulkOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.orderNumber}</p>
                  <p className="text-sm text-gray-600">{order.items} items • {order.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">€{order.total.toLocaleString()}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wholesale Benefits */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
        <h3 className="text-lg font-semibold text-emerald-900 mb-4">🎯 Wholesale Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-sm text-emerald-800">Up to 25% discount on bulk orders</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <Package className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-sm text-emerald-800">Priority shipping and handling</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-sm text-emerald-800">Dedicated account manager</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <FileText className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-sm text-emerald-800">Flexible payment terms</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBulkOrders = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Bulk Order Management</h3>
            <Link 
              href="/dashboard/bulk-orders/new"
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 flex items-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>New Bulk Order</span>
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockBulkOrders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{order.orderNumber}</h4>
                    <p className="text-sm text-gray-600">Placed on {order.date}</p>
                    <p className="text-sm text-gray-600">Delivery: {order.deliveryDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">€{order.total.toLocaleString()}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{order.items} items ordered</span>
                  <div className="flex space-x-2">
                    <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
                      Track Order
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:border-primary hover:text-primary">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderWholesale = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Wholesale Catalog</h3>
          <p className="text-sm text-gray-600 mt-1">Special pricing for bulk orders</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockWholesaleProducts.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-xl p-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Retail Price:</span>
                    <span className="text-gray-400 line-through">€{product.retailPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Wholesale Price:</span>
                    <span className="text-lg font-bold text-primary">€{product.wholesalePrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Min Order:</span>
                    <span className="text-gray-900">{product.minOrderQty} units</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Stock:</span>
                    <span className="text-gray-900">{product.stock} units</span>
                  </div>
                </div>

                <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
                  Add to Bulk Order
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderInvoices = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Invoice Management</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockInvoices.map((invoice) => (
              <div key={invoice.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{invoice.invoiceNumber}</h4>
                    <p className="text-sm text-gray-600">Issued: {invoice.date}</p>
                    <p className="text-sm text-gray-600">Due: {invoice.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">€{invoice.amount.toLocaleString()}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                  {invoice.status === 'pending' && (
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:border-primary hover:text-primary">
                      Pay Now
                    </button>
                  )}
                </div>
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
        <h1 className="text-3xl font-bold text-gray-900">Business Dashboard</h1>
        <p className="text-gray-600">Manage your wholesale orders, invoices, and B2B relationships</p>
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
      {activeTab === 'bulk-orders' && renderBulkOrders()}
      {activeTab === 'wholesale' && renderWholesale()}
      {activeTab === 'invoices' && renderInvoices()}
    </div>
  );
}
