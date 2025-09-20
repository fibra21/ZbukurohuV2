import Link from 'next/link';
import { Sparkles, Package, Heart } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-brand text-text-primary overflow-hidden w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-brand-accent rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-secondary rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="mb-4">
              <span className="inline-block bg-brand-accent/10 text-brand-accent px-4 py-2 rounded-full text-sm font-medium">
                🌟 Premium Beauty Marketplace
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-heading leading-tight">
              Gjithçka për{" "}
              <span className="text-brand-accent bg-gradient-to-r from-brand-accent to-brand-secondary bg-clip-text text-transparent">
                bukurinë
              </span>{" "}
              tënde
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-text-secondary font-body leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Zbuloni koleksionin tonë të ekskluzivëm të produkteve të bukurisë dhe kujdesit për lëkurën nga markat më të mira botërore
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/categories"
                className="btn-accent text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Shiko Produktet
                </span>
              </Link>
              <Link
                href="/find"
                className="btn-secondary text-center transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  <Package className="w-5 h-5" />
                  Gjej Produktin Tënd
                </span>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-brand-accent">500+</div>
                <div className="text-sm text-text-secondary">Produkte</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-brand-accent">50+</div>
                <div className="text-sm text-text-secondary">Marka</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-brand-accent">10K+</div>
                <div className="text-sm text-text-secondary">Klientë</div>
              </div>
            </div>
          </div>
          
          <div className="relative mt-8 lg:mt-0">
            <div className="relative z-10">
              <div className="w-full h-80 sm:h-96 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-3xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                <div className="text-center p-8">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-brand-accent rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                    <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-text-inverse" />
                  </div>
                  <p className="text-text-primary font-heading text-lg sm:text-xl mb-2">Beauty & Wellness</p>
                  <p className="text-text-secondary font-body text-sm sm:text-base">Premium Collection</p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-brand-accent/20 rounded-full opacity-80 animate-pulse backdrop-blur-sm border border-brand-accent/30">
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-6 h-6 sm:w-8 sm:h-8 text-brand-accent" />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-brand-secondary/20 rounded-full opacity-60 animate-pulse delay-1000 backdrop-blur-sm border border-brand-secondary/30">
              <div className="w-full h-full flex items-center justify-center">
                <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-brand-secondary" />
              </div>
            </div>
            <div className="absolute top-1/2 -left-8 w-8 h-8 bg-brand-accent/10 rounded-full animate-ping"></div>
            <div className="absolute top-1/4 -right-8 w-6 h-6 bg-brand-secondary/10 rounded-full animate-ping delay-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
