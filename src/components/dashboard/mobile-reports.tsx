
"use client";

import { useMemo } from 'react';
import { useData } from '@/contexts/data-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  PieChart, 
  BarChart3, 
  TrendingUp, 
  Download,
  Share2
} from "lucide-react";
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart as RechartsBarChart, Bar, XAxis, YAxis } from 'recharts';

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

export function MobileReports() {
  const { expenses, budgets, loading } = useData();
  
  const { totalSpent, totalBudget, categoryBreakdown, spendingByMonth } = useMemo(() => {
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
    
    const categoryBreakdown = Object.entries(
      expenses.reduce((acc, expense) => {
        const catName = expense.category?.name || 'Uncategorized';
        acc[catName] = (acc[catName] || 0) + expense.amount;
        return acc;
      }, {} as Record<string, number>)
    ).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);

    const spendingByMonth = expenses.reduce((acc, expense) => {
      const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const lastSixMonths = [...Array(6)].map((_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return d.toLocaleString('default', { month: 'short' });
    }).reverse();

    const spendingData = lastSixMonths.map(month => ({
      name: month,
      total: spendingByMonth[month] || 0,
    }));
    
    return { totalSpent, totalBudget, categoryBreakdown, spendingByMonth: spendingData };
  }, [expenses, budgets]);

  if (loading) return <p>Loading reports...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Your financial insights at a glance</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-card/80 backdrop-blur-lg border border-border/50 text-center">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Spent</p>
            <p className="text-xl font-bold">${totalSpent.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/80 backdrop-blur-lg border border-border/50 text-center">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Budget Used</p>
            <p className="text-xl font-bold">{totalBudget > 0 ? `${Math.round((totalSpent / totalBudget) * 100)}%` : 'N/A'}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/80 backdrop-blur-lg border border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-primary" />
            Spending by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPieChart>
              <Pie data={categoryBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="hsl(var(--primary))" label>
                {categoryBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {categoryBreakdown.slice(0, 3).map((item, index) => (
              <div key={item.name} className="flex items-center text-sm">
                <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="flex-1 text-muted-foreground">{item.name}</span>
                <span className="font-medium">${item.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-lg border border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent" />
            Monthly Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsBarChart data={spendingByMonth}>
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Bar dataKey="total" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button className="flex-1 bg-card/80 backdrop-blur-lg border border-border/50 hover:scale-105 transition-all duration-200">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
        <Button variant="outline" className="flex-1 bg-card/80 backdrop-blur-lg border-border/50 hover:scale-105 transition-all duration-200">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
} 
