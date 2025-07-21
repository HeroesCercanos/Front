'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { API_BASE_URL } from '@/config/api';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const { setUserData } = useAuth();   // ← aquí

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error();
        const { user } = await res.json();

        setUserData(user);             // ← y aquí
        router.replace('/dashboard');
      } catch {
        router.replace('/login');
      }
    })();
  }, [router, setUserData]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Cargando sesión de Google…</p>
    </div>
  );
}