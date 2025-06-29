import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative">
        <Image
          src="/Fluxpense Logo – Blue and Green with Arrow Icon.png"
          alt="Fluxpense Logo"
          width={40}
          height={40}
          className="rounded-xl shadow-lg"
          priority
        />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-2xl font-headline bg-gradient-to-r from-[#7DF9FF] via-[#BE95FF] to-[#4F46E5] bg-clip-text text-transparent">
          Fluxpense
        </span>
        <span className="text-xs text-muted-foreground font-medium tracking-wide">
          AI-Powered Expense Mastery
        </span>
      </div>
    </div>
  );
}