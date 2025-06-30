"use client";

import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, AlertTriangle, CheckCircle, ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Progress } from "@/components/ui/progress";
import { staticBudgets } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export default function BudgetsPage() {
  const { totalBudget, totalSpent, onTrackCount } = useMemo(() => {
    const budgetTotal = staticBudgets.reduce((sum, b) => sum + b.amount, 0);
    const spentTotal = staticBudgets.reduce((sum, b) => sum + b.spent, 0);
    const trackCount = staticBudgets.filter(b => b.spent <= b.amount).length;
    return {
      totalBudget: budgetTotal,
      totalSpent: spentTotal,
      onTrackCount: trackCount,
    };
  }, []);

  const remainingBudget = totalBudget - totalSpent;

  return (
    <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
            <p className="text-muted-foreground">Set and track your spending limits across categories.</p>
        </div>
        <div className="flex gap-2">
            <Link href="/dashboard/overview">
            <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Overview
            </Button>
            </Link>
            <Button className="button-glow">
            <Plus className="mr-2 h-4 w-4" />
            Create Budget
            </Button>
        </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:border-primary/40 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold text-primary">${totalBudget.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Monthly allocation</p>
            </CardContent>
        </Card>
        <Card className="glassmorphism border-green-500/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:border-green-500/40 transition-all" style={{animationDelay: '100ms'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold text-green-500">${totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{totalBudget > 0 ? Math.round((totalSpent/totalBudget)*100) : 0}% of budget</p>
            </CardContent>
        </Card>
        <Card className="glassmorphism border-amber-500/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:border-amber-500/40 transition-all" style={{animationDelay: '200ms'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold text-amber-500">${remainingBudget.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{totalBudget > 0 ? 100-Math.round((totalSpent/totalBudget)*100) : 100}% remaining</p>
            </CardContent>
        </Card>
        <Card className="glassmorphism border-blue-500/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:border-blue-500/40 transition-all" style={{animationDelay: '300ms'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Track</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold text-blue-500">{onTrackCount}/{staticBudgets.length}</div>
            <p className="text-xs text-muted-foreground">Categories on track</p>
            </CardContent>
        </Card>
        </div>

        <Card className="glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '400ms'}}>
        <CardHeader>
            <CardTitle>Budget Details</CardTitle>
            <CardDescription>Drag and drop to reorder budget priority. Click to edit.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-6">
            {staticBudgets.map((budget, index) => {
                const percentage = budget.amount > 0 ? (budget.spent / budget.amount) * 100 : 0;
                const overBudget = percentage > 100;
                return (
                <div key={budget.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors animate-in fade-in-0" style={{animationDelay: `${500 + index * 100}ms`}}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="font-medium text-lg">{budget.category?.name}</div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                        ${budget.spent.toFixed(2)} / <span className="font-semibold text-foreground">${budget.amount.toFixed(2)}</span>
                        </span>
                        {overBudget && <Badge variant="destructive">Over Budget</Badge>}
                    </div>
                    </div>
                    <Progress value={Math.min(percentage, 100)} className="mt-2 h-2" />
                </div>
                );
            })}
            </div>
        </CardContent>
        </Card>
    </div>
  );
}
