export interface User {
  id: number;
  created_at: number;
  name: string;
  email: string;
  full_name: string | null;
  account_type: string | null;
  onboarding_complete: boolean | null;
}

export interface Category {
  id: number;
  created_at: number;
  name: string;
  icon: string | null;
  color: string | null;
  user_id: number;
}

export interface Budget {
  id: number;
  created_at: number;
  amount: number;
  spent: number;
  month: string;
  user_id: number;
  category_id: number;
  // This will be added client-side
  category?: Category;
}

export interface Expense {
  id: number;
  created_at: number;
  vendor: string;
  date: string;
  amount: number;
  tax: number;
  source: 'Receipt' | 'Email' | 'Manual';
  notes: string | null;
  items: string; // Stored as a JSON string
  user_id: number;
  category_id: number;
  // This will be added client-side
  category?: Category;
}

// For creating a new expense
export type NewExpense = Omit<Expense, 'id' | 'created_at' | 'user_id' | 'category'>;
