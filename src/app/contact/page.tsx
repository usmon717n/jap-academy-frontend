'use client';

import ContactForm from '@/components/ContactForm';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="page-enter px-4 py-12 md:py-16 max-w-6xl mx-auto">

      <div className="page-section reveal-1 text-center mb-14">
        <div className="inline-flex text-orange-400 text-[11px] font-bold tracking-widest px-5 py-2 rounded-full mb-5 border border-orange-500/20 bg-orange-500/8">
          {t.contact.badge}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-50">
          {t.contact.titleBefore}{' '}
          <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
            {t.contact.titleAccent}
          </span>
        </h1>
        <p className="text-sm text-zinc-400 mt-4">{t.contact.subtitle}</p>
      </div>

      <div className="page-section reveal-2 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">

        {/* Form */}
        <div className="p-6 sm:p-10 rounded-3xl h-fit glass-panel shadow-premium relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
          <h2 className="text-xl font-black mb-2 tracking-tight text-zinc-100">{t.contact.formTitle}</h2>
          <p className="text-sm text-zinc-500 mb-8">{t.contact.formSubtitle}</p>
          <ContactForm />
        </div>

        {/* Contact Info */}
        <div className="p-6 sm:p-10 rounded-3xl glass-panel shadow-premium relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/25 to-transparent" />

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-orange-500/25">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <h2 className="text-lg font-black mb-1 text-zinc-100">{t.contact.callTitle}</h2>
            <p className="text-sm text-zinc-500">{t.contact.callSubtitle}</p>
          </div>

          <div className="page-stagger space-y-4">
            <a href="tel:+9989701350110"
              className="flex items-center gap-5 p-5 rounded-2xl glass-panel glass-panel-hover transition-all group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-orange-500/8 border border-orange-500/15">📞</div>
              <div className="min-w-0">
                <div className="text-base font-black text-zinc-100 group-hover:text-orange-400 transition-colors">{t.contact.phoneNumber}</div>
                <div className="text-xs text-zinc-500">{t.contact.phoneHours}</div>
              </div>
            </a>

            <a href="https://t.me/jap-academy" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-5 p-5 rounded-2xl glass-panel glass-panel-hover transition-all group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-sky-950/60 border border-sky-900/30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0088cc">
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.53 8.15l-1.83 8.63c-.14.62-.5.77-.99.48l-2.75-2.03-1.33 1.27c-.14.14-.27.27-.56.27l.2-2.82 5.1-4.62c.22-.2-.05-.31-.34-.12L8.86 13.4l-2.72-.85c-.59-.19-.6-.59.12-.87l10.62-4.1c.5-.18.93.12.65.57z" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-base font-black text-zinc-100 group-hover:text-sky-400 transition-colors">{t.contact.telegramLabel}</div>
                <div className="text-xs text-zinc-500">{t.contact.telegramHandle}</div>
              </div>
            </a>

            <a href="https://instagram.com/jap-academy" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-5 p-5 rounded-2xl glass-panel glass-panel-hover transition-all group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-pink-950/60 border border-pink-900/30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#E1306C">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.17-.42-.37-1.06-.42-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.67.67 1.34 1.08 2.12 1.38.77.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.12-1.38.67-.67 1.08-1.34 1.38-2.12.3-.77.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.12C21.32 1.35 20.65.94 19.86.63 19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm7.85-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-base font-black text-zinc-100 group-hover:text-pink-400 transition-colors">{t.contact.instagramLabel}</div>
                <div className="text-xs text-zinc-500">{t.contact.instagramHandle}</div>
              </div>
            </a>

            <div className="flex items-center gap-5 p-5 rounded-2xl glass-panel">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-orange-500/8 border border-orange-500/15">📍</div>
              <div>
                <div className="text-base font-black text-zinc-100">{t.contact.addressLabel}</div>
                <div className="text-xs text-zinc-500">{t.contact.address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
