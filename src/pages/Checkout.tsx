import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/data/products';
import { CreditCard, Banknote, CheckCircle2, Smartphone, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type PaymentType = 'automatic' | 'manual';
type AutomaticMethod = 'bkash' | 'nagad' | 'rocket' | 'sslcommerz';
type ManualMethod = 'cod' | 'bank_transfer';

const automaticPayments: { id: AutomaticMethod; name: string; icon: React.ReactNode; description: string }[] = [
  { id: 'bkash', name: 'bKash', icon: <Smartphone size={24} />, description: 'Pay instantly via bKash' },
  { id: 'nagad', name: 'Nagad', icon: <Smartphone size={24} />, description: 'Pay instantly via Nagad' },
  { id: 'rocket', name: 'Rocket', icon: <Smartphone size={24} />, description: 'Pay instantly via Rocket' },
  { id: 'sslcommerz', name: 'SSLCommerz', icon: <CreditCard size={24} />, description: 'Cards, Net Banking & more' },
];

const manualPayments: { id: ManualMethod; name: string; icon: React.ReactNode; description: string }[] = [
  { id: 'cod', name: 'Cash on Delivery', icon: <Banknote size={24} />, description: 'Pay when you receive' },
  { id: 'bank_transfer', name: 'Bank Transfer', icon: <Building2 size={24} />, description: 'Direct bank transfer' },
];

export default function Checkout() {
  const { cart, cartTotal } = useStore();
  const [paymentType, setPaymentType] = useState<PaymentType>('automatic');
  const [selectedAutomatic, setSelectedAutomatic] = useState<AutomaticMethod | null>(null);
  const [selectedManual, setSelectedManual] = useState<ManualMethod | null>(null);

  const shippingCost = cartTotal > 5000 ? 0 : 100;
  const totalAmount = cartTotal + shippingCost;

  const handlePlaceOrder = () => {
    const paymentMethod = paymentType === 'automatic' ? selectedAutomatic : selectedManual;
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }
    toast.success('Order placed successfully! (Demo)');
  };

  if (cart.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
          <Link to="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <h3 className="font-semibold text-foreground mb-4">Shipping Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Full Name" />
                <Input placeholder="Phone Number" />
                <Input placeholder="Street Address" className="sm:col-span-2" />
                <Input placeholder="City" />
                <Input placeholder="Postal Code" />
              </div>
            </div>

            {/* Payment Type Toggle */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <h3 className="font-semibold text-foreground mb-4">Payment Method</h3>
              
              {/* Payment Type Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => {
                    setPaymentType('automatic');
                    setSelectedManual(null);
                  }}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
                    paymentType === 'automatic'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <CreditCard size={18} />
                  Automatic Payment
                </button>
                <button
                  onClick={() => {
                    setPaymentType('manual');
                    setSelectedAutomatic(null);
                  }}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
                    paymentType === 'manual'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <Banknote size={18} />
                  Manual Payment
                </button>
              </div>

              {/* Automatic Payment Options */}
              {paymentType === 'automatic' && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-4">
                    Instant payment via mobile banking or card. Your order will be processed immediately.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {automaticPayments.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedAutomatic(method.id)}
                        className={cn(
                          "p-4 border rounded-lg text-left transition-all flex items-start gap-3",
                          selectedAutomatic === method.id
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className={cn(
                          "p-2 rounded-lg",
                          selectedAutomatic === method.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        )}>
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{method.name}</span>
                            {selectedAutomatic === method.id && (
                              <CheckCircle2 size={16} className="text-primary" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{method.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Manual Payment Options */}
              {paymentType === 'manual' && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-4">
                    Pay later options. Your order will be confirmed after payment is verified.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {manualPayments.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedManual(method.id)}
                        className={cn(
                          "p-4 border rounded-lg text-left transition-all flex items-start gap-3",
                          selectedManual === method.id
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className={cn(
                          "p-2 rounded-lg",
                          selectedManual === method.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        )}>
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{method.name}</span>
                            {selectedManual === method.id && (
                              <CheckCircle2 size={16} className="text-primary" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{method.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Bank Transfer Instructions */}
                  {selectedManual === 'bank_transfer' && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
                      <h4 className="font-medium text-foreground mb-2">Bank Transfer Details</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong>Bank:</strong> ABC Bank Limited</p>
                        <p><strong>Account Name:</strong> ShopVerse Ltd</p>
                        <p><strong>Account Number:</strong> 1234567890123</p>
                        <p><strong>Routing Number:</strong> 123456789</p>
                        <p className="mt-2 text-xs">
                          Please use your order number as payment reference. Your order will be processed once payment is confirmed.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* COD Info */}
                  {selectedManual === 'cod' && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
                      <h4 className="font-medium text-foreground mb-2">Cash on Delivery</h4>
                      <p className="text-sm text-muted-foreground">
                        Pay with cash when your order arrives. An additional ৳50 COD fee applies.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-card p-6 rounded-xl border border-border h-fit sticky top-24">
            <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {cart.map(item => (
                <div key={item.product.id} className="flex gap-3">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-border mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">
                  {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                </span>
              </div>
              {selectedManual === 'cod' && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">COD Fee</span>
                  <span className="text-foreground">{formatPrice(50)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary">
                  {formatPrice(totalAmount + (selectedManual === 'cod' ? 50 : 0))}
                </span>
              </div>
            </div>

            <Button 
              className="w-full mt-6" 
              size="lg"
              onClick={handlePlaceOrder}
              disabled={!selectedAutomatic && !selectedManual}
            >
              {paymentType === 'automatic' ? 'Pay Now' : 'Place Order'}
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              By placing your order, you agree to our{' '}
              <Link to="/terms" className="text-primary hover:underline">Terms</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
