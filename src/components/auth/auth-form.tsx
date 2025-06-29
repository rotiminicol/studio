"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chrome, Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import Image from "next/image";

interface AuthFormProps {
    onTabChange: (tab: string) => void;
}

export function AuthForm({ onTabChange }: AuthFormProps) {
    const { login, signup, isLoading } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('signin');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login({ email, password });
    }

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signup({ name, email, password });
    }
    
    const handleGoogleSignIn = () => {
        const redirectUri = `${window.location.origin}/auth/google/callback`;
        const googleAuthUrl = `${process.env.NEXT_PUBLIC_XANO_GOOGLE_OAUTH_API_URL}/oauth/google/init?redirect_uri=${redirectUri}`;
        window.location.href = googleAuthUrl;
    }

  return (
    <div className="relative">
      {/* Floating background elements */}
      <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      
      <Card className="w-full max-w-md glassmorphism border-primary/20 shadow-2xl">
        <CardHeader className="text-center relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-2xl mt-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome to Fluxpense
          </CardTitle>
          <CardDescription className="text-base">
            Join thousands of professionals who trust AI to manage their expenses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full" onValueChange={(value) => {
              setActiveTab(value);
              onTabChange(value);
          }}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-in">Email</Label>
                  <Input 
                    id="email-in" 
                    type="email" 
                    placeholder="m@example.com" 
                    required 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-in">Password</Label>
                  <Input 
                    id="password-in" 
                    type="password" 
                    required 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                <Button type="submit" className="w-full button-glow" disabled={isLoading}>
                  {isLoading && activeTab === 'signin' ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                 <div className="space-y-2">
                  <Label htmlFor="name-up">Full Name</Label>
                  <Input 
                    id="name-up" 
                    type="text" 
                    placeholder="John Doe" 
                    required 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-up">Email</Label>
                  <Input 
                    id="email-up" 
                    type="email" 
                    placeholder="m@example.com" 
                    required 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-up">Password</Label>
                  <Input 
                    id="password-up" 
                    type="password" 
                    required 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                <Button type="submit" className="w-full button-glow" disabled={isLoading}>
                  {isLoading && activeTab === 'signup' ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-primary/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full border-primary/20 hover:bg-primary/5 hover:border-primary group" 
            onClick={handleGoogleSignIn} 
            disabled={isLoading}
          >
            <Chrome className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
            Continue with Google
          </Button>
          
          <div className="mt-6 text-center text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </CardContent>
      </Card>
    </div>
  );
}