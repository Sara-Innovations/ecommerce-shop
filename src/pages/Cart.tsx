import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/data/products';

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity, cartTotal } = useStore();

  if (cart.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="mx-auto mb-6 text-muted-foreground" size={64} />
          <h1 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Start shopping to add items to your cart.</p>
          <Link to="/shop"><Button>Continue Shopping</Button></Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.product.id} className="flex gap-4 p-4 bg-card rounded-xl border border-border">
                <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <Link to={`/product/${item.product.slug}`} className="font-medium text-foreground hover:text-primary">{item.product.name}</Link>
                  <p className="text-sm text-muted-foreground">{item.selectedColor} {item.selectedSize && `/ ${item.selectedSize}`}</p>
                  <p className="font-bold text-primary mt-2">{formatPrice(item.product.price)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={18} /></button>
                  <div className="flex items-center border border-border rounded">
                    <button onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)} className="p-2"><Minus size={14} /></button>
                    <span className="px-3">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)} className="p-2"><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-card p-6 rounded-xl border border-border h-fit">
            <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>Free</span></div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg"><span>Total</span><span>{formatPrice(cartTotal)}</span></div>
            </div>
            <Link to="/checkout"><Button className="w-full bg-primary hover:bg-primary-hover">Proceed to Checkout</Button></Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
