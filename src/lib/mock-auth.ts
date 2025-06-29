// Mock authentication system for development
interface MockUser {
  id: number;
  name: string;
  email: string;
  password: string; // Store password for mock auth
  onboarding_complete: boolean;
  account_type?: string;
}

interface MockAuthResponse {
  authToken: string;
  user: MockUser;
}

// Mock user database - store in localStorage for persistence
const getMockUsers = (): MockUser[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('mockUsers');
  return stored ? JSON.parse(stored) : [];
};

const saveMockUsers = (users: MockUser[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('mockUsers', JSON.stringify(users));
};

// Mock tokens
const mockTokens = new Map<string, MockUser>();

export const mockAuth = {
  login: async (credentials: { email: string; password: string }): Promise<MockAuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getMockUsers();
    
    // Check if user exists with correct credentials
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
    
    if (user) {
      const token = `mock_token_${Date.now()}`;
      mockTokens.set(token, user);
      
      return {
        authToken: token,
        user: { ...user, password: '' } // Don't return password
      };
    }
    
    // Fallback for demo mode - accept any email with password "password"
    if (credentials.password === "password") {
      const demoUser = {
        id: Date.now(),
        name: credentials.email.split('@')[0],
        email: credentials.email,
        password: credentials.password,
        onboarding_complete: false
      };
      
      const token = `mock_token_${Date.now()}`;
      mockTokens.set(token, demoUser);
      
      return {
        authToken: token,
        user: { ...demoUser, password: '' }
      };
    }
    
    throw new Error("Invalid email or password");
  },
  
  signup: async (details: { name: string; email: string; password: string }): Promise<MockAuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getMockUsers();
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === details.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    
    const newUser: MockUser = {
      id: Date.now(),
      name: details.name,
      email: details.email,
      password: details.password,
      onboarding_complete: false
    };
    
    // Save to localStorage
    users.push(newUser);
    saveMockUsers(users);
    
    const token = `mock_token_${Date.now()}`;
    mockTokens.set(token, newUser);
    
    return {
      authToken: token,
      user: { ...newUser, password: '' } // Don't return password
    };
  },
  
  getMe: async (token: string): Promise<MockUser> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = mockTokens.get(token);
    if (!user) {
      throw new Error("Invalid token");
    }
    
    return { ...user, password: '' }; // Don't return password
  },
  
  updateMe: async (token: string, updates: any): Promise<MockUser> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = mockTokens.get(token);
    if (!user) {
      throw new Error("Invalid token");
    }
    
    // Update user data
    Object.assign(user, updates);
    
    // Update in localStorage
    const users = getMockUsers();
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = user;
      saveMockUsers(users);
    }
    
    return { ...user, password: '' };
  },
  
  continueGoogleLogin: async (code: string, redirectUri: string): Promise<MockAuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock Google login - create a new user or return existing one
    const mockUser: MockUser = {
      id: Date.now(),
      name: "Google User",
      email: "google@fluxpense.com",
      password: "google_auth",
      onboarding_complete: false
    };
    
    const token = `mock_google_token_${Date.now()}`;
    mockTokens.set(token, mockUser);
    
    return {
      authToken: token,
      user: { ...mockUser, password: '' }
    };
  }
}; 