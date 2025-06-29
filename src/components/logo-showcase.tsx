import { Logo } from "@/components/logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LogoShowcase() {
  const logoVariants = [
    { variant: "default", name: "Main Fluxpense Logo", description: "Primary logo with blue and green arrow icon" },
    { variant: "aiiit", name: "AIIIT Logo", description: "AIIIT variant for specialized sections" },
    { variant: "big-bird", name: "Big Bird Logo", description: "Large bird logo for hero sections" },
    { variant: "bird", name: "Bird Logo", description: "Standard bird logo for general use" },
    { variant: "arrow", name: "Arrow Logo", description: "Arrow design for navigation elements" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {logoVariants.map((logo) => (
        <Card key={logo.variant} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">{logo.name}</CardTitle>
            <CardDescription>{logo.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Logo 
              variant={logo.variant as any} 
              size="lg" 
              className="justify-center"
            />
            <div className="flex gap-2">
              <Logo 
                variant={logo.variant as any} 
                size="sm" 
                showText={false}
              />
              <Logo 
                variant={logo.variant as any} 
                size="md" 
                showText={false}
              />
              <Logo 
                variant={logo.variant as any} 
                size="lg" 
                showText={false}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 