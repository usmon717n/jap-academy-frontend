import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
        <div className="video-bg" aria-hidden="true">
          <video
            className="video-bg__media"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="video-bg__overlay" />
        </div>
        <Navbar />
        <main className="flex-1 page-content animate-fade-slide">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
