import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Expense Tracking | Fluxpense',
  description: 'Effortlessly track and manage your expenses with Fluxpense\'s intuitive expense tracking features.',
};

export default function ExpenseTrackingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 pt-32 pb-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-headline">
              Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Expense Tracking</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Effortlessly track every penny with our intuitive expense tracking system. Get real-time insights into your spending habits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link href="/auth" className="gap-2">
                  Get Started Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800/40 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
            <div className="relative max-w-5xl mx-auto">
              <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-1 shadow-2xl">
                <Image
                  src="/1.jpg"
                  alt="Expense Tracking Dashboard"
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
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Better Money Management</h2>
            <p className="text-muted-foreground">Take control of your finances with our comprehensive expense tracking tools.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Real-time Tracking",
                description: "Monitor your expenses as they happen with automatic transaction syncing and categorization."
              },
              {
                icon: <ShieldCheck className="h-8 w-8" />,
                title: "Secure & Private",
                description: "Bank-level encryption ensures your financial data stays private and secure at all times."
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Lightning Fast",
                description: "Quickly add expenses on the go with our mobile-optimized interface and voice commands."
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
      <section id="how-it-works" className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Connect Your Accounts",
                  description: "Securely link your bank accounts, credit cards, and payment methods for automatic transaction imports.",
                  image: "/2.jpg"
                },
                {
                  step: "02",
                  title: "Categorize Transactions",
                  description: "Our AI automatically categorizes your expenses, or you can create custom categories that fit your lifestyle.",
                  image: "/3.jpg"
                },
                {
                  step: "03",
                  title: "Gain Insights",
                  description: "Get detailed reports and visualizations to understand your spending patterns and find ways to save.",
                  image: "/4.jpg"
                }
              ].map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 order-2 md:order-1">
                    <span className="inline-block text-sm font-medium text-primary mb-2">Step {item.step}</span>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="md:w-1/2 order-1 md:order-2">
                    <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={500}
                          height={300}
                          className="rounded-lg object-cover w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control of Your Expenses?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their money better with Fluxpense.
          </p>
          <Button asChild size="lg" className="group">
            <Link href="/auth" className="gap-2">
              Start Free Trial
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
