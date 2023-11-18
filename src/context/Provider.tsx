"use client";
import { ReactNode } from "react";
import { AuthProvider, ProfileUserProvider } from "./";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface children {
  children: ReactNode;
}

export function MartPosProvider({ children }: children) {
  return (
    <NextUIProvider>
      <AuthProvider>
        <ProfileUserProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            {children}
          </NextThemesProvider>
        </ProfileUserProvider>
      </AuthProvider>
    </NextUIProvider>
  );
}
