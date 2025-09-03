import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to combine class names with Tailwind CSS class merging
 * This ensures that conflicting classes are properly resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility function to conditionally apply classes
 */
export function classNames(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Utility function to create responsive class variants
 */
export function responsiveClass(base: string, variants: Record<string, string>) {
  return Object.entries(variants)
    .map(([breakpoint, className]) => `${breakpoint}:${className}`)
    .join(' ');
}
