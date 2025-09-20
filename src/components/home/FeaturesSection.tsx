import { Truck, Shield, Clock, Star, Award, Sparkles } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Dërgim Falas',
      description: 'Për porosi mbi €50',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      delay: 'delay-0'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Pagesa e Sigurt',
      description: 'SSL dhe enkriptim i plotë',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      delay: 'delay-100'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Dërgim i Shpejtë',
      description: '2-3 ditë pune',
      color: 'from-brand-accent to-orange-500',
      bgColor: 'bg-orange-50',
      delay: 'delay-200'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: '4.9/5 Vlerësim',
      description: 'Nga 10,000+ klientë',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      delay: 'delay-300'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Kualitet Premium',
      description: 'Vetëm produkte origjinale',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      delay: 'delay-400'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Koleksion Ekskluziv',
      description: 'Markat më të mira botërore',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      delay: 'delay-500'
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-surface-muted to-surface-elevated w-full overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="inline-block bg-brand-accent/10 text-brand-accent px-4 py-2 rounded-full text-sm font-medium">
              ✨ Përse na zgjidhni ne
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6 font-heading">
            Pse Zbukurohu?
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary font-body max-w-3xl mx-auto">
            Ne ofrojmë eksperiencën më të mirë të blerjes për produktet e bukurisë me shërbime të shkëlqyera
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className={`group text-center p-6 rounded-3xl ${feature.bgColor} border border-white/50 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up ${feature.delay}`}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl text-text-primary mb-3 font-heading group-hover:text-brand-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-text-secondary font-body leading-relaxed">
                {feature.description}
              </p>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-brand-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-brand-secondary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          ))}
        </div>
        
        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <p className="text-sm text-text-secondary mb-4">Besuar nga mijëra klientë në Ballkan</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-xs font-medium">🏆 #1 Beauty Platform</div>
            <div className="text-xs font-medium">⭐ 4.9/5 Rating</div>
            <div className="text-xs font-medium">🚚 2-Day Delivery</div>
          </div>
        </div>
      </div>
    </section>
  );
}
