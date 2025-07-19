'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { IUserSession } from '@/interfaces/AuthInterfaces/user.interface';

interface IAuthContextProps {
	userData: IUserSession | null;
	setUserData: (userData: IUserSession | null) => void;
}

const AuthContext = createContext<IAuthContextProps>({
	userData: null,
	setUserData: () => {},
});

interface IAuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
	const [userData, setUserData] = useState<IUserSession | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const tokenFromUrl = params.get('token');
		if (tokenFromUrl) {
			localStorage.setItem('jwtToken', tokenFromUrl);
			window.history.replaceState({}, '', window.location.pathname);
		}

		const token = localStorage.getItem('jwtToken');
		if (token) {
			try {
				type Payload = {
					sub: string;
					email: string;
					name?: string;
					role: 'admin' | 'user';
					exp: number;
				};
				const decoded = jwtDecode<Payload>(token);
				const { sub, email, name, role, exp } = decoded;

				if (exp * 1000 > Date.now()) {
					setUserData({
						token,
						user: {
							id: sub,
							email,
							name: name || '',
							donations: [],
							role,
						},
					});
				} else {
					localStorage.removeItem('jwtToken');
				}
			} catch {
				localStorage.removeItem('jwtToken');
			}
		}

		setLoading(false);
	}, []);

	if (loading) return null;

	return (
		<AuthContext.Provider value={{ userData, setUserData }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
