import { MainLayout } from '@/components/layout';

export default function Terms() {
  return (
    <MainLayout>
      <div className="bg-surface py-12"><div className="container mx-auto px-4 text-center"><h1 className="text-4xl font-display font-bold">Terms & Conditions</h1></div></div>
      <div className="container mx-auto px-4 py-12 max-w-3xl prose text-muted-foreground">
        <p>Last updated: January 2024</p>
        <h2 className="text-foreground">Acceptance of Terms</h2>
        <p>By using SaraCodeLabsShop, you agree to these terms and conditions.</p>
        <h2 className="text-foreground">Orders and Payments</h2>
        <p>All orders are subject to availability and payment confirmation.</p>
        <h2 className="text-foreground">Shipping</h2>
        <p>Delivery times are estimates and may vary based on location and product availability.</p>
      </div>
    </MainLayout>
  );
}
