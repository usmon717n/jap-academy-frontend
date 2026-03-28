'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { Topic, Question, Contact } from '@/types';
import { AVAILABLE_COLORS, getColorMeta } from '@/lib/colors';

interface Teacher { id: string; email: string; firstName: string; lastName: string; phone: string; teacherGroups: Array<{ group: { id: string; name: string; color: string } }> }
interface GroupData { id: string; name: string; joinCode: string; color: string; _count: { members: number; teachers: number; topics: number }; teachers: Array<{ teacher: { id: string; firstName: string; lastName: string; email: string } }> }

export default function AdminPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();

  const [topics, setTopics] = useState<Topic[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [topicQuestions, setTopicQuestions] = useState<Record<string, Question[]>>({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'topics' | 'teachers' | 'groups' | 'contacts'>('topics');

  const [newTopic, setNewTopic] = useState({ name: '', symbol: '', number: '', color: '#ea580c' });
  const [newQ, setNewQ] = useState({ text: '', optionA: '', optionB: '', optionC: '', optionD: '', correct: 0 });
  const [editQ, setEditQ] = useState<Question | null>(null);
  const [newTeacher, setNewTeacher] = useState({ email: '', password: '', firstName: '', lastName: '', phone: '' });
  const [newGroup, setNewGroup] = useState({ name: '', color: '#ea580c' });
  const [assignTeacherId, setAssignTeacherId] = useState('');

  useEffect(() => { if (!authLoading && !isAdmin) router.push('/'); }, [isAdmin, authLoading, router]);

  const loadAll = async () => {
    try {
      const [t, c, te, g] = await Promise.all([
        api.getTopics(), api.getContacts().catch(() => []),
        api.getTeachers().catch(() => []), api.getGroups().catch(() => []),
      ]);
      setTopics(t as Topic[]); setContacts(c as Contact[]);
      setTeachers(te as Teacher[]); setGroups(g as GroupData[]);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { if (isAdmin) loadAll(); }, [isAdmin]);

  const loadQuestions = async (topicId: string) => {
    if (topicQuestions[topicId]) return;
    const qs = (await api.getQuestions(topicId)) as Question[];
    setTopicQuestions((prev) => ({ ...prev, [topicId]: qs }));
  };

  // Topic handlers
  const handleAddTopic = async () => {
    if (!newTopic.name || !newTopic.symbol) return;
    const num = String(topics.length + 1).padStart(3, '0');
    const created = (await api.createTopic({ ...newTopic, number: num })) as Topic;
    setTopics((prev) => [...prev, { ...created, _count: { questions: 0 } }]);
    setNewTopic({ name: '', symbol: '', number: '', color: '#ea580c' });
  };
  const handleDeleteTopic = async (id: string) => { await api.deleteTopic(id); setTopics((prev) => prev.filter((t) => t.id !== id)); };
  const handleAddQuestion = async (topicId: string) => {
    if (!newQ.text || !newQ.optionA || !newQ.optionB || !newQ.optionC || !newQ.optionD) return;
    const created = (await api.createQuestion({ ...newQ, topicId })) as Question;
    setTopicQuestions((prev) => ({ ...prev, [topicId]: [...(prev[topicId] || []), created] }));
    setNewQ({ text: '', optionA: '', optionB: '', optionC: '', optionD: '', correct: 0 });
  };
  const handleDeleteQuestion = async (topicId: string, qId: string) => {
    await api.deleteQuestion(qId); setTopicQuestions((prev) => ({ ...prev, [topicId]: prev[topicId].filter((q) => q.id !== qId) }));
  };
  const handleSaveEdit = async (topicId: string) => {
    if (!editQ) return;
    await api.updateQuestion(editQ.id, { text: editQ.text, optionA: editQ.optionA, optionB: editQ.optionB, optionC: editQ.optionC, optionD: editQ.optionD, correct: editQ.correct });
    setTopicQuestions((prev) => ({ ...prev, [topicId]: prev[topicId].map((q) => (q.id === editQ.id ? editQ : q)) }));
    setEditQ(null);
  };

  // Teacher handlers
  const handleAddTeacher = async () => {
    if (!newTeacher.email || !newTeacher.password || !newTeacher.firstName || !newTeacher.lastName) return;
    await api.createTeacher(newTeacher);
    setNewTeacher({ email: '', password: '', firstName: '', lastName: '', phone: '' });
    const te = await api.getTeachers() as Teacher[]; setTeachers(te);
  };
  const handleDeleteTeacher = async (id: string) => { await api.deleteTeacher(id); setTeachers((prev) => prev.filter((t) => t.id !== id)); };

  // Group handlers
  const handleAddGroup = async () => {
    if (!newGroup.name) return;
    await api.createGroup(newGroup);
    setNewGroup({ name: '', color: '#ea580c' });
    const g = await api.getGroups() as GroupData[]; setGroups(g);
  };
  const handleDeleteGroup = async (id: string) => { await api.deleteGroup(id); setGroups((prev) => prev.filter((g) => g.id !== id)); };
  const handleAssignTeacher = async (groupId: string) => {
    if (!assignTeacherId) return;
    await api.assignTeacherToGroup(groupId, assignTeacherId);
    setAssignTeacherId('');
    const g = await api.getGroups() as GroupData[]; setGroups(g);
  };
  const handleRemoveTeacherFromGroup = async (groupId: string, teacherId: string) => {
    await api.removeTeacherFromGroup(groupId, teacherId);
    const g = await api.getGroups() as GroupData[]; setGroups(g);
  };
  const handleContactHandled = async (id: string) => {
    await api.markContactHandled(id); setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, isHandled: true } : c)));
  };

  if (authLoading || loading) return <div className="text-center py-20 text-stone-400">Yuklanmoqda...</div>;
  if (!isAdmin) return null;

  const inputCls = 'w-full px-3 py-2.5 rounded-xl border-2 border-stone-200 text-xs focus:border-orange-500 outline-none hover:border-orange-200 transition-colors';
  const tabItems = [
    { key: 'topics' as const, label: 'Mavzular' },
    { key: 'teachers' as const, label: `O'qituvchilar (${teachers.length})` },
    { key: 'groups' as const, label: `Guruhlar (${groups.length})` },
    { key: 'contacts' as const, label: `Arizalar (${contacts.filter((c) => !c.isHandled).length})` },
  ];

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto animate-fade-slide">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">Admin panel</h1>
          <p className="text-xs text-stone-400 mt-1">Platformani boshqaring</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-stone-100/60 rounded-full p-1 mb-6 overflow-x-auto">
        {tabItems.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              tab === t.key ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md' : 'text-stone-500 hover:text-stone-700'
            }`}>{t.label}</button>
        ))}
      </div>

      {/* ═══ TOPICS TAB ═══ */}
      {tab === 'topics' && (
        <>
          <div className="bg-white border-2 border-stone-200 rounded-2xl p-6 mb-6">
            <div className="text-[11px] font-bold tracking-widest text-orange-500 mb-4">YANGI MAVZU</div>
            <div className="flex gap-3 flex-wrap items-end">
              <div className="flex-1 min-w-[160px]">
                <label className="text-[11px] text-stone-500 block mb-1.5">Mavzu nomi</label>
                <input value={newTopic.name} onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })} placeholder="masalan: Termodinamika" className={inputCls} />
              </div>
              <div className="w-20">
                <label className="text-[11px] text-stone-500 block mb-1.5">Belgi</label>
                <input value={newTopic.symbol} onChange={(e) => setNewTopic({ ...newTopic, symbol: e.target.value.slice(0, 2) })} placeholder="Td" maxLength={2} className={`${inputCls} text-center font-bold`} />
              </div>
              <div>
                <label className="text-[11px] text-stone-500 block mb-1.5">Rang</label>
                <div className="flex gap-1.5">
                  {AVAILABLE_COLORS.map((c) => (
                    <button key={c.value} onClick={() => setNewTopic({ ...newTopic, color: c.value })} title={c.label}
                      className={`w-7 h-7 rounded-lg border-2 transition-all hover:scale-110 ${newTopic.color === c.value ? 'border-stone-900 scale-110 shadow-md' : 'border-transparent'}`}
                      style={{ background: c.value }} />
                  ))}
                </div>
              </div>
              <button onClick={handleAddTopic} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold shadow-md">+ Qo&apos;shish</button>
            </div>
          </div>
          {topics.map((t) => {
            const meta = getColorMeta(t.color);
            return (
              <div key={t.id} className="bg-white border-2 rounded-2xl p-5 mb-3" style={{ borderColor: meta.border }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-12 rounded-lg flex flex-col items-center justify-center text-white text-xs font-extrabold" style={{ background: t.color }}>
                      <span className="text-[6px] opacity-60">{t.number}</span><span className="text-sm">{t.symbol}</span>
                    </div>
                    <div><div className="text-sm font-extrabold">{t.name}</div><div className="text-[11px] text-stone-500">{topicQuestions[t.id]?.length ?? t._count?.questions ?? 0} ta savol</div></div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { expandedTopic === t.id ? setExpandedTopic(null) : (setExpandedTopic(t.id), loadQuestions(t.id)); }}
                      className="px-4 py-2 rounded-xl border-2 border-stone-200 text-[11px] font-bold hover:border-orange-300">{expandedTopic === t.id ? 'Yopish' : 'Savollar'}</button>
                    <button onClick={() => handleDeleteTopic(t.id)} className="px-4 py-2 rounded-xl bg-red-50 border-2 border-red-200 text-red-600 text-[11px] font-bold">O&apos;chirish</button>
                  </div>
                </div>
                {expandedTopic === t.id && (
                  <div className="mt-5 border-t border-stone-100 pt-4">
                    {(topicQuestions[t.id] || []).map((q, qi) => (
                      <div key={q.id} className="py-2.5 border-b border-stone-50 text-xs">
                        {editQ?.id === q.id ? (
                          <div className="space-y-2 bg-orange-50/50 rounded-xl p-3">
                            <input value={editQ.text} onChange={(e) => setEditQ({ ...editQ, text: e.target.value })} className={inputCls} />
                            {(['optionA','optionB','optionC','optionD'] as const).map((key, i) => (
                              <div key={key} className="flex items-center gap-2">
                                <input type="radio" checked={editQ.correct === i} onChange={() => setEditQ({ ...editQ, correct: i })} className="accent-orange-500" />
                                <input value={editQ[key]} onChange={(e) => setEditQ({ ...editQ, [key]: e.target.value })} className={`${inputCls} flex-1`} />
                              </div>
                            ))}
                            <div className="flex gap-2"><button onClick={() => handleSaveEdit(t.id)} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-[11px] font-bold">Saqlash</button><button onClick={() => setEditQ(null)} className="px-4 py-2 rounded-xl border border-stone-200 text-[11px] font-bold">Bekor</button></div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center group">
                            <div><span className="font-bold text-stone-300 mr-2">{qi+1}.</span>{q.text}<span className="ml-2 text-green-600 font-semibold text-[10px] bg-green-50 px-2 py-0.5 rounded-full">{[q.optionA,q.optionB,q.optionC,q.optionD][q.correct]}</span></div>
                            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                              <button onClick={() => setEditQ({...q})} className="px-2.5 py-1 rounded-lg border border-stone-200 text-[10px]">Tahrir</button>
                              <button onClick={() => handleDeleteQuestion(t.id, q.id)} className="px-2.5 py-1 rounded-lg border border-red-200 bg-red-50 text-red-600 text-[10px]">X</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="mt-4 p-5 rounded-xl" style={{ background: meta.bg }}>
                      <div className="text-[10px] font-bold tracking-widest mb-3" style={{ color: t.color }}>YANGI SAVOL</div>
                      <input value={newQ.text} onChange={(e) => setNewQ({ ...newQ, text: e.target.value })} placeholder="Savol matni..." className={`${inputCls} mb-2`} />
                      {(['optionA','optionB','optionC','optionD'] as const).map((key, i) => (
                        <div key={key} className="flex items-center gap-2 mb-1.5">
                          <input type="radio" name="newC" checked={newQ.correct === i} onChange={() => setNewQ({ ...newQ, correct: i })} className="accent-orange-500" />
                          <input value={newQ[key]} onChange={(e) => setNewQ({ ...newQ, [key]: e.target.value })} placeholder={`${i+1}-variant`} className={`${inputCls} flex-1`} />
                        </div>
                      ))}
                      <button onClick={() => handleAddQuestion(t.id)} className="mt-2 px-5 py-2 rounded-xl text-white text-[11px] font-bold" style={{ background: t.color }}>+ Savol qo&apos;shish</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}

      {/* ═══ TEACHERS TAB ═══ */}
      {tab === 'teachers' && (
        <>
          <div className="bg-white border-2 border-stone-200 rounded-2xl p-6 mb-6">
            <div className="text-[11px] font-bold tracking-widest text-purple-500 mb-4">YANGI O&apos;QITUVCHI YARATISH</div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div><label className="text-[11px] text-stone-500 block mb-1">Ism</label><input value={newTeacher.firstName} onChange={(e) => setNewTeacher({...newTeacher, firstName: e.target.value})} placeholder="Ism" className={inputCls} /></div>
              <div><label className="text-[11px] text-stone-500 block mb-1">Familiya</label><input value={newTeacher.lastName} onChange={(e) => setNewTeacher({...newTeacher, lastName: e.target.value})} placeholder="Familiya" className={inputCls} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div><label className="text-[11px] text-stone-500 block mb-1">Email</label><input value={newTeacher.email} onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})} placeholder="teacher@japacademy.uz" className={inputCls} /></div>
              <div><label className="text-[11px] text-stone-500 block mb-1">Parol</label><input value={newTeacher.password} onChange={(e) => setNewTeacher({...newTeacher, password: e.target.value})} placeholder="Kamida 6 belgi" className={inputCls} /></div>
            </div>
            <div className="mb-3"><label className="text-[11px] text-stone-500 block mb-1">Telefon (ixtiyoriy)</label><input value={newTeacher.phone} onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})} placeholder="+998..." className={inputCls} /></div>
            <button onClick={handleAddTeacher} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold shadow-md">+ O&apos;qituvchi yaratish</button>
          </div>
          {teachers.length === 0 ? <div className="text-center py-12 text-stone-400 text-sm">O&apos;qituvchilar yo&apos;q</div> : (
            <div className="space-y-3">
              {teachers.map((t) => (
                <div key={t.id} className="bg-white border-2 border-stone-200 rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold">{t.firstName.charAt(0)}{t.lastName.charAt(0)}</div>
                      <div>
                        <div className="text-sm font-extrabold">{t.firstName} {t.lastName}</div>
                        <div className="text-[11px] text-stone-400">{t.email}{t.phone ? ` · ${t.phone}` : ''}</div>
                        {t.teacherGroups.length > 0 && (
                          <div className="flex gap-1.5 mt-1.5">{t.teacherGroups.map((tg) => (
                            <span key={tg.group.id} className="text-[9px] px-2 py-0.5 rounded-full font-bold text-white" style={{ background: tg.group.color }}>{tg.group.name}</span>
                          ))}</div>
                        )}
                      </div>
                    </div>
                    <button onClick={() => handleDeleteTeacher(t.id)} className="px-4 py-2 rounded-xl bg-red-50 border-2 border-red-200 text-red-600 text-[11px] font-bold">O&apos;chirish</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ═══ GROUPS TAB ═══ */}
      {tab === 'groups' && (
        <>
          <div className="bg-white border-2 border-stone-200 rounded-2xl p-6 mb-6">
            <div className="text-[11px] font-bold tracking-widest text-orange-500 mb-4">YANGI GURUH YARATISH</div>
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="text-[11px] text-stone-500 block mb-1">Guruh nomi</label>
                <input value={newGroup.name} onChange={(e) => setNewGroup({...newGroup, name: e.target.value})} placeholder="masalan: Kimyo-1" className={inputCls} />
              </div>
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">Rang</label>
                <div className="flex gap-1.5">
                  {AVAILABLE_COLORS.slice(0,6).map((c) => (
                    <button key={c.value} onClick={() => setNewGroup({...newGroup, color: c.value})} className={`w-7 h-7 rounded-lg border-2 transition-all ${newGroup.color === c.value ? 'border-stone-900 scale-110' : 'border-transparent'}`} style={{ background: c.value }} />
                  ))}
                </div>
              </div>
              <button onClick={handleAddGroup} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold shadow-md">+ Yaratish</button>
            </div>
          </div>
          {groups.length === 0 ? <div className="text-center py-12 text-stone-400 text-sm">Guruhlar yo&apos;q</div> : (
            <div className="space-y-3">
              {groups.map((g) => (
                <div key={g.id} className="bg-white border-2 border-stone-200 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-base font-extrabold shadow-sm" style={{ background: g.color }}>{g.name.charAt(0)}</div>
                      <div>
                        <div className="text-sm font-extrabold">{g.name}</div>
                        <div className="text-[11px] text-stone-400">{g._count.members} o&apos;quvchi · {g._count.teachers} o&apos;qituvchi · {g._count.topics} mavzu</div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] text-stone-400">Kod:</span>
                          <span className="text-xs font-black tracking-[3px] bg-orange-50 text-orange-700 px-2.5 py-0.5 rounded-md border border-orange-200">{g.joinCode}</span>
                          <button onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(g.joinCode); }} className="text-[9px] text-orange-500 hover:text-orange-700 font-semibold">Nusxalash</button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteGroup(g.id)} className="px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[10px] font-bold">O&apos;chirish</button>
                  </div>
                  {/* Assigned teachers */}
                  <div className="text-[10px] font-bold text-stone-400 tracking-wider mb-2">O&apos;QITUVCHILAR</div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {g.teachers.map((gt) => (
                      <div key={gt.teacher.id} className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-2.5 py-1.5 rounded-full text-[11px] font-semibold">
                        {gt.teacher.firstName} {gt.teacher.lastName}
                        <button onClick={() => handleRemoveTeacherFromGroup(g.id, gt.teacher.id)} className="text-purple-400 hover:text-red-500 ml-0.5">&times;</button>
                      </div>
                    ))}
                    {g.teachers.length < 2 && teachers.length > 0 && (
                      <div className="flex gap-1.5">
                        <select value={assignTeacherId} onChange={(e) => setAssignTeacherId(e.target.value)} className="text-[11px] px-2 py-1.5 rounded-lg border border-stone-200">
                          <option value="">Teacher tanlang...</option>
                          {teachers.filter((t) => !g.teachers.some((gt) => gt.teacher.id === t.id)).map((t) => (
                            <option key={t.id} value={t.id}>{t.firstName} {t.lastName}</option>
                          ))}
                        </select>
                        <button onClick={() => handleAssignTeacher(g.id)} className="text-[10px] px-2.5 py-1.5 rounded-lg bg-purple-500 text-white font-bold">Tayinlash</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ═══ CONTACTS TAB ═══ */}
      {tab === 'contacts' && (
        <div className="space-y-3">
          {contacts.length === 0 ? <div className="text-center py-16 text-stone-400 text-sm">Arizalar yo&apos;q</div> : contacts.map((c) => (
            <div key={c.id} className={`bg-white border-2 rounded-2xl p-5 ${c.isHandled ? 'border-green-200 opacity-60' : 'border-stone-200'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-extrabold">{c.fullName}</div>
                  <div className="text-xs text-stone-500 mt-0.5">{c.phone}</div>
                  {c.message && <div className="text-xs text-stone-600 mt-2 bg-stone-50 p-3 rounded-xl">{c.message}</div>}
                  <div className="text-[10px] text-stone-400 mt-2">{new Date(c.createdAt).toLocaleString('uz-UZ')}</div>
                </div>
                {!c.isHandled ? (
                  <button onClick={() => handleContactHandled(c.id)} className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[11px] font-bold">Bajarildi</button>
                ) : <span className="text-[11px] text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded-full">Bajarilgan</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
