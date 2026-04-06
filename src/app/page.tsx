'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

type ElementCategory =
  | 'nonmetal'
  | 'alkali'
  | 'alkaline'
  | 'transition'
  | 'metalloid'
  | 'postTransition'
  | 'halogen'
  | 'nobleGas'
  | 'lanthanoid'
  | 'actinoid';

type OrbitElement = {
  symbol: string;
  category: ElementCategory;
  atomicNumber: number;
  atomicMass: string;
  electronConfig: string;
  name: string;
};

const CENTER_X = 150;
const CENTER_Y = 190;
const TILE_WIDTH = 30;
const TILE_HEIGHT = 38;

type OrbitNode = OrbitElement & {
  x: number;
  y: number;
  tilt: number;
  driftX: number;
  driftY: number;
  wobbleDuration: number;
  tiltDuration: number;
};

const CATEGORY_COLORS: Record<ElementCategory, { fill: string; stroke: string; text: string }> = {
  nonmetal: { fill: '#b8a4ff', stroke: '#8f77e8', text: '#2b1e62' },
  alkali: { fill: '#ff6a6a', stroke: '#de3f3f', text: '#6f1a1a' },
  alkaline: { fill: '#f2c313', stroke: '#cc9f06', text: '#5e4300' },
  transition: { fill: '#8ad84a', stroke: '#63ae2d', text: '#1f4210' },
  metalloid: { fill: '#88b0ff', stroke: '#5e87e5', text: '#1d3575' },
  postTransition: { fill: '#59c8ff', stroke: '#28a7df', text: '#0d3d57' },
  halogen: { fill: '#eea6ff', stroke: '#cf75e7', text: '#5f2373' },
  nobleGas: { fill: '#ffa056', stroke: '#ea7f28', text: '#6a2f09' },
  lanthanoid: { fill: '#d8bebc', stroke: '#b69693', text: '#533836' },
  actinoid: { fill: '#c8cf74', stroke: '#a5ad4f', text: '#414814' },
};

const ORBIT_A_ELEMENTS: OrbitElement[] = [
  { symbol: 'H', category: 'nonmetal', atomicNumber: 1, atomicMass: '1.008', electronConfig: '1s1', name: 'hydrogen' },
  { symbol: 'Li', category: 'alkali', atomicNumber: 3, atomicMass: '6.94', electronConfig: '[He]2s1', name: 'lithium' },
  { symbol: 'Be', category: 'alkaline', atomicNumber: 4, atomicMass: '9.012', electronConfig: '[He]2s2', name: 'beryllium' },
  { symbol: 'Fe', category: 'transition', atomicNumber: 26, atomicMass: '55.845', electronConfig: '[Ar]3d6 4s2', name: 'iron' },
  { symbol: 'B', category: 'metalloid', atomicNumber: 5, atomicMass: '10.81', electronConfig: '[He]2s2 2p1', name: 'boron' },
  { symbol: 'Al', category: 'postTransition', atomicNumber: 13, atomicMass: '26.982', electronConfig: '[Ne]3s2 3p1', name: 'aluminium' },
  { symbol: 'Cl', category: 'halogen', atomicNumber: 17, atomicMass: '35.45', electronConfig: '[Ne]3s2 3p5', name: 'chlorine' },
  { symbol: 'Ne', category: 'nobleGas', atomicNumber: 10, atomicMass: '20.180', electronConfig: '1s2 2s2 2p6', name: 'neon' },
  { symbol: 'La', category: 'lanthanoid', atomicNumber: 57, atomicMass: '138.905', electronConfig: '[Xe]5d1 6s2', name: 'lanthanum' },
  { symbol: 'U', category: 'actinoid', atomicNumber: 92, atomicMass: '238.029', electronConfig: '[Rn]5f3 6d1 7s2', name: 'uranium' },
];

const ORBIT_B_ELEMENTS: OrbitElement[] = [
  { symbol: 'C', category: 'nonmetal', atomicNumber: 6, atomicMass: '12.011', electronConfig: '[He]2s2 2p2', name: 'carbon' },
  { symbol: 'Na', category: 'alkali', atomicNumber: 11, atomicMass: '22.990', electronConfig: '[Ne]3s1', name: 'sodium' },
  { symbol: 'Mg', category: 'alkaline', atomicNumber: 12, atomicMass: '24.305', electronConfig: '[Ne]3s2', name: 'magnesium' },
  { symbol: 'Cu', category: 'transition', atomicNumber: 29, atomicMass: '63.546', electronConfig: '[Ar]3d10 4s1', name: 'copper' },
  { symbol: 'Si', category: 'metalloid', atomicNumber: 14, atomicMass: '28.085', electronConfig: '[Ne]3s2 3p2', name: 'silicon' },
  { symbol: 'Sn', category: 'postTransition', atomicNumber: 50, atomicMass: '118.710', electronConfig: '[Kr]4d10 5s2 5p2', name: 'tin' },
  { symbol: 'F', category: 'halogen', atomicNumber: 9, atomicMass: '18.998', electronConfig: '[He]2s2 2p5', name: 'fluorine' },
  { symbol: 'Ar', category: 'nobleGas', atomicNumber: 18, atomicMass: '39.948', electronConfig: '[Ne]3s2 3p6', name: 'argon' },
  { symbol: 'Ce', category: 'lanthanoid', atomicNumber: 58, atomicMass: '140.116', electronConfig: '[Xe]4f1 5d1 6s2', name: 'cerium' },
  { symbol: 'Th', category: 'actinoid', atomicNumber: 90, atomicMass: '232.038', electronConfig: '[Rn]6d2 7s2', name: 'thorium' },
];

function seeded(index: number, seed: number) {
  const value = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function getOrbitPositions(elements: OrbitElement[], radius: number, phase = 0, seedShift = 1): OrbitNode[] {
  return elements.map((item, index) => {
    const angleJitter = (seeded(index, seedShift) - 0.5) * 0.62;
    const radiusJitter = (seeded(index, seedShift + 3) - 0.5) * 20;
    const angle = (index / elements.length) * Math.PI * 2 + phase + angleJitter;
    const radialDistance = radius + radiusJitter;
    return {
      ...item,
      x: CENTER_X + Math.cos(angle) * radialDistance,
      y: CENTER_Y + Math.sin(angle) * radialDistance,
      tilt: (seeded(index, seedShift + 7) - 0.5) * 50,
      driftX: (seeded(index, seedShift + 9) - 0.5) * 8,
      driftY: (seeded(index, seedShift + 11) - 0.5) * 8,
      wobbleDuration: 4.6 + seeded(index, seedShift + 13) * 3.8,
      tiltDuration: 5.5 + seeded(index, seedShift + 15) * 4.5,
    };
  });
}

function OrbitTile({ node }: { node: OrbitNode }) {
  const { x, y, tilt, driftX, driftY, wobbleDuration, tiltDuration } = node;
  const colors = CATEGORY_COLORS[node.category];

  return (
    <g>
      <animateTransform
        attributeName="transform"
        type="translate"
        values={`${x.toFixed(1)} ${y.toFixed(1)}; ${(x + driftX).toFixed(1)} ${(y - driftY).toFixed(1)}; ${(x - driftX).toFixed(1)} ${(y + driftY).toFixed(1)}; ${x.toFixed(1)} ${y.toFixed(1)}`}
        dur={`${wobbleDuration.toFixed(2)}s`}
        repeatCount="indefinite"
      />
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values={`${tilt.toFixed(1)}; ${(tilt + 8).toFixed(1)}; ${(tilt - 7).toFixed(1)}; ${tilt.toFixed(1)}`}
          dur={`${tiltDuration.toFixed(2)}s`}
          repeatCount="indefinite"
        />
        <rect
          x={-TILE_WIDTH / 2}
          y={-TILE_HEIGHT / 2}
          width={TILE_WIDTH}
          height={TILE_HEIGHT}
          rx="4"
          fill={colors.fill}
          fillOpacity="0.94"
          stroke={colors.stroke}
          strokeWidth="1.1"
        />
        <text x={-TILE_WIDTH / 2 + 3} y={-TILE_HEIGHT / 2 + 7} fontSize="3.9" fontWeight="700" fill={colors.text}>
          {node.atomicNumber}
        </text>
        <text x={TILE_WIDTH / 2 - 2.5} y={-TILE_HEIGHT / 2 + 7} textAnchor="end" fontSize="3.7" fontWeight="600" fill={colors.text}>
          ({node.atomicMass})
        </text>
        <text x="0" y="-1.5" textAnchor="middle" dominantBaseline="middle" fontSize="9.6" fontWeight="800" fill={colors.text}>
          {node.symbol}
        </text>
        <line x1={TILE_WIDTH / 2 - 10} y1="3.5" x2={TILE_WIDTH / 2 - 3} y2="3.5" stroke={colors.stroke} strokeWidth="0.95" />
        <line x1={TILE_WIDTH / 2 - 10} y1="6" x2={TILE_WIDTH / 2 - 3} y2="6" stroke={colors.stroke} strokeWidth="0.95" />
        <text x={-TILE_WIDTH / 2 + 3} y={TILE_HEIGHT / 2 - 7} fontSize="3.2" fontWeight="600" fill={colors.text}>
          {node.electronConfig}
        </text>
        <text x={-TILE_WIDTH / 2 + 3} y={TILE_HEIGHT / 2 - 1.8} fontSize="3.85" fontWeight="700" fill={colors.text}>
          {node.name}
        </text>
      </g>
    </g>
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  const orbitA = getOrbitPositions(ORBIT_A_ELEMENTS, 118, -Math.PI / 2, 1);
  const orbitB = getOrbitPositions(ORBIT_B_ELEMENTS, 148, -Math.PI / 2 + Math.PI / 10, 17);

  return (
    <div className="page-enter">
      <section className="page-section reveal-1 relative min-h-[78vh] md:min-h-[90vh] flex items-center px-4 py-8 md:py-0">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-8 md:gap-10">
          <div className="flex-1 max-w-xl text-center md:text-left">
            <div className="flex gap-1.5 mb-6 justify-center md:justify-start">
              <div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600" />
              <div className="w-5 h-1.5 rounded-full bg-orange-400" />
              <div className="w-2.5 h-1.5 rounded-full bg-amber-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-[52px] font-black tracking-tight leading-[1.06] mb-6">
              {t.home.titleFirst}<br />
              <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 bg-clip-text text-transparent">{t.home.titleAccent}</span>{' '}
              {t.home.titleThird}
            </h1>
            <p className="text-base md:text-lg text-stone-500 leading-relaxed max-w-md mx-auto md:mx-0 mb-8">
              {t.home.description}
            </p>
            <div className="flex gap-3 flex-wrap justify-center md:justify-start">
              <Link href="/contact" className="btn-primary px-8 py-4 rounded-full text-white text-sm font-bold flex items-center justify-center gap-2 w-full sm:w-auto">{t.home.enroll} <span>&rarr;</span></Link>
              <Link href="/about" className="btn-glass px-8 py-4 rounded-full text-sm font-bold text-stone-700 w-full sm:w-auto text-center">{t.home.details}</Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <svg viewBox="0 0 300 380" className="w-[230px] sm:w-[260px] md:w-[280px] h-auto" style={{ filter: 'drop-shadow(0 20px 40px rgba(234,88,12,0.12))' }}>
              <defs><linearGradient id="lG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fb923c" stopOpacity="0.6"/><stop offset="100%" stopColor="#ea580c" stopOpacity="0.85"/></linearGradient><linearGradient id="fG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fff7ed" stopOpacity="0.8"/><stop offset="100%" stopColor="#ffedd5" stopOpacity="0.4"/></linearGradient></defs>
              <g opacity="0.5">
                <circle cx="150" cy="190" r="112" fill="none" stroke="#fdba74" strokeWidth="1.1" strokeDasharray="4 10">
                  <animate attributeName="stroke-dashoffset" values="0;-70" dur="12s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="190" r="146" fill="none" stroke="#fb923c" strokeWidth="0.9" strokeOpacity="0.7" strokeDasharray="3 12">
                  <animate attributeName="stroke-dashoffset" values="0;80" dur="16s" repeatCount="indefinite" />
                </circle>
              </g>

              <g>
                <g>
                  <animateTransform attributeName="transform" type="rotate" from="0 150 190" to="360 150 190" dur="18s" repeatCount="indefinite" />
                  {orbitA.map((node, index) => (
                    <OrbitTile key={`orbit-a-${node.symbol}-${index}`} node={node} />
                  ))}
                </g>

                <g>
                  <animateTransform attributeName="transform" type="rotate" from="360 150 190" to="0 150 190" dur="24s" repeatCount="indefinite" />
                  {orbitB.map((node, index) => (
                    <OrbitTile key={`orbit-b-${node.symbol}-${index}`} node={node} />
                  ))}
                </g>
              </g>

              <path d="M110 60V160L40 300C35 315 45 330 60 330H240C255 330 265 315 260 300L190 160V60" fill="url(#fG)" stroke="#ea580c" strokeWidth="1.5" strokeOpacity="0.3"/>
              <rect x="110" y="30" width="80" height="30" rx="4" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeOpacity="0.3"/>
              <path d="M65 250 Q110 235 150 245 Q190 255 235 240 L255 300C260 312 252 325 240 325H60C48 325 40 312 45 300Z" fill="url(#lG)"><animate attributeName="d" dur="4s" repeatCount="indefinite" values="M65 250 Q110 235 150 245 Q190 255 235 240 L255 300C260 312 252 325 240 325H60C48 325 40 312 45 300Z;M65 245 Q100 258 150 248 Q200 238 235 248 L255 300C260 312 252 325 240 325H60C48 325 40 312 45 300Z;M65 250 Q110 235 150 245 Q190 255 235 240 L255 300C260 312 252 325 240 325H60C48 325 40 312 45 300Z"/></path>
              <circle cx="120" cy="290" r="5" fill="#fb923c" opacity="0.4"><animate attributeName="cy" values="290;230;290" dur="3.5s" repeatCount="indefinite"/></circle>
              <circle cx="170" cy="300" r="4" fill="#fdba74" opacity="0.3"><animate attributeName="cy" values="300;220;300" dur="4.5s" repeatCount="indefinite"/></circle>
              <circle cx="145" cy="310" r="6" fill="#f97316" opacity="0.2"><animate attributeName="cy" values="310;240;310" dur="3s" repeatCount="indefinite"/></circle>
            </svg>
          </div>
        </div>
      </section>

      <section className="page-section reveal-2 relative z-10 px-4 -mt-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:flex rounded-2xl overflow-hidden" style={{ background:'rgba(255,255,255,0.45)',backdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,0.5)',boxShadow:'0 8px 32px rgba(0,0,0,0.06)' }}>
            {t.home.stats.map((s,i)=>(
              <div key={i} className={`md:flex-1 text-center py-6 md:py-7 ${i>0?'md:border-l border-white/40':''} ${i>1?'border-t md:border-t-0 border-white/40':''}`}>
                <div className={`text-xl md:text-2xl font-black ${s.c}`}>{s.n}</div>
                <div className="text-[9px] text-stone-400 mt-1 tracking-widest font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section reveal-3 px-4 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex text-orange-600 text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full mb-4" style={{ background:'rgba(255,237,213,0.6)',border:'1px solid rgba(234,88,12,0.1)' }}>{t.home.whyBadge}</div>
          <h2 className="text-2xl md:text-3xl font-black">{t.home.whyTitleBefore} <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">{t.home.whyTitleAccent}</span> {t.home.whyTitleAfter}</h2>
        </div>
        <div className="page-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.home.whyItems.map((f,i)=>(
            <div key={i} className="card-hover p-6 rounded-2xl relative overflow-hidden group" style={{background:'rgba(255,255,255,0.55)',backdropFilter:'blur(16px)',border:'1px solid rgba(255,255,255,0.6)',boxShadow:'0 4px 20px rgba(0,0,0,0.04)'}}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{background:`radial-gradient(circle at top right,${f.a}15,transparent 70%)`}}/>
              <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" style={{background:`linear-gradient(90deg,transparent,${f.a}40,transparent)`}}/>
              <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">{f.i}</div>
              <div className="text-sm font-extrabold mb-1.5 group-hover:text-orange-700 transition-colors">{f.t}</div>
              <div className="text-xs text-stone-500 leading-relaxed">{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section reveal-4 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10 md:p-16 text-center" style={{background:'linear-gradient(135deg,rgba(234,88,12,0.12),rgba(251,146,60,0.08),rgba(245,158,11,0.1))',backdropFilter:'blur(20px)',border:'1px solid rgba(234,88,12,0.15)'}}>
            <h3 className="text-2xl md:text-3xl font-black text-stone-800 mb-4">{t.home.ctaTitle}</h3>
            <p className="text-sm text-stone-500 mb-8 max-w-md mx-auto">{t.home.ctaDescription}</p>
            <Link href="/contact" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-bold text-sm w-full sm:w-auto">{t.home.ctaButton} &rarr;</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
