'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';

export type LangTrack = {
  key: string;
  short: string;
  lang: string;
  desc: string;
  flag: string;
};

export default function LanguageTracks({ tracks }: { tracks: LangTrack[] }) {
  const [active, setActive] = useState(0);
  const lanes = tracks.map((_, i) => (i === active ? '2.4fr' : '0.85fr')).join(' ');

  return (
    <div className="lang-lanes" style={{ '--lanes': lanes } as CSSProperties}>
      {tracks.map((track, i) => {
        const isActive = i === active;
        return (
          <button
            key={track.key}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-expanded={isActive}
            className={`lang-lane ${isActive ? 'lang-lane--active' : ''}`}
            style={{ '--rd': `${i * 130}ms` } as CSSProperties}
          >
            {/* Oversized monogram watermark */}
            <span className="lang-watermark" aria-hidden="true">{track.short}</span>

            {/* Collapsed rail — desktop only */}
            <span className="lang-rail" aria-hidden={isActive}>
              <span className="lang-rail-idx">{track.key}</span>
              <span className="lang-rail-name">{track.lang}</span>
              <span className="lang-flag lang-flag--sm">{track.flag}</span>
            </span>

            {/* Expanded content */}
            <span className="lang-full" aria-hidden={!isActive}>
              <span className="lang-head">
                <span className="lang-flag">{track.flag}</span>
                <span className="lang-idx">{track.key} / 0{tracks.length}</span>
              </span>

              <span className="lang-foot">
                <span className="lang-mono">{track.short}</span>
                <span className="lang-name">{track.lang}</span>
                <span className="lang-rule" />
                <span className="lang-desc">{track.desc}</span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
