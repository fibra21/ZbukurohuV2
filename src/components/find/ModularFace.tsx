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
      {/* Background container to maintain aspect ratio */}
      <div className="relative w-full h-full" style={{ aspectRatio: '398/425' }}>
        
        {/* Hair - positioned at top */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
          <Hair onClick={() => handleAreaClick('skincare')} />
        </div>

        {/* Left Ear */}
        <div className="absolute top-8 left-0">
          <LeftEar onClick={() => handleAreaClick('skincare')} />
        </div>

        {/* Right Ear */}
        <div className="absolute top-8 right-0">
          <RightEar onClick={() => handleAreaClick('skincare')} />
        </div>

        {/* Forehead */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
          <Forehead onClick={() => handleAreaClick('skincare')} />
        </div>

        {/* Left Face */}
        <div className="absolute top-20 left-4">
          <LeftFace onClick={() => handleAreaClick('makeup')} />
        </div>

        {/* Right Face */}
        <div className="absolute top-20 right-4">
          <RightFace onClick={() => handleAreaClick('makeup')} />
        </div>

        {/* Nose */}
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
          <Nose onClick={() => handleAreaClick('skincare')} />
        </div>

        {/* Left Cheek */}
        <div className="absolute top-36 left-16">
          <LeftCheek onClick={() => handleAreaClick('makeup')} />
        </div>

        {/* Right Cheek */}
        <div className="absolute top-36 right-16">
          <RightCheek onClick={() => handleAreaClick('makeup')} />
        </div>

        {/* Lips */}
        <div className="absolute top-48 left-1/2 transform -translate-x-1/2">
          <Lips onClick={() => handleAreaClick('lips')} />
        </div>

        {/* Chin */}
        <div className="absolute top-52 left-1/2 transform -translate-x-1/2">
          <Chin onClick={() => handleAreaClick('skincare')} />
        </div>

        {/* Mouth */}
        <div className="absolute top-44 left-1/2 transform -translate-x-1/2">
          <Mouth onClick={() => handleAreaClick('lips')} />
        </div>

      </div>
    </div>
  );
}
