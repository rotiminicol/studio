import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, PieChart, Bell, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Budgeting | Fluxpense',
  description: 'Create and manage budgets that work for your lifestyle with Fluxpense\'s intelligent budgeting tools.',
};

export default function BudgetingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 pt-32 pb-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="h-4 w-4" />
              Smart Budgeting
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-headline">
              Smarter <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Budgeting</span> Made Simple
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Take control of your finances with personalized budgets that adapt to your spending habits and financial goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link href="/auth" className="gap-2">
                  Start Budgeting Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800/40 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
            <div className="relative max-w-5xl mx-auto">
              <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-1 shadow-2xl">
                <Image
                  src="/5.jpg"
                  alt="Budgeting Dashboard"
                  width={1200}
                  height={800}
                  className="rounded-xl w-full h-auto border border-border/30 object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Budgeting That Works For You</h2>
            <p className="text-muted-foreground">Flexible budgeting tools that adapt to your unique financial situation.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Target className="h-8 w-8" />,
                title: "Goal-Oriented Budgets",
                description: "Set and track financial goals with personalized budget plans that help you stay on target."
              },
              {
                icon: <PieChart className="h-8 w-8" />,
                title: "Category Insights",
                description: "Visual breakdowns of your spending by category to help you identify saving opportunities."
              },
              {
                icon: <Bell className="h-8 w-8" />,
                title: "Smart Alerts",
                description: "Get notified when you're approaching budget limits or have unusual spending patterns."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-card p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">How Budgeting Works</h2>
                <p className="text-xl text-muted-foreground text-center mb-12">
                  Our approach to budgeting is simple, flexible, and effective.
                </p>
                
                <div className="space-y-8">
                  {[
                    {
                      number: "1",
                      title: "Set Your Budget",
                      description: "Create custom budget categories and set spending limits based on your income and goals."
                    },
                    {
                      number: "2",
                      title: "Track Your Spending",
                      description: "Automatically track expenses across all your accounts in real-time."
                    },
                    {
                      number: "3",
                      title: "Get Insights",
                      description: "Receive personalized recommendations to optimize your budget and save more."
                    },
                    {
                      number: "4",
                      title: "Adjust & Improve",
                      description: "Easily adjust your budgets as your financial situation changes."
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {item.number}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Finances?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have taken control of their money with Fluxpense's budgeting tools.
          </p>
          <Button asChild size="lg" className="group">
            <Link href="/auth" className="gap-2">
              Start Your Free Trial
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
