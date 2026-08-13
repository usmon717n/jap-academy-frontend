'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ChemBackdrop from '@/components/ChemBackdrop';

/* Deterministic bubble field — left %, size, drift, duration, delay */
const BUBBLES = [
  { l: '6%', s: 14, x: '26px', d: '17s', del: '0s' },
  { l: '14%', s: 8, x: '-18px', d: '21s', del: '-6s' },
  { l: '23%', s: 19, x: '32px', d: '15s', del: '-11s' },
  { l: '31%', s: 10, x: '-24px', d: '24s', del: '-3s' },
  { l: '40%', s: 6, x: '16px', d: '19s', del: '-15s' },
  { l: '48%', s: 16, x: '-30px', d: '22s', del: '-8s' },
  { l: '57%', s: 9, x: '22px', d: '18s', del: '-2s' },
  { l: '65%', s: 22, x: '-20px', d: '26s', del: '-13s' },
  { l: '73%', s: 11, x: '28px', d: '16s', del: '-5s' },
  { l: '81%', s: 7, x: '-16px', d: '23s', del: '-18s' },
  { l: '89%', s: 17, x: '24px', d: '20s', del: '-9s' },
  { l: '95%', s: 9, x: '-26px', d: '25s', del: '-4s' },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer-shell relative mt-16 pb-5">
      {/* Glowing seam */}
      <div className="footer-seam" aria-hidden="true" />

      {/* Drifting warm aurora */}
      <div className="footer-aurora footer-aurora--a" aria-hidden="true" />
      <div className="footer-aurora footer-aurora--b" aria-hidden="true" />

      {/* Molecular line art */}
      <ChemBackdrop className="footer-chem" />

      {/* Rising reaction bubbles */}
      <div className="footer-bubbles" aria-hidden="true">
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="footer-bubble"
            style={{
              left: b.l,
              width: b.s,
              height: b.s,
              '--bd': b.d,
              '--bdel': b.del,
              '--bx': b.x,
            } as CSSProperties}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-7 mb-10">

          {/* Logo + socials */}
          <div data-reveal className="flex flex-col items-center sm:items-start">
            <Link href="/" className="flex items-center gap-3 group mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white shadow-lg shadow-orange-500/25">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="12" rx="10" ry="4" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)" />
                  <circle cx="12" cy="12" r="2" fill="white" stroke="none" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-black tracking-tight text-zinc-100">JAP ACADEMY</span>
                <span className="text-[7px] font-bold tracking-[0.2em] text-zinc-600 uppercase leading-none mt-0.5">{t.navbar.brandTagline}</span>
              </div>
            </Link>

            <p className="text-[11px] text-zinc-500 leading-relaxed mb-4 max-w-[220px] text-center sm:text-left font-medium">
              {t.footer.description}
            </p>

            <div className="flex gap-2.5">
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
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg bg-white/4 border border-white/8 hover:border-white/15">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill={s.f}>{s.i}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div data-reveal style={{ '--rd': '120ms' } as CSSProperties} className="flex flex-col items-center sm:items-start">
            <h4 className="footer-heading text-[9px] font-black tracking-[0.28em] text-orange-500 mb-4 uppercase">{t.footer.pagesTitle}</h4>
            <div className="flex flex-col gap-2.5 items-center sm:items-start">
              {[
                { l: t.navbar.home, h: '/' },
                { l: t.navbar.about, h: '/about' },
                { l: t.navbar.useful, h: '/useful' },
                { l: t.navbar.contact, h: '/contact' }
              ].map(x => (
                <Link key={x.h} href={x.h}
                  className="text-[10.5px] font-bold text-zinc-500 hover:text-orange-400 transition-colors uppercase tracking-[0.12em]">
                  {x.l}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div data-reveal style={{ '--rd': '240ms' } as CSSProperties} className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="footer-heading text-[9px] font-black tracking-[0.28em] text-orange-500 mb-4 uppercase">{t.footer.contactTitle}</h4>
            <div className="flex flex-col gap-2.5 text-[11px] font-semibold text-zinc-500">
              <p className="hover:text-zinc-300 transition-colors">{t.contact.phoneNumber}</p>
              <p className="hover:text-zinc-300 transition-colors">info@japacademy.uz</p>
              <p className="max-w-[180px] leading-relaxed">{t.contact.address}</p>
            </div>
          </div>

          {/* Map */}
          <div data-reveal style={{ '--rd': '360ms' } as CSSProperties} className="sm:col-span-2 lg:col-span-1">
            <h4 className="footer-heading text-[9px] font-black tracking-[0.28em] text-orange-500 mb-4 uppercase">{t.footer.mapTitle}</h4>
            <div className="rounded-[1.4rem] overflow-hidden border border-white/8 p-1.5 glass-panel shadow-lg">
              <iframe
                src="https://maps.google.com/maps?q=41.282271,69.210930&z=16&output=embed"
                width="100%" height="132" style={{ border: 0, borderRadius: '1.1rem' }}
                title="JAP Academy location map"
                allowFullScreen loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Footer signature */}
        <div className="pt-5 border-t border-white/6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-center">
          <span className="text-[9px] font-bold text-zinc-600 tracking-[0.15em] uppercase">{t.footer.copyright}</span>

          <div className="flex flex-wrap items-center justify-center gap-3">
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
