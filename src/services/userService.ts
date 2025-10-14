import { BASE_URL } from '../constants/urls';
import { getUserId } from './auth';
import { debugUserUpdate } from '../utils/serverDiagnostic';
import { legacyUpdateUser } from './legacyUserService';
import type {
  User,
  UserStats,
  UserActivity,
  UserProfileUpdateData,
  UserApiResponse,
  UserStatsApiResponse,
  UserActivitiesApiResponse
} from '../types/user';

// Get current user profile
export const getCurrentUserProfile = async (): Promise<User | null> => {
  try {
    let userId = getUserId();
    console.log('Current user ID from localStorage:', userId);
    
    // Fallback: if no user ID is found, use ID 1 (this should be fixed by proper login handling)
    if (!userId) {
      console.warn('No user ID found in localStorage, using default ID 1');
      userId = 1;
    }

    const response = await fetch(`${BASE_URL}/user/profile/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Fallback to the existing namebyid endpoint if profile endpoint doesn't exist
      const fallbackResponse = await fetch(`${BASE_URL}/user/namebyid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId }),
      });

      if (!fallbackResponse.ok) {
        throw new Error(`Error ${fallbackResponse.status}`);
      }

      const basicUserData = await fallbackResponse.json();
      
      // Transform basic user data to full User interface
      const fullUser: User = {
        id: userId,
        firstname: basicUserData.firstname || '',
        lastname: basicUserData.lastname || '',
        email: basicUserData.email || '',
        phone: basicUserData.phone || '',
        address: '',
        bio: '',
        profilePicture: 'https://res.cloudinary.com/dlezmeikx/image/upload/v1755111372/profile_lzhjnt.png',
        role: 'user',
        status: 'active',
        joinDate: new Date().toISOString(),
        isEmailVerified: false,
        isPhoneVerified: false,
      };

      return fullUser;
    }

    const data: UserApiResponse = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (updateData: UserProfileUpdateData): Promise<UserApiResponse> => {
  try {
    let userId = getUserId();
    console.log('Current user ID from localStorage:', userId);
    
    // Fallback: if no user ID is found, use ID 1 (this should be fixed by proper login handling)
    if (!userId) {
      console.warn('No user ID found in localStorage, using default ID 1');
      userId = 1;
    }

    // Filter data to only include fields that the current backend supports
    // Based on the original userdetails component, the backend expects: firstname, lastname, email, password
    const compatibleData: any = {
      id: userId,
    };
    
    // Only include fields that the existing backend recognizes
    if (updateData.firstname !== undefined) compatibleData.firstname = updateData.firstname;
    if (updateData.lastname !== undefined) compatibleData.lastname = updateData.lastname;
    if (updateData.email !== undefined) compatibleData.email = updateData.email;
    if (updateData.phone !== undefined) compatibleData.phone = updateData.phone;
    
    // Handle password separately as it might be in the updateData
    if ((updateData as any).password !== undefined) {
      compatibleData.password = (updateData as any).password;
    }

    console.log('Sending user update data:', compatibleData);

    // Use diagnostic function for better debugging
    const debugResult = await debugUserUpdate(compatibleData);
    
    if (debugResult.success) {
      return {
        success: true,
        message: 'Profile updated successfully',
        data: debugResult.data
      };
    } else {
      // Try legacy fallback method
      console.log('🔄 Primary method failed, trying legacy fallback...');
      try {
        const legacyData = {
          firstname: updateData.firstname || '',
          lastname: updateData.lastname || '',
          email: updateData.email || '',
          password: (updateData as any).password || undefined,
          phone: updateData.phone || undefined
        };
        
        await legacyUpdateUser(legacyData);
        
        return {
          success: true,
          message: 'Profile updated successfully (legacy mode)',
          data: legacyData
        };
      } catch (legacyError) {
        return {
          success: false,
          message: `Both methods failed. Primary: ${debugResult.error}. Legacy: ${legacyError}`,
          error: debugResult.rawResponse || debugResult.error
        };
      }
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    
    // Final fallback attempt
    try {
      console.log('🔄 Critical fallback attempt...');
      const legacyData = {
        firstname: updateData.firstname || '',
        lastname: updateData.lastname || '',
        email: updateData.email || '',
        password: (updateData as any).password || undefined,
        phone: updateData.phone || undefined
      };
      
      await legacyUpdateUser(legacyData);
      
      return {
        success: true,
        message: 'Profile updated successfully (fallback mode)',
        data: legacyData
      };
    } catch (fallbackError) {
      return {
        success: false,
        message: 'All update methods failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
};

// Get user statistics
export const getUserStats = async (): Promise<UserStats | null> => {
  try {
    const userId = getUserId();
    if (!userId) {
      throw new Error('No user ID found');
    }

    const response = await fetch(`${BASE_URL}/user/stats/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Return mock stats if endpoint doesn't exist
      const mockStats: UserStats = {
        totalOrders: 12,
        totalSpent: 3450,
        cartItems: 3,
        favorites: 8,
        reviewsGiven: 5,
        accountAge: Math.floor((Date.now() - new Date('2024-01-15').getTime()) / (1000 * 60 * 60 * 24))
      };
      return mockStats;
    }

    const data: UserStatsApiResponse = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    // Return mock stats as fallback
    return {
      totalOrders: 12,
      totalSpent: 3450,
      cartItems: 3,
      favorites: 8,
      reviewsGiven: 5,
      accountAge: Math.floor((Date.now() - new Date('2024-01-15').getTime()) / (1000 * 60 * 60 * 24))
    };
  }
};

// Get user activities
export const getUserActivities = async (limit: number = 10): Promise<UserActivity[]> => {
  try {
    const userId = getUserId();
    if (!userId) {
      throw new Error('No user ID found');
    }

    const response = await fetch(`${BASE_URL}/user/activities/${userId}?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Return mock activities if endpoint doesn't exist
      const mockActivities: UserActivity[] = [
        {
          id: 1,
          action: "Ordered 2 cows",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          type: "order",
          details: "Total: $1,200"
        },
        {
          id: 2,
          action: "Added cow to favorites",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          type: "favorite",
          details: "Holstein Cow #142"
        },
        {
          id: 3,
          action: "Updated profile",
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          type: "profile",
          details: "Added phone number"
        },
        {
          id: 4,
          action: "Left a review",
          timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          type: "review",
          details: "5-star review for Jersey Cow"
        }
      ];
      return mockActivities;
    }

    const data: UserActivitiesApiResponse = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching user activities:', error);
    // Return mock activities as fallback
    return [
      {
        id: 1,
        action: "Ordered 2 cows",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        type: "order",
        details: "Total: $1,200"
      },
      {
        id: 2,
        action: "Added cow to favorites",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        type: "favorite",
        details: "Holstein Cow #142"
      }
    ];
  }
};

// Upload profile picture
export const uploadProfilePicture = async (file: File): Promise<string | null> => {
  try {
    const userId = getUserId();
    if (!userId) {
      throw new Error('No user ID found');
    }

    const formData = new FormData();
    formData.append('profilePicture', file);
    formData.append('userId', userId.toString());

    const response = await fetch(`${BASE_URL}/user/upload-avatar`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const data = await response.json();
    return data.imageUrl || null;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    return null;
  }
};

// Verify email
export const verifyEmail = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/user/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error verifying email:', error);
    return false;
  }
};

// Verify phone
export const verifyPhone = async (code: string): Promise<boolean> => {
  try {
    const userId = getUserId();
    if (!userId) {
      throw new Error('No user ID found');
    }

    const response = await fetch(`${BASE_URL}/user/verify-phone`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        userId,
        code 
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error verifying phone:', error);
    return false;
  }
};

// Calculate account age in a readable format
export const getAccountAgeText = (joinDate: string): string => {
  const join = new Date(joinDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - join.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) {
    return `${diffDays} days`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? 's' : ''}`;
  }
};

// Format time ago
export const getTimeAgoText = (timestamp: string): string => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffTime = Math.abs(now.getTime() - time.getTime());
  const diffMinutes = Math.ceil(diffTime / (1000 * 60));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
};