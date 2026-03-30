const API = process.env.NEXT_PUBLIC_API_URL || 'https://jap-academy-backend-production.up.railway.app/api';

async function request(path: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { headers, ...options });
  if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.message || 'Xatolik'); }
  return res.json();
}

export const api = {
  submitContact: (data: { fullName: string; phone: string; message?: string }) =>
    request('/contacts', { method: 'POST', body: JSON.stringify(data) }),
  getContacts: () => request('/contacts'),
  markContactHandled: (id: string) => request(`/contacts/${id}/handled`, { method: 'PATCH' }),

  getSiteContent: () => request('/site-content').catch(() => ({})),
  setSiteContent: (key: string, value: any) =>
    request(`/site-content/${key}`, { method: 'PUT', body: JSON.stringify({ value }) }),
};
