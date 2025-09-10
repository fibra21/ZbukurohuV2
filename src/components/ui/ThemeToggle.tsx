'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
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

  const getIcon = () => (theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />);

  const cycleTheme = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={cycleTheme}
      className="p-2 text-text-secondary hover:text-primary transition-colors rounded-lg hover:bg-gray-100"
      title={`Current theme: ${theme}`}
      type="button"
    >
      {getIcon()}
    </button>
  );
}
