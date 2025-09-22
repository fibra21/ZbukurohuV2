'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import { Hair } from './FaceParts/Hair';
import { LeftEar } from './FaceParts/LeftEar';
import { RightEar } from './FaceParts/RightEar';
import { Forehead } from './FaceParts/Forehead';
import { Nose } from './FaceParts/Nose';
import { LeftCheek } from './FaceParts/LeftCheek';
import { RightCheek } from './FaceParts/RightCheek';
import { LeftFace } from './FaceParts/LeftFace';
import { RightFace } from './FaceParts/RightFace';
import { Lips } from './FaceParts/Lips';
import { Chin } from './FaceParts/Chin';
import { Mouth } from './FaceParts/Mouth';

interface ModularFaceProps {
  className?: string;
}

export function ModularFace({ className }: ModularFaceProps) {
  const router = useRouter();

  const handleAreaClick = (category: string) => {
    router.push(`/categories/${category}`);
  };

  return (
    <div className={cn('relative w-full h-full', className)}>
      {/* Face container with proper positioning */}
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Hair - positioned at the very top */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20">
          <Hair onClick={() => handleAreaClick('skincare')} />
        </div>

        {/* Left Ear - positioned on left side */}
        <div className="absolute top-8 left-2 z-10">
          <LeftEar onClick={() => handleAreaClick('skincare')} />
        </div>

        {/* Right Ear - positioned on right side */}
        <div className="absolute top-8 right-2 z-10">
          <RightEar onClick={() => handleAreaClick('skincare')} />
        </div>

        {/* Forehead - positioned below hair */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-15">
          <Forehead onClick={() => handleAreaClick('skincare')} />
        </div>

        {/* Left Face - positioned on left side of face */}
        <div className="absolute top-20 left-4 z-5">
          <LeftFace onClick={() => handleAreaClick('makeup')} />
        </div>

        {/* Right Face - positioned on right side of face */}
        <div className="absolute top-20 right-4 z-5">
          <RightFace onClick={() => handleAreaClick('makeup')} />
        </div>

        {/* Nose - positioned in center */}
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-10">
          <Nose onClick={() => handleAreaClick('skincare')} />
        </div>

        {/* Left Cheek - positioned on left side */}
        <div className="absolute top-36 left-16 z-5">
          <LeftCheek onClick={() => handleAreaClick('makeup')} />
        </div>

        {/* Right Cheek - positioned on right side */}
        <div className="absolute top-36 right-16 z-5">
          <RightCheek onClick={() => handleAreaClick('makeup')} />
        </div>

        {/* Mouth - positioned below nose */}
        <div className="absolute top-44 left-1/2 transform -translate-x-1/2 z-10">
          <Mouth onClick={() => handleAreaClick('lips')} />
        </div>

        {/* Lips - positioned around mouth area */}
        <div className="absolute top-48 left-1/2 transform -translate-x-1/2 z-5">
          <Lips onClick={() => handleAreaClick('lips')} />
        </div>

        {/* Chin - positioned at bottom */}
        <div className="absolute top-52 left-1/2 transform -translate-x-1/2 z-5">
          <Chin onClick={() => handleAreaClick('skincare')} />
        </div>

      </div>
    </div>
  );
}
