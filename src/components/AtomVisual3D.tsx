'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

/* Orbit rings — real 3D planes (rotateZ → rotateX 72°), electron billboarded back to camera */
const ORBITS = [
  { oz: '-24deg', dur: '8.5s', delay: '0s', dir: 'normal', es: '2.3cqw', phase: '40deg', tf: '1' },
  { oz: '36deg', dur: '12.5s', delay: '-4.2s', dir: 'reverse', es: '1.95cqw', phase: '200deg', tf: '-1' },
  { oz: '96deg', dur: '10.2s', delay: '-6.8s', dir: 'normal', es: '1.75cqw', phase: '310deg', tf: '1' },
];

/* Satellite element chips — % positions match the old 540-space layout, --sz = depth */
const SATELLITES = [
  { num: '1', sym: 'H', mass: '1.008', left: '14.4%', top: '18.7%', z: '13cqw', fd: '5.8s', fdel: '-1.4s', pop: '0.5s' },
  { num: '6', sym: 'C', mass: '12.011', left: '86.3%', top: '15%', z: '19cqw', fd: '6.6s', fdel: '-3.1s', pop: '0.62s' },
  { num: '8', sym: 'O', mass: '15.999', left: '89.6%', top: '53.3%', z: '10cqw', fd: '5.2s', fdel: '-2.2s', pop: '0.74s' },
  { num: '7', sym: 'N', mass: '14.007', left: '14.4%', top: '78%', z: '16cqw', fd: '6.2s', fdel: '-0.6s', pop: '0.86s' },
  { num: '26', sym: 'Fe', mass: '55.845', left: '85.4%', top: '80.7%', z: '22cqw', fd: '7s', fdel: '-4s', pop: '0.98s' },
];

const SPARKS = [
  { left: '26%', top: '9%', z: '8cqw', ss: '2.2cqw', td: '4.2s', tdel: '0s', dot: false },
  { left: '6%', top: '46%', z: '17cqw', ss: '1.7cqw', td: '5.1s', tdel: '-1.8s', dot: false },
  { left: '71%', top: '5%', z: '11cqw', ss: '1.4cqw', td: '3.6s', tdel: '-0.9s', dot: true },
  { left: '95%', top: '33%', z: '20cqw', ss: '1.9cqw', td: '4.8s', tdel: '-2.6s', dot: false },
  { left: '55%', top: '94%', z: '13cqw', ss: '1.2cqw', td: '4.4s', tdel: '-1.2s', dot: true },
];

/* Dashed bond lines in the original 540×540 coordinate space */
const BONDS = [
  { x1: 194.9, y1: 203.9, x2: 108.0, y2: 127.4 },
  { x1: 342.0, y1: 200.6, x2: 437.2, y2: 108.7 },
  { x1: 369.6, y1: 278.4, x2: 444.2, y2: 284.6 },
  { x1: 191.4, y1: 331.8, x2: 109.4, y2: 396.3 },
  { x1: 345.5, y1: 335.6, x2: 430.8, y2: 409.8 },
];

/* ─── Nucleus cluster: deterministic packed ball of protons & neutrons ───
   Shells: 1 center + 6 octahedron (r 5.2) + 8 cube (r 8.6) + 12 icosahedron (r 11.2).
   Coordinates in cqw so the cluster scales with the scene. */
const PHI = 1.618034;
const ICO_N = Math.hypot(1, PHI);
const ICO: number[][] = [
  [0, 1, PHI], [0, 1, -PHI], [0, -1, PHI], [0, -1, -PHI],
  [1, PHI, 0], [1, -PHI, 0], [-1, PHI, 0], [-1, -PHI, 0],
  [PHI, 0, 1], [-PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, -1],
].map((v) => v.map((c) => c / ICO_N));
const OCT: number[][] = [
  [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1],
];
const CUBE: number[][] = [
  [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
  [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1],
].map((v) => v.map((c) => c * 0.57735));

/* Small deterministic jitter so the packing feels organic, not crystalline */
const jitter = (i: number, axis: number) =>
  Math.sin(i * 12.9898 + axis * 78.233) * 0.55;

type Nucleon = { x: number; y: number; z: number; d: number; kind: 'p' | 'n' };

const NUCLEONS: Nucleon[] = [
  { x: 0, y: 0, z: 0, d: 7.8, kind: 'n' },
  ...OCT.map<Nucleon>((v, i) => ({
    x: v[0] * 5.2 + jitter(i, 0), y: v[1] * 5.2 + jitter(i, 1), z: v[2] * 5.2 + jitter(i, 2),
    d: 7.1, kind: i % 5 < 2 ? 'p' : 'n',
  })),
  ...CUBE.map<Nucleon>((v, i) => ({
    x: v[0] * 8.6 + jitter(i + 6, 0), y: v[1] * 8.6 + jitter(i + 6, 1), z: v[2] * 8.6 + jitter(i + 6, 2),
    d: 6.7, kind: (i + 1) % 5 < 2 ? 'p' : 'n',
  })),
  ...ICO.map<Nucleon>((v, i) => ({
    x: v[0] * 11.2 + jitter(i + 14, 0), y: v[1] * 11.2 + jitter(i + 14, 1), z: v[2] * 11.2 + jitter(i + 14, 2),
    d: 6.3, kind: (i + 2) % 5 < 2 ? 'p' : 'n',
  })),
];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export default function AtomVisual3D() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  /* Hover parallax on the outer frame (suspended while dragging) */
  useEffect(() => {
    const scene = sceneRef.current;
    const tilt = tiltRef.current;
    if (!scene || !tilt) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;
    let running = false;

    const step = () => {
      current.x += (target.x - current.x) * 0.075;
      current.y += (target.y - current.y) * 0.075;
      tilt.style.setProperty('--tx', `${current.x.toFixed(3)}deg`);
      tilt.style.setProperty('--ty', `${current.y.toFixed(3)}deg`);
      if (Math.abs(target.x - current.x) > 0.01 || Math.abs(target.y - current.y) > 0.01) {
        raf = requestAnimationFrame(step);
      } else {
        running = false;
      }
    };
    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (draggingRef.current) return;
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      const r = scene.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      target.x = ny * -5;
      target.y = nx * 6;
      kick();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };

    scene.addEventListener('pointermove', onMove);
    scene.addEventListener('pointerleave', onLeave);
    return () => {
      scene.removeEventListener('pointermove', onMove);
      scene.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Grab-to-spin the atom core: drag rotation + inertia + slow auto-spin */
  useEffect(() => {
    const scene = sceneRef.current;
    const core = coreRef.current;
    if (!scene || !core) return;

    let urx = -10;
    let ury = -16;
    const apply = () => {
      core.style.setProperty('--urx', `${urx.toFixed(3)}deg`);
      core.style.setProperty('--ury', `${ury.toFixed(3)}deg`);
    };
    apply();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let vx = 0;
    let vy = 0;
    let lastX = 0;
    let lastY = 0;
    let raf = 0;

    const AUTO = 0.05; // deg per frame — idle rotation so the 3D reads instantly

    const loop = () => {
      if (!draggingRef.current) {
        ury += vy + AUTO;
        urx = clamp(urx + vx, -42, 42);
        vx *= 0.94;
        vy *= 0.94;
        apply();
      }
      raf = requestAnimationFrame(loop);
    };
    if (!reduced) raf = requestAnimationFrame(loop);

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      draggingRef.current = true;
      scene.classList.add('atom3d-scene--grabbing');
      lastX = e.clientX;
      lastY = e.clientY;
      vx = 0;
      vy = 0;
      scene.setPointerCapture(e.pointerId);
      if (e.pointerType === 'mouse') e.preventDefault();
    };

    const onDragMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      ury += dx * 0.35;
      urx = clamp(urx - dy * 0.35, -42, 42);
      vy = dx * 0.12;
      vx = clamp(-dy * 0.12, -1.6, 1.6);
      apply();
    };

    const endDrag = () => {
      draggingRef.current = false;
      scene.classList.remove('atom3d-scene--grabbing');
    };

    scene.addEventListener('pointerdown', onDown);
    scene.addEventListener('pointermove', onDragMove);
    scene.addEventListener('pointerup', endDrag);
    scene.addEventListener('pointercancel', endDrag);
    return () => {
      scene.removeEventListener('pointerdown', onDown);
      scene.removeEventListener('pointermove', onDragMove);
      scene.removeEventListener('pointerup', endDrag);
      scene.removeEventListener('pointercancel', endDrag);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={sceneRef} className="atom3d-scene w-full max-w-[560px] select-none" aria-label="Au — Gold, 3D atom yadrosi">
      <div className="atom3d-sway">
        <div ref={tiltRef} className="atom3d-tilt">

          {/* Ambient glow, deepest layer */}
          <div className="atom3d-glow" />

          {/* Dashed molecular bonds + core ring */}
          <svg className="atom3d-bonds" viewBox="0 0 540 540" fill="none" aria-hidden="true">
            <circle className="atom3d-core-ring" cx="270" cy="270" r="96" />
            {BONDS.map((b, i) => (
              <g key={i}>
                <line x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} />
                <circle className="atom3d-bond-dot" cx={b.x2} cy={b.y2} r="2.6" />
              </g>
            ))}
          </svg>

          {/* Halo behind the nucleus */}
          <div className="atom3d-nucleus-halo" />

          {/* ── Rotatable core: orbits + nucleus. Grab & spin. ── */}
          <div className="atom3d-corefloat">
            <div ref={coreRef} className="atom3d-core">

              {ORBITS.map((o, i) => (
                <div
                  key={i}
                  className="atom3d-orbit"
                  style={{ '--oz': o.oz, '--dur': o.dur, '--delay': o.delay, '--dir': o.dir, '--es': o.es, '--phase': o.phase, '--tf': o.tf } as CSSProperties}
                >
                  <div className="atom3d-ring" />
                  <div className="atom3d-spin">
                    <div className="atom3d-trail" />
                    <span className="atom3d-electron" />
                  </div>
                </div>
              ))}

              {/* Nucleus — packed protons (orange) & neutrons (warm silver) */}
              <div className="atom3d-nucleus" aria-hidden="true">
                {NUCLEONS.map((n, i) => (
                  <span
                    key={i}
                    className={`atom3d-nucl atom3d-nucl--${n.kind}`}
                    style={{
                      '--x': `${n.x.toFixed(2)}cqw`,
                      '--y': `${n.y.toFixed(2)}cqw`,
                      '--z': `${n.z.toFixed(2)}cqw`,
                      '--d': `${n.d}cqw`,
                    } as CSSProperties}
                  />
                ))}
              </div>

            </div>
          </div>

          {/* Element info tag */}
          <div className="atom3d-tag">
            <span className="atom3d-tag-mono">Au</span>
            <span className="atom3d-tag-col">
              <span className="atom3d-tag-name">GOLD</span>
              <span className="atom3d-tag-meta">79 · 196.967</span>
            </span>
          </div>

          {/* Floating satellite elements */}
          {SATELLITES.map((s) => (
            <div
              key={s.sym}
              className="atom3d-sat"
              style={{ left: s.left, top: s.top, '--sz': s.z, '--fd': s.fd, '--fdel': s.fdel, '--pop': s.pop } as CSSProperties}
            >
              <div className="atom3d-sat-pop">
                <div className="atom3d-sat-float">
                  <div className="atom3d-sat-chip">
                    <span className="atom3d-sat-num">{s.num}</span>
                    <span className="atom3d-sat-sym">{s.sym}</span>
                    <span className="atom3d-sat-mass">{s.mass}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Depth sparkles */}
          {SPARKS.map((sp, i) => (
            <span
              key={i}
              className={`atom3d-spark${sp.dot ? ' atom3d-spark--dot' : ''}`}
              style={{ left: sp.left, top: sp.top, '--sz': sp.z, '--ss': sp.ss, '--td': sp.td, '--tdel': sp.tdel } as CSSProperties}
            >
              {sp.dot ? '' : '+'}
            </span>
          ))}

        </div>
      </div>

      {/* Floor shadow — grounds the floating atom */}
      <div className="atom3d-ground" />
    </div>
  );
}
