import Link from 'next/link';

function FloatingBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Base gradient */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #fef3e2 0%, #fde8d0 25%, #fce4cc 50%, #fdf0e0 75%, #fefaf4 100%)',
      }} />

      {/* Blob 1 — large warm orange */}
      <div style={{
        position: 'absolute', width: '60vw', height: '60vw', maxWidth: '800px', maxHeight: '800px',
        top: '-10%', right: '-15%',
        background: 'radial-gradient(circle, rgba(251,146,60,0.35) 0%, rgba(251,146,60,0.08) 50%, transparent 70%)',
        borderRadius: '40% 60% 55% 45% / 50% 40% 60% 50%',
        animation: 'blob1 20s ease-in-out infinite',
        filter: 'blur(40px)',
      }} />

      {/* Blob 2 — soft peach/coral */}
      <div style={{
        position: 'absolute', width: '50vw', height: '50vw', maxWidth: '700px', maxHeight: '700px',
        bottom: '-20%', left: '-10%',
        background: 'radial-gradient(circle, rgba(234,88,12,0.2) 0%, rgba(249,115,22,0.06) 50%, transparent 70%)',
        borderRadius: '55% 45% 40% 60% / 45% 55% 45% 55%',
        animation: 'blob2 25s ease-in-out infinite',
        filter: 'blur(50px)',
      }} />

      {/* Blob 3 — subtle amber center */}
      <div style={{
        position: 'absolute', width: '45vw', height: '45vw', maxWidth: '600px', maxHeight: '600px',
        top: '30%', left: '25%',
        background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, rgba(251,191,36,0.05) 50%, transparent 70%)',
        borderRadius: '45% 55% 50% 50% / 55% 45% 55% 45%',
        animation: 'blob3 22s ease-in-out infinite',
        filter: 'blur(45px)',
      }} />

      {/* Blob 4 — faint rose/warm tint */}
      <div style={{
        position: 'absolute', width: '40vw', height: '40vw', maxWidth: '550px', maxHeight: '550px',
        top: '10%', left: '50%',
        background: 'radial-gradient(circle, rgba(251,113,133,0.1) 0%, rgba(253,164,175,0.04) 50%, transparent 70%)',
        borderRadius: '50% 50% 45% 55% / 40% 60% 40% 60%',
        animation: 'blob4 28s ease-in-out infinite',
        filter: 'blur(55px)',
      }} />

      {/* Blob 5 — deep orange accent small */}
      <div style={{
        position: 'absolute', width: '30vw', height: '30vw', maxWidth: '400px', maxHeight: '400px',
        bottom: '10%', right: '20%',
        background: 'radial-gradient(circle, rgba(234,88,12,0.18) 0%, rgba(249,115,22,0.04) 50%, transparent 70%)',
        borderRadius: '60% 40% 50% 50% / 50% 50% 40% 60%',
        animation: 'blob5 18s ease-in-out infinite',
        filter: 'blur(35px)',
      }} />

      {/* Very subtle noise texture overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        opacity: 0.4,
      }} />
    </div>
  );
}

function ChemistryElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 800 700" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.08 }}>
        {/* Hexagonal pattern */}
        <defs>
          <pattern id="hexP" width="60" height="52" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
            <path d="M30 0L56 13L56 39L30 52L4 39L4 13Z" fill="none" stroke="#9a3412" strokeWidth="0.4"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexP)"/>
      </svg>

      {/* Floating molecule structures */}
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 800 700" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.12 }}>
        {/* Water molecule */}
        <g>
          <circle cx="650" cy="120" r="7" fill="#ea580c" opacity="0.3">
            <animate attributeName="cy" values="120;140;120" dur="7s" repeatCount="indefinite"/>
          </circle>
          <circle cx="630" cy="100" r="5" fill="#f97316" opacity="0.2">
            <animate attributeName="cy" values="100;120;100" dur="7s" repeatCount="indefinite"/>
          </circle>
          <circle cx="670" cy="100" r="5" fill="#f97316" opacity="0.2">
            <animate attributeName="cy" values="100;120;100" dur="7s" repeatCount="indefinite"/>
          </circle>
          <line x1="650" y1="120" x2="630" y2="100" stroke="#ea580c" strokeWidth="0.8" opacity="0.15">
            <animate attributeName="y1" values="120;140;120" dur="7s" repeatCount="indefinite"/>
            <animate attributeName="y2" values="100;120;100" dur="7s" repeatCount="indefinite"/>
          </line>
          <line x1="650" y1="120" x2="670" y2="100" stroke="#ea580c" strokeWidth="0.8" opacity="0.15">
            <animate attributeName="y1" values="120;140;120" dur="7s" repeatCount="indefinite"/>
            <animate attributeName="y2" values="100;120;100" dur="7s" repeatCount="indefinite"/>
          </line>
        </g>

        {/* Benzene ring */}
        <g transform="translate(130,520)" opacity="0.2">
          <polygon points="0,-22 19,-11 19,11 0,22 -19,11 -19,-11" fill="none" stroke="#c2410c" strokeWidth="1">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="35s" repeatCount="indefinite"/>
          </polygon>
          <circle r="11" fill="none" stroke="#c2410c" strokeWidth="0.5">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="35s" repeatCount="indefinite"/>
          </circle>
        </g>

        {/* Orbital ellipses */}
        <ellipse cx="400" cy="600" rx="80" ry="25" fill="none" stroke="#ea580c" strokeWidth="0.4" opacity="0.15" strokeDasharray="4 4">
          <animateTransform attributeName="transform" type="rotate" values="0 400 600;360 400 600" dur="20s" repeatCount="indefinite"/>
        </ellipse>

        {/* Floating atoms */}
        <circle cx="100" cy="200" r="4" fill="#f97316" opacity="0.15">
          <animate attributeName="cy" values="200;180;200" dur="9s" repeatCount="indefinite"/>
        </circle>
        <circle cx="720" cy="450" r="5" fill="#ea580c" opacity="0.1">
          <animate attributeName="cx" values="720;700;720" dur="11s" repeatCount="indefinite"/>
        </circle>
        <circle cx="300" cy="80" r="3" fill="#fb923c" opacity="0.12">
          <animate attributeName="cy" values="80;95;80" dur="8s" repeatCount="indefinite"/>
        </circle>

        {/* Element cards */}
        <g transform="translate(700,350)" opacity="0.35">
          <rect x="-16" y="-20" width="32" height="40" rx="4" fill="white" stroke="#ea580c" strokeWidth="0.6" opacity="0.6">
            <animate attributeName="y" values="-20;-28;-20" dur="6s" repeatCount="indefinite"/>
          </rect>
          <text x="0" y="6" textAnchor="middle" fontSize="13" fill="#ea580c" fontWeight="800" fontFamily="system-ui">
            <animate attributeName="y" values="6;-2;6" dur="6s" repeatCount="indefinite"/>O
          </text>
        </g>

        <g transform="translate(80,400)" opacity="0.25">
          <rect x="-14" y="-18" width="28" height="36" rx="4" fill="white" stroke="#f97316" strokeWidth="0.5" opacity="0.5">
            <animate attributeName="y" values="-18;-25;-18" dur="8s" repeatCount="indefinite"/>
          </rect>
          <text x="0" y="5" textAnchor="middle" fontSize="12" fill="#f97316" fontWeight="800" fontFamily="system-ui">
            <animate attributeName="y" values="5;-2;5" dur="8s" repeatCount="indefinite"/>C
          </text>
        </g>
      </svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      <style>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); border-radius: 40% 60% 55% 45% / 50% 40% 60% 50%; }
          25% { transform: translate(30px, -40px) scale(1.05) rotate(3deg); border-radius: 50% 50% 45% 55% / 45% 55% 50% 50%; }
          50% { transform: translate(-20px, 20px) scale(0.95) rotate(-2deg); border-radius: 45% 55% 50% 50% / 55% 45% 45% 55%; }
          75% { transform: translate(15px, 35px) scale(1.02) rotate(1deg); border-radius: 55% 45% 40% 60% / 50% 50% 55% 45%; }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(40px, -30px) scale(1.08) rotate(-3deg); }
          66% { transform: translate(-25px, 40px) scale(0.92) rotate(2deg); }
        }
        @keyframes blob3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-35px, 20px) scale(1.06); }
          50% { transform: translate(25px, -25px) scale(0.94); }
          75% { transform: translate(15px, 30px) scale(1.03); }
        }
        @keyframes blob4 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(-40px, 30px) scale(1.1) rotate(-4deg); }
        }
        @keyframes blob5 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -35px) scale(1.07); }
          66% { transform: translate(-30px, 15px) scale(0.93); }
        }
      `}</style>

      {/* Hero with floating blobs */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <FloatingBlobs />
        <ChemistryElements />

        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full flex flex-col md:flex-row items-center gap-8">
          {/* Left content */}
          <div className="flex-1 max-w-xl">
            <div className="flex gap-1.5 mb-6">
              <div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600" />
              <div className="w-5 h-1.5 rounded-full bg-orange-400" />
              <div className="w-2.5 h-1.5 rounded-full bg-amber-400" />
            </div>
            <h1 className="text-4xl md:text-[52px] font-black tracking-tight leading-[1.06] mb-6">
              Kimyo fanini
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 bg-clip-text text-transparent">
                zamonaviy
              </span>{' '}usulda
              <br />
              o&apos;rganing
            </h1>
            <p className="text-base md:text-lg text-stone-500 leading-relaxed max-w-md mb-8">
              JAP Academy — kimyo faniga ixtisoslashgan o&apos;quv markaz. Interaktiv testlar,
              professional o&apos;qituvchilar va zamonaviy dastur.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/tests"
                className="group px-8 py-4 rounded-full bg-stone-900 text-white text-sm font-bold shadow-xl shadow-stone-900/20 hover:shadow-stone-900/30 hover:bg-stone-800 transition-all flex items-center gap-2"
              >
                Testlarni boshlash
                <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-white/60 backdrop-blur-sm border border-stone-200/60 text-sm font-bold hover:bg-white/80 transition-all"
              >
                Kursga yozilish
              </Link>
            </div>
          </div>

          {/* Right — Large flask illustration */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <svg viewBox="0 0 300 380" width="280" height="360" style={{ filter: 'drop-shadow(0 20px 40px rgba(234,88,12,0.12))' }}>
                <defs>
                  <linearGradient id="liqG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb923c" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#ea580c" stopOpacity="0.85"/>
                  </linearGradient>
                  <linearGradient id="flaskG" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fff7ed" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#ffedd5" stopOpacity="0.4"/>
                  </linearGradient>
                </defs>

                {/* Flask body */}
                <path d="M110 60V160L40 300C35 315 45 330 60 330H240C255 330 265 315 260 300L190 160V60"
                  fill="url(#flaskG)" stroke="#ea580c" strokeWidth="1.5" strokeOpacity="0.3"/>
                {/* Flask neck */}
                <rect x="110" y="30" width="80" height="30" rx="4" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeOpacity="0.3"/>

                {/* Liquid with wave animation */}
                <path d="M65 250 Q110 235 150 245 Q190 255 235 240 L255 300C260 312 252 325 240 325H60C48 325 40 312 45 300Z"
                  fill="url(#liqG)">
                  <animate attributeName="d" dur="4s" repeatCount="indefinite"
                    values="M65 250 Q110 235 150 245 Q190 255 235 240 L255 300C260 312 252 325 240 325H60C48 325 40 312 45 300Z;
                            M65 245 Q100 258 150 248 Q200 238 235 248 L255 300C260 312 252 325 240 325H60C48 325 40 312 45 300Z;
                            M65 250 Q110 235 150 245 Q190 255 235 240 L255 300C260 312 252 325 240 325H60C48 325 40 312 45 300Z"/>
                </path>

                {/* Bubbles */}
                <circle cx="120" cy="290" r="5" fill="#fb923c" opacity="0.4">
                  <animate attributeName="cy" values="290;230;290" dur="3.5s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.4;0.05;0.4" dur="3.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="170" cy="300" r="4" fill="#fdba74" opacity="0.3">
                  <animate attributeName="cy" values="300;220;300" dur="4.5s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.3;0.03;0.3" dur="4.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="145" cy="310" r="6" fill="#f97316" opacity="0.2">
                  <animate attributeName="cy" values="310;240;310" dur="3s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.2;0.02;0.2" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="195" cy="295" r="3.5" fill="#fb923c" opacity="0.35">
                  <animate attributeName="cy" values="295;245;295" dur="3.8s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.35;0.04;0.35" dur="3.8s" repeatCount="indefinite"/>
                </circle>
                <circle cx="100" cy="280" r="3" fill="#fdba74" opacity="0.25">
                  <animate attributeName="cy" values="280;235;280" dur="4.2s" repeatCount="indefinite"/>
                </circle>

                {/* Steam/vapor */}
                <circle cx="140" cy="20" r="8" fill="#f97316" opacity="0.06">
                  <animate attributeName="cy" values="20;5;20" dur="5s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.06;0.01;0.06" dur="5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="160" cy="15" r="6" fill="#fb923c" opacity="0.04">
                  <animate attributeName="cy" values="15;0;15" dur="6s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-4 -mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex rounded-2xl overflow-hidden bg-stone-900 shadow-2xl shadow-stone-900/20">
            {[
              { n: '500+', l: 'SAVOLLAR', c: 'from-orange-400 to-amber-400' },
              { n: '4+', l: 'MAVZULAR', c: 'from-emerald-400 to-teal-400' },
              { n: '1200+', l: 'TALABALAR', c: 'from-orange-300 to-orange-500' },
              { n: 'PDF', l: 'SERTIFIKAT', c: 'from-blue-400 to-indigo-400' },
            ].map((s, i) => (
              <div key={i} className={`flex-1 text-center py-7 ${i > 0 ? 'border-l border-white/5' : ''}`}>
                <div className={`text-xl md:text-2xl font-black bg-gradient-to-r ${s.c} bg-clip-text text-transparent`}>{s.n}</div>
                <div className="text-[9px] text-stone-500 mt-1 tracking-widest font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full mb-4">
            NIMA UCHUN BIZ
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">
            Kimyoni <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">o&apos;rganishning</span> eng yaxshi yo&apos;li
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: 'Interaktiv testlar', desc: "Har bir mavzudan 20 ta savol, tezkor natija va tahlil", icon: '⚗️', gradient: 'from-orange-500/10 to-amber-500/5' },
            { title: "Professional o'qituvchilar", desc: 'Tajribali kimyo fani mutaxassislari jamoasi', icon: '👨‍🔬', gradient: 'from-blue-500/10 to-indigo-500/5' },
            { title: 'Sertifikat', desc: "Test yakunida rasmiy sertifikat yuklab oling", icon: '📜', gradient: 'from-emerald-500/10 to-teal-500/5' },
            { title: 'Kunlik eslatmalar', desc: 'Har kuni test yechish vaqti haqida bildirishnoma', icon: '🔔', gradient: 'from-purple-500/10 to-pink-500/5' },
          ].map((f, i) => (
            <div key={i} className={`card-hover p-6 rounded-2xl bg-gradient-to-br ${f.gradient} border border-stone-100/80 relative overflow-hidden group`}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-orange-500/5 to-transparent rounded-bl-full" />
              <div className="text-2xl mb-3">{f.icon}</div>
              <div className="text-sm font-extrabold mb-1.5">{f.title}</div>
              <div className="text-xs text-stone-500 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden" style={{
            background: 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #1c1917 100%)',
          }}>
            {/* Subtle blob inside CTA */}
            <div className="absolute top-0 right-0 w-64 h-64" style={{
              background: 'radial-gradient(circle, rgba(234,88,12,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }} />
            <div className="absolute bottom-0 left-0 w-48 h-48" style={{
              background: 'radial-gradient(circle, rgba(251,146,60,0.1) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }} />

            <div className="relative z-10 text-center p-12 md:p-16">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Hoziroq testlarni boshlang!</h3>
              <p className="text-sm text-stone-400 mb-8 max-w-md mx-auto leading-relaxed">
                80 dan ortiq savollar, 4 ta mavzu va sertifikat sizni kutmoqda
              </p>
              <Link
                href="/tests"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 transition-all"
              >
                Boshlash
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
