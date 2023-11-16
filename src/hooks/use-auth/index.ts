import { AuthContext } from "@/context";
import { useContext } from "react";

interface AuthContextProps {
  login: (data: object) => Promise<any>;
  register: (data: object) => Promise<void>;
  logout: () => Promise<void>;
  verifyToken: () => Promise<void>;
  getAccount: () => Promise<void>;
  account: object | boolean;
  isAuthenticated: "true" | "false";
}

export const useAuth = () => {
  const context = useContext(AuthContext) as AuthContextProps;
  if (!context) throw new Error("useAuth must be used within an AuthContext");
  return context;
};
