import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/pexels-n-voitkevich-7172774.jpg')"
        }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10"></div>
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[10px_10px] dark:bg-grid-slate-400/[0.05]"></div>
      
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary/30 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
      
      <div className="container max-w-screen-xl mx-auto relative z-10 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="text-center lg:text-left animate-in fade-in-0 slide-in-from-left-12 duration-700">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse-glow">
              <span className="w-2 h-2 bg-primary rounded-full animate-ping absolute"></span>
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              AI-Powered Expense Tracking
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 font-headline">
              Effortless Expense
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-pulse">
                Mastery.
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Transform your financial management with AI-powered receipt scanning, 
              intelligent categorization, and real-time insights. Say goodbye to manual 
              expense tracking forever.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8">
              <Button size="lg" asChild className="button-glow group">
                <Link href="/auth" className="flex items-center gap-2">
                  Get Started for Free
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="group">
                <Link href="/onboarding" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Try Demo
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-muted-foreground">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">10K+</div>
                <div>Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">99.9%</div>
                <div>Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">5min</div>
                <div>Setup Time</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-in fade-in-0 zoom-in-90 duration-700">
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-white dark:bg-card p-4 rounded-xl shadow-lg animate-float-slow border glassmorphism" style={{animationDelay: '1s'}}>
              <div className="text-sm font-medium text-green-600">+$2,450</div>
              <div className="text-xs text-muted-foreground">Saved this month</div>
            </div>
            
            <div className="absolute -bottom-10 -right-10 w-32 h-20 bg-white dark:bg-card p-4 rounded-xl shadow-lg animate-float-slow border glassmorphism" style={{animationDelay: '3s'}}>
              <div className="text-sm font-medium text-primary">Receipt Scanned</div>
              <div className="text-xs text-muted-foreground">AI Processing...</div>
            </div>
            
            <div className="absolute top-1/2 -right-12 bg-white dark:bg-card p-4 rounded-xl shadow-lg animate-float-slow border glassmorphism" style={{animationDelay: '2s'}}>
              <div className="text-sm font-medium">Budget Alert</div>
              <div className="text-xs text-muted-foreground">80% used</div>
            </div>

            <div className="flex items-center justify-center h-96">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse-glow"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-float">
                    <Logo variant="wave" size="xl" className="scale-150" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}