import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye, GitCompare } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, getDiscountPercentage } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { useCompare } from '@/context/CompareContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
  compact?: boolean;
}

export function ProductCard({ product, className, compact = false }: ProductCardProps) {
  const { addToCart, addToWishlist, isInWishlist } = useStore();
  const { addToCompare, isInCompare } = useCompare();
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  return (
    <article className={cn('product-card group', className)}>
      {/* Image Container */}
      <div className="product-card-image aspect-product relative">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        {product.isNew && !hasDiscount && (
          <span className="badge-new">New</span>
        )}
        {hasDiscount && (
          <span className="badge-sale">
            -{getDiscountPercentage(product.price, product.originalPrice!)}%
          </span>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => addToWishlist(product)}
            className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center transition-colors',
              inWishlist
                ? 'bg-sale text-sale-foreground'
                : 'bg-card text-foreground hover:bg-sale hover:text-sale-foreground'
            )}
            title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => addToCompare(product)}
            className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center transition-colors',
              inCompare
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-foreground hover:bg-primary hover:text-primary-foreground'
            )}
            title={inCompare ? 'Remove from compare' : 'Add to compare'}
          >
            <GitCompare size={18} />
          </button>
          <Link
            to={`/product/${product.slug}`}
            className="w-9 h-9 rounded-full bg-card text-foreground hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
            title="Quick view"
          >
            <Eye size={18} />
          </Link>
        </div>

        {/* Add to Cart Button */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <Button
            onClick={() => addToCart(product)}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground gap-2"
            size="sm"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {product.brand.name}
        </p>

        {/* Name */}
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-medium text-foreground line-clamp-2 hover:text-primary transition-colors mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={cn(
                  i < Math.floor(product.rating)
                    ? 'text-rating fill-rating'
                    : 'text-border'
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className={cn(
          "flex items-center gap-2",
          compact && "flex-nowrap overflow-x-auto scrollbar-hide"
        )}>
          <span className={cn("price-current whitespace-nowrap", compact && "text-sm")}>{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className={cn("price-original whitespace-nowrap", compact && "text-xs")}>
              {formatPrice(product.originalPrice!)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
