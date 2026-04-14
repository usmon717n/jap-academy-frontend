'use client';

import { useLanguage } from '@/context/LanguageContext';

const results = [
  { image: 'https://placehold.co/600x400/ea580c/white?text=Natija+1', alt: 'Natija 1' },
  { image: 'https://placehold.co/600x400/f97316/white?text=Natija+2', alt: 'Natija 2' },
  { image: 'https://placehold.co/600x400/fb923c/white?text=Natija+3', alt: 'Natija 3' },
  { image: 'https://placehold.co/600x400/fdba74/white?text=Natija+4', alt: 'Natija 4' },
];

const studentImages = [
  'https://placehold.co/200x200/ea580c/white?text=AK',
  'https://placehold.co/200x200/f97316/white?text=JT',
  'https://placehold.co/200x200/fb923c/white?text=MR',
  'https://placehold.co/200x200/fdba74/white?text=BA',
  'https://placehold.co/200x200/c2410c/white?text=NS',
];

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="page-enter px-4 py-12 md:py-16 max-w-6xl mx-auto">
      <div className="page-section reveal-1 text-center mb-12">
        <div className="inline-flex text-orange-600 text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full mb-4" style={{ background:'rgba(255,237,213,0.6)',border:'1px solid rgba(234,88,12,0.1)' }}>{t.about.badge}</div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">{t.about.titleMain} <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">{t.about.titleAccent}</span></h1>
        <p className="text-sm text-stone-500 mt-3 max-w-lg mx-auto">{t.about.subtitle}</p>
      </div>

      {/* Results — auto-scrolling slider */}
      <div className="page-section reveal-2 mb-16">
        <h2 className="text-lg font-extrabold mb-6 text-center">{t.about.resultsTitle}</h2>
        <div className="relative overflow-hidden rounded-3xl glass-panel shadow-premium">
          <div className="flex gap-5 py-6 px-4 animate-scroll-left">
            {[...results,...results,...results].map((r, i) => (
              <div key={i} className="flex-shrink-0 w-56 h-36 sm:w-64 sm:h-44 md:w-72 md:h-48 rounded-2xl overflow-hidden shadow-premium">
                <img src={r.image} alt={r.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student cards — 5 in a row */}
      <div className="page-section reveal-3 mb-16">
        <h2 className="text-lg font-extrabold mb-6 text-center">{t.about.bestStudentsTitle}</h2>
        <div className="page-stagger grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {t.about.students.map((s, i) => (
            <div key={i} className="p-6 rounded-3xl text-center group glass-panel glass-panel-hover">
              <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden ring-3 ring-orange-200/50 group-hover:ring-orange-400/50 transition-all duration-300">
                <img src={studentImages[i]} alt={s.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-xs font-extrabold text-stone-800 mb-1">{s.name}</div>
              <div className="text-[10px] text-stone-500 leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* About text */}
      <div className="page-section reveal-4 max-w-3xl mx-auto space-y-6">
        <div className="p-8 md:p-10 rounded-3xl glass-panel shadow-premium">
          <h2 className="text-xl font-black mb-4 text-orange-700 tracking-tight">{t.about.missionTitle}</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            {t.about.missionText}
          </p>
        </div>
        <div className="page-stagger grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.about.cards.map((c,i)=>(
            <div key={i} className="p-6 md:p-8 rounded-3xl glass-panel glass-panel-hover">
              <div className="text-3xl mb-3">{c.i}</div>
              <div className="text-sm font-extrabold mb-1">{c.t}</div>
              <div className="text-xs text-stone-500">{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
