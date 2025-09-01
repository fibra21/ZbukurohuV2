'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/utils/cn';

export function ThemeToggle() {
  const { theme, setTheme } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  if (!mounted) {
    return (
      <button className="p-2 text-text-secondary rounded-lg">
        <Sun className="w-4 h-4" />
      </button>
    );
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4" />;
      case 'dark':
        return <Moon className="w-4 h-4" />;
      case 'system':
        return <Monitor className="w-4 h-4" />;
      default:
        return <Sun className="w-4 h-4" />;
    }
  };

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <button
      onClick={cycleTheme}
      className="p-2 text-text-secondary hover:text-primary transition-colors rounded-lg hover:bg-gray-100"
      title={`Current theme: ${theme}`}
    >
      {getIcon()}
    </button>
  );
}
