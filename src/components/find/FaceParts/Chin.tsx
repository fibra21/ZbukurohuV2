'use client';

import { cn } from '@/utils/cn';

interface ChinProps {
  className?: string;
  onClick?: () => void;
}

export function Chin({ className, onClick }: ChinProps) {
  return (
    <svg
      width="113"
      height="134"
      viewBox="0 0 113 134"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('cursor-pointer', className)}
      onClick={onClick}
    >
      <path d="M112 1C112.015 1.43201 112.027 1.87053 112.036 2.31538C109.346 14.5466 33.678 58.3094 12.5259 78.5C-9.47407 99.5 5.52593 122.5 12.5259 128C19.5259 133.5 45.5259 142 78.5259 101.5C104.451 69.6832 112.543 26.5838 112.036 2.31538C112.144 1.82507 112.135 1.38542 112 1Z" fill="#A68F89" stroke="#4B3F4E"/>
    </svg>
  );
}
