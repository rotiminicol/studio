
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mainApi } from '@/lib/xano';
import { useAuth } from './auth-context';
import type { Expense, Category, Budget, NewExpense } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface DataContextType {
  expenses: Expense[];
  categories: Category[];
  budgets: Budget[];
  loading: boolean;
  fetchData: () => Promise<void>;
  addExpense: (expense: NewExpense) => Promise<void>;
  updateExpense: (id: number, expense: Partial<NewExpense>) => Promise<void>;
  deleteExpense: (id: number) => Promise<void>;
  updateBudgets: (budgets: Pick<Budget, 'category_id' | 'amount'>[]) => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const [expensesRes, categoriesRes, budgetsRes] = await Promise.all([
        mainApi.get('/expense'),
        mainApi.get('/category'),
        mainApi.get('/budget')
      ]);

      const fetchedCategories = categoriesRes.data || [];
      const categoryMap = new Map(fetchedCategories.map((c: Category) => [c.id, c]));
      
      setExpenses((expensesRes.data || []).map((e: Expense) => ({...e, category: categoryMap.get(e.category_id)})));
      setCategories(fetchedCategories);
      setBudgets((budgetsRes.data || []).map((b: Budget) => ({...b, category: categoryMap.get(b.category_id)})));

    } catch (error) {
      console.error("Failed to fetch data", error);
      toast({ variant: "destructive", title: "Error", description: "Could not load your dashboard data." });
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addExpense = async (expense: NewExpense) => {
    try {
      await mainApi.post('/expense', expense);
      toast({ title: "Success", description: "Expense added." });
      await fetchData();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not add expense." });
    }
  };
  
  const updateExpense = async (id: number, expense: Partial<NewExpense>) => {
     try {
      await mainApi.patch(`/expense/${id}`, expense);
      toast({ title: "Success", description: "Expense updated." });
      await fetchData();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not update expense." });
    }
  };
  
  const deleteExpense = async (id: number) => {
     try {
      await mainApi.delete(`/expense/${id}`);
      toast({ title: "Success", description: "Expense deleted." });
      await fetchData();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not delete expense." });
    }
  };
  
  const updateBudgets = async (budgetsToUpdate: Pick<Budget, 'category_id' | 'amount'>[]) => {
    try {
      await mainApi.post('/budget/bulk_update', { budgets: budgetsToUpdate });
      toast({ title: "Success", description: "Budgets updated." });
      await fetchData();
    } catch(error) {
      toast({ variant: "destructive", title: "Error", description: "Could not update budgets." });
    }
  };

  const value = {
    expenses,
    categories,
    budgets,
    loading,
    fetchData,
    addExpense,
    updateExpense,
    deleteExpense,
    updateBudgets
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
