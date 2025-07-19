import { API_BASE_URL } from '@/config/api';
import {
	IRegisterProps,
	IRegisterResponse,
} from '@/interfaces/AuthInterfaces/register.interfaces';

export const sendRegister = async (
	newUser: IRegisterProps
): Promise<IRegisterResponse | null> => {
	try {
		const response = await fetch(`${API_BASE_URL}/auth/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newUser),
		});

		const data: any = await response.json();

		if (!response.ok) {
			const msg = data?.message || 'Error al registrar usuario';
			throw new Error(msg);
		}

		if (data.access_token) {
			document.cookie = `jwtToken=${data.access_token}; path=/; SameSite=None; Secure`;
			localStorage.setItem('jwtToken', data.access_token);
		}

		return data as IRegisterResponse;
	} catch (err: any) {
		alert(err.message || 'Error al registrar usuario');
		return null;
	}
};
