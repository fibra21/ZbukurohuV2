import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

const base = 'inline-flex items-center justify-center font-semibold transition-colors rounded-lg focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-11 px-5 text-lg',
};
const variants = {
  primary: 'bg-primary text-text-inverse hover:bg-primary/90 focus-visible:outline-accent disabled:opacity-50',
  secondary: 'bg-secondary text-text-primary hover:bg-secondary/90 focus-visible:outline-accent disabled:opacity-50',
  ghost: 'bg-transparent text-text-primary hover:bg-surface-muted focus-visible:outline-accent disabled:opacity-50',
};

export function Button({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  const classes = [base, sizes[size], variants[variant], className].join(' ');
  return <button className={classes} {...props} />;
}
