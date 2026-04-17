'use client';

import { useLanguage } from '@/context/LanguageContext';

const chetelImages = [
  { image: '/chetel/IMG_0122.PNG', alt: 'Chet el o\'quvchisi 1' },
  { image: '/chetel/image copy 2.png', alt: 'Chet el o\'quvchisi 2' },
  { image: '/chetel/image copy.png', alt: 'Chet el o\'quvchisi 3' },
  { image: '/chetel/image.png', alt: 'Chet el o\'quvchisi 4' },
  { image: '/chetel/image_2025-09-13_19-33-40.png', alt: 'Chet el o\'quvchisi 5' },
];

const results = [
  { image: '/results/certificate-1.png', alt: 'Kimyo sertifikati 1' },
  { image: '/results/certificate-2.png', alt: 'Kimyo sertifikati 2' },
  { image: '/results/certificate-3.png', alt: 'Kimyo sertifikati 3' },
  { image: '/results/certificate-4.png', alt: 'Kimyo sertifikati 4' },
  { image: '/results/certificate-5.png', alt: 'Kimyo sertifikati 5' },
  { image: '/results/certificate-6.png', alt: 'Kimyo sertifikati 6' },
  { image: '/results/certificate-7.png', alt: 'Kimyo sertifikati 7' },
  { image: '/results/certificate-8.png', alt: 'Kimyo sertifikati 8' },
  { image: '/results/certificate-9.png', alt: 'Kimyo sertifikati 9' },
];

const studentImages = [
  'https://placehold.co/200x200/ff6500/white?text=AK',
  'https://placehold.co/200x200/ff8533/white?text=JT',
  'https://placehold.co/200x200/ffb347/111111?text=MR',
  'https://placehold.co/200x200/cc5000/white?text=BA',
  'https://placehold.co/200x200/ff6500/white?text=NS',
];

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="page-enter px-4 py-12 md:py-16 max-w-6xl mx-auto">

      {/* Header */}
      <div className="page-section reveal-1 text-center mb-14">
        <div className="inline-flex text-orange-400 text-[11px] font-bold tracking-widest px-5 py-2 rounded-full mb-5 border border-orange-500/20 bg-orange-500/8">
          {t.about.badge}
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-50">
          {t.about.titleMain}{' '}
          <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
            {t.about.titleAccent}
          </span>
        </h1>
        <p className="text-sm text-zinc-400 mt-4 max-w-lg mx-auto leading-relaxed">{t.about.subtitle}</p>
      </div>

      {/* Results / Certificates — infinite scroll */}
      <div className="page-section reveal-2 mb-20">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px w-12 bg-orange-500/30" />
          <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">{t.about.resultsTitle}</h2>
          <div className="h-px w-12 bg-orange-500/30" />
        </div>

        {/* Scroll track — overflow hidden with fade masks */}
        <div
          className="relative overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          {/* Inner belt: duplicated for seamless loop */}
          <div className="cert-scroll-track flex gap-5" style={{ width: 'max-content' }}>
            {[...results, ...results].map((r, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[220px] sm:w-[240px]"
              >
                <div className="result-card relative overflow-hidden rounded-3xl p-2.5 glass-panel shadow-premium group cursor-pointer"
                  style={{ transition: 'all 0.4s cubic-bezier(0.2,0.8,0.2,1)' }}
                >
                  <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500/6 to-amber-500/4 border border-orange-500/10 h-[300px] sm:h-[330px]">
                    <img
                      src={r.image}
                      alt={r.alt}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/480x680/111/ff6500?text=Sertifikat';
                      }}
                      className="w-full h-full object-contain p-1 transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  {/* Shine overlay */}
                  <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chet el o'quvchilarimiz — infinite scroll (sekin) */}
      <div className="page-section reveal-3 mb-20">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px w-12 bg-orange-500/30" />
          <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">Chet eldagi o&apos;quvchilarimiz</h2>
          <div className="h-px w-12 bg-orange-500/30" />
        </div>

        <div
          className="relative overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          <div className="chetel-scroll-track flex gap-5" style={{ width: 'max-content' }}>
            {[...chetelImages, ...chetelImages, ...chetelImages].map((r, i) => (
              <div key={i} className="flex-shrink-0 w-[280px] sm:w-[320px]">
                <div
                  className="relative overflow-hidden rounded-3xl p-2.5 glass-panel group cursor-pointer"
                  style={{ transition: 'all 0.4s cubic-bezier(0.2,0.8,0.2,1)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,100,0,0.35)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px) scale(1.02)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 50px rgba(0,0,0,0.5), 0 0 40px rgba(255,100,0,0.1)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                  }}
                >
                  <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500/6 to-amber-500/4 border border-orange-500/10">
                    <img
                      src={r.image}
                      alt={r.alt}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/480x360/111/ff6500?text=O\'quvchi';
                      }}
                      className="w-full h-[220px] sm:h-[260px] object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Best Students */}
      <div className="page-section reveal-3 mb-20">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-12 bg-orange-500/30" />
          <h2 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">{t.about.bestStudentsTitle}</h2>
          <div className="h-px w-12 bg-orange-500/30" />
        </div>
        <div className="page-stagger grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {t.about.students.map((s, i) => (
            <div key={i} className="p-6 rounded-3xl text-center group glass-panel glass-panel-hover relative overflow-hidden">
              <div className="absolute top-3 right-3 font-mono text-[9px] text-orange-500/35 font-black">{String(i + 1).padStart(2, '0')}</div>
              <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden ring-2 ring-orange-500/20 group-hover:ring-orange-500/50 transition-all duration-300">
                <img src={studentImages[i]} alt={s.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-xs font-black text-zinc-100 mb-1">{s.name}</div>
              <div className="text-[10px] text-zinc-500 leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission + Cards */}
      <div className="page-section reveal-4 max-w-3xl mx-auto space-y-6">
        <div className="p-8 md:p-10 rounded-3xl glass-panel shadow-premium relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
          <h2 className="text-xl font-black mb-4 text-orange-400 tracking-tight">{t.about.missionTitle}</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">{t.about.missionText}</p>
        </div>

        <div className="page-stagger grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.about.cards.map((c, i) => (
            <div key={i} className="p-6 md:p-8 rounded-3xl glass-panel glass-panel-hover relative overflow-hidden group">
              <span className="absolute top-4 right-4 font-mono text-[9px] text-orange-500/35 font-black">{String(i + 1).padStart(2, '0')}</span>
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 w-fit">{c.i}</div>
              <div className="text-sm font-black mb-2 text-zinc-100 group-hover:text-orange-400 transition-colors">{c.t}</div>
              <div className="text-xs text-zinc-500 leading-relaxed">{c.d}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
