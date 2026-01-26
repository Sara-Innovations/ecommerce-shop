import { HeroSection, LimitedOfferSection, CouponPopup, CategorySection, FeaturesSection } from '@/components/home';
import { ProductGrid } from '@/components/product';
import { MainLayout } from '@/components/layout';
import { featuredProducts, newArrivals, bestSellers, onSaleProducts } from '@/data/products';

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Carousel + Promo Cards */}
      <HeroSection />

      {/* Features Bar */}
      <FeaturesSection />

      {/* Featured Products */}
      <ProductGrid
        products={featuredProducts}
        title="Featured Products"
        subtitle="Handpicked items just for you"
        showViewAll
        viewAllLink="/shop"
        carousel
      />

      {/* Category Section */}
      <CategorySection />

      {/* New Arrivals */}
      <ProductGrid
        products={newArrivals}
        title="New Arrivals"
        subtitle="Be the first to get the latest products"
        showViewAll
        viewAllLink="/shop?filter=new"
        carousel
      />

      {/* Limited Offer with Countdown */}
      <LimitedOfferSection />

      {/* Best Sellers */}
      <ProductGrid
        products={bestSellers}
        title="Best Sellers"
        subtitle="Most loved by our customers"
        showViewAll
        viewAllLink="/shop?filter=bestseller"
        carousel
      />

      {/* Sale Products */}
      <ProductGrid
        products={onSaleProducts}
        title="Special Offers"
        subtitle="Great deals you don't want to miss"
        showViewAll
        viewAllLink="/shop?filter=sale"
        columns={4}
        className="bg-surface"
      />

      {/* Coupon Popup (session-based) */}
      <CouponPopup />
    </MainLayout>
  );
};

export default Index;
