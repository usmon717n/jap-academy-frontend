'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { Topic, Result } from '@/types';

interface GroupDetail {
  id: string; name: string; color: string;
  members: Array<{ id: string; user: { id: string; firstName: string; lastName: string; email: string; phone: string } }>;
  teachers: Array<{ teacher: { id: string; firstName: string; lastName: string; email: string } }>;
  topics: Array<{ id: string; topic: { id: string; name: string; symbol: string; color: string; number: string } }>;
}

interface StudentOption { id: string; firstName: string; lastName: string; email: string }

export default function TeacherGroupPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [group, setGroup] = useState<GroupDetail | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [allTopics, setAllTopics] = useState<Topic[]>([]);
  const [allStudents, setAllStudents] = useState<StudentOption[]>([]);
  const [tab, setTab] = useState<'members' | 'topics' | 'results'>('members');
  const [loading, setLoading] = useState(true);
  const [addStudentEmail, setAddStudentEmail] = useState('');

  useEffect(() => {
    if (!authLoading && (!user || (user.role !== 'TEACHER' && user.role !== 'ADMIN'))) router.push('/');
  }, [user, authLoading, router]);

  const loadGroup = async () => {
    try {
      const [g, t, r] = await Promise.all([
        api.getGroup(groupId) as Promise<GroupDetail>,
        api.getTopics() as Promise<Topic[]>,
        api.getGroupResults(groupId).catch(() => []) as Promise<Result[]>,
      ]);
      setGroup(g);
      setAllTopics(t);
      setResults(r);

      if (user?.role === 'ADMIN') {
        const students = await api.getAllStudents() as StudentOption[];
        setAllStudents(students);
      }
    } catch { router.push('/teacher'); }
    setLoading(false);
  };

  useEffect(() => { if (user) loadGroup(); }, [user, groupId]);

  const handleAddStudent = async () => {
    if (!addStudentEmail.trim()) return;
    const student = allStudents.find((s) => s.email === addStudentEmail.trim());
    if (!student) { alert("Bunday email topilmadi. O'quvchi avval ro'yxatdan o'tishi kerak."); return; }
    await api.addMemberToGroup(groupId, student.id);
    setAddStudentEmail('');
    loadGroup();
  };

  const handleRemoveMember = async (userId: string) => {
    await api.removeMemberFromGroup(groupId, userId);
    loadGroup();
  };

  const handleAddTopic = async (topicId: string) => {
    await api.assignTopicToGroup(groupId, topicId);
    loadGroup();
  };

  const handleRemoveTopic = async (topicId: string) => {
    await api.removeTopicFromGroup(groupId, topicId);
    loadGroup();
  };

  if (authLoading || loading) return <div className="text-center py-20 text-stone-400">Yuklanmoqda...</div>;
  if (!group) return null;

  const assignedTopicIds = group.topics.map((t) => t.topic.id);
  const availableTopics = allTopics.filter((t) => !assignedTopicIds.includes(t.id));
  const inputCls = 'w-full px-3 py-2.5 rounded-xl border-2 border-stone-200 text-xs hover:border-orange-200 transition-colors';

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto animate-fade-slide">
      {/* Header */}
      <button onClick={() => router.push('/teacher')} className="text-xs text-stone-400 hover:text-orange-600 mb-4 flex items-center gap-1">
        &larr; Guruhlar
      </button>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl font-extrabold shadow-lg" style={{ background: group.color }}>
          {group.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-black">{group.name}</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            {group.members.length} o&apos;quvchi &middot; {group.topics.length} mavzu
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-stone-100/60 rounded-full p-1 mb-6 w-fit">
        {(['members', 'topics', 'results'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              tab === t ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md' : 'text-stone-500 hover:text-stone-700'
            }`}>
            {t === 'members' ? `O'quvchilar (${group.members.length})` : t === 'topics' ? `Mavzular (${group.topics.length})` : `Natijalar (${results.length})`}
          </button>
        ))}
      </div>

      {/* Members tab */}
      {tab === 'members' && (
        <div>
          <div className="bg-white border-2 border-stone-200 rounded-2xl p-5 mb-4">
            <div className="text-[11px] font-bold tracking-widest text-orange-500 mb-3">O&apos;QUVCHI QO&apos;SHISH</div>
            <div className="flex gap-2">
              <input value={addStudentEmail} onChange={(e) => setAddStudentEmail(e.target.value)}
                placeholder="O'quvchi emaili..." className={`${inputCls} flex-1`}
                onKeyDown={(e) => e.key === 'Enter' && handleAddStudent()} />
              <button onClick={handleAddStudent}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold">
                + Qo&apos;shish
              </button>
            </div>
          </div>

          {group.members.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-sm">Hali o&apos;quvchi qo&apos;shilmagan</div>
          ) : (
            <div className="space-y-2">
              {group.members.map((m) => (
                <div key={m.id} className="flex items-center justify-between p-4 bg-white border border-stone-100 rounded-xl hover:border-orange-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
                      {m.user.firstName.charAt(0)}{m.user.lastName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{m.user.firstName} {m.user.lastName}</div>
                      <div className="text-[11px] text-stone-400">{m.user.email}{m.user.phone ? ` · ${m.user.phone}` : ''}</div>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveMember(m.user.id)}
                    className="text-[10px] px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 font-bold hover:bg-red-100">
                    Chiqarish
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Topics tab */}
      {tab === 'topics' && (
        <div>
          {/* Assigned topics */}
          <div className="text-[11px] font-bold tracking-widest text-stone-400 mb-3">TAYINLANGAN MAVZULAR</div>
          {group.topics.length === 0 ? (
            <div className="text-center py-8 text-stone-400 text-sm mb-6">Mavzu tayinlanmagan</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {group.topics.map((gt) => (
                <div key={gt.id} className="flex items-center justify-between p-4 bg-white border-2 rounded-xl" style={{ borderColor: gt.topic.color + '40' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-12 rounded-lg flex flex-col items-center justify-center text-white text-xs font-extrabold" style={{ background: gt.topic.color }}>
                      <span className="text-[6px] opacity-60">{gt.topic.number}</span>
                      <span className="text-sm">{gt.topic.symbol}</span>
                    </div>
                    <span className="text-sm font-bold">{gt.topic.name}</span>
                  </div>
                  <button onClick={() => handleRemoveTopic(gt.topic.id)}
                    className="text-[10px] px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 font-bold">
                    Olib tashlash
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Available topics to add */}
          {availableTopics.length > 0 && (
            <>
              <div className="text-[11px] font-bold tracking-widest text-stone-400 mb-3">MAVZU QO&apos;SHISH</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableTopics.map((t) => (
                  <button key={t.id} onClick={() => handleAddTopic(t.id)}
                    className="flex items-center gap-3 p-4 bg-stone-50 border-2 border-dashed border-stone-200 rounded-xl hover:border-orange-300 transition-colors text-left">
                    <div className="w-10 h-12 rounded-lg flex flex-col items-center justify-center text-white text-xs font-extrabold opacity-60" style={{ background: t.color }}>
                      {t.symbol}
                    </div>
                    <div>
                      <span className="text-sm font-bold">{t.name}</span>
                      <div className="text-[10px] text-orange-600 font-semibold mt-0.5">+ Qo&apos;shish</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Results tab */}
      {tab === 'results' && (
        <div>
          {results.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-sm">Hali natijalar yo&apos;q</div>
          ) : (
            <div className="space-y-2">
              {results.map((r: any) => (
                <div key={r.id} className="flex items-center justify-between p-4 bg-white border border-stone-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-600">
                      {r.user?.firstName?.charAt(0)}{r.user?.lastName?.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{r.user?.firstName} {r.user?.lastName}</div>
                      <div className="text-[10px] text-stone-400">{r.topic?.name} &middot; {new Date(r.createdAt).toLocaleDateString('uz-UZ')}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-black ${r.percentage >= 70 ? 'text-green-600' : r.percentage >= 50 ? 'text-orange-600' : 'text-red-600'}`}>
                      {r.percentage}%
                    </div>
                    <div className="text-[10px] text-stone-400">{r.correctCount}/{r.totalQuestions}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
