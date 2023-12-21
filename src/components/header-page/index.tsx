"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { MainNav } from "./main-nav";
import { Search } from "./search";
import { UserNav } from "./user-nav";
import Image from "next/image";

export function HeaderPage() {
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
    <div className="border-b sticky top-0 h-[100px] bg-black flex items-center w-full z-10">
      <div className="flex h-[80px] w-full m-3 flex-col justify-around">
        <div className="flex">
          <Image
            className="h-[30px] w-[30px] cursor-pointer"
            onClick={() => push("/")}
            src={logo}
            alt="photo"
            width={35}
            height={35}
          />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
        <div className="flex">
          <MainNav className="" />
        </div>
      </div>
    </div>
  );
}
