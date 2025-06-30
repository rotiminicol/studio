
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi, mainApi } from '@/lib/xano';
import type { User, LoginCredentials, SignupCredentials } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
        try {
          const { data } = await authApi.get('/auth/me', {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          setUser(data);
        } catch (error) {
          console.error('Failed to fetch user with stored token', error);
          localStorage.removeItem('authToken');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const { data } = await authApi.post('/auth/login', credentials);
      localStorage.setItem('authToken', data.authToken);
      setToken(data.authToken);
      
      const { data: userData } = await authApi.get('/auth/me', {
        headers: { Authorization: `Bearer ${data.authToken}` }
      });
      setUser(userData);
      
      if(userData.onboarding_complete){
        router.push('/dashboard/overview');
      } else {
        router.push('/onboarding');
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Login Failed', description: error.response?.data?.message || 'An unexpected error occurred.' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    setLoading(true);
    try {
      const { data } = await authApi.post('/auth/signup', credentials);
      localStorage.setItem('authToken', data.authToken);
      setToken(data.authToken);

      const { data: userData } = await authApi.get('/auth/me', {
        headers: { Authorization: `Bearer ${data.authToken}` }
      });
      setUser(userData);
      
      router.push('/onboarding');
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Signup Failed', description: error.response?.data?.message || 'An unexpected error occurred.' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    router.push('/auth');
  };
  
  const completeOnboarding = async () => {
    if (!token) {
        toast({ variant: 'destructive', title: 'Authentication Error', description: 'No authentication token found.' });
        throw new Error("No token found");
    }
    setLoading(true);
    try {
        // Use POST to /auth/me to update the user record. This is a standard Xano pattern.
        const { data: updatedUser } = await authApi.post(
            '/auth/me', 
            { onboarding_complete: true },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        setUser(updatedUser);
        toast({ title: "Setup Complete!", description: "Welcome to your new dashboard." });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Onboarding Error', description: error.response?.data?.message || 'Could not complete onboarding.' });
      throw error;
    } finally {
        setLoading(false);
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    completeOnboarding,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
