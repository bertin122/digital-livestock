import React, { useState } from "react";
import Header from "../components/header";
import { ChevronRight, Settings, User as UserIcon, Package, BarChart3, Bug } from "lucide-react";
import OrdersCard from "../components/orderscard";
import UserDetails from "../components/userdetails";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileHeader from "../components/ProfileHeader";
import UserDashboard from "./UserDashboard";
import { UserProvider } from "../contexts/UserContext";
import { testServerConnectivity } from "../utils/serverDiagnostic";

type ActiveTab = "dashboard" | "account" | "orders" | "settings";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const tabs = [
    {
      id: "dashboard" as const,
      label: "Dashboard",
      icon: BarChart3,
      description: "Overview of your account"
    },
    {
      id: "account" as const,
      label: "Account Info",
      icon: UserIcon,
      description: "Manage your personal information"
    },
    {
      id: "orders" as const,
      label: "My Orders",
      icon: Package,
      description: "View your order history"
    },
    {
      id: "settings" as const,
      label: "Settings",
      icon: Settings,
      description: "Account preferences and security"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <UserDashboard />;
      case "account":
        return <UserDetails />;
      case "orders":
        return <OrdersCard />;
      case "settings":
        return (
          <div className="text-center py-12">
            <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Settings</h3>
            <p className="text-gray-500">Settings panel coming soon...</p>
          </div>
        );
      default:
        return <UserDashboard />;
    }
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Profile Header */}
            <ProfileHeader 
              showEditButton={activeTab === "account"}
              onEditClick={() => setIsEditingProfile(!isEditingProfile)}
            />
            
            {/* Diagnostic Tools (temporary - for debugging) */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bug className="w-5 h-5 text-yellow-600 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">Debug Tools</h3>
                    <p className="text-xs text-yellow-600">Click to test server connectivity and API endpoints</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    console.clear();
                    testServerConnectivity();
                  }}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
                >
                  Test Server
                </button>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-1 p-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`group relative flex items-center px-6 py-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-700 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mr-3 transition-colors ${
                          activeTab === tab.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                        }`} />
                        <div className="text-left">
                          <div className="font-medium">{tab.label}</div>
                          <div className={`text-xs mt-0.5 ${
                            activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                            {tab.description}
                          </div>
                        </div>
                        {activeTab === tab.id && (
                          <ChevronRight className="w-4 h-4 ml-auto text-blue-600" />
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>
              
              {/* Content Area */}
              <div className="p-8">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </UserProvider>
  );
};

export default Profile;
