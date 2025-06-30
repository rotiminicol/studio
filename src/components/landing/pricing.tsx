import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals getting started with smart expense tracking.",
    features: [
      "Up to 20 receipt scans/month",
      "Basic reporting",
      "Budgeting for 3 categories",
      "Email support"
    ],
    cta: "Get Started"
  },
  {
    name: "Pro",
    price: "$9.99",
    description: "For professionals and freelancers who need more power.",
    features: [
      "Unlimited receipt scans",
      "Advanced AI-powered reports",
      "Unlimited category budgeting",
      "Email import automation",
      "Priority support"
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Team",
    price: "$25",
    description: "For businesses that need to manage team expenses.",
    features: [
      "All Pro features",
      "Up to 5 team members",
      "Team expense policies",
      "Centralized billing",
      "Dedicated account manager"
    ],
    cta: "Contact Sales"
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-muted/30 dark:bg-card">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">Find the Perfect Plan</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">Start for free, upgrade as you grow.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg button-glow' : ''}`}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/ month</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'} asChild>
                  <Link href="/auth">{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
