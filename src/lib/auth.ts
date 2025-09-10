import { User } from '@/types';

// Mock authentication - in real app, this would integrate with your auth provider
export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string): Promise<User> {
    // Mock login logic
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'customer@example.com',
        name: 'John Customer',
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        isVerified: true,
        createdAt: '2024-01-01',
        lastLogin: new Date().toISOString(),
      },
      {
        id: '2',
        email: 'distributor@example.com',
        name: 'Sarah Distributor',
        role: 'distributor',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
        isVerified: true,
        createdAt: '2024-01-01',
        lastLogin: new Date().toISOString(),
      },
      {
        id: '3',
        email: 'business@example.com',
        name: 'Mike Business',
        role: 'business',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        isVerified: true,
        createdAt: '2024-01-01',
        lastLogin: new Date().toISOString(),
      },
    ];

    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  async register(userData: Partial<User>): Promise<User> {
    // Mock registration logic
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email!,
      name: userData.name!,
      role: userData.role || 'customer',
      isVerified: false,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    this.currentUser = newUser;
    localStorage.setItem('user', JSON.stringify(newUser));
    return newUser;
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser;
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      return this.currentUser;
    }

    return null;
  }

  async updateProfile(updates: Partial<User>): Promise<User> {
    if (!this.currentUser) {
      throw new Error('No user logged in');
    }

    this.currentUser = { ...this.currentUser, ...updates };
    localStorage.setItem('user', JSON.stringify(this.currentUser));
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  hasRole(role: User['role']): boolean {
    return this.currentUser?.role === role;
  }

  canAccessDistributorFeatures(): boolean {
    return this.hasRole('distributor') && this.currentUser?.isVerified === true;
  }

  canAccessBusinessFeatures(): boolean {
    return this.hasRole('business') && this.currentUser?.isVerified === true;
  }
}

export const authService = AuthService.getInstance();
