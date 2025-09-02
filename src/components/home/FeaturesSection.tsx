import { Truck, Shield, Clock, Star } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Free Delivery',
      description: 'On orders over €50',
      color: 'from-semantic-info to-blue-600'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Checkout',
      description: 'SSL encrypted payments',
      color: 'from-semantic-success to-green-600'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Fast Shipping',
      description: '2-3 business days',
      color: 'from-brand-accent to-brand-accent-dark'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: '4.9/5 Rating',
      description: 'From 10,000+ customers',
      color: 'from-semantic-warning to-yellow-600'
    }
  ];

  return (
    <section className="py-16 bg-surface-muted w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-text-primary mb-4 font-heading">
            Pse Zbukurohu?
          </h2>
          <p className="text-lg text-text-secondary font-body">
            Ne ofrojmë eksperiencën më të mirë të blerjes për produktet e bukurisë
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="text-center group">
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg transition-transform duration-base group-hover:scale-105`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg text-text-primary mb-2 font-heading">{feature.title}</h3>
              <p className="text-text-secondary font-body">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
