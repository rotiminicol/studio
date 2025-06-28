"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { xanoAuth } from '@/lib/xano';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: any) => Promise<void>;
  signup: (details: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  continueWithGoogle: (code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      xanoAuth.getMe(storedToken)
        .then(userData => {
          setUser(userData);
        })
        .catch(() => {
          // Token is invalid or expired
          localStorage.removeItem('authToken');
          setToken(null);
          setUser(null);
          if (pathname.startsWith('/dashboard')) {
            router.push('/auth');
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
       if (pathname.startsWith('/dashboard')) {
        router.push('/auth');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleAuthSuccess = async (authToken: string) => {
    localStorage.setItem('authToken', authToken);
    const userData = await xanoAuth.getMe(authToken);
    setUser(userData);
    setToken(authToken);
    if (userData.onboarding_complete) {
        router.push('/dashboard');
    } else {
        router.push('/onboarding');
    }
  }

  const login = async (credentials: any) => {
    setIsLoading(true);
    try {
      const { authToken } = await xanoAuth.login(credentials);
      await handleAuthSuccess(authToken);
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Login Failed', description: error.message });
      setUser(null);
      setToken(null);
    } finally {
        setIsLoading(false);
    }
  };

  const signup = async (details: any) => {
    setIsLoading(true);
    try {
      const { authToken } = await xanoAuth.signup(details);
      await handleAuthSuccess(authToken);
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Signup Failed', description: error.message });
      setUser(null);
      setToken(null);
    } finally {
        setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    router.push('/');
  };
  
  const continueWithGoogle = async (code: string) => {
    setIsLoading(true);
    try {
      const redirectUri = `${window.location.origin}/auth/google/callback`;
      const { authToken } = await xanoAuth.continueGoogleLogin(code, redirectUri);
      await handleAuthSuccess(authToken);
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Google Login Failed', description: error.message });
      setUser(null);
      setToken(null);
      router.push('/auth');
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = !isLoading && !!token && !!user;

  const value = { user, token, login, signup, logout, isLoading, isAuthenticated, continueWithGoogle };

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
