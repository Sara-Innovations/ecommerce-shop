import { Link, useLocation } from 'react-router-dom';
import { Home, Store, Heart, ShoppingCart, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/context/StoreContext';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Store, label: 'Store', path: '/shop' },
  { icon: Heart, label: 'Wishlist', path: '/wishlist' },
  { icon: ShoppingCart, label: 'Cart', path: '/cart' },
  { icon: User, label: 'Account', path: '/dashboard' },
];

export function MobileNav() {
  const location = useLocation();
  const { cartCount, wishlist, isAuthenticated } = useStore();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border safe-area-bottom">
      <div className="flex items-end justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          const to = item.path === '/dashboard' && !isAuthenticated ? '/auth' : item.path;

          return (
            <Link
              key={item.path}
              to={to}
              className="flex flex-col items-center justify-center flex-1 py-1 relative"
            >
              <div
                className={cn(
                  'relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground -translate-y-3 shadow-lg'
                    : 'text-muted-foreground'
                )}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                {item.path === '/cart' && cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 min-w-4 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-[10px] rounded-full">
                    {cartCount > 9 ? '9+' : cartCount}
                  </Badge>
                )}
                {item.path === '/wishlist' && wishlist.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 min-w-4 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-[10px] rounded-full">
                    {wishlist.length > 9 ? '9+' : wishlist.length}
                  </Badge>
                )}
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium mt-0.5',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
