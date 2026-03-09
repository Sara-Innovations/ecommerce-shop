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
  const [activeIndex, setActiveIndex] = useState(0);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll: move one item every 4 seconds
  useEffect(() => {
    if (!carousel || !scrollRef.current) return;

    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        if (scrollRef.current) {
          const container = scrollRef.current;
          const children = Array.from(container.children);
          const nextIndex = (activeIndex + 1) % children.length;
          const target = children[nextIndex] as HTMLElement;
          if (target) {
            const containerRect = container.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            const scrollOffset = targetRect.left - containerRect.left - (containerRect.width - targetRect.width) / 2;
            container.scrollBy({ left: scrollOffset, behavior: 'smooth' });
          }
        }
      }, 4000);
    };

    startAutoScroll();
    return () => { if (autoScrollRef.current) clearInterval(autoScrollRef.current); };
  }, [carousel, activeIndex]);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Calculate active index based on scroll position with better accuracy
      const container = scrollRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      
      let closestIndex = 0;
      let closestDistance = Infinity;
      
      Array.from(container.children).forEach((child, index) => {
        const childRect = child.getBoundingClientRect();
        const childCenter = childRect.left + childRect.width / 2;
        const distance = Math.abs(containerCenter - childCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      
      setActiveIndex(closestIndex);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const children = Array.from(container.children);
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      
      let targetIndex = activeIndex;
      
      if (direction === 'right' && activeIndex < children.length - 1) {
        targetIndex = activeIndex + 1;
      } else if (direction === 'left' && activeIndex > 0) {
        targetIndex = activeIndex - 1;
      }
      
      const targetChild = children[targetIndex];
      if (targetChild) {
        const targetRect = targetChild.getBoundingClientRect();
        const targetCenter = targetRect.left + targetRect.width / 2;
        const scrollOffset = targetCenter - containerCenter;
        
        container.scrollBy({
          left: scrollOffset,
          behavior: 'smooth'
        });
      }
      
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
          {/* Scroll Buttons - Desktop only */}
          {canScrollLeft && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 shadow-lg hidden lg:flex"
              onClick={() => scroll('left')}
            >
              <ChevronLeft size={20} />
            </Button>
          )}
          {canScrollRight && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 shadow-lg hidden lg:flex"
              onClick={() => scroll('right')}
            >
              <ChevronRight size={20} />
            </Button>
          )}

          {/* Scrollable Container - Touch swipe on mobile */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory touch-pan-x items-stretch"
            style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className={cn(
                  "flex-shrink-0 snap-center transition-all duration-500 ease-out",
                  // Dynamic sizing only on mobile, uniform on larger screens
                  index === activeIndex 
                    ? "w-[calc(75%-12px)] lg:w-[calc(25%-12px)]" // Active card - larger on mobile only
                    : "w-[calc(45%-10.8px)] lg:w-[calc(25%-12px)]" // Inactive cards - smaller on mobile, uniform on desktop
                )}
                style={{ scrollSnapAlign: 'center' }}
              >
                <ProductCard product={product} compact={index !== activeIndex} />
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
