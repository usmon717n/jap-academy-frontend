'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function UsefulPage() {
  const { t } = useLanguage();

  return (
    <div className="page-enter px-4 py-12 md:py-16 max-w-4xl mx-auto">
      <div className="page-section reveal-1 text-center mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-zinc-50">{t.useful.titleBefore} <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">{t.useful.titleAccent}</span></h1>
      </div>
      <div className="page-section reveal-2 page-stagger grid grid-cols-1 md:grid-cols-2 gap-6">
        {t.useful.videos.map((v, i) => (
          <div key={i} className="rounded-3xl overflow-hidden glass-panel glass-panel-hover p-2 shadow-premium">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-sm">
              <iframe src={v.url} width="100%" height="100%" style={{ border:0 }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
            <div className="p-4 sm:p-5">
              <div className="text-sm sm:text-base font-extrabold text-zinc-100 leading-snug group-hover:text-orange-400 transition-colors">{v.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
