import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/context/StoreContext';
import { SearchSuggestions } from '@/components/search/SearchSuggestions';
import { useTheme } from '@/hooks/useTheme';

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, wishlist, isAuthenticated, searchQuery, setSearchQuery } = useStore();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 lg:h-20">
          {/* Mobile Menu Button - Hidden on mobile, shown on desktop */}
          {/* <button
            className="hidden lg:block p-2 -ml-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button> */}

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-display text-xl md:text-2xl font-bold text-primary">
            <img 
              src="/logo2.png" 
              alt="SaraCodeLabsShop" 
              className="w-auto h-12  md:h-16 rounded-lg"
            />
            {/* <span className="lg:inline hidden">SaraCodeLabsShop</span> */}
            {/* <span className="lg:hidden">SaraCodeLabsShop</span> */}
          </Link>

          {/* Desktop Search with Suggestions */}
          <SearchSuggestions
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            className="hidden lg:block flex-1 max-w-xl mx-8"
            placeholder="Search for products, brands and more..."
          />

          {/* Right Actions - Desktop only */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <ThemeToggle />
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-foreground hover:text-primary transition-colors"
            >
              <Heart size={22} />
              {wishlist.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground text-xs">
                  {wishlist.length}
                </Badge>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-foreground hover:text-primary transition-colors"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs">
                  {cartCount}
                </Badge>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User size={20} />
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="icon" className="rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md hover:shadow-lg hover:scale-105 transition-all">
                  <User size={18} />
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile - Search + Theme Toggle */}
          <div className="lg:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              className="p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar with Suggestions */}
        {isSearchOpen && (
          <div className="lg:hidden pb-4 animate-slide-down">
            <SearchSuggestions
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              placeholder="Search products..."
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Mobile Menu - Hidden on mobile */}
      {isMobileMenuOpen && (
        <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
      )}
    </header>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="lg:hidden fixed inset-0 top-16 bg-background z-40 animate-fade-in">
      <nav className="container mx-auto px-4 py-6 space-y-4">
        <MobileMenuLink to="/shop" onClick={onClose}>Shop All</MobileMenuLink>
        <MobileMenuLink to="/category/electronics" onClick={onClose}>Electronics</MobileMenuLink>
        <MobileMenuLink to="/category/fashion" onClick={onClose}>Fashion</MobileMenuLink>
        <MobileMenuLink to="/category/home-living" onClick={onClose}>Home & Living</MobileMenuLink>
        <MobileMenuLink to="/shop?filter=new" onClick={onClose}>New Arrivals</MobileMenuLink>
        <MobileMenuLink to="/shop?filter=sale" onClick={onClose}>Offers</MobileMenuLink>
        <MobileMenuLink to="/contact" onClick={onClose}>Contact</MobileMenuLink>
        
        <div className="border-t border-border pt-4 mt-6 space-y-4">
          <MobileMenuLink to="/faq" onClick={onClose}>FAQs</MobileMenuLink>
          <MobileMenuLink to="/terms" onClick={onClose}>Terms & Conditions</MobileMenuLink>
          <MobileMenuLink to="/privacy" onClick={onClose}>Privacy Policy</MobileMenuLink>
        </div>
      </nav>
    </div>
  );
}

function MobileMenuLink({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block py-3 text-lg font-medium text-foreground hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
}

function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full text-foreground hover:text-primary hover:bg-secondary transition-all"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
