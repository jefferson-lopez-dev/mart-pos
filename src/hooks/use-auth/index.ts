import { AuthContext } from "@/context";
import { useContext } from "react";

interface AuthContextProps {
  login: (data: object) => Promise<any>;
  register: (data: object) => Promise<any>;
  logout: () => Promise<any>;
  verifyToken: () => Promise<any>;
  getAccount: () => Promise<any>;
  account: any;
  isAuthenticated: "true" | "false";
}

export const useAuth = () => {
  const context = useContext(AuthContext) as AuthContextProps;
  if (!context) throw new Error("useAuth must be used within an AuthContext");
  return context;
};
