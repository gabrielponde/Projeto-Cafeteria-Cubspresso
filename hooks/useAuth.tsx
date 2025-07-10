'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DecodedToken {
  userId: string;
  email: string;
  exp: number; // Expiration time
}

interface AuthContextProps {
  user: DecodedToken | null;
  loading: boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      try {
        const decoded: DecodedToken = JSON.parse(atob(token.split('.')[1]));
        // Checa se o token não expirou
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        } else {
          localStorage.removeItem('jwt_token');
        }
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
        localStorage.removeItem('jwt_token');
      }
    }
    setLoading(false);

    const handleStorageChange = () => {
      const newToken = localStorage.getItem('jwt_token');
      if (!newToken) {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const signOut = () => {
    localStorage.removeItem('jwt_token');
    setUser(null);
    window.location.href = '/login'; // Redireciona para a página de login após o logout
  };

  const value = { user, loading, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 