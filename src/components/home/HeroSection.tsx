import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  bgColor: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'New Season',
    subtitle: 'Spring Collection 2024',
    description: 'Discover the latest trends and styles with up to 40% off on selected items.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200',
    buttonText: 'Shop Now',
    buttonLink: '/shop?filter=new',
    bgColor: 'from-primary/90 to-primary'
  },
  {
    id: 2,
    title: 'Tech Deals',
    subtitle: 'Latest Gadgets & Electronics',
    description: 'Get the newest smartphones, laptops, and accessories at unbeatable prices.',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200',
    buttonText: 'Explore Tech',
    buttonLink: '/category/electronics',
    bgColor: 'from-slate-800 to-slate-900'
  },
  {
    id: 3,
    title: 'Mega Sale',
    subtitle: 'Up to 70% Off',
    description: 'Limited time offer on thousands of products. Don\'t miss out!',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
    buttonText: 'View Offers',
    buttonLink: '/shop?filter=sale',
    bgColor: 'from-accent to-accent-hover'
  }
];

const promoCards = [
  {
    id: 1,
    title: 'Fashion',
    subtitle: 'New Arrivals',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600',
    link: '/category/fashion'
  },
  {
    id: 2,
    title: 'Electronics',
    subtitle: 'Best Deals',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600',
    link: '/category/electronics'
  },
  {
    id: 3,
    title: 'Home Decor',
    subtitle: 'Trending Now',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600',
    link: '/category/home-living'
  },
  {
    id: 4,
    title: 'Beauty',
    subtitle: 'Self Care',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600',
    link: '/category/beauty-health'
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="relative">
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Main Carousel */}
          <div
            className="lg:col-span-2 relative overflow-hidden rounded-2xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Slides */}
            <div className="relative aspect-[16/9] lg:aspect-[2/1]">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={cn(
                    'absolute inset-0 transition-all duration-700 ease-in-out',
                    index === currentSlide
                      ? 'opacity-100 translate-x-0'
                      : index < currentSlide
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                  )}
                >
                  {/* Background Image */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className={cn(
                    'absolute inset-0 bg-gradient-to-r',
                    slide.bgColor,
                    'opacity-80'
                  )} />

                  {/* Content */}
                  <div className="relative h-full flex items-center p-8 lg:p-12">
                    <div className="max-w-lg text-primary-foreground">
                      <span className="text-sm font-medium uppercase tracking-wider opacity-90">
                        {slide.subtitle}
                      </span>
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-2 mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-primary-foreground/90 mb-6 line-clamp-2">
                        {slide.description}
                      </p>
                      <Link to={slide.buttonLink}>
                        <Button
                          size="lg"
                          className="bg-card text-foreground hover:bg-card/90 font-semibold"
                        >
                          {slide.buttonText}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 text-foreground flex items-center justify-center hover:bg-card transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 text-foreground flex items-center justify-center hover:bg-card transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    index === currentSlide
                      ? 'w-6 bg-card'
                      : 'bg-card/50 hover:bg-card/75'
                  )}
                />
              ))}
            </div>
          </div>

          {/* Promo Cards */}
          <div className="grid grid-cols-2 gap-4">
            {promoCards.map((card) => (
              <Link
                key={card.id}
                to={card.link}
                className="group relative overflow-hidden rounded-xl aspect-square"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground">
                  <p className="text-xs font-medium opacity-80">{card.subtitle}</p>
                  <h3 className="font-semibold text-lg">{card.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
