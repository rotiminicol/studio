import { Logo } from "@/components/logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Logo3DShowcase() {
  const logoVariants = [
    { 
      variant: "default", 
      name: "Main 3D Logo", 
      description: "Enhanced with 3D animations and glow effects",
      size: "xl" as const
    },
    { 
      variant: "aiiit", 
      name: "AIIIT 3D Logo", 
      description: "Specialized variant with floating animations",
      size: "lg" as const
    },
    { 
      variant: "big-bird", 
      name: "Big Bird 3D Logo", 
      description: "Hero section variant with enhanced effects",
      size: "xl" as const
    },
    { 
      variant: "bird", 
      name: "Bird 3D Logo", 
      description: "Standard variant with 3D text effects",
      size: "lg" as const
    },
    { 
      variant: "arrow", 
      name: "Arrow 3D Logo", 
      description: "Navigation variant with particle effects",
      size: "md" as const
    }
  ];

  return (
    <div className="space-y-12">
      {/* Main Showcase */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Enhanced 3D Logo Effects
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience the new Fluxpense logo with advanced 3D animations, glow effects, and interactive elements.
        </p>
      </div>

      {/* Interactive Demo */}
      <div className="flex justify-center mb-12">
        <div className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-primary/20">
          <Logo 
            variant="default" 
            size="xl" 
            animated={true}
            className="scale-150"
          />
        </div>
      </div>

      {/* All Variants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {logoVariants.map((logo) => (
          <Card key={logo.variant} className="hover:shadow-xl transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="text-lg">{logo.name}</CardTitle>
              <CardDescription>{logo.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="p-6 bg-gradient-to-br from-background to-muted/50 rounded-xl border border-border/50 group-hover:border-primary/30 transition-colors">
                <Logo 
                  variant={logo.variant as any} 
                  size={logo.size} 
                  animated={true}
                />
              </div>
              
              {/* Size Comparison */}
              <div className="flex gap-2">
                <Logo 
                  variant={logo.variant as any} 
                  size="sm" 
                  showText={false}
                  animated={true}
                />
                <Logo 
                  variant={logo.variant as any} 
                  size="md" 
                  showText={false}
                  animated={true}
                />
                <Logo 
                  variant={logo.variant as any} 
                  size="lg" 
                  showText={false}
                  animated={true}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features List */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-center mb-6">3D Animation Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-card rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">3D Transform Effects</h4>
            <p className="text-sm text-muted-foreground">Scale, rotate, and translate on hover with smooth transitions</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">Glow Animations</h4>
            <p className="text-sm text-muted-foreground">Dynamic glow effects that pulse and intensify on interaction</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">Floating Particles</h4>
            <p className="text-sm text-muted-foreground">Animated particles that appear around the logo on hover</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">3D Text Shadows</h4>
            <p className="text-sm text-muted-foreground">Layered text effects with depth and dimension</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">Animated Underlines</h4>
            <p className="text-sm text-muted-foreground">Gradient underlines that expand on hover</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h4 className="font-semibold text-primary mb-2">Responsive Sizing</h4>
            <p className="text-sm text-muted-foreground">Perfect scaling across all device sizes</p>
          </div>
        </div>
      </div>
    </div>
  );
} 