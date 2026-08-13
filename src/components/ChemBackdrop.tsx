/* Decorative molecular backdrop — structural formulas drawn as line art.
   Sits behind CTA content; masked so the centre stays readable. */

const hexPoints = (r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i);
    return `${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');

const HEX_46 = hexPoints(46);
const HEX_44 = hexPoints(44);

/* Vertices of a flat-top hexagon — bond anchor points */
const vertex = (r: number, i: number) => {
  const a = (Math.PI / 180) * (60 * i);
  return { x: r * Math.cos(a), y: r * Math.sin(a) };
};

/* Simple molecule: benzene ring + substituent bonds with terminal atoms */
function Benzene({
  x, y, s = 1, rot = 0, arms = [0, 2, 4], labels = [],
}: {
  x: number; y: number; s?: number; rot?: number; arms?: number[]; labels?: string[];
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${rot})`}>
      {arms.map((i, k) => {
        const v = vertex(46, i);
        const t = vertex(88, i);
        return (
          <g key={i}>
            <line x1={v.x} y1={v.y} x2={t.x} y2={t.y} className="chem-bond" />
            <circle cx={t.x} cy={t.y} r="4.5" className="chem-node" />
            {labels[k] && (
              <text x={t.x} y={t.y - 12} className="chem-label" textAnchor="middle">
                {labels[k]}
              </text>
            )}
          </g>
        );
      })}
      <polygon points={HEX_46} className="chem-ring" />
      <circle r="27" className="chem-aromatic" />
      {Array.from({ length: 6 }, (_, i) => {
        const v = vertex(46, i);
        return <circle key={i} cx={v.x} cy={v.y} r="3" className="chem-vertex" />;
      })}
    </g>
  );
}

/* Two fused rings — naphthalene skeleton */
function Fused({ x, y, s = 1, rot = 0 }: { x: number; y: number; s?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${rot})`}>
      <polygon points={HEX_44} className="chem-ring" />
      <polygon points={HEX_44} transform="translate(76 0)" className="chem-ring" />
      <circle r="25" className="chem-aromatic" />
      <circle cx="76" r="25" className="chem-aromatic" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const v = vertex(44, i);
        return <circle key={i} cx={v.x} cy={v.y} r="2.8" className="chem-vertex" />;
      })}
      {[0, 5, 4, 3].map((i) => {
        const v = vertex(44, i);
        return <circle key={`b${i}`} cx={v.x + 76} cy={v.y} r="2.8" className="chem-vertex" />;
      })}
    </g>
  );
}

/* Zig-zag carbon chain with a double bond and a terminal group */
function Chain({ x, y, s = 1, rot = 0 }: { x: number; y: number; s?: number; rot?: number }) {
  const pts = [
    [0, 0], [38, 22], [76, 0], [114, 22], [152, 0], [190, 22],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${rot})`}>
      <polyline points={pts.map((p) => p.join(',')).join(' ')} className="chem-bond" />
      {/* double bond marker */}
      <line x1="80" y1="6" x2="115" y2="27" className="chem-bond chem-bond--thin" />
      {pts.map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r={i === 0 || i === pts.length - 1 ? 5 : 3} className="chem-node" />
      ))}
      <text x="196" y="16" className="chem-label">OH</text>
    </g>
  );
}

export default function ChemBackdrop({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`chem-backdrop ${className}`}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Fade the artwork away from the centre so copy stays legible */}
        <radialGradient id="chemFade" cx="50%" cy="48%" r="64%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="36%" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="66%" stopColor="#fff" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#fff" stopOpacity="1" />
        </radialGradient>
        <mask id="chemMask">
          <rect width="1200" height="800" fill="url(#chemFade)" />
        </mask>

        {/* Hexagonal lattice, very faint */}
        <pattern id="chemLattice" width="84" height="145" patternUnits="userSpaceOnUse">
          <path
            d="M42 3 L79 24 L79 66 L42 87 L5 66 L5 24 Z M42 90 L79 111 L79 153 L42 174 L5 153 L5 111 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>

        <path id="chemPathA" d="M170 210 C 380 120, 520 300, 760 200 S 1040 300, 1090 180" />
        <path id="chemPathB" d="M120 620 C 330 700, 520 520, 760 640 S 1020 700, 1110 600" />
      </defs>

      <g mask="url(#chemMask)">
        {/* lattice wash */}
        <rect width="1200" height="800" fill="url(#chemLattice)" className="chem-lattice" />

        {/* long connecting bonds */}
        <use href="#chemPathA" className="chem-trace" />
        <use href="#chemPathB" className="chem-trace" />

        {/* molecules */}
        <Benzene x={168} y={208} s={1.05} arms={[1, 3, 5]} labels={['O', 'H', 'C']} />
        <Fused x={1002} y={172} s={0.92} rot={-12} />
        <Chain x={92} y={606} s={1.1} rot={-8} />
        <Benzene x={1082} y={646} s={1.15} rot={14} arms={[0, 2, 4]} labels={['N', '', 'O']} />
        <Benzene x={604} y={92} s={0.52} rot={-20} arms={[1, 4]} />
        <Fused x={520} y={734} s={0.5} rot={9} />

        {/* free-floating atoms */}
        <g className="chem-atoms">
          <circle cx="352" cy="368" r="5" />
          <circle cx="880" cy="418" r="4" />
          <circle cx="268" cy="470" r="3.5" />
          <circle cx="962" cy="286" r="3.5" />
          <circle cx="452" cy="176" r="3" />
          <circle cx="742" cy="672" r="4.5" />
        </g>

        {/* electrons travelling the bond traces */}
        <circle r="5" className="chem-spark">
          <animateMotion dur="14s" repeatCount="indefinite" rotate="auto">
            <mpath href="#chemPathA" />
          </animateMotion>
        </circle>
        <circle r="4" className="chem-spark chem-spark--b">
          <animateMotion dur="18s" repeatCount="indefinite" rotate="auto" begin="-6s">
            <mpath href="#chemPathB" />
          </animateMotion>
        </circle>
      </g>
    </svg>
  );
}
