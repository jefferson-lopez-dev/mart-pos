"use client";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";
import { children } from "@/interface";
import {
  apiGetAccount,
  apiLogin,
  apiLogout,
  apiRegister,
  apiVerifyToken,
} from "@/api";

export const AuthContext = createContext({});

const authenticated = (): string => {
  return typeof localStorage !== "undefined"
    ? localStorage.getItem("sthntctd") || "false"
    : "false";
};

export const AuthProvider = ({ children }: children) => {
  const [account, setAccount] = useState<any>(false);
  const [isAuthenticated, setIsAuthenticated] = useState(authenticated);
  const { push } = useRouter();

  const login = async (data: object) => {
    const res = await apiLogin(data);
    if (res.data.status === 204) {
      setIsAuthenticated("true");
      if (isAuthenticated) push("/");
      else push("/auth/login");
    }
    return res.data;
  };

  const register = async (data: object) => {
    const res = await apiRegister(data);
    if (res.data.status === 204) {
      setIsAuthenticated("true");
      if (isAuthenticated) push("/");
      else push("/auth/login");
    }
    return res.data;
  };

  const logout = async () => {
    const res = await apiLogout();
    if (res.data.status === 200) {
      setIsAuthenticated("false");
      if (isAuthenticated) push("/auth/login");
    }
    return res.data.message;
  };

  const verifyToken = async () => {
    const res = await apiVerifyToken();
    setIsAuthenticated("true");
    return res.data;
  };

  const getAccount = async () => {
    const res = await apiGetAccount();
    setAccount(res.data.account);
    return res.data;
  };

  useEffect(() => {
    localStorage.setItem("sthntctd", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    async function checkToken() {
      const { TK_AWGAP } = Cookie.get();
      const res = await verifyToken();

      if (!TK_AWGAP) setIsAuthenticated("false");
      if (!res) setIsAuthenticated("false");
      setIsAuthenticated("true");
    }
    checkToken();
  }, [isAuthenticated]);

  const contextValues = {
    login,
    register,
    logout,
    verifyToken,
    getAccount,
    account,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};
