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
    console.log(res);
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
      else push("/auth/register");
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const verifyToken = async () => {
    if (isAuthenticated) {
      const res = await apiVerifyToken();
      if (res.data.status === 401) setIsAuthenticated("false");
      else setIsAuthenticated("true");
      return res.data;
    }
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
    const TK_AWGAP = Cookie.get();
    async function checkToken() {
      // console.log(TK_AWGAP);
      // if (!TK_AWGAP) {
      //   setIsAuthenticated("false");
      //   return;
      // }
      await verifyToken();
    }
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
