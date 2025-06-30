"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, Calendar, ArrowLeft } from "lucide-react";
import Link from 'next/link';
import { DashboardContainer } from "@/components/dashboard/dashboard-app";

const bgImage = "/11.jpg";

export default function BillingPage() {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: `url(${bgImage})`, opacity: 0.18 }}
      />
      <div className="relative z-10">
        <DashboardContainer>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
                <p className="text-muted-foreground">Manage your subscription and payment details.</p>
              </div>
              <Link href="/dashboard/overview">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Overview
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
               <Card className="glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:border-primary/40 transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
                  <CreditCard className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">Pro Plan</div>
                  <p className="text-xs text-muted-foreground">$9.99 / month</p>
                </CardContent>
              </Card>
              <Card className="glassmorphism border-green-500/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:border-green-500/40 transition-all" style={{animationDelay: '100ms'}}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Invoice</CardTitle>
                  <Calendar className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">Aug 1, 2024</div>
                  <p className="text-xs text-muted-foreground">for $9.99</p>
                </CardContent>
              </Card>
              <Card className="glassmorphism border-accent/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:border-accent/40 transition-all" style={{animationDelay: '200ms'}}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Payment Method</CardTitle>
                  <DollarSign className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">Visa **** 4242</div>
                  <p className="text-xs text-muted-foreground">Expires 12/2026</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '300ms'}}>
                <CardHeader>
                  <CardTitle>Update Payment Method</CardTitle>
                  <CardDescription>Your card will be charged for your next billing cycle.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="**** **** **** 4242" />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1 space-y-1">
                        <Label htmlFor="expiry">Expiry</Label>
                        <Input id="expiry" placeholder="MM / YY" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="***" />
                      </div>
                    </div>
                    <Button className="w-full button-glow" type="submit">Update Card</Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '400ms'}}>
                <CardHeader>
                  <CardTitle>Invoice History</CardTitle>
                  <CardDescription>Download your past invoices.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="space-y-3">
                    {["July 1, 2024", "June 1, 2024", "May 1, 2024"].map((date, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div>
                          <p className="font-medium">Invoice for {date}</p>
                          <p className="text-sm text-muted-foreground">Pro Plan - $9.99</p>
                        </div>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DashboardContainer>
      </div>
    </div>
  );
}