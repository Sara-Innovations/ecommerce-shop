import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import { brands } from '@/data/products';

export default function Brands() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">
          Shop by Brand
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/shop?brand=${brand.slug}`}
              className="group bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              {brand.logo ? (
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="h-16 w-auto object-contain mb-4 group-hover:scale-110 transition-transform"
                />
              ) : (
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl font-bold text-primary">
                    {brand.name.charAt(0)}
                  </span>
                </div>
              )}
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {brand.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
