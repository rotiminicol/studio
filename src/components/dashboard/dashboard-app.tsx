
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
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
  LogOut,
  Bell,
  FileWarning,
  Check,
  Target,
  Users,
  HelpCircle,
  Sparkles,
  Zap,
  Database,
  Crown,
  Plus,
  Shield
} from "lucide-react";
import { AddExpenseDialog } from "@/components/dashboard/add-expense-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Notification } from "@/lib/types";
import { staticNotifications, demoUser } from "@/lib/mock-data";

const mainMenuItems = [
  { href: "/dashboard", label: "Overview", icon: Home, description: "Dashboard overview" },
  { href: "/dashboard/expenses", label: "Expenses", icon: Receipt, description: "Manage expenses" },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart2, description: "Analytics & insights" },
];

const toolsMenuItems = [
  { href: "/dashboard/budgets", label: "Budgets", icon: Target, description: "Budget management" },
  { href: "/dashboard/categories", label: "Categories", icon: Database, description: "Expense categories" },
  { href: "/dashboard/integrations", label: "Integrations", icon: Zap, description: "Connected apps" },
];

const accountMenuItems = [
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell, description: "Alerts & updates" },
  { href: "/dashboard/team", label: "Team", icon: Users, description: "Team management" },
  { href: "/subscription", label: "Subscription", icon: Crown, description: "Manage subscription" },
  { href: "/dashboard/settings", label: "Settings", icon: Settings, description: "Account settings" },
];

function NotificationItem({ notification, onRead }: { notification: Notification; onRead: (id: number) => void; }) {
  const Icon = notification.type === 'budget' ? FileWarning : Check;
  return (
    <Link href="/dashboard/notifications" passHref>
      <DropdownMenuItem
        className={`flex flex-col items-start p-3 cursor-pointer transition-all duration-200 hover:bg-primary/5 ${!notification.is_read ? 'bg-primary/10' : ''}`}
        onClick={() => onRead(notification.id)}
      >
        <div className="flex items-center gap-2 w-full">
          <Icon className={cn("mt-1 h-4 w-4 shrink-0", notification.type === 'budget' ? "text-amber-500" : "text-green-500")} />
          <span className="font-medium text-sm">{notification.title}</span>
          {!notification.is_read && <Badge variant="secondary" className="ml-auto text-xs">New</Badge>}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
      </DropdownMenuItem>
    </Link>
  );
}

function MobileBottomNav({ onAddExpenseClick }: { onAddExpenseClick: () => void; }) {
  const mainNavItems = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/dashboard/expenses", label: "Expenses", icon: Receipt },
    { href: "/dashboard/reports", label: "Reports", icon: BarChart2 },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border md:hidden z-50">
      <div className="flex justify-around items-center p-2">
        {mainNavItems.map((item) => (
          <Button variant="ghost" size="sm" asChild key={item.href} className="flex flex-col items-center gap-1 h-auto py-2">
            <Link href={item.href}>
              <item.icon className="w-4 h-4" />
              <span className="text-xs">{item.label}</span>
            </Link>
          </Button>
        ))}
        <Button
          onClick={onAddExpenseClick}
          size="sm"
          className="flex flex-col items-center justify-center gap-1 h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm" asChild className="flex flex-col items-center gap-1 h-auto py-2">
          <Link href="/dashboard/settings">
            <Settings className="w-4 h-4" />
            <span className="text-xs">Settings</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function DashboardApp({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [notifications, setNotifications] = useState(staticNotifications);

  const unreadNotificationCount = notifications.filter(n => !n.is_read).length;

  const markNotificationRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  return (
    <SidebarProvider>
      <Sidebar variant="floating" collapsible="icon" className="border-primary/20">
        <SidebarHeader className="border-b border-primary/20">
          <Logo variant="aiiit" size="md" />
        </SidebarHeader>

        <SidebarContent className="no-scrollbar">
          <SidebarGroup>
            <SidebarGroupLabel className="text-primary font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Main
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainMenuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href}>
                      <SidebarMenuButton tooltip={{ children: item.description, side: 'right' }} isActive={pathname === item.href} className="group data-[active=true]:bg-primary/20 data-[active=true]:border-primary/30 hover:scale-105 transition-all duration-200">
                        <item.icon className="group-hover:text-primary transition-colors" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-accent font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Tools
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {toolsMenuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href}>
                      <SidebarMenuButton tooltip={{ children: item.description, side: 'right' }} isActive={pathname === item.href} className="group data-[active=true]:bg-accent/20 hover:scale-105 transition-all duration-200">
                        <item.icon className="group-hover:text-accent transition-colors" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-muted-foreground font-semibold flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Account
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {accountMenuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href}>
                      <SidebarMenuButton tooltip={{ children: item.description, side: 'right' }} isActive={pathname.startsWith(item.href)} className="group hover:scale-105 transition-all duration-200">
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

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip={{ children: "Help & Support", side: 'right' }} className="hover:scale-105 transition-all duration-200">
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
              <Link href="/">
                <SidebarMenuButton tooltip={{ children: "Log out", side: 'right' }} className="hover:bg-destructive/10 hover:text-destructive hover:scale-105 transition-all duration-200">
                    <LogOut />
                    <span>Log out</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <main className="relative flex min-h-svh flex-1 flex-col bg-background transition-all duration-300 peer-data-[state=expanded]:peer-data-[variant=floating]:md:ml-[var(--sidebar-width)] peer-data-[state=collapsed]:peer-data-[variant=floating]:md:ml-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]">
        <AddExpenseDialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen} />

        <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[10px_10px] dark:bg-grid-slate-400/[0.05]"></div>
        </div>

        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-lg px-4 md:px-6 border-primary/20">
          <div className="flex-1"></div>

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
            <DropdownMenuContent align="end" className="w-80 animate-in fade-in-0 zoom-in-95">
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
                    notifications.slice(0, 10).map(n => <NotificationItem key={n.id} notification={n} onRead={markNotificationRead} />)
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
                  <p className="text-sm font-medium">{demoUser.name}</p>
                  <p className="text-xs text-muted-foreground">{demoUser.email}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                  {demoUser.name?.charAt(0).toUpperCase()}
                </div>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 animate-in fade-in-0 zoom-in-95">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{demoUser.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {demoUser.email}
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
                  <Sparkles className="w-4 h-4 mr-2" />
                  Subscription
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="w-4 h-4 mr-2" />
                Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/" className="text-destructive focus:text-destructive w-full">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:p-6 md:p-8 min-h-screen pb-24 md:pb-8 relative z-10">
            {children}
        </main>

        <MobileBottomNav onAddExpenseClick={() => setIsAddExpenseOpen(true)} />
      </main>
    </SidebarProvider>
  );
}
