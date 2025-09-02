import { Metadata } from 'next';
import { 
  Palette, 
  Scissors, 
  Sparkles, 
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Beauty Services - Zbukurohu',
  description: 'Professional beauty services including makeup, nail art, skincare, and more.',
};

export default function ServicesPage() {
  const services = [
    { id: 'makeup', name: 'Makeup Artist', icon: <Palette className="w-8 h-8" />, count: 24 },
    { id: 'nail-art', name: 'Nail Technician', icon: <Scissors className="w-8 h-8" />, count: 18 },
    { id: 'hair-styling', name: 'Hair Styling', icon: <Scissors className="w-8 h-8" />, count: 22 },
    { id: 'skincare', name: 'Facial Treatments', icon: <Sparkles className="w-8 h-8" />, count: 15 },
    { id: 'massage', name: 'Massage Therapy', icon: <Sparkles className="w-8 h-8" />, count: 12 },
    { id: 'other', name: 'Other Services', icon: <Star className="w-8 h-8" />, count: 8 }
  ];

  const locations = [
    'Pristina', 'Prizren', 'Peja', 'Gjakova', 'Mitrovica', 'Ferizaj', 'Gjilan'
  ];

  const mockServices = [
    {
      id: '1',
      title: 'Professional Wedding Makeup',
      provider: 'Sarah Beauty Studio',
      category: 'makeup',
      price: 80,
      duration: 120,
      rating: 4.9,
      reviewsCount: 47,
      location: 'Pristina',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
      description: 'Complete bridal makeup including trial session, perfect for your special day.',
      isVerified: true,
      isAvailable: true,
      tags: ['Bridal', 'Professional', 'Trial Included']
    },
    {
      id: '2',
      title: 'Gel Nail Extensions',
      provider: 'Nail Art by Maria',
      category: 'nail-art',
      price: 35,
      duration: 90,
      rating: 4.8,
      reviewsCount: 89,
      location: 'Prizren',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop',
      description: 'Beautiful gel nail extensions with custom designs and nail art.',
      isVerified: true,
      isAvailable: true,
      tags: ['Gel', 'Extensions', 'Custom Design']
    },
    {
      id: '3',
      title: 'Professional Hair Styling',
      provider: 'Hair Masters Kosovo',
      category: 'hair-styling',
      price: 45,
      duration: 60,
      rating: 4.7,
      reviewsCount: 156,
      location: 'Pristina',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
      description: 'Professional hair styling for events, parties, and special occasions.',
      isVerified: true,
      isAvailable: true,
      tags: ['Professional', 'Events', 'Styling']
    },
    {
      id: '4',
      title: 'Anti-Aging Facial Treatment',
      provider: 'Skin Care Clinic',
      category: 'skincare',
      price: 65,
      duration: 75,
      rating: 4.9,
      reviewsCount: 73,
      location: 'Peja',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
      description: 'Advanced anti-aging facial treatment with premium products.',
      isVerified: true,
      isAvailable: true,
      tags: ['Anti-Aging', 'Premium', 'Treatment']
    }
  ];

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || service.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Beauty Services Marketplace
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover talented beauty professionals in Kosovo. Book appointments for makeup, 
              hair styling, nail art, and more.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for services or professionals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Categories */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Category Filter */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {serviceCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      selectedCategory === category.id
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <div className="text-sm font-medium">{category.name}</div>
                    <div className="text-xs text-gray-500">{category.count} providers</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div className="lg:w-64">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredServices.length} services found
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Filter className="w-4 h-4" />
            <span>Sort by: Rating</span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Service Image */}
              <div className="relative h-48">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  {service.isVerified && (
                    <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                {!service.isAvailable && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">Not Available</span>
                  </div>
                )}
              </div>

              {/* Service Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">{service.title}</h3>
                    <p className="text-primary font-medium">{service.provider}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">€{service.price}</p>
                    <p className="text-sm text-gray-500">{service.duration} min</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                {/* Rating and Location */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900 ml-1">{service.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({service.reviewsCount})</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {service.location}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Book Now</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Become a Provider CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Are you a beauty professional?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our marketplace and start offering your services to customers across Kosovo. 
            Create your profile, showcase your work, and grow your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register?role=distributor"
              className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Become a Provider
            </Link>
            <Link
              href="/services/guide"
              className="border border-primary text-primary px-8 py-3 rounded-lg font-medium hover:bg-primary/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Professionals</h3>
            <p className="text-gray-600">All providers are verified and reviewed by our team</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Booking</h3>
            <p className="text-gray-600">Safe and secure appointment booking with instant confirmation</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Reviews</h3>
            <p className="text-gray-600">Real reviews from satisfied customers to help you choose</p>
          </div>
        </div>
      </div>
    </div>
  );
}
