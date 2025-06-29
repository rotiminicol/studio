"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Chrome, Loader2, Eye, EyeOff, AlertCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import Image from "next/image";
import Link from "next/link";

interface AuthFormProps {
    onTabChange: (tab: string) => void;
}

export function AuthForm({ onTabChange }: AuthFormProps) {
    const { login, signup, isLoading } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState('signin');
    const [error, setError] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetSent, setResetSent] = useState(false);

    const clearError = () => setError('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearError();
        
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        
        try {
            await login({ email, password });
        } catch (error: any) {
            setError(error.message || 'Login failed. Please try again.');
        }
    }

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearError();
        
        if (!name || !email || !password) {
            setError('Please fill in all fields');
            return;
        }
        
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        
        try {
            await signup({ name, email, password });
        } catch (error: any) {
            setError(error.message || 'Signup failed. Please try again.');
        }
    }
    
    const handleGoogleSignIn = () => {
        clearError();
        const redirectUri = `${window.location.origin}/auth/google/callback`;
        const googleAuthUrl = `${process.env.NEXT_PUBLIC_XANO_GOOGLE_OAUTH_API_URL}/oauth/google/init?redirect_uri=${redirectUri}`;
        window.location.href = googleAuthUrl;
    }

    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearError();
        
        if (!resetEmail) {
            setError('Please enter your email address');
            return;
        }
        
        try {
            // Simulate password reset (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1000));
            setResetSent(true);
            setError('');
        } catch (error: any) {
            setError('Failed to send reset email. Please try again.');
        }
    }

    const handleBackToAuth = () => {
        setShowForgotPassword(false);
        setResetEmail('');
        setResetSent(false);
        clearError();
    }

    if (showForgotPassword) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center p-6">
                <Card className="w-full max-w-md bg-card/80 backdrop-blur-lg border border-border/50 shadow-xl">
                    <CardHeader className="text-center pb-6">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleBackToAuth}
                            className="absolute left-4 top-4 hover:bg-primary/10"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                        
                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl shadow-lg overflow-hidden">
                                    <Image
                                        src="/big bird.jpg"
                                        alt="Fluxpense Logo"
                                        width={64}
                                        height={64}
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <CardTitle className="text-2xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Reset Password
                        </CardTitle>
                        <CardDescription className="text-base">
                            Enter your email to receive a password reset link
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        
                        {resetSent ? (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-green-600">Email Sent!</h3>
                                    <p className="text-sm text-muted-foreground">
                                        We've sent a password reset link to {resetEmail}
                                    </p>
                                </div>
                                <Button onClick={handleBackToAuth} className="w-full">
                                    Back to Sign In
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleForgotPassword} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="reset-email">Email Address</Label>
                                    <Input 
                                        id="reset-email" 
                                        type="email" 
                                        placeholder="Enter your email" 
                                        required 
                                        value={resetEmail} 
                                        onChange={e => setResetEmail(e.target.value)}
                                        className="border-primary/20 focus:border-primary"
                                        disabled={isLoading}
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="animate-spin mr-2" />
                                            Sending...
                                        </>
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6">
            <Card className="w-full max-w-md bg-card/80 backdrop-blur-lg border border-border/50 shadow-xl">
                <CardHeader className="text-center pb-6">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <div className="relative group">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl shadow-lg group-hover:shadow-xl group-hover:shadow-primary/25 transition-all duration-300 group-hover:scale-110 group-hover:rotate-2 overflow-hidden">
                                <Image
                                    src="/big bird.jpg"
                                    alt="Fluxpense Logo"
                                    width={80}
                                    height={80}
                                    className="object-cover group-hover:brightness-110 group-hover:contrast-110 transition-all duration-300"
                                    priority
                                />
                            </div>
                            {/* Floating particles */}
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500"></div>
                            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 delay-100"></div>
                        </div>
                    </div>
                    
                    <CardTitle className="text-3xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                        Welcome to Fluxpense
                    </CardTitle>
                    <CardDescription className="text-base font-medium">
                        Join thousands of professionals who trust AI to manage their expenses
                    </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    
                    <Tabs defaultValue="signin" className="w-full" onValueChange={(value) => {
                        setActiveTab(value);
                        onTabChange(value);
                        clearError();
                    }}>
                        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                            <TabsTrigger value="signin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
                                Sign In
                            </TabsTrigger>
                            <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
                                Sign Up
                            </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="signin" className="space-y-4 mt-6">
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email-in" className="font-semibold">Email</Label>
                                    <Input 
                                        id="email-in" 
                                        type="email" 
                                        placeholder="m@example.com" 
                                        required 
                                        value={email} 
                                        onChange={e => setEmail(e.target.value)}
                                        className="border-primary/20 focus:border-primary h-12"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password-in" className="font-semibold">Password</Label>
                                    <div className="relative">
                                        <Input 
                                            id="password-in" 
                                            type={showPassword ? "text" : "password"}
                                            required 
                                            value={password} 
                                            onChange={e => setPassword(e.target.value)}
                                            className="border-primary/20 focus:border-primary pr-10 h-12"
                                            disabled={isLoading}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={isLoading}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end">
                                    <Button
                                        type="button"
                                        variant="link"
                                        className="text-primary hover:text-primary/80 text-sm font-medium"
                                        onClick={() => setShowForgotPassword(true)}
                                    >
                                        Forgot Password?
                                    </Button>
                                </div>
                                
                                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-12 font-bold text-lg" disabled={isLoading || !email || !password}>
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
                        
                        <TabsContent value="signup" className="space-y-4 mt-6">
                            <form onSubmit={handleSignup} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name-up" className="font-semibold">Full Name</Label>
                                    <Input 
                                        id="name-up" 
                                        type="text" 
                                        placeholder="John Doe" 
                                        required 
                                        value={name} 
                                        onChange={e => setName(e.target.value)}
                                        className="border-primary/20 focus:border-primary h-12"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email-up" className="font-semibold">Email</Label>
                                    <Input 
                                        id="email-up" 
                                        type="email" 
                                        placeholder="m@example.com" 
                                        required 
                                        value={email} 
                                        onChange={e => setEmail(e.target.value)}
                                        className="border-primary/20 focus:border-primary h-12"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password-up" className="font-semibold">Password</Label>
                                    <div className="relative">
                                        <Input 
                                            id="password-up" 
                                            type={showPassword ? "text" : "password"}
                                            required 
                                            value={password} 
                                            onChange={e => setPassword(e.target.value)}
                                            className="border-primary/20 focus:border-primary pr-10 h-12"
                                            disabled={isLoading}
                                            minLength={6}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={isLoading}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Password must be at least 6 characters</p>
                                </div>
                                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-12 font-bold text-lg" disabled={isLoading || !name || !email || !password || password.length < 6}>
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
                            <span className="bg-card px-2 text-muted-foreground font-semibold">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    
                    <Button 
                        variant="outline" 
                        className="w-full border-primary/20 hover:bg-primary/5 hover:border-primary group h-12 font-semibold" 
                        onClick={handleGoogleSignIn} 
                        disabled={isLoading}
                    >
                        <Chrome className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                        Continue with Google
                    </Button>
                    
                    <div className="text-center text-xs text-muted-foreground">
                        By continuing, you agree to our{' '}
                        <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                    </div>
                    
                    {/* Mock Auth Notice */}
                    {!process.env.NEXT_PUBLIC_XANO_AUTH_API_URL && (
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                            <p className="text-xs text-blue-700 dark:text-blue-300">
                                <strong>Demo Mode:</strong> Using mock authentication. Use any email with password "password" to sign in.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
} 