import { API_BASE_URL } from '@/config/api';
import {
  IRegisterProps,
  IRegisterResponse,
} from '@/interfaces/AuthInterfaces/register.interfaces';

export const sendRegister = async (
  newUser: IRegisterProps
): Promise<IRegisterResponse | null> => {

    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      const msg = data?.message || 'Error al registrar usuario';
      throw new Error(msg);
    }

    return data as IRegisterResponse;
};
