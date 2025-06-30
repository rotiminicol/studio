import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent animate-rotate-slow"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:40px_40px] [mask-image:linear-gradient(to_bottom,transparent_1px,white_1px)]"></div>
        
        {/* Animated Gradient Blobs */}
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl animate-blob opacity-70"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-accent/20 to-transparent blur-3xl animate-blob animation-delay-2000 opacity-70"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl animate-blob animation-delay-4000 opacity-70"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full py-20 md:py-0">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-8 animate-in fade-in-0 slide-in-from-left-12 duration-1000">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary px-5 py-2.5 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
              <span className="flex space-x-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
                <span className="w-2 h-2 bg-primary rounded-full"></span>
              </span>
              <span className="font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                AI-POWERED FINANCE PLATFORM
              </span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
              <span className="block text-foreground/90">Smart Finance</span>
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-size-300 animate-gradient">
                  Management
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-primary/20 -z-0 rounded-full"></span>
              </span>
              <span className="block text-foreground/90 mt-2">Made Simple</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Automate your expense tracking, gain powerful insights, and take control of your financial future with our AI-driven platform. 
              <span className="block mt-2 text-primary font-medium">Explore the dashboard and see it in action.</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
              <Button 
                asChild 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Link href="/auth" className="flex items-center gap-2">
                  <span className="relative z-10">Get Started Free</span>
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="group relative overflow-hidden bg-background/50 backdrop-blur-md border-2 border-primary/20 hover:border-primary/50 hover:bg-primary/5 text-foreground font-bold text-lg px-8 py-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5"
                asChild
              >
                <Link href="/logo-demo" className="flex items-center gap-2">
                  <span className="relative z-10">Asset Showcase</span>
                  <span className="relative z-10 w-5 h-5 flex items-center justify-center">
                    <span className="absolute w-1.5 h-1.5 bg-primary rounded-full group-hover:animate-ping"></span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  </span>
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6">
              {[
                { value: '10K+', label: 'Active Users' },
                { value: '99.9%', label: 'Accuracy Rate' },
                { value: '5min', label: 'Setup Time' }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="group relative p-4 rounded-xl bg-background/30 backdrop-blur-sm border border-border/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent group-hover:from-accent group-hover:to-primary transition-all duration-500">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 -z-10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Visual */}
          <div className="relative h-[500px] flex items-center justify-center animate-in fade-in-0 slide-in-from-right-12 duration-1000">
            {/* Floating Cards */}
            <div className="absolute -top-8 -left-8 w-64 h-36 bg-gradient-to-br from-white to-gray-50 dark:from-card dark:to-card/80 rounded-2xl p-5 shadow-2xl border border-border/20 animate-subtle-float z-20">
              <div className="flex items-center justify-between mb-3">
                <div className="font-bold text-sm">Monthly Savings</div>
                <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
              </div>
              <div className="text-2xl font-black text-green-600 dark:text-green-400">+$2,450</div>
              <div className="h-2 bg-green-100 dark:bg-green-900/30 rounded-full mt-4 overflow-hidden">
                <div className="h-full w-4/5 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -right-8 w-72 h-40 bg-gradient-to-br from-white to-gray-50 dark:from-card dark:to-card/80 rounded-2xl p-5 shadow-2xl border border-border/20 animate-subtle-float z-20" style={{animationDelay: '2s'}}>
              <div className="flex items-center justify-between mb-3">
                <div className="font-bold text-sm">AI Processing</div>
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400">Receipt Scanned</div>
              <div className="flex items-center mt-3 text-xs text-muted-foreground">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                Analyzing transaction...
              </div>
            </div>
            
            <div className="absolute top-1/2 -right-12 w-56 h-32 bg-gradient-to-br from-white to-gray-50 dark:from-card dark:to-card/80 rounded-2xl p-5 shadow-2xl border border-border/20 animate-subtle-float z-10" style={{animationDelay: '1s'}}>
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-sm">Budget Alert</div>
                <div className="text-xs font-medium text-amber-500">80% Used</div>
              </div>
              <div className="h-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                Monthly budget for Dining Out
              </div>
            </div>
            
            {/* Main Card */}
            <div className="relative w-72 h-80 bg-gradient-to-br from-white to-gray-50 dark:from-card dark:to-card/80 rounded-3xl p-6 shadow-2xl border border-border/20 overflow-hidden z-30">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Dashboard</h3>
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                      <span>Total Balance</span>
                      <span>This Month</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-black">$12,450</span>
                      <span className="text-sm font-medium text-green-500">+12.5%</span>
                    </div>
                  </div>
                  
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-3 rounded-xl bg-primary/5">
                      <div className="text-xs text-muted-foreground mb-1">Income</div>
                      <div className="font-bold">$8,240</div>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-500/5">
                      <div className="text-xs text-muted-foreground mb-1">Expenses</div>
                      <div className="font-bold">$3,420</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-card to-transparent">
                  <button className="w-full py-3 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-lg transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
