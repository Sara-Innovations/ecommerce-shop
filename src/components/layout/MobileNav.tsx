import { Link, useLocation } from 'react-router-dom';
import { Home, Store, Heart, ShoppingCart, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/context/StoreContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
                'flex flex-col items-center justify-center flex-1 h-full relative'
              )}
            >
              <motion.div
                className="relative flex items-center justify-center w-12 h-12 rounded-full"
                animate={{
                  y: isActive ? -20 : 0,
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isActive ? 'white' : 'transparent',
                  boxShadow: isActive ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'none'
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
              >
                <motion.div
                  animate={{
                    color: isActive ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                    scale: isActive ? 1.1 : 1
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                >
                  <Icon size={22} />
                </motion.div>
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
              </motion.div>
              <motion.span
                className={cn(
                  'text-[10px] mt-1 font-medium',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  color: isActive ? 'var(--primary)' : 'var(--muted-foreground)'
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
              >
                {item.label}
              </motion.span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
