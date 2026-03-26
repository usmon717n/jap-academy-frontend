'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { Topic, Question, Contact } from '@/types';
import { AVAILABLE_COLORS, getColorMeta } from '@/lib/colors';

export default function AdminPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();

  const [topics, setTopics] = useState<Topic[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [topicQuestions, setTopicQuestions] = useState<Record<string, Question[]>>({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'topics' | 'contacts'>('topics');

  const [newTopic, setNewTopic] = useState({ name: '', symbol: '', number: '', color: '#ea580c' });
  const [newQ, setNewQ] = useState({ text: '', optionA: '', optionB: '', optionC: '', optionD: '', correct: 0 });
  const [editQ, setEditQ] = useState<Question | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) router.push('/');
  }, [user, isAdmin, authLoading, router]);

  useEffect(() => {
    if (isAdmin) {
      Promise.all([
        api.getTopics().then((d) => setTopics(d as Topic[])),
        api.getContacts().then((d) => setContacts(d as Contact[])).catch(() => {}),
      ]).finally(() => setLoading(false));
    }
  }, [isAdmin]);

  const loadQuestions = async (topicId: string) => {
    if (topicQuestions[topicId]) return;
    const qs = (await api.getQuestions(topicId)) as Question[];
    setTopicQuestions((prev) => ({ ...prev, [topicId]: qs }));
  };

  const handleToggleTopic = (id: string) => {
    if (expandedTopic === id) { setExpandedTopic(null); } 
    else { setExpandedTopic(id); loadQuestions(id); }
  };

  const handleAddTopic = async () => {
    if (!newTopic.name || !newTopic.symbol) return;
    const num = String(topics.length + 1).padStart(3, '0');
    const created = (await api.createTopic({ ...newTopic, number: num })) as Topic;
    setTopics((prev) => [...prev, { ...created, _count: { questions: 0 } }]);
    setNewTopic({ name: '', symbol: '', number: '', color: '#ea580c' });
  };

  const handleDeleteTopic = async (id: string) => {
    await api.deleteTopic(id);
    setTopics((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddQuestion = async (topicId: string) => {
    if (!newQ.text || !newQ.optionA || !newQ.optionB || !newQ.optionC || !newQ.optionD) return;
    const created = (await api.createQuestion({ ...newQ, topicId })) as Question;
    setTopicQuestions((prev) => ({ ...prev, [topicId]: [...(prev[topicId] || []), created] }));
    setNewQ({ text: '', optionA: '', optionB: '', optionC: '', optionD: '', correct: 0 });
  };

  const handleDeleteQuestion = async (topicId: string, qId: string) => {
    await api.deleteQuestion(qId);
    setTopicQuestions((prev) => ({ ...prev, [topicId]: prev[topicId].filter((q) => q.id !== qId) }));
  };

  const handleSaveEdit = async (topicId: string) => {
    if (!editQ) return;
    await api.updateQuestion(editQ.id, {
      text: editQ.text, optionA: editQ.optionA, optionB: editQ.optionB,
      optionC: editQ.optionC, optionD: editQ.optionD, correct: editQ.correct,
    });
    setTopicQuestions((prev) => ({
      ...prev, [topicId]: prev[topicId].map((q) => (q.id === editQ.id ? editQ : q)),
    }));
    setEditQ(null);
  };

  const handleContactHandled = async (id: string) => {
    await api.markContactHandled(id);
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, isHandled: true } : c)));
  };

  if (authLoading || loading) return <div className="text-center py-20 text-stone-400">Yuklanmoqda...</div>;
  if (!isAdmin) return null;

  const inputCls = 'w-full px-3 py-2.5 rounded-xl border-2 border-stone-200 text-xs focus:border-orange-500 outline-none hover:border-orange-200 transition-colors';

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto animate-fade-slide">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black">Admin panel</h1>
          <p className="text-xs text-stone-400 mt-1">Mavzular va savollarni boshqaring</p>
        </div>
        <div className="flex gap-2">
          {(['topics', 'contacts'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                tab === t
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/25'
                  : 'border-2 border-stone-200 text-stone-500 hover:border-orange-200'
              }`}>
              {t === 'topics' ? 'Mavzular' : `Arizalar (${contacts.filter((c) => !c.isHandled).length})`}
            </button>
          ))}
        </div>
      </div>

      {tab === 'topics' && (
        <>
          {/* Add topic */}
          <div className="bg-white border-2 border-stone-200 rounded-2xl p-6 mb-6 card-hover">
            <div className="text-[11px] font-bold tracking-widest text-orange-500 mb-4">YANGI MAVZU QO&apos;SHISH</div>
            <div className="flex gap-3 flex-wrap items-end">
              <div className="flex-1 min-w-[160px]">
                <label className="text-[11px] text-stone-500 block mb-1.5 font-medium">Mavzu nomi</label>
                <input value={newTopic.name} onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })} placeholder="masalan: Termodinamika" className={inputCls} />
              </div>
              <div className="w-20">
                <label className="text-[11px] text-stone-500 block mb-1.5 font-medium">Belgi</label>
                <input value={newTopic.symbol} onChange={(e) => setNewTopic({ ...newTopic, symbol: e.target.value.slice(0, 2) })} placeholder="Td" maxLength={2} className={`${inputCls} text-center font-bold`} />
              </div>
              <div>
                <label className="text-[11px] text-stone-500 block mb-1.5 font-medium">Rang</label>
                <div className="flex gap-1.5">
                  {AVAILABLE_COLORS.map((c) => (
                    <button key={c.value} onClick={() => setNewTopic({ ...newTopic, color: c.value })} title={c.label}
                      className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                        newTopic.color === c.value ? 'border-stone-900 scale-110 shadow-md' : 'border-transparent'
                      }`}
                      style={{ background: c.value }} />
                  ))}
                </div>
              </div>
              <button onClick={handleAddTopic}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all">
                + Qo&apos;shish
              </button>
            </div>
          </div>

          {/* Topics list */}
          {topics.map((t) => {
            const meta = getColorMeta(t.color);
            return (
              <div key={t.id} className="bg-white border-2 rounded-2xl p-5 mb-3 transition-all hover:shadow-md" style={{ borderColor: meta.border }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-12 rounded-lg flex flex-col items-center justify-center text-white text-xs font-extrabold shadow-sm" style={{ background: t.color }}>
                      <span className="text-[6px] opacity-60">{t.number}</span>
                      <span className="text-sm">{t.symbol}</span>
                    </div>
                    <div>
                      <div className="text-sm font-extrabold">{t.name}</div>
                      <div className="text-[11px] text-stone-500">{topicQuestions[t.id]?.length ?? t._count?.questions ?? 0} ta savol</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleToggleTopic(t.id)}
                      className="px-4 py-2 rounded-xl border-2 border-stone-200 text-[11px] font-bold hover:border-orange-300 transition-colors">
                      {expandedTopic === t.id ? 'Yopish' : 'Savollar'}
                    </button>
                    <button onClick={() => handleDeleteTopic(t.id)}
                      className="px-4 py-2 rounded-xl bg-red-50 border-2 border-red-200 text-red-600 text-[11px] font-bold hover:bg-red-100 transition-colors">
                      O&apos;chirish
                    </button>
                  </div>
                </div>

                {expandedTopic === t.id && (
                  <div className="mt-5 border-t border-stone-100 pt-4">
                    {(topicQuestions[t.id] || []).map((q, qi) => (
                      <div key={q.id} className="py-2.5 border-b border-stone-50 text-xs">
                        {editQ?.id === q.id ? (
                          <div className="space-y-2 bg-orange-50/50 rounded-xl p-3">
                            <input value={editQ.text} onChange={(e) => setEditQ({ ...editQ, text: e.target.value })} className={inputCls} />
                            {(['optionA', 'optionB', 'optionC', 'optionD'] as const).map((key, i) => (
                              <div key={key} className="flex items-center gap-2">
                                <input type="radio" checked={editQ.correct === i} onChange={() => setEditQ({ ...editQ, correct: i })} className="accent-orange-500" />
                                <input value={editQ[key]} onChange={(e) => setEditQ({ ...editQ, [key]: e.target.value })} className={`${inputCls} flex-1`} />
                              </div>
                            ))}
                            <div className="flex gap-2 pt-1">
                              <button onClick={() => handleSaveEdit(t.id)} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-[11px] font-bold">Saqlash</button>
                              <button onClick={() => setEditQ(null)} className="px-4 py-2 rounded-xl border border-stone-200 text-[11px] font-bold">Bekor</button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center group">
                            <div>
                              <span className="font-bold text-stone-300 mr-2">{qi + 1}.</span>
                              {q.text}
                              <span className="ml-2 text-green-600 font-semibold text-[10px] bg-green-50 px-2 py-0.5 rounded-full">
                                {[q.optionA, q.optionB, q.optionC, q.optionD][q.correct]}
                              </span>
                            </div>
                            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                              <button onClick={() => setEditQ({ ...q })} className="px-2.5 py-1 rounded-lg border border-stone-200 text-[10px] hover:border-orange-300">Tahrir</button>
                              <button onClick={() => handleDeleteQuestion(t.id, q.id)} className="px-2.5 py-1 rounded-lg border border-red-200 bg-red-50 text-red-600 text-[10px]">X</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="mt-4 p-5 rounded-xl" style={{ background: meta.bg }}>
                      <div className="text-[10px] font-bold tracking-widest mb-3" style={{ color: t.color }}>YANGI SAVOL</div>
                      <input value={newQ.text} onChange={(e) => setNewQ({ ...newQ, text: e.target.value })} placeholder="Savol matni..." className={`${inputCls} mb-2`} />
                      {(['optionA', 'optionB', 'optionC', 'optionD'] as const).map((key, i) => (
                        <div key={key} className="flex items-center gap-2 mb-1.5">
                          <input type="radio" name="newCorrect" checked={newQ.correct === i} onChange={() => setNewQ({ ...newQ, correct: i })} className="accent-orange-500" />
                          <input value={newQ[key]} onChange={(e) => setNewQ({ ...newQ, [key]: e.target.value })} placeholder={`${i + 1}-variant`} className={`${inputCls} flex-1`} />
                        </div>
                      ))}
                      <button onClick={() => handleAddQuestion(t.id)}
                        className="mt-2 px-5 py-2 rounded-xl text-white text-[11px] font-bold shadow-sm" style={{ background: t.color }}>
                        + Savol qo&apos;shish
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}

      {tab === 'contacts' && (
        <div className="space-y-3">
          {contacts.length === 0 ? (
            <div className="text-center py-16 text-stone-400 text-sm">Arizalar yo&apos;q</div>
          ) : (
            contacts.map((c) => (
              <div key={c.id} className={`bg-white border-2 rounded-2xl p-5 transition-all ${c.isHandled ? 'border-green-200 opacity-60' : 'border-stone-200 hover:shadow-md'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-extrabold">{c.fullName}</div>
                    <div className="text-xs text-stone-500 mt-0.5">{c.phone}</div>
                    {c.message && <div className="text-xs text-stone-600 mt-2 bg-stone-50 p-3 rounded-xl">{c.message}</div>}
                    <div className="text-[10px] text-stone-400 mt-2">{new Date(c.createdAt).toLocaleString('uz-UZ')}</div>
                  </div>
                  {!c.isHandled ? (
                    <button onClick={() => handleContactHandled(c.id)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[11px] font-bold shadow-sm">
                      Bajarildi
                    </button>
                  ) : (
                    <span className="text-[11px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded-full">✓ Bajarilgan</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
