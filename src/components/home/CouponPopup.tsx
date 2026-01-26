import { useState, useEffect } from 'react';
import { X, Copy, Check, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/context/StoreContext';
import { toast } from 'sonner';

export function CouponPopup() {
  const { isCouponPopupShown, setCouponPopupShown } = useStore();
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const couponCode = 'WELCOME15';
  const discount = '15% OFF';

  useEffect(() => {
    // Show popup after 3 seconds if not already shown this session
    if (!isCouponPopupShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isCouponPopupShown]);

  const handleClose = () => {
    setIsVisible(false);
    setCouponPopupShown(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      toast.success('Coupon code copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10"
        >
          <X size={18} />
        </button>

        {/* Header Banner */}
        <div className="bg-gradient-primary p-8 text-center text-primary-foreground">
          <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift size={32} />
          </div>
          <h2 className="text-3xl font-display font-bold mb-2">
            Welcome Gift!
          </h2>
          <p className="text-primary-foreground/90">
            We have a special offer just for you
          </p>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <p className="text-muted-foreground mb-4">
            Get an exclusive discount on your first order
          </p>

          <div className="text-4xl font-display font-bold text-accent mb-6">
            {discount}
          </div>

          {/* Coupon Code Box */}
          <div className="bg-surface rounded-xl p-4 flex items-center justify-between mb-6">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Coupon Code</p>
              <p className="text-xl font-mono font-bold text-foreground tracking-wider">
                {couponCode}
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              className="gap-2"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Valid on orders above ৳1,000. Use at checkout.
          </p>

          <Button
            onClick={handleClose}
            className="w-full mt-6 bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            Start Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
