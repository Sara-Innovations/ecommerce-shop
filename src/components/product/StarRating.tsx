import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
  showEmpty?: boolean;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 18,
  interactive = false,
  onChange,
  className,
  showEmpty = true
}: StarRatingProps) {
  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  const starsToShow = showEmpty ? maxRating : Math.ceil(rating);

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[...Array(starsToShow)].map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => handleClick(i)}
          disabled={!interactive}
          className={cn(
            'transition-colors',
            interactive && 'cursor-pointer hover:scale-110',
            !interactive && 'cursor-default'
          )}
        >
          <Star
            size={size}
            className={cn(
              i < Math.floor(rating)
                ? 'text-rating fill-rating'
                : i < rating
                ? 'text-rating fill-rating/50'
                : 'text-border'
            )}
          />
        </button>
      ))}
    </div>
  );
}
