'use client';

import { cn } from '@/utils/cn';

interface LeftFaceProps {
  className?: string;
  onClick?: () => void;
}

export function LeftFace({ className, onClick }: LeftFaceProps) {
  return (
    <svg
      width="129"
      height="108"
      viewBox="0 0 129 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('cursor-pointer', className)}
      onClick={onClick}
    >
      <path d="M126 19.5C83.6 41.9 30.6667 16.5 9.50001 1C-20 1 34 60 34.5 60C69 96 115 111.5 123 105.5C131 99.5 126 20 126 19.5Z" fill="#F7C384" stroke="#4B3F4E"/>
    </svg>
  );
}
