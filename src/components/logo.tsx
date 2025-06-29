import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rounded-xl shadow-lg"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7DF9FF" />
              <stop offset="50%" stopColor="#BE95FF" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background with gradient */}
          <rect width="40" height="40" rx="12" fill="url(#logoGradient)" />
          
          {/* Floating coins animation */}
          <g filter="url(#glow)">
            {/* Main coin */}
            <circle cx="20" cy="20" r="8" fill="white" fillOpacity="0.9" className="animate-pulse" />
            <text x="20" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#4F46E5">$</text>
            
            {/* Floating smaller coins */}
            <circle cx="12" cy="12" r="3" fill="white" fillOpacity="0.7" className="animate-float" />
            <circle cx="28" cy="28" r="3" fill="white" fillOpacity="0.7" className="animate-float" style={{animationDelay: '1s'}} />
            <circle cx="28" cy="12" r="2" fill="white" fillOpacity="0.5" className="animate-float" style={{animationDelay: '2s'}} />
          </g>
          
          {/* Flux lines */}
          <path d="M8 20 L32 20" stroke="white" strokeWidth="1" strokeOpacity="0.3" className="animate-pulse" />
          <path d="M20 8 L20 32" stroke="white" strokeWidth="1" strokeOpacity="0.3" className="animate-pulse" style={{animationDelay: '0.5s'}} />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-2xl font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Fluxpense
        </span>
        <span className="text-xs text-muted-foreground font-medium tracking-wide">
          AI-Powered Expense Mastery
        </span>
      </div>
    </div>
  );
}