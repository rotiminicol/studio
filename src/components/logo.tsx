import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "default" | "aiiit" | "big-bird" | "bird" | "arrow";
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  animated?: boolean;
}

const logoVariants = {
  default: "/Fluxpense Logo – Blue and Green with Arrow Icon.png", // Main Fluxpense logo
  aiiit: "/aiiit.jpg",                                              // AIIIT logo variant
  "big-bird": "/big bird.jpg",                                      // Big bird logo variant
  bird: "/bird.jpg",                                                // Bird logo variant
  arrow: "/Fluxpense Logo – Blue and Green with Arrow Icon.png"     // Arrow design (same as default)
};

const sizeVariants = {
  sm: { width: 32, height: 32, textSize: "text-lg" },
  md: { width: 40, height: 40, textSize: "text-xl" },
  lg: { width: 48, height: 48, textSize: "text-2xl" },
  xl: { width: 64, height: 64, textSize: "text-3xl" }
};

export function Logo({ className, variant = "default", size = "md", showText = true, animated = true }: LogoProps) {
  const logoSrc = logoVariants[variant];
  const dimensions = sizeVariants[size];

  return (
    <div className={cn("flex items-center gap-3 group cursor-pointer", className)}>
      {/* 3D Logo Container */}
      <div className={cn(
        "relative transform transition-all duration-500 logo-3d-shadow",
        animated && "group-hover:scale-110 group-hover:rotate-3 group-hover:-translate-y-1 animate-logo-3d-float",
        "group-hover:shadow-2xl group-hover:shadow-primary/25"
      )}>
        {/* 3D Shadow Effect */}
        <div className={cn(
          "absolute inset-0 rounded-xl transition-all duration-500",
          animated && "group-hover:translate-y-2 group-hover:opacity-50",
          "bg-gradient-to-br from-black/20 to-transparent"
        )}></div>
        
        {/* Main Logo Image */}
        <div className={cn(
          "relative rounded-xl overflow-hidden transition-all duration-500",
          animated && "group-hover:shadow-lg group-hover:shadow-primary/30 animate-logo-3d-glow",
          "border border-white/10 backdrop-blur-sm"
        )}>
        <Image
          src={logoSrc}
          alt="Fluxpense Logo"
          width={dimensions.width}
          height={dimensions.height}
            className={cn(
              "object-cover transition-all duration-500",
              animated && "group-hover:brightness-110 group-hover:contrast-110"
            )}
          priority
        />
          
          {/* 3D Glow Effect */}
          <div className={cn(
            "absolute inset-0 rounded-xl transition-all duration-500",
            animated && "group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-accent/20",
            "pointer-events-none"
          )}></div>
        </div>
        
        {/* Floating Particles Effect */}
        {animated && (
          <>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500"></div>
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 delay-100"></div>
            <div className="absolute top-1/2 -right-2 w-1 h-1 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 delay-200"></div>
          </>
        )}
      </div>
      
      {/* Enhanced Text */}
      {showText && (
        <div className="flex flex-col relative">
          {/* Text Shadow for 3D Effect */}
          <span className={cn(
            "font-bold font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent logo-text-3d",
            dimensions.textSize,
            "relative z-10",
            animated && "group-hover:scale-105 transition-transform duration-300 animate-text-3d-shift"
          )}>
            Fluxpense
          </span>
          
          {/* 3D Text Shadow */}
          <span className={cn(
            "font-bold font-headline absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent",
            dimensions.textSize,
            "translate-x-0.5 translate-y-0.5 opacity-30 blur-sm",
            animated && "group-hover:translate-x-1 group-hover:translate-y-1 group-hover:opacity-50 transition-all duration-300"
          )}>
          Fluxpense
        </span>
          
          {/* Animated Underline */}
          {animated && (
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500 ease-out"></div>
          )}
          
          {/* Additional 3D Text Effects */}
          {animated && (
            <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-accent/50 to-primary/50 group-hover:w-full transition-all duration-700 ease-out delay-100"></div>
          )}
      </div>
      )}
    </div>
  );
}