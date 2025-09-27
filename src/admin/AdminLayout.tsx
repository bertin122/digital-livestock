import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAdmin } from "../contexts/AdminContext";

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/products", icon: Package, label: "Products" },
    { path: "/admin/users", icon: Users, label: "Users" },
    { path: "/admin/reports", icon: BarChart3, label: "Reports" },
    { path: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  const handleLogout = () => {
    logout();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                isActive(item.path)
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  : "text-gray-700"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex-1" />
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
