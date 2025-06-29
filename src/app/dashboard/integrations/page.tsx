import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Link, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const integrations = [
  {
    name: "Gmail",
    description: "Automatically import receipts from your email",
    status: "connected",
    icon: "📧"
  },
  {
    name: "Slack",
    description: "Get expense notifications in your workspace",
    status: "available",
    icon: "💬"
  },
  {
    name: "Zapier",
    description: "Connect with 5000+ apps and automate workflows",
    status: "available",
    icon: "⚡"
  },
  {
    name: "QuickBooks",
    description: "Sync expenses with your accounting software",
    status: "coming-soon",
    icon: "📊"
  }
];

export default function IntegrationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground">Connect Fluxpense with your favorite tools</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glassmorphism border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">1</div>
            <p className="text-xs text-muted-foreground">Active integrations</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Zap className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">50+</div>
            <p className="text-xs text-muted-foreground">Ready to connect</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Synced</CardTitle>
            <Link className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">247</div>
            <p className="text-xs text-muted-foreground">Receipts imported</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-amber-500/20">
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

      <div className="grid gap-6 md:grid-cols-2">
        {integrations.map((integration) => (
          <Card key={integration.name} className="glassmorphism border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{integration.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <CardDescription>{integration.description}</CardDescription>
                  </div>
                </div>
                <Badge 
                  variant={integration.status === 'connected' ? 'default' : 'outline'}
                  className={
                    integration.status === 'connected' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                    integration.status === 'coming-soon' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                    'bg-primary/10 text-primary border-primary/20'
                  }
                >
                  {integration.status === 'connected' ? 'Connected' :
                   integration.status === 'coming-soon' ? 'Coming Soon' : 'Available'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                disabled={integration.status === 'coming-soon'}
                variant={integration.status === 'connected' ? 'outline' : 'default'}
              >
                {integration.status === 'connected' ? 'Manage' :
                 integration.status === 'coming-soon' ? 'Notify Me' : 'Connect'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}