'use client';

import { cn } from '@/utils/cn';

interface NoseProps {
  className?: string;
  onClick?: () => void;
}

export function Nose({ className, onClick }: NoseProps) {
  return (
    <svg
      width="39"
      height="192"
      viewBox="0 0 39 192"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('cursor-pointer', className)}
      onClick={onClick}
    >
      <path d="M34.5 105.5C43.3 19.1 30.8333 0.166657 23.5 1.49999C9.10001 5.49998 2.50001 72.5 1 105.5C0.666671 134 2.6 191 13 191C26 191 34 106 34.5 105.5Z" fill="#F2A16B" stroke="#4B3F4E"/>
    </svg>
  );
}
