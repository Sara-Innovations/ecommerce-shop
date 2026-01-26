import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/data/products';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <Heart className="mx-auto mb-6 text-muted-foreground" size={64} />
          <h1 className="text-2xl font-bold text-foreground mb-4">Your wishlist is empty</h1>
          <Link to="/shop"><Button>Explore Products</Button></Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Wishlist ({wishlist.length})</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map(({ product }) => (
            <div key={product.id} className="bg-card rounded-xl overflow-hidden border border-border">
              <Link to={`/product/${product.slug}`}><img src={product.images[0]} alt={product.name} className="w-full aspect-square object-cover" /></Link>
              <div className="p-4">
                <Link to={`/product/${product.slug}`} className="font-medium text-foreground hover:text-primary line-clamp-2">{product.name}</Link>
                <p className="font-bold text-primary mt-2">{formatPrice(product.price)}</p>
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => { addToCart(product); removeFromWishlist(product.id); }} size="sm" className="flex-1 gap-2"><ShoppingCart size={16} />Add to Cart</Button>
                  <Button onClick={() => removeFromWishlist(product.id)} size="sm" variant="outline"><Trash2 size={16} /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
