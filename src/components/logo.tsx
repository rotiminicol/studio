
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "default" | "aiiit" | "big-bird" | "bird" | "arrow";
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

const logoVariants = {
  default: "/Fluxpense Logo – Blue and Green with Arrow Icon.png",
  aiiit: "/aiiit.jpg",
  "big-bird": "/big bird.jpg",
  bird: "/bird.jpg",
  arrow: "/Fluxpense Logo – Blue and Green with Arrow Icon.png"
};

const sizeVariants = {
  sm: { width: 32, height: 32, textSize: "text-lg" },
  md: { width: 40, height: 40, textSize: "text-xl" },
  lg: { width: 48, height: 48, textSize: "text-2xl" },
  xl: { width: 64, height: 64, textSize: "text-3xl" }
};

export function Logo({ className, variant = "default", size = "md", showText = true }: LogoProps) {
  const logoSrc = logoVariants[variant];
  const dimensions = sizeVariants[size];

  return (
    <div className={cn("flex items-center gap-3 group", className)}>
      <div className={cn(
        "relative transform transition-transform duration-300 group-hover:scale-105"
      )}>
        <Image
          src={logoSrc}
          alt="Fluxpense Logo"
          width={dimensions.width}
          height={dimensions.height}
          className="object-cover rounded-lg"
          priority
        />
      </div>
      
      {showText && (
        <span className={cn(
          "font-black font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent group-hover:scale-[1.02] transition-transform duration-300",
          dimensions.textSize
        )}>
          Fluxpense
        </span>
      )}
    </div>
  );
}
