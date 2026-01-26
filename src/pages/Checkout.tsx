import { Link } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/data/products';

export default function Checkout() {
  const { cart, cartTotal } = useStore();
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card p-6 rounded-xl border"><h3 className="font-semibold mb-4">Shipping Information</h3><div className="grid sm:grid-cols-2 gap-4"><Input placeholder="Full Name" /><Input placeholder="Phone" /><Input placeholder="Address" className="sm:col-span-2" /><Input placeholder="City" /><Input placeholder="Postal Code" /></div></div>
            <div className="bg-card p-6 rounded-xl border"><h3 className="font-semibold mb-4">Payment Method</h3><div className="grid sm:grid-cols-2 gap-4">{['bKash', 'Nagad', 'Rocket', 'SSLCommerz'].map(m => <button key={m} className="p-4 border rounded-lg hover:border-primary text-center font-medium">{m}</button>)}</div></div>
          </div>
          <div className="bg-card p-6 rounded-xl border h-fit">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            {cart.map(item => <div key={item.product.id} className="flex justify-between text-sm py-2"><span>{item.product.name} x{item.quantity}</span><span>{formatPrice(item.product.price * item.quantity)}</span></div>)}
            <div className="border-t mt-4 pt-4 flex justify-between font-bold"><span>Total</span><span>{formatPrice(cartTotal)}</span></div>
            <Button className="w-full mt-4">Place Order</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
