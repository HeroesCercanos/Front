import { API_BASE_URL } from '@/config/api';
import { ILoginProps } from '@/interfaces/AuthInterfaces/login.interfaces';

export const sendLogin = async (
	credentials: ILoginProps
): Promise<{ token: string } | undefined> => {
	try {
		const response = await fetch(`${API_BASE_URL}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error('Credenciales inválidas');
		}
		document.cookie = `jwtToken=${data.access_token}; path=/;`;
		localStorage.setItem('jwtToken', data.access_token);
		return { token: data.access_token };
	} catch (error) {
		alert('Credenciales inválidas');
	}
};
