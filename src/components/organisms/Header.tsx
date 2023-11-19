"use client";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../theme/theme-mode";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTheme } from "next-themes";

export function Header() {
  const { getAccount, account, logout } = useAuth();
  const { push } = useRouter();
  const { theme, systemTheme } = useTheme();
  const [logo, setLogo] = useState("");

  useEffect(() => {
    function logoMart() {
      if (theme === "dark" || systemTheme === "dark")
        setLogo("./mart-light.png");

      if (theme === "light" || systemTheme === "light")
        setLogo("./mart-dark.png");
    }
    logoMart();
  }, [theme, systemTheme]);

  useEffect(() => {
    function fetchData() {
      getAccount();
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Avatar>
        <AvatarImage src={logo} />
        <AvatarFallback>MT</AvatarFallback>
      </Avatar>

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
