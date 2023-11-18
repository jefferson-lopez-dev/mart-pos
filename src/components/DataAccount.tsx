"use client";
import { useAuth } from "@/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";

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
      <Button
        size="sm"
        color="danger"
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>
      <Button
        radius="sm"
        size="sm"
        onClick={() => {
          push("/profile");
        }}
      >
        Go to profile
      </Button>
    </div>
  );
}
