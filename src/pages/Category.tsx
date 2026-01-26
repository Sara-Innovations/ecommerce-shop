import { useParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import { ProductGrid } from '@/components/product';
import { products, categories } from '@/data/products';

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  
  const category = categories.find(c => c.slug === slug);
  const subcategory = categories.flatMap(c => c.children || []).find(c => c.slug === slug);
  
  const targetCategory = category || subcategory;
  
  const filteredProducts = products.filter(p => {
    if (category) {
      return p.category.id === category.id || p.category.slug === slug;
    }
    if (subcategory) {
      return p.category.slug === subcategory.slug;
    }
    return false;
  });

  if (!targetCategory) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Category Not Found</h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-surface py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">
            {targetCategory.name}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} products found
          </p>
        </div>
      </div>

      {/* Products */}
      <ProductGrid
        products={filteredProducts.length > 0 ? filteredProducts : products.slice(0, 8)}
        columns={4}
      />
    </MainLayout>
  );
}
