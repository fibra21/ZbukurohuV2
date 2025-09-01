'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { FaceHotspot } from '@/types';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Heart, 
  Sparkles,
  ArrowLeft,
  Info
} from 'lucide-react';
import { FaceIllustration } from '@/components/find/FaceIllustration';

export default function FindPage() {
  const router = useRouter();
  const { locale } = useAppStore();
  const effectiveLocale = (locale === 'sq-AL' || locale === 'en') ? locale : 'sq-AL';
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const hotspots: FaceHotspot[] = [
    {
      id: 'eyes',
      name: t(effectiveLocale, 'eyes'),
      category: 'eyes',
      x: 50,
      y: 35,
      width: 20,
      height: 15
    },
    {
      id: 'brows',
      name: t(effectiveLocale, 'brows'),
      category: 'brows',
      x: 50,
      y: 25,
      width: 20,
      height: 10
    },
    {
      id: 'lips',
      name: t(effectiveLocale, 'lips'),
      category: 'lips',
      x: 50,
      y: 70,
      width: 15,
      height: 8
    },
    {
      id: 'cheeks',
      name: t(effectiveLocale, 'cheeks'),
      category: 'blush',
      x: 35,
      y: 50,
      width: 12,
      height: 15
    },
    {
      id: 'cheeks-right',
      name: t(effectiveLocale, 'cheeks'),
      category: 'blush',
      x: 65,
      y: 50,
      width: 12,
      height: 15
    },
    {
      id: 'skin-forehead',
      name: t(effectiveLocale, 'skin'),
      category: 'skincare',
      x: 50,
      y: 15,
      width: 25,
      height: 15
    },
    {
      id: 'skin-cheeks',
      name: t(effectiveLocale, 'skin'),
      category: 'skincare',
      x: 50,
      y: 45,
      width: 30,
      height: 20
    }
  ];

  const handleHotspotClick = (hotspot: FaceHotspot) => {
    router.push(`/categories/${hotspot.category}`);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'eyes':
        return Eye;
      case 'lips':
        return Heart;
      case 'skincare':
        return Sparkles;
      default:
        return Sparkles;
    }
  };

  return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-serif font-bold text-primary">
              Gjej Produktet e Duha
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kliko në pjesët e fytyrës për të zbuluar produktet perfekte për çdo zonë
          </p>
        </div>

        {/* Interactive Face */}
        <div className="relative max-w-lg mx-auto mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full aspect-square"
          >
            <FaceIllustration />

            {/* Hotspots */}
            {hotspots.map((hotspot) => {
              const IconComponent = getCategoryIcon(hotspot.category);
              const isActive = false; // keep static; no hover/active movement
              
              return (
                <motion.button
                  key={hotspot.id}
                  className={`
                    absolute w-16 h-16 rounded-full border-2 border-white shadow-soft
                    flex items-center justify-center transition-none outline-none focus:outline-none focus:ring-0 active:outline-none
                    ${isActive 
                      ? 'bg-primary text-white scale-110' 
                      : 'bg-white text-primary'
                    }
                  `}
                  style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => handleHotspotClick(hotspot)}
                  // Keep buttons stable (no movement)
                  whileHover={undefined}
                  whileTap={undefined}
                >
                  <IconComponent className="w-6 h-6" />
                  
                  {/* Tooltip */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap"
                    >
                      {hotspot.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Category Guide */}
        <div className="bg-white rounded-2xl shadow-soft p-8">
          <div className="flex items-center space-x-2 mb-6">
            <Info className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-gray-900">
              Kategoritë e Produkteve
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                  <Eye className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Sytë & Vetullat</h3>
                  <p className="text-sm text-gray-600">Mascara, hije, liner, produkte për vetullat</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary-50 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-secondary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Buzët & Faqet</h3>
                  <p className="text-sm text-gray-600">Buzëkuq, blush, bronzer, highlighter</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-50 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Kujdesi i Lëkurës</h3>
                  <p className="text-sm text-gray-600">Pastrues, hidratues, serume, trajtime</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Baza & Fondacioni</h3>
                  <p className="text-sm text-gray-600">Primer, fondacion, koncealer, pudër</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Kliko në çdo zonë të fytyrës për të parë produktet e rekomanduara për atë pjesë
          </p>
        </div>
      </div>
  );
}
