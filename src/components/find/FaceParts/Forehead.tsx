'use client';

import { cn } from '@/utils/cn';

interface ForeheadProps {
  className?: string;
  onClick?: () => void;
}

export function Forehead({ className, onClick }: ForeheadProps) {
  return (
    <svg
      width="150"
      height="87"
      viewBox="0 0 150 87"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('cursor-pointer', className)}
      onClick={onClick}
    >
      <path d="M148 39.5C158.4 11.5 107.667 2.83337 81 2.00004C0.199974 -5.99996 -4.33336 23.6667 3.49997 39.5C15.6666 55.1667 47.5 86.5 77.5 86.5C115 86.5 147.5 40.5 148 39.5Z" fill="#FDFDC6"/>
      <path d="M148 39.5C158.4 11.5 107.667 2.83337 81 2.00004C0.199974 -5.99996 -4.33336 23.6667 3.49997 39.5C15.6666 55.1667 47.5 86.5 77.5 86.5C115 86.5 147.5 40.5 148 39.5Z" fill="#F40000" fillOpacity="0.2"/>
      <path d="M148 39.5C158.4 11.5 107.667 2.83337 81 2.00004C0.199974 -5.99996 -4.33336 23.6667 3.49997 39.5C15.6666 55.1667 47.5 86.5 77.5 86.5C115 86.5 147.5 40.5 148 39.5Z" stroke="#4B3F4E"/>
    </svg>
  );
}
