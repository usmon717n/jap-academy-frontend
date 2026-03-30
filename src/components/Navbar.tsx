'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import AuthModal from './AuthModal';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setShowProfile(false); };
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h);
  }, []);

  const navItems = [
    { label: 'Asosiy', href: '/' },
    { label: 'Biz haqimizda', href: '/about' },
    { label: 'Foydali', href: '/useful' },
    { label: 'Aloqa', href: '/contact' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 liquid-glass">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
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

            <div className="hidden md:flex items-center gap-0.5 rounded-full p-1" style={{
              background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.45)', boxShadow: '0 1px 0 rgba(255,255,255,0.4) inset, 0 2px 8px rgba(0,0,0,0.03)',
            }}>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                    pathname === item.href ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30' : 'text-stone-600 hover:text-orange-600 hover:bg-white/50'
                  }`}>{item.label}</Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {user ? (
                <div className="relative" ref={ref}>
                  <button onClick={() => setShowProfile(!showProfile)}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-110 ring-2 ring-white/60">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </button>
                  {showProfile && (
                    <div className="absolute top-12 right-0 w-56 rounded-2xl shadow-xl overflow-hidden animate-fade-scale z-50" style={{
                      background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.5)',
                    }}>
                      <div className="px-4 py-3 border-b border-orange-100/40" style={{ background: 'rgba(255,247,237,0.5)' }}>
                        <div className="text-sm font-extrabold">{user.firstName} {user.lastName}</div>
                        <div className="text-[11px] text-stone-500">{user.email}</div>
                      </div>
                      <div className="py-1.5">
                        <Link href="/cabinet" onClick={() => setShowProfile(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-orange-50/60 hover:text-orange-600 transition-all">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Kabinet
                        </Link>
                        {user.role === 'ADMIN' && (
                          <Link href="/admin" onClick={() => setShowProfile(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-orange-50/60 hover:text-orange-600 transition-all">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z"/></svg>Admin panel
                          </Link>
                        )}
                        <div className="border-t border-stone-200/50 my-1" />
                        <button onClick={() => { logout(); setShowProfile(false); }} className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50/60 transition-all w-full text-left">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>Chiqish
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={() => setAuthMode('login')} className="btn-glass text-xs font-bold text-stone-700 px-5 py-2.5 rounded-full">Kirish</button>
              )}
            </div>
          </div>
        </div>
      </nav>
      {authMode && <AuthModal mode={authMode} onClose={() => setAuthMode(null)} onSwitch={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} />}
    </>
  );
}
