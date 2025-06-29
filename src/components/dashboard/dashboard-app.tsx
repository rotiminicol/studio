"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useData } from "@/contexts/data-context";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
  SidebarMenuBadge,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  BarChart2,
  Home,
  Receipt,
  Settings,
  CircleUser,
  LogOut,
  Bell,
  Loader2,
  PlusCircle,
  FileWarning,
  Check,
  CreditCard,
  Target,
  TrendingUp,
  Users,
  HelpCircle,
  Sparkles,
  Zap,
  Shield,
  Database,
  Crown
} from "lucide-react";
import { AddExpenseDialog } from "@/components/dashboard/add-expense-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Notification } from "@/lib/types";

const mainMenuItems = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: Home,
    description: "Dashboard overview"
  },
  {
    href: "/dashboard/expenses",
    label: "Expenses",
    icon: Receipt,
    description: "Manage expenses"
  },
  {
    href: "/dashboard/reports",
    label: "Reports",
    icon: BarChart2,
    description: "Analytics & insights"
  },
];

const toolsMenuItems = [
  {
    href: "/dashboard/budgets",
    label: "Budgets",
    icon: Target,
    description: "Budget management"
  },
  {
    href: "/dashboard/categories",
    label: "Categories",
    icon: Database,
    description: "Expense categories"
  },
  {
    href: "/dashboard/integrations",
    label: "Integrations",
    icon: Zap,
    description: "Connected apps"
  },
];

const accountMenuItems = [
  {
    href: "/dashboard/notifications",
    label: "Notifications",
    icon: Bell,
    description: "Alerts & updates"
  },
  {
    href: "/dashboard/team",
    label: "Team",
    icon: Users,
    description: "Team management"
  },
  {
    href: "/subscription",
    label: "Subscription",
    icon: Crown,
    description: "Manage subscription"
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
    description: "Account settings"
  },
];

function NotificationItem({ notification, onRead }: { notification: Notification; onRead: (id: number) => void; }) {
    const Icon = notification.type === 'budget' ? FileWarning : Check;
    return (
        <DropdownMenuItem className="flex items-start gap-3" onSelect={(e) => e.preventDefault()}>
            <Icon className={cn("mt-1 h-4 w-4 shrink-0", notification.type === 'budget' ? "text-amber-500" : "text-green-500")} />
            <div className="flex-1">
                <p className="font-semibold text-sm">{notification.title}</p>
                <p className="text-xs text-muted-foreground">{notification.message}</p>
            </div>
            {!notification.is_read && (
              <Button variant="outline" size="sm" className="h-auto px-1.5 py-0.5" onClick={() => onRead(notification.id)}>
                <Check className="h-3 w-3" />
              </Button>
            )}
        </DropdownMenuItem>
    )
}

export function DashboardApp({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { notifications, unreadNotificationCount, markNotificationRead, loading } = useData();
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/10">
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Loading your dashboard...</h3>
                <p className="text-muted-foreground">Setting up your personalized experience</p>
              </div>
            </div>
        </div>
    )
  }
  
  if (!user) {
    return null;
  }

  return (
      <SidebarProvider>
        <Sidebar variant="floating" collapsible="icon" className="border-primary/20">
          <SidebarHeader className="border-b border-primary/20">
            <Logo />
          </SidebarHeader>
          
          <SidebarContent className="no-scrollbar">
            {/* Main Navigation */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-primary font-semibold">
                <Sparkles className="w-4 h-4 mr-2" />
                Main
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainMenuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <Link href={item.href}>
                         <SidebarMenuButton 
                           tooltip={item.description} 
                           isActive={pathname === item.href}
                           className="group hover:bg-primary/10 data-[active=true]:bg-primary/20 data-[active=true]:border-primary/30"
                         >
                          <item.icon className="group-hover:text-primary transition-colors" />
                          <span>{item.label}</span>
                           {item.href === '/dashboard/notifications' && unreadNotificationCount > 0 && (
                              <SidebarMenuBadge className="bg-primary text-primary-foreground">
                                {unreadNotificationCount}
                              </SidebarMenuBadge>
                           )}
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Tools */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-accent font-semibold">
                <Zap className="w-4 h-4 mr-2" />
                Tools
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {toolsMenuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <Link href={item.href}>
                         <SidebarMenuButton 
                           tooltip={item.description} 
                           isActive={pathname === item.href}
                           className="group hover:bg-accent/10 data-[active=true]:bg-accent/20"
                         >
                          <item.icon className="group-hover:text-accent transition-colors" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Account */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-muted-foreground font-semibold">
                <Shield className="w-4 h-4 mr-2" />
                Account
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {accountMenuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <Link href={item.href}>
                         <SidebarMenuButton 
                           tooltip={item.description} 
                           isActive={pathname === item.href}
                           className="group hover:bg-muted/50 data-[active=true]:bg-muted"
                         >
                          <item.icon className="group-hover:text-foreground transition-colors" />
                          <span>{item.label}</span>
                           {item.href === '/dashboard/notifications' && unreadNotificationCount > 0 && (
                              <SidebarMenuBadge>{unreadNotificationCount}</SidebarMenuBadge>
                           )}
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Help */}
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Help & Support">
                      <HelpCircle />
                      <span>Help & Support</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-primary/20">
              <SidebarMenu>
                  <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Log out" onClick={() => logout()} className="hover:bg-destructive/10 hover:text-destructive">
                          <LogOut />
                          <span>Log out</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
           {/* Floating Add Button */}
           <div className="fixed bottom-6 right-6 z-50">
              <Button 
                size="icon" 
                className="rounded-full w-16 h-16 button-glow shadow-2xl hover:scale-110 transition-all duration-300" 
                onClick={() => setIsAddExpenseOpen(true)}
              >
                  <PlusCircle className="w-8 h-8"/>
                  <span className="sr-only">Add Expense</span>
              </Button>
          </div>
          <AddExpenseDialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen} />

          <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-lg px-4 md:px-6 border-primary/20">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
              {/* Breadcrumbs could go here */}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative hover:bg-primary/10">
                  <Bell className="h-5 w-5" />
                  {unreadNotificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold animate-pulse">
                        {unreadNotificationCount}
                      </span>
                  )}
                  <span className="sr-only">Toggle notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    {unreadNotificationCount > 0 && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {unreadNotificationCount} New
                      </Badge>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <ScrollArea className="h-[300px] no-scrollbar">
                    <DropdownMenuGroup>
                      {notifications.length > 0 ? (
                        notifications.slice(0,10).map(n => <NotificationItem key={n.id} notification={n} onRead={markNotificationRead} />)
                      ) : (
                        <p className="text-center text-sm text-muted-foreground py-4">No notifications yet.</p>
                      )}
                    </DropdownMenuGroup>
                  </ScrollArea>
                   <DropdownMenuSeparator />
                   <DropdownMenuItem asChild>
                     <Link href="/dashboard/notifications" className="justify-center">View all notifications</Link>
                   </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full flex items-center gap-2 px-2 hover:bg-primary/10">
                   <div className="hidden md:block text-right">
                     <p className="text-sm font-medium">{user?.name}</p>
                     <p className="text-xs text-muted-foreground">{user?.email}</p>
                   </div>
                   <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                     {user?.name?.charAt(0).toUpperCase()}
                   </div>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/subscription" className="flex items-center">
                    <Crown className="w-4 h-4 mr-2" />
                    Subscription
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => logout()} className="text-destructive focus:text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-background via-primary/5 to-accent/10 min-h-screen">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
  );
}