'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser ] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser (userData);
    // Store token or user data as needed
    localStorage.setItem('token', JSON.stringify(userData)); // Example of storing user data
  };

  const logout = () => {
    setUser (null);
    localStorage.removeItem('token'); // Clear user data
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
