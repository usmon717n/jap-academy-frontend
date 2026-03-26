'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { api } from '@/lib/api';
import { User, AuthResponse } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('jap_token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const userData = (await api.me()) as User;
      setUser(userData);
    } catch {
      localStorage.removeItem('jap_token');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email: string, password: string) => {
    const res = (await api.login({ email, password })) as AuthResponse;
    localStorage.setItem('jap_token', res.accessToken);
    setUser(res.user);
  };

  const register = async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    const res = (await api.register(data)) as AuthResponse;
    localStorage.setItem('jap_token', res.accessToken);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem('jap_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin: user?.role === 'ADMIN' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
