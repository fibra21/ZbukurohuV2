'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Eye, Smile } from 'lucide-react';

export default function FindPage() {
  const router = useRouter();
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const faceAreas = [
    {
      id: 'forehead',
      name: 'Forehead Care',
      description: 'Anti-aging creams, serums for wrinkles',
      products: ['Anti-aging serum', 'Forehead patches', 'Botox alternative'],
      category: 'skincare'
    },
    {
      id: 'eyes',
      name: 'Eye Care',
      description: 'Eye creams, dark circle treatments',
      products: ['Eye cream', 'Under-eye patches', 'Lash serum'],
      category: 'eyes'
    },
    {
      id: 'nose',
      name: 'Nose Care',
      description: 'Pore strips, blackhead treatments',
      products: ['Pore strips', 'Nose patches', 'Blackhead remover'],
      category: 'skincare'
    },
    {
      id: 'cheeks',
      name: 'Cheek Care',
      description: 'Blush, highlighters, contouring',
      products: ['Blush', 'Highlighter', 'Bronzer', 'Contour kit'],
      category: 'makeup'
    },
    {
      id: 'lips',
      name: 'Lip Care',
      description: 'Lipsticks, glosses, lip care',
      products: ['Lipstick', 'Lip gloss', 'Lip balm', 'Lip liner'],
      category: 'lips'
    },
    {
      id: 'chin',
      name: 'Chin Care',
      description: 'Contouring, firming treatments',
      products: ['Chin firming cream', 'Contour stick', 'Face mask'],
      category: 'skincare'
    }
  ];

  const handleAreaClick = (areaId: string) => {
    setSelectedArea(areaId);
    const area = faceAreas.find(a => a.id === areaId);
    if (area) {
      router.push(`/categories/${area.category}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-brand-accent" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-heading">
              Find Your Perfect Products
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto font-body">
            Click on different areas of the face to discover personalized beauty products for each part of your skin
          </p>
        </div>

        {/* Interactive Face Map */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Face Illustration */}
          <div className="relative">
            <div className="w-80 h-80 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[600px] relative bg-gradient-to-br from-pink-100 to-purple-100 rounded-[50%] shadow-2xl overflow-hidden">
              {/* Face SVG */}
              <svg
                viewBox="0 0 400 500"
                className="w-full h-full"
                style={{ filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.1))' }}
              >
                {/* Face shape */}
                <ellipse cx="200" cy="250" rx="160" ry="200" fill="#F5E6D3" stroke="#E0C4A0" strokeWidth="2"/>
                
                {/* Forehead area */}
                <ellipse cx="200" cy="150" rx="80" ry="40" fill="#F8EAD8" opacity="0.8"/>
                
                {/* Eye areas */}
                <ellipse cx="160" cy="200" rx="25" ry="15" fill="#FFF" stroke="#D0B8A8" strokeWidth="1"/>
                <ellipse cx="240" cy="200" rx="25" ry="15" fill="#FFF" stroke="#D0B8A8" strokeWidth="1"/>
                <circle cx="160" cy="200" r="8" fill="#4A4A4A"/>
                <circle cx="240" cy="200" r="8" fill="#4A4A4A"/>
                
                {/* Eyebrows */}
                <path d="M135 185 Q160 180 185 185" stroke="#8B4513" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <path d="M215 185 Q240 180 265 185" stroke="#8B4513" strokeWidth="3" fill="none" strokeLinecap="round"/>
                
                {/* Nose */}
                <ellipse cx="200" cy="240" rx="15" ry="25" fill="#F0D5C0" stroke="#E0C4A0" strokeWidth="1"/>
                <ellipse cx="195" cy="255" rx="3" ry="2" fill="#D0B8A8"/>
                <ellipse cx="205" cy="255" rx="3" ry="2" fill="#D0B8A8"/>
                
                {/* Cheek areas */}
                <ellipse cx="140" cy="280" rx="35" ry="25" fill="#F5D5E0" opacity="0.6"/>
                <ellipse cx="260" cy="280" rx="35" ry="25" fill="#F5D5E0" opacity="0.6"/>
                
                {/* Lips */}
                <ellipse cx="200" cy="320" rx="25" ry="12" fill="#E8A4C4" stroke="#D089A8" strokeWidth="1"/>
                <path d="M175 320 Q200 315 225 320" stroke="#D089A8" strokeWidth="1" fill="none"/>
                
                {/* Chin area */}
                <ellipse cx="200" cy="380" rx="50" ry="30" fill="#F8EAD8" opacity="0.7"/>

                {/* Interactive Clickable Areas */}
                {faceAreas.map((area) => {
                  const getAreaCoordinates = (id: string) => {
                    switch(id) {
                      case 'forehead': return { x: 200, y: 150, rx: 80, ry: 40 };
                      case 'eyes': return { x: 200, y: 200, rx: 80, ry: 25 };
                      case 'nose': return { x: 200, y: 240, rx: 20, ry: 30 };
                      case 'cheeks': return { x: 200, y: 280, rx: 120, ry: 35 };
                      case 'lips': return { x: 200, y: 320, rx: 30, ry: 15 };
                      case 'chin': return { x: 200, y: 380, rx: 50, ry: 30 };
                      default: return { x: 200, y: 250, rx: 20, ry: 20 };
                    }
                  };
                  
                  const coords = getAreaCoordinates(area.id);
                  const isHovered = hoveredArea === area.id;
                  const isSelected = selectedArea === area.id;
                  
                  return (
                    <ellipse
                      key={area.id}
                      cx={coords.x}
                      cy={coords.y}
                      rx={coords.rx}
                      ry={coords.ry}
                      fill={isSelected ? "rgba(212, 175, 55, 0.4)" : isHovered ? "rgba(212, 175, 55, 0.2)" : "transparent"}
                      stroke={isSelected || isHovered ? "#D4AF37" : "transparent"}
                      strokeWidth="3"
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredArea(area.id)}
                      onMouseLeave={() => setHoveredArea(null)}
                      onClick={() => handleAreaClick(area.id)}
                    />
                  );
                })}
              </svg>
              
              {/* Area Labels */}
              {faceAreas.map((area) => {
                const getLabelPosition = (id: string) => {
                  switch(id) {
                    case 'forehead': return { top: '20%', left: '50%', transform: 'translate(-50%, -50%)' };
                    case 'eyes': return { top: '35%', left: '30%', transform: 'translate(-50%, -50%)' };
                    case 'nose': return { top: '45%', left: '70%', transform: 'translate(-50%, -50%)' };
                    case 'cheeks': return { top: '55%', left: '20%', transform: 'translate(-50%, -50%)' };
                    case 'lips': return { top: '70%', left: '50%', transform: 'translate(-50%, -50%)' };
                    case 'chin': return { top: '85%', left: '50%', transform: 'translate(-50%, -50%)' };
                    default: return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
                  }
                };
                
                const position = getLabelPosition(area.id);
                const isVisible = hoveredArea === area.id || selectedArea === area.id;
                
                return (
                  <div
                    key={`label-${area.id}`}
                    className={`absolute pointer-events-none transition-all duration-300 ${
                      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                    style={position}
                  >
                    <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-brand-accent/20">
                      <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                        {area.name}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

          {/* Product Recommendations Sidebar */}
          <div className="w-full lg:w-80">
            {selectedArea ? (
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-brand-accent/20">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-brand-accent" />
                </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {faceAreas.find(a => a.id === selectedArea)?.name}
                  </h3>
                  <p className="text-gray-600">
                    {faceAreas.find(a => a.id === selectedArea)?.description}
                  </p>
              </div>
              
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">Recommended Products:</h4>
                  {faceAreas.find(a => a.id === selectedArea)?.products.map((product, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-brand-accent/10 transition-colors cursor-pointer">
                      <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                      <span className="text-gray-700">{product}</span>
                </div>
                  ))}
              </div>
              
                <button 
                  onClick={() => {
                    const area = faceAreas.find(a => a.id === selectedArea);
                    if (area) router.push(`/categories/${area.category}`);
                  }}
                  className="w-full bg-brand-accent text-white py-3 rounded-xl font-semibold hover:bg-brand-accent/90 transition-colors"
                >
                  Shop {faceAreas.find(a => a.id === selectedArea)?.name}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smile className="w-8 h-8 text-gray-400" />
            </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Select a Face Area
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Click on any area of the face to discover personalized product recommendations
                  </p>
                  
                  <div className="space-y-2">
                    {faceAreas.map((area) => (
                      <button
                        key={area.id}
                        onClick={() => handleAreaClick(area.id)}
                        className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-brand-accent/10 hover:text-brand-accent transition-colors"
                      >
                        <span className="font-medium">{area.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
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
