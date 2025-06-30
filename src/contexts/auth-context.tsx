
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
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const isMockAuth = useMockAuth();

  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        try {
          const authMethod = isMockAuth ? mockAuth : xanoAuth;
          const userData = await authMethod.getMe(storedToken);
          setUser(userData);
          setToken(storedToken);
        } catch (error) {
          console.error('Token validation failed:', error);
          localStorage.removeItem('authToken');
        }
      }
      setIsLoading(false);
    };
    validateToken();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const isPublicPage = publicPages.includes(pathname) || pathname.startsWith('/features');
    const isAuthPage = authPages.includes(pathname);
    const isAuthenticated = !!user;
    const isOnboarded = !!user?.onboarding_complete;

    if (!isAuthenticated && !isPublicPage && !isAuthPage) {
      router.push('/auth');
      return;
    }
    
    if (isAuthenticated) {
      if (!isOnboarded && pathname !== '/onboarding') {
        router.push('/onboarding');
      } else if (isOnboarded && (isAuthPage || pathname === '/onboarding')) {
        router.push('/dashboard');
      }
    }
  }, [user, pathname, isLoading, router]);

  const handleAuthSuccess = useCallback(async (authToken: string) => {
    localStorage.setItem('authToken', authToken);
    try {
      const authMethod = isMockAuth ? mockAuth : xanoAuth;
      const userData = await authMethod.getMe(authToken);
      setUser(userData);
      setToken(authToken);
      toast({ title: 'Welcome!', description: 'You have been successfully logged in.' });
    } catch (error: any) {
      console.error('Failed to get user data after auth:', error);
      toast({ variant: 'destructive', title: 'Authentication Failed', description: 'Could not retrieve user details.' });
      localStorage.removeItem('authToken');
      setUser(null);
      setToken(null);
      throw error;
    }
  }, [isMockAuth, toast]);

  const login = useCallback(async (credentials: any) => {
    setIsLoading(true);
    try {
      const authMethod = isMockAuth ? mockAuth : xanoAuth;
      const response = await authMethod.login(credentials);
      const authToken = response.authToken || response.token || response.access_token;
      
      if (!authToken) throw new Error('No authentication token received from server');
      
      await handleAuthSuccess(authToken);
    } catch (error: any) {
      console.error('Login error:', error);
       if (!error.message.includes('Could not retrieve user details')) {
          toast({ 
            variant: 'destructive', 
            title: 'Login Failed', 
            description: error.message || 'An unexpected error occurred during login.' 
          });
       }
       throw error;
    } finally {
        setIsLoading(false);
    }
  }, [isMockAuth, toast, handleAuthSuccess]);

  const signup = useCallback(async (details: any) => {
    setIsLoading(true);
    try {
      const authMethod = isMockAuth ? mockAuth : xanoAuth;
      const response = await authMethod.signup(details);
      const authToken = response.authToken || response.token || response.access_token;
      
      if (!authToken) throw new Error('No authentication token received from server');
      
      await handleAuthSuccess(authToken);
    } catch (error: any) {
      console.error('Signup error:', error);
      if (!error.message.includes('Could not retrieve user details')) {
        toast({ 
          variant: 'destructive', 
          title: 'Signup Failed', 
          description: error.message || 'An unexpected error occurred during signup.' 
        });
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [isMockAuth, toast, handleAuthSuccess]);
  
  const continueWithGoogle = useCallback(async (code: string) => {
    setIsLoading(true);
    try {
      const redirectUri = `${window.location.origin}/auth/google/callback`;
      const authMethod = isMockAuth ? mockAuth : xanoAuth;
      const response = await authMethod.continueGoogleLogin(code, redirectUri);
      const authToken = response.authToken || response.token || response.access_token;
      
      if (!authToken) throw new Error('No authentication token received from Google login');
      
      await handleAuthSuccess(authToken);
    } catch (error: any) {
      console.error('Google login error:', error);
      if (!error.message.includes('Could not retrieve user details')) {
        toast({ 
          variant: 'destructive', 
          title: 'Google Login Failed', 
          description: error.message || 'An unexpected error occurred during Google login.' 
        });
      }
      router.push('/auth');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [isMockAuth, toast, router, handleAuthSuccess]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    toast({ title: 'Logged out', description: 'You have been successfully logged out.' });
    router.push('/');
  }, [router, toast]);

  const completeOnboarding = useCallback(async (data: { account_type: string }) => {
    if (!token) {
        toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to complete onboarding.' });
        return;
    }

    try {
        const authMethod = isMockAuth ? mockAuth : xanoAuth;
        const updatedUser = await authMethod.updateMe(token, {
            account_type: data.account_type,
            onboarding_complete: true
        });
        setUser(updatedUser);
    } catch (error: any) {
        console.error('Onboarding API call failed:', error);
        toast({ 
            variant: 'destructive', 
            title: 'Onboarding Not Saved', 
            description: 'Could not save status to the server. You may see this screen again on next login.' 
        });
        setUser(prev => prev ? { ...prev, onboarding_complete: true, account_type: data.account_type } : null);
    }
  }, [token, isMockAuth, toast]);

  const value = { user, token, login, signup, logout, isLoading, isAuthenticated: !!user && !!token, continueWithGoogle, completeOnboarding };

  if (isLoading && (!user || !authPages.includes(pathname))) {
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
