"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Twitter, Linkedin, ArrowUp } from "lucide-react";

export function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (!showScroll && window.pageYOffset > 300) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 300) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/10 border-t border-border/40 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container max-w-screen-2xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative transform transition-transform duration-300 group-hover:scale-105">
                <Logo variant="bird" size="lg" className="drop-shadow-md" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed pl-1 border-l-2 border-primary/20 pl-3">
              Effortless expense management powered by AI. Take control of your finances with our intuitive platform.
            </p>
            <div className="flex space-x-4 pt-2">
              {[
                { 
                  icon: <Github className="h-5 w-5" />, 
                  label: 'Github', 
                  href: '#' 
                },
                { 
                  icon: <Twitter className="h-5 w-5" />, 
                  label: 'Twitter', 
                  href: '#' 
                },
                { 
                  icon: <Linkedin className="h-5 w-5" />, 
                  label: 'LinkedIn', 
                  href: '#' 
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="relative p-2 text-muted-foreground hover:text-foreground transition-all duration-300 group"
                >
                  <span className="absolute inset-0 rounded-full bg-accent/0 group-hover:bg-accent/20 transition-all duration-300" />
                  <span className="relative z-10">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h4 className="font-semibold text-foreground text-base relative inline-block">
              Product
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-primary/50 rounded-full" />
            </h4>
            <ul className="space-y-3.5">
              {[
                { name: 'Features', href: '/#features' },
                { name: 'Pricing', href: '/#pricing' },
                { name: 'FAQ', href: '/#faq' },
                { name: 'Integrations', href: '/#integrations' },
              ].map((item) => (
                <li key={item.name} className="group">
                  <Link 
                    href={item.href}
                    className="flex items-center text-muted-foreground hover:text-foreground text-sm transition-all duration-300 group-hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-2 transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h4 className="font-semibold text-foreground text-base relative inline-block">
              Company
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-primary/50 rounded-full" />
            </h4>
            <ul className="space-y-3.5">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Careers', href: '/careers' },
                { name: 'Blog', href: '/blog' },
                { name: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.name} className="group">
                  <Link 
                    href={item.href}
                    className="flex items-center text-muted-foreground hover:text-foreground text-sm transition-all duration-300 group-hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-2 transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h4 className="font-semibold text-foreground text-base relative inline-block">
              Stay Updated
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-primary/50 rounded-full" />
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Get the latest news, updates and special offers delivered to your inbox.
            </p>
            <form className="space-y-3">
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <Input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all pr-24"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-4 text-xs font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 transition-all duration-300"
                  >
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We respect your privacy. Unsubscribe at any time. No spam, ever.
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-border/20 py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Fluxpense. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link 
                href="/privacy" 
                className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              <span className="text-muted-foreground/50">•</span>
              <Link 
                href="/terms" 
                className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary/90 text-white shadow-lg hover:bg-primary transition-all duration-300 transform ${
          showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}