import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'JAP Academy — Kimyo o\'quv markazi',
  description: "Kimyo faniga ixtisoslashgan zamonaviy o'quv markaz.",
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <noscript>
          <style>{`.page-section,.page-stagger>*,.lang-lane,[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <LanguageProvider>
          <ScrollReveal />
          <div className="chem-bg" aria-hidden="true" />
          <Navbar />
          <main className="flex-1 page-content">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
