"use client";

import React, { useMemo, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Receipt, TrendingUp, Target, Zap, ArrowRight, PieChart, BarChart3, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";
import { staticExpenses, staticBudgets, demoUser } from "@/lib/mock-data";

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

function OverviewSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-6 w-6 rounded-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-8 w-1/2" />
                      <Skeleton className="h-4 w-1/3 mt-2" />
                    </CardContent>
                  </Card>
                ))}
            </div>
            <div className="grid gap-6 md:grid-cols-5">
              <Card className="md:col-span-3">
                <CardHeader>
                  <Skeleton className="h-6 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-[300px] w-full" />
                </CardContent>
              </Card>
              <Card className="md:col-span-2">
                <CardHeader>
                  <Skeleton className="h-6 w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
                  </div>
                </CardContent>
              </Card>
            </div>
        </div>
    )
}

const DesktopOverview = React.memo(function DesktopOverview() {
    const { totalSpent, totalBudget, topCategory, lineChartData } = useMemo(() => {
        const expenses = staticExpenses;
        const budgets = staticBudgets;
        const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
        const totalBudget = budgets.reduce((sum, cb) => sum + cb.amount, 0);

        const categorySpending = expenses.reduce((acc, expense) => {
            const categoryName = expense.category?.name || 'Uncategorized';
            acc[categoryName] = (acc[categoryName] || 0) + expense.amount;
            return acc;
        }, {} as Record<string, number>);

        const topCategory = Object.keys(categorySpending).reduce((a, b) => categorySpending[a] > categorySpending[b] ? a : b, 'None');

        const lineChartData = expenses.reduce((acc, expense) => {
            const date = format(new Date(expense.date), 'MMM dd');
            const existing = acc.find(item => item.date === date);
            if (existing) {
                existing.total += expense.amount;
            } else {
                acc.push({ date, total: expense.amount });
            }
            return acc;
        }, [] as {date: string; total: number}[]).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return { totalSpent, totalBudget, topCategory, lineChartData };
    }, []);

    return (
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight mb-1">Welcome back, {demoUser.name?.split(' ')[0]}!</h1>
              <p className="text-muted-foreground text-lg">Here's your financial snapshot for this month.</p>
            </div>
            <Button className="button-glow flex items-center gap-2 mt-2 md:mt-0">
              <ArrowRight className="w-4 h-4 animate-bounce-right" />
              Download Report
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Total Spent", value: `$${totalSpent.toFixed(2)}`, change: "+20.1% vs last month", Icon: DollarSign, color: "text-primary", bg: "bg-gradient-to-br from-primary/10 to-primary/5" },
              { title: "Budget Remaining", value: `$${(totalBudget - totalSpent).toFixed(2)}`, change: `of $${totalBudget.toFixed(2)}`, Icon: Target, color: "text-accent", bg: "bg-gradient-to-br from-accent/10 to-accent/5" },
              { title: "Expenses Logged", value: `+${staticExpenses.length}`, change: "+5 since last week", Icon: Receipt, color: "text-blue-500", bg: "bg-gradient-to-br from-blue-100/40 to-blue-50/40" },
              { title: "Top Category", value: topCategory, change: "Biggest spend area", Icon: Zap, color: "text-orange-500", bg: "bg-gradient-to-br from-orange-100/40 to-orange-50/40" },
            ].map((stat, index) => (
              <Card key={index} className={`shadow-xl glassmorphism border-0 hover:scale-[1.03] transition-transform duration-200 ${stat.bg} group animate-in fade-in-0 slide-in-from-bottom-4`} style={{animationDelay: `${index * 100}ms`}}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold group-hover:text-primary transition-colors duration-200">{stat.title}</CardTitle>
                  <span className="rounded-full p-2 bg-white/60 shadow group-hover:scale-110 transition-transform duration-200">
                    <stat.Icon className={`h-5 w-5 ${stat.color} group-hover:animate-wiggle`} />
                  </span>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-2 font-medium">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-5">
            <Card className="md:col-span-3 shadow-2xl glassmorphism border-0 animate-in fade-in-0 slide-in-from-bottom-4" style={{animationDelay: '400ms'}}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold">Daily Spend Trend</CardTitle>
                <Badge className="bg-primary/10 text-primary border-primary/20">Bar Chart</Badge>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={lineChartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis tickFormatter={(value) => `$${value}`} tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                    <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 shadow-2xl glassmorphism border-0 animate-in fade-in-0 slide-in-from-bottom-4" style={{animationDelay: '500ms'}}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold">Recent Expenses</CardTitle>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">Last 5</Badge>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    {staticExpenses.slice(0, 5).map((expense) => (
                      <TableRow key={expense.id} className="hover:bg-primary/10 transition-colors group">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-lg">
                              {expense.vendor[0]}
                            </span>
                            <div>
                              <div className="font-semibold group-hover:text-primary transition-colors">{expense.vendor}</div>
                              <div className="text-xs text-muted-foreground">{expense.category?.name || 'N/A'}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-primary">
                          ${expense.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      );
});

const MobileOverview = React.memo(function MobileOverview() {
    const { totalSpent, totalBudget, budgetPercentage, topCategory, categorySpending, recentExpenses } = useMemo(() => {
    const expenses = staticExpenses;
    const budgets = staticBudgets;
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalBudget = budgets.reduce((sum, cb) => sum + cb.amount, 0);
    const budgetPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
    
    const categorySpending = expenses.reduce((acc, expense) => {
        const categoryName = expense.category?.name || 'Uncategorized';
        acc[categoryName] = (acc[categoryName] || 0) + expense.amount;
        return acc;
    }, {} as Record<string, number>);

    const topCategory = Object.keys(categorySpending).reduce((a, b) => categorySpending[a] > categorySpending[b] ? a : b, 'None');
    
    const recentExpenses = [...staticExpenses].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return { totalSpent, totalBudget, budgetPercentage, topCategory, categorySpending: Object.entries(categorySpending).sort(([, a], [, b]) => b - a), recentExpenses };
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Welcome, {demoUser.name?.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here's a look at your finances.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Monthly Spending</CardTitle>
          <CardDescription>Summary for {format(new Date(), 'MMMM yyyy')}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">${totalSpent.toFixed(2)}</p>
          <div className="flex items-center text-sm text-green-500 mt-1">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12.5% from last month</span>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="spending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="spending">Spending</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="spending">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <PieChart className="w-5 h-5 text-primary" />
                Category Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categorySpending.slice(0, 4).map(([name, amount], i) => (
                <div key={name}>
                    <div className="flex justify-between items-center text-sm mb-1">
                        <span className="font-medium flex items-center"><span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: COLORS[i % COLORS.length]}}/>{name}</span>
                        <span className="font-semibold">${amount.toFixed(2)}</span>
                    </div>
                    <Progress value={(amount / totalSpent) * 100} className="h-2 [&>div]:bg-primary" style={{ "--primary-color": COLORS[i % COLORS.length] } as any} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="budget">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="w-5 h-5 text-accent" />
                Budget Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between font-semibold">
                  <span>Spent</span>
                  <span className={budgetPercentage > 100 ? 'text-destructive' : 'text-foreground'}>
                    ${totalSpent.toFixed(2)}
                  </span>
                </div>
                <Progress value={budgetPercentage} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>${(totalBudget - totalSpent).toFixed(2)} remaining</span>
                  <span>of ${totalBudget.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm p-3 bg-primary/10 rounded-lg">
                Your spending on <span className="font-semibold">{topCategory}</span> is higher than average this month.
              </div>
              <div className="text-sm p-3 bg-primary/10 rounded-lg">
                Opportunity: You could save ~$50 by reviewing subscriptions.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <Button variant="ghost" size="sm" asChild className="text-primary">
            <a href="/dashboard/expenses">
              View All <ArrowRight className="w-3 h-3 ml-1" />
            </a>
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentExpenses.slice(0, 4).map((expense) => (
            <Card key={expense.id}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{expense.vendor}</p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {expense.category?.name || 'N/A'}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${expense.amount.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(expense.date), "MMM d")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
});

export function Overview() {
  const isMobile = useIsMobile();
  const [clientReady, setClientReady] = useState(false);
  
  useEffect(() => {
    setClientReady(true);
  }, []);

  if (!clientReady) {
    return <OverviewSkeleton />;
  }
  
  return isMobile ? <MobileOverview /> : <DesktopOverview />;
}
