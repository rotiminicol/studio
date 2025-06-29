'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="group">
          <div className="flex items-center gap-3">
            {/* Enhanced Logo with Big Bird Image */}
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl shadow-lg group-hover:shadow-xl group-hover:shadow-primary/25 transition-all duration-300 group-hover:scale-110 group-hover:rotate-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl animate-pulse"></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src="/big bird.jpg"
                    alt="Fluxpense Logo"
                    width={40}
                    height={40}
                    className="object-cover rounded-lg group-hover:brightness-110 group-hover:contrast-110 transition-all duration-300"
                    priority
                  />
                </div>
              </div>
              {/* Floating particles */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 delay-100"></div>
            </div>
            
            {/* Enhanced Typography */}
            <div className="flex flex-col">
              <span className="text-xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-none group-hover:scale-105 transition-transform duration-300">
                Fluxpense
              </span>
              <span className="text-xs text-muted-foreground font-medium tracking-wider group-hover:text-primary transition-colors duration-300">
                AI FINANCE
              </span>
            </div>
          </div>
        </Link>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:scale-110 transition-all duration-200">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-lg">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-2 py-3 text-lg font-medium hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/5"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-border/50">
                  <Button variant="outline" asChild className="hover:bg-primary/5 hover:border-primary/50 transition-all duration-200">
                    <Link href="/auth">Log In</Link>
                  </Button>
                  <Button asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-200">
                    <Link href="/auth">Sign Up</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium transition-all duration-200 hover:text-primary hover:scale-105 text-foreground/70 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild className="hover:bg-primary/10 transition-all duration-200">
                <Link href="/auth">Log In</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
                <Link href="/auth">Sign Up</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}