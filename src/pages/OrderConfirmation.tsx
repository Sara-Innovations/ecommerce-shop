import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, Mail, Download, Home } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/data/products';
import { toast } from 'sonner';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface OrderDetails {
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  email: string;
}

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);

  // Get order details from navigation state or redirect if not available
  const orderDetails = location.state?.orderDetails as OrderDetails | undefined;

  useEffect(() => {
    if (!orderDetails) {
      navigate('/');
      return;
    }

    // Simulate email notification
    const timer = setTimeout(() => {
      setEmailSent(true);
      toast.success('Order confirmation email sent!', {
        description: `A confirmation has been sent to ${orderDetails.email}`,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [orderDetails, navigate]);

  if (!orderDetails) {
    return null;
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center animate-bounce-in">
            <CheckCircle className="text-success" size={40} />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        {/* Order Number */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center mb-6">
          <p className="text-sm text-muted-foreground mb-1">Order Number</p>
          <p className="text-2xl font-bold font-mono text-primary">{orderDetails.orderNumber}</p>
        </div>

        {/* Email Status */}
        <div className={`flex items-center gap-3 p-4 rounded-xl mb-6 ${emailSent ? 'bg-success/10' : 'bg-muted'}`}>
          <Mail className={emailSent ? 'text-success' : 'text-muted-foreground'} size={20} />
          <div className="flex-1">
            <p className="font-medium text-foreground">
              {emailSent ? 'Confirmation email sent!' : 'Sending confirmation email...'}
            </p>
            <p className="text-sm text-muted-foreground">{orderDetails.email}</p>
          </div>
          {!emailSent && (
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          )}
        </div>

        {/* Order Timeline */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4">Order Status</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="text-success" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Order Placed</p>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Package className="text-muted-foreground" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-muted-foreground">Processing</p>
                <p className="text-sm text-muted-foreground">Your order is being prepared</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Truck className="text-muted-foreground" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-muted-foreground">Estimated Delivery</p>
                <p className="text-sm text-muted-foreground">
                  {estimatedDelivery.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4">Order Items</h3>
          <div className="space-y-3">
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-surface rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <span className="font-medium text-foreground">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-border mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">{formatPrice(orderDetails.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-foreground">
                {orderDetails.shipping === 0 ? 'Free' : formatPrice(orderDetails.shipping)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
              <span>Total</span>
              <span className="text-primary">{formatPrice(orderDetails.total)}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Info */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-3">Shipping Address</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">{orderDetails.shippingAddress.name}</p>
              <p>{orderDetails.shippingAddress.phone}</p>
              <p>{orderDetails.shippingAddress.address}</p>
              <p>
                {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.postalCode}
              </p>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-3">Payment Method</h3>
            <p className="text-foreground">{orderDetails.paymentMethod}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard/orders">
            <Button variant="outline" className="w-full sm:w-auto">
              <Package size={18} className="mr-2" />
              Track Order
            </Button>
          </Link>
          <Link to="/">
            <Button className="w-full sm:w-auto">
              <Home size={18} className="mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
