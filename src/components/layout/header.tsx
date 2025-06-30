'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const navLinks = [
  { 
    href: "/#features", 
    label: "Features",
    submenu: [
      { href: "/features/expense-tracking", label: "Expense Tracking" },
      { href: "/features/budgeting", label: "Budgeting" },
      { href: "/features/reports-analytics", label: "Reports & Analytics" },
    ]
  },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setOpenDropdown(null);
        setIsMenuOpen(false);
      }
    } else {
        setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 border-b',
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md border-border/20 shadow-sm' 
          : 'bg-background/80 backdrop-blur-sm border-transparent',
        'supports-[backdrop-filter]:bg-background/80'
      )}
    >
      <div className="container flex h-20 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link 
          href="/" 
          className="group relative z-10"
          onClick={() => setOpenDropdown(null)}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:shadow-primary/25 transition-all duration-300 group-hover:scale-105 group-hover:rotate-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl animate-pulse"></div>
                <div className="relative w-full h-full flex items-center justify-center p-1.5">
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
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 delay-100"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-2xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-none group-hover:scale-105 transition-transform duration-300">
                Fluxpense
              </span>
              <span className="text-xs font-semibold tracking-wider text-muted-foreground group-hover:text-primary transition-colors duration-300">
                AI FINANCE
              </span>
            </div>
          </div>
        </Link>

        {isMobile ? (
          <>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative z-10 h-10 w-10 rounded-xl hover:bg-primary/10 hover:scale-110 transition-all duration-200"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[280px] sm:w-[350px] p-0 bg-background/95 backdrop-blur-lg border-l border-border/20"
                onInteractOutside={() => setIsMenuOpen(false)}
              >
                <div className="h-full overflow-y-auto">
                  <nav className="flex flex-col py-6 px-5">
                    {navLinks.map((link) => (
                      <div key={link.href} className="border-b border-border/20 last:border-0">
                        <Link
                          href={link.href}
                          onClick={(e) => handleScrollTo(e, link.href)}
                          className="flex items-center justify-between py-4 text-base font-medium text-foreground/90 hover:text-primary transition-colors duration-200"
                        >
                          {link.label}
                          {link.submenu && <ChevronDown className="h-4 w-4 ml-2 opacity-70" />}
                        </Link>
                        
                        {link.submenu && (
                          <div className="pl-4 pb-2 space-y-2">
                            {link.submenu.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-border/20">
                      <Button 
                        asChild 
                        className="h-11 rounded-xl font-medium bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-200"
                      >
                        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>Open Dashboard</Link>
                      </Button>
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </>
        ) : (
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <div className="flex items-center">
                  <Link
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    onMouseEnter={() => link.submenu && setOpenDropdown(link.href)}
                    className={cn(
                      'px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200',
                      'text-foreground/80 hover:text-primary hover:bg-foreground/5',
                      'flex items-center gap-1',
                      openDropdown === link.href && 'text-primary bg-foreground/5'
                    )}
                  >
                    {link.label}
                    {link.submenu && (
                      <ChevronDown className={cn(
                        'h-4 w-4 ml-0.5 transition-transform duration-200',
                        openDropdown === link.href ? 'rotate-180' : ''
                      )} />
                    )}
                  </Link>
                </div>
                
                {link.submenu && (
                  <div 
                    className={cn(
                      'absolute left-0 top-full mt-1 w-56 origin-top-left rounded-xl bg-background p-2 shadow-lg ring-1 ring-border/20 ring-opacity-5',
                      'opacity-0 invisible transition-all duration-200 transform -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0',
                      'backdrop-blur-lg bg-background/95 border border-border/20',
                      openDropdown === link.href ? 'opacity-100 visible translate-y-0' : ''
                    )}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div className="py-1">
                      {link.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-foreground/5 rounded-lg transition-colors duration-150"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="flex items-center gap-2 ml-2">
              <Button 
                asChild 
                className="h-10 px-5 rounded-xl font-medium bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-200"
              >
                <Link href="/dashboard">Open Dashboard</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
