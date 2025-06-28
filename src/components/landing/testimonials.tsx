import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah L.",
    role: "Freelance Designer",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "woman smiling professional",
    text: "Fluxpense has been a game-changer for my business. The receipt scanning is incredibly accurate and saves me hours every month. The UI is just beautiful!",
    rating: 5
  },
  {
    name: "Mike R.",
    role: "Startup Founder",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "man portrait professional",
    text: "As a startup, every penny counts. Fluxpense helps us track our burn rate in real-time with its amazing reports. The team onboarding was a breeze.",
    rating: 5
  },
  {
    name: "Jessica P.",
    role: "Sales Manager",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "woman corporate headshot",
    text: "I used to dread filing my travel expenses. With Fluxpense, I just forward my booking emails and it's all done automatically. Simply magical!",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="container max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Loved by Professionals Worldwide</h2>
          <p className="text-lg text-muted-foreground mt-2">Don't just take our word for it. Here's what our users are saying.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 glassmorphism">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {Array(testimonial.rating).fill(0).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
