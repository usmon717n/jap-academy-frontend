'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { LOCALES, Locale } from '@/i18n/messages';
import { useLanguage } from '@/context/LanguageContext';

const LOCALE_SHORT: Record<Locale, string> = {
  uz: "O'Z",
  uzCyrl: 'ЎЗ',
  ru: 'RU',
  en: 'EN',
};

function GlobeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ff6500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

const PHONE_HREF = 'tel:+9989701350110';
const PHONE_DISPLAY = '+998 97 013 50 110';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
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

  /* Compress the capsule after scrolling */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Liquid highlight follows the cursor inside the glass */
  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const onMove = (e: PointerEvent) => {
      const r = shell.getBoundingClientRect();
      shell.style.setProperty('--mx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(2)}%`);
      shell.style.setProperty('--my', `${(((e.clientY - r.top) / r.height) * 100).toFixed(2)}%`);
    };
    shell.addEventListener('pointermove', onMove);
    return () => shell.removeEventListener('pointermove', onMove);
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
    <nav className="sticky top-0 z-50 px-3 sm:px-5 pt-3 navx-enter">
      <div className="max-w-7xl mx-auto">
        {/* ═══ GLASS CAPSULE ═══ */}
        <div
          ref={shellRef}
          className={`navx-shell flex items-center justify-between pl-4 pr-2.5 transition-all duration-500 ${
            isScrolled ? 'h-14 navx-shell--scrolled' : 'h-[64px]'
          }`}
        >
          {/* LOGO */}
          <Link href="/" className="navx-logo flex items-center gap-3 shrink-0">
            <div className="navx-logo-tile">
              <Image src="/logo.png" alt="JAP Academy" width={40} height={40} priority />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-black tracking-tight leading-none">
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">JAP</span>
                <span className="text-slate-900"> ACADEMY</span>
              </span>
              <span className="text-[8px] font-bold tracking-[0.22em] text-slate-500 uppercase leading-none mt-1">
                {t.navbar.brandTagline}
              </span>
            </div>
          </Link>

          {/* CENTER LINKS */}
          <div className="hidden lg:flex items-center gap-1 shrink-0 mx-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`navx-link ${isActive ? 'navx-link--active' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* ACTIONS */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            {/* Language selector — icon only */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setIsLangOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={isLangOpen}
                aria-label={localeMeta[locale].label}
                className={`navx-lang-btn ${isLangOpen ? 'navx-lang-btn--open' : ''}`}
              >
                <GlobeIcon />
                <svg
                  width="9" height="9" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                  className="opacity-60 transition-transform duration-300"
                  style={{ transform: isLangOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Dropdown */}
              <div className={`navx-dropdown ${isLangOpen ? 'navx-dropdown--open' : ''}`} role="listbox">
                {LOCALES.map((item, i) => {
                  const isActive = locale === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onClick={() => { setLocale(item); setIsLangOpen(false); }}
                      className={`navx-lang-item ${isActive ? 'navx-lang-item--active' : ''}`}
                      style={{ '--i': i } as CSSProperties}
                    >
                      <span className={`navx-mono ${isActive ? 'navx-mono--active' : ''}`}>{LOCALE_SHORT[item]}</span>
                      <span className={`text-[13px] font-bold flex-1 text-left ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                        {localeMeta[item].label}
                      </span>
                      {isActive && <CheckIcon />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Phone */}
            <a href={PHONE_HREF} className="navx-phone hidden min-[1340px]:flex">
              <span className="navx-phone-icon"><PhoneIcon /></span>
              <span className="navx-phone-num">{PHONE_DISPLAY}</span>
            </a>

            {/* CTA */}
            <Link href="/contact" className="navx-cta">
              <span>{t.navbar.enroll}</span>
              <span className="navx-cta-arrow">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={t.navbar.menuAria}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            className="lg:hidden navx-burger"
          >
            <div className="relative w-[18px] h-[14px]">
              <span className={`absolute left-0 w-full h-[2px] bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'top-[6px] rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-[6px] w-full h-[2px] bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 w-full h-[2px] bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'top-[6px] -rotate-45' : 'top-[12px]'}`} />
            </div>
          </button>
        </div>

        {/* ═══ MOBILE GLASS SHEET ═══ */}
        {isMobileMenuOpen && (
          <div id="mobile-nav-menu" className="lg:hidden navx-sheet">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`navx-sheet-link ${isActive ? 'navx-sheet-link--active' : ''}`}
                  >
                    {item.label}
                    <span className="navx-sheet-dot" />
                  </Link>
                );
              })}
            </div>

            {/* Language + CTA — already in the bar from md up */}
            <div className="md:hidden">
              <div className="my-3.5 h-px bg-slate-900/8" />

              <div className="grid grid-cols-2 gap-2">
                {LOCALES.map((item) => {
                  const isActive = locale === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setLocale(item)}
                      className={`navx-lang-chip ${isActive ? 'navx-lang-chip--active' : ''}`}
                    >
                      <span className={`navx-mono ${isActive ? 'navx-mono--active' : ''}`}>{LOCALE_SHORT[item]}</span>
                      <span className={`text-[12px] font-bold flex-1 text-left ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                        {localeMeta[item].label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <a href={PHONE_HREF} className="navx-phone flex justify-center mt-3">
                <span className="navx-phone-icon"><PhoneIcon /></span>
                <span className="navx-phone-num">{PHONE_DISPLAY}</span>
              </a>

              <Link href="/contact" className="navx-cta w-full justify-center mt-3 !py-3">
                <span>{t.navbar.enroll}</span>
                <span className="navx-cta-arrow">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
