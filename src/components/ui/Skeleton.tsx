import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Skeleton({ 
  className, 
  width, 
  height, 
  rounded = 'md' 
}: SkeletonProps) {
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-neutral-200',
        roundedClasses[rounded],
        className
      )}
      style={{
        width: width,
        height: height
      }}
    />
  );
}

// Predefined skeleton components
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-neutral-200 overflow-hidden">
      <Skeleton className="w-full aspect-square" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
        <div className="flex space-x-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-6">
      <Skeleton className="w-16 h-16 mx-auto mb-4 rounded-full" />
      <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <div className="bg-white border-b border-neutral-200 p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <div className="hidden md:flex space-x-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-16" />
          ))}
        </div>
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
