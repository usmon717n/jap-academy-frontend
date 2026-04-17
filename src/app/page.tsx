'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="page-enter relative">

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section className="page-section reveal-1 relative min-h-[92vh] flex items-center pt-8 pb-20 md:py-0 overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/8 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-amber-500/6 rounded-full blur-[140px] -z-10" />

        <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — TEXT */}
          <div className="text-center lg:text-left z-10">

            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl border border-orange-500/20 bg-orange-500/8 text-orange-400 mb-8 animate-fade-slide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              <span className="text-[10px] font-black tracking-[0.25em] uppercase">{t.home.whyBadge}</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-[72px] font-black tracking-tight leading-[1.05] mb-8 text-zinc-50">
              {t.home.titleFirst} <br />
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                {t.home.titleAccent}
              </span> <br />
              <span className="text-zinc-200">{t.home.titleThird}</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-10 font-medium">
              {t.home.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/contact" className="btn-primary px-10 py-5 rounded-2xl text-white text-sm font-black uppercase tracking-widest shadow-2xl shadow-orange-500/30">
                {t.home.enroll}
              </Link>
              <Link href="/about" className="btn-glass px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-widest text-zinc-200">
                {t.home.details}
              </Link>
            </div>

            {/* Stats — element card style */}
            <div className="mt-16 pt-10 border-t border-white/8 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {t.home.stats.map((s, i) => (
                <div key={i} className="element-card p-4 flex flex-col items-center text-center">
                  <span className="text-[9px] font-black tracking-widest text-orange-500/60 font-mono mb-1">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`text-2xl font-black ${s.c}`}>{s.n}</span>
                  <span className="text-[9px] font-bold text-zinc-500 tracking-wider uppercase mt-1">{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — CHEMISTRY ATOM SVG */}
          <div className="relative flex justify-center items-center">
            <svg
              viewBox="0 0 540 540"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[520px] h-auto"
            >
              <defs>
                <filter id="glow-lg" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="12" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="glow-md" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="glow-sm" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff6500" stopOpacity="0.28" />
                  <stop offset="60%" stopColor="#ff6500" stopOpacity="0.06" />
                  <stop offset="100%" stopColor="#ff6500" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,100,0,0.12)" />
                  <stop offset="100%" stopColor="rgba(255,100,0,0.02)" />
                </radialGradient>
              </defs>

              {/* Ambient glow */}
              <circle cx="270" cy="270" r="210" fill="url(#ambientGlow)" />

              {/* ─ Orbit 1 — tilt -25° ─ */}
              <g transform="rotate(-25 270 270)">
                <g transform="translate(270 270)">
                  <ellipse rx="175" ry="55" stroke="rgba(255,100,0,0.2)" strokeWidth="1" />
                  <circle r="6" fill="#ff6500" filter="url(#glow-sm)">
                    <animateMotion dur="7s" repeatCount="indefinite"
                      path="M 175,0 A 175,55 0 1,0 -175,0 A 175,55 0 1,0 175,0" />
                  </circle>
                </g>
              </g>

              {/* ─ Orbit 2 — tilt 65° ─ */}
              <g transform="rotate(65 270 270)">
                <g transform="translate(270 270)">
                  <ellipse rx="175" ry="55" stroke="rgba(255,160,64,0.15)" strokeWidth="1" />
                  <circle r="5" fill="#ffb347" filter="url(#glow-sm)">
                    <animateMotion dur="11s" repeatCount="indefinite"
                      path="M -175,0 A 175,55 0 1,1 175,0 A 175,55 0 1,1 -175,0" />
                  </circle>
                </g>
              </g>

              {/* ─ Orbit 3 — tilt -115° ─ */}
              <g transform="rotate(-115 270 270)">
                <g transform="translate(270 270)">
                  <ellipse rx="175" ry="55" stroke="rgba(255,100,0,0.12)" strokeWidth="1" />
                  <circle r="4.5" fill="#ff8533" filter="url(#glow-sm)">
                    <animateMotion dur="9s" repeatCount="indefinite"
                      path="M 175,0 A 175,55 0 1,0 -175,0 A 175,55 0 1,0 175,0" />
                  </circle>
                </g>
              </g>

              {/* Nucleus dashed ring */}
              <circle cx="270" cy="270" r="82" stroke="rgba(255,100,0,0.2)" strokeWidth="1"
                strokeDasharray="5 5" fill="none" />

              {/* Central element card */}
              <rect x="192" y="192" width="156" height="156" rx="16"
                fill="rgba(10,6,2,0.92)" stroke="rgba(255,100,0,0.55)" strokeWidth="1.5"
                filter="url(#glow-lg)" />
              <rect x="192" y="192" width="156" height="156" rx="16" fill="url(#cardGrad)" />

              {/* Atomic number */}
              <text x="206" y="214" fontSize="13" fontFamily="ui-monospace,monospace"
                fontWeight="700" fill="rgba(255,100,0,0.75)">79</text>

              {/* Electron config */}
              <text x="334" y="214" fontSize="8" fontFamily="ui-monospace,monospace"
                fill="rgba(255,255,255,0.2)" textAnchor="end">2.8.18.32.18.1</text>

              {/* Symbol */}
              <text x="270" y="280" fontSize="64" fontFamily="system-ui,-apple-system,sans-serif"
                fontWeight="900" fill="#ff6500" textAnchor="middle" dominantBaseline="middle"
                filter="url(#glow-md)">Au</text>

              {/* Name */}
              <text x="270" y="320" fontSize="11" fontFamily="system-ui,sans-serif"
                fill="rgba(255,255,255,0.38)" textAnchor="middle" letterSpacing="4">GOLD</text>

              {/* Atomic mass */}
              <text x="270" y="338" fontSize="11" fontFamily="ui-monospace,monospace"
                fill="rgba(255,100,0,0.5)" textAnchor="middle">196.967</text>

              {/* ─ Floating mini element cards ─ */}

              {/* H */}
              <g transform="translate(52,75)">
                <rect width="52" height="52" rx="9" fill="rgba(255,255,255,0.03)"
                  stroke="rgba(255,100,0,0.22)" strokeWidth="1" />
                <text x="7" y="16" fontSize="9" fontFamily="ui-monospace,monospace"
                  fill="rgba(255,100,0,0.55)" fontWeight="700">1</text>
                <text x="26" y="34" fontSize="22" fontFamily="system-ui,sans-serif"
                  fontWeight="900" fill="rgba(255,255,255,0.8)" textAnchor="middle">H</text>
                <text x="26" y="47" fontSize="7.5" fontFamily="ui-monospace,monospace"
                  fill="rgba(255,100,0,0.35)" textAnchor="middle">1.008</text>
              </g>

              {/* C */}
              <g transform="translate(440,55)">
                <rect width="52" height="52" rx="9" fill="rgba(255,255,255,0.03)"
                  stroke="rgba(255,100,0,0.22)" strokeWidth="1" />
                <text x="7" y="16" fontSize="9" fontFamily="ui-monospace,monospace"
                  fill="rgba(255,100,0,0.55)" fontWeight="700">6</text>
                <text x="26" y="34" fontSize="22" fontFamily="system-ui,sans-serif"
                  fontWeight="900" fill="rgba(255,255,255,0.8)" textAnchor="middle">C</text>
                <text x="26" y="47" fontSize="7.5" fontFamily="ui-monospace,monospace"
                  fill="rgba(255,100,0,0.35)" textAnchor="middle">12.011</text>
              </g>

              {/* O */}
              <g transform="translate(458,262)">
                <rect width="52" height="52" rx="9" fill="rgba(255,255,255,0.03)"
                  stroke="rgba(255,100,0,0.22)" strokeWidth="1" />
                <text x="7" y="16" fontSize="9" fontFamily="ui-monospace,monospace"
                  fill="rgba(255,100,0,0.55)" fontWeight="700">8</text>
                <text x="26" y="34" fontSize="22" fontFamily="system-ui,sans-serif"
                  fontWeight="900" fill="rgba(255,255,255,0.8)" textAnchor="middle">O</text>
                <text x="26" y="47" fontSize="7.5" fontFamily="ui-monospace,monospace"
                  fill="rgba(255,100,0,0.35)" textAnchor="middle">15.999</text>
              </g>

              {/* N */}
              <g transform="translate(52,395)">
                <rect width="52" height="52" rx="9" fill="rgba(255,255,255,0.03)"
                  stroke="rgba(255,100,0,0.22)" strokeWidth="1" />
                <text x="7" y="16" fontSize="9" fontFamily="ui-monospace,monospace"
                  fill="rgba(255,100,0,0.55)" fontWeight="700">7</text>
                <text x="26" y="34" fontSize="22" fontFamily="system-ui,sans-serif"
                  fontWeight="900" fill="rgba(255,255,255,0.8)" textAnchor="middle">N</text>
                <text x="26" y="47" fontSize="7.5" fontFamily="ui-monospace,monospace"
                  fill="rgba(255,100,0,0.35)" textAnchor="middle">14.007</text>
              </g>

              {/* Fe */}
              <g transform="translate(435,410)">
                <rect width="52" height="52" rx="9" fill="rgba(255,255,255,0.03)"
                  stroke="rgba(255,100,0,0.22)" strokeWidth="1" />
                <text x="7" y="16" fontSize="9" fontFamily="ui-monospace,monospace"
                  fill="rgba(255,100,0,0.55)" fontWeight="700">26</text>
                <text x="26" y="34" fontSize="20" fontFamily="system-ui,sans-serif"
                  fontWeight="900" fill="rgba(255,255,255,0.8)" textAnchor="middle">Fe</text>
                <text x="26" y="47" fontSize="7.5" fontFamily="ui-monospace,monospace"
                  fill="rgba(255,100,0,0.35)" textAnchor="middle">55.845</text>
              </g>

              {/* Bond lines */}
              <line x1="104" y1="101" x2="192" y2="220" stroke="rgba(255,100,0,0.07)" strokeWidth="1" strokeDasharray="5 5" />
              <line x1="440" y1="81" x2="348" y2="215" stroke="rgba(255,100,0,0.07)" strokeWidth="1" strokeDasharray="5 5" />
              <line x1="458" y1="288" x2="348" y2="275" stroke="rgba(255,100,0,0.07)" strokeWidth="1" strokeDasharray="5 5" />
              <line x1="104" y1="421" x2="206" y2="348" stroke="rgba(255,100,0,0.07)" strokeWidth="1" strokeDasharray="5 5" />
              <line x1="435" y1="436" x2="345" y2="348" stroke="rgba(255,100,0,0.07)" strokeWidth="1" strokeDasharray="5 5" />
            </svg>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          LANGUAGES
      ══════════════════════════════════ */}
      <section className="page-section reveal-2 px-6 py-28 overflow-hidden relative">
        {/* Hex pattern BG */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 10 L103.3 35 L103.3 85 L60 110 L16.7 85 L16.7 35 Z' fill='none' stroke='%23ff6500' stroke-width='1'/%3E%3C/svg%3E")`, backgroundSize: '120px 120px' }} />
        {/* Side glows */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 text-orange-500 text-[10px] font-black tracking-[0.3em] uppercase mb-5 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/6">
              ⬡ TILLAR
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-5 text-zinc-50 tracking-tight">
              {t.home.languages.title}
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto font-medium text-base">
              {t.home.languages.subtitle}
            </p>
          </div>

          {/* Language element cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 page-stagger">
            {[
              {
                lang: t.home.languages.uz,
                desc: t.home.languages.uzDesc,
                flag: '🇺🇿',
                num: '01',
                symbol: 'Uz',
                atomicMass: '1.001',
                accent: 'from-blue-500 to-emerald-500',
                accentBorder: 'rgba(52,211,153,0.4)',
                accentGlow: 'rgba(52,211,153,0.08)',
                props: [{ k: 'Daraja', v: 'DTM ready' }, { k: 'Til', v: 'Uzbek' }],
              },
              {
                lang: t.home.languages.ru,
                desc: t.home.languages.ruDesc,
                flag: '🇷🇺',
                num: '02',
                symbol: 'Ru',
                atomicMass: '1.002',
                accent: 'from-slate-400 to-red-500',
                accentBorder: 'rgba(239,68,68,0.4)',
                accentGlow: 'rgba(239,68,68,0.08)',
                props: [{ k: 'Daraja', v: 'EGE ready' }, { k: 'Til', v: 'Russian' }],
              },
              {
                lang: t.home.languages.en,
                desc: t.home.languages.enDesc,
                flag: '🇬🇧',
                num: '03',
                symbol: 'En',
                atomicMass: '1.003',
                accent: 'from-blue-600 to-indigo-500',
                accentBorder: 'rgba(99,102,241,0.4)',
                accentGlow: 'rgba(99,102,241,0.08)',
                props: [{ k: 'Daraja', v: 'IELTS ready' }, { k: 'Til', v: 'English' }],
              },
            ].map((l, i) => (
              <div
                key={i}
                className="group relative rounded-[2rem] overflow-hidden cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.035)',
                  border: `1px solid rgba(255,255,255,0.08)`,
                  backdropFilter: 'blur(24px)',
                  transition: 'all 0.5s cubic-bezier(0.2,0.8,0.2,1)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = l.accentBorder;
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px) scale(1.01)';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 28px 60px rgba(0,0,0,0.5), 0 0 60px ${l.accentGlow}`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.35)';
                }}
              >
                {/* Top gradient bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${l.accent}`} />

                {/* Card body */}
                <div className="p-8 pb-0">
                  {/* Top row: atomic number + flag */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-mono text-[11px] font-black text-orange-500/60">{l.num}</span>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${l.accent} flex items-center justify-center text-2xl shadow-lg`}>
                      {l.flag}
                    </div>
                  </div>

                  {/* Big element symbol */}
                  <div className="mb-1">
                    <span
                      className={`text-[80px] leading-none font-black bg-gradient-to-br ${l.accent} bg-clip-text text-transparent`}
                      style={{ letterSpacing: '-2px' }}
                    >
                      {l.symbol}
                    </span>
                  </div>

                  {/* Atomic mass */}
                  <div className="font-mono text-[11px] text-zinc-600 mb-4">{l.atomicMass}</div>

                  {/* Separator */}
                  <div className="h-px bg-white/6 mb-5" />

                  {/* Language name */}
                  <h3 className="text-base font-black text-zinc-100 uppercase tracking-widest mb-3">{l.lang}</h3>

                  {/* Description */}
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">{l.desc}</p>
                </div>

                {/* Bottom properties row */}
                <div className="mx-8 mb-8 grid grid-cols-2 gap-3">
                  {l.props.map((p, pi) => (
                    <div key={pi} className="rounded-xl px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="text-[9px] font-black text-zinc-600 uppercase tracking-wider mb-0.5">{p.k}</div>
                      <div className="text-xs font-bold text-zinc-300">{p.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════ */}
      <section className="page-section reveal-3 px-6 py-28 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-orange-500 text-[10px] font-black tracking-[0.3em] uppercase mb-4">⬡ {t.home.whyBadge}</div>
            <h2 className="text-3xl md:text-5xl font-black text-zinc-50 tracking-tight leading-none">
              {t.home.whyTitleBefore} <br />
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                {t.home.whyTitleAccent}
              </span>{' '}{t.home.whyTitleAfter}
            </h2>
          </div>
          <Link href="/about" className="group flex items-center gap-3 text-sm font-black text-orange-400 uppercase tracking-widest pb-2 hover:text-orange-300 transition-colors">
            {t.home.details} <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 page-stagger">
          {t.home.whyItems.map((f, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] relative overflow-hidden group glass-panel glass-panel-hover">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/12 transition-colors" />
              <span className="absolute top-5 right-5 font-mono text-[9px] text-orange-500/40 font-black">{String(i + 1).padStart(2, '0')}</span>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/8 border border-orange-500/20 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:border-orange-500/40">
                  {f.i}
                </div>
                <h3 className="text-base font-black mb-4 text-zinc-100 tracking-tight leading-tight group-hover:text-orange-400 transition-colors">
                  {f.t}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed font-medium">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA
      ══════════════════════════════════ */}
      <section className="page-section reveal-4 px-6 pb-28">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-[4rem] overflow-hidden p-12 md:p-24 text-center glass-panel">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 via-transparent to-amber-500/6 -z-10" />
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-orange-500/8 rounded-full blur-[100px]" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-amber-500/6 rounded-full blur-[100px]" />

            {/* Hex pattern overlay */}
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 5 L68.97 22.5 L68.97 57.5 L40 75 L11.03 57.5 L11.03 22.5 Z' fill='none' stroke='%23ff6500' stroke-width='1'/%3E%3C/svg%3E")` }} />

            {/* Top badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/25 bg-orange-500/8 text-orange-400 mb-8">
              <span className="text-[10px] font-black tracking-[0.3em] uppercase">⚗ JAP ACADEMY</span>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h3 className="text-4xl md:text-6xl font-black text-zinc-50 mb-8 tracking-tight leading-tight">
                {t.home.ctaTitle}
              </h3>
              <p className="text-lg md:text-xl text-zinc-400 mb-12 font-medium leading-relaxed">
                {t.home.ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/contact" className="btn-primary px-12 py-6 rounded-2xl text-white font-black text-sm uppercase tracking-widest">
                  {t.home.ctaButton}
                </Link>
                <div className="flex items-center gap-2 text-zinc-500 text-[11px] font-black tracking-widest uppercase sm:px-6">
                  <span className="text-orange-500">✦</span> +998 90 123 45 67
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
