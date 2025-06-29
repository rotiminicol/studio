'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate password reset API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would call your backend API here
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      
      setResetSent(true);
    } catch (error: any) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[10px_10px] dark:bg-grid-slate-400/[0.05] z-0"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-lg border border-border/50 shadow-xl">
          <CardHeader className="text-center pb-6">
            <Link href="/auth" className="absolute left-4 top-4 hover:bg-primary/10 p-2 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl shadow-lg group-hover:shadow-xl group-hover:shadow-primary/25 transition-all duration-300 group-hover:scale-110 group-hover:rotate-2 overflow-hidden">
                  <Image
                    src="/big bird.jpg"
                    alt="Fluxpense Logo"
                    width={64}
                    height={64}
                    className="object-cover group-hover:brightness-110 group-hover:contrast-110 transition-all duration-300"
                    priority
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500"></div>
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 delay-100"></div>
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
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-2">Email Sent!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Please check your email and click the link to reset your password. 
                    The link will expire in 1 hour.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button asChild className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                    <Link href="/auth">Back to Sign In</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setResetSent(false);
                      setEmail('');
                    }}
                  >
                    Send Another Email
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email" className="font-semibold">Email Address</Label>
                  <Input 
                    id="reset-email" 
                    type="email" 
                    placeholder="Enter your email address" 
                    required 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    className="border-primary/20 focus:border-primary h-12"
                    disabled={isLoading}
                  />
                </div>
                
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-12 font-bold" disabled={isLoading || !email}>
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Sending Reset Link...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
                
                <div className="text-center">
                  <Link href="/auth" className="text-sm text-primary hover:underline font-medium">
                    Back to Sign In
                  </Link>
                </div>
              </form>
            )}
            
            {/* Demo Mode Notice */}
            {!process.env.NEXT_PUBLIC_XANO_AUTH_API_URL && (
              <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  <strong>Demo Mode:</strong> This is a simulation. In production, this would send a real password reset email.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 