import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, location: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('ai-farming-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('ai-farming-users') || '[]');
    const existingUser = users.find((u: User & { password: string }) => 
      u.email === email && u.password === password
    );

    if (existingUser) {
      const userData = { ...existingUser };
      delete userData.password;
      setUser(userData);
      localStorage.setItem('ai-farming-user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (name: string, email: string, password: string, location: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('ai-farming-users') || '[]');
    
    if (users.some((u: User) => u.email === email)) {
      setIsLoading(false);
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      location,
      createdAt: new Date()
    };

    users.push(newUser);
    localStorage.setItem('ai-farming-users', JSON.stringify(users));
    
    const userData = { ...newUser };
    delete userData.password;
    setUser(userData);
    localStorage.setItem('ai-farming-user', JSON.stringify(userData));
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ai-farming-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}