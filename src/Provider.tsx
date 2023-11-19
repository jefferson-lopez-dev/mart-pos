"use client";
import { AuthProvider, ProfileUserProvider } from "./context";
import { children } from "./interface";

export function MartPosProvider({ children }: children) {
  return (
    <AuthProvider>
      <ProfileUserProvider>{children}</ProfileUserProvider>
    </AuthProvider>
  );
}
