export default function AboutPage() {
  return (
    <div className="px-4 py-12 max-w-3xl mx-auto animate-fade-slide">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full mb-4">BIZ HAQIMIZDA</div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
          JAP Academy — kimyo <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">dunyosiga</span> yo&apos;l
        </h1>
        <p className="text-sm text-stone-500 leading-relaxed max-w-lg mx-auto">
          Bizning maqsadimiz — har bir o&apos;quvchiga kimyo fanini tushunarli va qiziqarli tarzda o&apos;rgatish.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { n: '5+', l: 'Yillik tajriba', c: 'from-orange-500 to-orange-600' },
          { n: '1200+', l: 'Bitiruvchilar', c: 'from-blue-500 to-indigo-500' },
          { n: '95%', l: 'Muvaffaqiyat', c: 'from-emerald-500 to-teal-500' },
          { n: '25+', l: 'Mavzular', c: 'from-amber-500 to-orange-500' },
        ].map((s, i) => (
          <div key={i} className="card-hover p-5 rounded-2xl bg-white border border-stone-100 text-center">
            <div className={`text-3xl font-black bg-gradient-to-r ${s.c} bg-clip-text text-transparent`}>{s.n}</div>
            <div className="text-xs text-stone-500 mt-1">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="relative rounded-2xl bg-gradient-to-br from-stone-900 to-stone-800 p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-bl-full" />
        <div className="relative">
          <div className="text-lg font-extrabold text-white mb-3">Bizning missiyamiz</div>
          <p className="text-sm text-stone-400 leading-relaxed">
            Har bir o&apos;quvchiga sifatli kimyo ta&apos;limi berish, ularni oliy ta&apos;lim muassasalariga
            kirish imtihonlariga tayyorlash va kimyo faniga bo&apos;lgan qiziqishlarini oshirish. Biz interaktiv
            o&apos;qitish metodlaridan foydalanib, nazariy bilimlarni amaliyot bilan uyg&apos;unlashtiramiz.
          </p>
        </div>
      </div>
    </div>
  );
}
