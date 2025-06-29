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
        console.log('User data from getMe:', userData);
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
      .catch((error) => {
        // Token is invalid
        console.error('Token validation failed:', error);
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
        console.log('User data after auth success:', userData);
        setUser(userData);
        if (userData.onboarding_complete) {
            router.push('/dashboard');
        } else {
            router.push('/onboarding');
        }
    } catch (error) {
        console.error('Failed to get user data after auth:', error);
        toast({ variant: 'destructive', title: 'Authentication Failed', description: 'Could not retrieve user details.' });
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
    }
  }

  const login = async (credentials: any) => {
    setIsLoading(true);
    try {
      console.log('Attempting login...');
      const response = await xanoAuth.login(credentials);
      console.log('Login response:', response);
      
      // Handle different possible response structures
      const authToken = response.authToken || response.token || response.access_token;
      
      if (!authToken) {
        throw new Error('No authentication token received from server');
      }
      
      await handleAuthSuccess(authToken);
      toast({ title: 'Welcome back!', description: 'You have been successfully logged in.' });
    } catch (error: any) {
      console.error('Login error:', error);
      toast({ 
        variant: 'destructive', 
        title: 'Login Failed', 
        description: error.message || 'An unexpected error occurred during login.' 
      });
      setUser(null);
      setToken(null);
    } finally {
        setIsLoading(false);
    }
  };

  const signup = async (details: any) => {
    setIsLoading(true);
    try {
      console.log('Attempting signup...');
      const response = await xanoAuth.signup(details);
      console.log('Signup response:', response);
      
      // Handle different possible response structures
      const authToken = response.authToken || response.token || response.access_token;
      
      if (!authToken) {
        throw new Error('No authentication token received from server');
      }
      
      await handleAuthSuccess(authToken);
      toast({ title: 'Account Created!', description: 'Welcome to Fluxpense! Let\'s get you set up.' });
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({ 
        variant: 'destructive', 
        title: 'Signup Failed', 
        description: error.message || 'An unexpected error occurred during signup.' 
      });
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
    toast({ title: 'Logged out', description: 'You have been successfully logged out.' });
    router.push('/');
  };
  
  const continueWithGoogle = async (code: string) => {
    setIsLoading(true);
    try {
      const redirectUri = `${window.location.origin}/auth/google/callback`;
      const response = await xanoAuth.continueGoogleLogin(code, redirectUri);
      console.log('Google login response:', response);
      
      const authToken = response.authToken || response.token || response.access_token;
      
      if (!authToken) {
        throw new Error('No authentication token received from Google login');
      }
      
      await handleAuthSuccess(authToken);
      toast({ title: 'Welcome!', description: 'You have been successfully logged in with Google.' });
    } catch (error: any) {
      console.error('Google login error:', error);
      toast({ 
        variant: 'destructive', 
        title: 'Google Login Failed', 
        description: error.message || 'An unexpected error occurred during Google login.' 
      });
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
      console.log('Completing onboarding with payload:', payload);
      const updatedUser = await xanoAuth.updateMe(token, payload);
      console.log('Updated user after onboarding:', updatedUser);
      setUser(updatedUser);
      toast({ title: 'Setup Complete!', description: 'Welcome to your Fluxpense dashboard!' });
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Onboarding error:', error);
      toast({ 
        variant: 'destructive', 
        title: 'Onboarding Failed', 
        description: error.message || 'Could not save your settings.' 
      });
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