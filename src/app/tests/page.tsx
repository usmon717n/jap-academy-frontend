'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { Topic } from '@/types';
import { getColorMeta } from '@/lib/colors';
import AuthModal from '@/components/AuthModal';

export default function TestsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    api.getTopics()
      .then((data) => setTopics(data as Topic[]))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleTopicClick = (topicId: string, hasQuestions: boolean) => {
    if (!hasQuestions) return;
    if (!user) {
      setShowAuthPrompt(true);
      return;
    }
    router.push(`/tests/${topicId}`);
  };

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto animate-fade-slide">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full mb-4">MAVZULAR</div>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight">
          Mavzuni tanlang va <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">testni boshlang</span>
        </h1>
      </div>

      {loading ? (
        <div className="text-center py-16 text-stone-400 text-sm">Yuklanmoqda...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {topics.map((t, i) => {
            const meta = getColorMeta(t.color);
            const qCount = t._count?.questions || 0;
            return (
              <div
                key={t.id}
                onClick={() => handleTopicClick(t.id, qCount > 0)}
                className="card-hover p-6 rounded-2xl border-2 flex items-center justify-between relative overflow-hidden group"
                style={{
                  background: meta.bg,
                  borderColor: meta.border,
                  cursor: qCount > 0 ? 'pointer' : 'default',
                  opacity: qCount > 0 ? 1 : 0.5,
                }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-opacity group-hover:opacity-20" style={{ background: t.color }} />
                <div className="relative z-10">
                  <div className="text-base font-extrabold">{t.name}</div>
                  <div className="text-xs text-stone-500 mt-1.5">{qCount} ta savol</div>
                  {qCount === 0 && (
                    <div className="text-[10px] text-orange-600 mt-1 font-semibold">Savollar hali qo&apos;shilmagan</div>
                  )}
                  {qCount > 0 && (
                    <div className="mt-3 text-[11px] font-bold flex items-center gap-1 transition-colors" style={{ color: t.color }}>
                      Boshlash <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </div>
                  )}
                </div>
                <div
                  className="w-14 h-16 rounded-xl flex flex-col items-center justify-center text-white flex-shrink-0 shadow-lg relative z-10 group-hover:scale-105 transition-transform"
                  style={{ background: t.color, boxShadow: `0 8px 20px ${t.color}33` }}
                >
                  <span className="text-[7px] opacity-70">{t.number}</span>
                  <span className="text-xl font-extrabold">{t.symbol}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Auth prompt modal */}
      {showAuthPrompt && !authMode && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center backdrop-blur-sm animate-fade-scale" onClick={() => setShowAuthPrompt(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm bg-[#fefcf9] rounded-2xl p-8 border border-stone-200 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round">
                <path d="M15 2l-6.5 13a4.5 4.5 0 107.5 0L9.5 2"/><path d="M8.5 2h7"/>
              </svg>
            </div>
            <h2 className="text-xl font-extrabold mb-2">Avval tizimga kiring</h2>
            <p className="text-sm text-stone-500 mb-6">Test yechish uchun ro&apos;yxatdan o&apos;ting yoki akkauntingizga kiring</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setShowAuthPrompt(false); setAuthMode('register'); }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25"
              >
                Ro&apos;yxatdan o&apos;tish
              </button>
              <button
                onClick={() => { setShowAuthPrompt(false); setAuthMode('login'); }}
                className="w-full py-3 rounded-xl border-2 border-stone-200 text-stone-700 font-bold text-sm hover:border-orange-300 transition-colors"
              >
                Kirish
              </button>
            </div>
          </div>
        </div>
      )}

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSwitch={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
        />
      )}
    </div>
  );
}
