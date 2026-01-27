import { useState } from 'react';
import { Review } from '@/types';
import { useReviews } from '@/context/ReviewsContext';
import { StarRating } from './StarRating';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThumbsUp, CheckCircle2, ChevronDown, Award, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ReviewListProps {
  productId: string;
}

export function ReviewList({ productId }: ReviewListProps) {
  const { getProductReviews, getProductAverageRating, getProductReviewCount, markHelpful } = useReviews();
  const [visibleCount, setVisibleCount] = useState(5);
  const [sortBy, setSortBy] = useState<'recent' | 'helpful'>('recent');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const reviews = getProductReviews(productId);
  const averageRating = getProductAverageRating(productId);
  const totalReviews = getProductReviewCount(productId);

  // Find most helpful review
  const mostHelpfulReview = reviews.length > 0 
    ? reviews.reduce((prev, current) => (prev.helpful > current.helpful ? prev : current))
    : null;

  // Apply filter
  const filteredReviews = filterRating 
    ? reviews.filter(r => r.rating === filterRating)
    : reviews;

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'helpful') {
      return b.helpful - a.helpful;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Exclude most helpful from main list if showing it separately
  const displayReviews = mostHelpfulReview && mostHelpfulReview.helpful > 0 && !filterRating
    ? sortedReviews.filter(r => r.id !== mostHelpfulReview.id)
    : sortedReviews;

  const visibleReviews = displayReviews.slice(0, visibleCount);
  const hasMore = visibleCount < displayReviews.length;

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

        {/* Rating Distribution - Clickable for filtering */}
        <div className="space-y-2">
          {ratingCounts.map(({ rating, count, percentage }) => (
            <button
              key={rating}
              onClick={() => setFilterRating(filterRating === rating ? null : rating)}
              className={cn(
                "w-full flex items-center gap-3 p-1 rounded transition-colors",
                filterRating === rating ? "bg-primary/10" : "hover:bg-muted/50"
              )}
            >
              <span className="w-12 text-sm text-muted-foreground">{rating} star</span>
              <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-rating rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 text-sm text-muted-foreground text-right">{count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Most Helpful Review Highlight */}
      {mostHelpfulReview && mostHelpfulReview.helpful > 0 && !filterRating && (
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Award size={20} />
              <span className="font-semibold">Most Helpful Review</span>
            </div>
            <ReviewCard review={mostHelpfulReview} onMarkHelpful={markHelpful} onImageClick={setExpandedImage} highlighted />
          </CardContent>
        </Card>
      )}

      {/* Filter & Sort Options */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground">
            {filterRating 
              ? `${filteredReviews.length} ${filterRating}-Star ${filteredReviews.length === 1 ? 'Review' : 'Reviews'}`
              : `${totalReviews} ${totalReviews === 1 ? 'Review' : 'Reviews'}`
            }
          </h3>
          {filterRating && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilterRating(null)}
              className="h-6 px-2 text-xs"
            >
              <X size={14} className="mr-1" />
              Clear filter
            </Button>
          )}
        </div>
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

      {/* Star Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {[5, 4, 3, 2, 1].map((stars) => {
          const count = ratingCounts.find(r => r.rating === stars)?.count || 0;
          return (
            <Button
              key={stars}
              variant={filterRating === stars ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterRating(filterRating === stars ? null : stars)}
              className="gap-1"
            >
              {stars} <StarRating rating={1} size={12} showEmpty={false} /> ({count})
            </Button>
          );
        })}
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {visibleReviews.length > 0 ? (
          visibleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} onMarkHelpful={markHelpful} onImageClick={setExpandedImage} />
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No {filterRating}-star reviews yet.
          </p>
        )}
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

      {/* Image Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            onClick={() => setExpandedImage(null)}
          >
            <X size={32} />
          </button>
          <img 
            src={expandedImage} 
            alt="Review" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

interface ReviewCardProps {
  review: Review;
  onMarkHelpful: (reviewId: string) => void;
  onImageClick: (url: string) => void;
  highlighted?: boolean;
}

function ReviewCard({ review, onMarkHelpful, onImageClick, highlighted }: ReviewCardProps) {
  const timeAgo = formatDistanceToNow(new Date(review.createdAt), { addSuffix: true });

  return (
    <Card className={cn("bg-card border-border", highlighted && "border-none shadow-none bg-transparent")}>
      <CardContent className={cn("p-6", highlighted && "p-0")}>
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

        {/* Review Images */}
        {review.images && review.images.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {review.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => onImageClick(img)}
                className="relative w-20 h-20 rounded-lg overflow-hidden border border-border hover:border-primary transition-colors group"
              >
                <img 
                  src={img} 
                  alt={`Review image ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <ImageIcon size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        )}

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
