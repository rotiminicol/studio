"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Tag, Plus, Settings, Edit, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { staticCategories } from "@/lib/mock-data";
import Link from 'next/link';

export default function CategoriesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Organize your expenses with custom categories.</p>
        </div>
          <div className="flex gap-2">
            <Link href="/dashboard/overview">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Overview
            </Button>
          </Link>
          <Button className="button-glow">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:border-primary/40 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <Database className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-xs text-muted-foreground">Active categories</p>
          </CardContent>
        </Card>
        <Card className="glassmorphism border-accent/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:border-accent/40 transition-all" style={{animationDelay: '100ms'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Used</CardTitle>
            <Tag className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">Food</div>
            <p className="text-xs text-muted-foreground">45% of expenses</p>
          </CardContent>
        </Card>
        <Card className="glassmorphism border-green-500/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:border-green-500/40 transition-all" style={{animationDelay: '200ms'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto-Tagged</CardTitle>
            <Settings className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">89%</div>
            <p className="text-xs text-muted-foreground">AI accuracy</p>
          </CardContent>
        </Card>
        <Card className="glassmorphism border-blue-500/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:border-blue-500/40 transition-all" style={{animationDelay: '300ms'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Rules</CardTitle>
            <Tag className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">5</div>
            <p className="text-xs text-muted-foreground">Active rules</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '400ms'}}>
        <CardHeader>
          <CardTitle>Your Categories</CardTitle>
          <CardDescription>Edit, delete, or create new categories for your expenses.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {staticCategories.map((category, index) => (
              <div key={category.id} className="group flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 hover:border-primary/30 transition-all animate-in fade-in-0" style={{animationDelay: `${500 + index * 100}ms`}}>
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-primary" />
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="h-full min-h-[58px] border-dashed flex flex-col items-center justify-center gap-1 hover:border-primary hover:text-primary transition-all">
              <Plus className="w-5 h-5" />
              <span className="text-sm">New Category</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
