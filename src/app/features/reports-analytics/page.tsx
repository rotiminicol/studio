import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart2, PieChart, Download, Filter, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Reports & Analytics | Fluxpense',
  description: 'Gain powerful insights into your financial health with Fluxpense\'s advanced reporting and analytics tools.',
};

export default function ReportsAnalyticsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 pt-32 pb-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <BarChart2 className="h-4 w-4" />
              Data-Driven Insights
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-headline">
              Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Reports & Analytics</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Transform your financial data into actionable insights with beautiful, customizable reports and dashboards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link href="/auth" className="gap-2">
                  Explore Analytics
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
            <div className="relative max-w-6xl mx-auto">
              <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-1 shadow-2xl">
                <Image
                  src="/6.jpg"
                  alt="Analytics Dashboard"
                  width={1400}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Financial Analytics</h2>
            <p className="text-muted-foreground">Get the insights you need to make smarter financial decisions.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <BarChart2 className="h-8 w-8" />,
                title: "Interactive Charts",
                description: "Visualize your financial data with beautiful, interactive charts and graphs."
              },
              {
                icon: <PieChart className="h-8 w-8" />,
                title: "Spending Breakdowns",
                description: "See exactly where your money is going with detailed category breakdowns."
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Trend Analysis",
                description: "Track your financial progress over time with historical data and trend analysis."
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

      {/* Report Types Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Report Types</h2>
            <p className="text-muted-foreground">Generate detailed reports for every aspect of your financial life.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Expense Reports",
                description: "Track and categorize your spending with detailed expense reports.",
                features: ["Category breakdowns", "Time period comparisons", "Vendor analysis"],
                icon: <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              },
              {
                title: "Income Analysis",
                description: "Understand your income sources and patterns over time.",
                features: ["Source tracking", "Income vs expenses", "Tax preparation"],
                icon: <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              },
              {
                title: "Budget Reports",
                description: "Monitor your budget performance and make adjustments as needed.",
                features: ["Budget vs actuals", "Category spending limits", "Forecasting"],
                icon: <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
              },
              {
                title: "Net Worth",
                description: "Track your total assets, liabilities, and net worth over time.",
                features: ["Asset tracking", "Debt monitoring", "Net worth trends"],
                icon: <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              }
            ].map((report, index) => (
              <div key={index} className="bg-card p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      {report.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{report.title}</h3>
                    <p className="text-muted-foreground mb-3">{report.description}</p>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {report.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto bg-card rounded-2xl p-8 md:p-12 border border-border/50 shadow-lg">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Gain Financial Clarity?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start making data-driven financial decisions with Fluxpense's powerful reporting tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="group">
                  <Link href="/auth" className="gap-2">
                    Try It Free
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/features">View All Features</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
