import { Link } from 'react-router-dom';
import { categories } from '@/data/products';
import { cn } from '@/lib/utils';

const categoryImages = [
  'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
  'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
];

export function CategorySection() {
  return (
    <section className="section-container">
      <div className="text-center mb-10">
        <h2 className="section-title mb-2">Shop by Category</h2>
        <p className="text-muted-foreground">
          Explore our wide range of product categories
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.slice(0, 5).map((category, index) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            className="group"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
              <img
                src={categoryImages[index] || category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="text-center font-medium text-foreground group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            {category.children && (
              <p className="text-center text-sm text-muted-foreground">
                {category.children.length} subcategories
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
