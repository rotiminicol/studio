'use client';

import { useState } from 'react';
import { AuthForm } from "@/components/auth/auth-form";
import { Logo } from "@/components/logo";
import Link from "next/link";
import Image from "next/image";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('signin');

  const signupImage = "https://firebasestudio.googleapis.com:443/v0/b/project-155455359929.appspot.com/o/images%2Fuploads%2F1723555314050_A.png?alt=media";
  const loginImage = "https://firebasestudio.googleapis.com:443/v0/b/project-155455359929.appspot.com/o/images%2Fuploads%2F1723555546123_A.png?alt=media";
  
  const signupHint = "mobile finance";
  const loginHint = "laptop finance";

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 lg:p-10 relative">
        <div className="absolute top-8 left-8">
            <Link href="/">
                <Logo />
            </Link>
        </div>
        <div className="w-full max-w-md">
            <AuthForm onTabChange={setActiveTab} />
        </div>
      </div>
      <div className="hidden lg:block relative">
        <Image
          key={activeTab}
          src={activeTab === 'signin' ? loginImage : signupImage}
          alt="A person managing finances on a device."
          data-ai-hint={activeTab === 'signin' ? loginHint : signupHint}
          fill
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
         <div className="absolute bottom-10 left-10 text-white z-10">
            <h2 className="text-3xl font-bold">Expense management, simplified.</h2>
            <p className="mt-2 max-w-md">Join thousands of professionals who trust Fluxpense to handle the numbers, so they can focus on what matters.</p>
        </div>
      </div>
    </div>
  );
}
