"use client";
import { ReactNode } from "react";
import { AuthProvider, ProfileUserProvider } from "./";

interface children {
  children: ReactNode;
}

export function MartPosProvider({ children }: children) {
  return (
    <AuthProvider>
      <ProfileUserProvider>{children}</ProfileUserProvider>
    </AuthProvider>
  );
}
