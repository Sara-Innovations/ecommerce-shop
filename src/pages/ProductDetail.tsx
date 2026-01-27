import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Minus, Plus, Share2, Truck, Shield, RotateCcw, ChevronRight, Play } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { ProductGrid, StarRating, ReviewForm, ReviewList } from '@/components/product';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products, formatPrice, getDiscountPercentage } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { useReviews } from '@/context/ReviewsContext';
import { cn } from '@/lib/utils';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart, addToWishlist, isInWishlist } = useStore();
  const { getProductAverageRating, getProductReviewCount } = useReviews();
  
  const product = products.find(p => p.slug === slug);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product?.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const inWishlist = isInWishlist(product.id);
  const dynamicRating = getProductAverageRating(product.id) || product.rating;
  const dynamicReviewCount = getProductReviewCount(product.id) || product.reviewCount;
  const relatedProducts = products
    .filter(p => p.category.id === product.category.id && p.id !== product.id)
    .slice(0, 4);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <nav className="bg-surface py-4">
        <div className="container mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm">
            <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
            <ChevronRight size={14} className="text-muted-foreground" />
            <li><Link to="/shop" className="text-muted-foreground hover:text-primary">Shop</Link></li>
            <ChevronRight size={14} className="text-muted-foreground" />
            <li><Link to={`/category/${product.category.slug}`} className="text-muted-foreground hover:text-primary">{product.category.name}</Link></li>
            <ChevronRight size={14} className="text-muted-foreground" />
            <li className="text-foreground font-medium truncate max-w-[200px]">{product.name}</li>
          </ol>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative aspect-square rounded-2xl overflow-hidden bg-surface cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className={cn(
                  'w-full h-full object-cover transition-transform duration-200',
                  isZoomed && 'scale-150'
                )}
                style={isZoomed ? {
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                } : undefined}
              />
              
              {/* Badges */}
              {product.isNew && !hasDiscount && (
                <span className="badge-new">New</span>
              )}
              {hasDiscount && (
                <span className="badge-sale">
                  -{getDiscountPercentage(product.price, product.originalPrice!)}%
                </span>
              )}

              {/* Video indicator */}
              {product.videoUrl && (
                <button className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-card/90 flex items-center justify-center text-foreground hover:bg-card transition-colors">
                  <Play size={20} fill="currentColor" />
                </button>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors',
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  )}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            {/* Brand */}
            <Link
              to={`/brand/${product.brand.slug}`}
              className="text-sm font-medium text-primary hover:underline uppercase tracking-wider"
            >
              {product.brand.name}
            </Link>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={dynamicRating} size={18} />
              <span className="text-sm text-muted-foreground">
                {dynamicRating.toFixed(1)} ({dynamicReviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice!)}
                  </span>
                  <span className="px-2 py-1 bg-sale text-sale-foreground text-sm font-semibold rounded">
                    Save {getDiscountPercentage(product.price, product.originalPrice!)}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-8">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Color: <span className="text-muted-foreground">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        'px-4 py-2 rounded-lg border text-sm font-medium transition-colors',
                        selectedColor === color
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border text-foreground hover:border-primary'
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Size: <span className="text-muted-foreground">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'min-w-[48px] h-12 px-3 rounded-lg border text-sm font-medium transition-colors',
                        selectedSize === size
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border text-foreground hover:border-primary'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-3">Quantity</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stock} items available
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 min-w-[200px] bg-primary hover:bg-primary-hover text-primary-foreground gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </Button>
              <Button
                onClick={() => addToWishlist(product)}
                size="lg"
                variant="outline"
                className={cn(
                  'gap-2',
                  inWishlist && 'bg-sale/10 border-sale text-sale hover:bg-sale/20'
                )}
              >
                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
                {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Share2 size={20} />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-surface rounded-xl">
              <div className="text-center">
                <Truck className="mx-auto mb-2 text-primary" size={24} />
                <p className="text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="mx-auto mb-2 text-primary" size={24} />
                <p className="text-xs text-muted-foreground">Secure Payment</p>
              </div>
              <div className="text-center">
                <RotateCcw className="mx-auto mb-2 text-primary" size={24} />
                <p className="text-xs text-muted-foreground">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b border-border bg-transparent rounded-none p-0 h-auto flex-wrap">
              <TabsTrigger 
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="specifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger 
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
              >
                Reviews ({dynamicReviewCount})
              </TabsTrigger>
              <TabsTrigger 
                value="returns"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
              >
                Return Policy
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="py-8">
              <div className="prose max-w-none text-muted-foreground">
                <p>{product.description}</p>
                <p className="mt-4">
                  Experience premium quality with the {product.name}. Designed with attention to detail and crafted 
                  using the finest materials, this product delivers exceptional performance and style.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="py-8">
              {product.specifications ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex border-b border-border py-3">
                      <span className="w-1/3 font-medium text-foreground">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No specifications available.</p>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="py-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <ReviewList productId={product.id} />
                </div>
                <div>
                  <ReviewForm productId={product.id} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="returns" className="py-8">
              <div className="prose max-w-none text-muted-foreground">
                <p>{product.returnPolicy || 'Standard 30-day return policy applies.'}</p>
                <ul className="mt-4 space-y-2">
                  <li>• Items must be in original condition with all tags attached</li>
                  <li>• Return shipping is free for defective items</li>
                  <li>• Refunds are processed within 5-7 business days</li>
                  <li>• Exchange option available for different sizes/colors</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <ProductGrid
            products={relatedProducts}
            title="Related Products"
            subtitle="You might also like these"
            showViewAll
            viewAllLink={`/category/${product.category.slug}`}
            columns={4}
            className="mt-16"
          />
        )}
      </div>
    </MainLayout>
  );
}
