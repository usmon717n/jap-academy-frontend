'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Asosiy', href: '/' },
    { label: 'Biz haqimizda', href: '/about' },
    { label: 'Aloqa', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 liquid-glass">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex flex-col items-center justify-center text-white shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 group-hover:scale-105 transition-all duration-300">
                <span className="text-[5px] opacity-60 tracking-wider">001</span>
                <span className="text-base font-black leading-none">Jp</span>
                <span className="text-[4px] opacity-50">JAP</span>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="text-base font-black tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">JAP ACADEMY</div>
              <div className="text-[8px] tracking-[3px] text-stone-400 font-semibold">KIMYO O&apos;QUV MARKAZI</div>
            </div>
          </Link>

          {/* Center nav */}
          <div className="hidden md:flex items-center gap-0.5 rounded-full p-1" style={{
            background: 'rgba(255,255,255,0.35)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.45)',
            boxShadow: '0 1px 0 rgba(255,255,255,0.4) inset, 0 2px 8px rgba(0,0,0,0.03)',
          }}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  pathname === item.href
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                    : 'text-stone-600 hover:text-orange-600 hover:bg-white/50'
                }`}>{item.label}</Link>
            ))}
          </div>

          {/* CTA button */}
          <Link href="/contact" className="btn-primary px-6 py-2.5 rounded-full text-white text-xs font-bold">
            Kursga yozilish
          </Link>
        </div>
      </div>
    </nav>
  );
}
