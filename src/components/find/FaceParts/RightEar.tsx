'use client';

import { cn } from '@/utils/cn';

interface RightEarProps {
  className?: string;
  onClick?: () => void;
}

export function RightEar({ className, onClick }: RightEarProps) {
  return (
    <svg
      width="145"
      height="49"
      viewBox="0 0 145 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('cursor-pointer', className)}
      onClick={onClick}
    >
      <path d="M88.3934 1.1099C102.393 -0.490101 130.227 15.7766 142.393 24.1099C150.893 35.1099 118.893 48.1099 118.893 47.6099C109.893 39.6099 83.3934 35.6099 82.8934 35.6099C65.8934 30.1099 5.89342 35.1099 2.89342 35.6099C-0.106583 36.1099 0.893417 34.6099 2.89342 28.6099C31.8934 4.10986 88.3934 0.609899 88.3934 1.1099Z" fill="#F0F0F0" stroke="#4B3F4E"/>
    </svg>
  );
}
