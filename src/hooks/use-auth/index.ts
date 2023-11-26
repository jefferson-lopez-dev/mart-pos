import { AuthContext } from "@/context";
import { useContext } from "react";

interface AuthContextProps {
  signUpCredentials: (data: object) => Promise<any>;
}

export const useAuth = () => {
  const context = useContext(AuthContext) as AuthContextProps;
  if (!context) throw new Error("useAuth must be used within an AuthContext");
  return context;
};
