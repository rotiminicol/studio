import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Shield, Crown } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for individuals getting started with expense tracking",
    features: [
      "Up to 20 receipt scans/month",
      "Basic expense categorization",
      "Simple reporting",
      "Email support",
      "Mobile app access"
    ],
    cta: "Get Started",
    popular: false,
    icon: <Star className="w-6 h-6" />
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "per month",
    description: "For professionals and freelancers who need advanced features",
    features: [
      "Unlimited receipt scans",
      "AI-powered categorization",
      "Advanced reporting & analytics",
      "Email import automation",
      "Budget tracking & alerts",
      "Export to accounting software",
      "Priority support",
      "Team collaboration (up to 3 members)"
    ],
    cta: "Start Free Trial",
    popular: true,
    icon: <Zap className="w-6 h-6" />
  },
  {
    name: "Business",
    price: "$29.99",
    period: "per month",
    description: "For growing businesses and teams that need comprehensive expense management",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Advanced team permissions",
      "Custom approval workflows",
      "API access",
      "SSO integration",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced security features"
    ],
    cta: "Contact Sales",
    popular: false,
    icon: <Crown className="w-6 h-6" />
  }
];

const features = [
  {
    title: "AI-Powered Receipt Scanning",
    description: "Our advanced OCR technology extracts data from receipts with 99.9% accuracy",
    icon: <Zap className="w-8 h-8 text-primary" />
  },
  {
    title: "Smart Categorization",
    description: "Automatically categorize expenses using machine learning algorithms",
    icon: <Star className="w-8 h-8 text-accent" />
  },
  {
    title: "Enterprise Security",
    description: "Bank-level encryption and security to protect your financial data",
    icon: <Shield className="w-8 h-8 text-green-500" />
  }
];

export default function SubscriptionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-background via-primary/5 to-accent/10">
          <div className="container max-w-screen-xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Crown className="w-4 h-4" />
                Choose Your Plan
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Simple, Transparent
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Pricing
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Start for free and upgrade as you grow. No hidden fees, no surprises.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {plans.map((plan, index) => (
                <Card 
                  key={plan.name} 
                  className={`relative ${plan.popular ? 'border-primary shadow-2xl scale-105 button-glow' : 'border-border'} transition-all duration-300 hover:shadow-xl`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        plan.popular ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        {plan.icon}
                      </div>
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center gap-2 my-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className={`w-full ${plan.popular ? 'button-glow' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Features Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Fluxpense?</h2>
              <p className="text-muted-foreground text-lg">Powerful features that make expense management effortless</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center p-6 border-primary/20 hover:border-primary/40 transition-colors">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
                  <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                  <p className="text-muted-foreground">Yes, all paid plans come with a 14-day free trial. No credit card required.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                  <p className="text-muted-foreground">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                  <p className="text-muted-foreground">Yes, we offer a 30-day money-back guarantee for all paid plans.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
