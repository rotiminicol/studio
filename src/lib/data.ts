export type Expense = {
    id: string;
    vendor: string;
    date: string;
    amount: number;
    tax: number;
    items: string[];
    category: 'Food & Drinks' | 'Travel' | 'Software' | 'Office Supplies' | 'Other';
    source: 'Receipt' | 'Email' | 'Manual';
};

export const mockExpenses: Expense[] = [
  {
    id: 'x123',
    vendor: 'Starbucks',
    date: '2024-06-25',
    amount: 9.99,
    tax: 0.8,
    items: ['Latte', 'Muffin'],
    category: 'Food & Drinks',
    source: 'Receipt',
  },
  {
    id: 'x124',
    vendor: 'Uber',
    date: '2024-06-25',
    amount: 25.50,
    tax: 2.0,
    items: ['Trip to Airport'],
    category: 'Travel',
    source: 'Email',
  },
  {
    id: 'x125',
    vendor: 'Figma',
    date: '2024-06-24',
    amount: 15.00,
    tax: 1.2,
    items: ['Monthly Subscription'],
    category: 'Software',
    source: 'Email',
  },
  {
    id: 'x126',
    vendor: 'Amazon',
    date: '2024-06-23',
    amount: 45.99,
    tax: 3.5,
    items: ['Mouse', 'Keyboard'],
    category: 'Office Supplies',
    source: 'Receipt',
  },
  {
    id: 'x127',
    vendor: 'Whole Foods',
    date: '2024-06-22',
    amount: 78.45,
    tax: 6.0,
    items: ['Groceries'],
    category: 'Food & Drinks',
    source: 'Receipt',
  },
  {
    id: 'x128',
    vendor: 'Delta Airlines',
    date: '2024-06-20',
    amount: 450.00,
    tax: 35.0,
    items: ['Flight to SFO'],
    category: 'Travel',
    source: 'Email',
  },
    {
    id: 'x129',
    vendor: 'Notion',
    date: '2024-05-30',
    amount: 10.00,
    tax: 0.8,
    items: ['Monthly Subscription'],
    category: 'Software',
    source: 'Email',
  },
  {
    id: 'x130',
    vendor: 'Sweetgreen',
    date: '2024-05-28',
    amount: 18.75,
    tax: 1.5,
    items: ['Salad'],
    category: 'Food & Drinks',
    source: 'Receipt',
  },
];

export const categoryBudgets = [
  { category: "Food & Drinks", budget: 500, spent: 107.19 },
  { category: "Travel", budget: 1000, spent: 475.50 },
  { category: "Software", budget: 100, spent: 25.00 },
  { category: "Office Supplies", budget: 200, spent: 45.99 },
  { category: "Other", budget: 150, spent: 0 },
];
