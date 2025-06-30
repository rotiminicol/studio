
"use client";

import { useMemo, useState } from 'react';
import { useData } from '@/contexts/data-context';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  ArrowDown,
  MoreHorizontal
} from "lucide-react";
import { format } from "date-fns";

export function MobileExpenses() {
  const { expenses, loading } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => 
      expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [expenses, searchTerm]);
  
  const totalSpent = useMemo(() => {
    return filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  }, [filteredExpenses]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Expenses</h1>
        <p className="text-muted-foreground">Search and manage your transactions</p>
      </div>

      <div className="flex gap-2 sticky top-[65px] z-10 bg-background/80 backdrop-blur-lg py-2 -mx-4 px-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search transactions..." 
            className="pl-10 bg-card/80 backdrop-blur-lg border-border/50 h-11"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="bg-card/80 backdrop-blur-lg border-border/50 h-11 w-11">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <Card className="bg-card/80 backdrop-blur-lg border border-border/50 text-center">
        <CardContent className="p-3">
          <p className="text-sm text-muted-foreground">Total Displayed</p>
          <p className="text-xl font-bold text-red-500">${totalSpent.toFixed(2)}</p>
        </CardContent>
      </Card>
      
      <div className="space-y-3">
        {loading ? (
          [...Array(5)].map((_, i) => (
            <Card key={i} className="bg-card/80 backdrop-blur-lg border border-border/50 animate-pulse">
              <CardContent className="p-4 h-20"></CardContent>
            </Card>
          ))
        ) : filteredExpenses.length > 0 ? (
          filteredExpenses.map((expense) => (
            <Card key={expense.id} className="bg-card/80 backdrop-blur-lg border border-border/50">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium truncate">{expense.vendor}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs whitespace-nowrap">
                          {expense.category?.name || 'N/A'}
                        </Badge>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {format(new Date(expense.date), 'MMM dd')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-1">
                    <div>
                      <p className="font-bold text-lg">${expense.amount.toFixed(2)}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No expenses found.</p>
          </div>
        )}
      </div>
    </div>
  );
} 
