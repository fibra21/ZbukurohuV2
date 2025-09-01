'use client';

import { cn } from '@/utils/cn';

interface FaceIllustrationProps {
  className?: string;
}

// Minimal, scalable, feminine face parts (eyes, brows, lips, cheeks)
export function FaceIllustration({ className }: FaceIllustrationProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="Face parts illustration"
      className={cn('w-full h-full', className)}
    >
      {/* Brows */}
      <path d="M138 160c14-10 32-12 47-6" stroke="#5A2A5A" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M215 154c16-6 33-4 47 6" stroke="#5A2A5A" strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* Eyes */}
      <ellipse cx="162" cy="180" rx="16" ry="10" fill="#fff" stroke="#916AA1" strokeWidth="2" />
      <circle cx="162" cy="180" r="5" fill="#5A2A5A" />
      <ellipse cx="238" cy="180" rx="16" ry="10" fill="#fff" stroke="#916AA1" strokeWidth="2" />
      <circle cx="238" cy="180" r="5" fill="#5A2A5A" />

      {/* Nose */}
      <path d="M200 188c2 10-2 18-10 22" stroke="#B58AAE" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Lips */}
      <path d="M172 240c10 10 46 10 56 0 0 0-10 16-28 16s-28-16-28-16z" fill="#C06AA6" opacity="0.25" />

      {/* Cheek hints */}
      <circle cx="150" cy="220" r="10" fill="#E7C3D6" opacity="0.35" />
      <circle cx="250" cy="220" r="10" fill="#E7C3D6" opacity="0.35" />
    </svg>
  );
}


