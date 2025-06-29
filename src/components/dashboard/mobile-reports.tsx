import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  PieChart, 
  BarChart3, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Target,
  Sparkles,
  ArrowRight,
  Download,
  Share2
} from "lucide-react";
import { MobileLayout } from "@/components/mobile-layout";

export function MobileReports() {
  const spendingByCategory = [
    { category: "Food & Dining", amount: 450, percentage: 35, color: "bg-blue-500" },
    { category: "Transportation", amount: 320, percentage: 25, color: "bg-green-500" },
    { category: "Shopping", amount: 280, percentage: 22, color: "bg-purple-500" },
    { category: "Entertainment", amount: 180, percentage: 14, color: "bg-orange-500" },
    { category: "Other", amount: 70, percentage: 4, color: "bg-gray-500" }
  ];

  const monthlyTrends = [
    { month: "Jan", spent: 2100, budget: 3000 },
    { month: "Feb", spent: 1800, budget: 3000 },
    { month: "Mar", spent: 2400, budget: 3000 },
    { month: "Apr", spent: 1950, budget: 3000 },
    { month: "May", spent: 2200, budget: 3000 },
    { month: "Jun", spent: 2450, budget: 3000 }
  ];

  const insights = [
    {
      title: "Spending Alert",
      message: "You're 15% over your dining budget this month",
      type: "warning",
      icon: Target
    },
    {
      title: "Savings Opportunity",
      message: "You could save $120/month by reducing entertainment expenses",
      type: "info",
      icon: Sparkles
    },
    {
      title: "Positive Trend",
      message: "Your transportation costs decreased by 20% this month",
      type: "success",
      icon: TrendingUp
    }
  ];

  return (
    <MobileLayout title="Reports" showBackButton>
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-card/80 backdrop-blur-lg border border-border/50 text-center">
            <CardContent className="p-4">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-xs text-muted-foreground">Total Spent</p>
              <p className="text-xl font-bold">$2,450</p>
              <p className="text-xs text-green-500">+12% vs last month</p>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-lg border border-border/50 text-center">
            <CardContent className="p-4">
              <Target className="w-6 h-6 mx-auto mb-2 text-accent" />
              <p className="text-xs text-muted-foreground">Budget Used</p>
              <p className="text-xl font-bold">78%</p>
              <p className="text-xs text-blue-500">$550 remaining</p>
            </CardContent>
          </Card>
        </div>

        {/* Spending by Category */}
        <Card className="bg-card/80 backdrop-blur-lg border border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Spending by Category
            </CardTitle>
            <CardDescription>Breakdown of your expenses this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {spendingByCategory.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 ${item.color} rounded-full`}></div>
                    <span className="text-sm font-medium">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">${item.amount}</p>
                    <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card className="bg-card/80 backdrop-blur-lg border border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Monthly Trends
            </CardTitle>
            <CardDescription>6-month spending vs budget comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyTrends.map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium w-8">{month.month}</span>
                  <div className="flex-1 mx-3">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(month.spent / month.budget) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">${month.spent}</p>
                    <p className="text-xs text-muted-foreground">of ${month.budget}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Insights
            </h3>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur-lg border border-border/50 hover:scale-105 transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      insight.type === 'warning' ? 'bg-yellow-500/20' : 
                      insight.type === 'success' ? 'bg-green-500/20' : 'bg-blue-500/20'
                    }`}>
                      <insight.icon className={`w-5 h-5 ${
                        insight.type === 'warning' ? 'text-yellow-500' : 
                        insight.type === 'success' ? 'text-green-500' : 'text-blue-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{insight.title}</p>
                      <p className="text-sm text-muted-foreground">{insight.message}</p>
                    </div>
                    <Badge variant={
                      insight.type === 'warning' ? 'destructive' : 
                      insight.type === 'success' ? 'default' : 'secondary'
                    } className="text-xs">
                      {insight.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
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
    </MobileLayout>
  );
} 