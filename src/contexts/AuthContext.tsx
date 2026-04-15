import React, { createContext, useContext, useState, useCallback } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  city: string;
  role: "volunteer" | "citizen";
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
  signUp: (data: Pick<User, "name" | "email" | "city" | "role">) => Promise<boolean>;
  signOut: () => void;
  updateVerification: (status: User["verificationStatus"]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: "usr_001",
  name: "Talha Asif",
  email: "talha@resq.pk",
  city: "Lahore",
  role: "volunteer",
  verificationStatus: "verified",
  avatar: undefined,
  joinedAt: "2025-12-01",
  reportsSubmitted: 24,
  trustScore: 92,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("resq_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      localStorage.removeItem("resq_user");
      return null;
    }
  });

  const signIn = useCallback(async (email: string, _password: string): Promise<boolean> => {
    if (!email.trim() || !_password.trim()) return false;
    const mockUser = { ...MOCK_USER, email: email.trim() };
    setUser(mockUser);
    localStorage.setItem("resq_user", JSON.stringify(mockUser));
    return true;
  }, []);

  const signUp = useCallback(async (data: Pick<User, "name" | "email" | "city" | "role">): Promise<boolean> => {
    if (!data.name.trim() || !data.email.trim()) return false;
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: data.name.trim(),
      email: data.email.trim(),
      city: data.city.trim(),
      role: data.role,
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
