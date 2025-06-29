import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Plus, 
  Receipt, 
  DollarSign, 
  Calendar,
  ArrowUp,
  ArrowDown,
  MoreHorizontal
} from "lucide-react";
import { MobileLayout } from "@/components/mobile-layout";

export function MobileExpenses() {
  const expenses = [
    { 
      id: 1, 
      name: "Starbucks Coffee", 
      amount: 4.50, 
      category: "Food & Dining", 
      date: "2024-01-15",
      type: "expense",
      icon: "☕"
    },
    { 
      id: 2, 
      name: "Uber Ride", 
      amount: 12.30, 
      category: "Transportation", 
      date: "2024-01-15",
      type: "expense",
      icon: "🚗"
    },
    { 
      id: 3, 
      name: "Salary", 
      amount: 5000, 
      category: "Income", 
      date: "2024-01-14",
      type: "income",
      icon: "💰"
    },
    { 
      id: 4, 
      name: "Amazon Purchase", 
      amount: 89.99, 
      category: "Shopping", 
      date: "2024-01-13",
      type: "expense",
      icon: "📦"
    },
    { 
      id: 5, 
      name: "Netflix Subscription", 
      amount: 15.99, 
      category: "Entertainment", 
      date: "2024-01-12",
      type: "expense",
      icon: "📺"
    },
    { 
      id: 6, 
      name: "Grocery Shopping", 
      amount: 67.45, 
      category: "Food & Dining", 
      date: "2024-01-11",
      type: "expense",
      icon: "🛒"
    }
  ];

  const categories = [
    { name: "All", count: expenses.length, active: true },
    { name: "Food & Dining", count: 2, active: false },
    { name: "Transportation", count: 1, active: false },
    { name: "Shopping", count: 1, active: false },
    { name: "Entertainment", count: 1, active: false },
    { name: "Income", count: 1, active: false }
  ];

  const totalExpenses = expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const netAmount = totalIncome - totalExpenses;

  return (
    <MobileLayout title="Expenses" showBackButton>
      <div className="space-y-6">
        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search expenses..." 
              className="pl-10 bg-card/80 backdrop-blur-lg border-border/50"
            />
          </div>
          <Button variant="outline" size="icon" className="bg-card/80 backdrop-blur-lg border-border/50">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-card/80 backdrop-blur-lg border border-border/50 text-center">
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground">Spent</p>
              <p className="text-lg font-bold text-red-500">${totalExpenses.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-lg border border-border/50 text-center">
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground">Earned</p>
              <p className="text-lg font-bold text-green-500">${totalIncome.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-lg border border-border/50 text-center">
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground">Net</p>
              <p className={`text-lg font-bold ${netAmount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ${netAmount.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={category.active ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap bg-card/80 backdrop-blur-lg border-border/50"
              >
                {category.name}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Expenses List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {expenses.map((expense) => (
              <Card key={expense.id} className="bg-card/80 backdrop-blur-lg border border-border/50 hover:scale-105 transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-xl">
                        {expense.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{expense.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {expense.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{expense.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        {expense.type === 'income' ? (
                          <ArrowUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-red-500" />
                        )}
                        <p className={`font-bold text-lg ${expense.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                          ${expense.amount.toFixed(2)}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add Expense FAB */}
        <div className="fixed bottom-20 right-4 z-30">
          <Button
            size="lg"
            className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-accent hover:scale-110 transition-all duration-200"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
} 