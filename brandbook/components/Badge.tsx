import React from 'react';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'neutral' | 'accent';
};

export function Badge({ variant = 'neutral', className = '', ...props }: BadgeProps) {
  const styles = variant === 'accent'
    ? 'bg-accent text-text-inverse'
    : 'bg-surface-muted text-text-primary';
  const classes = [
    'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
    styles,
    className,
  ].join(' ');
  return <span className={classes} {...props} />;
}
