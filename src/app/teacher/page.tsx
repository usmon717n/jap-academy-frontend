'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';

interface GroupData {
  id: string;
  name: string;
  color: string;
  _count: { members: number; topics: number };
  topics?: Array<{ topic: { id: string; name: string; symbol: string; color: string } }>;
}

export default function TeacherPanel() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || (user.role !== 'TEACHER' && user.role !== 'ADMIN'))) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && (user.role === 'TEACHER' || user.role === 'ADMIN')) {
      api.getMyGroups()
        .then((data) => setGroups(data as GroupData[]))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (authLoading || loading) return <div className="text-center py-20 text-stone-400">Yuklanmoqda...</div>;
  if (!user || (user.role !== 'TEACHER' && user.role !== 'ADMIN')) return null;

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto animate-fade-slide">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full mb-3">
          O&apos;QITUVCHI PANELI
        </div>
        <h1 className="text-2xl font-black">Xush kelibsiz, {user.firstName}!</h1>
        <p className="text-sm text-stone-500 mt-1">Sizga tayinlangan guruhlar</p>
      </div>

      {groups.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-stone-200">
          <div className="text-3xl mb-3">📚</div>
          <div className="text-sm text-stone-400">Sizga hali guruh tayinlanmagan</div>
          <p className="text-xs text-stone-400 mt-1">Admin sizga guruh tayinlaganda bu yerda ko&apos;rinadi</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {groups.map((g) => (
            <div
              key={g.id}
              onClick={() => router.push(`/teacher/${g.id}`)}
              className="card-hover p-6 rounded-2xl bg-white border-2 border-stone-200 cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10" style={{ background: g.color }} />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-extrabold shadow-md" style={{ background: g.color }}>
                    {g.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-base font-extrabold">{g.name}</div>
                    <div className="text-xs text-stone-400 mt-0.5">Guruh</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                    {g._count.members} o&apos;quvchi
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                    </svg>
                    {g._count.topics} mavzu
                  </div>
                </div>

                <div className="mt-3 text-[11px] font-bold flex items-center gap-1" style={{ color: g.color }}>
                  Boshqarish <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
