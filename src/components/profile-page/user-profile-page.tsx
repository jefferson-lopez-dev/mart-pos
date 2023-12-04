"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useProfile } from "@/hooks/use-profile";
import React, { useEffect } from "react";
import { children } from "@/interface";

export function UserProfilePage({ children }: children) {
  const { getProfile } = useProfile();

  useEffect(() => {
    getProfile();
  }, []);

  return <>{children}</>;
}
