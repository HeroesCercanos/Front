'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { API_BASE_URL } from '@/config/api';

const LoginGoogle = () => {
	const router = useRouter();
	const { setUserData } = useAuth();

	useEffect(() => {
		fetch(`${API_BASE_URL}/auth/me`, {
			credentials: 'include',
		})
			.then((res) => {
				if (!res.ok) throw new Error('No autenticado');
				return res.json();
			})
			.then((data) => {
				setUserData({
					token: '',
					user: data.user,
				});
				router.push('/');
			})
			.catch(() => {
				router.push('/login');
			});
	}, [router, setUserData]);

	return <div>Cargando sesión...</div>;
};

export default LoginGoogle;
