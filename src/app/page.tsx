'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AtomVisual3D from '@/components/AtomVisual3D';
import LanguageTracks from '@/components/LanguageTracks';
import ChemBackdrop from '@/components/ChemBackdrop';

export default function HomePage() {
  const { t } = useLanguage();
  const languageTracks = [
    { key: '01', short: 'UZ', lang: t.home.languages.uz, desc: t.home.languages.uzDesc, flag: '🇺🇿' },
    { key: '02', short: 'RU', lang: t.home.languages.ru, desc: t.home.languages.ruDesc, flag: '🇷🇺' },
    { key: '03', short: 'EN', lang: t.home.languages.en, desc: t.home.languages.enDesc, flag: '🇬🇧' },
  ];

  return (
    <div className="page-enter relative">

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section className="page-section reveal-1 relative min-h-[92vh] flex items-center pt-8 pb-20 md:py-0 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — TEXT */}
          <div className="text-center lg:text-left z-10">

            {/* Heading */}
            <h1 data-reveal style={{ '--rd': '80ms' } as CSSProperties}
              className="text-4xl md:text-6xl lg:text-[72px] font-black tracking-tight leading-[1.05] mb-8 text-zinc-50">
              {t.home.titleFirst} <br />
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                {t.home.titleAccent}
              </span> <br />
              <span className="text-zinc-200">{t.home.titleThird}</span>
            </h1>

            <p data-reveal style={{ '--rd': '220ms' } as CSSProperties}
              className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-10 font-medium">
              {t.home.description}
            </p>

            <div data-reveal style={{ '--rd': '340ms' } as CSSProperties}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/contact" className="btn-primary px-9 py-4">
                {t.home.enroll}
              </Link>
              <Link href="/about" className="btn-glass px-9 py-4">
                {t.home.details}
              </Link>
            </div>

            {/* Stats — typographic row */}
            <div className="mt-14 pt-10 border-t border-white/8 stat-row">
              {t.home.stats.map((s, i) => {
                const [, value, suffix] = s.n.match(/^([\d.,\s]+)(.*)$/) ?? [, s.n, ''];
                return (
                  <div key={i} className="stat" data-reveal style={{ '--rd': `${460 + i * 90}ms` } as CSSProperties}>
                    <span className="stat-idx">{String(i + 1).padStart(2, '0')}</span>
                    <span className="stat-num">
                      {value}
                      {suffix && <span className="stat-suffix">{suffix}</span>}
                    </span>
                    <span className="stat-label">{s.l}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — 3D CHEMISTRY ATOM */}
          <div data-reveal="scale" style={{ '--rd': '260ms' } as CSSProperties}
            className="relative flex justify-center items-center">
            <AtomVisual3D />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          LANGUAGES
      ══════════════════════════════════ */}
      <section className="page-section reveal-2 px-6 py-28 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section header — asymmetric, editorial */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div data-reveal="left" className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-orange-500 text-[10px] font-black tracking-[0.3em] uppercase mb-6 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/6">
                ⬡ TILLAR
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-zinc-50 tracking-tight leading-[1.1]">
                {t.home.languages.title}
              </h2>
            </div>
            <p data-reveal="right" style={{ '--rd': '160ms' } as CSSProperties}
              className="text-zinc-400 font-medium text-base max-w-sm lg:text-right lg:pb-2">
              {t.home.languages.subtitle}
            </p>
          </div>

          <LanguageTracks tracks={languageTracks} />
        </div>
      </section>

      {/* ══════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════ */}
      <section className="page-section reveal-3 px-6 py-28 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
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
      <section className="page-section reveal-4 px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-[2.5rem] overflow-hidden px-8 py-12 md:px-16 md:py-14 text-center cta-panel">
            {/* Molecular line-art backdrop */}
            <ChemBackdrop />

            {/* Top badge */}
            <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-500/25 bg-orange-500/8 text-orange-400 mb-6">
              <span className="text-[9px] font-black tracking-[0.28em] uppercase">⚗ JAP ACADEMY</span>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-[42px] font-black text-zinc-50 mb-4 tracking-tight leading-[1.12]">
                {t.home.ctaTitle}
              </h3>
              <p className="text-base md:text-lg text-zinc-400 mb-8 font-medium leading-relaxed">
                {t.home.ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link href="/contact" className="btn-primary px-9 py-3.5">
                  {t.home.ctaButton}
                </Link>
                <div className="flex items-center gap-2 text-zinc-500 text-[11px] font-black tracking-widest uppercase sm:pl-4">
                  <span className="text-orange-500">✦</span> +9989701350110
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
