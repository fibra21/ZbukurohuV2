import { Truck, Shield, Clock, Star } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Free Delivery',
      description: 'On orders over €50',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Checkout',
      description: 'SSL encrypted payments',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Fast Shipping',
      description: '2-3 business days',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: '4.9/5 Rating',
      description: 'From 10,000+ customers',
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
