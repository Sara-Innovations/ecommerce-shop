import { MainLayout } from '@/components/layout';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
  return (
    <MainLayout>
      <div className="bg-surface py-12"><div className="container mx-auto px-4 text-center"><h1 className="text-4xl font-display font-bold text-foreground">Contact Us</h1><p className="text-muted-foreground mt-2">We'd love to hear from you</p></div></div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex gap-4"><div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><Phone className="text-primary" size={20} /></div><div><h3 className="font-medium">Phone</h3><p className="text-muted-foreground">+880 1234-567890</p></div></div>
              <div className="flex gap-4"><div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><Mail className="text-primary" size={20} /></div><div><h3 className="font-medium">Email</h3><p className="text-muted-foreground">support@shopverse.com</p></div></div>
              <div className="flex gap-4"><div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><MapPin className="text-primary" size={20} /></div><div><h3 className="font-medium">Address</h3><p className="text-muted-foreground">123 Shopping Street, Dhaka 1205</p></div></div>
              <div className="flex gap-4"><div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><Clock className="text-primary" size={20} /></div><div><h3 className="font-medium">Hours</h3><p className="text-muted-foreground">Mon-Sat: 9AM - 9PM</p></div></div>
            </div>
          </div>
          <div className="bg-card p-8 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4"><Input placeholder="Your Name" /><Input type="email" placeholder="Your Email" /></div>
              <Input placeholder="Subject" />
              <Textarea placeholder="Your Message" rows={5} />
              <Button className="w-full gap-2"><Send size={18} />Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
