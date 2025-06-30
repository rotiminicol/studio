"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { motion } from "framer-motion";
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col md:flex-row">
      {/* Image Section (Left on desktop, background on mobile) */}
      <div
        className="hidden md:block md:w-1/2 h-screen"
        style={{ minHeight: '100vh' }}
      >
        <Image
          src="/1.jpg"
          alt="Forgot Password Visual"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Mobile background image */}
      <div className="absolute inset-0 z-0 md:hidden">
        <Image
          src="/1.jpg"
          alt="Forgot Password Mobile Background"
          fill
          className="w-full h-full object-cover absolute top-0 left-0 opacity-80 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      {/* Form Section (Right on desktop, centered on mobile) */}
      <div className="relative z-10 flex w-full md:w-1/2 min-h-screen items-center justify-center md:items-stretch md:justify-stretch p-0 bg-transparent">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md mx-auto flex flex-col justify-center h-full"
        >
          <Card className="glassmorphism w-full shadow-none border-none bg-card/70 md:bg-transparent">
            <CardHeader className="text-center pb-2">
              <Link href="/auth" className="flex justify-center mb-4">
                <Logo variant="default" size="lg" />
              </Link>
              <CardTitle className="text-2xl font-bold mb-1">Forgot Password?</CardTitle>
              <CardDescription className="mb-2">Enter your email to receive a password reset link.</CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-green-600 font-semibold mb-2">Check your email!</div>
                  <div className="text-muted-foreground text-sm mb-6">If an account exists for <span className="font-medium">{email}</span>, you will receive a password reset link shortly.</div>
                  <Link href="/auth" className="text-primary underline font-medium">Back to Login</Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="forgot-email">Email</Label>
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {error && <div className="text-red-500 text-sm font-medium mt-1">{error}</div>}
                  <Button type="submit" className="w-full button-glow mt-2">Send Reset Link</Button>
                  <Link href="/auth" className="text-xs text-primary underline text-center mt-2">Back to Login</Link>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
