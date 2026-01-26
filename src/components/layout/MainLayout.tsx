import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { MenuBar } from './MenuBar';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <MenuBar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
