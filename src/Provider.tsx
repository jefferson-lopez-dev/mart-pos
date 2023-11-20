"use client";
import { AuthProvider, ProfileUserProvider } from "./context";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { children } from "./interface";
import { Header } from "./components/organisms/Header";
import { usePathname, useSearchParams } from "next/navigation";
import Error from "next/error";

export function MartProvider({ children }: children) {
  const path = usePathname();

  return (
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
  );
}
