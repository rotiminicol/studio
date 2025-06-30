"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, LifeBuoy, ArrowLeft } from "lucide-react";
import Link from 'next/link';

export default function HelpSupportPage() {
  return (
    <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
            <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
            <p className="text-muted-foreground">We're here to help you with any questions.</p>
            </div>
            <Link href="/dashboard/overview">
            <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Overview
            </Button>
            </Link>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <Card className="glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Mail className="w-8 h-8 text-primary" />
                        <div>
                            <CardTitle>Email Us</CardTitle>
                            <CardDescription>support@fluxpense.com</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="glassmorphism border-accent/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '100ms'}}>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Phone className="w-8 h-8 text-accent" />
                            <div>
                            <CardTitle>Call Us</CardTitle>
                            <CardDescription>+1 (555) 123-4567</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
                <Card className="glassmorphism border-blue-500/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '200ms'}}>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <LifeBuoy className="w-8 h-8 text-blue-500" />
                            <div>
                            <CardTitle>FAQ</CardTitle>
                            <CardDescription>Visit our help center</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card className="glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '300ms'}}>
                    <CardHeader>
                        <CardTitle>Send us a message</CardTitle>
                        <CardDescription>Our team will get back to you within 24 hours.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Your Name" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="you@example.com" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" placeholder="How can we help?" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Describe your issue or question..." rows={5} />
                            </div>
                            <Button type="submit" className="w-full button-glow">Send Message</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
