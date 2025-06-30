
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { xanoAuth } from '@/lib/xano';
import { mockAuth } from '@/lib/mock-auth';
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

// Check if we should use mock auth (when API URLs are not configured)
const useMockAuth = () => {
  return !process.env.NEXT_PUBLIC_XANO_AUTH_API_URL || 
         process.env.NEXT_PUBLIC_XANO_AUTH_API_URL === 'undefined';
};

const publicPages = ['/', '/about', '/careers', '/contact', '/subscription', '/features/expense-tracking', '/features/budgeting', '/features/reports-analytics', '/pricing', '/logo-demo'];
const authPages = ['/auth', '/auth/google/callback', '/auth/forgot-password'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const isMockAuth = useMockAuth();

  const isPublicPage = publicPages.includes(pathname);
  const isAuthPage = authPages.includes(pathname);

  const handleRedirects = useCallback(() => {
      const isAuthenticated = !!user;

      if (!isAuthenticated) {
          if (!isPublicPage && !isAuthPage) {
              router.push('/auth');
          }
          return;
      }
      
      const isOnboarded = user?.onboarding_complete;

      if (isOnboarded && pathname === '/onboarding') {
        router.push('/dashboard');
        return;
      }

      if (isAuthPage) {
          router.push(isOnboarded ? '/dashboard' : '/onboarding');
      } else if (!isPublicPage && !isOnboarded && pathname !== '/onboarding') {
          router.push('/onboarding');
      }

  }, [user, router, pathname, isPublicPage, isAuthPage]);


  useEffect(() => {
    if (!mounted) return;

    const storedToken = localStorage.getItem('authToken');

    if (!storedToken) {
      setIsLoading(false);
      handleRedirects();
      return;
    }
    
    if (token && user) {
        setIsLoading(false);
        handleRedirects();
        return;
    }
    
    if (storedToken && !token) {
        const authMethod = isMockAuth ? mockAuth : xanoAuth;
        authMethod.getMe(storedToken)
          .then(userData => {
            setUser(userData);
            setToken(storedToken);
          })
          .catch((error) => {
            console.error('Token validation failed:', error);
            localStorage.removeItem('authToken');
            setUser(null);
            setToken(null);
          })
          .finally(() => {
            setIsLoading(false);
          });
    }

  }, [pathname, mounted, user, token, handleRedirects, isMockAuth, router]);


  const handleAuthSuccess = async (authToken: string) => {
    localStorage.setItem('authToken', authToken);
    try {
        const authMethod = isMockAuth ? mockAuth : xanoAuth;
        const userData = await authMethod.getMe(authToken);
        setUser(userData);
        setToken(authToken);
    } catch (error) {
        console.error('Failed to get user data after auth:', error);
        toast({ variant: 'destructive', title: 'Authentication Failed', description: 'Could not retrieve user details.' });
        localStorage.removeItem('authToken');
        setUser(null);
        setToken(null);
    }
  }

  const login = async (credentials: any) => {
    setIsLoading(true);
    try {
      const authMethod = isMockAuth ? mockAuth : xanoAuth;
      const response = await authMethod.login(credentials);
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
      const authMethod = isMockAuth ? mockAuth : xanoAuth;
      const response = await authMethod.signup(details);
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
      const authMethod = isMockAuth ? mockAuth : xanoAuth;
      const response = await authMethod.continueGoogleLogin(code, redirectUri);
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
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to complete onboarding.' });
      return;
    }

    setIsLoading(true);
    const updatedUser = {
      ...user,
      ...data,
      onboarding_complete: true,
    };

    try {
      const authMethod = isMockAuth ? mockAuth : xanoAuth;
      await authMethod.updateMe(token, {
        account_type: data.account_type,
        onboarding_complete: true
      });
       setUser(updatedUser);
    } catch (error: any) {
      // If the API call fails, log it for the developer but still try to unblock the user.
      console.error('Onboarding API call failed:', error);
      toast({ variant: 'destructive', title: 'Onboarding Failed', description: 'Could not save onboarding status. Please try again later.' });
      setUser(updatedUser); // Still update locally to unblock the user for the current session.
    } finally {
      setIsLoading(false);
    }
  };

  const value = { user, token, login, signup, logout, isLoading, isAuthenticated: !!user && !!token, continueWithGoogle, completeOnboarding };

  if (isLoading || !mounted) {
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
