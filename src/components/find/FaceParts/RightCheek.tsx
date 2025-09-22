'use client';

import { cn } from '@/utils/cn';

interface RightCheekProps {
  className?: string;
  onClick?: () => void;
}

export function RightCheek({ className, onClick }: RightCheekProps) {
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
      <path d="M1.02856 15C1.42856 4.2 8.8619 1.16667 12.5286 1C14.3619 1 18.0286 3.8 18.0286 15C18.0286 26.2 10.3619 28 6.52856 27.5C4.52856 27.8333 0.628564 25.8 1.02856 15Z" fill="#EE8D8D" stroke="#4B3F4E"/>
    </svg>
  );
}
