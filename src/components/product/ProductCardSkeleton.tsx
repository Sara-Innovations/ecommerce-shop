import { cn } from '@/lib/utils';

interface ProductCardSkeletonProps {
  className?: string;
}

export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div className={cn('product-card h-full flex flex-col animate-pulse', className)}>
      {/* Image placeholder */}
      <div className="aspect-square bg-muted rounded-t-xl" />

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        {/* Brand */}
        <div className="h-3 w-16 bg-muted rounded" />
        {/* Name */}
        <div className="h-4 w-3/4 bg-muted rounded" />
        {/* Rating */}
        <div className="flex gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3.5 h-3.5 bg-muted rounded-sm" />
          ))}
          <div className="h-3 w-8 bg-muted rounded ml-1" />
        </div>
        {/* Price */}
        <div className="flex gap-2 mt-auto">
          <div className="h-5 w-20 bg-muted rounded" />
          <div className="h-4 w-14 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}

interface ProductGridSkeletonProps {
  count?: number;
  className?: string;
}

export function ProductGridSkeleton({ count = 4, className }: ProductGridSkeletonProps) {
  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4', className)}>
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
