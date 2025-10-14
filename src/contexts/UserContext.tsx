import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, UserStats, UserActivity } from "../types/user";
import {
  getCurrentUserProfile,
  getUserStats,
  getUserActivities,
  updateUserProfile,
  uploadProfilePicture,
} from "../services/userService";
import { getUserId } from "../services/auth";

interface UserContextType {
  user: User | null;
  userStats: UserStats | null;
  userActivities: UserActivity[];
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
  refreshUserStats: () => Promise<void>;
  refreshUserActivities: () => Promise<void>;
  updateUser: (updateData: Partial<User>) => Promise<boolean>;
  uploadAvatar: (file: File) => Promise<boolean>;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const userId = getUserId();
    setIsLoggedIn(!!userId);
    if (userId) {
      refreshUser();
    }
  }, []);

  const refreshUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const userData = await getCurrentUserProfile();
      if (userData) {
        setUser(userData);
        // Also refresh stats and activities when user data is refreshed
        await Promise.all([refreshUserStats(), refreshUserActivities()]);
      } else {
        setError("Failed to load user profile");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error refreshing user:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshUserStats = async () => {
    try {
      const stats = await getUserStats();
      setUserStats(stats);
    } catch (err) {
      console.error("Error refreshing user stats:", err);
    }
  };

  const refreshUserActivities = async () => {
    try {
      const activities = await getUserActivities(10);
      setUserActivities(activities);
    } catch (err) {
      console.error("Error refreshing user activities:", err);
    }
  };

  const updateUser = async (updateData: Partial<User>): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await updateUserProfile(updateData);

      if (response.success) {
        // Update local user state
        if (user) {
          setUser({ ...user, ...updateData });
        }
        return true;
      } else {
        setError(response.message || "Failed to update profile");
        return false;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Error updating user:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (file: File): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const imageUrl = await uploadProfilePicture(file);

      if (imageUrl && user) {
        // Update user profile with new avatar URL
        const success = await updateUser({ profilePicture: imageUrl });
        return success;
      } else {
        setError("Failed to upload profile picture");
        return false;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Error uploading avatar:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: UserContextType = {
    user,
    userStats,
    userActivities,
    loading,
    error,
    refreshUser,
    refreshUserStats,
    refreshUserActivities,
    updateUser,
    uploadAvatar,
    isLoggedIn,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Custom hook for user profile data with loading states
export const useUserProfile = () => {
  const { user, loading, error, refreshUser, updateUser } = useUser();

  return {
    user,
    loading,
    error,
    refreshUser,
    updateUser,
    isProfileComplete: user ? !!(user.phone && user.address) : false,
    displayName: user ? `${user.firstname} ${user.lastname}`.trim() : "",
    profileInitials: user
      ? `${user.firstname?.charAt(0) || ""}${
          user.lastname?.charAt(0) || ""
        }`.toUpperCase()
      : "U",
  };
};

// Custom hook for user statistics
export const useUserStats = () => {
  const { userStats, loading, error, refreshUserStats } = useUser();

  return {
    userStats,
    loading,
    error,
    refreshUserStats,
  };
};

// Custom hook for user activities
export const useUserActivities = () => {
  const { userActivities, loading, error, refreshUserActivities } = useUser();

  return {
    userActivities,
    loading,
    error,
    refreshUserActivities,
  };
};
