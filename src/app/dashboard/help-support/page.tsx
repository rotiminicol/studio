"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const bgImage = "/12.jpg";

export default function HelpSupportPage() {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: `url(${bgImage})`, opacity: 0.18 }}
      />
      <div className="relative z-10">
        <div className="max-w-2xl mx-auto w-full p-4 sm:p-6 md:p-8">
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4">
              <CardTitle>Help & Support</CardTitle>
              <CardDescription>
                Need assistance? Reach out to us using the form below or email <a href="mailto:support@example.com" className="underline text-primary">support@example.com</a>.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Your Name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@email.com" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="How can we help you?" rows={5} className="mt-1" />
                </div>
                <Button className="w-full mt-2" type="button" disabled>
                  Send Message (Demo Only)
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 