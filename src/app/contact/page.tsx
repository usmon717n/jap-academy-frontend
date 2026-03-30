'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export default function ContactPage() {
  const [form, setForm] = useState({ fullName: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!form.fullName.trim() || !form.phone.trim()) {
      setError('Ism va telefon raqamni kiriting');
      return;
    }
    setSending(true); setError('');
    try {
      await api.submitContact(form);
      setSent(true);
      setForm({ fullName: '', phone: '', message: '' });
    } catch {
      setError('Xatolik yuz berdi. Qayta urinib ko\'ring.');
    }
    setSending(false);
  };

  const inputCls = 'w-full px-4 py-3.5 rounded-xl text-sm transition-all duration-300 focus:ring-2 focus:ring-orange-500/20' ;

  return (
    <div className="px-4 py-16 max-w-4xl mx-auto animate-fade-slide">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-orange-600 text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full mb-4" style={{
          background: 'rgba(255,237,213,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(234,88,12,0.1)',
        }}>ALOQA</div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
          Kursga <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">yozilish</span>
        </h1>
        <p className="text-sm text-stone-500 mt-3 max-w-md mx-auto">Ma&apos;lumotlaringizni qoldiring va biz siz bilan bog&apos;lanamiz</p>
      </div>

      <div className="max-w-lg mx-auto">
        {sent ? (
          <div className="text-center p-12 rounded-2xl" style={{
            background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          }}>
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-xl font-black mb-2 text-stone-800">Arizangiz qabul qilindi!</h2>
            <p className="text-sm text-stone-500">Tez orada siz bilan bog&apos;lanamiz.</p>
            <button onClick={() => setSent(false)} className="mt-6 text-xs text-orange-600 font-bold hover:underline">Yana ariza yuborish</button>
          </div>
        ) : (
          <div className="p-8 rounded-2xl" style={{
            background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          }}>
            <div className="space-y-4">
              <div>
                <label className="text-[11px] text-stone-500 font-semibold block mb-1.5">To&apos;liq ism *</label>
                <input value={form.fullName} onChange={(e) => setForm({...form, fullName: e.target.value})}
                  placeholder="Ismingiz va familiyangiz" className={inputCls} style={{
                    background: 'rgba(255,255,255,0.6)', border: '1.5px solid rgba(0,0,0,0.06)',
                  }} />
              </div>
              <div>
                <label className="text-[11px] text-stone-500 font-semibold block mb-1.5">Telefon raqam *</label>
                <input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                  placeholder="+998 90 123 45 67" className={inputCls} style={{
                    background: 'rgba(255,255,255,0.6)', border: '1.5px solid rgba(0,0,0,0.06)',
                  }} />
              </div>
              <div>
                <label className="text-[11px] text-stone-500 font-semibold block mb-1.5">Xabar (ixtiyoriy)</label>
                <textarea value={form.message} onChange={(e) => setForm({...form, message: e.target.value})}
                  placeholder="Qo'shimcha ma'lumot..." rows={3} className={`${inputCls} resize-none`} style={{
                    background: 'rgba(255,255,255,0.6)', border: '1.5px solid rgba(0,0,0,0.06)',
                  }} />
              </div>
              {error && <div className="text-xs text-red-500 font-medium">{error}</div>}
              <button onClick={handleSubmit} disabled={sending}
                className="btn-primary w-full py-4 rounded-xl text-white font-bold text-sm disabled:opacity-50">
                {sending ? 'Yuborilmoqda...' : 'Ariza yuborish'}
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-orange-100/40">
              <div className="text-[10px] font-bold tracking-widest text-stone-400 mb-3">YOKI TO&apos;G&apos;RIDAN-TO&apos;G&apos;RI BOG&apos;LANING</div>
              <div className="flex flex-col gap-2">
                <a href="tel:+998901234567" className="flex items-center gap-2 text-xs text-stone-600 hover:text-orange-600 transition-colors">
                  <span>📞</span> +998 90 123 45 67
                </a>
                <a href="https://t.me/japacademy" target="_blank" className="flex items-center gap-2 text-xs text-stone-600 hover:text-orange-600 transition-colors">
                  <span>💬</span> Telegram: @japacademy
                </a>
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span>📍</span> Toshkent, O&apos;zbekiston
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
