'use client';

import { cn } from '@/utils/cn';

interface LeftCheekProps {
  className?: string;
  onClick?: () => void;
}

export function LeftCheek({ className, onClick }: LeftCheekProps) {
  return (
    <svg
      width="19"
      height="29"
      viewBox="0 0 19 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('cursor-pointer', className)}
      onClick={onClick}
    >
      <path d="M1 15C1.4 4.2 8.83333 1.16667 12.5 1C14.3333 1 18 3.8 18 15C18 26.2 10.3333 28 6.5 27.5C4.5 27.8333 0.6 25.8 1 15Z" fill="#D89B9B" stroke="#4B3F4E"/>
    </svg>
  );
}
