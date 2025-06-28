"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Receipt, ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import { useData } from "@/contexts/data-context";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart, Cell, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

function OverviewSkeleton() {
    return (
        <div className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card><CardHeader><Skeleton className="h-5 w-3/4" /></CardHeader><CardContent><Skeleton className="h-8 w-1/2" /><Skeleton className="h-4 w-1/3 mt-2" /></CardContent></Card>
                <Card><CardHeader><Skeleton className="h-5 w-3/4" /></CardHeader><CardContent><Skeleton className="h-8 w-1/2" /><Skeleton className="h-4 w-1/3 mt-2" /></CardContent></Card>
                <Card><CardHeader><Skeleton className="h-5 w-3/4" /></CardHeader><CardContent><Skeleton className="h-8 w-1/2" /><Skeleton className="h-4 w-1/3 mt-2" /></CardContent></Card>
                <Card><CardHeader><Skeleton className="h-5 w-3/4" /></CardHeader><CardContent><Skeleton className="h-8 w-1/2" /><Skeleton className="h-4 w-1/3 mt-2" /></CardContent></Card>
            </div>
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                <Card className="lg:col-span-2"><CardHeader><CardTitle>Expenses by Category</CardTitle></CardHeader><CardContent><Skeleton className="h-[250px] w-full rounded-full" /></CardContent></Card>
                <Card className="lg:col-span-3"><CardHeader><CardTitle>Daily Spend</CardTitle></CardHeader><CardContent><Skeleton className="h-[250px] w-full" /></CardContent></Card>
            </div>
            <Card>
                <CardHeader><CardTitle>Recent Expenses</CardTitle></CardHeader>
                <CardContent><Skeleton className="h-40 w-full" /></CardContent>
            </Card>
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
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent (This Month)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Left</CardTitle>
            <ArrowDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalBudget - totalSpent).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">out of ${totalBudget.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses Logged</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{expenses.length}</div>
            <p className="text-xs text-muted-foreground">+5 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Category</CardTitle>
            <ArrowUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topCategory}</div>
            <p className="text-xs text-muted-foreground">This month's biggest spend</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Expenses by Category</CardTitle>
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
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Daily Spend</CardTitle>
                 <CardDescription>Your spending activity over the last days.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={{}} className="h-[250px] w-full">
                    <LineChart data={lineChartData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis tickFormatter={(value) => `$${value}`} tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                        <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={2} dot={{r: 4, fill: 'hsl(var(--primary))'}} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
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
              {expenses.slice(0, 5).map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.vendor}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{expense.category?.name || 'N/A'}</Badge>
                  </TableCell>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  <TableCell>{expense.source}</TableCell>
                  <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
