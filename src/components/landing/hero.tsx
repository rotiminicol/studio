import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/6.jpg')"
        }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10"></div>
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[10px_10px] dark:bg-grid-slate-400/[0.05]"></div>
      
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary/30 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
      
      <div className="container max-w-screen-xl mx-auto relative z-10 min-h-screen flex items-center pt-16 md:pt-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="text-center lg:text-left animate-in fade-in-0 slide-in-from-left-12 duration-700 px-4 md:px-0">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 text-primary px-6 py-3 rounded-full text-sm font-bold mb-8 animate-pulse-glow border border-primary/20 shadow-lg">
              <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span className="font-black tracking-wider">AI-POWERED EXPENSE TRACKING</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 font-headline leading-[0.9]">
              <span className="block">EFFORTLESS</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-pulse">
                EXPENSE
              </span>
              <span className="block">MASTERY</span>
            </h1>
            
            <p className="max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed font-medium">
              Transform your financial management with AI-powered receipt scanning, 
              intelligent categorization, and real-time insights. Say goodbye to manual 
              expense tracking forever.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10">
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl hover:shadow-2xl hover:shadow-primary/25 group transition-all duration-300 hover:scale-105 text-white font-bold text-lg px-8 py-6">
                <Link href="/auth" className="flex items-center gap-3">
                  GET STARTED FREE
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="group border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105 font-bold text-lg px-8 py-6">
                <Link href="/onboarding" className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  TRY DEMO
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-muted-foreground">
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-black text-foreground group-hover:text-primary transition-colors">10K+</div>
                <div className="font-bold">ACTIVE USERS</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-black text-foreground group-hover:text-primary transition-colors">99.9%</div>
                <div className="font-bold">ACCURACY RATE</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-black text-foreground group-hover:text-primary transition-colors">5MIN</div>
                <div className="font-bold">SETUP TIME</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-in fade-in-0 zoom-in-90 duration-700 px-4 md:px-0">
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-white dark:bg-card p-4 rounded-xl shadow-lg animate-float-slow border glassmorphism" style={{animationDelay: '1s'}}>
              <div className="text-sm font-black text-green-600">+$2,450</div>
              <div className="text-xs text-muted-foreground font-bold">SAVED THIS MONTH</div>
            </div>
            
            <div className="absolute -bottom-10 -right-10 w-32 h-20 bg-white dark:bg-card p-4 rounded-xl shadow-lg animate-float-slow border glassmorphism" style={{animationDelay: '3s'}}>
              <div className="text-sm font-black text-primary">RECEIPT SCANNED</div>
              <div className="text-xs text-muted-foreground font-bold">AI PROCESSING...</div>
            </div>
            
            <div className="absolute top-1/2 -right-12 bg-white dark:bg-card p-4 rounded-xl shadow-lg animate-float-slow border glassmorphism" style={{animationDelay: '2s'}}>
              <div className="text-sm font-black">BUDGET ALERT</div>
              <div className="text-xs text-muted-foreground font-bold">80% USED</div>
            </div>

            <div className="flex items-center justify-center h-96">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse-glow"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-float">
                    <div className="relative group">
                      <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-2xl group-hover:shadow-primary/25 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl animate-pulse"></div>
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div className="text-6xl font-black text-white group-hover:animate-spin transition-all duration-500">
                            💰
                          </div>
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500"></div>
                      <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 delay-100"></div>
                      <div className="absolute top-1/2 -right-3 w-1.5 h-1.5 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 delay-200"></div>
                    </div>
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