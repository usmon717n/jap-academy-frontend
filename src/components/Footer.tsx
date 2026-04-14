'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative mt-20 overflow-hidden glass-panel !border-t-white/60 !rounded-none pb-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-0.5 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />
      <div className="relative max-w-6xl mx-auto px-4 pt-14 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-10">
          {/* Logo + socials */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-4">
              <div className="w-10 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex flex-col items-center justify-center text-white shadow-lg shadow-orange-500/20">
                <span className="text-[5px] opacity-60">001</span><span className="text-sm font-extrabold">Jp</span>
              </div>
              <div>
                <div className="text-sm font-extrabold text-stone-800">JAP ACADEMY</div>
                <div className="text-[7px] tracking-widest text-stone-400">{t.navbar.brandTagline}</div>
              </div>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed mb-4">{t.footer.description}</p>
            <div className="flex gap-3 justify-center sm:justify-start">
              <a href="https://t.me/japacademy" target="_blank" rel="noopener" className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg" style={{ background: 'rgba(0,136,204,0.1)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0088cc"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.53 8.15l-1.83 8.63c-.14.62-.5.77-.99.48l-2.75-2.03-1.33 1.27c-.14.14-.27.27-.56.27l.2-2.82 5.1-4.62c.22-.2-.05-.31-.34-.12L8.86 13.4l-2.72-.85c-.59-.19-.6-.59.12-.87l10.62-4.1c.5-.18.93.12.65.57z"/></svg>
              </a>
              <a href="https://instagram.com/japacademy" target="_blank" rel="noopener" className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg" style={{ background: 'rgba(225,48,108,0.1)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#E1306C"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.17-.42-.37-1.06-.42-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.67.67 1.34 1.08 2.12 1.38.77.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.12-1.38.67-.67 1.08-1.34 1.38-2.12.3-.77.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.12C21.32 1.35 20.65.94 19.86.63 19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm7.85-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
              </a>
              <a href="https://youtube.com/@japacademy" target="_blank" rel="noopener" className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg" style={{ background: 'rgba(255,0,0,0.1)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.56 31.56 0 000 12a31.56 31.56 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.87.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.56 31.56 0 0024 12a31.56 31.56 0 00-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>
              </a>
            </div>
          </div>

          {/* Pages */}
          <div className="text-center sm:text-left">
            <h4 className="text-[10px] font-bold tracking-[3px] text-orange-600 mb-4">{t.footer.pagesTitle}</h4>
            {[{ l:t.navbar.home,h:'/' },{ l:t.navbar.about,h:'/about' },{ l:t.navbar.useful,h:'/useful' },{ l:t.navbar.contact,h:'/contact' }].map(x=>(
              <Link key={x.h} href={x.h} className="block text-xs text-stone-500 mb-2.5 hover:text-orange-600 transition-colors">{x.l}</Link>
            ))}
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h4 className="text-[10px] font-bold tracking-[3px] text-orange-600 mb-4">{t.footer.contactTitle}</h4>
            <p className="text-xs text-stone-500 mb-2">{t.contact.phoneNumber}</p>
            <p className="text-xs text-stone-500 mb-2">info@japacademy.uz</p>
            <p className="text-xs text-stone-500">{t.contact.address}</p>
          </div>

          {/* Map */}
          <div className="sm:col-span-2 md:col-span-1">
            <h4 className="text-[10px] font-bold tracking-[3px] text-orange-600 mb-4">{t.footer.mapTitle}</h4>
            <div className="rounded-xl overflow-hidden border border-white/40" style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
              <iframe
                src="https://maps.google.com/maps?q=41.282271,69.210930&z=16&output=embed"
                width="100%" height="160" style={{ border: 0 }} allowFullScreen loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-orange-200/30 pt-5 text-center">
          <span className="block text-[10px] text-stone-400 tracking-wider px-2">{t.footer.copyright}</span>
          <div className="mt-4 flex flex-col items-center gap-1.5">
            <a
              href="https://t.me/usmonUmaraliyev"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-sky-600 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#0088cc" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.53 8.15l-1.83 8.63c-.14.62-.5.77-.99.48l-2.75-2.03-1.33 1.27c-.14.14-.27.27-.56.27l.2-2.82 5.1-4.62c.22-.2-.05-.31-.34-.12L8.86 13.4l-2.72-.85c-.59-.19-.6-.59.12-.87l10.62-4.1c.5-.18.93.12.65.57z" />
              </svg>
              <span>{t.footer.developer}</span>
            </a>
            <p className="text-[10px] text-stone-400 tracking-wide">{t.footer.madeWith}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
