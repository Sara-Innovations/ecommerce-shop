import { useState } from 'react';
import { Package, Eye, ChevronDown, ChevronUp, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/data/products';
import { cn } from '@/lib/utils';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-20',
    status: 'delivered',
    total: 168998,
    items: [
      { name: 'iPhone 15 Pro Max', quantity: 1, price: 149999, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200' },
      { name: 'Nike Air Jordan 1', quantity: 1, price: 18999, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200' },
    ],
    shippingAddress: '123 Main Street, Dhaka 1205',
    paymentMethod: 'bKash',
    trackingNumber: 'TRK123456789',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-25',
    status: 'shipped',
    total: 34999,
    items: [
      { name: 'Sony WH-1000XM5', quantity: 1, price: 34999, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200' },
    ],
    shippingAddress: '456 Oak Avenue, Chittagong 4000',
    paymentMethod: 'Card',
    trackingNumber: 'TRK987654321',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-01-27',
    status: 'processing',
    total: 2499,
    items: [
      { name: 'Premium Cotton T-Shirt', quantity: 1, price: 2499, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200' },
    ],
    shippingAddress: '789 Pine Road, Sylhet 3100',
    paymentMethod: 'COD',
  },
];

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: 'Pending', color: 'bg-warning/10 text-warning', icon: Clock },
  processing: { label: 'Processing', color: 'bg-primary/10 text-primary', icon: Package },
  shipped: { label: 'Shipped', color: 'bg-blue-500/10 text-blue-500', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-success/10 text-success', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-destructive/10 text-destructive', icon: XCircle },
};

export default function Orders() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">My Orders</h2>

      {mockOrders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto text-muted-foreground mb-4" size={48} />
          <p className="text-muted-foreground">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockOrders.map((order) => {
            const status = statusConfig[order.status];
            const StatusIcon = status.icon;
            const isExpanded = expandedOrder === order.id;

            return (
              <div
                key={order.id}
                className="border border-border rounded-xl overflow-hidden"
              >
                {/* Order Header */}
                <div
                  className="p-4 bg-surface cursor-pointer hover:bg-surface-hover transition-colors"
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img
                          src={order.items[0].image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge className={cn('gap-1', status.color)}>
                        <StatusIcon size={14} />
                        {status.label}
                      </Badge>
                      <span className="font-bold text-foreground">
                        {formatPrice(order.total)}
                      </span>
                      {isExpanded ? (
                        <ChevronUp size={20} className="text-muted-foreground" />
                      ) : (
                        <ChevronDown size={20} className="text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                {isExpanded && (
                  <div className="p-4 border-t border-border animate-fade-in">
                    {/* Items */}
                    <div className="mb-4">
                      <h4 className="font-medium text-foreground mb-3">Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-2 bg-surface rounded-lg"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <span className="font-medium text-foreground">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Info Grid */}
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Shipping Address</p>
                        <p className="font-medium text-foreground">{order.shippingAddress}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Payment Method</p>
                        <p className="font-medium text-foreground">{order.paymentMethod}</p>
                      </div>
                      {order.trackingNumber && (
                        <div>
                          <p className="text-muted-foreground">Tracking Number</p>
                          <p className="font-medium text-primary">{order.trackingNumber}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                      <Button variant="outline" size="sm">
                        <Eye size={16} className="mr-2" />
                        View Details
                      </Button>
                      {order.status === 'delivered' && (
                        <Button variant="outline" size="sm">
                          Leave Review
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
