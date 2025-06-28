import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[10px_10px] dark:bg-grid-slate-400/[0.05]"></div>
      <div className="container max-w-screen-xl mx-auto text-center relative z-10">
        
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
      <div className="relative mt-16 md:mt-24 h-64 md:h-96 w-full flex justify-center items-center">
         <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
          <Image 
            src="https://placehold.co/1200x600.png"
            data-ai-hint="futuristic finance 3d"
            alt="3D representation of financial data and AI"
            width={1200}
            height={600}
            className="object-contain"
            priority
          />
      </div>
    </section>
  );
}
