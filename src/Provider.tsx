"use client";
import { AuthProvider, ProfileUserProvider } from "./context";
import { ThemeProvider } from "@/components/theme-provider";
import { children } from "./interface";

export function MartProvider({ children }: children) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <ProfileUserProvider>{children}</ProfileUserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
