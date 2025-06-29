import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanLine, Bot, PieChart } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: <ScanLine className="w-8 h-8 text-primary" />,
    title: "Scan Receipts Instantly",
    description: "Snap a photo of any receipt, and our AI will instantly extract all the important details. No more manual data entry.",
    image: "/12.jpg"
  },
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: "Auto-Categorization",
    description: "Fluxpense intelligently categorizes your expenses, so you always know where your money is going without lifting a finger.",
    image: "/13.jpg"
  },
  {
    icon: <PieChart className="w-8 h-8 text-primary" />,
    title: "AI-Powered Insights",
    description: "Get smart insights and reports on your spending habits. Identify trends, find savings, and take control of your finances.",
    image: "/12.jpg"
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-muted/30 dark:bg-card relative overflow-hidden">
      {/* Background images */}
      <div className="absolute top-20 left-10 w-64 h-64 opacity-10">
        <Image src="/12.jpg" alt="" fill className="object-cover rounded-full" />
      </div>
      <div className="absolute bottom-20 right-10 w-64 h-64 opacity-10">
        <Image src="/13.jpg" alt="" fill className="object-cover rounded-full" />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-12 animate-in fade-in-0 slide-in-from-bottom-8 duration-500">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">Why You'll Love Fluxpense</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">Everything you need for smart expense management.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-in fade-in-0 slide-in-from-bottom-8 duration-500 relative overflow-hidden" style={{animationDelay: `${index * 150}ms`}}>
              {/* Feature background image */}
              <div className="absolute inset-0 opacity-5">
                <Image src={feature.image} alt="" fill className="object-cover" />
              </div>
              <CardHeader className="items-center relative z-10">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
