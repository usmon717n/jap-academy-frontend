'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import AuthModal from './AuthModal';
import NotificationPanel from './NotificationPanel';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navItems = [
    { label: 'Asosiy', href: '/' },
    { label: 'Testlar', href: '/tests' },
    { label: 'Biz haqimizda', href: '/about' },
    { label: 'Aloqa', href: '/contact' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 glass border-b border-orange-100/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-11 rounded-lg bg-gradient-to-br from-orange-500 to-orange-700 flex flex-col items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow">
                  <span className="text-[5px] opacity-60 tracking-wider">001</span>
                  <span className="text-base font-black leading-none">Jp</span>
                  <span className="text-[4px] opacity-50">JAP</span>
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              </div>
              <div>
                <div className="text-base font-black tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  JAP ACADEMY
                </div>
                <div className="text-[8px] tracking-[3px] text-stone-400 font-semibold">KIMYO O&apos;QUV MARKAZI</div>
              </div>
            </Link>

            {/* Center nav */}
            <div className="hidden md:flex items-center gap-0.5 bg-stone-100/60 rounded-full p-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/25'
                        : 'text-stone-500 hover:text-orange-600 hover:bg-white/80'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              {user && (
                <div className="relative">
                  <button
                    onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      showNotif ? 'bg-orange-50 text-orange-600' : 'text-stone-400 hover:bg-stone-100 hover:text-stone-600'
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
                    </svg>
                    <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-orange-500 border-2 border-[#fefcf9] animate-pulse" />
                  </button>
                  {showNotif && <NotificationPanel onClose={() => setShowNotif(false)} />}
                </div>
              )}

              {/* Profile / Auth */}
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all hover:scale-105 ring-2 ring-white"
                  >
                    {user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}
                  </button>

                  {/* Profile dropdown */}
                  {showProfile && (
                    <div className="absolute top-12 right-0 w-56 bg-white border-2 border-stone-100 rounded-2xl shadow-xl overflow-hidden animate-fade-scale z-50">
                      {/* User info header */}
                      <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
                        <div className="text-sm font-extrabold text-stone-800">{user.firstName} {user.lastName}</div>
                        <div className="text-[11px] text-stone-500 mt-0.5">{user.email}</div>
                      </div>

                      {/* Menu items */}
                      <div className="py-1.5">
                        <Link
                          href="/cabinet"
                          onClick={() => setShowProfile(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                          </svg>
                          Kabinet
                        </Link>

                        {user.role === 'ADMIN' && (
                          <Link
                            href="/admin"
                            onClick={() => setShowProfile(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                            Admin panel
                          </Link>
                        )}

                        <div className="border-t border-stone-100 my-1.5" />

                        <button
                          onClick={() => { logout(); setShowProfile(false); }}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                          </svg>
                          Chiqish
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-2 ml-1">
                  <button
                    onClick={() => setAuthMode('login')}
                    className="text-xs font-bold text-stone-700 px-4 py-2 rounded-full border-2 border-stone-200 hover:border-orange-300 hover:text-orange-600 transition-all"
                  >
                    Kirish
                  </button>
                  <button
                    onClick={() => setAuthMode('register')}
                    className="text-xs font-bold text-white px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-500/25 transition-all"
                  >
                    Ro&apos;yxatdan o&apos;tish
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSwitch={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
        />
      )}
    </>
  );
}
