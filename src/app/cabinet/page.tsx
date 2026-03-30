'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function CabinetPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => { if (!loading && !user) router.push('/'); }, [user, loading, router]);

  if (loading || !user) return <div className="text-center py-20 text-stone-400">Yuklanmoqda...</div>;

  return (
    <div className="px-4 py-16 max-w-lg mx-auto">
      <div className="p-8 rounded-2xl text-center" style={{ background:'rgba(255,255,255,0.55)',backdropFilter:'blur(16px)',border:'1px solid rgba(255,255,255,0.6)',boxShadow:'0 4px 20px rgba(0,0,0,0.04)' }}>
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 ring-4 ring-orange-200/50">
          {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
        </div>
        <h1 className="text-xl font-black">{user.firstName} {user.lastName}</h1>
        <p className="text-sm text-stone-500 mt-1">{user.email}</p>
        {user.role === 'ADMIN' && <span className="inline-block mt-2 text-[10px] font-bold tracking-widest bg-orange-100 text-orange-700 px-3 py-1 rounded-full">ADMIN</span>}
        <div className="mt-6">
          <button onClick={logout} className="text-xs text-red-500 font-bold hover:underline">Chiqish</button>
        </div>
      </div>
    </div>
  );
}
