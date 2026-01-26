import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { User, Package, Heart, Settings, Headphones, MapPin, LogOut, LayoutDashboard } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { useStore } from '@/context/StoreContext';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Package, label: 'My Orders', path: '/dashboard/orders' },
  { icon: Heart, label: 'Wishlist', path: '/wishlist' },
  { icon: Settings, label: 'Profile Settings', path: '/dashboard/profile' },
  { icon: Headphones, label: 'Support Tickets', path: '/dashboard/support' },
  { icon: MapPin, label: 'Address Book', path: '/dashboard/addresses' },
];

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{user?.firstName} {user?.lastName}</h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                {menuItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                      location.pathname === item.path
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-surface hover:text-foreground'
                    )}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-card rounded-xl border border-border p-6">
              {location.pathname === '/dashboard' ? (
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-6">Welcome back, {user?.firstName}!</h1>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-surface p-6 rounded-xl text-center">
                      <Package className="mx-auto mb-2 text-primary" size={32} />
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                    </div>
                    <div className="bg-surface p-6 rounded-xl text-center">
                      <Heart className="mx-auto mb-2 text-accent" size={32} />
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">Wishlist Items</p>
                    </div>
                    <div className="bg-surface p-6 rounded-xl text-center">
                      <Headphones className="mx-auto mb-2 text-success" size={32} />
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">Open Tickets</p>
                    </div>
                  </div>
                </div>
              ) : (
                <Outlet />
              )}
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
}
