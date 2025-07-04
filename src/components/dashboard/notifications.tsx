"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check, FileWarning, Wallet } from "lucide-react";
import { format, formatRelative, isSameDay, isYesterday } from "date-fns";
import { cn } from "@/lib/utils";
import { staticNotifications } from "@/lib/mock-data";

export function Notifications() {
  const [notifications, setNotifications] = useState(staticNotifications);

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({...n, is_read: true})));
  }

  const groupedNotifications = notifications.reduce((acc, notification) => {
    const date = new Date(notification.created_at);
    let groupTitle = format(date, "MMMM d, yyyy");

    if (isSameDay(date, new Date())) {
      groupTitle = "Today";
    } else if (isYesterday(date)) {
      groupTitle = "Yesterday";
    }

    if (!acc[groupTitle]) {
      acc[groupTitle] = [];
    }
    acc[groupTitle].push(notification);
    return acc;
  }, {} as Record<string, typeof notifications>);

  const getIcon = (type: string) => {
    switch(type) {
        case 'budget': return <FileWarning className="w-6 h-6 text-amber-500" />;
        case 'expense': return <Wallet className="w-6 h-6 text-blue-500" />;
        case 'report': return <Bell className="w-6 h-6 text-green-500" />;
        default: return <Bell className="w-6 h-6 text-muted-foreground" />;
    }
  }

  return (
    <Card className="glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>All your recent account activity and alerts.</CardDescription>
          </div>
          <Button onClick={markAllNotificationsRead} disabled={notifications.every(n => n.is_read)} className="w-full md:w-auto">
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {Object.keys(groupedNotifications).length > 0 ? (
          <div className="space-y-8">
            {Object.entries(groupedNotifications).map(([groupTitle, notifs], groupIndex) => (
              <div key={groupTitle} className="animate-in fade-in-0" style={{animationDelay: `${groupIndex * 150}ms`}}>
                <h3 className="text-lg font-semibold mb-4">{groupTitle}</h3>
                <div className="space-y-4">
                  {notifs.map((notification, index) => (
                    <div key={notification.id} className={cn(
                        "flex items-start gap-4 p-4 rounded-lg border transition-colors hover:bg-muted/50 animate-in fade-in-0 slide-in-from-bottom-2", 
                        !notification.is_read && "bg-muted/50 border-primary/30"
                      )}
                      style={{animationDelay: `${150 + index * 50}ms`}}
                    >
                        <div className="p-2 bg-background rounded-full mt-1">{getIcon(notification.type)}</div>
                        <div className="flex-1">
                            <p className="font-semibold">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                        <p className="text-xs text-muted-foreground whitespace-nowrap mt-1">
                            {formatRelative(new Date(notification.created_at), new Date())}
                        </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-in fade-in-0 duration-500">
            <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">All caught up!</h3>
            <p className="mt-1 text-sm text-muted-foreground">You have no new notifications.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}