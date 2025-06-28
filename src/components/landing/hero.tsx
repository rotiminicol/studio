import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard, DollarSign, Zap } from "lucide-react";
import Link from "next/link";

function SpinningCoin() {
  return (
    <div className="w-20 h-20 [perspective:1000px]">
      <div className="relative w-full h-full animate-spin-y [transform-style:preserve-3d]">
        <div className="absolute w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent [backface-visibility:hidden]">
          <DollarSign className="w-10 h-10 text-primary-foreground" />
        </div>
        <div className="absolute w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <Zap className="w-10 h-10 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[10px_10px] dark:bg-grid-slate-400/[0.05]"></div>
      <div className="container max-w-screen-xl mx-auto text-center relative">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-float [animation-delay:-3s]"></div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 font-headline">
          Effortless Expense Mastery.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Powered by AI.
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
          Fluxpense is the smartest way to manage your expenses. Scan receipts,
          import emails, and let our AI do the heavy lifting.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild className="button-glow">
            <Link href="/auth">Get Started for Free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/onboarding">Try Demo</Link>
          </Button>
        </div>
      </div>
      <div className="hidden md:block absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 [perspective:1000px]">
        <Card className="p-4 animate-float [animation-delay:-1s] rotate-[-15deg] glassmorphism">
          <div className="flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-primary" />
            <p className="font-bold">New Expense: Lunch</p>
          </div>
        </Card>
      </div>
       <div className="hidden md:block absolute top-1/4 right-1/4 translate-y-1/2 translate-x-1/2 [perspective:1000px]">
        <Card className="p-4 animate-float [animation-delay:-2s] rotate-[15deg] glassmorphism">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-accent" />
            <p className="font-bold">AI Categorized</p>
          </div>
        </Card>
      </div>
      <div className="hidden lg:block absolute bottom-10 left-1/2 -translate-x-1/2">
        <SpinningCoin />
      </div>
    </section>
  );
}
