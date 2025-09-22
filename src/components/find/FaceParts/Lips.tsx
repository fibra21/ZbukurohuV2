'use client';

import { cn } from '@/utils/cn';

interface LipsProps {
  className?: string;
  onClick?: () => void;
}

export function Lips({ className, onClick }: LipsProps) {
  return (
    <svg
      width="110"
      height="146"
      viewBox="0 0 110 146"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('cursor-pointer', className)}
      onClick={onClick}
    >
      <path d="M0.999995 1C0.984089 1.45808 0.970285 1.92785 0.95869 2.40892C3.58275 15.5691 76.3702 70.3306 97.5 90.5C119.5 111.5 104.5 134.5 97.5 140C90.5 145.5 64.5 154 31.5 113.5C5.60388 81.7184 0.362802 27.1329 0.95869 2.40892C0.850624 1.86695 0.861556 1.39554 0.999995 1Z" fill="#A68F89" stroke="#4B3F4E"/>
    </svg>
  );
}
