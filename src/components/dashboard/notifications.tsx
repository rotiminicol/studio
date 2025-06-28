"use client";

import { useData } from "@/contexts/data-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check, FileWarning, Wallet } from "lucide-react";
import { format, formatRelative, isSameDay, isYesterday } from "date-fns";
import { cn } from "@/lib/utils";

export function Notifications() {
  const { notifications, markAllNotificationsRead, loading } = useData();

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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>All your recent account activity.</CardDescription>
          </div>
          <Button onClick={markAllNotificationsRead} disabled={notifications.every(n => n.is_read)}>
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
            <p>Loading notifications...</p>
        ) : Object.keys(groupedNotifications).length > 0 ? (
          <div className="space-y-8">
            {Object.entries(groupedNotifications).map(([groupTitle, notifs]) => (
              <div key={groupTitle}>
                <h3 className="text-lg font-semibold mb-4">{groupTitle}</h3>
                <div className="space-y-4">
                  {notifs.map((notification) => (
                    <div key={notification.id} className={cn("flex items-start gap-4 p-4 rounded-lg border", !notification.is_read && "bg-muted/50")}>
                        <div className="p-2 bg-background rounded-full">{getIcon(notification.type)}</div>
                        <div className="flex-1">
                            <p className="font-semibold">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatRelative(new Date(notification.created_at), new Date())}
                        </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">All caught up!</h3>
            <p className="mt-1 text-sm text-muted-foreground">You have no new notifications.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
