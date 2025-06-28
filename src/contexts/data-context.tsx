"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from './auth-context';
import { xanoApi } from '@/lib/xano';
import type { Expense, Category, Budget, NewExpense } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface DataContextType {
  expenses: Expense[];
  categories: Category[];
  budgets: Budget[];
  loading: boolean;
  refetchData: () => void;
  addExpense: (expense: NewExpense) => Promise<void>;
  updateBudget: (id: number, budget: Partial<Budget>) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const { token, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const api = xanoApi(token);
      const [expensesData, categoriesData, budgetsData] = await Promise.all([
        api.getExpenses(),
        api.getCategories(),
        api.getBudgets(),
      ]);

      const categoryMap = new Map(categoriesData.map((cat: Category) => [cat.id, cat]));

      const processedExpenses = expensesData.map((exp: Expense) => ({
        ...exp,
        category: categoryMap.get(exp.category_id),
      }));

      const processedBudgets = budgetsData.map((bud: Budget) => ({
        ...bud,
        category: categoryMap.get(bud.category_id),
      }));

      setExpenses(processedExpenses);
      setCategories(categoriesData);
      setBudgets(processedBudgets);

    } catch (error) {
      console.error("Failed to fetch data", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not load your data.' });
    } finally {
      setLoading(false);
    }
  }, [token, toast]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, fetchData]);

  const addExpense = async (expense: NewExpense) => {
    if (!token) return;
    const api = xanoApi(token);
    try {
      await api.addExpense(expense);
      toast({ title: 'Expense Added!', description: 'Your expense has been saved successfully.' });
      await fetchData(); // Refetch all data to stay in sync
    } catch (error) {
      console.error("Failed to add expense", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save your expense.' });
    }
  };

  const updateBudget = async (id: number, budgetUpdate: Partial<Budget>) => {
    if (!token) return;
    const api = xanoApi(token);
    try {
      await api.updateBudget(id, budgetUpdate);
      toast({ title: 'Budget Updated!', description: 'Your budget has been saved.' });
      await fetchData(); // Refetch
    } catch (error) {
      console.error("Failed to update budget", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not update your budget.' });
    }
  }

  const value = {
    expenses,
    categories,
    budgets,
    loading,
    refetchData: fetchData,
    addExpense,
    updateBudget
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
