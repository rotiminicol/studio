"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { categoryBudgets } from "@/lib/data";

export function SettingsTab() {
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
          {categoryBudgets.map((cat) => {
            const percentage = (cat.spent / cat.budget) * 100;
            return (
              <div key={cat.category}>
                <div className="flex justify-between items-center mb-2">
                    <Label className="text-lg font-medium">{cat.category}</Label>
                    <span className="text-muted-foreground font-mono text-sm">${cat.spent.toFixed(2)} / ${cat.budget.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Progress value={percentage} className="h-3" />
                </div>
                 <div className="flex items-center gap-4 mt-2">
                    <Slider defaultValue={[cat.budget]} max={2000} step={50} />
                    <Input className="w-24" defaultValue={cat.budget} />
                </div>
              </div>
            );
          })}
           <Button>Save Budgets</Button>
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
