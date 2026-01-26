import { MainLayout } from '@/components/layout';

export default function Privacy() {
  return (
    <MainLayout>
      <div className="bg-surface py-12"><div className="container mx-auto px-4 text-center"><h1 className="text-4xl font-display font-bold">Privacy Policy</h1></div></div>
      <div className="container mx-auto px-4 py-12 max-w-3xl prose text-muted-foreground">
        <p>Last updated: January 2024</p>
        <h2 className="text-foreground">Information We Collect</h2>
        <p>We collect information you provide directly, including name, email, shipping address, and payment details.</p>
        <h2 className="text-foreground">How We Use Your Information</h2>
        <p>We use your information to process orders, improve our services, and communicate with you.</p>
        <h2 className="text-foreground">Data Security</h2>
        <p>We implement industry-standard security measures to protect your personal information.</p>
      </div>
    </MainLayout>
  );
}
