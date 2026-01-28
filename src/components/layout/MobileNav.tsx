import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, ShoppingCart, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/context/StoreContext';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Search', path: '/shop' },
  { icon: Heart, label: 'Wishlist', path: '/wishlist' },
  { icon: ShoppingCart, label: 'Cart', path: '/cart' },
  { icon: User, label: 'Account', path: '/dashboard' },
];

export function MobileNav() {
  const location = useLocation();
  const { cartCount, wishlist, isAuthenticated } = useStore();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          // Handle authentication redirect
          const to = item.path === '/dashboard' && !isAuthenticated ? '/auth' : item.path;

          return (
            <Link
              key={item.path}
              to={to}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full relative transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <div className="relative">
                <Icon size={22} />
                {item.path === '/cart' && cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 bg-primary text-primary-foreground text-[10px]">
                    {cartCount > 9 ? '9+' : cartCount}
                  </Badge>
                )}
                {item.path === '/wishlist' && wishlist.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 bg-accent text-accent-foreground text-[10px]">
                    {wishlist.length > 9 ? '9+' : wishlist.length}
                  </Badge>
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
