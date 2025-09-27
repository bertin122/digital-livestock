import React from "react";
import {
  ShoppingCart,
  Package,
  DollarSign,
  Heart,
  Activity,
  // Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const UserDashboard: React.FC = () => {
  // Mock data
  const stats = [
    {
      title: "Total Orders",
      value: "12",
      change: "+2",
      changeType: "increase",
      icon: Package,
      color: "blue",
    },
    {
      title: "Total Spent",
      value: "$3,450",
      change: "+$500",
      changeType: "increase",
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Cart Items",
      value: "3",
      change: "0",
      changeType: "neutral",
      icon: ShoppingCart,
      color: "purple",
    },
    {
      title: "Favorites",
      value: "8",
      change: "+1",
      changeType: "increase",
      icon: Heart,
      color: "orange",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Ordered 2 cows",
      time: "2 days ago",
      type: "order",
    },
    {
      id: 2,
      action: "Added cow to favorites",
      time: "3 days ago",
      type: "favorite",
    },
    {
      id: 3,
      action: "Updated profile",
      time: "1 week ago",
      type: "profile",
    },
    {
      id: 4,
      action: "Left a review",
      time: "2 weeks ago",
      type: "review",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Package className="w-4 h-4 text-green-600" />;
      case "favorite":
        return <Heart className="w-4 h-4 text-red-600" />;
      case "profile":
        return <Activity className="w-4 h-4 text-blue-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's your account overview.
        </p>
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
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activities
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500">{activity.action}</p>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-400">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
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
