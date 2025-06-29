'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AuthForm } from "@/components/auth/auth-form";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { CheckCircle, TrendingUp } from 'lucide-react';

const loginImage = "https://firebasestudio.googleapis.com:443/v0/b/project-155455359929.appspot.com/o/images%2Fuploads%2F1723555546123_A.png?alt=media";
const signupImage = "https://firebasestudio.googleapis.com:443/v0/b/project-155455359929.appspot.com/o/images%2Fuploads%2F1723555331616_A.png?alt=media";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('signin');

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[10px_10px] dark:bg-grid-slate-400/[0.05] z-0"></div>
      
      <div className="relative z-10 min-h-screen lg:grid lg:grid-cols-2">
        <div className="flex flex-col min-h-screen bg-background/95 backdrop-blur-sm">
          <div className="absolute top-8 left-8 z-20">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          
          <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
            <div className="absolute top-20 right-10 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-float"></div>
            <div className="absolute bottom-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float" style={{animationDelay: '3s'}}></div>
            
            <div className="w-full max-w-md">
              <AuthForm onTabChange={setActiveTab} />
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block relative bg-navy text-white p-12">
           <Image
              key={activeTab}
              src={activeTab === 'signin' ? loginImage : signupImage}
              alt="A person managing finances on a device."
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/50 to-transparent z-10"></div>

          <div className="relative z-20 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                {activeTab === 'signin' ? 'Welcome Back!' : 'Join the Future of Finance'}
              </h2>
              <p className="max-w-md text-lg text-grayText">
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
