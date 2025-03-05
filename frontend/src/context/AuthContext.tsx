'use client'
import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  role: string;
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User, token: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser ] = useState<User | null>(null);
  const router = useRouter();

  const login = (userData: User, token: string) => {
    setUser (userData);
    console.log(userData);
    localStorage.setItem('token', JSON.stringify(token));
  };

  const logout = () => {
    setUser (null);
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
