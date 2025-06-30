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

export default function AuthPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/onboarding');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
        <img src="/7.jpg" alt="Auth Background" className="h-full w-full object-cover" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-background via-background/80 to-background" />

      <div className="relative z-20 flex min-h-screen items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Tabs defaultValue="login" className="w-full max-w-md">
            <Link href="/" className="flex justify-center mb-6">
              <Logo variant="default" size="lg" />
            </Link>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <Card className="glassmorphism">
                <CardHeader className="text-center">
                  <CardTitle>Welcome Back!</CardTitle>
                  <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input id="login-email" type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input id="login-password" type="password" required />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full button-glow">Login</Button>
                     <Button variant="link" size="sm" className="text-muted-foreground">Forgot password?</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <Card className="glassmorphism">
                <CardHeader className="text-center">
                  <CardTitle>Create an Account</CardTitle>
                  <CardDescription>Start your journey to financial clarity in seconds.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSignup}>
                  <CardContent className="space-y-4">
                     <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input id="signup-name" type="text" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input id="signup-password" type="password" required />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full button-glow">Sign Up</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
