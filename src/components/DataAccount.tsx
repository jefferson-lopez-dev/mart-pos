"use client";
import { useAuth } from "@/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./theme-mode";

export function DataAccount() {
  const { getAccount, account, logout } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    function fetchData() {
      getAccount();
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Account</h1>
      <p>{account ? account.gmail : "Loading..."}</p>
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
      <button
        onClick={() => {
          push("/profile");
        }}
      >
        Go to profile
      </button>
      <ModeToggle></ModeToggle>
    </div>
  );
}
