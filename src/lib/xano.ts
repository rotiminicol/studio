// src/lib/xano.ts
const authApiUrl = process.env.NEXT_PUBLIC_XANO_AUTH_API_URL;
const fluxpenseApiUrl = process.env.NEXT_PUBLIC_XANO_API_URL;
const googleOauthApiUrl = process.env.NEXT_PUBLIC_XANO_GOOGLE_OAUTH_API_URL;

async function xanoFetch(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
    throw new Error(errorData.message || 'API request failed');
  }

  // For DELETE requests which might not have a body
  const contentType = response.headers.get("content-type");
  if (response.status === 204 || !contentType || !contentType.includes("application/json")) {
    return null;
  }

  return response.json();
}

export const xanoAuth = {
  login: (body: any) => xanoFetch(`${authApiUrl}/auth/login`, { method: 'POST', body: JSON.stringify(body) }),
  signup: (body: any) => xanoFetch(`${authApiUrl}/auth/signup`, { method: 'POST', body: JSON.stringify(body) }),
  getMe: (token: string) => xanoFetch(`${authApiUrl}/auth/me`, { headers: { 'Authorization': `Bearer ${token}` } }),
  continueGoogleLogin: (code: string, redirectUri: string) => {
    const url = `${googleOauthApiUrl}/oauth/google/continue?code=${code}&redirect_uri=${redirectUri}`;
    return xanoFetch(url);
  }
};

export const xanoApi = (token: string) => {
    const headers = { 'Authorization': `Bearer ${token}` };

    return {
        // Expenses
        getExpenses: () => xanoFetch(`${fluxpenseApiUrl}/expense`, { headers }),
        getExpense: (id: number) => xanoFetch(`${fluxpenseApiUrl}/expense/${id}`, { headers }),
        addExpense: (body: any) => xanoFetch(`${fluxpenseApiUrl}/expense`, { method: 'POST', body: JSON.stringify(body), headers }),
        updateExpense: (id: number, body: any) => xanoFetch(`${fluxpenseApiUrl}/expense/${id}`, { method: 'PATCH', body: JSON.stringify(body), headers }),
        deleteExpense: (id: number) => xanoFetch(`${fluxpenseApiUrl}/expense/${id}`, { method: 'DELETE', headers }),

        // Categories
        getCategories: () => xanoFetch(`${fluxpenseApiUrl}/category`, { headers }),
        addCategory: (body: any) => xanoFetch(`${fluxpenseApiUrl}/category`, { method: 'POST', body: JSON.stringify(body), headers }),

        // Budgets
        getBudgets: () => xanoFetch(`${fluxpenseApiUrl}/budget`, { headers }),
        addBudget: (body: any) => xanoFetch(`${fluxpenseApiUrl}/budget`, { method: 'POST', body: JSON.stringify(body), headers }),
        updateBudget: (id: number, body: any) => xanoFetch(`${fluxpenseApiUrl}/budget/${id}`, { method: 'PATCH', body: JSON.stringify(body), headers }),
        
        // Receipts
        addReceipt: (body: any) => xanoFetch(`${fluxpenseApiUrl}/receipt`, { method: 'POST', body: JSON.stringify(body), headers }),

        // Email Imports
        addEmailImport: (body: any) => xanoFetch(`${fluxpenseApiUrl}/email_import`, { method: 'POST', body: JSON.stringify(body), headers }),
    };
};
