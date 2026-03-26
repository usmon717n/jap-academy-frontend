import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'JAP Academy — Kimyo test platformasi',
  description: "Kimyo faniga ixtisoslashgan zamonaviy o'quv markaz. Interaktiv testlar, sertifikatlar.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 animate-fade-slide">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
