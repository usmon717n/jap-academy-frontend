'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/6 pb-12">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      {/* Molecular hex pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='90' height='90' viewBox='0 0 90 90' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M45 8 L77.97 26.5 L77.97 63.5 L45 82 L12.03 63.5 L12.03 26.5 Z' fill='none' stroke='%23ff6500' stroke-width='1'/%3E%3C/svg%3E")`, backgroundSize: '90px 90px' }} />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

          {/* Logo + socials */}
          <div className="flex flex-col items-center sm:items-start">
            <Link href="/" className="flex items-center gap-4 group mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white shadow-xl shadow-orange-500/25">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="12" rx="10" ry="4" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)" />
                  <circle cx="12" cy="12" r="2" fill="white" stroke="none" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight text-zinc-100">JAP ACADEMY</span>
                <span className="text-[7px] font-bold tracking-[0.2em] text-zinc-600 uppercase leading-none mt-0.5">{t.navbar.brandTagline}</span>
              </div>
            </Link>

            <p className="text-xs text-zinc-500 leading-relaxed mb-8 max-w-[240px] text-center sm:text-left font-medium">
              {t.footer.description}
            </p>

            <div className="flex gap-3">
              {[
                {
                  h: "https://t.me/jap-academy",
                  i: <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.53 8.15l-1.83 8.63c-.14.62-.5.77-.99.48l-2.75-2.03-1.33 1.27c-.14.14-.27.27-.56.27l.2-2.82 5.1-4.62c.22-.2-.05-.31-.34-.12L8.86 13.4l-2.72-.85c-.59-.19-.6-.59.12-.87l10.62-4.1c.5-.18.93.12.65.57z" />,
                  f: "#0088cc"
                },
                {
                  h: "https://instagram.com/jap-academy",
                  i: <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.17-.42-.37-1.06-.42-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.67.67 1.34 1.08 2.12 1.38.77.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.12-1.38.67-.67 1.08-1.34 1.38-2.12.3-.77.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.12C21.32 1.35 20.65.94 19.86.63 19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm7.85-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />,
                  f: "#E1306C"
                },
                {
                  h: "https://youtube.com/@jamshidqayumov2277",
                  i: <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.56 31.56 0 000 12a31.56 31.56 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.87.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.56 31.56 0 0024 12a31.56 31.56 0 00-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />,
                  f: "#FF0000"
                }
              ].map((s, idx) => (
                <a key={idx} href={s.h} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl bg-white/4 border border-white/8 hover:border-white/15">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={s.f}>{s.i}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-[10px] font-black tracking-[0.3em] text-orange-500 mb-8 uppercase">{t.footer.pagesTitle}</h4>
            <div className="flex flex-col gap-4 items-center sm:items-start">
              {[
                { l: t.navbar.home, h: '/' },
                { l: t.navbar.about, h: '/about' },
                { l: t.navbar.useful, h: '/useful' },
                { l: t.navbar.contact, h: '/contact' }
              ].map(x => (
                <Link key={x.h} href={x.h}
                  className="text-[11px] font-bold text-zinc-500 hover:text-orange-400 transition-colors uppercase tracking-widest">
                  {x.l}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-[10px] font-black tracking-[0.3em] text-orange-500 mb-8 uppercase">{t.footer.contactTitle}</h4>
            <div className="flex flex-col gap-4 text-xs font-semibold text-zinc-500">
              <p className="hover:text-zinc-300 transition-colors">{t.contact.phoneNumber}</p>
              <p className="hover:text-zinc-300 transition-colors">info@japacademy.uz</p>
              <p className="max-w-[180px] leading-relaxed">{t.contact.address}</p>
            </div>
          </div>

          {/* Map */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-[10px] font-black tracking-[0.3em] text-orange-500 mb-8 uppercase">{t.footer.mapTitle}</h4>
            <div className="rounded-[2rem] overflow-hidden border border-white/8 p-2 glass-panel shadow-2xl">
              <iframe
                src="https://maps.google.com/maps?q=41.282271,69.210930&z=16&output=embed"
                width="100%" height="180" style={{ border: 0, borderRadius: '1.6rem' }}
                title="JAP Academy location map"
                allowFullScreen loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Footer signature */}
        <div className="pt-10 border-t border-white/6 flex flex-col items-center gap-5 text-center">
          <span className="text-[9px] font-bold text-zinc-600 tracking-[0.15em] uppercase">{t.footer.copyright}</span>

          <div className="w-full flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://t.me/umaraliyew7"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-900/40 transition-all hover:bg-sky-900/40"
            >
              <div className="w-5 h-5 rounded-full bg-sky-500/85 flex items-center justify-center text-white shadow-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.53 8.15l-1.83 8.63c-.14.62-.5.77-.99.48l-2.75-2.03-1.33 1.27c-.14.14-.27.27-.56.27l.2-2.82 5.1-4.62c.22-.2-.05-.31-.34-.12L8.86 13.4l-2.72-.85c-.59-.19-.6-.59.12-.87l10.62-4.1c.5-.18.93.12.65.57z" />
                </svg>
              </div>
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-sky-400/80 group-hover:text-sky-400">{t.footer.developer}</span>
            </a>

            <p className="text-[9px] font-medium text-zinc-700 tracking-[0.15em] uppercase">{t.footer.madeWith}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
