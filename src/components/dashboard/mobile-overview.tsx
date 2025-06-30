
import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  Receipt, 
  Target, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  PieChart,
} from "lucide-react";
import { useAuth } from '@/contexts/auth-context';
import { useData } from '@/contexts/data-context';
import { format } from "date-fns";

export function MobileOverview() {
  const { user } = useAuth();
  const { expenses, budgets } = useData();

  const { totalSpent, totalBudget, budgetPercentage, topCategory, categorySpending } = useMemo(() => {
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalBudget = budgets.reduce((sum, cb) => sum + cb.amount, 0);
    const budgetPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
    
    const categorySpending = expenses.reduce((acc, expense) => {
        const categoryName = expense.category?.name || 'Uncategorized';
        acc[categoryName] = (acc[categoryName] || 0) + expense.amount;
        return acc;
    }, {} as Record<string, number>);

    const topCategory = Object.keys(categorySpending).reduce((a, b) => categorySpending[a] > categorySpending[b] ? a : b, 'None');

    return { totalSpent, totalBudget, budgetPercentage, topCategory, categorySpending: Object.entries(categorySpending).sort(([, a], [, b]) => b - a) };
  }, [expenses, budgets]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Welcome, {user?.name?.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here's a look at your finances.</p>
      </div>

      <Card className="bg-card/80 backdrop-blur-lg border border-primary/20">
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
          <Card className="bg-card/80 backdrop-blur-lg border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-primary" />
                Category Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categorySpending.slice(0, 4).map(([name, amount]) => (
                <div key={name} className="flex justify-between items-center text-sm">
                  <span className="font-medium">{name}</span>
                  <span className="font-semibold">${amount.toFixed(2)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="budget">
          <Card className="bg-card/80 backdrop-blur-lg border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
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
          <Card className="bg-card/80 backdrop-blur-lg border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <Button variant="ghost" size="sm" asChild className="text-primary">
            <a href="/dashboard/expenses">
              View All <ArrowRight className="w-3 h-3 ml-1" />
            </a>
          </Button>
        </div>
        
        <div className="space-y-3">
          {expenses.slice(0, 4).map((expense) => (
            <Card key={expense.id} className="bg-card/80 backdrop-blur-lg border border-border/50">
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
} 
