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
          {/* Categories Mega Menu */}
          <li
            className="relative group"
            onMouseEnter={() => setActiveMenu('categories')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors">
              <span>Categories</span>
              <ChevronDown size={16} className={`transition-transform ${activeMenu === 'categories' ? 'rotate-180' : ''}`} />
            </button>
            
            {activeMenu === 'categories' && (
              <div className="absolute top-full left-0 w-[800px] bg-card shadow-xl rounded-lg border border-border animate-fade-in z-50">
                <div className="grid grid-cols-5 gap-0">
                  {categories.map(category => (
                    <div key={category.id} className="p-4 border-r border-b border-border last:border-r-0 hover:bg-surface transition-colors">
                      {/* Category Image */}
                      <Link to={`/category/${category.slug}`} className="block mb-3">
                        <div className="aspect-square w-full rounded-lg overflow-hidden bg-muted mb-2">
                          <img
                            src={category.image || '/placeholder.svg'}
                            alt={category.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="font-bold text-sm text-foreground hover:text-primary transition-colors text-center">
                          {category.name}
                        </h3>
                      </Link>
                      {/* Subcategories */}
                      {category.children && (
                        <ul className="space-y-1">
                          {category.children.map(child => (
                            <li key={child.id}>
                              <Link
                                to={`/category/${child.slug}`}
                                className="text-xs text-muted-foreground hover:text-primary transition-colors block py-0.5"
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

          {/* Best Sellers */}
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
