"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Link as LinkIcon, CheckCircle, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const integrations = [
  {
    name: "Gmail",
    description: "Automatically import receipts from your email.",
    status: "connected",
    icon: "📧"
  },
  {
    name: "Slack",
    description: "Get expense notifications in your workspace.",
    status: "available",
    icon: "💬"
  },
  {
    name: "Zapier",
    description: "Connect with 5000+ apps and workflows.",
    status: "available",
    icon: "⚡"
  },
  {
    name: "QuickBooks",
    description: "Sync expenses with your accounting software.",
    status: "coming-soon",
    icon: "📊"
  }
];

const bgImage = "/11.jpg";

export default function IntegrationsPage() {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: `url(${bgImage})`, opacity: 0.18 }}
      />
      <div className="relative z-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
            <p className="text-muted-foreground">Connect Fluxpense with your favorite tools.</p>
          </div>
          <Link href="/dashboard/overview">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Overview
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="glassmorphism border-green-500/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:border-green-500/40 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connected</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">1</div>
              <p className="text-xs text-muted-foreground">Active integrations</p>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-accent/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:border-accent/40 transition-all" style={{animationDelay: '100ms'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <Zap className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">50+</div>
              <p className="text-xs text-muted-foreground">Ready to connect</p>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-blue-500/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:border-blue-500/40 transition-all" style={{animationDelay: '200ms'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Synced</CardTitle>
              <LinkIcon className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">247</div>
              <p className="text-xs text-muted-foreground">Receipts imported</p>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-amber-500/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:border-amber-500/40 transition-all" style={{animationDelay: '300ms'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Coming Soon</CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">5</div>
              <p className="text-xs text-muted-foreground">New integrations</p>
            </CardContent>
          </Card>
        </div>

        <Card className="glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '400ms'}}>
          <CardHeader>
            <CardTitle>Available Integrations</CardTitle>
            <CardDescription>Power up your workflow by connecting your favorite apps.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {integrations.map((integration, index) => (
                <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 hover:border-primary/30 transition-all animate-in fade-in-0" style={{animationDelay: `${500 + index * 100}ms`}}>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{integration.icon}</div>
                    <div>
                      <h3 className="font-semibold">{integration.name}</h3>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                  </div>
                  {integration.status === 'connected' ? (
                    <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10 hover:text-green-500">
                      <CheckCircle className="mr-2 h-4 w-4" /> Connected
                    </Button>
                  ) : integration.status === 'available' ? (
                    <Button variant="default" className="button-glow">
                      Connect
                    </Button>
                  ) : (
                    <Button variant="outline" disabled>
                      Coming Soon
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
