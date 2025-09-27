import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AdminContextType {
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("isAdmin") === "true";
  });

  const login = (email: string, password: string): boolean => {
    if (email === "admin@example.com" && password === "admin123") {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
