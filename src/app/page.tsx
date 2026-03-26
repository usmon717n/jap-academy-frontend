import Link from 'next/link';

// Chemistry animation component — flask with bubbles, orbiting atoms, molecule structures
function ChemistryAnimation() {
  return (
    <div className="relative w-full h-full min-h-[400px]">
      {/* Glowing background orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-orange-400/20 to-amber-300/10 blur-3xl" />
      
      <svg viewBox="0 0 400 400" className="w-full h-full" style={{ filter: 'drop-shadow(0 4px 20px rgba(234,88,12,0.15))' }}>
        {/* Hexagonal grid background */}
        <defs>
          <pattern id="hexGrid" width="30" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
            <path d="M15 0L28 6.5V19.5L15 26L2 19.5V6.5Z" fill="none" stroke="#ea580c" strokeWidth="0.3" opacity="0.15"/>
          </pattern>
          <radialGradient id="flaskGrad" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.08"/>
          </radialGradient>
          <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.8"/>
          </linearGradient>
        </defs>
        
        <rect width="400" height="400" fill="url(#hexGrid)" opacity="0.5"/>
        
        {/* Central flask */}
        <g transform="translate(200,200)">
          {/* Flask body */}
          <path d="M-20,-80 L-20,-20 L-60,60 Q-65,80 -45,85 L45,85 Q65,80 60,60 L20,-20 L20,-80" 
            fill="url(#flaskGrad)" stroke="#ea580c" strokeWidth="1.5" opacity="0.9"/>
          {/* Flask neck */}
          <rect x="-20" y="-95" width="40" height="15" rx="3" fill="none" stroke="#ea580c" strokeWidth="1.5" opacity="0.7"/>
          {/* Liquid */}
          <path d="M-50,40 Q-30,30 0,35 Q30,40 50,35 L55,60 Q60,78 42,83 L-42,83 Q-60,78 -55,60 Z" 
            fill="url(#liquidGrad)">
            <animate attributeName="d" dur="3s" repeatCount="indefinite"
              values="M-50,40 Q-30,30 0,35 Q30,40 50,35 L55,60 Q60,78 42,83 L-42,83 Q-60,78 -55,60 Z;M-50,38 Q-20,45 0,38 Q20,30 50,38 L55,60 Q60,78 42,83 L-42,83 Q-60,78 -55,60 Z;M-50,40 Q-30,30 0,35 Q30,40 50,35 L55,60 Q60,78 42,83 L-42,83 Q-60,78 -55,60 Z"/>
          </path>
          
          {/* Bubbles in flask */}
          <circle cx="-10" cy="55" r="4" fill="#fb923c" opacity="0.4">
            <animate attributeName="cy" values="55;20;55" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="15" cy="65" r="3" fill="#fdba74" opacity="0.3">
            <animate attributeName="cy" values="65;25;65" dur="4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.3;0.05;0.3" dur="4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="0" cy="60" r="5" fill="#f97316" opacity="0.25">
            <animate attributeName="cy" values="60;15;60" dur="3.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.25;0.05;0.25" dur="3.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="-20" cy="70" r="2.5" fill="#fb923c" opacity="0.35">
            <animate attributeName="cy" values="70;30;70" dur="2.8s" repeatCount="indefinite"/>
          </circle>
        </g>
        
        {/* Orbiting electrons */}
        <g transform="translate(200,200)">
          <ellipse cx="0" cy="0" rx="120" ry="40" fill="none" stroke="#ea580c" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 4">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="15s" repeatCount="indefinite"/>
          </ellipse>
          <circle cx="120" cy="0" r="5" fill="#f97316" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="15s" repeatCount="indefinite"/>
          </circle>
          
          <ellipse cx="0" cy="0" rx="120" ry="40" fill="none" stroke="#fb923c" strokeWidth="0.5" opacity="0.15" strokeDasharray="4 4" transform="rotate(60)">
            <animateTransform attributeName="transform" type="rotate" values="60;420" dur="20s" repeatCount="indefinite"/>
          </ellipse>
          <circle cx="0" cy="0" r="4" fill="#fb923c" opacity="0.5" transform="rotate(60) translate(120,0)">
            <animateTransform attributeName="transform" type="rotate" values="60;420" dur="20s" repeatCount="indefinite"/>
          </circle>
          
          <ellipse cx="0" cy="0" rx="120" ry="40" fill="none" stroke="#fdba74" strokeWidth="0.5" opacity="0.12" strokeDasharray="4 4" transform="rotate(-60)">
            <animateTransform attributeName="transform" type="rotate" values="-60;300" dur="18s" repeatCount="indefinite"/>
          </ellipse>
        </g>
        
        {/* Floating molecules — top left */}
        <g transform="translate(70,80)" opacity="0.5">
          <circle cx="0" cy="0" r="8" fill="#ea580c" opacity="0.2">
            <animate attributeName="cy" values="0;-10;0" dur="5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="20" cy="-10" r="6" fill="#fb923c" opacity="0.15">
            <animate attributeName="cy" values="-10;-20;-10" dur="5s" repeatCount="indefinite"/>
          </circle>
          <line x1="0" y1="0" x2="20" y2="-10" stroke="#ea580c" strokeWidth="1" opacity="0.2">
            <animate attributeName="y2" values="-10;-20;-10" dur="5s" repeatCount="indefinite"/>
          </line>
        </g>
        
        {/* Floating molecule — bottom right */}
        <g transform="translate(320,320)" opacity="0.4">
          <circle cx="0" cy="0" r="7" fill="#f97316" opacity="0.25">
            <animate attributeName="cx" values="0;8;0" dur="6s" repeatCount="indefinite"/>
          </circle>
          <circle cx="-15" cy="12" r="5" fill="#fb923c" opacity="0.2">
            <animate attributeName="cx" values="-15;-8;-15" dur="6s" repeatCount="indefinite"/>
          </circle>
          <circle cx="15" cy="12" r="5" fill="#fdba74" opacity="0.2">
            <animate attributeName="cx" values="15;22;15" dur="6s" repeatCount="indefinite"/>
          </circle>
        </g>
        
        {/* Benzene ring — top right */}
        <g transform="translate(330,70)" opacity="0.25">
          <polygon points="0,-18 15,-9 15,9 0,18 -15,9 -15,-9" fill="none" stroke="#ea580c" strokeWidth="1.2">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="25s" repeatCount="indefinite"/>
          </polygon>
          <circle r="9" fill="none" stroke="#ea580c" strokeWidth="0.6">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="25s" repeatCount="indefinite"/>
          </circle>
        </g>
        
        {/* Element cards floating */}
        <g transform="translate(60,300)" opacity="0.6">
          <rect x="-18" y="-22" width="36" height="44" rx="4" fill="white" stroke="#ea580c" strokeWidth="0.8" opacity="0.8">
            <animate attributeName="y" values="-22;-28;-22" dur="4s" repeatCount="indefinite"/>
          </rect>
          <text x="0" y="-5" textAnchor="middle" fontSize="5" fill="#ea580c" opacity="0.5" fontWeight="600">
            <animate attributeName="y" values="-5;-11;-5" dur="4s" repeatCount="indefinite"/>8
          </text>
          <text x="0" y="8" textAnchor="middle" fontSize="14" fill="#ea580c" fontWeight="800">
            <animate attributeName="y" values="8;2;8" dur="4s" repeatCount="indefinite"/>O
          </text>
        </g>
        
        <g transform="translate(340,240)" opacity="0.5">
          <rect x="-16" y="-20" width="32" height="40" rx="4" fill="white" stroke="#f97316" strokeWidth="0.8" opacity="0.7">
            <animate attributeName="y" values="-20;-26;-20" dur="5s" repeatCount="indefinite"/>
          </rect>
          <text x="0" y="-4" textAnchor="middle" fontSize="5" fill="#f97316" opacity="0.5" fontWeight="600">
            <animate attributeName="y" values="-4;-10;-4" dur="5s" repeatCount="indefinite"/>6
          </text>
          <text x="0" y="8" textAnchor="middle" fontSize="13" fill="#f97316" fontWeight="800">
            <animate attributeName="y" values="8;2;8" dur="5s" repeatCount="indefinite"/>C
          </text>
        </g>
      </svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative px-4 py-12 md:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Left content */}
          <div className="flex-1 relative z-10">
            <div className="flex gap-1.5 mb-6">
              <div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600" />
              <div className="w-5 h-1.5 rounded-full bg-orange-400" />
              <div className="w-2.5 h-1.5 rounded-full bg-amber-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.08] mb-5">
              Kimyo fanini
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 bg-clip-text text-transparent">
                zamonaviy
              </span>{' '}usulda
              <br />
              o&apos;rganing
            </h1>
            <p className="text-sm md:text-base text-stone-500 leading-relaxed max-w-md mb-8">
              JAP Academy — kimyo faniga ixtisoslashgan o&apos;quv markaz. Interaktiv testlar,
              professional o&apos;qituvchilar va zamonaviy o&apos;quv dasturi bilan bilimingizni oshiring.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/tests"
                className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:from-orange-600 hover:to-orange-700 transition-all flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M15 2l-6.5 13a4.5 4.5 0 107.5 0L9.5 2"/><path d="M8.5 2h7"/></svg>
                Testlarni boshlash
                <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-full border-2 border-stone-200 text-sm font-bold hover:border-orange-300 hover:text-orange-600 transition-all flex items-center gap-2"
              >
                Kursga yozilish
              </Link>
            </div>
          </div>

          {/* Right — Chemistry animation */}
          <div className="flex-1 w-full max-w-md md:max-w-lg">
            <ChemistryAnimation />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 -mt-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex rounded-2xl overflow-hidden bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 glow-orange">
            {[
              { n: '500+', l: 'SAVOLLAR', c: 'from-orange-400 to-amber-400' },
              { n: '4+', l: 'MAVZULAR', c: 'from-emerald-400 to-teal-400' },
              { n: '1200+', l: 'TALABALAR', c: 'from-orange-300 to-orange-500' },
              { n: 'PDF', l: 'SERTIFIKAT', c: 'from-blue-400 to-indigo-400' },
            ].map((s, i) => (
              <div key={i} className={`flex-1 text-center py-6 ${i > 0 ? 'border-l border-white/5' : ''}`}>
                <div className={`text-xl md:text-2xl font-black bg-gradient-to-r ${s.c} bg-clip-text text-transparent`}>{s.n}</div>
                <div className="text-[9px] text-stone-500 mt-0.5 tracking-widest font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
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
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 p-10 md:p-14 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="ctaHex" width="40" height="35" patternUnits="userSpaceOnUse">
                    <path d="M20 0L37 8.5V26.5L20 35L3 26.5V8.5Z" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#ctaHex)"/>
              </svg>
            </div>
            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3">Hoziroq testlarni boshlang!</h3>
              <p className="text-sm text-orange-100 mb-6 max-w-md mx-auto">
                80 dan ortiq savollar, 4 ta mavzu va sertifikat sizni kutmoqda
              </p>
              <Link
                href="/tests"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-orange-600 font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
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
