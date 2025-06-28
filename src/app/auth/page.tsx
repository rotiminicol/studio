import { AuthForm } from "@/components/auth/auth-form";
import { Logo } from "@/components/logo";
import Link from "next/link";
import Image from "next/image";

export default function AuthPage() {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 lg:p-10 relative">
        <div className="absolute top-8 left-8">
            <Link href="/">
                <Logo />
            </Link>
        </div>
        <div className="w-full max-w-md">
            <AuthForm />
        </div>
      </div>
      <div className="hidden lg:block relative">
        <Image
          src="https://placehold.co/1080x1920.png"
          alt="Abstract 3D shapes"
          data-ai-hint="abstract 3d graphic"
          layout="fill"
          objectFit="cover"
          className="opacity-90"
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
