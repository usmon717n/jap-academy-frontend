'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LOCALES, Locale } from '@/i18n/messages';
import { useLanguage } from '@/context/LanguageContext';

const LOCALE_FLAG: Record<Locale, string> = {
  uz: '🇺🇿',
  uzCyrl: '🇺🇿',
  ru: '🇷🇺',
  en: '🇬🇧',
};

const LOCALE_SHORT: Record<Locale, string> = {
  uz: "O'Z",
  uzCyrl: 'ЎЗ',
  ru: 'RU',
  en: 'EN',
};

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { locale, setLocale, t, localeMeta } = useLanguage();

  /* Close dropdown on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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
    <nav className="sticky top-0 z-50 liquid-glass border-b border-white/6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 flex items-center justify-center text-white shadow-xl shadow-orange-500/30 group-hover:shadow-orange-500/55 group-hover:-rotate-6 transition-all duration-500">
                {/* Atom icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="12" rx="10" ry="4" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)" />
                  <circle cx="12" cy="12" r="2" fill="white" stroke="none" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-[#f8f6f2] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                JAP ACADEMY
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-zinc-600 uppercase leading-none mt-0.5">
                {t.navbar.brandTagline}
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-1 bg-white/4 p-1.5 rounded-2xl border border-white/8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-6 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-400 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl shadow-md shadow-orange-500/20 z-0" />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* ACTIONS */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language selector — click-based */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(v => !v)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-300 cursor-pointer select-none"
                style={{
                  background: isLangOpen ? 'rgba(255,100,0,0.08)' : 'rgba(255,255,255,0.76)',
                  borderColor: isLangOpen ? 'rgba(255,100,0,0.34)' : 'rgba(148,163,184,0.32)',
                  boxShadow: isLangOpen
                    ? '0 10px 24px rgba(255,100,0,0.14)'
                    : '0 10px 20px rgba(15,23,42,0.08)',
                }}
              >
                <span className="text-lg leading-none">{LOCALE_FLAG[locale]}</span>
                <span className="text-[11px] font-black tracking-widest text-zinc-200">{LOCALE_SHORT[locale]}</span>
                <svg
                  width="10" height="10" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="3"
                  className="text-zinc-500 transition-transform duration-300"
                  style={{ transform: isLangOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Dropdown */}
              <div
                className="absolute top-full right-0 mt-2 w-48 py-1.5 rounded-2xl border border-white/8 shadow-2xl z-50 overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.94)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  opacity: isLangOpen ? 1 : 0,
                  transform: isLangOpen ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.97)',
                  pointerEvents: isLangOpen ? 'auto' : 'none',
                  transition: 'opacity 0.2s ease, transform 0.2s cubic-bezier(0.2,0.8,0.2,1)',
                  transformOrigin: 'top right',
                }}
              >
                {/* Header */}
                <div className="px-4 py-2 border-b border-white/6 mb-1">
                  <span className="text-[9px] font-black tracking-[0.25em] text-zinc-600 uppercase">Til tanlang</span>
                </div>

                {LOCALES.map((item) => {
                  const isActive = locale === item;
                  return (
                    <button
                      key={item}
                      onClick={() => { setLocale(item); setIsLangOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 group"
                      style={{
                        background: isActive ? 'rgba(255,100,0,0.1)' : 'transparent',
                      }}
                      onMouseEnter={e => {
                        if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(148,163,184,0.14)';
                      }}
                      onMouseLeave={e => {
                        if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }}
                    >
                      <span className="text-xl leading-none">{LOCALE_FLAG[item]}</span>
                      <span className={`text-sm font-bold flex-1 text-left ${isActive ? 'text-orange-400' : 'text-zinc-300'}`}>
                        {localeMeta[item].label}
                      </span>
                      {isActive && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff6500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <Link href="/contact" className="btn-primary px-8 py-3 rounded-2xl text-white text-[11px] font-black uppercase tracking-wider">
              {t.navbar.enroll}
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={t.navbar.menuAria}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            className="md:hidden w-11 h-11 rounded-xl flex items-center justify-center text-zinc-400 hover:text-orange-400 glass-panel border-white/8 transition-colors"
          >
            <div className="relative w-6 h-5">
              <span className={`absolute left-0 w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-2 w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
            </div>
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div id="mobile-nav-menu" className="md:hidden pb-8 animate-fade-slide">
            <div className="p-6 rounded-[2rem] glass-panel border-white/8 shadow-premium">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-6 py-4 rounded-2xl text-sm font-bold tracking-wide transition-all ${
                      pathname === item.href
                        ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/25'
                        : 'text-zinc-400 hover:text-orange-500'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="my-4 h-px bg-white/6" />

                <div className="flex flex-col gap-1.5 mb-4 rounded-2xl overflow-hidden border border-white/8" style={{ background: 'rgba(248,250,252,0.72)' }}>
                  {LOCALES.map((item) => {
                    const isActive = locale === item;
                    return (
                      <button
                        key={item}
                        onClick={() => setLocale(item)}
                        className="flex items-center gap-3 px-4 py-3 transition-all duration-200"
                        style={{ background: isActive ? 'rgba(255,100,0,0.1)' : 'transparent' }}
                      >
                        <span className="text-xl leading-none">{LOCALE_FLAG[item]}</span>
                        <span className={`text-sm font-bold flex-1 text-left ${isActive ? 'text-orange-400' : 'text-zinc-400'}`}>
                          {localeMeta[item].label}
                        </span>
                        {isActive && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff6500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>

                <Link href="/contact" className="btn-primary py-5 rounded-2xl text-white text-xs font-black uppercase tracking-widest text-center shadow-lg">
                  {t.navbar.enroll}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
