import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const openPositions = [
    {
        title: "Senior Frontend Engineer (React)",
        location: "Remote",
        department: "Engineering"
    },
    {
        title: "AI/ML Engineer",
        location: "Remote",
        department: "Engineering"
    },
    {
        title: "Product Designer",
        location: "Remote",
        department: "Design"
    },
    {
        title: "Content Marketing Manager",
        location: "Remote",
        department: "Marketing"
    }
]

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container max-w-screen-lg mx-auto py-12 px-4">
        <div className="text-center">
            <Briefcase className="mx-auto h-16 w-16 text-primary" />
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Join Our Team</h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground">
                We're looking for passionate people to join us on our mission. We value flat hierarchies, clear communication, and full ownership and responsibility.
            </p>
        </div>

        <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
            <div className="grid gap-6 md:grid-cols-2">
                {openPositions.map((position, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{position.title}</CardTitle>
                            <CardDescription>{position.department} &middot; {position.location}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button>Apply Now</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
             <p className="text-center mt-12 text-muted-foreground">
                Don't see a role that fits? <a href="mailto:careers@fluxpense.com" className="text-primary hover:underline">Send us your resume</a> anyway!
            </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
