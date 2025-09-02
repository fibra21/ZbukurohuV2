import Link from 'next/link';
import { Star, Sparkles, Package, Heart } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-brand text-text-primary overflow-hidden w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-brand-accent rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-secondary rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading leading-tight">
              Gjithçka për{" "}
              <span className="text-brand-accent">bukurinë</span>{" "}
              tënde
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-text-secondary font-body leading-relaxed">
              Zbuloni koleksionin tonë të ekskluzivëm të produkteve të bukurisë dhe kujdesit për lëkurën
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/categories"
                className="btn-accent text-center"
              >
                Shiko Produktet
              </Link>
              <Link
                href="/find"
                className="btn-secondary text-center"
              >
                Gjej Produktin Tënd
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <div className="w-full h-96 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-brand-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-text-inverse" />
                  </div>
                  <p className="text-text-primary font-heading text-lg">Beauty & Wellness</p>
                  <p className="text-text-secondary font-body">Premium Collection</p>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-brand-accent-light rounded-full opacity-80 animate-pulse">
              <Package className="w-8 h-8 text-text-primary mx-auto mt-2" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-brand-primary-dark rounded-full opacity-60 animate-pulse delay-1000">
              <Heart className="w-6 h-6 text-text-primary mx-auto mt-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
