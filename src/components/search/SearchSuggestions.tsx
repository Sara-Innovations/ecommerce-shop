import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Clock, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { products } from '@/data/products';
import { cn } from '@/lib/utils';

interface SearchSuggestionsProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

const trendingSearches = ['iPhone', 'Nike', 'Headphones', 'Laptop', 'Watch'];

export function SearchSuggestions({
  value,
  onChange,
  onSearch,
  className,
  placeholder = 'Search for products...',
  autoFocus = false,
}: SearchSuggestionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const suggestions = value
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(value.toLowerCase()) ||
          p.category?.name.toLowerCase().includes(value.toLowerCase()) ||
          p.brand?.name.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    // Save to recent searches
    const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));

    navigate(`/shop?search=${encodeURIComponent(query)}`);
    setIsOpen(false);
  };

  const removeRecentSearch = (search: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = recentSearches.filter((s) => s !== search);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <Input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(value);
            }
          }}
          className="w-full pl-12 pr-4 py-3 h-12 bg-surface border-none rounded-full focus-visible:ring-2 focus-visible:ring-primary"
          autoFocus={autoFocus}
        />
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl border border-border shadow-xl z-50 overflow-hidden animate-fade-in">
          {/* Product Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase">
                Products
              </p>
              {suggestions.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface transition-colors"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.category?.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {!value && recentSearches.length > 0 && (
            <div className="p-2 border-t border-border">
              <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase flex items-center gap-2">
                <Clock size={12} />
                Recent Searches
              </p>
              {recentSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => handleSearch(search)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-surface transition-colors group"
                >
                  <span className="text-foreground">{search}</span>
                  <X
                    size={14}
                    className="text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive"
                    onClick={(e) => removeRecentSearch(search, e)}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Trending Searches */}
          {!value && (
            <div className="p-2 border-t border-border">
              <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase flex items-center gap-2">
                <TrendingUp size={12} />
                Trending
              </p>
              <div className="flex flex-wrap gap-2 px-3 pb-2">
                {trendingSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => handleSearch(search)}
                    className="px-3 py-1.5 text-sm bg-surface rounded-full text-foreground hover:bg-surface-hover transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
