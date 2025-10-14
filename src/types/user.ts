// User-related TypeScript interfaces and types

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  address?: string;
  bio?: string;
  profilePicture?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  occupation?: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastLogin?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  privacy: {
    showEmail: boolean;
    showPhone: boolean;
    showAddress: boolean;
  };
  language: string;
  currency: string;
}

export interface UserStats {
  totalOrders: number;
  totalSpent: number;
  cartItems: number;
  favorites: number;
  reviewsGiven: number;
  accountAge: number; // in days
}

export interface UserActivity {
  id: number;
  action: string;
  timestamp: string;
  type: 'order' | 'favorite' | 'profile' | 'review' | 'login';
  details?: string;
}

// Form interfaces for user data
export interface UserProfileUpdateData {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  address?: string;
  bio?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  occupation?: string;
}

export interface UserFormData extends UserProfileUpdateData {
  password?: string;
  confirmPassword?: string;
}

// API response types
export interface UserApiResponse {
  success: boolean;
  message: string;
  data?: User;
  error?: string;
}

export interface UserStatsApiResponse {
  success: boolean;
  message: string;
  data?: UserStats;
  error?: string;
}

export interface UserActivitiesApiResponse {
  success: boolean;
  message: string;
  data?: UserActivity[];
  error?: string;
}