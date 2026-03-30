'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface ResultImg { image: string; alt: string }
interface Student { name: string; desc: string; image: string }

export default function AboutPage() {
  const [results, setResults] = useState<ResultImg[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    api.getSiteContent().then((d: any) => {
      if (d.about_results) setResults(d.about_results);
      if (d.about_students) setStudents(d.about_students);
    }).catch(() => {});
  }, []);

  return (
    <div className="px-4 py-16 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex text-orange-600 text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full mb-4" style={{
          background: 'rgba(255,237,213,0.6)', border: '1px solid rgba(234,88,12,0.1)',
        }}>BIZ HAQIMIZDA</div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
          JAP <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Academy</span>
        </h1>
        <p className="text-sm text-stone-500 mt-3 max-w-lg mx-auto">Kimyo faniga ixtisoslashgan zamonaviy o&apos;quv markaz. Professional o&apos;qituvchilar, zamonaviy dastur va yuqori natijalar.</p>
      </div>

      {/* Results Slider — auto-scrolling left-to-right */}
      {results.length > 0 && (
        <div className="mb-16">
          <h2 className="text-lg font-extrabold mb-6 text-center">O&apos;quvchilarimiz natijalari</h2>
          <div className="relative overflow-hidden rounded-2xl" style={{
            background: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.4)',
          }}>
            <div className="flex gap-5 py-6 px-4 animate-scroll-left">
              {/* Double the images for infinite scroll effect */}
              {[...results, ...results, ...results].map((r, i) => (
                <div key={i} className="flex-shrink-0 w-72 h-48 rounded-xl overflow-hidden shadow-lg" style={{
                  boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                }}>
                  <img src={r.image} alt={r.alt} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Student Cards — 5 in a row */}
      {students.length > 0 && (
        <div className="mb-12">
          <h2 className="text-lg font-extrabold mb-6 text-center">Eng yaxshi o&apos;quvchilarimiz</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {students.map((s, i) => (
              <div key={i} className="card-hover p-5 rounded-2xl text-center group" style={{
                background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.6)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}>
                <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden ring-3 ring-orange-200/50 group-hover:ring-orange-400/50 transition-all duration-300">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-xs font-extrabold text-stone-800 mb-1">{s.name}</div>
                <div className="text-[10px] text-stone-500 leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* About text */}
      <div className="max-w-3xl mx-auto space-y-5">
        <div className="p-8 rounded-2xl" style={{ background:'rgba(255,255,255,0.55)',backdropFilter:'blur(16px)',border:'1px solid rgba(255,255,255,0.6)',boxShadow:'0 4px 20px rgba(0,0,0,0.04)' }}>
          <h2 className="text-lg font-extrabold mb-3 text-orange-700">Bizning maqsadimiz</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            JAP Academy kimyo fanini zamonaviy usulda o&apos;rgatishga ixtisoslashgan o&apos;quv markaz.
            Bizning maqsadimiz — har bir o&apos;quvchiga kimyo fanini tushunarli va qiziqarli qilib yetkazish.
            Individual yondashuv, kuchli o&apos;qituvchilar jamoasi va zamonaviy metodikalar orqali
            o&apos;quvchilarimiz eng yuqori natijalarga erishadilar.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[{i:'🎓',t:'Tajribali o\'qituvchilar',d:'5 yildan ortiq tajribaga ega mutaxassislar'},{i:'📊',t:'Yuqori natijalar',d:'95% o\'quvchilar imtihonlardan a\'lo o\'tadi'},{i:'👥',t:'Kichik guruhlar',d:'8-12 o\'quvchi — individual e\'tibor'},{i:'🏠',t:'Qulay joylashuv',d:'Metro bekatiga yaqin, Toshkent markazi'}].map((c,i)=>(
            <div key={i} className="p-6 rounded-2xl" style={{ background:'rgba(255,255,255,0.55)',backdropFilter:'blur(16px)',border:'1px solid rgba(255,255,255,0.6)',boxShadow:'0 4px 20px rgba(0,0,0,0.04)' }}>
              <div className="text-2xl mb-2">{c.i}</div>
              <div className="text-sm font-extrabold mb-1">{c.t}</div>
              <div className="text-xs text-stone-500">{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
