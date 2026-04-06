'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function UsefulPage() {
  const { t } = useLanguage();

  return (
    <div className="px-4 py-12 md:py-16 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">{t.useful.titleBefore} <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">{t.useful.titleAccent}</span></h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {t.useful.videos.map((v, i) => (
          <div key={i} className="rounded-2xl overflow-hidden" style={{background:'rgba(255,255,255,0.55)',backdropFilter:'blur(16px)',border:'1px solid rgba(255,255,255,0.6)',boxShadow:'0 4px 20px rgba(0,0,0,0.04)'}}>
            <div className="aspect-video">
              <iframe src={v.url} width="100%" height="100%" style={{ border:0 }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
            <div className="p-4 sm:p-5">
              <div className="text-sm sm:text-base font-extrabold text-stone-800 leading-snug">{v.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
