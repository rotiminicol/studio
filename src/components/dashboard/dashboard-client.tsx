"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, Home, Receipt, Settings, PlusCircle } from "lucide-react";
import { Overview } from "./overview";
import { Expenses } from "./expenses";
import { Reports } from "./reports";
import { SettingsTab } from "./settings";
import { Button } from "../ui/button";

const menuItems = [
  {
    value: "overview",
    label: "Overview",
    icon: Home,
  },
  {
    value: "expenses",
    label: "Expenses",
    icon: Receipt,
  },
  {
    value: "reports",
    label: "Reports",
    icon: BarChart2,
  },
  {
    value: "settings",
    label: "Settings",
    icon: Settings,
  },
];

export function DashboardClient() {
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
          <Button size="icon" className="rounded-full w-14 h-14 button-glow">
              <PlusCircle className="w-8 h-8"/>
              <span className="sr-only">Add Expense</span>
          </Button>
      </div>
      <Tabs defaultValue="overview" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            {menuItems.map((item) => (
              <TabsTrigger key={item.value} value={item.value}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-6">
          <Overview />
        </TabsContent>
        <TabsContent value="expenses" className="mt-6">
          <Expenses />
        </TabsContent>
        <TabsContent value="reports" className="mt-6">
          <Reports />
        </TabsContent>
        <TabsContent value="settings" className="mt-6">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </>
  );
}
