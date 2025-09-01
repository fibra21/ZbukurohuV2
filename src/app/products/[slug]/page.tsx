import { Suspense } from 'react';
import { Metadata } from 'next';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Truck, 
  Shield, 
  Clock,
  Eye,
  Share2,
  Minus,
  Plus,
  Check,
  ArrowRight,
  TrendingUp,
  Zap,
  Gift
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { getProducts, getProductBySlug } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';
import Link from 'next/link';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found | Zbukurohu',
    };
  }

  return {
    title: `${product.name} | Zbukurohu`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Zbukurohu`,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  
  // Mock related products (in real app, this would be based on category, brand, etc.)
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

  const productHighlights = [
    'Suitable for all skin types',
    'Dermatologist tested',
    'Cruelty-free formula',
    'Long-lasting results'
  ];

  const productBenefits = [
    'Hydrates and nourishes skin',
    'Improves skin texture',
    'Reduces fine lines',
    'Brightens complexion'
  ];

  const ingredients = [
    'Hyaluronic Acid',
    'Vitamin C',
    'Niacinamide',
    'Peptides',
    'Ceramides'
  ];

  const usageInstructions = [
    'Apply to clean, dry skin',
    'Use morning and evening',
    'Follow with moisturizer',
    'Use sunscreen during the day'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-primary">Categories</Link>
          <span>/</span>
          <Link href={`/categories/${product.categoryId}`} className="hover:text-primary capitalize">
            {product.categoryId}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative group">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors shadow-lg">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-primary transition-colors shadow-lg">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-2 rounded-full">
                  -{product.discount}%
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative cursor-pointer group">
                  <img 
                    src={product.imageUrl} 
                    alt={`${product.name} view ${i}`}
                    className="w-full h-24 object-cover rounded-xl border-2 border-transparent group-hover:border-primary transition-colors"
                  />
                  {i === 1 && (
                    <div className="absolute inset-0 bg-primary/20 rounded-xl border-2 border-primary"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Category */}
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                {product.categoryId}
              </span>
              <span>Brand ID: {product.brandId}</span>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl font-serif font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-5 h-5 ${star <= product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="font-bold text-gray-900">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.reviewsCount} reviews)</span>
              <span className="text-green-600 font-medium">In Stock</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              {product.originalPrice && product.originalPrice > product.price ? (
                <>
                  <span className="text-3xl font-bold text-primary">€{product.price}</span>
                  <span className="text-xl text-gray-400 line-through">€{product.originalPrice}</span>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                    Save €{(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-primary">€{product.price}</span>
              )}
            </div>

            {/* Product Highlights */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span>Key Benefits</span>
              </h3>
              <ul className="grid grid-cols-2 gap-2">
                {productHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-medium text-gray-900">Quantity:</label>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    defaultValue="1"
                    className="w-16 text-center border-none focus:outline-none focus:ring-0"
                  />
                  <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-6 h-6" />
                  <span>Add to Cart</span>
                </button>
                <button className="bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Truck className="w-5 h-5 text-green-500" />
                <span>Free delivery over €50</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Shield className="w-5 h-5 text-blue-500" />
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Clock className="w-5 h-5 text-purple-500" />
                <span>Fast shipping</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Check className="w-5 h-5 text-green-500" />
                <span>Authentic products</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-sm mb-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {['Description', 'Ingredients', 'Benefits', 'How to Use', 'Reviews'].map((tab) => (
                <button
                  key={tab}
                  className={`py-6 px-1 border-b-2 font-medium text-sm ${
                    tab === 'Description' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Description Tab */}
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4">Key Ingredients</h3>
                  <ul className="space-y-2">
                    {ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-700">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4">Benefits</h3>
                  <ul className="space-y-2">
                    {productBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-700">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-4">How to Use</h3>
                <ol className="space-y-2">
                  {usageInstructions.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-3 text-gray-700">
                      <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Cross-selling Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold text-gray-900">You May Also Like</h2>
            <Link 
              href={`/categories/${product.categoryId}`}
              className="text-primary font-medium hover:underline flex items-center space-x-2"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>

        {/* Bundle Offers */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">🎁 Bundle & Save</h2>
            <p className="text-xl text-gray-600">Complete your routine with these perfect pairings</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Bundle {i}</h3>
                <p className="text-gray-600 text-sm mb-4">Save up to 25% when you buy together</p>
                <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors">
                  Add Bundle
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews Preview */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
            <Link href="#reviews" className="text-primary font-medium hover:underline">
              View All Reviews
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="font-bold text-gray-600">U{i}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">User {i}</div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">
                  &ldquo;Amazing product! I&apos;ve been using it for a month and I can see a significant improvement in my skin texture and tone.&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
