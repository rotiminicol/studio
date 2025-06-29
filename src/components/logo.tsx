import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 group", className)}>
      <div className="relative">
        <Image
          src="/Fluxpense Logo – Blue and Green with Arrow Icon.png"
          alt="Fluxpense Logo"
          width={40}
          height={40}
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
