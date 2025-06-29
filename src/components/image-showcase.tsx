import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ImageShowcase() {
  const imageUsage = [
    { 
      image: "/1.jpg", 
      name: "Onboarding Step 1", 
      description: "Welcome step background",
      usage: "Onboarding Form - Step 1"
    },
    { 
      image: "/2.jpg", 
      name: "Onboarding Step 2", 
      description: "Account type selection background",
      usage: "Onboarding Form - Step 2"
    },
    { 
      image: "/3.jpg", 
      name: "Onboarding Step 3", 
      description: "Email connection background",
      usage: "Onboarding Form - Step 3"
    },
    { 
      image: "/4.jpg", 
      name: "Onboarding Step 4", 
      description: "Budget goals background",
      usage: "Onboarding Form - Step 4"
    },
    { 
      image: "/5.jpg", 
      name: "Onboarding Step 5", 
      description: "Team invitation background",
      usage: "Onboarding Form - Step 5"
    },
    { 
      image: "/6.jpg", 
      name: "Hero Background", 
      description: "Main landing page hero section",
      usage: "Hero Section Background"
    },
    { 
      image: "/7.jpg", 
      name: "Login Background", 
      description: "Authentication page login view",
      usage: "Auth Page - Login"
    },
    { 
      image: "/8.jpg", 
      name: "Signup Background", 
      description: "Authentication page signup view",
      usage: "Auth Page - Signup"
    },
    { 
      image: "/9.jpg", 
      name: "Sarah L. Avatar", 
      description: "Freelance Designer testimonial",
      usage: "Testimonials - Sarah L."
    },
    { 
      image: "/10.jpg", 
      name: "Mike R. Avatar", 
      description: "Startup Founder testimonial",
      usage: "Testimonials - Mike R."
    },
    { 
      image: "/11.jpg", 
      name: "Jessica P. Avatar", 
      description: "Sales Manager testimonial",
      usage: "Testimonials - Jessica P."
    },
    { 
      image: "/12.jpg", 
      name: "Features Background", 
      description: "Used in features section as background elements",
      usage: "Features Section - Background Images"
    },
    { 
      image: "/13.jpg", 
      name: "Features Background", 
      description: "Used in features section as background elements",
      usage: "Features Section - Background Images"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {imageUsage.map((item, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg">{item.name}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative h-48 w-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-sm font-medium text-primary">{item.usage}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 