"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from './auth-context';
import { xanoApi } from '@/lib/xano';
import type { Expense, Category, Budget, NewExpense, Notification } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface DataContextType {
  expenses: Expense[];
  categories: Category[];
  budgets: Budget[];
  notifications: Notification[];
  unreadNotificationCount: number;
  loading: boolean;
  refetchData: () => void;
  addExpense: (expense: NewExpense) => Promise<void>;
  updateBudget: (id: number, budget: Partial<Budget>) => Promise<void>;
  markNotificationRead: (id: number) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const { token, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const fetchData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const api = xanoApi(token);
      const [expensesData, categoriesData, budgetsData, notificationsData] = await Promise.all([
        api.getExpenses().catch(() => []),
        api.getCategories().catch(() => []),
        api.getBudgets().catch(() => []),
        api.getNotifications().catch(() => []),
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
      
      const sortedNotifications = notificationsData.sort((a: Notification, b: Notification) => b.created_at - a.created_at);

      setExpenses(processedExpenses);
      setCategories(categoriesData);
      setBudgets(processedBudgets);
      setNotifications(sortedNotifications);
      setUnreadNotificationCount(sortedNotifications.filter((n: Notification) => !n.is_read).length);

    } catch (error) {
      console.error("Failed to fetch data", error);
      // Don't show error toast on initial load failure - user might not have data yet
      if (expenses.length > 0 || categories.length > 0) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not load your data.' });
      }
    } finally {
      setLoading(false);
    }
  }, [token, toast, expenses.length, categories.length]);

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
  };

  const markNotificationRead = async (id: number) => {
    if (!token) return;
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    setUnreadNotificationCount(prev => Math.max(0, prev - 1));
    const api = xanoApi(token);
    try {
        await api.markNotificationRead(id);
    } catch (error) {
        console.error("Failed to mark notification as read", error);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not update notification status.' });
        fetchData(); // Re-sync with backend on failure
    }
  };

  const markAllNotificationsRead = async () => {
    if (!token) return;
    setNotifications(prev => prev.map(n => ({...n, is_read: true})));
    setUnreadNotificationCount(0);
    const api = xanoApi(token);
    try {
        await api.markAllNotificationsRead();
        await fetchData(); // We should refetch to be sure
    } catch (error) {
        console.error("Failed to mark all notifications as read", error);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not update notifications.' });
        fetchData(); // Re-sync
    }
  };

  const value = {
    expenses,
    categories,
    budgets,
    notifications,
    unreadNotificationCount,
    loading,
    refetchData: fetchData,
    addExpense,
    updateBudget,
    markNotificationRead,
    markAllNotificationsRead,
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