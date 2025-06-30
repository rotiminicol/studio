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
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Select from 'react-select';
import CountryFlag from 'react-country-flag';
import { useState } from 'react';

const countryOptions = [
  { value: 'US', label: 'United States', code: '+1' },
  { value: 'GB', label: 'United Kingdom', code: '+44' },
  { value: 'NG', label: 'Nigeria', code: '+234' },
  { value: 'IN', label: 'India', code: '+91' },
  { value: 'CA', label: 'Canada', code: '+1' },
  { value: 'DE', label: 'Germany', code: '+49' },
  { value: 'FR', label: 'France', code: '+33' },
  { value: 'GH', label: 'Ghana', code: '+233' },
  // ...add more as needed
];

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
  const [signupCountry, setSignupCountry] = useState(null);
  const [signupPhone, setSignupPhone] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupAgree, setSignupAgree] = useState(false);

  const handleLogin = (e) => {
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

  const handleSignup = (e) => {
    e.preventDefault();
    setSignupError('');
    if (!signupName || !signupEmail || !signupPassword || !signupCountry || !signupPhone) {
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

  const handleGoogleAuth = (e) => {
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
        <img
          src="/2.jpg"
          alt="Auth Visual"
          className="object-cover w-full h-full"
          style={{ minHeight: 0 }}
        />
      </div>
      {/* Mobile background image */}
      <div className="absolute inset-0 z-0 md:hidden">
        <img
          src="/2.jpg"
          alt="Auth Mobile Background"
          className="w-full h-full object-cover absolute top-0 left-0 opacity-80 blur-sm"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      {/* Form Section (Left on desktop, centered on mobile) */}
      <div className="relative z-10 flex w-full md:w-1/2 min-h-screen items-center justify-center md:items-stretch md:justify-stretch p-0 bg-transparent">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col justify-center items-center w-full h-full"
        >
          <Tabs defaultValue="login" className="w-full max-w-2xl h-full flex flex-col justify-center">
            <Link href="/" className="flex justify-center mb-8 mt-2">
              <Logo variant="default" size="lg" />
            </Link>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            {/* Login Tab */}
            <TabsContent value="login" className="flex-1 flex flex-col justify-center">
              <Card className="glassmorphism w-full max-w-md mx-auto flex flex-col justify-center shadow-none border-none bg-card/70 md:bg-transparent p-0">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl font-bold mb-1">Welcome Back!</CardTitle>
                  <CardDescription className="mb-2">Enter your credentials to access your dashboard.</CardDescription>
                </CardHeader>
                <div className="px-6 flex flex-col gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 py-2 text-base font-medium border border-gray-300 hover:bg-gray-100 mb-2"
                    onClick={handleGoogleAuth}
                  >
                    <FcGoogle className="text-xl" /> Continue with Google
                  </Button>
                  <div className="flex items-center my-2">
                    <span className="flex-1 h-px bg-gray-300" />
                    <span className="mx-3 text-xs text-gray-400">or</span>
                    <span className="flex-1 h-px bg-gray-300" />
                  </div>
                </div>
                <form onSubmit={handleLogin} className="flex flex-col flex-1 justify-center px-6 pb-6 pt-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" type="email" placeholder="you@example.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2 relative">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input id="login-password" type={loginPasswordVisible ? 'text' : 'password'} placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" tabIndex={-1} onClick={() => setLoginPasswordVisible(v => !v)}>
                        {loginPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      id="login-agree"
                      type="checkbox"
                      checked={loginAgree}
                      onChange={e => setLoginAgree(e.target.checked)}
                      className="accent-primary h-4 w-4 rounded border-gray-300"
                      required
                    />
                    <label htmlFor="login-agree" className="text-xs text-gray-600 select-none">
                      I agree to the{' '}
                      <a href="#" className="underline hover:text-primary" tabIndex={0}>Terms of Service</a> and{' '}
                      <a href="#" className="underline hover:text-primary" tabIndex={0}>Privacy Policy</a>.
                    </label>
                  </div>
                  {loginError && <div className="text-red-500 text-sm font-medium mt-1">{loginError}</div>}
                  <Button type="submit" className="w-full button-glow mt-2">Login</Button>
                  <Link href="/auth/forgot-password" className="text-xs text-primary underline text-center mt-2">Forgot password?</Link>
                </form>
              </Card>
            </TabsContent>
            {/* Signup Tab */}
            <TabsContent value="signup" className="flex-1 flex flex-col justify-center">
              <Card className="glassmorphism w-full max-w-md mx-auto flex flex-col justify-center shadow-none border-none bg-card/70 md:bg-transparent p-0">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl font-bold mb-1">Create an Account</CardTitle>
                  <CardDescription className="mb-2">Start your journey to financial clarity in seconds.</CardDescription>
                </CardHeader>
                <div className="px-6 flex flex-col gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 py-2 text-base font-medium border border-gray-300 hover:bg-gray-100 mb-2"
                    onClick={handleGoogleAuth}
                  >
                    <FcGoogle className="text-xl" /> Continue with Google
                  </Button>
                  <div className="flex items-center my-2">
                    <span className="flex-1 h-px bg-gray-300" />
                    <span className="mx-3 text-xs text-gray-400">or</span>
                    <span className="flex-1 h-px bg-gray-300" />
                  </div>
                </div>
                <form onSubmit={handleSignup} className="flex flex-col flex-1 justify-center px-6 pb-6 pt-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input id="signup-name" type="text" placeholder="John Doe" value={signupName} onChange={e => setSignupName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="you@example.com" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-country">Country</Label>
                    <Select
                      id="signup-country"
                      classNamePrefix="react-select"
                      options={countryOptions}
                      value={signupCountry}
                      onChange={setSignupCountry}
                      placeholder="Select country"
                      formatOptionLabel={option => (
                        <div className="flex items-center gap-2">
                          <CountryFlag countryCode={option.value} svg style={{ width: '1.5em', height: '1.5em' }} />
                          <span>{option.label}</span>
                          <span className="text-xs text-gray-400">{option.code}</span>
                        </div>
                      )}
                      isSearchable
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <div className="flex gap-2">
                      <Input
                        id="signup-country-code"
                        type="text"
                        value={signupCountry ? signupCountry.code : ''}
                        readOnly
                        className="w-20 text-center bg-gray-100"
                        tabIndex={-1}
                      />
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="1234567890"
                        value={signupPhone}
                        onChange={e => setSignupPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2 relative">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input id="signup-password" type={signupPasswordVisible ? 'text' : 'password'} placeholder="Password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} required />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" tabIndex={-1} onClick={() => setSignupPasswordVisible(v => !v)}>
                        {signupPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      id="signup-agree"
                      type="checkbox"
                      checked={signupAgree}
                      onChange={e => setSignupAgree(e.target.checked)}
                      className="accent-primary h-4 w-4 rounded border-gray-300"
                      required
                    />
                    <label htmlFor="signup-agree" className="text-xs text-gray-600 select-none">
                      I agree to the{' '}
                      <a href="#" className="underline hover:text-primary" tabIndex={0}>Terms of Service</a> and{' '}
                      <a href="#" className="underline hover:text-primary" tabIndex={0}>Privacy Policy</a>.
                    </label>
                  </div>
                  {signupError && <div className="text-red-500 text-sm font-medium mt-1">{signupError}</div>}
                  <Button type="submit" className="w-full button-glow mt-2">Sign Up</Button>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
