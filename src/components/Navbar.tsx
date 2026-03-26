'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import AuthModal from './AuthModal';
import NotificationPanel from './NotificationPanel';

// Chemistry SVG icons
const FlaskIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6M10 3v7.4L4.2 19.2A1.5 1.5 0 005.4 21h13.2a1.5 1.5 0 001.2-1.8L14 10.4V3"/><path d="M8.5 14h7"/>
  </svg>
);

const AtomIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.5"/><ellipse cx="12" cy="12" rx="9" ry="4"/>
    <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-60 12 12)"/>
  </svg>
);

const MoleculeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="7" r="2.5"/><circle cx="12" cy="17" r="2.5"/>
    <line x1="9" y1="8.5" x2="10.5" y2="15"/><line x1="15" y1="8.5" x2="13.5" y2="15"/><line x1="9.5" y1="7" x2="14.5" y2="7"/>
  </svg>
);

const TestTubeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M15 2l-6.5 13a4.5 4.5 0 107.5 0L9.5 2"/><path d="M8.5 2h7"/>
  </svg>
);

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);
  const [showNotif, setShowNotif] = useState(false);

  const navItems = [
    { label: 'Asosiy', href: '/', icon: <AtomIcon /> },
    { label: 'Testlar', href: '/tests', icon: <TestTubeIcon /> },
    { label: 'Biz haqimizda', href: '/about', icon: <MoleculeIcon /> },
    { label: 'Aloqa', href: '/contact', icon: <FlaskIcon /> },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 glass border-b border-orange-100/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo — Element card style */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-11 rounded-lg bg-gradient-to-br from-orange-500 to-orange-700 flex flex-col items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow">
                  <span className="text-[5px] opacity-60 tracking-wider">001</span>
                  <span className="text-base font-black leading-none">Jp</span>
                  <span className="text-[4px] opacity-50">JAP</span>
                </div>
                {/* Tiny orbiting dot */}
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
            <div className="flex items-center gap-0.5 bg-stone-100/60 rounded-full p-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/25'
                        : 'text-stone-500 hover:text-orange-600 hover:bg-white/80'
                    }`}
                  >
                    <span className={isActive ? 'text-white/80' : 'text-stone-400'}>{item.icon}</span>
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
                    onClick={() => setShowNotif(!showNotif)}
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

              {/* Auth */}
              {user ? (
                <div className="flex items-center gap-2 ml-1">
                  <div className="flex items-center gap-2 bg-stone-100/70 rounded-full pl-1 pr-3 py-1">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-[11px] font-bold shadow-sm">
                      {user.firstName.charAt(0)}
                    </div>
                    <span className="text-xs font-semibold text-stone-700 hidden sm:inline">{user.firstName}</span>
                  </div>
                  {user.role === 'ADMIN' && (
                    <Link href="/admin" className="text-[10px] px-2.5 py-1 rounded-full bg-stone-900 text-white font-bold hover:bg-stone-800 transition-colors">
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="text-[11px] text-stone-400 hover:text-stone-600 px-2 py-1 rounded-full hover:bg-stone-100 transition-all"
                  >
                    Chiqish
                  </button>
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
                    className="text-xs font-bold text-white px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
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
