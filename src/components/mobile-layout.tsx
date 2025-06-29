'use client';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Menu, Bell, User, Plus, Home, Receipt, PieChart, Settings } from 'lucide-react';
import Link from 'next/link';

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  showMenu?: boolean;
  showNotifications?: boolean;
  showUser?: boolean;
}

// Background images for different mobile pages
const mobileBackgrounds = {
  '/': '/1.jpg',
  '/auth': '/2.jpg',
  '/onboarding': '/3.jpg',
  '/dashboard': '/4.jpg',
  '/dashboard/expenses': '/5.jpg',
  '/dashboard/reports': '/6.jpg',
  '/dashboard/budgets': '/7.jpg',
  '/dashboard/categories': '/8.jpg',
  '/dashboard/integrations': '/9.jpg',
  '/dashboard/team': '/10.jpg',
  '/dashboard/notifications': '/11.jpg',
  '/dashboard/settings': '/12.jpg',
  '/subscription': '/13.jpg',
};

export function MobileLayout({ 
  children, 
  title, 
  showBackButton = false, 
  onBack,
  showMenu = true,
  showNotifications = true,
  showUser = true
}: MobileLayoutProps) {
  const pathname = usePathname();
  const backgroundImage = mobileBackgrounds[pathname as keyof typeof mobileBackgrounds] || '/1.jpg';

  return (
    <div className="min-h-screen relative overflow-hidden md:hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Mobile background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/95"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-4 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-4 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-primary/30 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-4 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          
          {title ? (
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {title}
            </h1>
          ) : (
            <Logo variant="default" size="sm" />
          )}
        </div>

        <div className="flex items-center gap-2">
          {showNotifications && (
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></span>
            </Button>
          )}
          
          {showUser && (
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <User className="w-5 h-5" />
            </Button>
          )}
          
          {showMenu && (
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Menu className="w-5 h-5" />
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 p-4 pb-20">
        <div className="animate-in fade-in-0 slide-in-from-bottom-8 duration-500">
          {children}
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-20">
        <Button
          size="lg"
          className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-accent hover:scale-110 transition-all duration-200 animate-float"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 bg-background/90 backdrop-blur-lg border-t border-border/50">
        <div className="flex justify-around items-center p-2">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-primary/10 transition-colors">
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>
          
          <Link href="/dashboard/expenses" className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-primary/10 transition-colors">
            <Receipt className="w-5 h-5" />
            <span className="text-xs">Expenses</span>
          </Link>
          
          <Link href="/dashboard/reports" className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-primary/10 transition-colors">
            <PieChart className="w-5 h-5" />
            <span className="text-xs">Reports</span>
          </Link>
          
          <Link href="/dashboard/settings" className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-primary/10 transition-colors">
            <Settings className="w-5 h-5" />
            <span className="text-xs">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
} 