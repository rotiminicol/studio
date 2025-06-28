"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, Home, Receipt, Settings, PlusCircle } from "lucide-react";
import { Overview } from "./overview";
import { Expenses } from "./expenses";
import { Reports } from "./reports";
import { SettingsTab } from "./settings";
import { Button } from "../ui/button";
import { AddExpenseDialog } from "./add-expense-dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const activeTab = searchParams.get('tab') || 'overview';

  const onTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
          <Button size="icon" className="rounded-full w-14 h-14 button-glow" onClick={() => setIsAddExpenseOpen(true)}>
              <PlusCircle className="w-8 h-8"/>
              <span className="sr-only">Add Expense</span>
          </Button>
      </div>
      <AddExpenseDialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen} />
      
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <div className="flex items-center justify-between">
          {isMobile ? (
             <Select value={activeTab} onValueChange={onTabChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a tab" />
                </SelectTrigger>
                <SelectContent>
                   {menuItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          ) : (
            <TabsList>
              {menuItems.map((item) => (
                <TabsTrigger key={item.value} value={item.value}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          )}
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
