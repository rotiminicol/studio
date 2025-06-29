import { LogoShowcase } from "@/components/logo-showcase";
import { ImageShowcase } from "@/components/image-showcase";
import { Logo3DShowcase } from "@/components/3d-logo-showcase";
import { Logo } from "@/components/logo";

export default function LogoDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="container mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Fluxpense Assets Showcase</h1>
          <p className="text-muted-foreground text-lg">
            All logos and images integrated throughout the project
          </p>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Current Logo Usage Throughout the App</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-3">Header</h3>
              <Logo variant="default" size="md" />
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-3">Dashboard</h3>
              <Logo variant="aiiit" size="md" />
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-3">Hero Section</h3>
              <Logo variant="big-bird" size="lg" />
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold mb-3">Footer</h3>
              <Logo variant="bird" size="md" />
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Enhanced 3D Logo Effects</h2>
          <Logo3DShowcase />
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">All Logo Variants</h2>
          <LogoShowcase />
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">All Images Used Throughout the Project</h2>
          <ImageShowcase />
        </div>
      </div>
    </div>
  );
} 