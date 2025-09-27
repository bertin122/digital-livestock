import React from "react";
import {
  Users,
  Package,
  DollarSign,
  TrendingUp,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const AdminDashboard: React.FC = () => {
  // Mock data
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      changeType: "increase",
      icon: Users,
      color: "blue",
    },
    {
      title: "Total Products",
      value: "89",
      change: "+5%",
      changeType: "increase",
      icon: Package,
      color: "green",
    },
    {
      title: "Total Sales",
      value: "$45,678",
      change: "+23%",
      changeType: "increase",
      icon: DollarSign,
      color: "purple",
    },
    {
      title: "Growth Rate",
      value: "18.2%",
      change: "-2%",
      changeType: "decrease",
      icon: TrendingUp,
      color: "orange",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "Purchased 2 cows",
      time: "2 minutes ago",
      type: "sale",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Added new product",
      time: "15 minutes ago",
      type: "product",
    },
    {
      id: 3,
      user: "Admin",
      action: "Updated user permissions",
      time: "1 hour ago",
      type: "user",
    },
    {
      id: 4,
      user: "Mike Johnson",
      action: "Left a review",
      time: "2 hours ago",
      type: "review",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <DollarSign className="w-4 h-4 text-green-600" />;
      case "product":
        return <Package className="w-4 h-4 text-blue-600" />;
      case "user":
        return <Users className="w-4 h-4 text-purple-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your store.
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
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "increase"
                        ? "text-green-600"
                        : "text-red-600"
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
                    <p className="text-sm font-medium text-gray-900">
                      {activity.user}
                    </p>
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
                <Users className="w-8 h-8 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  Add User
                </span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Activity className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  View Reports
                </span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="w-8 h-8 text-orange-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  Schedule
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
