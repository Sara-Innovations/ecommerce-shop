import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products, formatPrice, getDiscountPercentage } from '@/data/products';
import { useStore } from '@/context/StoreContext';

// Set end date to 3 days from now
const getEndDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  date.setHours(23, 59, 59, 999);
  return date;
};

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (endDate: Date): TimeLeft => {
  const difference = endDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
};

export function LimitedOfferSection() {
  const [endDate] = useState(getEndDate);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(endDate));
  const { addToCart } = useStore();

  // Get a sale product for the limited offer
  const offerProduct = products.find(p => p.originalPrice && p.originalPrice > p.price) || products[0];
  const discount = offerProduct.originalPrice 
    ? getDiscountPercentage(offerProduct.price, offerProduct.originalPrice)
    : 0;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <section className="bg-gradient-hero py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-primary-foreground">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/20 rounded-full px-4 py-2 mb-6">
              <Clock size={18} />
              <span className="text-sm font-medium">Limited Time Offer</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Flash Sale
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Grab this exclusive deal before it's gone!
            </p>

            {/* Countdown Timer */}
            <div className="flex gap-4 mb-8">
              <CountdownBox value={timeLeft.days} label="Days" />
              <CountdownBox value={timeLeft.hours} label="Hours" />
              <CountdownBox value={timeLeft.minutes} label="Mins" />
              <CountdownBox value={timeLeft.seconds} label="Secs" />
            </div>

            <Link to="/shop?filter=sale">
              <Button size="lg" className="bg-card text-foreground hover:bg-card/90 gap-2">
                View All Deals
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>

          {/* Right Product Card */}
          <div className="bg-card rounded-2xl p-6 shadow-xl">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Product Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-surface">
                <img
                  src={offerProduct.images[0]}
                  alt={offerProduct.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-sale text-sale-foreground text-sm font-bold px-3 py-1 rounded-md">
                  -{discount}%
                </span>
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  {offerProduct.brand.name}
                </p>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {offerProduct.name}
                </h3>
                
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(offerProduct.price)}
                  </span>
                  {offerProduct.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(offerProduct.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                  {offerProduct.description}
                </p>

                <Button
                  onClick={() => addToCart(offerProduct)}
                  className="w-full bg-accent hover:bg-accent-hover text-accent-foreground"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="countdown-box">
      <div className="countdown-number">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="countdown-label">{label}</div>
    </div>
  );
}
