'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { IUserSession } from '@/interfaces/AuthInterfaces/user.interface';
import { API_BASE_URL } from '@/config/api';

interface IAuthContextProps {
	userData: IUserSession | null;
	setUserData: (userData: IUserSession | null) => void;
	loading: boolean;
}

const AuthContext = createContext<IAuthContextProps>({
	userData: null,
	setUserData: () => {},
	loading: true,
});

interface IAuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
	const [userData, setUserData] = useState<IUserSession | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`${API_BASE_URL}/auth/me`, {
			credentials: 'include',
		})
			.then((res) => {
				if (!res.ok) throw new Error('No autenticado');
				return res.json();
			})
			.then((data) => {
				const u = data.user;
				setUserData({
					token: '',
					user: {
						id: u.id,
						email: u.email,
						name: u.name,
						role: u.role,
						donations: u.donations ?? [],
						phone: u.phone || '',
						address: u.address || '',
					},
				});
			})
			.catch(() => {
				setUserData(null);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<AuthContext.Provider value={{ userData, setUserData, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
