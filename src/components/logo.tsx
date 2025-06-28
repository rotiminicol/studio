import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-lg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        <path
          d="M16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0Z"
          fill="url(#logoGradient)"
        />
        <path
          d="M13 9H19.5C21.9853 9 24 11.0147 24 13.5V13.5C24 15.9853 21.9853 18 19.5 18H13M13 18V9M13 18H18"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-bold text-xl font-headline">Fluxpense</span>
    </div>
  );
}
