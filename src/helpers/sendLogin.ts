import { API_BASE_URL } from '@/config/api';
import { ILoginProps } from '@/interfaces/AuthInterfaces/login.interfaces';

export const sendLogin = async (
  credentials: ILoginProps
): Promise<{ token: string }> => {
  const res = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Credenciales inválidas');
  }

  return { token: data.access_token };
};
