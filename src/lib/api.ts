const API = process.env.NEXT_PUBLIC_API_URL || 'https://jap-academy-backend-production.up.railway.app/api';

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Xatolik yuz berdi');
  }
  return res.json();
}

export const api = {
  submitContact: (data: { fullName: string; phone: string; message?: string }) =>
    request('/contacts', { method: 'POST', body: JSON.stringify(data) }),
};
