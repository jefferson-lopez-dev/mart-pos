"use client";
import { createContext, useState, useEffect } from "react";
import {
  apiGetAccount,
  apiLogin,
  apiLogout,
  apiRegister,
  apiVerifyToken,
} from "@/api";
import { children } from "@/interface";

export const AuthContext = createContext({});

const authenticated = (): string => {
  return typeof localStorage !== "undefined"
    ? localStorage.getItem("sthntctd") || "false"
    : "false";
};

export const AuthProvider = ({ children }: children) => {
  const [account, setAccount] = useState<object | boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState(authenticated);

  const login = async (data: object) => {
    const res = await apiLogin(data);
    setIsAuthenticated("true");
    return res.data;
  };

  const register = async (data: object) => {
    const res = await apiRegister(data);
    console.log(res);
    setIsAuthenticated("true");
    return res.data;
  };

  const logout = async () => {
    const res = await apiLogout();
    setIsAuthenticated("false");
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
  };

  useEffect(() => {
    localStorage.setItem("sthntctd", isAuthenticated);
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
