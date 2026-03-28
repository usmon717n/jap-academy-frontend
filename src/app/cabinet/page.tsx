'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { User, Result } from '@/types';

export default function CabinetPage() {
  const { user, loading: authLoading, setUser } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [loadingResults, setLoadingResults] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) router.push('/');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      setForm({ firstName: user.firstName, lastName: user.lastName, phone: user.phone || '' });
      api.getMyResults()
        .then((data) => setResults(data as Result[]))
        .catch(() => {})
        .finally(() => setLoadingResults(false));
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const updated = (await api.updateProfile(form)) as User;
      setUser(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {}
    setSaving(false);
  };

  if (authLoading || !user) return <div className="text-center py-20 text-stone-400">Yuklanmoqda...</div>;

  const inputCls = 'w-full px-4 py-3 rounded-xl border-2 border-stone-200 text-sm hover:border-orange-200 transition-colors';

  return (
    <div className="px-4 py-10 max-w-2xl mx-auto animate-fade-slide">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-orange-500/20 ring-4 ring-orange-100">
          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-black">{user.firstName} {user.lastName}</h1>
          <p className="text-xs text-stone-500 mt-0.5">{user.email}</p>
        </div>
      </div>

      {/* Profile form */}
      <div className="bg-white border-2 border-stone-200 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          <span className="text-sm font-extrabold">Profil sozlamalari</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-[11px] text-stone-500 font-semibold block mb-1.5">Ism</label>
            <input
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              placeholder="Ismingiz"
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-[11px] text-stone-500 font-semibold block mb-1.5">Familiya</label>
            <input
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              placeholder="Familiyangiz"
              className={inputCls}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-[11px] text-stone-500 font-semibold block mb-1.5">Telefon raqam</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+998 90 123 45 67"
            className={inputCls}
          />
        </div>

        <div className="mb-4">
          <label className="text-[11px] text-stone-500 font-semibold block mb-1.5">Email</label>
          <input
            value={user.email}
            disabled
            className={`${inputCls} bg-stone-50 text-stone-400 cursor-not-allowed`}
          />
          <p className="text-[10px] text-stone-400 mt-1">Emailni o&apos;zgartirish mumkin emas</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 transition-all"
          >
            {saving ? 'Saqlanmoqda...' : 'Saqlash'}
          </button>
          {saved && (
            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full animate-fade-slide">
              ✓ Saqlandi!
            </span>
          )}
        </div>
      </div>

      {/* Test results history */}
      <div className="bg-white border-2 border-stone-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <span className="text-sm font-extrabold">Test natijalari tarixi</span>
        </div>

        {loadingResults ? (
          <div className="text-center py-8 text-stone-400 text-xs">Yuklanmoqda...</div>
        ) : results.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-2xl mb-2">📝</div>
            <div className="text-sm text-stone-400">Hali test yechilmagan</div>
            <button
              onClick={() => router.push('/tests')}
              className="mt-3 text-xs font-bold text-orange-600 hover:underline"
            >
              Testlarni boshlash →
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-4 rounded-xl border border-stone-100 hover:border-orange-200 transition-colors">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-12 rounded-lg flex flex-col items-center justify-center text-white text-xs font-extrabold"
                    style={{ background: r.topic.color }}
                  >
                    {r.topic.symbol}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{r.topic.name}</div>
                    <div className="text-[10px] text-stone-400 mt-0.5">
                      {new Date(r.createdAt).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {' · '}
                      {Math.floor(r.timeSpent / 60)}:{String(r.timeSpent % 60).padStart(2, '0')} min
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-black ${r.percentage >= 70 ? 'text-green-600' : r.percentage >= 50 ? 'text-orange-600' : 'text-red-600'}`}>
                    {r.percentage}%
                  </div>
                  <div className="text-[10px] text-stone-400">{r.correctCount}/{r.totalQuestions} to&apos;g&apos;ri</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
