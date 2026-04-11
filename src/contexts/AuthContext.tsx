import React, { createContext, useContext, useState, useCallback } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  role: "volunteer" | "citizen";
  cnic: string;
  verificationStatus: "pending" | "verified" | "rejected" | "unsubmitted";
  avatar?: string;
  joinedAt: string;
  reportsSubmitted: number;
  trustScore: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (data: Omit<User, "id" | "verificationStatus" | "joinedAt" | "reportsSubmitted" | "trustScore">) => Promise<boolean>;
  signOut: () => void;
  updateVerification: (status: User["verificationStatus"]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: "usr_001",
  name: "Talha Asif",
  email: "talha@resq.pk",
  phone: "+92 300 1234567",
  city: "Lahore",
  role: "volunteer",
  cnic: "35202-1234567-1",
  verificationStatus: "verified",
  avatar: undefined,
  joinedAt: "2025-12-01",
  reportsSubmitted: 24,
  trustScore: 92,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("resq_user");
    return saved ? JSON.parse(saved) : null;
  });

  const signIn = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Mock auth — accepts any email/password
    const mockUser = { ...MOCK_USER, email };
    setUser(mockUser);
    localStorage.setItem("resq_user", JSON.stringify(mockUser));
    return true;
  }, []);

  const signUp = useCallback(async (data: Omit<User, "id" | "verificationStatus" | "joinedAt" | "reportsSubmitted" | "trustScore">): Promise<boolean> => {
    const newUser: User = {
      ...data,
      id: `usr_${Date.now()}`,
      verificationStatus: "unsubmitted",
      joinedAt: new Date().toISOString().split("T")[0],
      reportsSubmitted: 0,
      trustScore: 0,
    };
    setUser(newUser);
    localStorage.setItem("resq_user", JSON.stringify(newUser));
    return true;
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem("resq_user");
  }, []);

  const updateVerification = useCallback((status: User["verificationStatus"]) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, verificationStatus: status };
      localStorage.setItem("resq_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signUp, signOut, updateVerification }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
