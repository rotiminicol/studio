export const staticNotifications = [
  {
    id: 1,
    type: 'budget',
    title: 'Budget limit reached',
    message: 'You have reached 90% of your monthly budget.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    is_read: false,
  },
  {
    id: 2,
    type: 'expense',
    title: 'New expense added',
    message: 'A new expense was added to your account.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    is_read: false,
  },
  {
    id: 3,
    type: 'report',
    title: 'Monthly report ready',
    message: 'Your monthly expense report is now available.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    is_read: true,
  },
]; 