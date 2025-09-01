'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { locales, type LocaleCode } from '@/lib/i18n';
import { Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

export function LocaleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale } = useAppStore();

  const currentLocale = locales[locale as LocaleCode];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 p-2 text-text-secondary hover:text-primary transition-colors rounded-lg hover:bg-gray-100"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLocale.flag}</span>
        <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-2xl shadow-medium py-1 z-50">
          {Object.entries(locales).map(([code, localeData]) => (
            <button
              key={code}
              onClick={() => {
                setLocale(code as LocaleCode);
                setIsOpen(false);
              }}
              className={cn(
                "w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2",
                code === locale && "bg-primary-50 text-primary"
              )}
            >
              <span>{localeData.flag}</span>
              <span>{localeData.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
