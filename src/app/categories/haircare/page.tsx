import { Suspense } from 'react';
import { Metadata } from 'next';
import { 
  Filter, 
  Grid3X3, 
  List, 
  Star, 
  Heart,
  ShoppingCart,
  Eye,
  Truck,
  Shield,
  Clock,
  TrendingUp
} from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { getProducts, getCategories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Haircare Products | Zbukurohu',
  description: 'Discover premium haircare products for all hair types. Shampoos, conditioners, styling products, and professional tools.',
  openGraph: {
    title: 'Haircare Products | Zbukurohu',
    description: 'Discover premium haircare products for all hair types. Shampoos, conditioners, styling products, and professional tools.',
  },
};

export default async function HaircarePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  // Filter haircare products (mock logic)
  const haircareProducts = products.filter(p => 
    p.categoryId === 'haircare' || 
    p.name.toLowerCase().includes('hair') ||
    p.name.toLowerCase().includes('shampoo') ||
    p.name.toLowerCase().includes('conditioner')
  ).slice(0, 24);

  const haircareCategories = [
    {
      title: 'Hair Care',
      items: ['Shampoo', 'Conditioner', 'Hair Masks', 'Hair Oils', 'Heat Protection'],
      icon: '💆‍♀️'
    },
    {
      title: 'Styling',
      items: ['Hair Spray', 'Hair Gel', 'Hair Wax', 'Texturizing Sprays', 'Dry Shampoo'],
      icon: '✨'
    },
    {
      title: 'Hair Tools',
      items: ['Hair Dryers', 'Straighteners', 'Curling Irons', 'Hair Brushes'],
      icon: '🔧'
    },
    {
      title: 'Hair Accessories',
      items: ['Hair Clips', 'Headbands', 'Hair Ties', 'Scrunchies'],
      icon: '🎀'
    }
  ];

  const filters = [
    {
      title: 'Hair Type',
      options: ['Fine', 'Thick', 'Curly', 'Straight', 'Wavy', 'Coily', 'Damaged', 'Color-treated']
    },
    {
      title: 'Concern',
      options: ['Dryness', 'Frizz', 'Hair Loss', 'Dandruff', 'Split Ends', 'Scalp Issues']
    },
    {
      title: 'Price Range',
      options: ['Under €20', '€20-€50', '€50-€100', 'Over €100']
    },
    {
      title: 'Brand',
      options: ['L\'Oréal', 'Pantene', 'Head & Shoulders', 'Tresemmé', 'Herbal Essences', 'Garnier']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <span className="text-6xl">💇‍♀️</span>
              <h1 className="text-5xl font-serif font-bold">Haircare Collection</h1>
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Transform your hair with premium products designed for every hair type and concern. From daily care to professional styling.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4" />
                <span>Free Delivery Over €50</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Authentic Products</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Fast Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {haircareCategories.map((category) => (
            <div key={category.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">{category.title}</h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="text-gray-600 text-sm hover:text-primary cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Filters and Products */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg text-gray-900">Filters</h3>
              </div>
              {filters.map((filter) => (
                <div key={filter.title} className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">{filter.title}</h4>
                  <div className="space-y-2">
                    {filter.options.map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                        <span className="text-gray-600 text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
                Apply Filters
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Products</span>
                  <span className="font-bold text-primary">{haircareProducts.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avg. Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-bold text-gray-900">4.8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Price Range</span>
                  <span className="font-bold text-gray-900">€15-€200</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Products Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900">Haircare Products</h2>
                <p className="text-gray-600 mt-2">Showing {haircareProducts.length} products</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white rounded-xl p-2 shadow-sm">
                  <button className="p-2 text-gray-400 hover:text-primary rounded-lg">
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-primary bg-primary/10 rounded-lg">
                    <List className="w-5 h-5" />
                  </button>
                </div>
                <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {haircareProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="relative">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 flex flex-col space-y-2">
                      <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-primary transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                    {product.discount && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        -{product.discount}%
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">{product.categoryId}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                        <span className="text-xs text-gray-400">({product.reviewsCount})</span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    
                    {/* Product Highlights */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span>Best Seller</span>
                      </div>
                      <ul className="text-xs text-gray-500 space-y-1">
                        <li>• Suitable for all hair types</li>
                        <li>• Sulfate-free formula</li>
                        <li>• Long-lasting results</li>
                        <li>• Dermatologist tested</li>
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-lg text-gray-400 line-through">€{product.originalPrice}</span>
                        )}
                        <span className="text-2xl font-bold text-primary">€{product.price}</span>
                      </div>
                      <span className="text-sm text-green-600 font-medium">In Stock</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </button>
                      <button className="px-4 py-3 border border-gray-200 text-gray-600 rounded-xl hover:border-primary hover:text-primary transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <button className="px-4 py-2 text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50">Previous</button>
                <button className="px-4 py-2 bg-primary text-white rounded-lg">1</button>
                <button className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">2</button>
                <button className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">3</button>
                <span className="px-4 py-2 text-gray-500">...</span>
                <button className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">8</button>
                <button className="px-4 py-2 text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50">Next</button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
