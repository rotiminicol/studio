import type { User, Category, Budget, Expense, Notification } from './types';
import { subMonths, formatISO } from 'date-fns';

export const demoUser: Omit<User, 'id' | 'created_at'> = {
  name: "Demo User",
  email: "demo@fluxpense.com",
  full_name: "Demo User",
  account_type: "personal",
  onboarding_complete: true,
};

export const staticCategories: Category[] = [
  { id: 1, name: "Food", created_at: Date.now(), user_id: 1, icon: null, color: null },
  { id: 2, name: "Travel", created_at: Date.now(), user_id: 1, icon: null, color: null },
  { id: 3, name: "Supplies", created_at: Date.now(), user_id: 1, icon: null, color: null },
  { id: 4, name: "Utilities", created_at: Date.now(), user_id: 1, icon: null, color: null },
  { id: 5, name: "Entertainment", created_at: Date.now(), user_id: 1, icon: null, color: null },
];

export const staticBudgets: Budget[] = [
  { id: 1, category_id: 1, amount: 500, spent: 275.50, month: "2024-07", user_id: 1, created_at: Date.now(), category: staticCategories[0] },
  { id: 2, category_id: 2, amount: 300, spent: 150.00, month: "2024-07", user_id: 1, created_at: Date.now(), category: staticCategories[1] },
  { id: 3, category_id: 3, amount: 200, spent: 75.20, month: "2024-07", user_id: 1, created_at: Date.now(), category: staticCategories[2] },
  { id: 4, category_id: 4, amount: 150, spent: 125.00, month: "2024-07", user_id: 1, created_at: Date.now(), category: staticCategories[3] },
  { id: 5, category_id: 5, amount: 100, spent: 95.80, month: "2024-07", user_id: 1, created_at: Date.now(), category: staticCategories[4] },
];

export const staticExpenses: Expense[] = [
  { id: 1, vendor: "Starbucks", amount: 5.75, tax: 0.50, date: formatISO(new Date()), category_id: 1, items: JSON.stringify(["Latte"]), source: 'Manual', notes: 'Morning coffee', user_id: 1, created_at: Date.now(), category: staticCategories[0] },
  { id: 2, vendor: "Uber", amount: 25.50, tax: 2.00, date: formatISO(new Date()), category_id: 2, items: JSON.stringify(["Trip to downtown"]), source: 'Email', notes: null, user_id: 1, created_at: Date.now(), category: staticCategories[1] },
  { id: 3, vendor: "Office Depot", amount: 75.20, tax: 6.50, date: formatISO(subMonths(new Date(), 1)), category_id: 3, items: JSON.stringify(["Pens", "Notebooks", "Paper"]), source: 'Receipt', notes: 'Stocking up office', user_id: 1, created_at: Date.now(), category: staticCategories[2] },
  { id: 4, vendor: "Comcast", amount: 80.00, tax: 0, date: formatISO(subMonths(new Date(), 1)), category_id: 4, items: JSON.stringify(["Internet Bill"]), source: 'Manual', notes: 'Monthly bill', user_id: 1, created_at: Date.now(), category: staticCategories[3] },
  { id: 5, vendor: "Netflix", amount: 15.49, tax: 0, date: formatISO(subMonths(new Date(), 2)), category_id: 5, items: JSON.stringify(["Subscription"]), source: 'Email', notes: null, user_id: 1, created_at: Date.now(), category: staticCategories[4] },
  { id: 6, vendor: "Whole Foods", amount: 125.40, tax: 10.20, date: formatISO(subMonths(new Date(), 2)), category_id: 1, items: JSON.stringify(["Groceries"]), source: 'Receipt', notes: 'Weekly groceries', user_id: 1, created_at: Date.now(), category: staticCategories[0] },
];

export const staticNotifications: Notification[] = [
    { id: 1, created_at: Date.now(), user_id: 1, title: "Budget Alert", message: "You've used 95% of your Entertainment budget.", type: "budget", is_read: false },
    { id: 2, created_at: Date.now() - 86400000, user_id: 1, title: "Report Ready", message: "Your monthly report for June is now available.", type: "report", is_read: false },
    { id: 3, created_at: Date.now() - 172800000, user_id: 1, title: "Expense Added", message: "Successfully imported expense from Uber.", type: "expense", is_read: true },
];

export const staticScannedData = {
    vendor: 'The Home Depot',
    date: '2024-07-28',
    amount: 125.50,
    tax: 10.25,
    items: ['Paint', 'Brushes', 'Tape'],
    category_id: 3
};

export const staticImportedData = {
    vendor: 'Amazon',
    date: '2024-07-27',
    amount: 45.99,
    tax: 3.50,
    items: ['Echo Dot', 'Smart Plug'],
    category_id: 3
}
