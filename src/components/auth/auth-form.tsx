"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chrome, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

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
    <Card className="w-full max-w-md glassmorphism">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome to Fluxpense</CardTitle>
        <CardDescription>
          Sign in or create an account to start managing your expenses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="signin" className="w-full" onValueChange={(value) => {
            setActiveTab(value);
            onTabChange(value);
        }}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email-in">Email</Label>
                <Input id="email-in" type="email" placeholder="m@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-in">Password</Label>
                <Input id="password-in" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full button-glow" disabled={isLoading}>
                {isLoading && activeTab === 'signin' ? <Loader2 className="animate-spin" /> : "Sign In"}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 mt-4">
               <div className="space-y-2">
                <Label htmlFor="name-up">Full Name</Label>
                <Input id="name-up" type="text" placeholder="John Doe" required value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-up">Email</Label>
                <Input id="email-up" type="email" placeholder="m@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-up">Password</Label>
                <Input id="password-up" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full button-glow" disabled={isLoading}>
                {isLoading && activeTab === 'signup' ? <Loader2 className="animate-spin" /> : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
          <Chrome className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>
      </CardContent>
    </Card>
  );
}
