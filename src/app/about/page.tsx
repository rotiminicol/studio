import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container max-w-screen-lg mx-auto py-12 px-4">
        <div className="text-center">
            <Users className="mx-auto h-16 w-16 text-primary" />
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">About Fluxpense</h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground">
                We are on a mission to simplify expense management for everyone, from freelancers to large enterprises.
            </p>
        </div>

        <div className="mt-20 prose-sm sm:prose-base lg:prose-lg dark:prose-invert mx-auto">
            <h2>Our Story</h2>
            <p>
                Fluxpense was born from a simple idea: managing expenses shouldn't be a chore. As freelancers and small business owners ourselves, we were tired of wrestling with spreadsheets, losing receipts, and spending hours on end just to figure out where our money was going. We knew there had to be a better way.
            </p>
            <p>
                We envisioned a tool that was not only powerful but also intuitive and beautiful to use. A tool that could leverage the latest in AI technology to automate the tedious parts of expense tracking, giving you back your most valuable asset: your time.
            </p>

            <h2>Our Vision</h2>
            <p>
                Our vision is to create a world where financial clarity is accessible to everyone. We believe that by providing smart, automated tools, we can empower individuals and businesses to make better financial decisions, achieve their goals, and focus on what they do best.
            </p>

            <h2>Meet the Team</h2>
            <p>
                We are a passionate team of developers, designers, and financial experts dedicated to building the future of expense management. We're fully remote, globally distributed, and united by our commitment to our users.
            </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
