"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import type { Budget } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "../ui/skeleton";
import { staticBudgets } from "@/lib/mock-data";

export function SettingsTab() {
  const { toast } = useToast();
  const [localBudgets, setLocalBudgets] = useState<Budget[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [weeklySummary, setWeeklySummary] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [promotionalUpdates, setPromotionalUpdates] = useState(false);

  useEffect(() => {
    // Simulate fetching data
    setLocalBudgets(JSON.parse(JSON.stringify(staticBudgets)));
    setLoading(false);
  }, []);
  
  const handleBudgetChange = (id: number, newAmount: number) => {
    setLocalBudgets(prev => prev.map(b => b.id === id ? {...b, amount: newAmount} : b));
  }

  const handleSaveBudgets = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({title: "Budgets Saved!", description: "Your new budget limits have been saved."});
    setIsSaving(false);
  }

  const BudgetSkeleton = () => (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-3 w-full" />
      <div className="flex items-center gap-4 mt-2">
        <Skeleton className="h-5 flex-grow" />
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  );

  return (
    <div className="grid gap-6">
      <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <CardHeader>
          <CardTitle>Budget Management</CardTitle>
          <CardDescription>
            Set and adjust your monthly spending budgets for each category.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {loading ? (
             [...Array(4)].map((_, i) => <BudgetSkeleton key={i} />)
          ) : (
            <>
              {localBudgets.map((cat, index) => {
                const percentage = cat.amount > 0 ? (cat.spent / cat.amount) * 100 : 0;
                return (
                  <div key={cat.id} className="animate-in fade-in-0" style={{animationDelay: `${index * 100}ms`}}>
                    <div className="flex justify-between items-center mb-2">
                        <Label className="text-lg font-medium">{cat.category?.name || 'Unnamed Category'}</Label>
                        <span className="text-muted-foreground font-mono text-sm">${cat.spent.toFixed(2)} / ${cat.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Progress value={percentage} className="h-3" />
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                        <Slider value={[cat.amount]} max={2000} step={50} onValueChange={(val) => handleBudgetChange(cat.id, val[0])} />
                        <Input className="w-28" type="number" value={cat.amount} onChange={(e) => handleBudgetChange(cat.id, parseFloat(e.target.value) || 0)} />
                    </div>
                  </div>
                );
              })}
              <Button onClick={handleSaveBudgets} disabled={isSaving} className="button-glow">
                {isSaving && <Loader2 className="animate-spin mr-2" />}
                Save Budgets
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '200ms'}}>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage your notification preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <Label htmlFor="weekly-summary">Weekly Summary Email</Label>
                    <p className="text-sm text-muted-foreground">Get a report of your spending every week.</p>
                </div>
                <Switch id="weekly-summary" checked={weeklySummary} onCheckedChange={setWeeklySummary} />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <Label htmlFor="budget-alerts">Budget Alerts</Label>
                    <p className="text-sm text-muted-foreground">Notify me when I'm approaching a budget limit.</p>
                </div>
                <Switch id="budget-alerts" checked={budgetAlerts} onCheckedChange={setBudgetAlerts} />
            </div>
             <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <Label htmlFor="promotional-updates">Promotional Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive news about new features and offers.</p>
                </div>
                <Switch id="promotional-updates" checked={promotionalUpdates} onCheckedChange={setPromotionalUpdates} />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
