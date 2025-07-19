'use client';

import { createContext, useContext, useEffect, useState } from 'react';
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
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    // — REMOVED: lectura de token de URL y de localStorage, jwtDecode, etc.

    // — ADDED: fetch a /auth/me para que la cookie HttpOnly enviada en login sea válida
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      method:      'GET',
      credentials: 'include',        // ← para enviar la cookie jwtToken
    })
      .then((res) => {
        if (!res.ok) throw new Error('No autenticado');
        return res.json();
      })
      .then((user) => {
        // user ya viene del backend: { id, email, name, role, donations }
        setUserData({
          token: '',                  // ← en cookie-based no tenemos token en JS
          user: {
            id:         user.id,
            email:      user.email,
            name:       user.name,
            role:       user.role,
            donations:  user.donations ?? [],
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

  if (loading) return null; // o un spinner

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;




/* 'use client';

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
 */