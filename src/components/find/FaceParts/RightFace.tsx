'use client';

import { cn } from '@/utils/cn';

interface RightFaceProps {
  className?: string;
  onClick?: () => void;
}

export function RightFace({ className, onClick }: RightFaceProps) {
  return (
    <svg
      width="122"
      height="95"
      viewBox="0 0 122 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('cursor-pointer', className)}
      onClick={onClick}
    >
      <path d="M4.543 4.5C46.943 26.9 91.3334 16.5 112.5 1C142 1 89 51.7049 82.5 56.5C52 79 12.543 98.5 4.543 92.5C-3.457 86.5 4.543 5 4.543 4.5Z" fill="#EFCD9E" stroke="#4B3F4E"/>
    </svg>
  );
}
