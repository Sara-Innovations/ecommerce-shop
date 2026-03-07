import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import googlePlayBadge from '@/assets/google-play-badge.png';
import appStoreBadge from '@/assets/app-store-badge.png';
import paymentBkash from '@/assets/payment-bkash.png';
import paymentNagad from '@/assets/payment-nagad.png';
import paymentRocket from '@/assets/payment-rocket.png';
import paymentVisa from '@/assets/payment-visa.png';
import paymentMastercard from '@/assets/payment-mastercard.png';
import paymentAmex from '@/assets/payment-amex.png';
import paymentSsl from '@/assets/payment-ssl.png';
import paymentUpay from '@/assets/payment-upay.png';
import paymentCod from '@/assets/payment-cod.png';

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Newsletter Section */}
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-display font-bold text-primary-foreground">Subscribe to our Newsletter</h3>
              <p className="text-primary-foreground/80 mt-1">Get exclusive offers and updates delivered to your inbox</p>
            </div>
            <form className="flex w-full md:w-auto gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full md:w-80 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary" className="shrink-0">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* About */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold mb-6">
                <img 
                  src="/logo2.png" 
                  alt="SaraCodeLabsShop" 
                  className="w-10 h-10 rounded-lg"
                />
                <span>SaraCodeLabsShop</span>
              </Link>
              <p className="text-primary-foreground/70 mb-6">
                Your one-stop destination for quality products at competitive prices. Shop with confidence.
              </p>
              <div className="flex gap-4 mb-6">
                <SocialLink href="#" icon={<Facebook size={20} />} />
                <SocialLink href="#" icon={<Instagram size={20} />} />
                <SocialLink href="#" icon={<Twitter size={20} />} />
                <SocialLink href="#" icon={<Youtube size={20} />} />
              </div>

              {/* App Download */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Download Our App</h4>
                <div className="flex gap-3">
                  <a href="#" className="block w-28 hover:opacity-80 transition-opacity">
                    <img src={googlePlayBadge} alt="Get it on Google Play" className="w-full h-auto rounded-lg" />
                  </a>
                  <a href="#" className="block w-28 hover:opacity-80 transition-opacity">
                    <img src={appStoreBadge} alt="Download on App Store" className="w-full h-auto rounded-lg" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links & Customer Service - Mobile Side by Side */}
            <div className="lg:hidden flex justify-between gap-8">
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  <FooterLink to="/shop">Shop All</FooterLink>
                  <FooterLink to="/shop?filter=new">New Arrivals</FooterLink>
                  <FooterLink to="/shop?filter=sale">Offers & Deals</FooterLink>
                  <FooterLink to="/brands">Brands</FooterLink>
                  <FooterLink to="/contact">Contact Us</FooterLink>
                </ul>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-6">Customer Service</h4>
                <ul className="space-y-3">
                  <FooterLink to="/faq">FAQs</FooterLink>
                  <FooterLink to="/replacement-policy">Replacement Policy</FooterLink>
                  <FooterLink to="/terms">Terms & Conditions</FooterLink>
                  <FooterLink to="/privacy">Privacy Policy</FooterLink>
                  <FooterLink to="/cookies">Cookies Policy</FooterLink>
                </ul>
              </div>
            </div>

            {/* Quick Links - Desktop */}
            <div className="hidden lg:block">
              <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <FooterLink to="/shop">Shop All</FooterLink>
                <FooterLink to="/shop?filter=new">New Arrivals</FooterLink>
                <FooterLink to="/shop?filter=sale">Offers & Deals</FooterLink>
                <FooterLink to="/brands">Brands</FooterLink>
                <FooterLink to="/contact">Contact Us</FooterLink>
              </ul>
            </div>

            {/* Customer Service - Desktop */}
            <div className="hidden lg:block">
              <h4 className="font-semibold text-lg mb-6">Customer Service</h4>
              <ul className="space-y-3">
                <FooterLink to="/faq">FAQs</FooterLink>
                <FooterLink to="/replacement-policy">Replacement Policy</FooterLink>
                <FooterLink to="/terms">Terms & Conditions</FooterLink>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
                <FooterLink to="/cookies">Cookies Policy</FooterLink>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-primary-foreground/70">
                  <MapPin size={20} className="shrink-0 mt-1" />
                  <span>123 Shopping Street, Dhaka 1205, Bangladesh</span>
                </li>
                <li className="flex items-center gap-3 text-primary-foreground/70">
                  <Phone size={20} className="shrink-0" />
                  <span>+880 1234-567890</span>
                </li>
                <li className="flex items-center gap-3 text-primary-foreground/70">
                  <Mail size={20} className="shrink-0" />
                  <span>info@saracodelabs.com.bd</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods & Copyright */}
      <div className="border-t border-primary-foreground/10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} <a href="https://saracodelabs.com.bd">Sara Code Labs</a> . All rights reserved.
            </p>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-sm text-primary-foreground/60">We Accept:</span>
              <div className="flex items-center gap-2">
                <PaymentLogo src={paymentAmex} alt="American Express" />
                <PaymentLogo src={paymentMastercard} alt="Mastercard" />
                <PaymentLogo src={paymentVisa} alt="Visa" />
                <PaymentLogo src={paymentNagad} alt="Nagad" />
                <PaymentLogo src={paymentBkash} alt="bKash" />
                <PaymentLogo src={paymentUpay} alt="Upay" />
                <PaymentLogo src={paymentRocket} alt="Rocket" />
                <PaymentLogo src={paymentCod} alt="Cash on Delivery" />
                <PaymentLogo src={paymentSsl} alt="SSLCommerz" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      {icon}
    </a>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

function PaymentLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-10 h-7 bg-primary-foreground/10 rounded flex items-center justify-center p-1">
      <img src={src} alt={alt} className="max-w-full max-h-full object-contain" />
    </div>
  );
}
