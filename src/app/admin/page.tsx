'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';

export default function AdminPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<'about' | 'useful' | 'footer' | 'contacts'>('about');
  const [content, setContent] = useState<any>({});
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState('');

  useEffect(() => { if (!authLoading && !isAdmin) router.push('/'); }, [isAdmin, authLoading, router]);

  useEffect(() => {
    if (isAdmin) {
      Promise.all([api.getSiteContent(), api.getContacts().catch(() => [])])
        .then(([c, co]) => { setContent(c); setContacts(co as any[]); })
        .finally(() => setLoading(false));
    }
  }, [isAdmin]);

  const save = async (key: string, value: any) => {
    setSaving(true);
    await api.setSiteContent(key, value);
    setContent((p: any) => ({ ...p, [key]: value }));
    setSaved(key); setTimeout(() => setSaved(''), 2000);
    setSaving(false);
  };

  if (authLoading || loading) return <div className="text-center py-20 text-stone-400">Yuklanmoqda...</div>;
  if (!isAdmin) return null;

  const inputCls = 'w-full px-3 py-2.5 rounded-xl border-2 border-stone-200 text-xs focus:border-orange-500 outline-none';
  const cardStyle = { background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' };
  const tabs = [
    { key: 'about' as const, label: 'Biz haqimizda' },
    { key: 'useful' as const, label: 'Foydali' },
    { key: 'footer' as const, label: 'Footer' },
    { key: 'contacts' as const, label: `Arizalar (${contacts.filter((c: any) => !c.isHandled).length})` },
  ];

  const results: any[] = content.about_results || [];
  const students: any[] = content.about_students || [];
  const videos: any[] = content.useful_videos || [];
  const socials: any = content.footer_socials || {};
  const location: any = content.footer_location || {};

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-black mb-1">Admin panel</h1>
      <p className="text-xs text-stone-400 mb-6">Sayt kontentini boshqaring</p>

      <div className="flex gap-1 rounded-full p-1 mb-6 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.4)' }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${tab === t.key ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md' : 'text-stone-500 hover:text-stone-700'}`}>{t.label}</button>
        ))}
      </div>
      {saved && <div className="mb-4 text-xs text-green-600 font-bold bg-green-50 px-4 py-2 rounded-xl inline-block">Saqlandi!</div>}

      {/* ═══ ABOUT TAB ═══ */}
      {tab === 'about' && (
        <div className="space-y-6">
          {/* Results images */}
          <div className="p-6 rounded-2xl" style={cardStyle}>
            <div className="text-[11px] font-bold tracking-widest text-orange-500 mb-4">NATIJALAR RASMLARI (slider)</div>
            {results.map((r: any, i: number) => (
              <div key={i} className="flex gap-3 items-center mb-3">
                <input value={r.image} onChange={e => { const u = [...results]; u[i] = { ...r, image: e.target.value }; setContent((p: any) => ({ ...p, about_results: u })); }} placeholder="Rasm URL" className={`${inputCls} flex-1`} />
                <input value={r.alt} onChange={e => { const u = [...results]; u[i] = { ...r, alt: e.target.value }; setContent((p: any) => ({ ...p, about_results: u })); }} placeholder="Alt text" className={`${inputCls} w-32`} />
                <button onClick={() => { const u = results.filter((_: any, j: number) => j !== i); setContent((p: any) => ({ ...p, about_results: u })); }} className="text-red-500 text-xs font-bold">X</button>
              </div>
            ))}
            <div className="flex gap-2 mt-3">
              <button onClick={() => setContent((p: any) => ({ ...p, about_results: [...results, { image: '', alt: '' }] }))} className="text-xs text-orange-600 font-bold">+ Rasm qo&apos;shish</button>
              <button onClick={() => save('about_results', results)} disabled={saving} className="btn-primary px-4 py-2 rounded-lg text-white text-xs font-bold ml-auto">Saqlash</button>
            </div>
          </div>

          {/* Students */}
          <div className="p-6 rounded-2xl" style={cardStyle}>
            <div className="text-[11px] font-bold tracking-widest text-orange-500 mb-4">O&apos;QUVCHILAR (5 ta card)</div>
            {students.map((s: any, i: number) => (
              <div key={i} className="flex gap-2 items-center mb-3 p-3 rounded-xl bg-stone-50/50">
                <input value={s.name} onChange={e => { const u = [...students]; u[i] = { ...s, name: e.target.value }; setContent((p: any) => ({ ...p, about_students: u })); }} placeholder="Ism" className={`${inputCls} w-36`} />
                <input value={s.desc} onChange={e => { const u = [...students]; u[i] = { ...s, desc: e.target.value }; setContent((p: any) => ({ ...p, about_students: u })); }} placeholder="Tavsif" className={`${inputCls} flex-1`} />
                <input value={s.image} onChange={e => { const u = [...students]; u[i] = { ...s, image: e.target.value }; setContent((p: any) => ({ ...p, about_students: u })); }} placeholder="Rasm URL" className={`${inputCls} w-40`} />
                <button onClick={() => { const u = students.filter((_: any, j: number) => j !== i); setContent((p: any) => ({ ...p, about_students: u })); }} className="text-red-500 text-xs font-bold">X</button>
              </div>
            ))}
            <div className="flex gap-2 mt-3">
              <button onClick={() => setContent((p: any) => ({ ...p, about_students: [...students, { name: '', desc: '', image: '' }] }))} className="text-xs text-orange-600 font-bold">+ O&apos;quvchi</button>
              <button onClick={() => save('about_students', students)} disabled={saving} className="btn-primary px-4 py-2 rounded-lg text-white text-xs font-bold ml-auto">Saqlash</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ USEFUL TAB ═══ */}
      {tab === 'useful' && (
        <div className="p-6 rounded-2xl" style={cardStyle}>
          <div className="text-[11px] font-bold tracking-widest text-orange-500 mb-4">YOUTUBE VIDEOLAR</div>
          {videos.map((v: any, i: number) => (
            <div key={i} className="flex gap-3 items-center mb-3">
              <input value={v.title} onChange={e => { const u = [...videos]; u[i] = { ...v, title: e.target.value }; setContent((p: any) => ({ ...p, useful_videos: u })); }} placeholder="Video nomi" className={`${inputCls} w-48`} />
              <input value={v.url} onChange={e => { const u = [...videos]; u[i] = { ...v, url: e.target.value }; setContent((p: any) => ({ ...p, useful_videos: u })); }} placeholder="YouTube embed URL" className={`${inputCls} flex-1`} />
              <button onClick={() => { const u = videos.filter((_: any, j: number) => j !== i); setContent((p: any) => ({ ...p, useful_videos: u })); }} className="text-red-500 text-xs font-bold">X</button>
            </div>
          ))}
          <div className="flex gap-2 mt-3">
            <button onClick={() => setContent((p: any) => ({ ...p, useful_videos: [...videos, { title: '', url: '' }] }))} className="text-xs text-orange-600 font-bold">+ Video</button>
            <button onClick={() => save('useful_videos', videos)} disabled={saving} className="btn-primary px-4 py-2 rounded-lg text-white text-xs font-bold ml-auto">Saqlash</button>
          </div>
          <p className="text-[10px] text-stone-400 mt-3">URL format: https://www.youtube.com/embed/VIDEO_ID</p>
        </div>
      )}

      {/* ═══ FOOTER TAB ═══ */}
      {tab === 'footer' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl" style={cardStyle}>
            <div className="text-[11px] font-bold tracking-widest text-orange-500 mb-4">IJTIMOIY TARMOQLAR</div>
            <div className="space-y-3">
              <div><label className="text-[11px] text-stone-500 block mb-1">Telegram</label><input value={socials.telegram || ''} onChange={e => setContent((p: any) => ({ ...p, footer_socials: { ...socials, telegram: e.target.value } }))} className={inputCls} /></div>
              <div><label className="text-[11px] text-stone-500 block mb-1">Instagram</label><input value={socials.instagram || ''} onChange={e => setContent((p: any) => ({ ...p, footer_socials: { ...socials, instagram: e.target.value } }))} className={inputCls} /></div>
              <div><label className="text-[11px] text-stone-500 block mb-1">YouTube</label><input value={socials.youtube || ''} onChange={e => setContent((p: any) => ({ ...p, footer_socials: { ...socials, youtube: e.target.value } }))} className={inputCls} /></div>
            </div>
            <button onClick={() => save('footer_socials', content.footer_socials)} disabled={saving} className="btn-primary px-4 py-2 rounded-lg text-white text-xs font-bold mt-4">Saqlash</button>
          </div>

          <div className="p-6 rounded-2xl" style={cardStyle}>
            <div className="text-[11px] font-bold tracking-widest text-orange-500 mb-4">MANZIL VA XARITA</div>
            <div className="space-y-3">
              <div><label className="text-[11px] text-stone-500 block mb-1">Manzil matni</label><input value={location.address || ''} onChange={e => setContent((p: any) => ({ ...p, footer_location: { ...location, address: e.target.value } }))} className={inputCls} /></div>
              <div><label className="text-[11px] text-stone-500 block mb-1">Google Maps embed URL</label><input value={location.mapUrl || ''} onChange={e => setContent((p: any) => ({ ...p, footer_location: { ...location, mapUrl: e.target.value } }))} className={inputCls} /></div>
              <p className="text-[10px] text-stone-400">Google Maps &rarr; Share &rarr; Embed a map &rarr; Copy src URL</p>
            </div>
            <button onClick={() => save('footer_location', content.footer_location)} disabled={saving} className="btn-primary px-4 py-2 rounded-lg text-white text-xs font-bold mt-4">Saqlash</button>
          </div>
        </div>
      )}

      {/* ═══ CONTACTS TAB ═══ */}
      {tab === 'contacts' && (
        <div className="space-y-3">
          {contacts.length === 0 ? <div className="text-center py-16 text-stone-400 text-sm">Arizalar yo&apos;q</div> : contacts.map((c: any) => (
            <div key={c.id} className={`p-5 rounded-2xl ${c.isHandled ? 'opacity-50' : ''}`} style={cardStyle}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-extrabold">{c.fullName}</div>
                  <div className="text-xs text-stone-500 mt-0.5">{c.phone}</div>
                  {c.message && <div className="text-xs text-stone-600 mt-2 bg-stone-50/50 p-3 rounded-xl">{c.message}</div>}
                  <div className="text-[10px] text-stone-400 mt-2">{new Date(c.createdAt).toLocaleString('uz-UZ')}</div>
                </div>
                {!c.isHandled && (
                  <button onClick={async () => { await api.markContactHandled(c.id); setContacts(p => p.map(x => x.id === c.id ? { ...x, isHandled: true } : x)); }}
                    className="btn-primary px-4 py-2 rounded-xl text-white text-[11px] font-bold">Bajarildi</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
