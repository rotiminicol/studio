'use client';

import { useState } from 'react';
import { AuthForm } from "@/components/auth/auth-form";
import { Logo } from "@/components/logo";
import Link from "next/link";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('signin');

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image - Full screen */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${activeTab === 'signin' ? '/pexels-michael-block-1691617-3225517.jpg' : '/pexels-maxfrancis-2246476.jpg'})`
        }}
      ></div>
      
      {/* Mobile overlay - transparent background */}
      <div className="absolute inset-0 bg-black/20 lg:hidden"></div>
      
      {/* Desktop layout */}
      <div className="relative z-10 min-h-screen lg:grid lg:grid-cols-2">
        {/* Left side - Auth Form - Full half screen */}
        <div className="flex flex-col min-h-screen lg:bg-background/95 lg:backdrop-blur-sm">
          {/* Logo positioned in form area */}
          <div className="absolute top-8 left-8 z-20">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          
          {/* Form container - takes full height and centers content */}
          <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
            {/* Floating elements */}
            <div className="absolute top-20 right-10 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-float"></div>
            <div className="absolute bottom-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float" style={{animationDelay: '3s'}}></div>
            
            <div className="w-full max-w-md">
              <AuthForm onTabChange={setActiveTab} />
            </div>
          </div>
        </div>
        
        {/* Right side - Image area - Full half screen on desktop, hidden on mobile */}
        <div className="hidden lg:block relative">
          {/* Floating cards */}
          <div className="absolute top-20 left-10 bg-white/90 dark:bg-card/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl animate-float border z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-green-600">Receipt Processed</div>
                <div className="text-sm text-muted-foreground">Starbucks - $4.50</div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-32 right-10 bg-white/90 dark:bg-card/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl animate-float border z-10" style={{animationDelay: '2s'}}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-blue-600">Budget Insights</div>
                <div className="text-sm text-muted-foreground">Save 15% this month</div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-10 text-white z-20">
            <h2 className="text-3xl font-bold mb-2">
              {activeTab === 'signin' ? 'Welcome Back!' : 'Join Thousands of Users'}
            </h2>
            <p className="max-w-md text-white/90">
              {activeTab === 'signin' 
                ? 'Continue your journey to financial clarity with AI-powered expense management.'
                : 'Start your journey to effortless expense management with cutting-edge AI technology.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}