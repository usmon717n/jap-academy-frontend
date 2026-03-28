import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden" style={{
      background: 'rgba(255,255,255,0.4)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.5)',
    }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-0.5 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />
      <div className="relative max-w-6xl mx-auto px-4 pt-14 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex flex-col items-center justify-center text-white shadow-lg shadow-orange-500/20">
                <span className="text-[5px] opacity-60">001</span><span className="text-sm font-extrabold">Jp</span>
              </div>
              <div>
                <div className="text-sm font-extrabold text-stone-800">JAP ACADEMY</div>
                <div className="text-[7px] tracking-widest text-stone-400">KIMYO O&apos;QUV MARKAZI</div>
              </div>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">Kimyo faniga ixtisoslashgan zamonaviy o&apos;quv markaz.</p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold tracking-[3px] text-orange-600 mb-4">SAHIFALAR</h4>
            {[{ label: 'Asosiy', href: '/' }, { label: 'Testlar', href: '/tests' }, { label: 'Biz haqimizda', href: '/about' }, { label: 'Aloqa', href: '/contact' }].map((l) => (
              <Link key={l.href} href={l.href} className="block text-xs text-stone-500 mb-2.5 hover:text-orange-600 transition-colors">{l.label}</Link>
            ))}
          </div>
          <div>
            <h4 className="text-[10px] font-bold tracking-[3px] text-orange-600 mb-4">ALOQA</h4>
            <p className="text-xs text-stone-500 mb-2">+998 90 123 45 67</p>
            <p className="text-xs text-stone-500 mb-2">info@japacademy.uz</p>
            <p className="text-xs text-stone-500">Toshkent, O&apos;zbekiston</p>
          </div>
        </div>
        <div className="border-t border-orange-200/30 pt-5 text-center">
          <span className="text-[10px] text-stone-400 tracking-wider">JAP ACADEMY &copy; 2026. BARCHA HUQUQLAR HIMOYALANGAN</span>
        </div>
      </div>
    </footer>
  );
}
