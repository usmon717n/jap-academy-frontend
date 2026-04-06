import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';

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
    <html lang="uz">
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <div className="chem-bg" aria-hidden="true">
            <div className="chem-bg__base" />
            <div className="chem-bg__orb chem-bg__orb--1" />
            <div className="chem-bg__orb chem-bg__orb--2" />
            <div className="chem-bg__orb chem-bg__orb--3" />
            <div className="chem-bg__orb chem-bg__orb--4" />
            <div className="chem-bg__mist" />
          </div>
          <Navbar />
          <main className="flex-1 page-content animate-fade-slide">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
