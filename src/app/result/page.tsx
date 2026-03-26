'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Result } from '@/types';
import { downloadCertificate } from '@/lib/certificate';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [result, setResult] = useState<Result | null>(null);
  const [localResult, setLocalResult] = useState<{ topic: string; symbol: string; color: string; correct: number; total: number; time: string } | null>(null);
  const [certName, setCertName] = useState({ first: '', last: '' });
  const [showCertForm, setShowCertForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resultId = searchParams.get('id');
    if (resultId) {
      api.getMyResults()
        .then((data: any) => {
          const found = (data as Result[]).find((r) => r.id === resultId);
          if (found) setResult(found);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLocalResult({
        topic: searchParams.get('topic') || '',
        symbol: searchParams.get('symbol') || '',
        color: searchParams.get('color') || '#ea580c',
        correct: Number(searchParams.get('correct') || 0),
        total: Number(searchParams.get('total') || 0),
        time: searchParams.get('time') || '00:00',
      });
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) return <div className="text-center py-20 text-stone-400">Yuklanmoqda...</div>;

  const topicName = result?.topic.name || localResult?.topic || '';
  const correct = result?.correctCount || localResult?.correct || 0;
  const total = result?.totalQuestions || localResult?.total || 0;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const timeStr = result ? formatTimeFromSec(result.timeSpent) : localResult?.time || '00:00';
  const grade = pct >= 90 ? "A'lo" : pct >= 70 ? 'Yaxshi' : pct >= 50 ? 'Qoniqarli' : 'Qayta topshiring';
  const gradeColor = pct >= 90 ? '#16a34a' : pct >= 70 ? '#2563eb' : pct >= 50 ? '#ea580c' : '#ea580c';
  const topicColor = result?.topic.color || localResult?.color || '#ea580c';
  const topicSymbol = result?.topic.symbol || localResult?.symbol || '?';

  function formatTimeFromSec(s: number) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }

  const handleDownload = () => {
    if (!certName.first || !certName.last) return;
    downloadCertificate(certName.first, certName.last, topicName, correct, total, timeStr);
  };

  return (
    <div className="px-4 py-8 max-w-lg mx-auto text-center">
      {/* Topic element */}
      <div
        className="w-14 h-16 rounded-lg inline-flex flex-col items-center justify-center text-white mb-4"
        style={{ background: topicColor }}
      >
        <span className="text-lg font-extrabold">{topicSymbol}</span>
        <span className="text-[6px] opacity-60">{topicName}</span>
      </div>

      <div className="text-[11px] tracking-widest text-stone-400 font-semibold mb-2">NATIJA</div>
      <div className="text-6xl font-black leading-none">{pct}%</div>
      <div className="text-lg font-bold mt-1 mb-1" style={{ color: gradeColor }}>{grade}</div>
      <div className="text-sm text-stone-500 mb-6 flex items-center justify-center gap-1.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
        </svg>
        Vaqt: {timeStr}
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="bg-green-50 px-6 py-4 rounded-xl border border-green-200">
          <div className="text-2xl font-extrabold text-green-600">{correct}</div>
          <div className="text-[10px] text-stone-500 mt-0.5">TO&apos;G&apos;RI</div>
        </div>
        <div className="bg-orange-50 px-6 py-4 rounded-xl border border-orange-200">
          <div className="text-2xl font-extrabold text-orange-600">{total - correct}</div>
          <div className="text-[10px] text-stone-500 mt-0.5">NOTO&apos;G&apos;RI</div>
        </div>
      </div>

      {/* Answer review for API results */}
      {result?.answers && (
        <div className="text-left mb-6">
          <div className="text-[10px] font-bold tracking-widest text-stone-400 mb-2">JAVOBLAR TAHLILI</div>
          <div className="flex flex-wrap gap-1.5">
            {result.answers.map((a, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-md flex items-center justify-center text-[11px] font-bold"
                style={{
                  background: a.userAnswer === -1 ? '#f5f5f0' : a.isCorrect ? '#f0fdf4' : '#fff5f5',
                  border: `1.5px solid ${a.userAnswer === -1 ? '#e7e5e4' : a.isCorrect ? '#bbf7d0' : '#fecaca'}`,
                  color: a.userAnswer === -1 ? '#a8a29e' : a.isCorrect ? '#16a34a' : '#ea580c',
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificate */}
      {!showCertForm ? (
        <button
          onClick={() => setShowCertForm(true)}
          className="w-full py-3.5 rounded-lg bg-orange-600 text-white font-bold text-sm hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Sertifikatni yuklab olish
        </button>
      ) : (
        <div className="bg-white border-2 border-orange-200 rounded-xl p-5 text-left">
          <div className="text-xs font-bold text-orange-600 mb-3">Sertifikat uchun ma&apos;lumotlarni kiriting</div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-[11px] text-stone-500 font-semibold block mb-1">Ism</label>
              <input
                value={certName.first}
                onChange={(e) => setCertName({ ...certName, first: e.target.value })}
                placeholder="Ismingiz"
                className="w-full px-3 py-2.5 rounded-lg border-2 border-stone-200 text-sm"
              />
            </div>
            <div>
              <label className="text-[11px] text-stone-500 font-semibold block mb-1">Familiya</label>
              <input
                value={certName.last}
                onChange={(e) => setCertName({ ...certName, last: e.target.value })}
                placeholder="Familiyangiz"
                className="w-full px-3 py-2.5 rounded-lg border-2 border-stone-200 text-sm"
              />
            </div>
          </div>
          <button
            onClick={handleDownload}
            disabled={!certName.first || !certName.last}
            className="w-full py-3 rounded-lg bg-orange-600 text-white font-bold text-sm disabled:opacity-40 hover:bg-orange-700"
          >
            Yuklab olish
          </button>
        </div>
      )}

      <div className="flex gap-3 justify-center mt-5">
        <button onClick={() => router.push('/tests')} className="text-sm font-bold border-2 border-stone-900 rounded-md px-4 py-2">
          Mavzularga qaytish
        </button>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-stone-400">Yuklanmoqda...</div>}>
      <ResultContent />
    </Suspense>
  );
}
