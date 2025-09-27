import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginCard from "./Login";
import RegisterCard from "./Register";
import Landing from "./Landing";
import AboutUs from "./AboutUs";
import ContactPage from "./ContactPage";
import Home from "./screens/home";
import CowPage from "./screens/cowpage";
import Cart from "./screens/cart";
import Checkout from "./screens/checkout";
import Profile from "./screens/profile";
import UserLayout from "./screens/UserLayout";
import UserDashboard from "./screens/UserDashboard";
import UserProfile from "./screens/UserProfile";
import UserOrders from "./screens/UserOrders";
import AddProduct from "./screens/AddProduct";
import UserFavorites from "./screens/UserFavorites";
import UserSettings from "./screens/UserSettings";

// Admin Components
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ProductManagement from "./admin/ProductManagement";
import UserManagement from "./admin/UserManagement";
import Reports from "./admin/Reports";
import Settings from "./admin/Settings";
import { AdminProvider } from "./contexts/AdminContext";

const App: React.FC = () => {
  return (
    <Router>
      <AdminProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<Landing />} />
          <Route
            path="/about"
            element={<AboutUs setShowAboutUs={() => {}} />}
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginCard />} />
          <Route path="/register" element={<RegisterCard />} />

          <Route path="/cow/:id" element={<CowPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />

          {/* User Dashboard */}
          <Route path="/dashboard" element={<UserLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="favorites" element={<UserFavorites />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AdminProvider>
    </Router>
  );
};

export default App;
