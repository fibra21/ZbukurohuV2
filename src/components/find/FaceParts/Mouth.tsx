'use client';

import { cn } from '@/utils/cn';

interface MouthProps {
  className?: string;
  onClick?: () => void;
}

export function Mouth({ className, onClick }: MouthProps) {
  return (
    <svg
      width="166"
      height="125"
      viewBox="0 0 166 125"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('cursor-pointer', className)}
      onClick={onClick}
    >
      <g filter="url(#filter0_d_77_87)">
        <path d="M4.71639 67.5275C4.64394 67.5184 4.57181 67.5092 4.5 67.4999C4.57009 67.5057 4.64224 67.515 4.71639 67.5275C17.5925 69.1476 40.6203 67.4299 62 55C62 56 79 69.9999 105 57.4999C104.506 57.9934 131.29 80.8934 159.871 72.8343C160.399 72.5819 160.783 72.4639 161 72.5C160.623 72.6169 160.247 72.7283 159.871 72.8343C153.092 76.0748 122.566 101.47 117 107.5C111 114 81 122 42.5 107.5C42.9953 107.5 12.5767 68.8592 4.71639 67.5275Z" fill="#DC4B59"/>
        <path d="M97.699 17.1514C100.829 11.7502 108.346 2.36838 115 5.49989C121 9.99989 103.398 8.80274 97.699 17.1514Z" fill="#DC4B59"/>
        <path d="M28.5 78.4999C36 81.3332 53.8 85.8999 65 81.4999C65 82.4999 85 89.4999 92 85.4999C99 81.4999 103.5 82.4999 128 85.4999M97.5 17.4999C97.5642 17.3857 97.6306 17.2695 97.699 17.1514M97.699 17.1514C100.829 11.7502 108.346 2.36838 115 5.49989C121 9.99989 103.398 8.80274 97.699 17.1514ZM50.5 1.5C57 4.33333 70 12.1 70 20.5M4.5 67.4999C17.3333 69.1666 40.5 67.4999 62 55C62 56 79 69.9999 105 57.4999C104.5 57.9999 132 81.4999 161 72.5C158 72 123 101 117 107.5C111 114 81 122 42.5 107.5C43 107.5 12 68.1267 4.5 67.4999Z" stroke="#4B3F4E" strokeWidth="2" strokeLinecap="round"/>
      </g>
      <defs>
        <filter id="filter0_d_77_87" x="0.371243" y="0.499756" width="164.925" height="124.143" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_77_87"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_77_87" result="shape"/>
        </filter>
      </defs>
    </svg>
  );
}
