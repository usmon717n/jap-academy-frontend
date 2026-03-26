import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-stone-900 text-stone-50 mt-16 overflow-hidden">
      {/* Hex pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="footerHex" width="40" height="35" patternUnits="userSpaceOnUse">
              <path d="M20 0L37 8.5V26.5L20 35L3 26.5V8.5Z" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerHex)"/>
        </svg>
      </div>

      {/* Orange glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 pt-14 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-11 rounded-lg bg-gradient-to-br from-orange-500 to-orange-700 flex flex-col items-center justify-center text-white shadow-lg shadow-orange-500/20">
                <span className="text-[5px] opacity-60">001</span>
                <span className="text-sm font-extrabold">Jp</span>
              </div>
              <div>
                <div className="text-sm font-extrabold">JAP ACADEMY</div>
                <div className="text-[7px] tracking-widest text-stone-500">KIMYO O&apos;QUV MARKAZI</div>
              </div>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Kimyo faniga ixtisoslashgan zamonaviy o&apos;quv markaz. 2026-yildan beri.
            </p>
            {/* Social icons placeholder */}
            <div className="flex gap-2 mt-4">
              {['T', 'I', 'Y'].map((s) => (
                <div key={s} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-stone-500 hover:bg-orange-500/20 hover:text-orange-400 transition-colors cursor-pointer">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[3px] text-orange-500 mb-4">SAHIFALAR</h4>
            {[
              { label: 'Asosiy', href: '/' },
              { label: 'Testlar', href: '/tests' },
              { label: 'Biz haqimizda', href: '/about' },
              { label: 'Aloqa', href: '/contact' },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="block text-xs text-stone-400 mb-2.5 hover:text-orange-400 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[3px] text-orange-500 mb-4">ALOQA</h4>
            <div className="space-y-2.5">
              <p className="text-xs text-stone-400 flex items-center gap-2">
                <span className="text-orange-500/60">✆</span> +998 90 123 45 67
              </p>
              <p className="text-xs text-stone-400 flex items-center gap-2">
                <span className="text-orange-500/60">✉</span> info@japacademy.uz
              </p>
              <p className="text-xs text-stone-400 flex items-center gap-2">
                <span className="text-orange-500/60">◎</span> Toshkent, O&apos;zbekiston
              </p>
            </div>
          </div>

          {/* Tech */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[3px] text-orange-500 mb-4">TEXNOLOGIYALAR</h4>
            <div className="flex flex-wrap gap-1.5">
              {['Next.js', 'NestJS', 'PostgreSQL', 'Vercel', 'Railway'].map((t) => (
                <span key={t} className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-stone-500 border border-white/5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="text-[10px] text-stone-600 tracking-wider">
            JAP ACADEMY &copy; 2026. BARCHA HUQUQLAR HIMOYALANGAN
          </span>
          <Link href="/admin" className="text-[10px] text-stone-700 hover:text-orange-500 transition-colors">
            Admin panel
          </Link>
        </div>
      </div>
    </footer>
  );
}
