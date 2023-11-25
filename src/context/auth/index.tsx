"use client";

import { createContext } from "react";
import { children } from "@/interface";
import { apiRegister } from "@/endpoint";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: children) => {
  const register = async (data: object) => {
    const res = await apiRegister(data);
    return res.data;
  };

  const contextValues = {
    register,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};
