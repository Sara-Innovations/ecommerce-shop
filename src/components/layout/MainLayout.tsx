import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { MenuBar } from './MenuBar';
import { Footer } from './Footer';
import { MobileNav } from './MobileNav';
import { LiveChatWidget } from '@/components/chat/LiveChatWidget';
import { CompareBar } from '@/components/compare/CompareBar';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <MenuBar />
      <main className="flex-1 pb-16 lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileNav />
      <CompareBar />
      <LiveChatWidget />
    </div>
  );
}
