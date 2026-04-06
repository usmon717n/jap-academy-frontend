import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="px-4 py-12 md:py-16 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex text-orange-600 text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full mb-4" style={{ background:'rgba(255,237,213,0.6)',border:'1px solid rgba(234,88,12,0.1)' }}>ALOQA</div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">Kursga <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">yozilish</span></h1>
        <p className="text-sm text-stone-500 mt-3">Biz bilan bog&apos;laning</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div className="p-5 sm:p-8 rounded-2xl h-fit" style={{background:'rgba(255,255,255,0.55)',backdropFilter:'blur(16px)',border:'1px solid rgba(255,255,255,0.6)',boxShadow:'0 4px 20px rgba(0,0,0,0.04)'}}>
          <h2 className="text-lg font-extrabold mb-2">Ariza qoldiring</h2>
          <p className="text-sm text-stone-500 mb-6">Ma&apos;lumotlaringiz Telegram botimizga yuboriladi.</p>
          <ContactForm />
        </div>

        <div className="p-5 sm:p-8 rounded-2xl" style={{background:'rgba(255,255,255,0.55)',backdropFilter:'blur(16px)',border:'1px solid rgba(255,255,255,0.6)',boxShadow:'0 4px 20px rgba(0,0,0,0.04)'}}>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            </div>
            <h2 className="text-lg font-extrabold mb-1">Qo&apos;ng&apos;iroq qiling</h2>
            <p className="text-sm text-stone-500">Yoki bizning ijtimoiy tarmoqlarga yozing</p>
          </div>

          <div className="space-y-4">
            <a href="tel:+998901234567" className="flex items-center gap-4 p-4 rounded-xl hover:bg-orange-50/50 transition-all group" style={{ border:'1px solid rgba(0,0,0,0.04)' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg" style={{ background:'rgba(234,88,12,0.1)' }}>📞</div>
              <div className="min-w-0">
                <div className="text-sm font-extrabold group-hover:text-orange-600 transition-colors">+998 90 123 45 67</div>
                <div className="text-[10px] text-stone-400">Har kuni 9:00 — 18:00</div>
              </div>
            </a>
            <a href="https://t.me/japacademy" target="_blank" className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50/50 transition-all group" style={{ border:'1px solid rgba(0,0,0,0.04)' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background:'rgba(0,136,204,0.1)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#0088cc"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.53 8.15l-1.83 8.63c-.14.62-.5.77-.99.48l-2.75-2.03-1.33 1.27c-.14.14-.27.27-.56.27l.2-2.82 5.1-4.62c.22-.2-.05-.31-.34-.12L8.86 13.4l-2.72-.85c-.59-.19-.6-.59.12-.87l10.62-4.1c.5-.18.93.12.65.57z"/></svg>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-extrabold group-hover:text-blue-600 transition-colors">Telegram</div>
                <div className="text-[10px] text-stone-400">@japacademy</div>
              </div>
            </a>
            <a href="https://instagram.com/japacademy" target="_blank" className="flex items-center gap-4 p-4 rounded-xl hover:bg-pink-50/50 transition-all group" style={{ border:'1px solid rgba(0,0,0,0.04)' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background:'rgba(225,48,108,0.1)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#E1306C"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.17-.42-.37-1.06-.42-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.67.67 1.34 1.08 2.12 1.38.77.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.12-1.38.67-.67 1.08-1.34 1.38-2.12.3-.77.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.12C21.32 1.35 20.65.94 19.86.63 19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm7.85-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-extrabold group-hover:text-pink-600 transition-colors">Instagram</div>
                <div className="text-[10px] text-stone-400">@japacademy</div>
              </div>
            </a>
            <div className="flex items-center gap-4 p-4 rounded-xl" style={{ border:'1px solid rgba(0,0,0,0.04)' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg" style={{ background:'rgba(234,88,12,0.1)' }}>📍</div>
              <div>
                <div className="text-sm font-extrabold">Manzil</div>
                <div className="text-[10px] text-stone-400">Toshkent, Chilonzor tumani</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
