"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const isMockAuth = useMockAuth();

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
    
    // If we have a token but no user object yet, fetch the user data.
    if (!user) {
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
            if (!isPublicPage && !isAuthPage) {
              router.push('/auth');
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
        return; // Exit here and wait for re-render after user state is set.
    }

    // From here on, we assume `user` object exists.
    const isOnboarded = user.onboarding_complete;

    if (isAuthPage) {
        // If on an auth page but logged in, redirect away.
        router.push(isOnboarded ? '/dashboard' : '/onboarding');
    } else if (isOnboardingPage) {
        // If on onboarding page...
        if (isOnboarded) {
            // ...but already onboarded, redirect to dashboard.
            router.push('/dashboard');
        }
    } else if (!isPublicPage) {
        // For any other protected page...
        if (!isOnboarded) {
            // ...if not onboarded, force back to onboarding.
            router.push('/onboarding');
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, mounted, user]);


  const handleAuthSuccess = async (authToken: string) => {
    localStorage.setItem('authToken', authToken);
    try {
        const authMethod = isMockAuth ? mockAuth : xanoAuth;
        const userData = await authMethod.getMe(authToken);
        // Set user and token to trigger the useEffect for routing
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
      // Login users are redirected to dashboard in the useEffect (if already onboarded)
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
      // Signup users are redirected to onboarding in the useEffect
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
    try {
      const authMethod = isMockAuth ? mockAuth : xanoAuth;
      const updatedUser = await authMethod.updateMe(token, {
        ...data,
        onboarding_complete: true
      });
      
      setUser(updatedUser);
      toast({ title: 'Onboarding Complete!', description: 'Welcome to Fluxpense! You\'re all set up.' });
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Onboarding error:', error);
      toast({ 
        variant: 'destructive', 
        title: 'Onboarding Failed', 
        description: error.message || 'An unexpected error occurred during onboarding.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = { user, token, login, signup, logout, isLoading, isAuthenticated: !!user, continueWithGoogle, completeOnboarding };

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
