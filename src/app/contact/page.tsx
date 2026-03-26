'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export default function ContactPage() {
  const [form, setForm] = useState({ fullName: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!form.fullName || !form.phone) return;
    setLoading(true);
    setError('');
    try {
      await api.submitContact(form);
      setSent(true);
    } catch (err: any) {
      setError(err.message || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = 'w-full px-4 py-3 rounded-xl border-2 border-stone-200 text-sm hover:border-orange-200 transition-colors';

  return (
    <div className="px-4 py-12 max-w-lg mx-auto animate-fade-slide">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full mb-4">ALOQA</div>
        <h1 className="text-3xl font-black tracking-tight mb-2">Kursga yozilish</h1>
        <p className="text-sm text-stone-500">Formani to&apos;ldiring, biz siz bilan tez orada bog&apos;lanamiz</p>
      </div>

      {sent ? (
        <div className="text-center py-12 px-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
          <div className="text-lg font-extrabold text-green-600 mb-1">Arizangiz qabul qilindi!</div>
          <p className="text-sm text-stone-500">Tez orada siz bilan bog&apos;lanamiz</p>
          <button onClick={() => { setSent(false); setForm({ fullName: '', phone: '', message: '' }); }}
            className="mt-6 px-6 py-2.5 rounded-full border-2 border-green-500 text-green-600 font-bold text-sm hover:bg-green-50 transition-colors">
            Yangi ariza
          </button>
        </div>
      ) : (
        <div className="bg-white border-2 border-stone-200 rounded-2xl p-7">
          {error && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">{error}</div>}
          <div className="mb-4">
            <label className="text-[11px] text-stone-500 font-semibold block mb-1.5">Ism familiya</label>
            <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="To'liq ismingiz" className={inputCls} />
          </div>
          <div className="mb-4">
            <label className="text-[11px] text-stone-500 font-semibold block mb-1.5">Telefon raqam</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+998 90 123 45 67" className={inputCls} />
          </div>
          <div className="mb-6">
            <label className="text-[11px] text-stone-500 font-semibold block mb-1.5">Xabar</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Qo'shimcha ma'lumot..." rows={3} className={`${inputCls} resize-y`} />
          </div>
          <button onClick={handleSubmit} disabled={!form.fullName || !form.phone || loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 disabled:opacity-40 hover:from-orange-600 hover:to-orange-700 transition-all">
            {loading ? 'Yuborilmoqda...' : 'Arizani yuborish'}
          </button>
        </div>
      )}
    </div>
  );
}
