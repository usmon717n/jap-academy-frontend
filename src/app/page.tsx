import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center px-4">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-8">
          {/* Left */}
          <div className="flex-1 max-w-xl">
            <div className="flex gap-1.5 mb-6">
              <div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600" />
              <div className="w-5 h-1.5 rounded-full bg-orange-400" />
              <div className="w-2.5 h-1.5 rounded-full bg-amber-400" />
            </div>
            <h1 className="text-4xl md:text-[52px] font-black tracking-tight leading-[1.06] mb-6">
              Kimyo fanini<br />
              <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 bg-clip-text text-transparent">
                zamonaviy
              </span>{' '}usulda<br />
              o&apos;rganing
            </h1>
            <p className="text-base md:text-lg text-stone-500 leading-relaxed max-w-md mb-8">
              JAP Academy — kimyo faniga ixtisoslashgan o&apos;quv markaz. Interaktiv testlar,
              professional o&apos;qituvchilar va zamonaviy dastur.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/tests"
                className="group px-8 py-4 rounded-full bg-stone-900 text-white text-sm font-bold shadow-xl shadow-stone-900/20 hover:shadow-stone-900/30 hover:bg-stone-800 transition-all flex items-center gap-2">
                Testlarni boshlash
                <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </Link>
              <Link href="/contact"
                className="px-8 py-4 rounded-full glass border border-stone-200/60 text-sm font-bold hover:bg-white/80 transition-all">
                Kursga yozilish
              </Link>
            </div>
          </div>

          {/* Right — Flask */}
          <div className="flex-1 flex justify-center">
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
              <path d="M110 60V160L40 300C35 315 45 330 60 330H240C255 330 265 315 260 300L190 160V60"
                fill="url(#flaskG)" stroke="#ea580c" strokeWidth="1.5" strokeOpacity="0.3"/>
              <rect x="110" y="30" width="80" height="30" rx="4" fill="none" stroke="#ea580c" strokeWidth="1.5" strokeOpacity="0.3"/>
              <path d="M65 250 Q110 235 150 245 Q190 255 235 240 L255 300C260 312 252 325 240 325H60C48 325 40 312 45 300Z" fill="url(#liqG)">
                <animate attributeName="d" dur="4s" repeatCount="indefinite"
                  values="M65 250 Q110 235 150 245 Q190 255 235 240 L255 300C260 312 252 325 240 325H60C48 325 40 312 45 300Z;M65 245 Q100 258 150 248 Q200 238 235 248 L255 300C260 312 252 325 240 325H60C48 325 40 312 45 300Z;M65 250 Q110 235 150 245 Q190 255 235 240 L255 300C260 312 252 325 240 325H60C48 325 40 312 45 300Z"/>
              </path>
              <circle cx="120" cy="290" r="5" fill="#fb923c" opacity="0.4"><animate attributeName="cy" values="290;230;290" dur="3.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.4;0.05;0.4" dur="3.5s" repeatCount="indefinite"/></circle>
              <circle cx="170" cy="300" r="4" fill="#fdba74" opacity="0.3"><animate attributeName="cy" values="300;220;300" dur="4.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.3;0.03;0.3" dur="4.5s" repeatCount="indefinite"/></circle>
              <circle cx="145" cy="310" r="6" fill="#f97316" opacity="0.2"><animate attributeName="cy" values="310;240;310" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.2;0.02;0.2" dur="3s" repeatCount="indefinite"/></circle>
              <circle cx="195" cy="295" r="3.5" fill="#fb923c" opacity="0.35"><animate attributeName="cy" values="295;245;295" dur="3.8s" repeatCount="indefinite"/></circle>
            </svg>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-4 -mt-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex rounded-2xl overflow-hidden bg-stone-900/95 backdrop-blur-sm shadow-2xl shadow-stone-900/20">
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
          <div className="inline-flex items-center gap-2 bg-orange-100/60 backdrop-blur-sm text-orange-600 text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full mb-4">
            NIMA UCHUN BIZ
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">
            Kimyoni <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">o&apos;rganishning</span> eng yaxshi yo&apos;li
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: 'Interaktiv testlar', desc: "Har bir mavzudan 20 ta savol, tezkor natija va tahlil", icon: '⚗️', g: 'from-orange-500/10 to-amber-500/5' },
            { title: "Professional o'qituvchilar", desc: 'Tajribali kimyo fani mutaxassislari jamoasi', icon: '👨‍🔬', g: 'from-blue-500/10 to-indigo-500/5' },
            { title: 'Sertifikat', desc: "Test yakunida rasmiy sertifikat yuklab oling", icon: '📜', g: 'from-emerald-500/10 to-teal-500/5' },
            { title: 'Kunlik eslatmalar', desc: 'Har kuni test yechish vaqti haqida bildirishnoma', icon: '🔔', g: 'from-purple-500/10 to-pink-500/5' },
          ].map((f, i) => (
            <div key={i} className={`card-hover p-6 rounded-2xl bg-gradient-to-br ${f.g} border border-white/40 backdrop-blur-sm relative overflow-hidden`}>
              <div className="text-2xl mb-3">{f.icon}</div>
              <div className="text-sm font-extrabold mb-1.5">{f.title}</div>
              <div className="text-xs text-stone-500 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-stone-900/95 backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-64 h-64" style={{ background: 'radial-gradient(circle, rgba(234,88,12,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <div className="absolute bottom-0 left-0 w-48 h-48" style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.1) 0%, transparent 70%)', filter: 'blur(30px)' }} />
            <div className="relative z-10 text-center p-12 md:p-16">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Hoziroq testlarni boshlang!</h3>
              <p className="text-sm text-stone-400 mb-8 max-w-md mx-auto">80 dan ortiq savollar, 4 ta mavzu va sertifikat sizni kutmoqda</p>
              <Link href="/tests"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 transition-all">
                Boshlash &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
