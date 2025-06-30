"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function BudgetsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budget Management</h1>
          <p className="text-muted-foreground">Set and track your spending limits across categories</p>
        </div>
         <Link href="/dashboard/overview">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Overview
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$5,000</div>
            <p className="text-xs text-muted-foreground">Monthly allocation</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-green-500/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '100ms'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">$3,247</div>
            <p className="text-xs text-muted-foreground">65% of budget</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-amber-500/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '200ms'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">$1,753</div>
            <p className="text-xs text-muted-foreground">35% remaining</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-blue-500/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '300ms'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Track</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">6/8</div>
            <p className="text-xs text-muted-foreground">Categories on track</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '400ms'}}>
        <CardHeader>
          <CardTitle>Budget Categories</CardTitle>
          <CardDescription>Manage your spending limits by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Budget management features coming soon!</p>
            <p className="text-sm">Set spending limits and track your progress.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
