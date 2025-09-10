'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';
import { authService } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  hasRole: (role: User['role']) => boolean;
  canAccessDistributorFeatures: boolean;
  canAccessBusinessFeatures: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, _password: string) => {
    try {
      const user = await authService.login(email);
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: Partial<User>) => {
    try {
      const user = await authService.register(userData);
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      const updatedUser = await authService.updateProfile(updates);
      setUser(updatedUser);
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    hasRole: (role: User['role']) => user?.role === role,
    canAccessDistributorFeatures: user?.role === 'distributor' && user?.isVerified === true,
    canAccessBusinessFeatures: user?.role === 'business' && user?.isVerified === true,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
