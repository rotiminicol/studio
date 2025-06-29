'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AuthForm } from "@/components/auth/auth-form";
import { useIsMobile } from "@/hooks/use-mobile";
import { CheckCircle, TrendingUp } from 'lucide-react';

const loginImage = "/7.jpg";
const signupImage = "/8.jpg";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('signin');
  const isMobile = useIsMobile();
  const bgImage = activeTab === 'signin' ? loginImage : signupImage;

  if (isMobile) {
    // Mobile: full-screen form, background image, no top-left logo
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Background image */}
        <div className="fixed inset-0 z-0">
          <Image
            src={bgImage}
            alt="Auth background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/80 backdrop-blur-md" />
        </div>
        {/* Form on top */}
        <div className="relative z-10 min-h-screen flex flex-col justify-start pt-10 px-4 pb-8">
          <div className="w-full max-w-md mx-auto">
            <AuthForm onTabChange={setActiveTab} />
          </div>
        </div>
      </div>
    );
  }

  // Desktop: split screen, logo only in form, right image more visible, message/cards overlay
  return (
    <div className="min-h-screen w-full relative overflow-hidden no-scrollbar">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[10px_10px] dark:bg-grid-slate-400/[0.05] z-0"></div>
      <div className="relative z-10 min-h-screen lg:grid lg:grid-cols-2">
        {/* Left side - Form Container - Full half screen */}
        <div className="flex flex-col min-h-screen bg-background/95 backdrop-blur-sm relative">
          {/* Form container - takes full height and centers content */}
          <div className="flex-1 flex flex-col justify-center p-6 lg:p-12">
            <div className="absolute top-20 right-10 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-float"></div>
            <div className="absolute bottom-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float" style={{animationDelay: '3s'}}></div>
            <div className="w-full max-w-md mx-auto">
              <AuthForm onTabChange={setActiveTab} />
            </div>
          </div>
        </div>
        {/* Right side - Image area - Full half screen, more visible, with overlay message/cards */}
        <div className="hidden lg:block relative">
          <Image
            key={activeTab}
            src={bgImage}
            alt="A person managing finances on a device."
            fill
            className="object-cover"
            priority
          />
          {/* Make overlay more transparent for better visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/30 to-transparent z-10" />
          {/* Overlay content: message and animated cards */}
          <div className="relative z-20 flex flex-col justify-between h-full p-12">
            <div>
              <h2 className="text-5xl font-headline font-black mb-6 text-white drop-shadow-lg text-shadow-lg bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-shift">
                {activeTab === 'signin' ? 'Welcome Back!' : 'Join the Future of Finance'}
              </h2>
              <p className="max-w-md text-2xl text-white/90 drop-shadow-md text-shadow-md font-semibold mb-8">
                {activeTab === 'signin' 
                  ? 'Continue your journey to financial clarity with AI-powered expense management.'
                  : 'Start your journey to effortless expense management with cutting-edge AI technology.'
                }
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl shadow-xl animate-float border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-mint/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-mint" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Receipt Processed</div>
                    <div className="text-sm text-grayText">Starbucks - $4.50</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl shadow-xl animate-float border border-white/20" style={{animationDelay: '2s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-lavender/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-lavender" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Budget Insights</div>
                    <div className="text-sm text-grayText">You've saved 15% this month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
