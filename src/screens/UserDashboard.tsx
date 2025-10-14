import React from "react";
import {
  ShoppingCart,
  Package,
  DollarSign,
  Heart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Clock,
  Star,
  User
} from "lucide-react";
import { useUser, useUserProfile, useUserStats, useUserActivities } from '../contexts/UserContext';
import { getTimeAgoText } from '../services/userService';

const UserDashboard: React.FC = () => {
  const { userStats, loading: statsLoading } = useUserStats();
  const { userActivities, loading: activitiesLoading } = useUserActivities();
  const { user, displayName, loading: profileLoading } = useUserProfile();

  // Dynamic stats based on real data
  const stats = userStats ? [
    {
      title: "Total Orders",
      value: userStats.totalOrders.toString(),
      change: userStats.totalOrders > 10 ? "+2" : "+1",
      changeType: "increase" as const,
      icon: Package,
      color: "blue",
    },
    {
      title: "Total Spent",
      value: `$${userStats.totalSpent.toLocaleString()}`,
      change: "+$500",
      changeType: "increase" as const,
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Cart Items",
      value: userStats.cartItems.toString(),
      change: userStats.cartItems > 2 ? "+1" : "0",
      changeType: userStats.cartItems > 2 ? "increase" as const : "neutral" as const,
      icon: ShoppingCart,
      color: "purple",
    },
    {
      title: "Favorites",
      value: userStats.favorites.toString(),
      change: "+1",
      changeType: "increase" as const,
      icon: Heart,
      color: "orange",
    },
  ] : [];

  // Loading states
  const isLoading = profileLoading || statsLoading || activitiesLoading;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Package className="w-4 h-4 text-green-600" />;
      case "favorite":
        return <Heart className="w-4 h-4 text-red-600" />;
      case "profile":
        return <Activity className="w-4 h-4 text-blue-600" />;
      case "review":
        return <Star className="w-4 h-4 text-yellow-600" />;
      case "login":
        return <User className="w-4 h-4 text-purple-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="h-4 bg-gray-200 rounded w-96"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {displayName || 'User'}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              {user ? (
                `Here's your account overview. You've been a member for ${userStats?.accountAge || 0} days.`
              ) : (
                'Here\'s your account overview.'
              )}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-green-500" />
            <span className="text-green-600 font-medium">All systems active</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-1">
                  {stat.changeType === "increase" ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                  ) : stat.changeType === "decrease" ? (
                    <ArrowDownRight className="w-4 h-4 text-red-600 mr-1" />
                  ) : null}
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "increase"
                        ? "text-green-600"
                        : stat.changeType === "decrease"
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    from last month
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Activities
              </h2>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>Last 30 days</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            {activitiesLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center space-x-3 animate-pulse">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            ) : userActivities.length > 0 ? (
              <div className="space-y-4">
                {userActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
                      {activity.details && (
                        <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0 text-xs text-gray-400">
                      {getTimeAgoText(activity.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No recent activities to show</p>
                <p className="text-gray-400 text-xs mt-1">Start exploring to see your activities here!</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Package className="w-8 h-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  Add Product
                </span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <ShoppingCart className="w-8 h-8 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  View Orders
                </span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="w-8 h-8 text-red-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  Favorites
                </span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Activity className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  Settings
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
