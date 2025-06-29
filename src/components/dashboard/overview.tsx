"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Receipt, ArrowUp, ArrowDown, Loader2, TrendingUp, Target, Zap } from "lucide-react";
import { useData } from "@/contexts/data-context";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart, Cell, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

function FloatingCard({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div 
      className={`animate-float ${className}`} 
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function OverviewSkeleton() {
    return (
        <div className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <FloatingCard key={i} delay={i * 0.2}>
                    <Card className="glassmorphism border-primary/20">
                      <CardHeader>
                        <Skeleton className="h-5 w-3/4" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-4 w-1/3 mt-2" />
                      </CardContent>
                    </Card>
                  </FloatingCard>
                ))}
            </div>
        </div>
    )
}

export function Overview() {
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
        const date = new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
    <div className="grid gap-8">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <FloatingCard delay={0}>
          <Card className="glassmorphism border-primary/20 hover:border-primary/40 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${totalSpent.toFixed(2)}</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +20.1% from last month
              </div>
            </CardContent>
          </Card>
        </FloatingCard>

        <FloatingCard delay={0.2}>
          <Card className="glassmorphism border-accent/20 hover:border-accent/40 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Remaining</CardTitle>
              <div className="p-2 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors">
                <Target className="h-4 w-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">${(totalBudget - totalSpent).toFixed(2)}</div>
              <div className="text-xs text-muted-foreground mt-1">
                out of ${totalBudget.toFixed(2)} budgeted
              </div>
            </CardContent>
          </Card>
        </FloatingCard>

        <FloatingCard delay={0.4}>
          <Card className="glassmorphism border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expenses Logged</CardTitle>
              <div className="p-2 bg-blue-500/10 rounded-full group-hover:bg-blue-500/20 transition-colors">
                <Receipt className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">+{expenses.length}</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUp className="w-3 h-3 mr-1" />
                +5 since last week
              </div>
            </CardContent>
          </Card>
        </FloatingCard>

        <FloatingCard delay={0.6}>
          <Card className="glassmorphism border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Category</CardTitle>
              <div className="p-2 bg-orange-500/10 rounded-full group-hover:bg-orange-500/20 transition-colors">
                <Zap className="h-4 w-4 text-orange-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{topCategory}</div>
              <div className="text-xs text-muted-foreground mt-1">This month's biggest spend</div>
            </CardContent>
          </Card>
        </FloatingCard>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <FloatingCard delay={0.8} className="lg:col-span-2">
          <Card className="glassmorphism border-primary/20 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Expenses by Category
              </CardTitle>
              <CardDescription>A breakdown of your spending by category.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="mx-auto aspect-square h-[250px]">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                  <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </FloatingCard>

        <FloatingCard delay={1.0} className="lg:col-span-3">
          <Card className="glassmorphism border-accent/20 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                Daily Spend Trend
              </CardTitle>
              <CardDescription>Your spending activity over the last days.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[250px] w-full">
                <LineChart data={lineChartData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis tickFormatter={(value) => `$${value}`} tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                  <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={3} dot={{r: 6, fill: 'hsl(var(--primary))'}} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </FloatingCard>
      </div>

      {/* Recent Expenses */}
      <FloatingCard delay={1.2}>
        <Card className="glassmorphism border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              Recent Expenses
            </CardTitle>
            <CardDescription>Your 5 most recent transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.slice(0, 5).map((expense, index) => (
                  <TableRow key={expense.id} className="hover:bg-primary/5 transition-colors">
                    <TableCell className="font-medium">{expense.vendor}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-primary/20">
                        {expense.category?.name || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={expense.source === 'Receipt' ? 'default' : expense.source === 'Email' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {expense.source}
                      </Badge>
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
      </FloatingCard>
    </div>
  );
}