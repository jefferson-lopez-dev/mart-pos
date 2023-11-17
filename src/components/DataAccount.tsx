"use client";
import { useAuth } from "@/hooks";
import { useEffect } from "react";

export function DataAccount() {
  const { getAccount, account, logout } = useAuth();

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
      <p>{account.gmail}</p>
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </div>
  );
}
