import { useState } from 'react';
import { Review } from '@/types';
import { useReviews } from '@/context/ReviewsContext';
import { StarRating } from './StarRating';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThumbsUp, CheckCircle2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ReviewListProps {
  productId: string;
}

export function ReviewList({ productId }: ReviewListProps) {
  const { getProductReviews, getProductAverageRating, getProductReviewCount, markHelpful } = useReviews();
  const [visibleCount, setVisibleCount] = useState(5);
  const [sortBy, setSortBy] = useState<'recent' | 'helpful'>('recent');

  const reviews = getProductReviews(productId);
  const averageRating = getProductAverageRating(productId);
  const totalReviews = getProductReviewCount(productId);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'helpful') {
      return b.helpful - a.helpful;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const visibleReviews = sortedReviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  // Rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 
      : 0
  }));

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="grid md:grid-cols-2 gap-8 p-6 bg-surface rounded-xl">
        {/* Average Rating */}
        <div className="text-center md:text-left">
          <div className="text-5xl font-bold text-foreground mb-2">
            {averageRating.toFixed(1)}
          </div>
          <StarRating rating={averageRating} size={24} className="justify-center md:justify-start mb-2" />
          <p className="text-muted-foreground">
            Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {ratingCounts.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="w-12 text-sm text-muted-foreground">{rating} star</span>
              <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-rating rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 text-sm text-muted-foreground text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">
          {totalReviews} {totalReviews === 1 ? 'Review' : 'Reviews'}
        </h3>
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'recent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('recent')}
          >
            Most Recent
          </Button>
          <Button
            variant={sortBy === 'helpful' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('helpful')}
          >
            Most Helpful
          </Button>
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {visibleReviews.map((review) => (
          <ReviewCard key={review.id} review={review} onMarkHelpful={markHelpful} />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setVisibleCount(prev => prev + 5)}
            className="gap-2"
          >
            <ChevronDown size={18} />
            Show More Reviews
          </Button>
        </div>
      )}
    </div>
  );
}

interface ReviewCardProps {
  review: Review;
  onMarkHelpful: (reviewId: string) => void;
}

function ReviewCard({ review, onMarkHelpful }: ReviewCardProps) {
  const timeAgo = formatDistanceToNow(new Date(review.createdAt), { addSuffix: true });

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                {review.userName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{review.userName}</span>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-xs text-success">
                      <CheckCircle2 size={12} />
                      Verified Purchase
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{timeAgo}</span>
              </div>
            </div>
            <StarRating rating={review.rating} size={16} />
          </div>
        </div>

        <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
        <p className="text-muted-foreground leading-relaxed">{review.content}</p>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <button
            onClick={() => onMarkHelpful(review.id)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ThumbsUp size={16} />
            Helpful ({review.helpful})
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
