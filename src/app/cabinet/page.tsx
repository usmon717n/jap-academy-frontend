'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { User, Result } from '@/types';

interface MyGroup {
  id: string; name: string; color: string;
  topics: Array<{ topic: { id: string; name: string; symbol: string; color: string; _count: { questions: number } } }>;
}

export default function CabinetPage() {
  const { user, loading: authLoading, setUser } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [myGroups, setMyGroups] = useState<MyGroup[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Join group
  const [joinCode, setJoinCode] = useState('');
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinResult, setJoinResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    if (!authLoading && !user) router.push('/');
  }, [user, authLoading, router]);

  const loadData = async () => {
    if (!user) return;
    setForm({ firstName: user.firstName, lastName: user.lastName, phone: user.phone || '' });
    try {
      const [r, g] = await Promise.all([
        api.getMyResults().catch(() => []),
        api.getMyGroups().catch(() => []),
      ]);
      setResults(r as Result[]);
      setMyGroups(g as MyGroup[]);
    } catch {}
    setLoadingData(false);
  };

  useEffect(() => { loadData(); }, [user]);

  const handleSave = async () => {
    setSaving(true); setSaved(false);
    try {
      const updated = (await api.updateProfile(form)) as User;
      setUser(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {}
    setSaving(false);
  };

  const handleJoinGroup = async () => {
    if (!joinCode.trim()) return;
    setJoinLoading(true); setJoinResult(null);
    try {
      const res: any = await api.joinGroupByCode(joinCode.trim());
      setJoinResult({ success: true, message: res.message });
      setJoinCode('');
      // Reload groups
      const g = await api.getMyGroups().catch(() => []);
      setMyGroups(g as MyGroup[]);
    } catch (err: any) {
      setJoinResult({ success: false, message: err.message || 'Xatolik yuz berdi' });
    }
    setJoinLoading(false);
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

      {/* ═══ JOIN GROUP BY CODE ═══ */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
          </svg>
          <span className="text-sm font-extrabold text-orange-800">Guruhga qo&apos;shilish</span>
        </div>
        <p className="text-xs text-orange-700/70 mb-4">O&apos;qituvchingiz bergan guruh kodini kiriting</p>

        <div className="flex gap-2">
          <input
            value={joinCode}
            onChange={(e) => { setJoinCode(e.target.value.toUpperCase()); setJoinResult(null); }}
            placeholder="Masalan: KM7X3F"
            maxLength={6}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-orange-200 bg-white text-sm font-bold tracking-widest text-center uppercase placeholder:tracking-normal placeholder:font-normal placeholder:normal-case"
            onKeyDown={(e) => e.key === 'Enter' && handleJoinGroup()}
          />
          <button
            onClick={handleJoinGroup}
            disabled={joinLoading || joinCode.length < 4}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/25 disabled:opacity-40 transition-all"
          >
            {joinLoading ? '...' : 'Qo\'shilish'}
          </button>
        </div>

        {joinResult && (
          <div className={`mt-3 p-3 rounded-xl text-xs font-medium ${joinResult.success ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
            {joinResult.message}
          </div>
        )}
      </div>

      {/* ═══ MY GROUPS ═══ */}
      {myGroups.length > 0 && (
        <div className="bg-white border-2 border-stone-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
            </svg>
            <span className="text-sm font-extrabold">Mening guruhlarim</span>
          </div>

          <div className="space-y-3">
            {myGroups.map((g) => (
              <div key={g.id} className="p-4 rounded-xl border border-stone-100 hover:border-orange-200 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-extrabold shadow-sm" style={{ background: g.color }}>
                    {g.name.charAt(0)}
                  </div>
                  <div className="text-sm font-extrabold">{g.name}</div>
                </div>
                {g.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {g.topics.map((gt) => (
                      <button
                        key={gt.topic.id}
                        onClick={() => gt.topic._count.questions > 0 && router.push(`/tests/${gt.topic.id}`)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-stone-100 text-xs font-semibold hover:border-orange-200 transition-colors"
                        style={{ cursor: gt.topic._count.questions > 0 ? 'pointer' : 'default' }}
                      >
                        <span className="w-6 h-7 rounded text-[8px] font-extrabold text-white flex items-center justify-center" style={{ background: gt.topic.color }}>
                          {gt.topic.symbol}
                        </span>
                        {gt.topic.name}
                        <span className="text-[10px] text-stone-400">({gt.topic._count.questions})</span>
                      </button>
                    ))}
                  </div>
                )}
                {g.topics.length === 0 && <div className="text-xs text-stone-400">Mavzular hali tayinlanmagan</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ PROFILE SETTINGS ═══ */}
      <div className="bg-white border-2 border-stone-200 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
          <span className="text-sm font-extrabold">Profil sozlamalari</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-[11px] text-stone-500 font-semibold block mb-1.5">Ism</label>
            <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="Ismingiz" className={inputCls} />
          </div>
          <div>
            <label className="text-[11px] text-stone-500 font-semibold block mb-1.5">Familiya</label>
            <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Familiyangiz" className={inputCls} />
          </div>
        </div>
        <div className="mb-4">
          <label className="text-[11px] text-stone-500 font-semibold block mb-1.5">Telefon raqam</label>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+998 90 123 45 67" className={inputCls} />
        </div>
        <div className="mb-4">
          <label className="text-[11px] text-stone-500 font-semibold block mb-1.5">Email</label>
          <input value={user.email} disabled className={`${inputCls} bg-stone-50 text-stone-400 cursor-not-allowed`} />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleSave} disabled={saving}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 disabled:opacity-50 transition-all">
            {saving ? 'Saqlanmoqda...' : 'Saqlash'}
          </button>
          {saved && <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full animate-fade-slide">Saqlandi!</span>}
        </div>
      </div>

      {/* ═══ RESULTS HISTORY ═══ */}
      <div className="bg-white border-2 border-stone-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="text-sm font-extrabold">Test natijalari tarixi</span>
        </div>

        {loadingData ? (
          <div className="text-center py-8 text-stone-400 text-xs">Yuklanmoqda...</div>
        ) : results.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-2xl mb-2">📝</div>
            <div className="text-sm text-stone-400">Hali test yechilmagan</div>
            <button onClick={() => router.push('/tests')} className="mt-3 text-xs font-bold text-orange-600 hover:underline">Testlarni boshlash →</button>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-4 rounded-xl border border-stone-100 hover:border-orange-200 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-12 rounded-lg flex flex-col items-center justify-center text-white text-xs font-extrabold" style={{ background: r.topic.color }}>
                    {r.topic.symbol}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{r.topic.name}</div>
                    <div className="text-[10px] text-stone-400 mt-0.5">
                      {new Date(r.createdAt).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short', year: 'numeric' })} · {Math.floor(r.timeSpent / 60)}:{String(r.timeSpent % 60).padStart(2, '0')} min
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-black ${r.percentage >= 70 ? 'text-green-600' : r.percentage >= 50 ? 'text-orange-600' : 'text-red-600'}`}>{r.percentage}%</div>
                  <div className="text-[10px] text-stone-400">{r.correctCount}/{r.totalQuestions}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
