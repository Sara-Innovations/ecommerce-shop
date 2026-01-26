import { MainLayout } from '@/components/layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'How do I track my order?', a: 'You can track your order from your dashboard under "My Orders" section.' },
  { q: 'What payment methods do you accept?', a: 'We accept bKash, Nagad, Rocket, and SSLCommerz.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day return policy for most items in original condition.' },
  { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days within Bangladesh.' },
  { q: 'Do you offer international shipping?', a: 'Currently we only ship within Bangladesh.' },
];

export default function FAQ() {
  return (
    <MainLayout>
      <div className="bg-surface py-12"><div className="container mx-auto px-4 text-center"><h1 className="text-4xl font-display font-bold">FAQs</h1></div></div>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-card rounded-xl border px-6">
              <AccordionTrigger className="text-left font-medium">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </MainLayout>
  );
}
