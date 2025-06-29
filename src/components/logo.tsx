import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "default" | "wave" | "feather" | "arrow";
  size?: "sm" | "md" | "lg" | "xl";
}

const logoVariants = {
  default: "/fluxpense-logo-1.png", // 3D geometric design
  wave: "/fluxpense-logo-2.png",    // Flowing wave design
  feather: "/fluxpense-logo-3.png", // Abstract feather design
  arrow: "/fluxpense-logo-4.png"    // Simple arrow design
};

const sizeVariants = {
  sm: { width: 32, height: 32 },
  md: { width: 40, height: 40 },
  lg: { width: 48, height: 48 },
  xl: { width: 64, height: 64 }
};

export function Logo({ className, variant = "default", size = "md" }: LogoProps) {
  const logoSrc = logoVariants[variant];
  const dimensions = sizeVariants[size];

  return (
    <div className={cn("flex items-center gap-3 group", className)}>
      <div className="relative">
        <Image
          src={logoSrc}
          alt="Fluxpense Logo"
          width={dimensions.width}
          height={dimensions.height}
          className="rounded-xl shadow-lg group-hover:animate-pulse-glow transition-all duration-300"
          priority
        />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-2xl font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Fluxpense
        </span>
      </div>
    </div>
  );
}