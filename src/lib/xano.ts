// src/lib/xano.ts
const authApiUrl = process.env.NEXT_PUBLIC_XANO_AUTH_API_URL;
const fluxpenseApiUrl = process.env.NEXT_PUBLIC_XANO_API_URL;
const googleOauthApiUrl = process.env.NEXT_PUBLIC_XANO_GOOGLE_OAUTH_API_URL;

async function xanoFetch(url: string, options: RequestInit = {}) {
  console.log('Making request to:', url, 'with options:', options);
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  console.log('Response status:', response.status);
  console.log('Response headers:', response.headers);

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
      console.log('Error response data:', errorData);
    } catch (e) {
      console.log('Could not parse error response as JSON');
      errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
    }
    throw new Error(errorData.message || `API request failed with status ${response.status}`);
  }

  // For DELETE requests which might not have a body
  const contentType = response.headers.get("content-type");
  if (response.status === 204 || !contentType || !contentType.includes("application/json")) {
    return null;
  }

  const data = await response.json();
  console.log('Success response data:', data);
  return data;
}

export const xanoAuth = {
  login: (body: any) => {
    console.log('Login attempt with:', { email: body.email, password: '[REDACTED]' });
    return xanoFetch(`${authApiUrl}/auth/login`, { 
      method: 'POST', 
      body: JSON.stringify(body) 
    });
  },
  
  signup: (body: any) => {
    console.log('Signup attempt with:', { ...body, password: '[REDACTED]' });
    return xanoFetch(`${authApiUrl}/auth/signup`, { 
      method: 'POST', 
      body: JSON.stringify(body) 
    });
  },
  
  getMe: (token: string) => {
    return xanoFetch(`${authApiUrl}/auth/me`, { 
      headers: { 'Authorization': `Bearer ${token}` } 
    });
  },
  
  updateMe: (token: string, body: any) => {
    console.log('Updating user profile with:', body);
    // Try different possible endpoints for updating user profile
    return xanoFetch(`${authApiUrl}/auth/me`, { 
      method: 'PATCH', // Changed from POST to PATCH
      body: JSON.stringify(body), 
      headers: { 'Authorization': `Bearer ${token}` } 
    }).catch(async (error) => {
      console.log('PATCH /auth/me failed, trying PUT method:', error.message);
      // Fallback to PUT method
      return xanoFetch(`${authApiUrl}/auth/me`, { 
        method: 'PUT',
        body: JSON.stringify(body), 
        headers: { 'Authorization': `Bearer ${token}` } 
      }).catch(async (putError) => {
        console.log('PUT /auth/me failed, trying POST method:', putError.message);
        // Fallback to POST method (original)
        return xanoFetch(`${authApiUrl}/auth/me`, { 
          method: 'POST',
          body: JSON.stringify(body), 
          headers: { 'Authorization': `Bearer ${token}` } 
        }).catch(async (postError) => {
          console.log('POST /auth/me failed, trying /auth/update endpoint:', postError.message);
          // Try alternative endpoint
          return xanoFetch(`${authApiUrl}/auth/update`, { 
            method: 'POST',
            body: JSON.stringify(body), 
            headers: { 'Authorization': `Bearer ${token}` } 
          }).catch(async (updateError) => {
            console.log('All update methods failed, trying /user/update endpoint:', updateError.message);
            // Try another alternative endpoint
            return xanoFetch(`${authApiUrl}/user/update`, { 
              method: 'POST',
              body: JSON.stringify(body), 
              headers: { 'Authorization': `Bearer ${token}` } 
            });
          });
        });
      });
    });
  },
  
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

        // Notifications
        getNotifications: () => xanoFetch(`${fluxpenseApiUrl}/notification`, { headers }),
        markNotificationRead: (id: number) => xanoFetch(`${fluxpenseApiUrl}/notification/${id}`, { method: 'PATCH', body: JSON.stringify({ is_read: true }), headers }),
        markAllNotificationsRead: () => xanoFetch(`${fluxpenseApiUrl}/notifications/mark_all_read`, { method: 'POST', headers }),
    };
};