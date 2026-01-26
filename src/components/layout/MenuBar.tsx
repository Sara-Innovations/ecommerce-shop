import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Gift, Tag, Sparkles, TrendingUp, Phone } from 'lucide-react';
import { categories } from '@/data/products';

export function MenuBar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <nav className="hidden lg:block bg-surface border-b border-border">
      <div className="container mx-auto px-4">
        <ul className="flex items-center gap-1">
          {/* Categories Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setActiveMenu('categories')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors">
              <span>Categories</span>
              <ChevronDown size={16} className={`transition-transform ${activeMenu === 'categories' ? 'rotate-180' : ''}`} />
            </button>
            
            {activeMenu === 'categories' && (
              <div className="absolute top-full left-0 w-[600px] bg-card shadow-xl rounded-lg border border-border animate-fade-in z-50">
                <div className="grid grid-cols-3 gap-6 p-6">
                  {categories.map(category => (
                    <div key={category.id}>
                      <Link
                        to={`/category/${category.slug}`}
                        className="font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {category.name}
                      </Link>
                      {category.children && (
                        <ul className="mt-2 space-y-1">
                          {category.children.map(child => (
                            <li key={child.id}>
                              <Link
                                to={`/category/${child.slug}`}
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>

          {/* Brands */}
          <li>
            <Link
              to="/brands"
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Tag size={16} />
              <span>Brands</span>
            </Link>
          </li>

          {/* Offers */}
          <li>
            <Link
              to="/shop?filter=sale"
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              <Gift size={16} />
              <span>Offers</span>
            </Link>
          </li>

          {/* New Arrivals */}
          <li>
            <Link
              to="/shop?filter=new"
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Sparkles size={16} />
              <span>New Arrivals</span>
            </Link>
          </li>

          {/* Best Deals */}
          <li>
            <Link
              to="/shop?filter=bestseller"
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <TrendingUp size={16} />
              <span>Best Sellers</span>
            </Link>
          </li>

          {/* Contact */}
          <li>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Phone size={16} />
              <span>Contact</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
