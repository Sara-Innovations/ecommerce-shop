import { useState } from 'react';
import { useReviews } from '@/context/ReviewsContext';
import { useStore } from '@/context/StoreContext';
import { StarRating } from './StarRating';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { MessageSquarePlus } from 'lucide-react';

interface ReviewFormProps {
  productId: string;
  onSuccess?: () => void;
}

export function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
  const { isAuthenticated } = useStore();
  const { addReview, canUserReview, hasUserReviewed } = useReviews();
  
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    if (!title.trim()) {
      newErrors.title = 'Please enter a title';
    } else if (title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    if (!content.trim()) {
      newErrors.content = 'Please enter your review';
    } else if (content.length < 20) {
      newErrors.content = 'Review must be at least 20 characters';
    } else if (content.length > 1000) {
      newErrors.content = 'Review must be less than 1000 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const success = addReview(productId, rating, title.trim(), content.trim());
    
    if (success) {
      setRating(0);
      setTitle('');
      setContent('');
      onSuccess?.();
    }
    
    setIsSubmitting(false);
  };

  if (!isAuthenticated) {
    return (
      <Card className="bg-surface border-border">
        <CardContent className="py-8 text-center">
          <MessageSquarePlus className="mx-auto mb-4 text-muted-foreground" size={48} />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Want to share your thoughts?
          </h3>
          <p className="text-muted-foreground mb-4">
            Login to leave a review for this product
          </p>
          <Link to="/auth">
            <Button>Login to Review</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (hasUserReviewed(productId)) {
    return (
      <Card className="bg-surface border-border">
        <CardContent className="py-6 text-center">
          <p className="text-muted-foreground">
            ✓ You have already reviewed this product
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!canUserReview(productId)) {
    return null;
  }

  return (
    <Card className="bg-surface border-border">
      <CardHeader>
        <CardTitle className="text-xl">Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Your Rating *
            </label>
            <StarRating
              rating={rating}
              size={28}
              interactive
              onChange={setRating}
            />
            {errors.rating && (
              <p className="mt-1 text-sm text-destructive">{errors.rating}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Review Title *
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sum up your experience in a few words"
              maxLength={100}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Your Review *
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What did you like or dislike? How was the quality?"
              rows={4}
              maxLength={1000}
            />
            <div className="flex justify-between mt-1">
              {errors.content ? (
                <p className="text-sm text-destructive">{errors.content}</p>
              ) : (
                <span />
              )}
              <span className="text-xs text-muted-foreground">
                {content.length}/1000
              </span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
