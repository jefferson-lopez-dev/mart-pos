"use client";
import { AuthProvider, ProfileUserProvider } from "./context";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { children } from "./interface";
import { Header } from "./components/organisms/Header";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

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
            {path === "/" && <Header />}
            {path === "/profile" && <Header />}
            {children}
          </ProfileUserProvider>
        </AuthProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
