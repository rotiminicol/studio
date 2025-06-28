import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container max-w-screen-lg mx-auto py-12 px-4">
        <div className="text-center">
            <Mail className="mx-auto h-16 w-16 text-primary" />
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Get in Touch</h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground">
                We’d love to hear from you! Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
            </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Mail className="w-8 h-8 text-primary" />
                        <div>
                            <CardTitle>Email Us</CardTitle>
                            <CardDescription>For general inquiries and support.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <a href="mailto:support@fluxpense.com" className="text-lg font-medium hover:underline">support@fluxpense.com</a>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Phone className="w-8 h-8 text-primary" />
                         <div>
                            <CardTitle>Call Us</CardTitle>
                            <CardDescription>For sales and enterprise questions.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                         <a href="tel:+1-555-123-4567" className="text-lg font-medium hover:underline">+1 (555) 123-4567</a>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Send us a message</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" placeholder="John Doe" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="you@example.com" />
                            </div>
                             <div className="space-y-1">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Your message..." rows={5}/>
                            </div>
                            <Button type="submit" className="w-full">Send Message</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
