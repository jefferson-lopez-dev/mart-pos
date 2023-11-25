"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { MainNav } from "../main-nav";
import { Search } from "../search";
import { UserNav } from "../user-nav";
import Image from "next/image";

export function Header() {
  const { push } = useRouter();
  const { theme, systemTheme } = useTheme();
  const [logo, setLogo] = useState("/mart-light.png");

  useEffect(() => {
    function logoMart() {
      if (theme === "dark" || systemTheme === "dark")
        setLogo("/mart-light.png");

      if (theme === "light" || systemTheme === "light")
        setLogo("/mart-dark.png");
    }
    logoMart();
  }, [theme, systemTheme]);

  return (
    <div>
      <div className="border-b">
        <div className="flex h-[60px] items-center px-4">
          <Image
            className="cursor-pointer"
            onClick={() => push("/")}
            src={logo}
            alt="photo"
            width={35}
            height={35}
          />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
}
