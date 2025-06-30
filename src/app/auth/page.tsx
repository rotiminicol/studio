
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Logo } from '@/components/logo';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24" {...props}>
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,35.091,44,29.891,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
);


export default function AuthPage() {
  const router = useRouter();

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginAgree, setLoginAgree] = useState(false);

  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPasswordVisible, setSignupPasswordVisible] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupAgree, setSignupAgree] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail || !loginPassword) {
      setLoginError('Please fill in all required fields.');
      return;
    }
    if (!loginAgree) {
      setLoginError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }
    // Simulate login
    router.push('/dashboard');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    if (!signupName || !signupEmail || !signupPassword) {
      setSignupError('Please fill in all required fields.');
      return;
    }
    if (!signupAgree) {
      setSignupError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }
    // Simulate signup
    router.push('/onboarding');
  };

  const handleGoogleAuth = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col md:flex-row">
      {/* Image Section (Right on desktop, background on mobile) */}
      <div
        className="hidden md:block md:w-1/2 h-screen"
        style={{ minHeight: '100vh' }}
      >
        <Image
          src="/2.jpg"
          alt="Auth Visual"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Mobile background image */}
      <div className="absolute inset-0 z-0 md:hidden">
        <Image
          src="/2.jpg"
          alt="Auth Mobile Background"
          fill
          className="w-full h-full object-cover absolute top-0 left-0 opacity-80 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      {/* Form Section (Left on desktop, centered on mobile) */}
      <div className="relative z-10 flex w-full md:w-1/2 min-h-screen items-center justify-center p-4 sm:p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col justify-center items-center w-full h-full"
        >
          <Tabs defaultValue="login" className="w-full max-w-md">
            <Link href="/" className="flex justify-center mb-8 mt-2">
              <Logo variant="default" size="lg" />
            </Link>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            {/* Login Tab */}
            <TabsContent value="login">
              <Card className="glassmorphism w-full">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl font-bold mb-1">Welcome Back!</CardTitle>
                  <CardDescription className="mb-2">Enter your credentials to access your dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full mb-2"
                    onClick={handleGoogleAuth}
                  >
                    <GoogleIcon /> Continue with Google
                  </Button>
                  <div className="flex items-center my-4">
                    <span className="flex-1 h-px bg-border" />
                    <span className="mx-3 text-xs text-muted-foreground">OR</span>
                    <span className="flex-1 h-px bg-border" />
                  </div>
                  <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input id="login-email" type="email" placeholder="you@example.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
                    </div>
                    <div className="space-y-2 relative">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Input id="login-password" type={loginPasswordVisible ? 'text' : 'password'} placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" tabIndex={-1} onClick={() => setLoginPasswordVisible(v => !v)}>
                          {loginPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        id="login-agree"
                        type="checkbox"
                        checked={loginAgree}
                        onChange={e => setLoginAgree(e.target.checked)}
                        className="accent-primary h-4 w-4 rounded border-border"
                        required
                      />
                      <label htmlFor="login-agree" className="text-xs text-muted-foreground select-none">
                        I agree to the{' '}
                        <a href="#" className="underline hover:text-primary" tabIndex={0}>Terms of Service</a> and{' '}
                        <a href="#" className="underline hover:text-primary" tabIndex={0}>Privacy Policy</a>.
                      </label>
                    </div>
                    {loginError && <div className="text-destructive text-sm font-medium mt-1">{loginError}</div>}
                    <Button type="submit" className="w-full button-glow mt-2">Login</Button>
                    <Link href="/auth/forgot-password" className="text-xs text-primary underline text-center mt-2">Forgot password?</Link>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Signup Tab */}
            <TabsContent value="signup">
              <Card className="glassmorphism w-full">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl font-bold mb-1">Create an Account</CardTitle>
                  <CardDescription className="mb-2">Start your journey to financial clarity in seconds.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full mb-2"
                    onClick={handleGoogleAuth}
                  >
                    <GoogleIcon /> Continue with Google
                  </Button>
                  <div className="flex items-center my-4">
                    <span className="flex-1 h-px bg-border" />
                    <span className="mx-3 text-xs text-muted-foreground">OR</span>
                    <span className="flex-1 h-px bg-border" />
                  </div>
                  <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input id="signup-name" type="text" placeholder="John Doe" value={signupName} onChange={e => setSignupName(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" type="email" placeholder="you@example.com" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} required />
                    </div>
                    <div className="space-y-2 relative">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Input id="signup-password" type={signupPasswordVisible ? 'text' : 'password'} placeholder="Password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} required />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" tabIndex={-1} onClick={() => setSignupPasswordVisible(v => !v)}>
                          {signupPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        id="signup-agree"
                        type="checkbox"
                        checked={signupAgree}
                        onChange={e => setSignupAgree(e.target.checked)}
                        className="accent-primary h-4 w-4 rounded border-border"
                        required
                      />
                      <label htmlFor="signup-agree" className="text-xs text-muted-foreground select-none">
                        I agree to the{' '}
                        <a href="#" className="underline hover:text-primary" tabIndex={0}>Terms of Service</a> and{' '}
                        <a href="#" className="underline hover:text-primary" tabIndex={0}>Privacy Policy</a>.
                      </label>
                    </div>
                    {signupError && <div className="text-destructive text-sm font-medium mt-1">{signupError}</div>}
                    <Button type="submit" className="w-full button-glow mt-2">Sign Up</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
