import React from "react";
import { Package, Calendar, DollarSign, Eye } from "lucide-react";

const UserOrders: React.FC = () => {
  const orders = [
    {
      id: "ORD-001",
      date: "2023-10-15",
      status: "Delivered",
      total: "$1,250",
      items: 2,
    },
    {
      id: "ORD-002",
      date: "2023-09-28",
      status: "Shipped",
      total: "$890",
      items: 1,
    },
    {
      id: "ORD-003",
      date: "2023-09-10",
      status: "Processing",
      total: "$2,100",
      items: 3,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-100";
      case "Shipped":
        return "text-blue-600 bg-blue-100";
      case "Processing":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600">View and track your order history.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Order History</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Package className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {order.id}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{order.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Package className="w-4 h-4" />
                        <span>{order.items} items</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{order.total}</span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
