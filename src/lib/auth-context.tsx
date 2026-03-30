'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User { id: string; email: string; firstName: string; lastName: string; phone: string; role: 'STUDENT' | 'ADMIN' | 'TEACHER' }
interface AuthCtx { user: User | null; loading: boolean; isAdmin: boolean; login: (e: string, p: string) => Promise<void>; register: (d: any) => Promise<void>; logout: () => void; setUser: (u: User) => void }

const API = process.env.NEXT_PUBLIC_API_URL || 'https://jap-academy-backend-production.up.railway.app/api';
const Ctx = createContext<AuthCtx>({} as AuthCtx);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (!t) { setLoading(false); return; }
    fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${t}` } })
      .then(r => r.ok ? r.json() : Promise.reject()).then(setUser)
      .catch(() => localStorage.removeItem('token')).finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const r = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    if (!r.ok) throw new Error((await r.json()).message || 'Xatolik');
    const d = await r.json(); localStorage.setItem('token', d.access_token);
    const me = await fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${d.access_token}` } }).then(r => r.json());
    setUser(me);
  };
  const register = async (data: any) => {
    const r = await fetch(`${API}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!r.ok) throw new Error((await r.json()).message || 'Xatolik');
    const d = await r.json(); localStorage.setItem('token', d.access_token);
    const me = await fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${d.access_token}` } }).then(r => r.json());
    setUser(me);
  };
  const logout = () => { localStorage.removeItem('token'); setUser(null); };

  return <Ctx.Provider value={{ user, loading, isAdmin: user?.role === 'ADMIN', login, register, logout, setUser }}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);
