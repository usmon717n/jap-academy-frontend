'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { Topic, Question } from '@/types';
import { generateShuffleMap } from '@/lib/shuffle';
import { getColorMeta } from '@/lib/colors';

export default function TestPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();

  const [topic, setTopic] = useState<Topic | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [shuffleMap, setShuffleMap] = useState<number[][]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch topic + questions
  useEffect(() => {
    api.getTopic(id)
      .then((data: any) => {
        setTopic(data);
        const qs = data.questions || [];
        setQuestions(qs);
        setShuffleMap(generateShuffleMap(qs.length));
      })
      .catch(() => router.push('/tests'))
      .finally(() => setLoading(false));
  }, [id, router]);

  // Timer
  useEffect(() => {
    timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  // Select answer — store ORIGINAL index
  const selectAnswer = (qIndex: number, displayIdx: number) => {
    const originalIdx = shuffleMap[qIndex]?.[displayIdx] ?? displayIdx;
    setAnswers((prev) => ({ ...prev, [qIndex]: originalIdx }));
  };

  // Get display index for highlighting
  const getSelectedDisplay = (qIndex: number): number | undefined => {
    const orig = answers[qIndex];
    if (orig === undefined || !shuffleMap[qIndex]) return undefined;
    return shuffleMap[qIndex].indexOf(orig);
  };

  // Submit test
  const handleSubmit = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSubmitting(true);

    if (user) {
      try {
        const result: any = await api.submitResult({
          topicId: id,
          answers: Object.fromEntries(Object.entries(answers).map(([k, v]) => [k, v])),
          timeSpent: timer,
        });
        router.push(`/result?id=${result.id}`);
        return;
      } catch {
        // Fall through to local result
      }
    }

    // Local result for non-logged-in users
    const correct = questions.filter((q, i) => answers[i] === q.correct).length;
    const params = new URLSearchParams({
      topic: topic?.name || '',
      symbol: topic?.symbol || '',
      color: topic?.color || '',
      correct: String(correct),
      total: String(questions.length),
      time: formatTime(timer),
    });
    router.push(`/result?${params.toString()}`);
  };

  if (loading) return <div className="text-center py-20 text-stone-400">Yuklanmoqda...</div>;
  if (!topic || questions.length === 0) return <div className="text-center py-20 text-stone-400">Savollar topilmadi</div>;

  const q = questions[currentQ];
  const totalQ = questions.length;
  const answeredCount = Object.keys(answers).length;
  const currentShuffle = shuffleMap[currentQ] || [0, 1, 2, 3];
  const selectedDisplayIdx = getSelectedDisplay(currentQ);
  const meta = getColorMeta(topic.color);

  const getOptionText = (q: Question, origIdx: number) => {
    return [q.optionA, q.optionB, q.optionC, q.optionD][origIdx] || '';
  };

  return (
    <div className="px-4 py-5 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-bold flex items-center gap-1.5" style={{ color: topic.color }}>
          <span
            className="w-6 h-7 rounded text-[10px] font-extrabold text-white inline-flex items-center justify-center"
            style={{ background: topic.color }}
          >
            {topic.symbol}
          </span>
          {topic.name}
        </span>
        <div className="flex items-center gap-1.5 bg-stone-900 px-3 py-1.5 rounded-lg">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
          </svg>
          <span className="text-sm font-extrabold text-yellow-400 tabular-nums">{formatTime(timer)}</span>
        </div>
      </div>

      <div className="flex justify-between text-[11px] text-stone-400 mb-1">
        <span>Savol {currentQ + 1} / {totalQ}</span>
        <span>Javob berildi: {answeredCount} / {totalQ}</span>
      </div>
      <div className="h-1 bg-stone-100 rounded-full mb-7">
        <div
          className="h-1 rounded-full transition-all duration-300"
          style={{ width: `${((currentQ + 1) / totalQ) * 100}%`, background: topic.color }}
        />
      </div>

      {/* Question */}
      <div className="mb-5">
        <div className="text-[10px] font-bold tracking-widest text-stone-400 mb-2">SAVOL {currentQ + 1}</div>
        <h2 className="text-lg font-extrabold leading-snug">{q.text}</h2>
      </div>

      {/* Shuffled options */}
      <div className="flex flex-col gap-2 mb-6">
        {currentShuffle.map((origIdx, displayIdx) => {
          const isSelected = selectedDisplayIdx === displayIdx;
          return (
            <button
              key={displayIdx}
              onClick={() => selectAnswer(currentQ, displayIdx)}
              className="flex items-center gap-3 p-3.5 rounded-lg border-2 text-left transition-all text-sm font-semibold"
              style={{
                borderColor: isSelected ? topic.color : '#e7e5e4',
                background: isSelected ? meta.bg : '#fff',
              }}
            >
              <span
                className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-extrabold flex-shrink-0 transition-all"
                style={{
                  background: isSelected ? topic.color : '#f5f5f0',
                  color: isSelected ? '#fff' : '#78716c',
                }}
              >
                {String.fromCharCode(65 + displayIdx)}
              </span>
              <span style={{ color: isSelected ? '#1c1917' : '#57534e' }}>
                {getOptionText(q, origIdx)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center gap-2">
        <button
          onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
          disabled={currentQ === 0}
          className="px-4 py-2.5 rounded-md border-2 border-stone-900 text-sm font-bold disabled:opacity-30 disabled:border-stone-200"
        >
          ← Oldingi
        </button>

        <div className="flex gap-1 flex-wrap justify-center">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQ(i)}
              className="w-6 h-6 rounded text-[9px] font-bold transition-all"
              style={{
                background: i === currentQ ? topic.color : answers[i] !== undefined ? meta.bg : '#f5f5f0',
                color: i === currentQ ? '#fff' : answers[i] !== undefined ? topic.color : '#a8a29e',
                border: `1px solid ${i === currentQ ? topic.color : answers[i] !== undefined ? meta.border : '#e7e5e4'}`,
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {currentQ < totalQ - 1 ? (
          <button
            onClick={() => setCurrentQ(currentQ + 1)}
            className="px-4 py-2.5 rounded-md text-white text-sm font-bold"
            style={{ background: topic.color }}
          >
            Keyingi →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-4 py-2.5 rounded-md bg-green-600 text-white text-sm font-bold disabled:opacity-50"
          >
            {submitting ? '...' : 'Natijani bilish'}
          </button>
        )}
      </div>

      <div className="text-center mt-4">
        <button onClick={() => router.push('/tests')} className="text-xs text-stone-400 border border-stone-200 rounded-md px-3 py-1.5">
          Bekor qilish
        </button>
      </div>
    </div>
  );
}
