import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/data/products';
import { CreditCard, Banknote, CheckCircle2, Smartphone, Building2, Tag, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type PaymentType = 'automatic' | 'manual';
type AutomaticMethod = 'bkash' | 'nagad' | 'rocket' | 'sslcommerz';
type ManualMethod = 'cod' | 'bank_transfer';

interface CouponData {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase: number;
}

// Mock available coupons
const availableCoupons: CouponData[] = [
  { code: 'SAVE10', discountType: 'percentage', discountValue: 10, minPurchase: 1000 },
  { code: 'FLAT500', discountType: 'fixed', discountValue: 500, minPurchase: 5000 },
  { code: 'WELCOME20', discountType: 'percentage', discountValue: 20, minPurchase: 2000 },
  { code: 'FREESHIP', discountType: 'fixed', discountValue: 100, minPurchase: 0 },
];

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
  const { cart, cartTotal, clearCart, user } = useStore();
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState<PaymentType>('automatic');
  const [selectedAutomatic, setSelectedAutomatic] = useState<AutomaticMethod | null>(null);
  const [selectedManual, setSelectedManual] = useState<ManualMethod | null>(null);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.firstName ? `${user.firstName} ${user.lastName}` : '',
    phone: user?.phone || '',
    address: '',
    city: '',
    postalCode: '',
  });

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponData | null>(null);
  const [couponError, setCouponError] = useState('');

  const shippingCost = cartTotal > 5000 ? 0 : 100;
  const codFee = selectedManual === 'cod' ? 50 : 0;

  const couponDiscount = appliedCoupon
    ? appliedCoupon.discountType === 'percentage'
      ? Math.round(cartTotal * (appliedCoupon.discountValue / 100))
      : appliedCoupon.discountValue
    : 0;

  const totalAmount = cartTotal + shippingCost + codFee - couponDiscount;

  const handleApplyCoupon = () => {
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (!code) { setCouponError('Please enter a coupon code'); return; }

    const coupon = availableCoupons.find(c => c.code === code);
    if (!coupon) { setCouponError('Invalid coupon code'); return; }
    if (cartTotal < coupon.minPurchase) {
      setCouponError(`Minimum purchase of ${formatPrice(coupon.minPurchase)} required`);
      return;
    }

    setAppliedCoupon(coupon);
    toast.success(`Coupon "${coupon.code}" applied! You save ${coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : formatPrice(coupon.discountValue)}`);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
    toast.success('Coupon removed');
  };

  const handlePlaceOrder = () => {
    const paymentMethod = paymentType === 'automatic' ? selectedAutomatic : selectedManual;
    if (!paymentMethod) { toast.error('Please select a payment method'); return; }
    if (!shippingInfo.fullName || !shippingInfo.address || !shippingInfo.city) { toast.error('Please fill in shipping information'); return; }

    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;
    const orderDetails = {
      orderNumber,
      items: cart.map((item) => ({ name: item.product.name, quantity: item.quantity, price: item.product.price, image: item.product.images[0] })),
      subtotal: cartTotal,
      shipping: shippingCost,
      discount: couponDiscount,
      couponCode: appliedCoupon?.code,
      total: totalAmount,
      paymentMethod: paymentType === 'automatic'
        ? automaticPayments.find((p) => p.id === selectedAutomatic)?.name || ''
        : manualPayments.find((p) => p.id === selectedManual)?.name || '',
      shippingAddress: shippingInfo,
      email: user?.email || 'customer@example.com',
    };

    clearCart();
    navigate('/order-confirmation', { state: { orderDetails } });
  };

  if (cart.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
          <Link to="/shop"><Button>Continue Shopping</Button></Link>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <h3 className="font-semibold text-foreground mb-4">Shipping Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Full Name" value={shippingInfo.fullName} onChange={(e) => setShippingInfo(prev => ({ ...prev, fullName: e.target.value }))} />
                <Input placeholder="Phone Number" value={shippingInfo.phone} onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))} />
                <Input placeholder="Street Address" className="sm:col-span-2" value={shippingInfo.address} onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))} />
                <Input placeholder="City" value={shippingInfo.city} onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))} />
                <Input placeholder="Postal Code" value={shippingInfo.postalCode} onChange={(e) => setShippingInfo(prev => ({ ...prev, postalCode: e.target.value }))} />
              </div>
            </div>

            {/* Coupon Code */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Tag size={18} />
                Coupon Code
              </h3>
              
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-success" />
                    <span className="font-medium text-foreground">{appliedCoupon.code}</span>
                    <span className="text-sm text-muted-foreground">
                      ({appliedCoupon.discountType === 'percentage' ? `${appliedCoupon.discountValue}% off` : `${formatPrice(appliedCoupon.discountValue)} off`})
                    </span>
                  </div>
                  <button onClick={handleRemoveCoupon} className="text-muted-foreground hover:text-destructive transition-colors">
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => { setCouponCode(e.target.value); setCouponError(''); }}
                      className="flex-1"
                    />
                    <Button onClick={handleApplyCoupon} variant="outline">Apply</Button>
                  </div>
                  {couponError && <p className="text-sm text-destructive mt-2">{couponError}</p>}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {availableCoupons.slice(0, 3).map(c => (
                      <button
                        key={c.code}
                        onClick={() => { setCouponCode(c.code); setCouponError(''); }}
                        className="text-xs px-2 py-1 border border-dashed border-primary/50 text-primary rounded hover:bg-primary/5 transition-colors"
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Payment */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <h3 className="font-semibold text-foreground mb-4">Payment Method</h3>
              <div className="flex gap-2 mb-6">
                <button onClick={() => { setPaymentType('automatic'); setSelectedManual(null); }} className={cn("flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2", paymentType === 'automatic' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80")}>
                  <CreditCard size={18} /> Automatic Payment
                </button>
                <button onClick={() => { setPaymentType('manual'); setSelectedAutomatic(null); }} className={cn("flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2", paymentType === 'manual' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80")}>
                  <Banknote size={18} /> Manual Payment
                </button>
              </div>

              {paymentType === 'automatic' && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-4">Instant payment via mobile banking or card.</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {automaticPayments.map((method) => (
                      <button key={method.id} onClick={() => setSelectedAutomatic(method.id)} className={cn("p-4 border rounded-lg text-left transition-all flex items-start gap-3", selectedAutomatic === method.id ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border hover:border-primary/50")}>
                        <div className={cn("p-2 rounded-lg", selectedAutomatic === method.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>{method.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{method.name}</span>
                            {selectedAutomatic === method.id && <CheckCircle2 size={16} className="text-primary" />}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{method.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {paymentType === 'manual' && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-4">Pay later options.</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {manualPayments.map((method) => (
                      <button key={method.id} onClick={() => setSelectedManual(method.id)} className={cn("p-4 border rounded-lg text-left transition-all flex items-start gap-3", selectedManual === method.id ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border hover:border-primary/50")}>
                        <div className={cn("p-2 rounded-lg", selectedManual === method.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>{method.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{method.name}</span>
                            {selectedManual === method.id && <CheckCircle2 size={16} className="text-primary" />}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{method.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedManual === 'bank_transfer' && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
                      <h4 className="font-medium text-foreground mb-2">Bank Transfer Details</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong>Bank:</strong> ABC Bank Limited</p>
                        <p><strong>Account Name:</strong> SaraCodeLabsShop Ltd</p>
                        <p><strong>Account Number:</strong> 1234567890123</p>
                        <p><strong>Routing Number:</strong> 123456789</p>
                      </div>
                    </div>
                  )}

                  {selectedManual === 'cod' && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
                      <h4 className="font-medium text-foreground mb-2">Cash on Delivery</h4>
                      <p className="text-sm text-muted-foreground">An additional ৳50 COD fee applies.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-card p-6 rounded-xl border border-border h-fit sticky top-24">
            <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {cart.map(item => (
                <div key={item.product.id} className="flex gap-3">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium text-foreground">{formatPrice(item.product.price * item.quantity)}</span>
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
                <span className="text-foreground">{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
              </div>
              {codFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">COD Fee</span>
                  <span className="text-foreground">{formatPrice(codFee)}</span>
                </div>
              )}
              {couponDiscount > 0 && (
                <div className="flex justify-between text-sm text-success">
                  <span>Coupon Discount</span>
                  <span>-{formatPrice(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <Button className="w-full mt-6" size="lg" onClick={handlePlaceOrder} disabled={!selectedAutomatic && !selectedManual}>
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
