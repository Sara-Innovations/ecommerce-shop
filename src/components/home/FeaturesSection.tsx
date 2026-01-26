import { Truck, Shield, CreditCard, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over ৳2,000'
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure transactions'
  },
  {
    icon: CreditCard,
    title: 'Easy Returns',
    description: '30 days return policy'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated support team'
  }
];

export function FeaturesSection() {
  return (
    <section className="bg-surface py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-card hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
