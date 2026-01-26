import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
  columns?: 2 | 3 | 4 | 5;
  carousel?: boolean;
  className?: string;
}

export function ProductGrid({
  products,
  title,
  subtitle,
  showViewAll,
  viewAllLink = '/shop',
  columns = 4,
  carousel = false,
  className
}: ProductGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
  };

  return (
    <section className={cn('section-container', className)}>
      {/* Header */}
      {(title || showViewAll) && (
        <div className="flex items-end justify-between mb-8">
          <div>
            {title && <h2 className="section-title mb-0">{title}</h2>}
            {subtitle && (
              <p className="text-muted-foreground mt-2">{subtitle}</p>
            )}
          </div>
          {showViewAll && (
            <a
              href={viewAllLink}
              className="text-sm font-medium text-primary hover:text-primary-hover transition-colors hidden sm:block"
            >
              View All →
            </a>
          )}
        </div>
      )}

      {/* Carousel */}
      {carousel ? (
        <div className="relative">
          {/* Scroll Buttons */}
          {canScrollLeft && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 shadow-lg hidden md:flex"
              onClick={() => scroll('left')}
            >
              <ChevronLeft size={20} />
            </Button>
          )}
          {canScrollRight && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 shadow-lg hidden md:flex"
              onClick={() => scroll('right')}
            >
              <ChevronRight size={20} />
            </Button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          >
            {products.map(product => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)] xl:w-[calc(20%-13px)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Grid */
        <div className={cn('grid gap-4 md:gap-6', gridCols[columns])}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
