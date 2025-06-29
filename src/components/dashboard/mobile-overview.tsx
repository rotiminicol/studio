import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Receipt, 
  Target, 
  Sparkles,
  Plus,
  ArrowRight,
  Calendar,
  PieChart,
  BarChart3
} from "lucide-react";
import { MobileLayout } from "@/components/mobile-layout";

export function MobileOverview() {
  const stats = [
    {
      title: "Total Spent",
      value: "$2,450",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Budget Used",
      value: "78%",
      change: "-5%",
      trend: "down",
      icon: Target,
      color: "text-blue-500"
    },
    {
      title: "Receipts",
      value: "24",
      change: "+8",
      trend: "up",
      icon: Receipt,
      color: "text-purple-500"
    }
  ];

  const recentExpenses = [
    { id: 1, name: "Starbucks", amount: "$4.50", category: "Food", time: "2h ago" },
    { id: 2, name: "Uber", amount: "$12.30", category: "Transport", time: "4h ago" },
    { id: 3, name: "Amazon", amount: "$89.99", category: "Shopping", time: "1d ago" },
    { id: 4, name: "Netflix", amount: "$15.99", category: "Entertainment", time: "2d ago" }
  ];

  const quickActions = [
    { title: "Add Expense", icon: Plus, color: "bg-primary", href: "/dashboard/expenses" },
    { title: "View Reports", icon: PieChart, color: "bg-accent", href: "/dashboard/reports" },
    { title: "Set Budget", icon: Target, color: "bg-green-500", href: "/dashboard/budgets" },
    { title: "AI Insights", icon: Sparkles, color: "bg-purple-500", href: "/dashboard/reports" }
  ];

  return (
    <MobileLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome back!
          </h2>
          <p className="text-muted-foreground">Here's your financial overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-lg border border-border/50 hover:scale-105 transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur-lg border border-border/50 hover:scale-105 transition-all duration-200 cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium">{action.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Expenses */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Expenses</h3>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentExpenses.map((expense) => (
              <Card key={expense.id} className="bg-card/80 backdrop-blur-lg border border-border/50 hover:scale-105 transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Receipt className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{expense.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {expense.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{expense.time}</span>
                        </div>
                      </div>
                    </div>
                    <p className="font-bold text-lg">{expense.amount}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Monthly Overview */}
        <Card className="bg-card/80 backdrop-blur-lg border border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              This Month
            </CardTitle>
            <CardDescription>Your spending overview for the current month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Spent</span>
                <span className="font-bold">$2,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Budget Remaining</span>
                <span className="font-bold text-green-500">$550</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$0</span>
                <span>$3,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
} 