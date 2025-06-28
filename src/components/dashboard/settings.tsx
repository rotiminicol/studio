"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useData } from "@/contexts/data-context";
import { Loader2 } from "lucide-react";
import type { Budget } from "@/lib/types";

export function SettingsTab() {
  const { budgets, loading, updateBudget } = useData();
  const [localBudgets, setLocalBudgets] = useState<Budget[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Deep copy to prevent modifying original context state directly
    setLocalBudgets(JSON.parse(JSON.stringify(budgets)));
  }, [budgets]);
  
  const handleBudgetChange = (id: number, newAmount: number) => {
    setLocalBudgets(prev => prev.map(b => b.id === id ? {...b, amount: newAmount} : b));
  }

  const handleSaveBudgets = async () => {
    setIsSaving(true);
    const updatedBudgets = localBudgets.filter((localBudget, index) => {
        const originalBudget = budgets.find(b => b.id === localBudget.id);
        return originalBudget && originalBudget.amount !== localBudget.amount;
    });

    await Promise.all(
        updatedBudgets.map(b => updateBudget(b.id, { amount: b.amount }))
    );
    setIsSaving(false);
  }

  if (loading) {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Budget Management</CardTitle>
                    <CardDescription>Set and adjust your monthly spending budgets for each category.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-2">
                             <div className="flex justify-between items-center mb-2">
                                <Loader2 className="animate-spin" />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Budget Management</CardTitle>
          <CardDescription>
            Set and adjust your monthly spending budgets for each category.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {localBudgets.map((cat) => {
            const percentage = cat.amount > 0 ? (cat.spent / cat.amount) * 100 : 0;
            return (
              <div key={cat.id}>
                <div className="flex justify-between items-center mb-2">
                    <Label className="text-lg font-medium">{cat.category?.name || 'Unnamed Category'}</Label>
                    <span className="text-muted-foreground font-mono text-sm">${cat.spent.toFixed(2)} / ${cat.amount.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Progress value={percentage} className="h-3" />
                </div>
                 <div className="flex items-center gap-4 mt-2">
                    <Slider value={[cat.amount]} max={2000} step={50} onValueChange={(val) => handleBudgetChange(cat.id, val[0])} />
                    <Input className="w-28" value={cat.amount} onChange={(e) => handleBudgetChange(cat.id, parseFloat(e.target.value) || 0)} />
                </div>
              </div>
            );
          })}
           <Button onClick={handleSaveBudgets} disabled={isSaving}>
            {isSaving && <Loader2 className="animate-spin mr-2" />}
            Save Budgets
           </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage your notification preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <Label>Weekly Summary Email</Label>
                    <p className="text-sm text-muted-foreground">Get a report of your spending every week.</p>
                </div>
                <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <Label>Budget Alerts</Label>
                    <p className="text-sm text-muted-foreground">Notify me when I'm approaching a budget limit.</p>
                </div>
                <Switch defaultChecked />
            </div>
             <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <Label>Promotional Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive news about new features and offers.</p>
                </div>
                <Switch />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
