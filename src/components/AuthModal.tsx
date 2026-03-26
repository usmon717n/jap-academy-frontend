'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

interface Props {
  mode: 'login' | 'register';
  onClose: () => void;
  onSwitch: () => void;
}

export default function AuthModal({ mode, onClose, onSwitch }: Props) {
  const { login, register } = useAuth();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isReg = mode === 'register';

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      if (isReg) {
        await register({ email: form.email, password: form.password, firstName: form.firstName, lastName: form.lastName });
      } else {
        await login(form.email, form.password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center backdrop-blur-sm animate-fade-scale" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm bg-[#fefcf9] rounded-2xl p-8 border border-stone-200 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-12 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 inline-flex flex-col items-center justify-center text-white mb-3 shadow-lg shadow-orange-500/20">
            <span className="text-[6px] opacity-60">001</span>
            <span className="text-lg font-extrabold">Jp</span>
          </div>
          <h2 className="text-xl font-extrabold">{isReg ? "Ro'yxatdan o'tish" : 'Kirish'}</h2>
          <p className="text-xs text-stone-500 mt-1">JAP Academy platformasiga xush kelibsiz</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">{error}</div>
        )}

        {isReg && (
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-[11px] text-stone-500 font-semibold block mb-1">Ism</label>
              <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="Ismingiz" className="w-full px-3 py-2.5 rounded-xl border-2 border-stone-200 text-sm hover:border-orange-200 transition-colors" />
            </div>
            <div>
              <label className="text-[11px] text-stone-500 font-semibold block mb-1">Familiya</label>
              <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Familiyangiz" className="w-full px-3 py-2.5 rounded-xl border-2 border-stone-200 text-sm hover:border-orange-200 transition-colors" />
            </div>
          </div>
        )}

        <div className="mb-3">
          <label className="text-[11px] text-stone-500 font-semibold block mb-1">Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" className="w-full px-3 py-2.5 rounded-xl border-2 border-stone-200 text-sm hover:border-orange-200 transition-colors" />
        </div>

        <div className="mb-5">
          <label className="text-[11px] text-stone-500 font-semibold block mb-1">Parol</label>
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" className="w-full px-3 py-2.5 rounded-xl border-2 border-stone-200 text-sm hover:border-orange-200 transition-colors" onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
        </div>

        <button onClick={handleSubmit} disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 transition-all">
          {loading ? 'Yuklanmoqda...' : isReg ? "Ro'yxatdan o'tish" : 'Kirish'}
        </button>

        <p className="text-center mt-4 text-xs text-stone-500">
          {isReg ? 'Akkauntingiz bormi? ' : "Akkauntingiz yo'qmi? "}
          <button onClick={onSwitch} className="text-orange-600 font-bold">{isReg ? 'Kirish' : "Ro'yxatdan o'tish"}</button>
        </p>
      </div>
    </div>
  );
}
