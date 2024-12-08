import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  userId: string | null; 
  login: (role: string, userId: string) => void; 
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("role")
  );
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId") 
  );

  const login = (userRole: string, userId: string) => {
    setIsAuthenticated(true);
    setRole(userRole);
    setUserId(userId); 
    localStorage.setItem("role", userRole); 
    localStorage.setItem("userId", userId); 
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    setUserId(null); 
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};