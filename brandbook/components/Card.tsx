import React from 'react';

export function Card({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={[
      'bg-surface-base border border-black/5 shadow-md rounded-2xl',
      'p-6',
      className,
    ].join(' ')}>
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={[
      'mb-4',
      className,
    ].join(' ')}>
      {children}
    </div>
  );
}

export function CardBody({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function CardFooter({ className = '', children }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={[
      'mt-6 pt-4 border-t border-black/5',
      className,
    ].join(' ')}>
      {children}
    </div>
  );
}
