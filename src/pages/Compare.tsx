import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { useCompare } from '@/context/CompareContext';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/data/products';
import { StarRating } from '@/components/product';
import { cn } from '@/lib/utils';

export default function Compare() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { addToCart, addToWishlist, isInWishlist } = useStore();

  if (compareList.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">No products to compare</h1>
          <p className="text-muted-foreground mb-6">Add products to compare their features</p>
          <Link to="/shop">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  // Get all unique specification keys
  const allSpecKeys = Array.from(
    new Set(
      compareList.flatMap((p) =>
        p.specifications ? Object.keys(p.specifications) : []
      )
    )
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/shop" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-foreground">
              Compare Products ({compareList.length})
            </h1>
          </div>
          <Button variant="outline" onClick={clearCompare}>
            Clear All
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            {/* Product Images & Actions */}
            <thead>
              <tr className="border-b border-border">
                <th className="p-4 text-left font-semibold text-muted-foreground w-48">
                  Product
                </th>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center min-w-[200px]">
                    <div className="relative">
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                      >
                        <Trash2 size={14} />
                      </button>
                      <Link to={`/product/${product.slug}`}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-32 h-32 object-cover rounded-lg mx-auto border border-border hover:border-primary transition-colors"
                        />
                      </Link>
                    </div>
                  </td>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Name */}
              <tr className="border-b border-border">
                <td className="p-4 font-semibold text-muted-foreground">Name</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <Link
                      to={`/product/${product.slug}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {product.name}
                    </Link>
                  </td>
                ))}
              </tr>

              {/* Price */}
              <tr className="border-b border-border bg-surface/50">
                <td className="p-4 font-semibold text-muted-foreground">Price</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="block text-sm text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr className="border-b border-border">
                <td className="p-4 font-semibold text-muted-foreground">Rating</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <StarRating rating={product.rating} size={16} />
                      <span className="text-sm text-muted-foreground">
                        ({product.reviewCount})
                      </span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Brand */}
              <tr className="border-b border-border bg-surface/50">
                <td className="p-4 font-semibold text-muted-foreground">Brand</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center text-foreground">
                    {product.brand?.name || '-'}
                  </td>
                ))}
              </tr>

              {/* Category */}
              <tr className="border-b border-border">
                <td className="p-4 font-semibold text-muted-foreground">Category</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center text-foreground">
                    {product.category?.name || '-'}
                  </td>
                ))}
              </tr>

              {/* Stock */}
              <tr className="border-b border-border bg-surface/50">
                <td className="p-4 font-semibold text-muted-foreground">Availability</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <span
                      className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        product.stock > 0
                          ? 'bg-success/10 text-success'
                          : 'bg-destructive/10 text-destructive'
                      )}
                    >
                      {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Specifications */}
              {allSpecKeys.map((key, index) => (
                <tr
                  key={key}
                  className={cn(
                    'border-b border-border',
                    index % 2 === 0 && 'bg-surface/50'
                  )}
                >
                  <td className="p-4 font-semibold text-muted-foreground">{key}</td>
                  {compareList.map((product) => (
                    <td key={product.id} className="p-4 text-center text-foreground">
                      {product.specifications?.[key] || '-'}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Actions */}
              <tr>
                <td className="p-4 font-semibold text-muted-foreground">Actions</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4">
                    <div className="flex flex-col gap-2 items-center">
                      <Button
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className="w-full max-w-[160px]"
                      >
                        <ShoppingCart size={16} className="mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => addToWishlist(product)}
                        className="w-full max-w-[160px]"
                      >
                        <Heart
                          size={16}
                          className={cn(
                            'mr-2',
                            isInWishlist(product.id) && 'fill-accent text-accent'
                          )}
                        />
                        {isInWishlist(product.id) ? 'In Wishlist' : 'Wishlist'}
                      </Button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}
