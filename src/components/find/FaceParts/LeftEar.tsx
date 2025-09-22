'use client';

import { cn } from '@/utils/cn';

interface LeftEarProps {
  className?: string;
  onClick?: () => void;
}

export function LeftEar({ className, onClick }: LeftEarProps) {
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
      <path d="M56.5 1.00004C42.5 -0.599964 14.6667 15.6667 2.50001 24C-5.99999 35.0001 26 48 26 47.5C35 39.5 61.5 35.5 62 35.5C79 30 139 35 142 35.5C145 36 144 34.5 142 28.5C113 4 56.5 0.500036 56.5 1.00004Z" fill="#F0F0F0" stroke="#4B3F4E"/>
    </svg>
  );
}
