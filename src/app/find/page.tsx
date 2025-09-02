'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaceHotspot } from '@/types';
import { MapPin, Sparkles, Star, Heart, ShoppingCart } from 'lucide-react';

export default function FindPage() {
  const router = useRouter();
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  const faceHotspots: FaceHotspot[] = [
    {
      id: 'forehead',
      name: 'Forehead Care',
      category: 'skincare',
      x: 50,
      y: 15,
      width: 20,
      height: 15
    },
    {
      id: 'eyes',
      name: 'Eye Care',
      category: 'skincare',
      x: 35,
      y: 30,
      width: 30,
      height: 20
    },
    {
      id: 'cheeks',
      name: 'Cheek Care',
      category: 'skincare',
      x: 25,
      y: 45,
      width: 50,
      height: 25
    },
    {
      id: 'nose',
      name: 'Nose Care',
      category: 'skincare',
      x: 45,
      y: 45,
      width: 10,
      height: 15
    },
    {
      id: 'mouth',
      name: 'Lip Care',
      category: 'skincare',
      x: 40,
      y: 70,
      width: 20,
      height: 15
    },
    {
      id: 'chin',
      name: 'Chin Care',
      category: 'skincare',
      x: 40,
      y: 85,
      width: 20,
      height: 15
    }
  ];

  const handleHotspotClick = (hotspot: FaceHotspot) => {
    router.push(`/categories/${hotspot.category}/${hotspot.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Sparkles className="w-10 h-10 text-primary" />
            <h1 className="text-5xl font-bold text-gray-900">Find Your Perfect Products</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Click on different areas of the face to discover personalized beauty products for each part of your skin
          </p>
        </div>

        {/* Interactive Face */}
        <div className="flex justify-center mb-12">
          <div className="relative w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
            {/* Face Outline */}
            <div className="w-80 h-80 bg-white rounded-full shadow-2xl flex items-center justify-center relative">
              {/* Face Features */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-300 rounded-full"></div> {/* Forehead */}
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-300 rounded-full"></div> {/* Eyebrows */}
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-300 rounded-full"></div> {/* Eyes */}
              <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-300 rounded-full"></div> {/* Nose */}
              <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full"></div> {/* Mouth */}
              <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-300 rounded-full"></div> {/* Chin */}

              {/* Interactive Hotspots */}
              {faceHotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/50 ${
                    hoveredHotspot === hotspot.id
                      ? 'bg-primary/80 text-white scale-110'
                      : 'bg-white/80 text-gray-700 hover:bg-primary/60 hover:text-white hover:scale-105'
                  }`}
                  style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                    width: `${hotspot.width}%`,
                    height: `${hotspot.height}%`
                  }}
                  onMouseEnter={() => setHoveredHotspot(hotspot.id)}
                  onMouseLeave={() => setHoveredHotspot(null)}
                  onClick={() => handleHotspotClick(hotspot)}
                  aria-label={`Explore ${hotspot.name} products`}
                >
                  <span className="text-xs font-medium">{hotspot.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faceHotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-medium transition-shadow cursor-pointer group"
              onClick={() => handleHotspotClick(hotspot)}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {hotspot.name}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">{hotspot.category}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>Premium products</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Heart className="w-4 h-4 text-red-400 fill-current" />
                  <span>Personalized care</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <ShoppingCart className="w-4 h-4 text-green-400 fill-current" />
                  <span>Fast delivery</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full bg-primary/10 text-primary py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors">
                  Explore Products
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Beauty Routine?</h2>
            <p className="text-xl text-white/90 mb-6">
              Discover personalized products for every part of your face and achieve your beauty goals
            </p>
            <button
              onClick={() => router.push('/categories')}
              className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Browse All Categories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
