'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export default function ContactPage() {
  const [form, setForm] = useState({ fullName: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handle = async () => {
    if (!form.fullName.trim() || !form.phone.trim()) { setError('Ism va telefon kiriting'); return; }
    setSending(true); setError('');
    try { await api.submitContact(form); setSent(true); setForm({ fullName:'', phone:'', message:'' }); } catch { setError('Xatolik. Qayta urinib ko\'ring.'); }
    setSending(false);
  };

  const inp = 'w-full px-4 py-3.5 rounded-xl text-sm transition-all focus:ring-2 focus:ring-orange-500/20';

  return (
    <div className="px-4 py-16 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex text-orange-600 text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full mb-4" style={{ background:'rgba(255,237,213,0.6)',border:'1px solid rgba(234,88,12,0.1)' }}>ALOQA</div>
        <h1 className="text-3xl md:text-4xl font-black">Kursga <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">yozilish</span></h1>
        <p className="text-sm text-stone-500 mt-3">Ma&apos;lumotlaringizni qoldiring</p>
      </div>
      <div className="max-w-lg mx-auto">
        {sent ? (
          <div className="text-center p-12 rounded-2xl" style={{ background:'rgba(255,255,255,0.55)',backdropFilter:'blur(16px)',border:'1px solid rgba(255,255,255,0.6)' }}>
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-xl font-black mb-2">Arizangiz qabul qilindi!</h2>
            <p className="text-sm text-stone-500">Tez orada bog&apos;lanamiz.</p>
            <button onClick={()=>setSent(false)} className="mt-6 text-xs text-orange-600 font-bold hover:underline">Yana ariza</button>
          </div>
        ) : (
          <div className="p-8 rounded-2xl" style={{ background:'rgba(255,255,255,0.55)',backdropFilter:'blur(16px)',border:'1px solid rgba(255,255,255,0.6)',boxShadow:'0 4px 20px rgba(0,0,0,0.04)' }}>
            <div className="space-y-4">
              <div><label className="text-[11px] text-stone-500 font-semibold block mb-1.5">To&apos;liq ism *</label><input value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})} placeholder="Ismingiz" className={inp} style={{background:'rgba(255,255,255,0.6)',border:'1.5px solid rgba(0,0,0,0.06)'}}/></div>
              <div><label className="text-[11px] text-stone-500 font-semibold block mb-1.5">Telefon *</label><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+998 90 123 45 67" className={inp} style={{background:'rgba(255,255,255,0.6)',border:'1.5px solid rgba(0,0,0,0.06)'}}/></div>
              <div><label className="text-[11px] text-stone-500 font-semibold block mb-1.5">Xabar</label><textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Qo'shimcha..." rows={3} className={`${inp} resize-none`} style={{background:'rgba(255,255,255,0.6)',border:'1.5px solid rgba(0,0,0,0.06)'}}/></div>
              {error && <div className="text-xs text-red-500">{error}</div>}
              <button onClick={handle} disabled={sending} className="btn-primary w-full py-4 rounded-xl text-white font-bold text-sm disabled:opacity-50">{sending?'...':'Ariza yuborish'}</button>
            </div>
            <div className="mt-8 pt-6 border-t border-orange-100/40">
              <div className="text-[10px] font-bold tracking-widest text-stone-400 mb-3">YOKI BOG&apos;LANING</div>
              <a href="tel:+998901234567" className="flex items-center gap-2 text-xs text-stone-600 hover:text-orange-600 mb-2">📞 +998 90 123 45 67</a>
              <a href="https://t.me/japacademy" target="_blank" className="flex items-center gap-2 text-xs text-stone-600 hover:text-orange-600">💬 @japacademy</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
