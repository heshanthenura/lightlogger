import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { AuthContextType, User } from "./AuthTypes";
import LoadingPage from "../pages/LoadingPage";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  const login = async (username: string, password: string) => {
    const res = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Login failed");
    }

    const data = await res.json();
    setUser({ id: data.user_id });
  };

  const logout = async () => {
    await fetch(`${API_URL}/user/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  const checkAuth = async () => {
    const res = await fetch(`${API_URL}/user/check`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      setUser(null);
      return;
    }

    const data = await res.json();
    setUser({ id: data.user_id });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
