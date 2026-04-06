'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LOCALES, Locale } from '@/i18n/messages';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale, setLocale, t, localeMeta } = useLanguage();
  const compactLocaleLabel: Record<Locale, string> = {
    uz: "O'Z",
    uzCyrl: 'ЎЗ',
    ru: 'RU',
    en: 'EN',
  };

  const navItems = [
    { label: t.navbar.home, href: '/' },
    { label: t.navbar.about, href: '/about' },
    { label: t.navbar.useful, href: '/useful' },
    { label: t.navbar.contact, href: '/contact' },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="py-2.5 md:py-3">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="relative">
                <div className="w-9 h-10 sm:w-10 sm:h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex flex-col items-center justify-center text-white shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 group-hover:scale-105 transition-all duration-300">
                  <span className="text-[5px] opacity-60 tracking-wider">001</span>
                  <span className="text-sm sm:text-base font-black leading-none">Jp</span>
                  <span className="text-[4px] opacity-50">JAP</span>
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-black tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  JAP ACADEMY
                </div>
                <div className="hidden sm:block text-[8px] tracking-[3px] text-stone-400 font-semibold">{t.navbar.brandTagline}</div>
              </div>
            </Link>

            <div
              className="hidden md:flex items-center gap-0.5 rounded-full p-1"
              style={{
                background: 'rgba(255,255,255,0.35)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.45)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.4) inset, 0 2px 8px rgba(0,0,0,0.03)',
              }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                    pathname === item.href ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30' : 'text-stone-600 hover:text-orange-600 hover:bg-white/50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <div
                className="relative"
                style={{
                  background: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.7)',
                  borderRadius: '9999px',
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#78716c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ position: 'absolute', left: 10, top: 9, pointerEvents: 'none' }}
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 0 20" />
                  <path d="M12 2a15.3 15.3 0 0 0 0 20" />
                </svg>
                <select
                  aria-label={t.navbar.language}
                  value={locale}
                  onChange={(event) => setLocale(event.target.value as Locale)}
                  className="h-8 pl-8 pr-7 rounded-full text-[11px] font-bold tracking-wide text-stone-700 bg-transparent border-0 outline-none appearance-none cursor-pointer"
                >
                  {LOCALES.map((item) => (
                    <option key={item} value={item}>
                      {compactLocaleLabel[item]}
                    </option>
                  ))}
                </select>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#78716c"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ position: 'absolute', right: 9, top: 10, pointerEvents: 'none' }}
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>

              <Link href="/contact" className="btn-primary px-6 py-2.5 rounded-full text-white text-xs font-bold">
                {t.navbar.enroll}
              </Link>
            </div>

            <Link href="/contact" className="hidden sm:inline-flex md:hidden btn-primary px-6 py-2.5 rounded-full text-white text-xs font-bold">
              {t.navbar.enroll}
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={t.navbar.menuAria}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-stone-700 hover:text-orange-600 transition-colors"
              style={{ background: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.6)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {isMobileMenuOpen ? (
                  <>
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </>
                ) : (
                  <>
                    <path d="M3 6h18" />
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {isMobileMenuOpen && (
            <div
              className="md:hidden mb-3 p-3 rounded-2xl animate-fade-scale"
              style={{
                background: 'rgba(255,255,255,0.58)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(255,255,255,0.62)',
              }}
            >
              <div className="flex flex-col gap-1.5">
                <div className="px-1 mb-1">
                  <label className="block text-[11px] font-semibold text-stone-500 mb-1.5">{t.navbar.language}</label>
                  <select
                    value={locale}
                    onChange={(event) => setLocale(event.target.value as Locale)}
                    className="w-full h-10 rounded-xl px-3 text-sm font-semibold text-stone-700 bg-white/75 border border-white/80 outline-none focus:border-orange-400"
                  >
                    {LOCALES.map((item) => (
                      <option key={item} value={item}>
                        {localeMeta[item].label}
                      </option>
                    ))}
                  </select>
                </div>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      pathname === item.href
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                        : 'text-stone-700 hover:bg-white/70'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/contact" className="btn-primary mt-1 px-4 py-3 rounded-xl text-white text-sm font-bold text-center">
                  {t.navbar.enroll}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
