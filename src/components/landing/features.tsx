import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanLine, Bot, PieChart } from "lucide-react";

const features = [
  {
    icon: <ScanLine className="w-8 h-8 text-primary" />,
    title: "Scan Receipts Instantly",
    description: "Snap a photo of any receipt, and our AI will instantly extract all the important details. No more manual data entry."
  },
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: "Auto-Categorization",
    description: "Fluxpense intelligently categorizes your expenses, so you always know where your money is going without lifting a finger."
  },
  {
    icon: <PieChart className="w-8 h-8 text-primary" />,
    title: "AI-Powered Insights",
    description: "Get smart insights and reports on your spending habits. Identify trends, find savings, and take control of your finances."
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-muted/30 dark:bg-card">
      <div className="container max-w-screen-xl">
        <div className="text-center mb-12 animate-in fade-in-0 slide-in-from-bottom-8 duration-500">
          <h2 className="text-3xl md:text-4xl font-bold">Why You'll Love Fluxpense</h2>
          <p className="text-lg text-muted-foreground mt-2">Everything you need for smart expense management.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-in fade-in-0 slide-in-from-bottom-8 duration-500" style={{animationDelay: `${index * 150}ms`}}>
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
