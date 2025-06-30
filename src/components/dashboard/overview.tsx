
"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Receipt, TrendingUp, Target, Zap, ArrowUp } from "lucide-react";
import { useData } from "@/contexts/data-context";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart, Cell, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useAuth } from "@/contexts/auth-context";

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

function OverviewSkeleton() {
    return (
        <div className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="glassmorphism border-primary/20">
                    <CardHeader>
                      <Skeleton className="h-5 w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-8 w-1/2" />
                      <Skeleton className="h-4 w-1/3 mt-2" />
                    </CardContent>
                  </Card>
                ))}
            </div>
            <Card className="glassmorphism border-accent/20">
              <CardHeader>
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[250px] w-full" />
              </CardContent>
            </Card>
            <div className="grid gap-6 md:grid-cols-5">
              <Card className="md:col-span-2 glassmorphism border-primary/20">
                <CardHeader>
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="aspect-square h-[250px] w-full" />
                </CardContent>
              </Card>
              <Card className="md:col-span-3 glassmorphism border-primary/20">
                <CardHeader>
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
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

export function Overview() {
  const { user } = useAuth();
  const { expenses, budgets, loading } = useData();

  const { totalSpent, totalBudget, topCategory, pieChartData, lineChartData } = useMemo(() => {
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalBudget = budgets.reduce((sum, cb) => sum + cb.amount, 0);

    const categorySpending = expenses.reduce((acc, expense) => {
        const categoryName = expense.category?.name || 'Uncategorized';
        acc[categoryName] = (acc[categoryName] || 0) + expense.amount;
        return acc;
    }, {} as Record<string, number>);

    const topCategory = Object.keys(categorySpending).reduce((a, b) => categorySpending[a] > categorySpending[b] ? a : b, 'None');

    const pieChartData = Object.entries(categorySpending).map(([name, value]) => ({ name, value })).filter(d => d.value > 0);

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

    return { totalSpent, totalBudget, topCategory, pieChartData, lineChartData };
  }, [expenses, budgets]);

  if (loading) {
    return <OverviewSkeleton />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name?.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here's your financial snapshot for this month.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Spent", value: `$${totalSpent.toFixed(2)}`, change: "+20.1% vs last month", Icon: DollarSign, color: "primary" },
          { title: "Budget Remaining", value: `$${(totalBudget - totalSpent).toFixed(2)}`, change: `of $${totalBudget.toFixed(2)}`, Icon: Target, color: "accent" },
          { title: "Expenses Logged", value: `+${expenses.length}`, change: "+5 since last week", Icon: Receipt, color: "blue" },
          { title: "Top Category", value: topCategory, change: "Biggest spend area", Icon: Zap, color: "orange" },
        ].map((stat, index) => (
          <Card key={index} className="glassmorphism border-primary/20 hover:border-primary/40 transition-all duration-300 group animate-in fade-in-0 slide-in-from-bottom-4" style={{animationDelay: `${index * 100}ms`}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 bg-${stat.color}-500/10 rounded-full group-hover:bg-${stat.color}-500/20 transition-colors`}>
                <stat.Icon className={`h-4 w-4 text-${stat.color}-500`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold text-${stat.color}-500`}>{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Chart Section */}
      <Card className="glassmorphism border-accent/20 animate-in fade-in-0 slide-in-from-bottom-4" style={{animationDelay: `400ms`}}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Daily Spend Trend
          </CardTitle>
          <CardDescription>Your spending activity over the last days.</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(value) => `$${value}`} tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={3} dot={{r: 6, fill: 'hsl(var(--primary))'}} />
              </LineChart>
            </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Secondary Info Section */}
      <div className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-2 glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4" style={{animationDelay: `500ms`}}>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>How your spending is distributed.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="md:col-span-3 glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4" style={{animationDelay: `600ms`}}>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>Your last 5 transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.slice(0, 5).map((expense) => (
                  <TableRow key={expense.id} className="hover:bg-primary/5 transition-colors">
                    <TableCell className="font-medium">{expense.vendor}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-primary/20">
                        {expense.category?.name || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(new Date(expense.date), 'MMM dd, yyyy')}</TableCell>
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
}
