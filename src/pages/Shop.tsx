import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Grid3X3, LayoutGrid, Loader2 } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { ProductCard } from '@/components/product';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { products, categories, brands } from '@/data/products';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { Product } from '@/types';

const colors = ['Black', 'White', 'Blue', 'Red', 'Green', 'Gray', 'Navy'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11'];

const PRODUCTS_PER_PAGE = 8;

// Simulate an API call with axios-like delay
const fetchProducts = async (page: number, allProducts: Product[]): Promise<Product[]> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  return allProducts.slice(start, end);
};

export default function Shop() {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter');
  const search = searchParams.get('search');
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 400000]);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const allFilteredProducts = useMemo(() => {
    let result = [...products];

    if (filter === 'new') result = result.filter(p => p.isNew);
    else if (filter === 'sale') result = result.filter(p => p.originalPrice && p.originalPrice > p.price);
    else if (filter === 'bestseller') result = result.filter(p => p.isBestSeller);

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.brand.name.toLowerCase().includes(searchLower)
      );
    }

    if (selectedCategories.length > 0) result = result.filter(p => selectedCategories.includes(p.category.slug));
    if (selectedBrands.length > 0) result = result.filter(p => selectedBrands.includes(p.brand.slug));
    if (selectedColors.length > 0) result = result.filter(p => p.colors?.some(c => selectedColors.includes(c)));
    if (selectedSizes.length > 0) result = result.filter(p => p.sizes?.some(s => selectedSizes.includes(s)));
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'popular': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [filter, search, selectedCategories, selectedBrands, selectedColors, selectedSizes, priceRange, sortBy]);

  // Reset when filters change
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    const initial = allFilteredProducts.slice(0, PRODUCTS_PER_PAGE);
    setDisplayedProducts(initial);
    setHasMore(initial.length < allFilteredProducts.length);
  }, [allFilteredProducts]);

  // Load more products
  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const newProducts = await fetchProducts(nextPage, allFilteredProducts);
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setDisplayedProducts(prev => [...prev, ...newProducts]);
        setPage(nextPage);
        const totalLoaded = nextPage * PRODUCTS_PER_PAGE;
        if (totalLoaded >= allFilteredProducts.length) setHasMore(false);
      }
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore, allFilteredProducts]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [loadMore, hasMore, isLoading]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange([0, 400000]);
    setSortBy('newest');
  };

  const activeFiltersCount = 
    selectedCategories.length + 
    selectedBrands.length + 
    selectedColors.length + 
    selectedSizes.length +
    (priceRange[0] > 0 || priceRange[1] < 400000 ? 1 : 0);

  const pageTitle = filter === 'new' 
    ? 'New Arrivals' 
    : filter === 'sale' 
    ? 'Special Offers' 
    : filter === 'bestseller'
    ? 'Best Sellers'
    : search
    ? `Search: "${search}"`
    : 'All Products';

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">{pageTitle}</h1>
            <p className="text-muted-foreground mt-1">{allFilteredProducts.length} products found</p>
          </div>

          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden gap-2">
                  <SlidersHorizontal size={18} />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
                <div className="mt-6">
                  <FilterContent
                    categories={categories} brands={brands} colors={colors} sizes={sizes}
                    selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
                    selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}
                    selectedColors={selectedColors} setSelectedColors={setSelectedColors}
                    selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes}
                    priceRange={priceRange} setPriceRange={setPriceRange}
                  />
                </div>
              </SheetContent>
            </Sheet>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-44"><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <div className="hidden md:flex items-center border border-border rounded-lg">
              <button onClick={() => setGridCols(3)} className={cn('p-2 transition-colors', gridCols === 3 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}>
                <LayoutGrid size={18} />
              </button>
              <button onClick={() => setGridCols(4)} className={cn('p-2 transition-colors', gridCols === 4 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}>
                <Grid3X3 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Active Filters:</span>
            {selectedCategories.map(cat => (
              <FilterTag key={cat} label={cat} onRemove={() => setSelectedCategories(prev => prev.filter(c => c !== cat))} />
            ))}
            {selectedBrands.map(brand => (
              <FilterTag key={brand} label={brand} onRemove={() => setSelectedBrands(prev => prev.filter(b => b !== brand))} />
            ))}
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">Clear All</Button>
          </div>
        )}

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 space-y-6">
              <FilterContent
                categories={categories} brands={brands} colors={colors} sizes={sizes}
                selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
                selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}
                selectedColors={selectedColors} setSelectedColors={setSelectedColors}
                selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes}
                priceRange={priceRange} setPriceRange={setPriceRange}
              />
            </div>
          </aside>

          <div className="flex-1">
            {displayedProducts.length > 0 ? (
              <>
                <div className={cn(
                  'grid gap-4 md:gap-6',
                  gridCols === 3 ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                )}>
                  {displayedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Infinite scroll sentinel */}
                <div ref={loadMoreRef} className="py-8 flex justify-center">
                  {isLoading && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 size={20} className="animate-spin" />
                      <span className="text-sm">Loading more products...</span>
                    </div>
                  )}
                  {!hasMore && displayedProducts.length > PRODUCTS_PER_PAGE && (
                    <p className="text-sm text-muted-foreground">You've seen all products</p>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    {search ? `No products found for "${search}"` : 'No products found'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {search ? 'Try adjusting your search terms or browse our categories below.' : 'Try adjusting your filters or browse our categories below.'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={clearFilters} variant="outline">Clear Filters</Button>
                    <Button onClick={() => window.location.href = '/shop'}>Browse All Products</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

interface FilterContentProps {
  categories: typeof categories;
  brands: typeof brands;
  colors: string[];
  sizes: string[];
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSizes: string[];
  setSelectedSizes: React.Dispatch<React.SetStateAction<string[]>>;
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

function FilterContent({ categories, brands, colors, sizes, selectedCategories, setSelectedCategories, selectedBrands, setSelectedBrands, selectedColors, setSelectedColors, selectedSizes, setSelectedSizes, priceRange, setPriceRange }: FilterContentProps) {
  return (
    <>
      <div className="filter-section">
        <h4 className="filter-title">Categories</h4>
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
              <Checkbox checked={selectedCategories.includes(cat.slug)} onCheckedChange={(checked) => { if (checked) setSelectedCategories(prev => [...prev, cat.slug]); else setSelectedCategories(prev => prev.filter(c => c !== cat.slug)); }} />
              <span className="text-sm text-foreground">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-title">Brands</h4>
        <div className="space-y-2">
          {brands.slice(0, 6).map(brand => (
            <label key={brand.id} className="flex items-center gap-3 cursor-pointer">
              <Checkbox checked={selectedBrands.includes(brand.slug)} onCheckedChange={(checked) => { if (checked) setSelectedBrands(prev => [...prev, brand.slug]); else setSelectedBrands(prev => prev.filter(b => b !== brand.slug)); }} />
              <span className="text-sm text-foreground">{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-title">Price Range</h4>
        <div className="px-2">
          <Slider value={priceRange} onValueChange={(value) => setPriceRange(value as [number, number])} max={400000} min={0} step={1000} className="mb-4" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>৳{priceRange[0].toLocaleString()}</span>
            <span>৳{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-title">Colors</h4>
        <div className="flex flex-wrap gap-2">
          {colors.map(color => (
            <button key={color} onClick={() => { if (selectedColors.includes(color)) setSelectedColors(prev => prev.filter(c => c !== color)); else setSelectedColors(prev => [...prev, color]); }} className={cn('px-3 py-1 rounded-full text-sm border transition-colors', selectedColors.includes(color) ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground hover:border-primary')}>
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section border-b-0">
        <h4 className="filter-title">Sizes</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.slice(0, 6).map(size => (
            <button key={size} onClick={() => { if (selectedSizes.includes(size)) setSelectedSizes(prev => prev.filter(s => s !== size)); else setSelectedSizes(prev => [...prev, size]); }} className={cn('w-10 h-10 rounded border text-sm font-medium transition-colors', selectedSizes.includes(size) ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground hover:border-primary')}>
              {size}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-surface rounded-full text-sm">
      {label}
      <button onClick={onRemove} className="text-muted-foreground hover:text-foreground"><X size={14} /></button>
    </span>
  );
}
