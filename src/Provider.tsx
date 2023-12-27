"use client";
import { AuthProvider, ProfileUserProvider } from "./context";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { children } from "./interface";
import { HeaderPage } from "./components/header-page";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";

export function MartProvider({ children }: children) {
  const path = usePathname();
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>
          <ProfileUserProvider>
            {path !== "/auth/login" && "/auth/register" && <HeaderPage />}
            {children}
            <Toaster />
          </ProfileUserProvider>
        </AuthProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
