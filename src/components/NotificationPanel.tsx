'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Notification } from '@/types';

export default function NotificationPanel({ onClose }: { onClose: () => void }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getNotifications()
      .then((data) => setNotifications(data as Notification[]))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Bugun';
    if (diffDays === 1) return 'Kecha';
    return date.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' });
  };

  // If no API notifications, show static ones
  const displayNotifications = notifications.length > 0 ? notifications : [
    { id: '1', title: 'Test vaqti', message: "Kunlik test yechish vaqti keldi! Bilimingizni sinab ko'ring.", isRead: false, createdAt: new Date().toISOString() },
    { id: '2', title: 'Yangilik', message: "Yangi mavzu qo'shildi: Organik kimyo testlari tayyor!", isRead: false, createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: '3', title: 'Test vaqti', message: "Kunlik test yechish vaqti keldi! Natijalaringizni yaxshilang.", isRead: true, createdAt: new Date(Date.now() - 172800000).toISOString() },
  ];

  return (
    <div className="absolute top-10 right-0 w-80 bg-white border-2 border-stone-200 rounded-xl shadow-xl z-[1000] overflow-hidden">
      <div className="px-4 py-3 border-b border-stone-100 flex justify-between items-center">
        <span className="text-sm font-extrabold">Bildirishnomalar</span>
        <button onClick={onClose} className="text-stone-400 text-lg leading-none hover:text-stone-600">&times;</button>
      </div>
      {loading ? (
        <div className="p-4 text-center text-xs text-stone-400">Yuklanmoqda...</div>
      ) : (
        displayNotifications.map((n) => (
          <div key={n.id} className={`px-4 py-3 border-b border-stone-50 flex gap-3 ${n.isRead ? 'opacity-60' : ''}`}>
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div>
              <p className="text-xs leading-relaxed">{n.message}</p>
              <p className="text-[10px] text-stone-400 mt-1">{formatDate(n.createdAt)}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
