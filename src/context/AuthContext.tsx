"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { IUserSession } from "@/interfaces/AuthInterfaces/user.interface";

interface IAuthContextProps {
  userData: IUserSession | null;
  setUserData: (userData: IUserSession | null) => void;
}

const AuthContext = createContext<IAuthContextProps>({
  userData: null,
  setUserData: () => { },
});

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1) Capturar token de la URL si existe
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get("token");
    if (tokenParam) {
      localStorage.setItem("jwtToken", tokenParam);
      window.history.replaceState({}, "", window.location.pathname);
       document.cookie = `jwtToken=${tokenParam}; path=/;`;
       window.history.replaceState({}, "", window.location.pathname);
    }

    // 2) Leer el token y decodificarlo
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        type Payload = { sub: string; email: string; name?: string; role: string; exp: number };
        const decoded = jwtDecode(token) as Payload;
        const { sub, email, name, role, exp } = decoded;

        // Verificar expiración
        if (exp * 1000 > Date.now()) {
          setUserData({
            token,
            user: {
              id: Number(sub),
              email,
              name: name || "",
              donations: [],
            },
          });
        } else {
          localStorage.removeItem("jwtToken");
        }
      } catch (error) {
        localStorage.removeItem("jwtToken");
      }
    }

    setLoading(false);
  }, []);

  if (loading) {
    return null; // o un spinner mientras carga
  }

  console.log("userData:", userData);


  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;