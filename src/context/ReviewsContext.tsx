import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Review } from '@/types';
import { toast } from 'sonner';
import { useStore } from './StoreContext';

interface ReviewsContextType {
  reviews: Review[];
  addReview: (productId: string, rating: number, title: string, content: string, images?: string[]) => boolean;
  getProductReviews: (productId: string) => Review[];
  getProductAverageRating: (productId: string) => number;
  getProductReviewCount: (productId: string) => number;
  markHelpful: (reviewId: string) => void;
  hasUserReviewed: (productId: string) => boolean;
  canUserReview: (productId: string) => boolean;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

// Sample reviews for demo purposes
const sampleReviews: Review[] = [
  {
    id: 'r1',
    productId: '1',
    userId: 'demo1',
    userName: 'Sarah M.',
    rating: 5,
    title: 'Absolutely love it!',
    content: 'Perfect fit and amazing quality. The material feels premium and the color is exactly as shown. Highly recommend!',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&h=200&fit=crop'
    ],
    createdAt: '2026-01-15T10:30:00Z',
    helpful: 12,
    verified: true
  },
  {
    id: 'r2',
    productId: '1',
    userId: 'demo2',
    userName: 'Ahmed K.',
    rating: 4,
    title: 'Great product, minor issues',
    content: 'Overall very satisfied with my purchase. Delivery was quick and packaging was good. Took off one star because the sizing runs slightly small.',
    createdAt: '2026-01-10T14:20:00Z',
    helpful: 8,
    verified: true
  },
  {
    id: 'r3',
    productId: '2',
    userId: 'demo3',
    userName: 'Fatima R.',
    rating: 5,
    title: 'Best purchase ever!',
    content: 'I have been looking for this exact product for months. Quality exceeded my expectations. Will definitely buy again!',
    images: [
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200&h=200&fit=crop'
    ],
    createdAt: '2026-01-08T09:15:00Z',
    helpful: 15,
    verified: true
  }
];

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useStore();
  
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('reviews');
    if (saved) {
      return JSON.parse(saved);
    }
    return sampleReviews;
  });

  // Persist reviews
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const getProductReviews = (productId: string): Review[] => {
    return reviews
      .filter(r => r.productId === productId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const getProductAverageRating = (productId: string): number => {
    const productReviews = reviews.filter(r => r.productId === productId);
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / productReviews.length) * 10) / 10;
  };

  const getProductReviewCount = (productId: string): number => {
    return reviews.filter(r => r.productId === productId).length;
  };

  const hasUserReviewed = (productId: string): boolean => {
    if (!user) return false;
    return reviews.some(r => r.productId === productId && r.userId === user.id);
  };

  const canUserReview = (productId: string): boolean => {
    // For demo purposes, logged-in users can review any product
    // In production, you'd check purchase history
    return isAuthenticated && !hasUserReviewed(productId);
  };

  const addReview = (productId: string, rating: number, title: string, content: string, images?: string[]): boolean => {
    if (!user) {
      toast.error('Please login to leave a review');
      return false;
    }

    if (hasUserReviewed(productId)) {
      toast.error('You have already reviewed this product');
      return false;
    }

    const newReview: Review = {
      id: `r${Date.now()}`,
      productId,
      userId: user.id,
      userName: `${user.firstName} ${user.lastName.charAt(0)}.`,
      rating,
      title,
      content,
      images: images && images.length > 0 ? images : undefined,
      createdAt: new Date().toISOString(),
      helpful: 0,
      verified: true // Simulating verified purchase
    };

    setReviews(prev => [newReview, ...prev]);
    toast.success('Review submitted successfully!');
    return true;
  };

  const markHelpful = (reviewId: string) => {
    const helpfulKey = `helpful_${reviewId}`;
    if (localStorage.getItem(helpfulKey)) {
      toast.info('You already marked this review as helpful');
      return;
    }

    setReviews(prev =>
      prev.map(r =>
        r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
      )
    );
    localStorage.setItem(helpfulKey, 'true');
    toast.success('Marked as helpful');
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
        getProductAverageRating,
        getProductReviewCount,
        markHelpful,
        hasUserReviewed,
        canUserReview
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
}
