import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <section className="relative min-h-[90vh] flex items-center px-4">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 max-w-xl">
            <div className="flex gap-1.5 mb-6">
              <div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600" />
              <div className="w-5 h-1.5 rounded-full bg-orange-400" />
              <div className="w-2.5 h-1.5 rounded-full bg-amber-400" />
            </div>
            <h1 className="text-4xl md:text-[52px] font-black tracking-tight leading-[1.06] mb-6">
              Kimyo fanini<br />
              <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 bg-clip-text text-transparent">zamonaviy</span>{' '}usulda<br />o&apos;rganing
            </h1>
            <p className="text-base md:text-lg text-stone-500 leading-relaxed max-w-md mb-8">
              JAP Academy — kimyo faniga ixtisoslashgan o&apos;quv markaz. Professional o&apos;qituvchilar, zamonaviy dastur va individual yondashuv.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/contact" className="btn-primary px-8 py-4 rounded-full text-white text-sm font-bold flex items-center gap-2">Kursga yozilish <span>&rarr;</span></Link>
              <Link href="/about" className="btn-glass px-8 py-4 rounded-full text-sm font-bold text-stone-700">Batafsil</Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <svg viewBox="0 0 300 380" width="280" height="360" style={{ filter: 'drop-shadow(0 20px 40px rgba(234,88,12,0.12))' }}>
              <defs><linearGradient id="lG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fb923c" stopOpacity="0.6"/><stop offset="100%" stopColor="#ea580c" stopOpacity="0.85"/></linearGradient><linearGradient id="fG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fff7ed" stopOpacity="0.8"/><stop offset="100%" stopColor="#ffedd5" stopOpacity="0.4"/></linearGradient></defs>
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

      <section className="relative z-10 px-4 -mt-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
            {[{ n:'5+',l:'YILLIK TAJRIBA',c:'text-orange-600' },{ n:'200+',l:'O\'QUVCHILAR',c:'text-emerald-600' },{ n:'10+',l:'O\'QITUVCHILAR',c:'text-orange-500' },{ n:'95%',l:'NATIJA',c:'text-blue-600' }].map((s,i)=>(
              <div key={i} className={`flex-1 text-center py-7 ${i>0?'border-l border-white/40':''}`}>
                <div className={`text-xl md:text-2xl font-black ${s.c}`}>{s.n}</div>
                <div className="text-[9px] text-stone-400 mt-1 tracking-widest font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex text-orange-600 text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full mb-4" style={{ background:'rgba(255,237,213,0.6)',border:'1px solid rgba(234,88,12,0.1)' }}>NIMA UCHUN BIZ</div>
          <h2 className="text-2xl md:text-3xl font-black">Kimyoni <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">o&apos;rganishning</span> eng yaxshi yo&apos;li</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[{t:'Individual yondashuv',d:'Har bir o\'quvchiga alohida e\'tibor',i:'🎯',a:'#ea580c'},{t:'Professional jamoasi',d:'Tajribali kimyo mutaxassislari',i:'👨‍🔬',a:'#2563eb'},{t:'Zamonaviy dastur',d:'Eng so\'nggi o\'quv dasturi',i:'📚',a:'#16a34a'},{t:'Yuqori natijalar',d:'95% o\'quvchilar a\'lo natija',i:'🏆',a:'#7c3aed'}].map((f,i)=>(
            <div key={i} className="card-hover p-6 rounded-2xl relative overflow-hidden group" style={{ background:'rgba(255,255,255,0.55)',backdropFilter:'blur(16px)',border:'1px solid rgba(255,255,255,0.6)',boxShadow:'0 4px 20px rgba(0,0,0,0.04)' }}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{background:`radial-gradient(circle at top right,${f.a}15,transparent 70%)`}}/>
              <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" style={{background:`linear-gradient(90deg,transparent,${f.a}40,transparent)`}}/>
              <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">{f.i}</div>
              <div className="text-sm font-extrabold mb-1.5 group-hover:text-orange-700 transition-colors">{f.t}</div>
              <div className="text-xs text-stone-500 leading-relaxed">{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center" style={{ background:'linear-gradient(135deg,rgba(234,88,12,0.12),rgba(251,146,60,0.08),rgba(245,158,11,0.1))',backdropFilter:'blur(20px)',border:'1px solid rgba(234,88,12,0.15)' }}>
            <h3 className="text-2xl md:text-3xl font-black text-stone-800 mb-4">Hoziroq kursga yoziling!</h3>
            <p className="text-sm text-stone-500 mb-8 max-w-md mx-auto">Professional o&apos;qituvchilar jamoasi sizni kutmoqda. Birinchi dars bepul!</p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-sm">Yozilish &rarr;</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
