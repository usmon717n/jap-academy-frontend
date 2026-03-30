export default function AboutPage() {
  return (
    <div className="px-4 py-16 max-w-4xl mx-auto animate-fade-slide">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-orange-600 text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full mb-4" style={{
          background: 'rgba(255,237,213,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(234,88,12,0.1)',
        }}>BIZ HAQIMIZDA</div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
          JAP <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Academy</span>
        </h1>
      </div>

      <div className="space-y-6">
        <div className="p-8 rounded-2xl" style={{
          background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.6)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        }}>
          <h2 className="text-lg font-extrabold mb-3 text-orange-700">Bizning maqsadimiz</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            JAP Academy kimyo fanini zamonaviy usulda o&apos;rgatishga ixtisoslashgan o&apos;quv markaz.
            Bizning maqsadimiz — har bir o&apos;quvchiga kimyo fanini tushunarli va qiziqarli qilib yetkazish.
            Individual yondashuv, kuchli o&apos;qituvchilar jamoasi va zamonaviy metodikalar orqali
            o&apos;quvchilarimiz eng yuqori natijalarga erishadilar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-8 rounded-2xl" style={{
            background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          }}>
            <div className="text-2xl mb-3">🎓</div>
            <h3 className="text-sm font-extrabold mb-2">Tajribali o&apos;qituvchilar</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Barcha o&apos;qituvchilarimiz oliy ma&apos;lumotli, 5 yildan ortiq tajribaga ega kimyo mutaxassislari.
            </p>
          </div>
          <div className="p-8 rounded-2xl" style={{
            background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          }}>
            <div className="text-2xl mb-3">📊</div>
            <h3 className="text-sm font-extrabold mb-2">Yuqori natijalar</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              O&apos;quvchilarimizning 95% dan ortig&apos;i kirish imtihonlaridan muvaffaqiyatli o&apos;tishadi.
            </p>
          </div>
          <div className="p-8 rounded-2xl" style={{
            background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          }}>
            <div className="text-2xl mb-3">👥</div>
            <h3 className="text-sm font-extrabold mb-2">Kichik guruhlar</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Har bir guruhda 8-12 ta o&apos;quvchi. Bu har biriga individual e&apos;tibor berishga imkon beradi.
            </p>
          </div>
          <div className="p-8 rounded-2xl" style={{
            background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          }}>
            <div className="text-2xl mb-3">🏠</div>
            <h3 className="text-sm font-extrabold mb-2">Qulay joylashuv</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              O&apos;quv markazimiz Toshkent shahrining markazida, metro bekatiga yaqin joylashgan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
