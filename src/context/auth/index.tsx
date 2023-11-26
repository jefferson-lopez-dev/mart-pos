"use client";

import { createContext } from "react";
import { children } from "@/interface";
import { apiRegister } from "@/endpoint";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: children) => {
  const signUpCredentials = async (data: object) => {
    const res = await apiRegister(data);
    console.log(res.data);
    return res.data;
  };

  const contextValues = {
    signUpCredentials,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};
