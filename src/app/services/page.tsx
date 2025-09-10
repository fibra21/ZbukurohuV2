import { Metadata } from 'next';
import { 
  Palette, 
  Scissors, 
  Sparkles, 
  Star,
  Search,
  MapPin,
  Heart,
  CheckCircle
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

  const featuredServices = [
    {
      id: 1,
      title: 'Professional Makeup Artist',
      provider: 'Beauty Studio Albania',
      rating: 4.9,
      reviews: 127,
      price: '€50-80',
      location: 'Tirana',
      image: '/images/services/makeup-1.jpg',
      isVerified: true,
      isAvailable: true
    },
    {
      id: 2,
      title: 'Luxury Nail Art',
      provider: 'Nail Art Studio',
      rating: 4.8,
      reviews: 89,
      price: '€25-45',
      location: 'Durrës',
      image: '/images/services/nail-1.jpg',
      isVerified: true,
      isAvailable: true
    },
    {
      id: 3,
      title: 'Advanced Skincare Treatment',
      provider: 'Skin Clinic',
      rating: 4.9,
      reviews: 156,
      price: '€60-120',
      location: 'Vlora',
      image: '/images/services/skincare-1.jpg',
      isVerified: true,
      isAvailable: false
    }
  ];

  return (
    <div className="min-h-screen bg-surface-muted">
      {/* Hero Section */}
      <div className="bg-gradient-brand text-text-primary py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading">
            Professional Beauty Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-body max-w-3xl mx-auto">
            Connect with certified beauty professionals for makeup, hair styling, nail art, and more.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search for services or professionals..."
                className="w-full pl-12 pr-4 py-4 text-text-primary rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/20 bg-surface-elevated border border-neutral-200"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Service Categories */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-text-primary mb-8 text-center font-heading">
            Service Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-surface-elevated rounded-xl p-6 shadow-md border border-neutral-200 hover:shadow-lg transition-all duration-base hover:border-brand-accent text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-secondary transition-colors duration-base">
                  {service.icon}
                </div>
                <h3 className="font-bold text-text-primary mb-2 font-heading">{service.name}</h3>
                <p className="text-text-secondary text-sm font-body">{service.count} providers</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Services */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-text-primary mb-8 text-center font-heading">
            Featured Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <div key={service.id} className="bg-surface-elevated rounded-2xl shadow-md border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Service Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                  <div className="text-center text-text-primary">
                    <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-2">
                      <Star className="w-8 h-8 text-text-inverse" />
                    </div>
                    <p className="font-heading text-lg">Professional Service</p>
                  </div>
                  
                  {/* Verified Badge */}
                  {service.isVerified && (
                    <div className="absolute top-3 left-3">
                      <div className="bg-semantic-info text-text-inverse px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Favorite Button */}
                  <div className="absolute top-3 right-3">
                    <button className="w-8 h-8 bg-surface-elevated/90 rounded-full flex items-center justify-center hover:bg-surface-elevated transition-colors">
                      <Heart className="w-4 h-4 text-text-secondary" />
                    </button>
                  </div>
                  
                  {/* Availability Status */}
                  {!service.isAvailable && (
                    <div className="absolute inset-0 bg-neutral-900/50 flex items-center justify-center">
                      <span className="text-text-inverse font-medium">Currently Unavailable</span>
                    </div>
                  )}
                </div>
                
                {/* Service Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-2 font-heading">{service.title}</h3>
                  <p className="text-text-secondary mb-3 font-body">{service.provider}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(service.rating) ? 'text-semantic-warning fill-current' : 'text-neutral-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-text-secondary text-sm font-body">{service.rating}</span>
                    </div>
                    <span className="text-brand-accent font-bold font-body">{service.price}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-text-muted font-body">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{service.location}</span>
                    </div>
                    <span>{service.reviews} reviews</span>
                  </div>
                  
                  <button className="w-full mt-4 btn-accent">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-surface-elevated rounded-2xl p-12 border border-neutral-200">
          <h2 className="text-3xl font-bold text-text-primary mb-4 font-heading">
            Ready to Book Your Service?
          </h2>
          <p className="text-text-secondary mb-6 font-body max-w-2xl mx-auto">
            Connect with our verified beauty professionals and transform your look with our premium services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-accent">
              Browse All Services
            </button>
            <button className="btn-secondary">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
