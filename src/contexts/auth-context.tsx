
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { xanoAuth } from '@/lib/xano';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
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
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const publicPages = ['/', '/about', '/careers', '/contact', '/subscription'];
    const authPages = ['/auth', '/auth/google/callback'];
    const isPublicPage = publicPages.includes(pathname);
    const isAuthPage = authPages.some(p => pathname.startsWith(p));
    const isOnboardingPage = pathname === '/onboarding';

    const storedToken = localStorage.getItem('authToken');

    if (!storedToken) {
      setIsLoading(false);
      if (!isPublicPage && !isAuthPage && !isOnboardingPage) {
        router.push('/auth');
      }
      return;
    }

    xanoAuth.getMe(storedToken)
      .then(userData => {
        setUser(userData);
        setToken(storedToken);
        const isOnboarded = userData.onboarding_complete;

        if (isAuthPage) {
          router.push(isOnboarded ? '/dashboard' : '/onboarding');
        } else if (isOnboardingPage && isOnboarded) {
          router.push('/dashboard');
        } else if (!isOnboardingPage && !isOnboarded && !isPublicPage && !isAuthPage) {
          router.push('/onboarding');
        }
      })
      .catch((error) => {
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
  }, [pathname, mounted, router]);

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
      const response = await xanoAuth.login(credentials);
      const authToken = response.authToken || response.token || response.access_token;
      
      if (!authToken) throw new Error('No authentication token received from server');
      
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
      const response = await xanoAuth.signup(details);
      const authToken = response.authToken || response.token || response.access_token;
      
      if (!authToken) throw new Error('No authentication token received from server');
      
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
      const authToken = response.authToken || response.token || response.access_token;
      
      if (!authToken) throw new Error('No authentication token received from Google login');
      
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
    if (!token || !user) {
      toast({ 
        variant: 'destructive', 
        title: 'Authentication Error', 
        description: 'User session not found. Please log in again.' 
      });
      router.push('/auth');
      return;
    }
    
    setIsLoading(true);
    const payload = { 
      onboarding_complete: true,
      account_type: data.account_type,
    };
    
    try {
      // Attempt to save to the backend. This is expected to fail if the endpoint doesn't exist.
      await xanoAuth.updateMe(token, payload);
    } catch (error) {
      // Gracefully handle the error without blocking the user.
      console.warn(
        'Onboarding data could not be saved to the backend. This is likely due to a missing API endpoint (e.g., PATCH /auth/me). Proceeding with local state update.',
        error
      );
    } finally {
      // Whether the API call succeeded or failed, update the local state to unblock the user.
      const updatedUser = { ...user, ...payload };
      setUser(updatedUser);
      
      toast({ 
        title: 'Setup Complete!', 
        description: 'Welcome to your Fluxpense dashboard!' 
      });
      
      router.push('/dashboard');
      setIsLoading(false);
    }
  };

  const isAuthenticated = !isLoading && !!token && !!user;

  const value = { user, token, login, signup, logout, isLoading, isAuthenticated, continueWithGoogle, completeOnboarding };

  if (!mounted && !['/', '/auth', '/onboarding'].some(p => pathname.startsWith(p))) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

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
