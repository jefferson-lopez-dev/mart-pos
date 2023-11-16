"use client";
import { ReactNode } from "react";
import { AuthProvider } from "./auth";

interface children {
  children: ReactNode;
}

export function MartPosProvider({ children }: children) {
  return <AuthProvider>{children}</AuthProvider>;
}
