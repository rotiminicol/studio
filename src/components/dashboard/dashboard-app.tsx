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
  SidebarMenuBadge
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
} from "lucide-react";
import { AddExpenseDialog } from "@/components/dashboard/add-expense-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Notification } from "@/lib/types";

const menuItems = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: Home,
  },
  {
    href: "/dashboard/expenses",
    label: "Expenses",
    icon: Receipt,
  },
  {
    href: "/dashboard/reports",
    label: "Reports",
    icon: BarChart2,
  },
  {
    href: "/dashboard/notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
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
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin" />
        </div>
    )
  }
  
  if (!user) {
    // This should ideally not be reached if AuthProvider handles redirection correctly,
    // but it's a good fallback.
    return null;
  }

  return (
      <SidebarProvider>
        <Sidebar variant="floating" collapsible="icon">
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent className="no-scrollbar">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href}>
                     <SidebarMenuButton tooltip={item.label} isActive={pathname === item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                       {item.href === '/dashboard/notifications' && unreadNotificationCount > 0 && (
                          <SidebarMenuBadge>{unreadNotificationCount}</SidebarMenuBadge>
                       )}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
              <SidebarMenu>
                  <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Log out" onClick={() => logout()}>
                          <LogOut />
                          <span>Log out</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
           <div className="fixed bottom-6 right-6 z-50">
              <Button size="icon" className="rounded-full w-14 h-14 button-glow" onClick={() => setIsAddExpenseOpen(true)}>
                  <PlusCircle className="w-8 h-8"/>
                  <span className="sr-only">Add Expense</span>
              </Button>
          </div>
          <AddExpenseDialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen} />

          <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-lg px-4 md:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
              {/* Can add breadcrumbs or page title here */}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotificationCount > 0 && (
                      <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-destructive ring-2 ring-background" />
                  )}
                  <span className="sr-only">Toggle notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifications</span>
                    {unreadNotificationCount > 0 && <Badge variant="secondary">{unreadNotificationCount} New</Badge>}
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
                <Button variant="ghost" className="rounded-full flex items-center gap-2 px-2">
                   <p className="text-sm font-medium hidden md:block">{user?.name}</p>
                   <CircleUser className="h-6 w-6" />
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
                <DropdownMenuItem asChild><Link href="/dashboard/settings">Settings</Link></DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => logout()}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
  );
}
