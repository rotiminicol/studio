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
  completeOnboarding: (data: { account_type: string }) => Promise<void>;
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
    const publicPages = ['/', '/about', '/careers', '/contact'];
    const authPages = ['/auth', '/auth/google/callback'];
    const isPublicPage = publicPages.includes(pathname);
    const isAuthPage = authPages.some(p => pathname.startsWith(p));
    const isOnboardingPage = pathname === '/onboarding';

    const storedToken = localStorage.getItem('authToken');

    if (!storedToken) {
      // No token, user is not authenticated
      setIsLoading(false);
      if (!isPublicPage && !isAuthPage && !isOnboardingPage) {
        router.push('/auth');
      }
      return;
    }

    // Token exists, validate it
    xanoAuth.getMe(storedToken)
      .then(userData => {
        setUser(userData);
        setToken(storedToken);
        const isOnboarded = userData.onboarding_complete;

        if (isAuthPage) {
          // If user is on login/signup page but is already logged in
          router.push(isOnboarded ? '/dashboard' : '/onboarding');
        } else if (isOnboardingPage && isOnboarded) {
          // If user is on onboarding but has already completed it
          router.push('/dashboard');
        } else if (!isOnboardingPage && !isOnboarded && !isPublicPage) {
          // If user is not onboarded and tries to access any other protected page
          router.push('/onboarding');
        }
      })
      .catch(() => {
        // Token is invalid
        localStorage.removeItem('authToken');
        setUser(null);
        setToken(null);
        if (!isPublicPage && !isAuthPage) {
          router.push('/auth');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);


  const handleAuthSuccess = async (authToken: string) => {
    localStorage.setItem('authToken', authToken);
    setToken(authToken);
    try {
        const userData = await xanoAuth.getMe(authToken);
        setUser(userData);
        if (userData.onboarding_complete) {
            router.push('/dashboard');
        } else {
            router.push('/onboarding');
        }
    } catch (error) {
        toast({ variant: 'destructive', title: 'Authentication Failed', description: 'Could not retrieve user details.' });
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
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

  const completeOnboarding = async (data: { account_type: string }) => {
    if (!token) return;
    setIsLoading(true);
    try {
      const payload = { 
        onboarding_complete: true,
        ...data,
      };
      const updatedUser = await xanoAuth.updateMe(token, payload);
      setUser(updatedUser);
      router.push('/dashboard');
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Onboarding Failed', description: 'Could not save your settings.' });
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = !isLoading && !!token && !!user;

  const value = { user, token, login, signup, logout, isLoading, isAuthenticated, continueWithGoogle, completeOnboarding };

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
