'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

export default function AuthModal({ mode, onClose, onSwitch }: { mode: 'login' | 'register'; onClose: () => void; onSwitch: () => void }) {
  const { login, register } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setError(''); setLoading(true);
    try {
      if (mode === 'login') await login(form.email, form.password);
      else await register(form);
      onClose();
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  };

  const inputCls = 'w-full px-4 py-3 rounded-xl text-sm border-2 border-stone-200 focus:border-orange-500 outline-none';

  return (
    <div className="fixed inset-0 bg-black/40 z-[200] flex items-center justify-center backdrop-blur-sm" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="w-full max-w-sm rounded-2xl p-8 animate-fade-scale" style={{
        background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.5)',
      }}>
        <h2 className="text-xl font-black mb-6 text-center">{mode === 'login' ? 'Kirish' : 'Ro\'yxatdan o\'tish'}</h2>
        <div className="space-y-3">
          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-3">
              <input value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} placeholder="Ism" className={inputCls} />
              <input value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} placeholder="Familiya" className={inputCls} />
            </div>
          )}
          <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email" type="email" className={inputCls} />
          <input value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Parol" type="password" className={inputCls} onKeyDown={e => e.key === 'Enter' && handle()} />
          {error && <div className="text-xs text-red-500 font-medium">{error}</div>}
          <button onClick={handle} disabled={loading} className="btn-primary w-full py-3.5 rounded-xl text-white font-bold text-sm disabled:opacity-50">
            {loading ? '...' : mode === 'login' ? 'Kirish' : 'Ro\'yxatdan o\'tish'}
          </button>
        </div>
        <div className="text-center mt-4">
          <button onClick={onSwitch} className="text-xs text-stone-500 hover:text-orange-600">
            {mode === 'login' ? 'Akkauntingiz yo\'qmi? Ro\'yxatdan o\'ting' : 'Akkauntingiz bormi? Kiring'}
          </button>
        </div>
      </div>
    </div>
  );
}
