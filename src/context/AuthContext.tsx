'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { IUserSession } from '@/interfaces';
import Cookies from 'js-cookie';

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

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userSession', JSON.stringify(userData));
      Cookies.set('userSession', JSON.stringify(userData)); 
    } else {
      localStorage.removeItem('userSession');
      Cookies.remove('userSession'); 
    }
  }, [userData]);

  useEffect(() => {
    const stored = localStorage.getItem('userSession');
    if (stored) {
      setUserData(JSON.parse(stored));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
